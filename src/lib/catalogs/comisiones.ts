export const COMISIONES = [
  "1K1",
  "1K2",
  "1K3",
  "1K4",
  "1K5",
  "2K1",
  "2K2",
  "2K3",
] as const;

export type Comision = (typeof COMISIONES)[number];
