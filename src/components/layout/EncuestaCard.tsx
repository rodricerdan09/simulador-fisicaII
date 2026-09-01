"use client";

import { useEffect, useState } from "react";
import { ClipboardList, ExternalLink } from "lucide-react";

import { getSesion } from "@/lib/role";

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeSWnZBZediDfSUh_Mf5S6VAC1XdoYuQT__JGE8Fpv_1LL2qw/viewform";

export function EncuestaCard() {
  const [link, setLink] = useState(`${FORM_URL}?usp=pp_url`);

  useEffect(() => {
    const sesion = getSesion();
    if (!sesion) return;

    const nombre = `${sesion.nombre ?? ""} ${sesion.apellido ?? ""}`.trim();
    const carrera = sesion.carrera ?? "";

    const params = new URLSearchParams({
      usp: "pp_url",
      "entry.295797884": nombre,
      "entry.1103358039": carrera,
    });

    setLink(`${FORM_URL}?${params.toString()}`);
  }, []);

  return (
    <section className="rounded-2xl border border-cyan-500/30 bg-slate-900/50 p-6 backdrop-blur-md">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10">
            <ClipboardList className="h-6 w-6 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-50">
              Encuesta de Satisfacción
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Ayudanos a mejorar el simulador. Completá una breve encuesta con
              tus comentarios y sugerencias.
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400 transition-colors group-hover:bg-cyan-500/20">
          Completar encuesta
          <ExternalLink className="h-4 w-4" />
        </div>
      </a>
    </section>
  );
}
