"use client";

interface UtnShieldProps {
  size?: 16 | 20 | 24 | 28;
  className?: string;
}

export function UtnShield({ size = 28, className = "" }: UtnShieldProps) {
  return (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="#1E293B">
  {/* <rect width="32" height="32" fill="#1E293B" /> */}
  <path
    d="M4 4h24v16c0 6-6 10-12 10S4 26 4 20V4z"
    fill="#222f42"
    stroke="#22d3ee"
    stroke-width="2"
  />
  <text
    x="16"
    y="17"
    text-anchor="middle"
    dominant-baseline="middle"
    fill="#22d3ee"
    font-family="Arial, Helvetica, sans-serif"
    font-weight="bold"
    font-size="8"
  >
    UTN
  </text>
</svg>

  );
}
