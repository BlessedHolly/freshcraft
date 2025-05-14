import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./MicrosoftCallback.module.scss";
import { toast } from "react-toastify";
import {
  useGetProfileQuery,
  useLogoutMutation,
  useMicrosoftCallbackMutation,
} from "../../store/apiSlice";
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon";
import {
  isPostMicrosoftCallbackResponseData,
  isString,
} from "../../type-guards/index";
import BaseButton from "../../components/BaseButton/BaseButton";
import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from "../../assets/const";

const MicrosoftCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [remainTime, setRemainTime] = useState(5);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code");
  const state = queryParams.get("state");

  const [callbackMicrosoft, { isLoading, isError, error }] =
    useMicrosoftCallbackMutation();
  console.log("error:", error);
  const token = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
  const [, { isSuccess, isLoading: isLoadingLogout }] = useLogoutMutation();
  const { refetch: refetchProfile } = useGetProfileQuery(undefined, {
    skip: !token || isSuccess || isLoadingLogout,
  });

  useEffect(() => {
    if (!code) {
      navigate("/", { replace: true });
    }
  }, [code, navigate]);

  useEffect(() => {
    if (isString(code)) {
      console.log(code, state);
      callbackMicrosoft({
        code,
        ...(isString(state) ? { state } : {}),
      })
        .unwrap()
        .then(async (data) => {
          if (isPostMicrosoftCallbackResponseData(data)) {
            try {
              await refetchProfile();
            } catch (err) {
              let message = "Ошибка получения профиля";

              if (
                err &&
                typeof err === "object" &&
                "data" in err &&
                typeof err.data === "object" &&
                err.data !== null &&
                "message" in err.data &&
                typeof err.data.message === "string"
              ) {
                message = err.data.message;
              } else if (err instanceof Error) {
                message = err.message;
              }

              toast.error(message);
            }
          }

          navigate("/profile", { replace: true });
        })
        .catch(() => {});
    }
  }, [code, state, callbackMicrosoft, refetchProfile, navigate]);

  useEffect(() => {
    if (isError) {
      timerRef.current = setInterval(() => {
        setRemainTime((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            navigate("/", { replace: true });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isError, navigate]);

  const handleGoHome = () => {
    navigate("/", { replace: true });
  };

  return (
    <section
      className={styles.microsoftCallback}
      style={{ ["--sectionMinHeight" as string]: `${window.innerHeight}px` }}
    >
      <h1>{state ? "Привязка Microsoft" : "Авторизация Microsoft"}</h1>
      <div className={styles.result}>
        {isLoading && <LoadingIcon className={styles.loadingIcon} />}
        {isError && (
          <>
            <p>
              При попытке{" "}
              {state
                ? "привязать Microsoft к аккаунту"
                : "авторизоваться с помощью Microsoft"}{" "}
              произошла ошибка.
              <br />(
              {(() => {
                if (
                  error &&
                  typeof error === "object" &&
                  "data" in error &&
                  error.data &&
                  typeof error.data === "object" &&
                  "message" in error.data &&
                  typeof error.data.message === "string"
                ) {
                  return error.data.message;
                }
                return "Неизвестная ошибка";
              })()}
              )
            </p>
            <p className={styles.redirectText}>
              <i>
                Через <b>{remainTime}</b> секунд вы будете автоматически
                перенаправлены на главную страницу.
              </i>
            </p>
          </>
        )}
      </div>
      {isError && (
        <BaseButton disabled={isLoading} onClick={handleGoHome}>
          Перейти на главную
        </BaseButton>
      )}
    </section>
  );
};

export default MicrosoftCallback;
