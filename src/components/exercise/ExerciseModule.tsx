"use client";

import { useState, isValidElement, cloneElement } from "react";

import { Exercise } from "@/types";
import { useVisit } from "@/hooks/useVisit";
import { VisitCounter } from "./VisitCounter";
import { TheoryPanelProps } from "./TheoryPanel";

interface ExerciseModuleProps {
  exercise: Exercise;
  params: React.ReactNode;
  visualization: React.ReactNode;
  results: React.ReactNode;
  theory: React.ReactNode;
  context: React.ReactNode;
}

export function ExerciseModule({
  exercise,
  params,
  visualization,
  results,
  theory,
  context,
}: ExerciseModuleProps) {
  const pagePath = `/ejercicios/${exercise.slug}`;
  useVisit(pagePath);

  const theoryDefaultOpen =
    isValidElement<TheoryPanelProps>(theory)
      ? (theory.props.defaultOpen ?? false)
      : false;

  const [theoryOpen, setTheoryOpen] = useState(theoryDefaultOpen);

  const theoryNode = isValidElement<TheoryPanelProps>(theory)
    ? cloneElement(theory, { onOpenChange: setTheoryOpen })
    : theory;

  return (
    <div className="space-y-6 p-4 pb-12 md:p-6 md:pb-12">
      <header className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-slate-50 md:text-3xl">
            {exercise.title}
          </h1>
          <VisitCounter pagePath={pagePath} />
        </div>
        <p className="max-w-3xl text-slate-400">{exercise.description}</p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {visualization}
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur-md md:p-5">
            <h3 className="mb-4 text-sm font-semibold text-slate-50">
              Parámetros
            </h3>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {params}
            </div>
          </div>
          {theoryOpen && context}
        </div>

        <div className="space-y-6">
          {results}
          {theoryNode}
        </div>
      </div>

      {!theoryOpen && context}
    </div>
  );
}
