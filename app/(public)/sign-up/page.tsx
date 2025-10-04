// --- page.tsx ---
import { SignupForm } from "@/components/forms/signup-form";
import styles from "./page.module.scss";

export default function SignupPage() {
  return (
    <div className={styles.container}>
      <SignupForm />
    </div>
  );
}
