import * as React from "react";
import styles from "./input.module.scss";

type DivProps = React.ComponentProps<"input">;

/** Small local helper to merge module class with any incoming className string. */
function joinClasses(...parts: Array<string | undefined | null | false>) {
  return parts.filter(Boolean).join(" ");
}

export function Input({ className, type = "text", ...props }: DivProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={joinClasses(styles.input, className)}
      {...props}
    />
  );
}

export default Input;
