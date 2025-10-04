import * as React from "react";
import styles from "./card.module.scss";

type DivProps = React.ComponentProps<"div">;

/** Small helper to merge strings (keeps this file dependency-free). */
function joinClasses(...parts: Array<string | undefined | null | false>) {
  return parts.filter(Boolean).join(" ");
}

export function Card({ className, ...props }: DivProps) {
  return (
    <div
      data-slot="card"
      className={joinClasses(styles.card, className)}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: DivProps) {
  return (
    <div
      data-slot="card-header"
      className={joinClasses(styles.cardHeader, className)}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: DivProps) {
  return (
    <div
      data-slot="card-title"
      className={joinClasses(styles.cardTitle, className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: DivProps) {
  return (
    <div
      data-slot="card-description"
      className={joinClasses(styles.cardDescription, className)}
      {...props}
    />
  );
}

export function CardAction({ className, ...props }: DivProps) {
  return (
    <div
      data-slot="card-action"
      className={joinClasses(styles.cardAction, className)}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: DivProps) {
  return (
    <div
      data-slot="card-content"
      className={joinClasses(styles.cardContent, className)}
      {...props}
    />
  );
}

export function CardFooter({ className, ...props }: DivProps) {
  return (
    <div
      data-slot="card-footer"
      className={joinClasses(styles.cardFooter, className)}
      {...props}
    />
  );
}

export default Card;
