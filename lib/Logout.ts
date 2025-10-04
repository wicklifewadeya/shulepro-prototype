// "use client";

// import { authClient } from "@/lib/auth-client";
// import router from "next/router";

// const UseLogout = async () => {
//   await authClient.signOut({
//     fetchOptions: {
//       onSuccess: () => {
//         router.push("/login"); // redirect to login page
//       },
//     },
//   });
// };

// export default UseLogout;

"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation"; // app-router
import { authClient } from "@/lib/auth-client";

export default function useLogout() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login");
          },
        },
      });
      // If authClient doesn't call onSuccess reliably, you can also redirect here:
      // router.push("/login");
    } catch (err) {
      console.error("Sign out failed:", err);
      // optionally show a toast
      router.push("/login"); // fallback redirect
    } finally {
      setLoading(false);
    }
  }, [router]);

  return { logout, loading };
}
