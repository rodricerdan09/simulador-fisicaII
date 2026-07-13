import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";
import { UserProvider } from "@/hooks/useUser";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simulador de Física II",
  description:
    "Simulador interactivo de óptica para estudiantes universitarios.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.47/dist/katex.min.css"
          integrity="sha384-9eLZqc9ds8eNjO3TmqPeYcDj8n+Qfa4nuSiGYa6DjLNcv9BtN69ZIulL9+8CqC9Y"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.className} min-h-screen bg-slate-950`}>
        <UserProvider>{children}</UserProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "rgba(15, 23, 42, 0.9)",
              border: "1px solid rgb(30, 41, 59)",
              color: "rgb(248, 250, 252)",
            },
          }}
        />
      </body>
    </html>
  );
}
