"use client";
// Ejercicio guiado para herramientas de línea de comandos: cada paso muestra la
// instrucción, el comando o archivo exacto y el resultado esperado. El usuario
// marca los pasos que ya hizo (estado local de la página, no se guarda).
import { useState } from "react";
import CopyButton from "./CopyButton";
import RichText from "./RichText";
interface Step {
  instruction: string;
  command?: string;
  file?: { name: string; code: string };
  expected?: string;
}
export default function Exercise({
  title,
  description,
  steps,
  verify,
}: {
  title: string;
  description?: string;
  steps: Step[];
  verify: string;
}) {
  const [done, setDone] = useState<boolean[]>(() => steps.map(() => false));
  const total = done.filter(Boolean).length;
  return (
    <section
      aria-label={title}
      className="overflow-hidden rounded-xl border border-brand-300 bg-white shadow-sm dark:border-brand-700 dark:bg-slate-900"
    >
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-brand-200 bg-brand-50 px-4 py-2 dark:border-brand-800 dark:bg-brand-900/20">
        <div>
          <p className="text-sm font-semibold text-brand-800 dark:text-brand-200">🧪 {title}</p>
          {description && (
            <p className="text-xs text-brand-700 dark:text-brand-300">
              <RichText text={description} />
            </p>
          )}
        </div>
        <p className="text-xs font-medium text-brand-700 dark:text-brand-300" aria-live="polite">
          {total} de {steps.length} {steps.length === 1 ? "paso" : "pasos"}
        </p>
      </header>
      <ol className="divide-y divide-slate-200 dark:divide-slate-700">
        {steps.map((step, i) => (
          <li key={i} className="flex flex-col gap-2 px-4 py-3">
            <label className="flex cursor-pointer items-start gap-2 text-sm text-slate-800 dark:text-slate-100">
              <input
                type="checkbox"
                checked={done[i]}
                onChange={() => setDone((prev) => prev.map((v, j) => (j === i ? !v : v)))}
                className="mt-1 h-4 w-4 accent-[#b8451f]"
              />
              <span>
                <span className="font-semibold">Paso {i + 1}. </span>
                <RichText text={step.instruction} />
              </span>
            </label>
            {step.command && (
              <div className="overflow-hidden rounded-lg border border-slate-700 bg-[#0d1117]">
                <div className="flex items-center justify-between border-b border-slate-700 px-3 py-1">
                  <span className="text-xs font-medium text-slate-400">Terminal</span>
                  <CopyButton text={step.command} />
                </div>
                <pre className="overflow-x-auto p-3 font-mono text-sm text-slate-100">
                  <span className="select-none text-slate-500">$ </span>
                  {step.command}
                </pre>
              </div>
            )}
            {step.file && (
              <div className="overflow-hidden rounded-lg border border-slate-700 bg-[#0d1117]">
                <div className="flex items-center justify-between border-b border-slate-700 px-3 py-1">
                  <span className="text-xs font-medium text-slate-400">{step.file.name}</span>
                  <CopyButton text={step.file.code} />
                </div>
                <pre className="overflow-x-auto p-3 font-mono text-sm text-slate-100">{step.file.code}</pre>
              </div>
            )}
            {step.expected && (
              <div className="rounded-lg bg-slate-100 p-3 dark:bg-slate-800">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Resultado esperado
                </p>
                <pre className="mt-1 whitespace-pre-wrap font-mono text-xs text-slate-800 dark:text-slate-200">
                  {step.expected}
                </pre>
              </div>
            )}
          </li>
        ))}
      </ol>
      <div className="border-t border-slate-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 dark:border-slate-700 dark:bg-emerald-900/20 dark:text-emerald-100">
        <span className="font-semibold">Cómo verificar: </span>
        <RichText text={verify} />
      </div>
    </section>
  );
}
