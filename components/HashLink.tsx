"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  href: string; // e.g. "/#features" or "/login"
  children: React.ReactNode;
  className?: string;
  headerOffset?: number; // pixels (for fixed header)
  timeoutMs?: number; // how long to wait for late-rendered element
};

const waitForElement = (
  id: string,
  timeoutMs = 3000
): Promise<HTMLElement | null> =>
  new Promise((resolve) => {
    const start = Date.now();
    const tryFind = () => {
      const el = document.getElementById(id);
      if (el) return resolve(el);
      if (Date.now() - start > timeoutMs) return resolve(null);
      requestAnimationFrame(tryFind);
    };
    tryFind();
  });

function normalizePath(p: string | undefined) {
  if (!p || p === "") return "/";
  if (!p.startsWith("/")) p = "/" + p;
  if (p.length > 1 && p.endsWith("/")) return p.slice(0, -1);
  return p;
}

export default function HashLink({
  href,
  children,
  className,
  headerOffset = 0,
  timeoutMs = 3000,
}: Props) {
  const pathname = usePathname() || "/";
  const router = useRouter();

  // split href into path and hash
  const [pathPart, hashPart] = href.split("#");
  const pathOnly = (pathPart || "/").split("?")[0];

  const targetPath = normalizePath(pathOnly);
  const currentPath = normalizePath(pathname);

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    // only handle in-page hash behavior when we are already on the same path and link contains a hash
    if (!hashPart || targetPath !== currentPath) return;

    e.preventDefault();

    const id = hashPart;
    const el =
      document.getElementById(id) || (await waitForElement(id, timeoutMs));

    if (el) {
      // accessibility: focus without scrolling
      const addedTab = !el.hasAttribute("tabindex");
      if (addedTab) el.setAttribute("tabindex", "-1");
      try {
        el.focus({ preventScroll: true } as FocusOptions);
      } catch {
        /* ignore */
      }

      // scroll with offset for fixed header
      const top =
        el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: "smooth" });

      // remove hash from address bar (no new history entry)
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );

      // restore tabindex if we added it
      if (addedTab) {
        setTimeout(() => el.removeAttribute("tabindex"), 1000);
      }
    } else {
      // fallback: element not found (maybe rendered after navigation or route mismatch)
      // Navigate to href so server/client code handles it
      router.push(href);
    }
  };

  // If target path matches current: render a normal anchor with onClick handler
  if (targetPath === currentPath) {
    return (
      <a href={href} onClick={handleClick} className={className}>
        {children}
      </a>
    );
  }

  // Otherwise render Next Link so navigation happens; use scroll={false} so the target page's client scroller can handle it
  return (
    <Link href={href} scroll={false} className={className}>
      {children}
    </Link>
  );
}
