"use client";

import { useEffect } from "react";

export function ScrollToHash() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hash = window.location.hash;
    if (!hash) return;

    // Pequeño delay para asegurar que los paneles estén renderizados
    const timeout = setTimeout(() => {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return null;
}
