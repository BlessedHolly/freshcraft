import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./EmailVerify.module.scss";
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon";
import BaseButton from "../../components/BaseButton/BaseButton";
import { apiSlice, useEmailVerifyMutation } from "../../store/apiSlice";
import { useDispatch } from "react-redux";

export default function EmailVerify() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [
    verifyEmail,
    { isLoading, isSuccess, isError, error, isUninitialized, data },
  ] = useEmailVerifyMutation();
  console.log("emailVerify data:", data);

  const [remainTime, setRemainTime] = useState(10);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (typeof token === "string") {
      verifyEmail({ token });
    }
  }, [token, verifyEmail]);

  useEffect(() => {
    if (!isLoading && !isUninitialized) {
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
  }, [isLoading, isUninitialized, navigate]);

  const handleGoHome = () => {
    navigate("/", { replace: true });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(apiSlice.util.invalidateTags(["Profile"]));
    }
  }, [isSuccess, dispatch]);

  return (
    <section className={styles.microsoftCallback}>
      <h1>Подтверждение почты</h1>
      <div className={styles.result}>
        {isLoading && <LoadingIcon className={styles.loadingIcon} />}
        {!isUninitialized && !isLoading && (
          <>
            {isSuccess && data?.message && <p>{data.message}</p>}
            {isError && (
              <p>
                При попытке подтвердить почту произошла ошибка.
                <br />(
                {(error as { data: { message: string } })?.data?.message ||
                  "Неизвестная ошибка"}
                )
              </p>
            )}
            <p className={styles.redirectText}>
              <i>
                Через <b>{remainTime}</b> секунд вы будете автоматически
                перенаправлены на главную страницу.
              </i>
            </p>
          </>
        )}
      </div>
      <BaseButton disabled={isLoading} onClick={handleGoHome}>
        Перейти на главную
      </BaseButton>
    </section>
  );
}
