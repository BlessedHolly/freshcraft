import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./Auth.module.scss";
import BaseInput from "../../components/BaseInput/BaseInput";
import BaseButton from "../../components/BaseButton/BaseButton";
import {
  useLoginMutation,
  useSignUpMutation,
  useGetMicrosoftLinkMutation,
  useGetProfileQuery,
  useLogoutMutation,
} from "../../store/apiSlice";
import { push as notify } from "notivue";
import ForgotPasswordModal from "../../modals/ForgotPasswordModal/ForgotPasswordModal";
import { setAttention } from "../../store/errorSlice";
import { useDispatch } from "react-redux";
import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from "../../assets/const";

const schema = z
  .object({
    email: z
      .string()
      .min(1, "Поле обязательно для заполнения")
      .email("Поле должно содержать e-mail"),

    password: z
      .string()
      .min(1, "Поле обязательно для заполнения")
      .min(8, "Минимум 8 символов"),

    confirmPassword: z.string().min(8, "Минимум 8 символов").optional(),
  })
  .refine(
    (data) => !data.confirmPassword || data.password === data.confirmPassword,
    {
      message: "Пароли не совпадают",
      path: ["confirmPassword"],
    }
  );

type FormData = z.infer<typeof schema>;

function isApiError(error: unknown): error is { data?: { message?: string } } {
  return (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof (error as { data: { message: string } }).data?.message === "string"
  );
}
export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSubmitLocked, setIsSubmitLocked] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
  const [, { isSuccess, isLoading: isLoadingLogout }] = useLogoutMutation();
  const { data: profile } = useGetProfileQuery(undefined, {
    skip: !token || isSuccess || isLoadingLogout,
  });
  const isAuth = Boolean(profile?.email?.value);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuth) navigate("/profile");
  }, [isAuth, navigate]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [login, { isLoading: isLoadingLogin }] = useLoginMutation();
  const [signUp, { isLoading: isLoadingSignUp }] = useSignUpMutation();
  const [getMicrosoftLink, { isLoading: isLoadingGetMicrosoftLink }] =
    useGetMicrosoftLinkMutation();

  useEffect(() => {
    if (!isLoadingLogin || !isLoadingSignUp || !isLoadingGetMicrosoftLink)
      setIsSubmitLocked(false);
  }, [isLoadingLogin, isLoadingSignUp, isLoadingGetMicrosoftLink]);

  const onSubmit = async (data: FormData) => {
    if (isSubmitLocked) return;
    setIsSubmitLocked(true);

    if (isSignUp && data.confirmPassword) {
      try {
        await signUp({
          email: data.email,
          password: data.password,
          password_confirmation: data.confirmPassword!,
        })
          .unwrap()
          .then(() => {
            dispatch(
              setAttention({
                errorText:
                  "Вы успешно зарегистрированы. На вашу почту выслано сообщение с подтверждением e-mail адреса.",
                success: true,
              })
            );
            notify.success(
              "Вы успешно зарегистрированы. На вашу почту выслано сообщение с подтверждением e-mail адреса."
            );
            setTimeout(() => {
              navigate("/profile", { replace: true });
            }, 1000);
          });
      } catch (error: unknown) {
        const message = isApiError(error) ? error.data?.message : undefined;
        notify.error(message || "Ошибка регистрации");
        dispatch(setAttention({ errorText: message || "Ошибка регистрации" }));
      } finally {
        setIsSubmitLocked(false);
      }
    } else {
      try {
        await login({ email: data.email, password: data.password })
          .unwrap()
          .then(() => navigate("/profile"));
      } catch (error: unknown) {
        const message = isApiError(error) ? error.data?.message : undefined;
        notify.error(message || "Ошибка входа");
        dispatch(setAttention({ errorText: message || "Ошибка входа" }));
      } finally {
        setIsSubmitLocked(false);
      }
    }
  };

  const handleSwitch = () => {
    if (isSubmitLocked) return;
    setIsSignUp((prev) => !prev);
    reset();
  };

  const handleMicrosoftAuth = async () => {
    if (isSubmitLocked) return;
    setIsSubmitLocked(true);
    try {
      const res = await getMicrosoftLink().unwrap();
      const redirectUrl = res.url.replace(
        "freshcraft.org",
        "fresh-i78m.vercel.app"
      );
      console.log(res.url, redirectUrl);

      window.location.href = redirectUrl;
    } catch (error: unknown) {
      const message = isApiError(error) ? error.data?.message : undefined;
      notify.error(message || "Ошибка Microsoft входа");
      dispatch(
        setAttention({ errorText: message || "Ошибка Microsoft входа" })
      );
    }
  };

  return (
    <section className={styles.auth}>
      <h1>{isSignUp ? "Регистрация" : "Вход"}</h1>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <BaseInput
          label="E-mail"
          placeholder="E-mail"
          type="email"
          disabled={isSubmitLocked}
          errorMessage={errors.email?.message}
          {...register("email")}
          autoComplete="email"
        />
        <BaseInput
          label="Пароль"
          placeholder="Пароль"
          type="password"
          disabled={isSubmitLocked}
          errorMessage={errors.password?.message}
          {...register("password")}
          autoComplete="new-password"
        />
        {isSignUp && (
          <BaseInput
            label="Повторите пароль"
            placeholder="Повторите пароль"
            type="password"
            disabled={isSubmitLocked}
            errorMessage={errors.confirmPassword?.message}
            {...register("confirmPassword")}
            autoComplete="new-password"
          />
        )}
        <div className={styles.row}>
          <a onClick={handleSwitch}>
            {isSignUp ? "У меня есть аккаунт" : "У меня нет аккаунта"}
          </a>
          {!isSignUp && (
            <a onClick={() => setIsForgotPasswordModalOpen(true)}>
              Забыл пароль
            </a>
          )}
        </div>
        <BaseButton
          type="submit"
          className={styles.button}
          disabled={isSubmitLocked}
        >
          {isSignUp ? "Зарегистрироваться" : "Войти"}
        </BaseButton>
        {!isSignUp && (
          <BaseButton
            className={styles.button}
            type="button"
            microsoftStyle
            onClick={handleMicrosoftAuth}
          >
            Войти с Microsoft
          </BaseButton>
        )}
      </form>
      <ForgotPasswordModal
        open={isForgotPasswordModalOpen}
        onClose={() => setIsForgotPasswordModalOpen(false)}
      />
    </section>
  );
}
