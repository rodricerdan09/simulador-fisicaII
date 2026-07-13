"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ParameterControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
  className?: string;
}

export function ParameterControl({
  label,
  value,
  min,
  max,
  step = 1,
  unit,
  onChange,
  className,
}: ParameterControlProps) {
  const clamped = Math.min(max, Math.max(min, value));
  const [inputValue, setInputValue] = useState(clamped.toString());

  function handleSliderChange(e: React.ChangeEvent<HTMLInputElement>) {
    const next = parseFloat(e.target.value);
    if (!Number.isNaN(next)) {
      setInputValue(next.toString());
      onChange(next);
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function handleInputBlur() {
    const next = parseFloat(inputValue);
    if (!Number.isNaN(next)) {
      const clamped = Math.min(max, Math.max(min, next));
      setInputValue(clamped.toString());
      onChange(clamped);
    } else {
      setInputValue(clamped.toString());
    }
  }

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleInputBlur();
    }
  }

  return (
    <div className={cn("space-y-3 p-1", className)}>
      <div className="flex items-start justify-between gap-3">
        <Label className="text-sm font-medium leading-tight text-slate-100">{label}</Label>
        <div className="flex shrink-0 items-center gap-2">
          <Input
            type="number"
            value={inputValue}
            min={min}
            max={max}
            step={step}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            className="h-8 w-20 border-slate-700 bg-slate-950 text-right text-sm text-slate-50 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          {unit ? (
            <span className="text-xs text-slate-400">{unit}</span>
          ) : <span className="pl-3"></span>}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs tabular-nums text-slate-400">{min}</span>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={clamped}
          onChange={handleSliderChange}
          className="h-2 flex-1 cursor-pointer appearance-none rounded-lg bg-slate-800 accent-cyan-500 outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50"
        />
        <span className="text-xs tabular-nums text-slate-400">{max}</span>
      </div>
    </div>
  );
}
