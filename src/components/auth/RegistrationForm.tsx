"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AcademicSelect } from "./AcademicSelect";
import { RoleSelect } from "./RoleSelect";
import { createClient } from "@/lib/supabase/client";
import { validateInvitationCode } from "@/lib/auth/validateInvitation";
import { Role } from "@/types";

const baseSchema = z.object({
  email: z.string().email("Ingresá un correo válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  nombre: z.string().min(2, "El nombre es obligatorio"),
  apellido: z.string().min(2, "El apellido es obligatorio"),
  role: z.enum(["alumno", "profesor"]),
  invitationCode: z.string().optional(),
});

const alumnoSchema = baseSchema.extend({
  legajo: z.string().min(4, "El legajo es obligatorio"),
  carrera: z.string().min(1, "Seleccioná una carrera"),
  comision: z.string().min(1, "Seleccioná una comisión"),
});

const profesorSchema = baseSchema.extend({
  legajo: z.string().optional(),
  carrera: z.string().optional(),
  comision: z.string().optional(),
  invitationCode: z.string().min(1, "El código de invitación es obligatorio"),
});

export function RegistrationForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<Role>("alumno");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nombre: "",
    apellido: "",
    legajo: "",
    carrera: "",
    comision: "",
    invitationCode: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const dataToValidate = { ...formData, role };
    const schema = role === "profesor" ? profesorSchema : alumnoSchema;
    const result = schema.safeParse(dataToValidate);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    if (role === "profesor" && !validateInvitationCode(formData.invitationCode)) {
      setErrors((prev) => ({
        ...prev,
        invitationCode: "Código de invitación inválido",
      }));
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            role,
            nombre: formData.nombre,
            apellido: formData.apellido,
            legajo: formData.legajo,
            carrera: formData.carrera,
            comision: formData.comision,
          },
        },
      });

      if (error) {
        toast.error(error.message || "Error desconocido");
      } else {
        toast.success("Registro exitoso. Ahora podés iniciar sesión.");
        router.push("/login");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al registrarse");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="nombre">Nombre</Label>
          <Input
            id="nombre"
            value={formData.nombre}
            onChange={(e) => updateField("nombre", e.target.value)}
            placeholder="Juan"
            required
            aria-invalid={!!errors.nombre}
          />
          {errors.nombre && (
            <p className="text-xs text-red-400">{errors.nombre}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="apellido">Apellido</Label>
          <Input
            id="apellido"
            value={formData.apellido}
            onChange={(e) => updateField("apellido", e.target.value)}
            placeholder="Pérez"
            required
            aria-invalid={!!errors.apellido}
          />
          {errors.apellido && (
            <p className="text-xs text-red-400">{errors.apellido}</p>
          )}
        </div>
      </div>

      {role === "alumno" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="legajo">Legajo</Label>
            <Input
              id="legajo"
              value={formData.legajo}
              onChange={(e) => updateField("legajo", e.target.value)}
              placeholder="12345"
              required={role === "alumno"}
              aria-invalid={!!errors.legajo}
            />
            {errors.legajo && (
              <p className="text-xs text-red-400">{errors.legajo}</p>
            )}
          </div>

          <AcademicSelect
            carrera={formData.carrera}
            comision={formData.comision}
            onCarreraChange={(value) => updateField("carrera", value)}
            onComisionChange={(value) => updateField("comision", value)}
            errors={{ carrera: errors.carrera, comision: errors.comision }}
          />
        </>
      )}

      <RoleSelect value={role} onChange={setRole} />

      {role === "profesor" && (
        <div className="space-y-2">
          <Label htmlFor="invitationCode">Código de invitación</Label>
          <Input
            id="invitationCode"
            type="password"
            value={formData.invitationCode}
            onChange={(e) => updateField("invitationCode", e.target.value)}
            placeholder="••••••••"
            required={role === "profesor"}
            aria-invalid={!!errors.invitationCode}
          />
          {errors.invitationCode && (
            <p className="text-xs text-red-400">{errors.invitationCode}</p>
          )}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Correo electrónico</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => updateField("email", e.target.value)}
          placeholder="juan.perez@ejemplo.com"
          required
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p className="text-xs text-red-400">{errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => updateField("password", e.target.value)}
          placeholder="••••••••"
          required
          minLength={6}
          aria-invalid={!!errors.password}
        />
        {errors.password && (
          <p className="text-xs text-red-400">{errors.password}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Registrando..." : "Crear cuenta"}
      </Button>
    </form>
  );
}
