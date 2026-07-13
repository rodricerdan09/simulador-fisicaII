export interface RGB {
  r: number;
  g: number;
  b: number;
}

export function wavelengthToRgb(wavelengthNm: number): RGB {
  const lambda = Math.max(380, Math.min(750, wavelengthNm));
  let r = 0;
  let g = 0;
  let b = 0;

  if (lambda >= 380 && lambda < 440) {
    // Violeta brillante
    const t = (lambda - 380) / (440 - 380);
    r = 0.6 + 0.4 * (1 - t);
    g = 0;
    b = 1;
  } else if (lambda >= 440 && lambda < 490) {
    // Azul a cyan
    const t = (lambda - 440) / (490 - 440);
    r = 0;
    g = t;
    b = 1;
  } else if (lambda >= 490 && lambda < 510) {
    // Cyan a verde
    const t = (lambda - 490) / (510 - 490);
    r = 0;
    g = 1;
    b = 1 - t;
  } else if (lambda >= 510 && lambda < 580) {
    // Verde a amarillo
    const t = (lambda - 510) / (580 - 510);
    r = t;
    g = 1;
    b = 0;
  } else if (lambda >= 580 && lambda < 620) {
    // Amarillo a naranja
    const t = (lambda - 580) / (620 - 580);
    r = 1;
    g = 1 - t;
    b = 0;
  } else if (lambda >= 620 && lambda <= 750) {
    // Rojo brillante
    r = 1;
    g = 0.1;
    b = 0.1;
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

export function wavelengthToCss(wavelengthNm: number): string {
  const { r, g, b } = wavelengthToRgb(wavelengthNm);
  return `rgb(${r}, ${g}, ${b})`;
}

export function rgbToHex({ r, g, b }: RGB): string {
  const toHex = (v: number) => v.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
