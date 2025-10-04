"use client";
import { useEffect } from "react";

type Props = { targetId: string; timeoutMs?: number };

function waitForElement(
  id: string,
  timeoutMs = 3000
): Promise<HTMLElement | null> {
  const start = Date.now();
  return new Promise((resolve) => {
    const tryFind = () => {
      const el = document.getElementById(id);
      if (el) return resolve(el);
      if (Date.now() - start > timeoutMs) return resolve(null);
      requestAnimationFrame(tryFind);
    };
    tryFind();
  });
}

export default function TeamScroller({ targetId, timeoutMs = 3000 }: Props) {
  useEffect(() => {
    // run only in browser
    const hash = window.location.hash;
    if (!hash) return;

    const id = hash.replace(/^#/, "");
    // only act when it matches the target
    if (id !== targetId) return;

    let cancelled = false;

    (async () => {
      const el = await waitForElement(id, timeoutMs);
      if (cancelled || !el) return;

      // optional: set focus for accessibility (element must be focusable)
      const prevTabIndex = el.getAttribute("tabindex");
      if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: true });

      // smooth scroll
      el.scrollIntoView({ behavior: "smooth", block: "start" });

      // remove hash from address bar without creating a new history entry
      // (preserves back button behavior)
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );

      // restore tabindex attribute if it didn't exist before
      if (prevTabIndex === null) el.removeAttribute("tabindex");
      else el.setAttribute("tabindex", prevTabIndex);
    })();

    return () => {
      cancelled = true;
    };
  }, [targetId, timeoutMs]);

  return null;
}
