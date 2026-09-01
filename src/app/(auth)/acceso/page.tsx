"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setSesion } from "@/lib/role";

const CARRERAS = [
  "Ingeniería en Sistemas",
  "Ingeniería Química",
  "Ingeniería Electromecánica",
];

const COMISIONES = ["1K1", "1K2", "2K1", "2K2"];

type Tab = "ingresar" | "registrarse";
type LoginMode = "alumno" | "profesor";

export default function AccesoPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("ingresar");
  const [loginMode, setLoginMode] = useState<LoginMode>("alumno");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [loginLegajo, setLoginLegajo] = useState("");
  const [loginApellido, setLoginApellido] = useState("");
  const [loginCode, setLoginCode] = useState("");

  const [regNombre, setRegNombre] = useState("");
  const [regApellido, setRegApellido] = useState("");
  const [regLegajo, setRegLegajo] = useState("");
  const [regCarrera, setRegCarrera] = useState("");
  const [regComision, setRegComision] = useState("");
  const [regMode, setRegMode] = useState<LoginMode>("alumno");
  const [regCode, setRegCode] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const body =
        loginMode === "alumno"
          ? { type: "alumno" as const, legajo: loginLegajo, apellido: loginApellido }
          : { type: "profesor" as const, code: loginCode, apellido: loginApellido };

      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Error al iniciar sesión");
        return;
      }

      setSesion(data.sesion);
      router.push("/inicio");
    } catch {
      setError("No se pudo conectar con el servidor");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (regMode === "profesor") {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "profesor",
            code: regCode,
            nombre: regNombre,
            apellido: regApellido,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Error al registrarse");
          return;
        }

        setSesion(data.sesion);
        router.push("/inicio");
        return;
      }

      const registerResponse = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: regNombre,
          apellido: regApellido,
          legajo: regLegajo,
          carrera: regCarrera,
          comision: regComision,
        }),
      });

      const registerData = await registerResponse.json();

      if (!registerResponse.ok) {
        setError(registerData.error || "Error al registrarse");
        return;
      }

      const loginResponse = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "alumno",
          legajo: regLegajo,
          apellido: regApellido,
        }),
      });

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        setError(loginData.error || "Registro exitoso, pero falló el login automático");
        return;
      }

      setSesion(loginData.sesion);
      router.push("/inicio");
    } catch {
      setError("No se pudo conectar con el servidor");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-slate-50">Acceso al simulador</h1>
        <p className="mt-2 text-slate-400">
          Ingresá o registrate para guardar tu progreso.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-2 rounded-lg border border-slate-800 bg-slate-900/50 p-1">
        <button
          type="button"
          onClick={() => {
            setTab("ingresar");
            setError(null);
          }}
          className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            tab === "ingresar"
              ? "bg-cyan-500/10 text-cyan-400"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          Ingresar
        </button>
        <button
          type="button"
          onClick={() => {
            setTab("registrarse");
            setError(null);
          }}
          className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            tab === "registrarse"
              ? "bg-cyan-500/10 text-cyan-400"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          Registrarse
        </button>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-md">
        {tab === "ingresar" ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="grid grid-cols-2 gap-2 rounded-lg border border-slate-800 bg-slate-950/50 p-1">
              <button
                type="button"
                onClick={() => {
                  setLoginMode("alumno");
                  setError(null);
                }}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  loginMode === "alumno"
                    ? "bg-slate-800 text-slate-50"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Alumno
              </button>
              <button
                type="button"
                onClick={() => {
                  setLoginMode("profesor");
                  setError(null);
                }}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  loginMode === "profesor"
                    ? "bg-slate-800 text-slate-50"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Docente
              </button>
            </div>

            {loginMode === "alumno" ? (
              <>
                <div className="space-y-1.5">
                  <Label htmlFor="legajo">Legajo</Label>
                  <Input
                    id="legajo"
                    value={loginLegajo}
                    onChange={(e) => setLoginLegajo(e.target.value)}
                    placeholder="Ej: 12345"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="apellido">Apellido</Label>
                  <Input
                    id="apellido"
                    value={loginApellido}
                    onChange={(e) => setLoginApellido(e.target.value)}
                    placeholder="Tu apellido"
                    required
                  />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-1.5">
                  <Label htmlFor="login-apellido">Apellido</Label>
                  <Input
                    id="login-apellido"
                    value={loginApellido}
                    onChange={(e) => setLoginApellido(e.target.value)}
                    placeholder="Tu apellido"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="code">Código Docente</Label>
                  <Input
                    id="code"
                    type="password"
                    value={loginCode}
                    onChange={(e) => setLoginCode(e.target.value)}
                    placeholder="Ingrese el código docente"
                    required
                  />
                </div>
              </>
            )}

            {error && <p className="text-sm text-red-400">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600"
              disabled={isLoading}
            >
              {isLoading ? "Ingresando..." : "Ingresar"}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-2 rounded-lg border border-slate-800 bg-slate-950/50 p-1">
              <button
                type="button"
                onClick={() => {
                  setRegMode("alumno");
                  setError(null);
                }}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  regMode === "alumno"
                    ? "bg-slate-800 text-slate-50"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Alumno
              </button>
              <button
                type="button"
                onClick={() => {
                  setRegMode("profesor");
                  setError(null);
                }}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  regMode === "profesor"
                    ? "bg-slate-800 text-slate-50"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Docente
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  id="nombre"
                  value={regNombre}
                  onChange={(e) => setRegNombre(e.target.value)}
                  placeholder="Nombre"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="apellido">Apellido</Label>
                <Input
                  id="apellido"
                  value={regApellido}
                  onChange={(e) => setRegApellido(e.target.value)}
                  placeholder="Apellido"
                  required
                />
              </div>
            </div>

            {regMode === "alumno" ? (
              <>
                <div className="space-y-1.5">
                  <Label htmlFor="reg-legajo">Legajo</Label>
                  <Input
                    id="reg-legajo"
                    value={regLegajo}
                    onChange={(e) => setRegLegajo(e.target.value)}
                    placeholder="Ej: 12345"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="carrera">Carrera</Label>
                  <Select
                    value={regCarrera}
                    onValueChange={setRegCarrera}
                    required
                  >
                    <SelectTrigger id="carrera">
                      <SelectValue placeholder="Seleccioná una carrera" />
                    </SelectTrigger>
                    <SelectContent>
                      {CARRERAS.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="comision">Comisión</Label>
                  <Select
                    value={regComision}
                    onValueChange={setRegComision}
                    required
                  >
                    <SelectTrigger id="comision">
                      <SelectValue placeholder="Seleccioná una comisión" />
                    </SelectTrigger>
                    <SelectContent>
                      {COMISIONES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            ) : (
              <div className="space-y-1.5">
                <Label htmlFor="reg-code">Código Docente</Label>
                <Input
                  id="reg-code"
                  type="password"
                  value={regCode}
                  onChange={(e) => setRegCode(e.target.value)}
                  placeholder="Ingrese el código docente"
                  required
                />
              </div>
            )}

            {error && <p className="text-sm text-red-400">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600"
              disabled={isLoading}
            >
              {isLoading ? "Registrando..." : "Registrarse"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
