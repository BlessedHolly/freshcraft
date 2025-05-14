import React from "react";
import styles from "./BaseInput.module.scss";

interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
}

const BaseInput = React.forwardRef<HTMLInputElement, BaseInputProps>(
  ({ label, errorMessage, ...props }, ref) => {
    if (errorMessage === "Required")
      errorMessage = "Поле обязательно для заполнения";

    return (
      <div className={styles.inputContainer}>
        {label && <span>{label}</span>}
        <input ref={ref} required={false} {...props} />
        <span className={styles.errorMessage}>{errorMessage || "\u00A0"}</span>
      </div>
    );
  }
);

export default BaseInput;
