import ForgotPasswordForm from "@/components/forms/forgot-password-form";
import styles from "./page.module.scss";

export default function LoginPage() {
  return (
    <div className={styles.main}>
      <ForgotPasswordForm />
    </div>
  );
}
