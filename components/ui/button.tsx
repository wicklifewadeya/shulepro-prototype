// File: button.tsx
import React from "react";
import styles from "./button.module.scss";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** "primary" | "ghost" */
  variant?: "primary" | "ghost";
  /** "sm" | "md" | "lg" */
  size?: "sm" | "md" | "lg";
  /** additional className to merge */
  className?: string;
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  // Build class string without external helpers
  const classNames = [
    styles.button,
    // CSS Modules allow bracket access for dashed class names
    styles[`size-${size}`],
    styles[`variant-${variant}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  );
}

/*
Usage (example):
<Button size="sm" variant="ghost" onClick={() => {}}>Save</Button>
*/
