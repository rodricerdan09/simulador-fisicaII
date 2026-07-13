import { Metadata } from "next";

import { LoginForm } from "@/components/auth/LoginForm";
import { UtnLogo } from "@/components/icons/UtnLogo";

export const metadata: Metadata = {
  title: "Iniciar sesión - Simulador de Física II",
};

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-12">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-cyan-500/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-blue-500/5 blur-[120px]" />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-4 py-2 backdrop-blur-md">
            <UtnLogo className="h-4 w-4 text-cyan-400" size={16} />
            <span className="text-sm font-medium text-slate-200">
              UTN FRRE
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-50">
            Simulador de Física II
          </h1>
          <p className="mt-2 text-slate-400">
            Ingresá con tu cuenta institucional para continuar.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-md">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
