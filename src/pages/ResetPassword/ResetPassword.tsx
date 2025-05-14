import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResetPasswordMutation } from "../../store/apiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { push as notify } from "notivue";
import styles from "./ResetPassword.module.scss";
import BaseInput from "../../components/BaseInput/BaseInput";
import BaseButton from "../../components/BaseButton/BaseButton";
import { setAttention } from "../../store/errorSlice";
import { useDispatch } from "react-redux";

const schema = z
  .object({
    password: z
      .string({ required_error: "Необходимо заполнить поле" })
      .min(8, "Минимум 8 символов"),
    confirmPassword: z
      .string({ required_error: "Необходимо заполнить поле" })
      .min(8, "Минимум 8 символов"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [isSubmitLocked, setIsSubmitLocked] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [resetPassword] = useResetPasswordMutation();

  const onSubmit = async (data: {
    password: string;
    confirmPassword: string;
  }) => {
    if (!token || typeof token !== "string") return;
    if (isSubmitLocked) return;

    setIsSubmitLocked(true);

    try {
      await resetPassword({
        token,
        password: data.password,
        password_confirmation: data.confirmPassword,
      }).unwrap();

      notify.success("Пароль успешно сброшен и заменен на новый.");
      dispatch(
        setAttention({
          errorText: "Пароль успешно сброшен и заменен на новый.",
          success: true,
        })
      );
      navigate("/auth", { replace: true });
    } catch (error) {
      const err = error as { data?: { message?: string } };
      notify.error(err.data?.message || "Ошибка при сбросе пароля");
      dispatch(
        setAttention({
          errorText: err.data?.message || "Ошибка при сбросе пароля",
        })
      );
      setIsSubmitLocked(false);
    }
  };

  return (
    <section className={styles.resetPassword}>
      <h1>Сброс пароля</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <BaseInput
          label="Пароль"
          placeholder="Пароль"
          type="password"
          autoComplete="new-password"
          errorMessage={errors.password?.message}
          disabled={isSubmitLocked}
          {...register("password")}
        />
        <BaseInput
          label="Повторите пароль"
          placeholder="Повторите пароль"
          type="password"
          autoComplete="new-password"
          errorMessage={errors.confirmPassword?.message}
          disabled={isSubmitLocked}
          {...register("confirmPassword")}
        />
        <BaseButton
          disabled={isSubmitLocked}
          type="submit"
          className={styles.button}
        >
          Сохранить
        </BaseButton>
      </form>
    </section>
  );
}
