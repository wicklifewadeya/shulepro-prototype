// app\dashboard\page.tsx

import styles from "./page.module.css";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) redirect("/login");

  return (
    <div className={styles.main}>
      <h1>Welcome {session.user?.name ?? session.user?.email}</h1>
    </div>
  );
}
