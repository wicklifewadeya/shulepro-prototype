// app\login\page.tsx
import { LoginForm } from "@/components/forms/login-form";
import styles from "./page.module.scss";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
}
