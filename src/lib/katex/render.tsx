"use client";

import katex from "katex";
import { useMemo } from "react";

import { cn } from "@/lib/utils";

interface FormulaProps {
  math: string;
  block?: boolean;
  className?: string;
}

export function Formula({ math, block = false, className }: FormulaProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: block,
        throwOnError: false,
        strict: false,
      });
    } catch (error) {
      console.error("KaTeX render error:", error);
      return `<span style="color: red;">Error: ${math}</span>`;
    }
  }, [math, block]);

  if (block) {
    return (
      <div
        className={cn("my-4 w-full", className)}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span
      className={cn("inline-block", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
