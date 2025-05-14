import styles from "./BaseButton.module.scss";
import classNames from "classnames";
import { ReactNode } from "react";

interface Props {
  size?: "big" | "epic";
  fullSpace?: boolean;
  justifyContent?: "start" | "end";
  actLikeSummary?: boolean;
  microsoftStyle?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean; //
}

export default function BaseButton({
  size,
  fullSpace = false,
  justifyContent,
  actLikeSummary = false,
  microsoftStyle = false,
  onClick,
  children,
  className,
  type = "button",
  disabled = false,
}: Props) {
  const Tag = actLikeSummary ? "summary" : "button";

  const commonProps = {
    className: classNames(styles.button, className, {
      [styles.fullSpace]: fullSpace,
      [styles.microsoftStyle]: microsoftStyle,
    }),
    onClick,
    ...(Tag === "button" && { type, disabled }),
  };

  return (
    <Tag {...commonProps}>
      <div
        className={size ? styles[size] : undefined}
        style={{ ["--justifyContent" as string]: justifyContent }}
      >
        <span>{children}</span>
        {microsoftStyle && (
          <svg
            data-v-38bd77a1=""
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 32 32"
          >
            <path
              fill="#FEBA08"
              d="M17 17h10v10H17z"
              style={{ color: "rgb(254, 186, 8)" }}
            ></path>
            <path
              fill="#05A6F0"
              d="M5 17h10v10H5z"
              style={{ color: "rgb(5, 166, 240)" }}
            ></path>
            <path
              fill="#80BC06"
              d="M17 5h10v10H17z"
              style={{ color: "rgb(128, 188, 6)" }}
            ></path>
            <path
              fill="#F25325"
              d="M5 5h10v10H5z"
              style={{ color: "rgb(242, 83, 37)" }}
            ></path>
          </svg>
        )}
      </div>
    </Tag>
  );
}
