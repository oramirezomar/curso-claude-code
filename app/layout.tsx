import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Claude Code: guía completa para desarrolladores",
  description:
    "Curso de autoestudio de Claude Code, de la instalación a la producción: contexto y costos, flujo de trabajo, specs, skills, hooks, MCP, agentes y plugins. Lecciones interactivas con imágenes, ejercicios guiados y autoevaluación.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
