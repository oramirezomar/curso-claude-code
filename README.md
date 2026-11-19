# Claude Code: guía completa para desarrolladores

Curso de autoestudio (Next.js 15 + Tailwind + Shiki), una lección por día. Fuente del contenido: `../documentacion_claude/` (transcripciones `Clase NNN.txt`, artículos `Articulo NNN.txt` e `indice.tsv`) y el plan de días en `../documentacion_claude/mapa-dias.md`.

## Ejecutar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # compila y valida el catálogo
```

## Agregar un día nuevo

1. Crear `content/lessons/day-XX.ts` exportando `dayXX: Lesson`.
2. Importarlo en `content/lessons/index.ts` y añadirlo al arreglo `lessons`.
3. Si abre una sección nueva, agregar su entrada a `sections` (los `dayRange` deben ser contiguos). Si la amplía, ensanchar su `dayRange`.
4. Ilustraciones en `public/img/dia-XX/*.svg`, referenciadas con el bloque `image`.

`assertCatalog()` hace fallar el build si hay slugs o días duplicados, huecos o secciones inconsistentes.

## Bloques de contenido (`lib/types.ts`)

| Bloque | Uso |
| --- | --- |
| `paragraph`, `heading`, `list`, `quote`, `callout`, `checklist`, `table` | Texto estructurado (admite `` `código` `` en línea y enlaces `[texto](https://url)`) |
| `code`, `comparison`, `tabs` | Código resaltado con botón Copiar |
| `image` | Ilustración SVG con `alt` obligatorio y pie de figura |
| `keyFacts` | Tarjetas de cifras clave (texto plano) |
| `timeline` | Línea de tiempo navegable |
| `exercise` | Ejercicio guiado de terminal: pasos con comando o archivo, resultado esperado y verificación |
| `playground` | Editor ejecutable de JavaScript en un `<iframe sandbox="allow-scripts">` aislado. Úsalo cuando haya código real (scripts de hooks, JSON, lógica de comprobación) |
| `accordion` | Preguntas frecuentes desplegables |
| `topicTracker` | Lista de temas marcables con `localStorage` |

Cada lección termina con autoevaluación (`selfCheck`). El progreso se guarda en `localStorage`.

## Reglas editoriales

- Curso general **sin autor**: no se menciona al instructor, la plataforma de origen ni las clases del video, y no se usa su voz en primera persona.
- Las transcripciones son material de partida y pueden estar desactualizadas. Cada día se **valida con la documentación vigente** y se corrige lo necesario. Cada lección lleva la tabla «Datos que suelen aparecer desactualizados» y la lista «Fuentes consultadas» con el mes de validación.
- Los comandos y salidas esperadas se ejecutan en un equipo real antes de publicarse. Los enlaces citados responden con HTTP 200.
- Texto plano (sin backticks) en títulos, tarjetas `keyFacts`, leyendas de imagen y encabezados de tabla.
