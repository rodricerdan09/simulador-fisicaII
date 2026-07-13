"use client";

import { useState, useEffect } from "react";

export function useDebouncedParam<T>(value: T, delayMs = 100): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(id);
  }, [value, delayMs]);

  return debounced;
}
