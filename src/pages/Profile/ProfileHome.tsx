import { useState, useEffect, useRef } from "react";
import {
  useGetProfileQuery,
  useEmailVerifyResendMutation,
  useForgotPasswordMutation,
  useGetMicrosoftLinkMutation,
  useMicrosoftDisconnectMutation,
  useLogoutMutation,
} from "../../store/apiSlice";
import { useNavigate } from "react-router-dom";
import BaseButton from "../../components/BaseButton/BaseButton";
import styles from "./ProfileHome.module.scss";
import { push as notify } from "notivue";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useDispatch } from "react-redux";
import { setAttention } from "../../store/errorSlice";
import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from "../../assets/const";

const COOLDOWN_KEY = "last_email_verify_resend";
const COOLDOWN_SECONDS = 120;

export default function ProfileHome() {
  const navigate = useNavigate();
  const token = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
  const [, { isSuccess, isLoading: isLoadingLogout }] = useLogoutMutation();
  const { data: profile } = useGetProfileQuery(undefined, {
    skip: !token || isSuccess || isLoadingLogout,
  });
  const [resendEmail] = useEmailVerifyResendMutation();
  const [forgotPassword] = useForgotPasswordMutation();
  const [getMicrosoftLink] = useGetMicrosoftLinkMutation();
  const [disconnectMicrosoft] = useMicrosoftDisconnectMutation();
  const dispatch = useDispatch();

  const [remaining, setRemaining] = useState(0);
  const timerRef = useRef<number>(undefined);

  const startCooldown = (startSeconds: number) => {
    setRemaining(startSeconds);
    timerRef.current = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    const ts = localStorage.getItem(COOLDOWN_KEY);
    if (ts) {
      const delta = Math.floor((Date.now() - +ts) / 1000);
      const rem = COOLDOWN_SECONDS - delta;
      if (rem > 0) startCooldown(rem);
    }
    return () => window.clearInterval(timerRef.current);
  }, []);

  if (!profile) return null;

  const handleResend = () => {
    resendEmail(undefined)
      .unwrap()
      .then(() => {
        notify.success(
          "Сообщение с подтверждением успешно отправлено на вашу почту."
        );
        dispatch(
          setAttention({
            errorText:
              "Сообщение с подтверждением успешно отправлено на вашу почту.",
            success: true,
          })
        );

        localStorage.setItem(COOLDOWN_KEY, Date.now().toString());
        startCooldown(COOLDOWN_SECONDS);
      })
      .catch((err: FetchBaseQueryError) => {
        notify.error(
          (err.data as Error)?.message || "Ошибка при повторной отправке"
        );
        dispatch(
          setAttention({
            errorText:
              (err.data as Error)?.message || "Ошибка при повторной отправке",
          })
        );
        if (err.status === 401) navigate("/auth");
      });
  };

  const handleForgot = () => {
    forgotPassword({ email: profile.email.value })
      .unwrap()
      .then(() => {
        notify.success(
          "На вашу почту отправлено сообщение с ссылкой для сброса пароля."
        );
        dispatch(
          setAttention({
            errorText:
              "На вашу почту отправлено сообщение с ссылкой для сброса пароля.",
            success: true,
          })
        );
      })
      .catch((err: FetchBaseQueryError) => {
        notify.error((err.data as Error)?.message || "Ошибка сброса пароля");
        dispatch(
          setAttention({
            errorText: (err.data as Error)?.message || "Ошибка сброса пароля",
          })
        );
      });
  };

  const handleLink = () => {
    getMicrosoftLink()
      .unwrap()
      .then((d) => {
        window.location.href = d.url;
      })
      .catch((err: FetchBaseQueryError) => {
        notify.error(
          (err.data as Error)?.message || "Ошибка Microsoft привязки"
        );
        dispatch(
          setAttention({
            errorText:
              (err.data as Error)?.message || "Ошибка Microsoft привязки",
          })
        );
      });
  };

  const handleDisconnect = () => {
    disconnectMicrosoft()
      .unwrap()
      .then((d) => {
        notify.success(d.message);
        dispatch(setAttention({ errorText: d.message, success: true }));
      })
      .catch((err: FetchBaseQueryError) => {
        notify.error((err.data as Error)?.message || "Ошибка отвязки");
        dispatch(
          setAttention({
            errorText: (err.data as Error)?.message || "Ошибка отвязки",
          })
        );
      });
  };

  return (
    <section className={styles.profileHome}>
      <img
        className={styles.avatar}
        src="/temp/profile-avatar.png"
        alt="Profile Avatar"
      />
      <div className={styles.info}>
        <p>
          <span>E-mail: </span>
          {profile.email.value}
        </p>
        {!profile.email.isConfirmed &&
          (remaining > 0 ? (
            <p className={styles.cooldown}>
              Подождите {remaining} секунд до повторной отправки
            </p>
          ) : (
            <a onClick={handleResend}>Подтвердить почту</a>
          ))}
        <p>
          <span>Пароль: </span>
          <a onClick={handleForgot}>Сбросить пароль</a>
        </p>
        {profile.minecraftProfile ? (
          <p>
            <span>Microsoft: </span>
            {profile.minecraftProfile.username} (
            <a onClick={handleDisconnect}>Отвязать</a>)
          </p>
        ) : (
          <BaseButton
            className={styles.microsoftLink}
            microsoftStyle
            onClick={handleLink}
          >
            Привязать Microsoft
          </BaseButton>
        )}
      </div>
    </section>
  );
}
