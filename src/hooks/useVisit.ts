"use client";

import { useEffect, useRef } from "react";

const DEBOUNCE_MS = 30000;

export function useVisit(pagePath: string) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    if (!pagePath) return;
    if (typeof window === "undefined") return;

    const lastVisitKey = `visit:${pagePath}`;
    const lastVisit = sessionStorage.getItem(lastVisitKey);
    const now = Date.now();

    if (lastVisit && now - parseInt(lastVisit, 10) < DEBOUNCE_MS) return;

    sessionStorage.setItem(lastVisitKey, now.toString());

    fetch("/api/visits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page_path: pagePath }),
    }).catch((error) => {
      // Fire-and-forget: log only, never block render.
      console.error("useVisit failed:", error);
    });
  }, [pagePath]);
}
