import React, { useEffect, useRef } from "react";
import styles from "./ForgotPasswordModal.module.scss";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForgotPasswordMutation } from "../../store/apiSlice";
import BaseInput from "../../components/BaseInput/BaseInput";
import BaseButton from "../../components/BaseButton/BaseButton";
import { setAttention } from "../../store/errorSlice";
import { useDispatch } from "react-redux";

interface ForgotPasswordModalProps {
  open: boolean;
  onClose: () => void;
}

const schema = z.object({
  email: z
    .string({ required_error: "Необходимо заполнить поле" })
    .email("Поле должно содержать e-mail"),
});

type FormData = z.infer<typeof schema>;

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  open,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const dispatch = useDispatch();

  const [forgotPassword] = useForgotPasswordMutation();

  const onSubmit = async (data: FormData) => {
    try {
      await forgotPassword({ email: data.email }).unwrap();
      dispatch(
        setAttention({
          errorText:
            "На вашу почту отправлено сообщение с ссылкой для сброса пароля.",
          success: true,
        })
      );
      onClose();
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        typeof (error as { data: { message: string } })?.data.message ===
          "string"
      ) {
        dispatch(
          setAttention({
            errorText:
              (error as { data: { message: string } })?.data.message ||
              "Произошла ошибка при отправке запроса.",
          })
        );
      } else {
        dispatch(setAttention({ errorText: "Произошла неизвестная ошибка." }));
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal} ref={modalRef}>
        <h1>Забыл пароль</h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <BaseInput
            label="E-mail"
            placeholder="E-mail"
            type="email"
            autoComplete="username"
            errorMessage={errors.email?.message}
            disabled={isSubmitting}
            {...register("email")}
          />
          <BaseButton type="submit" disabled={isSubmitting}>
            Отправить
          </BaseButton>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
