import type { Lesson } from "@/lib/types";
// Día 22 · Clases 79 y 80 de la transcripción.
// Contenido verificado en noviembre de 2026.
export const day22: Lesson = {
  day: 22,
  slug: "implementar-el-mvp-paso-a-paso-y-mcp-de-playwright",
  title: "Implementar el MVP paso a paso y conectar Playwright",
  section: "Skills y Playwright MCP",
  estimatedMinutes: 90,
  icon: "🛠",
  objectives: [
    "Lanzar /spec-impl sobre un spec aprobado, y revisar cada paso antes de dejarlo avanzar.",
    "Reconocer los cuatro fallos que aparecieron al implementar el MVP y arreglar cada uno con su causa, no con un parche.",
    "Comprobar los criterios de aceptación con un script y cerrar el spec en estado implementado.",
    "Comparar una pantalla con su plantilla midiendo cajas, además de mirarla.",
    "Instalar el servidor MCP de Playwright, saber dónde deja sus archivos y mantenerlos fuera de Git.",
  ],
  blocks: [
    {
      type: "paragraph",
      text: "El spec 001 está aprobado y la rama del spec está lista. Esta lección lo implementa de principio a fin con `/spec-impl`, un paso cada vez, y después conecta el servidor MCP de Playwright para que Claude pueda abrir la aplicación y compararla con las plantillas. Lo más útil de la implementación no es el código que sale, sino los fallos que aparecen en el camino y las señales que los delatan. Aquí hubo cuatro, y todos tienen una causa concreta.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "8", label: "Pasos del plan del spec" },
        { value: "10", label: "Commits desde el spec aprobado hasta el spec implementado" },
        { value: "30", label: "Comprobaciones que hace el script de rutas" },
        { value: "2", label: "Fallos del script en la primera ejecución con la configuración de partida" },
        { value: "12", label: "Comparaciones de pantalla y ancho que quedaron idénticas a las plantillas" },
        { value: ".playwright-mcp", label: "Carpeta donde Playwright deja sus archivos si no se configura nada" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text: "Contenido verificado en noviembre de 2026. Implementé el spec 001 sobre el proyecto de la lección anterior (Next.js 16.4.6, React 19.3.0 y Tailwind 4.3.3), con un commit por paso, y ejecuté tipos, lint, build y el script de rutas. Medí las seis pantallas contra sus plantillas en dos anchos con un servidor MCP de Chrome DevTools. Probé el servidor MCP de Playwright, en su versión 0.0.86, con un cliente mínimo, sin pasar por Claude Code, para ver dónde guarda cada archivo. No pude ejecutar Claude Code en esta máquina: lo que muestran los ejercicios 1 y 8 con comandos de Claude es orientativo, y el código que escriba tu Claude será distinto del de referencia. Eso no importa si el script de rutas y los criterios del spec pasan.",
    },
    { type: "heading", level: 2, text: "Antes de lanzar /spec-impl" },
    {
      type: "paragraph",
      text: "El skill se detiene si el spec no está aprobado, y esa aprobación manual es el punto de control del flujo. Antes de lanzarlo conviene comprobar tres cosas, porque todas se pueden verificar con un comando y ahorran un paso fallido.",
    },
    {
      type: "table",
      headers: ["Comprobación", "Por qué", "Comando"],
      rows: [
        ["Estás en la rama del spec", "El skill la reutiliza si ya estás en ella, y la crea si no.", "git branch --show-current"],
        ["No hay cambios sin guardar", "Si los hay, el skill se detiene y pregunta.", "git status --porcelain"],
        ["El estado es aprobado", "Un spec en borrador no se implementa.", "head -3 specs/001-mvp-arcade-vault.md"],
        ["La conversación está limpia", "El contexto de la entrevista del spec ya no hace falta.", "/clear"],
      ],
    },
    {
      type: "code",
      lang: "text",
      title: "Dentro de Claude Code",
      code: `/spec-impl 001`,
    },
    {
      type: "paragraph",
      text: "El argumento es el número del spec. Claude lee `specs/001-*.md`, te resume el alcance, el plan y los criterios, y espera tu confirmación antes de tocar nada. Es buen momento para decirle en qué idioma quieres sus mensajes. Después sigue el plan en orden, y no es determinista: dos ejecuciones sobre el mismo spec dan código distinto. Lo que debe coincidir no es cada línea, sino los criterios de aceptación.",
    },
    {
      type: "image",
      src: "/img/dia-22/ciclo-de-un-paso.svg",
      alt: "Cinco recuadros en fila: uno, lee el paso del plan; dos, cambia solo los archivos de ese paso; tres, comprueba tipos, lint y build, con permiso para los comandos de npm; cuatro, hace un commit por paso, con git add y git commit permitidos; cinco, tú revisas el cambio y dices que continúe. Una flecha vuelve del último al primero con el texto: ocho veces, una por cada paso del plan. Debajo, dos recuadros. A la izquierda, qué mirar en cada cambio: que solo toque archivos de ese paso, imports todavía sin usar, valores escritos a mano que ya están en app/data y que el commit describa ese paso. A la derecha, si un paso falla: copia el error completo, con el nombre del archivo y la línea, y pégalo, no sigas hasta que compile, y si cancelas pide retomar en el paso donde te quedaste.",
      caption: "Cada paso del plan termina en un commit y en una revisión tuya.",
    },
    {
      type: "paragraph",
      text: "Un detalle del skill que escribimos en la lección 16: su cabecera permite sin preguntar solo `git status`, `git switch`, `git add` y `git commit`. Cualquier otro comando, como `npx tsc` o `npm run build`, te pedirá permiso. Eso no es un fallo. Es el skill funcionando como se diseñó, y te da ocasión de ver qué está a punto de ejecutar. Si Claude te ofrece la opción de no volver a preguntar por un comando, acéptala solo para comandos que entiendas y que no modifiquen nada fuera del proyecto.",
    },
    {
      type: "paragraph",
      text: "Revisa cada paso de verdad. Un paso pequeño es fácil de leer, y ese es el motivo de trabajar así. Busca imports que todavía no se usan, archivos fuera del paso y valores que ya existen en `app/data` escritos a mano. Si un error aparece, copia el mensaje completo, con el nombre del archivo y la línea, y pégalo en la conversación. Y si cancelas a mitad, no hace falta empezar de nuevo: dile en qué paso te quedaste y el skill continúa desde ahí, porque cada paso anterior ya tiene su commit.",
    },
    { type: "heading", level: 2, text: "El plan, paso a paso" },
    {
      type: "table",
      headers: ["Paso", "Qué se crea", "Cómo se comprueba"],
      rows: [
        ["1. Datos", "app/data/juegos.ts y app/data/puntajes.ts, con seis juegos y ocho puntajes por juego.", "npx tsc --noEmit"],
        ["2. Base", "app/layout.tsx en español y sin fuentes externas, y components/Cabecera.tsx.", "tsc y lint"],
        ["3. Inicio", "app/page.tsx con las seis tarjetas.", "Build"],
        ["4. Previsualización", "app/juegos/[id]/page.tsx, con 404 si el juego no existe.", "Build"],
        ["5. Jugar", "app/juegos/[id]/jugar/page.tsx con la arena de muestra.", "Build"],
        ["6. Salón de la fama", "app/salon-de-la-fama/page.tsx con una pestaña por juego.", "Build"],
        ["7. Formularios", "components/FormularioCuenta.tsx y las páginas de iniciar sesión y crear cuenta.", "tsc y lint"],
        ["8. Verificar", "scripts/probar-rutas.mjs y el estado del spec en implementado.", "El script y los criterios"],
      ],
    },
    {
      type: "paragraph",
      text: "Dos decisiones del código son las que más conviene entender. La cabecera es un componente de cliente, porque necesita `usePathname` para marcar con `aria-current` el enlace de la página actual. Y el formulario también, porque cancela el envío con `onSubmit`. Sin esa cancelación, un formulario sin `action` envía los campos por GET a la misma dirección, y la contraseña acabaría escrita en la barra del navegador. Lo comprobé enviando el formulario con datos de prueba: la dirección no cambia, la página no se recarga y el campo conserva su valor.",
    },
    { type: "heading", level: 2, text: "Cuatro fallos reales y sus señales" },
    {
      type: "image",
      src: "/img/dia-22/cuatro-senales-reales.svg",
      alt: "Cuatro filas con tres columnas: cómo se vio, qué ocurría y el arreglo. Primera: en tsc, el mensaje does not satisfy the constraint, porque faltaban los tipos de las rutas nuevas, que genera Next.js; se arregla con npx next typegen antes de tsc. Segunda: en el build, uncached or runtime data during prerendering, porque searchParams se leía fuera de Suspense; se arregla leyéndolo dentro de un componente envuelto en Suspense. Tercera: en el script de rutas, FALLA juegos tetris responde 404, solo en la primera visita, porque se sirve la estructura con 200 y luego se guarda el 404; se arregla con partialPrefetching en false. Cuarta: al comparar cajas, main mide 860 frente a 772 de alto, porque Tailwind quita márgenes, negrita y viñetas que la plantilla daba por hechos; se arregla con cuatro reglas al final de globals.css.",
      caption: "Cada fallo avisó de una manera distinta.",
    },
    { type: "heading", level: 3, text: "1. Los tipos de las rutas no existen hasta que Next.js los genera" },
    {
      type: "paragraph",
      text: "Next.js ofrece los tipos globales `PageProps` y `LayoutProps`, que dan forma a `params` y `searchParams` según la ruta. Al escribir `PageProps<\"/juegos/[id]\">` en una página nueva, `npx tsc --noEmit` falla con `Type '\"/juegos/[id]\"' does not satisfy the constraint '\"/\"'`. No es un fallo de tu código: esos tipos los genera Next.js al arrancar el servidor de desarrollo o al compilar, y todavía no conocen la ruta que acabas de crear. Se regeneran sin compilar con `npx next typegen`. Si pides a Claude que compruebe tipos, esa es la línea que debe ir antes.",
    },
    { type: "heading", level: 3, text: "2. searchParams exige Suspense con Cache Components" },
    {
      type: "paragraph",
      text: "El salón de la fama elige el juego con `?juego=culebra`, que es un dato de la petición. El proyecto tiene Cache Components activado, que es lo que create-next-app deja por defecto, y con eso Next.js prerrenderiza lo que puede y no admite que leas datos de la petición fuera de un límite de Suspense. La primera versión del paso 6 lo hacía así, y la compilación se detuvo con este mensaje.",
    },
    {
      type: "code",
      lang: "text",
      title: "Salida real de npm run build",
      code: `Error: Route "/salon-de-la-fama": Next.js encountered uncached or runtime data during prerendering.
\`fetch(...)\`, \`cookies()\`, \`headers()\`, \`params\`, \`searchParams\`, or \`connection()\` accessed outside of \`<Suspense>\` prevents the route from being prerendered, blocking the page load and leading to a slower user experience.`,
    },
    {
      type: "paragraph",
      text: "El mensaje propone tres salidas. La que encaja es la primera: dar a Next.js un marcador de posición con Suspense, y leer `searchParams` dentro. La página pasa a ser síncrona, recibe la promesa sin esperarla y se la entrega a un componente que sí la espera, dentro del límite. El título y el subtítulo se prerrenderizan, y la tabla llega después.",
    },
    {
      type: "comparison",
      lang: "ts",
      before: {
        title: "Página que espera searchParams",
        code: `export default async function SalonDeLaFama({ searchParams }: PageProps<"/salon-de-la-fama">) {
  const { juego: pedido } = await searchParams;
  // ... toda la página depende de la petición
}`,
      },
      after: {
        title: "Página que delega en un componente con Suspense",
        code: `export default function SalonDeLaFama({ searchParams }: PageProps<"/salon-de-la-fama">) {
  return (
    <main className="contenedor">
      <h1>Salón de la fama</h1>
      <Suspense fallback={<p className="aviso">Cargando puntajes…</p>}>
        <Clasificacion consulta={searchParams} />
      </Suspense>
    </main>
  );
}`,
      },
    },
    { type: "heading", level: 3, text: "3. Un juego que no existe responde 200 la primera vez" },
    {
      type: "paragraph",
      text: "Este es el fallo más traicionero, porque no se ve en el navegador: `/juegos/tetris` muestra la página de no encontrado, y solo el código de estado HTTP delata el problema. El script de rutas, ejecutado contra un servidor recién arrancado, falló en las dos rutas de un juego inexistente, y al ejecutarlo de nuevo pasó todo. La segunda vez ya había una copia guardada con el 404.",
    },
    {
      type: "code",
      lang: "text",
      title: "Primera ejecución del script con partialPrefetching activado",
      code: `FALLA  /juegos/tetris responde 404
FALLA  /juegos/tetris/jugar responde 404
RESULTADO: 2 fallo(s)`,
    },
    {
      type: "paragraph",
      text: "La documentación de Next.js lo explica con dos datos. Con Partial Prefetching, un identificador que `generateStaticParams` no listó recibe primero la estructura de la página, con estado 200, y se actualiza en segundo plano. Y `notFound()` solo devuelve 404 cuando se ejecuta antes de que empiece la respuesta; si ya está emitiéndose, el estado se queda en 200 y se añade `noindex`. Sin Partial Prefetching, la primera petición espera al resultado completo, y el 404 llega desde la primera vez. Por eso `next.config.ts` pasa a `partialPrefetching: false`. Es una decisión con precio: la documentación avisa de que ambas funciones se activarán en todas partes en la próxima versión mayor y que las opciones se eliminarán, así que conviene revisar esta decisión entonces.",
    },
    {
      type: "paragraph",
      text: "El salón de la fama no tiene ese problema porque la decisión es otra. Un valor de `juego` que no corresponde a ningún juego muestra el primero, en lugar de responder 404. Es una elección del spec, anotada en sus decisiones, y evita que una dirección mal escrita deje la pantalla en blanco.",
    },
    { type: "heading", level: 3, text: "4. Tailwind quita lo que la plantilla daba por hecho" },
    {
      type: "paragraph",
      text: "Con las seis pantallas hechas y la compilación en verde, las pantallas se veían bien. Pero al medir las cajas de cada pantalla contra su plantilla, cinco de las seis diferían en altura: el inicio medía 860 píxeles de alto en la plantilla y 772 en la aplicación. La causa está en la primera línea de `globals.css`. El import de Tailwind incluye Preflight, una hoja de reinicio que quita valores que los navegadores traen de serie, y las plantillas, escritas en HTML y CSS corrientes, los daban por hechos.",
    },
    {
      type: "table",
      headers: ["Elemento", "Plantilla", "Aplicación antes del ajuste", "Causa en Preflight"],
      rows: [
        ["h2 de una tarjeta", "24 px", "16 px", "Los títulos heredan el tamaño del texto."],
        ["h1 y h2", "Negrita (700)", "Normal (400)", "Los títulos heredan también el grosor."],
        ["p", "16 px de margen arriba y abajo", "0", "Se eliminan los márgenes por defecto."],
        ["ul de controles", "Con viñetas y 16 px de margen", "Sin viñetas y sin margen", "Las listas llegan sin viñetas ni números."],
      ],
    },
    {
      type: "paragraph",
      text: "Hay dos soluciones razonables. La documentación de Tailwind permite desactivar Preflight, importando por separado el tema y las utilidades. O se añaden unas reglas propias que devuelvan lo que falta. Se eligió la segunda porque la primera línea de `globals.css` sigue siendo la que se explicó en la lección anterior, y el cambio queda a la vista en cuatro líneas. Van al final del archivo, fuera de cualquier capa, y por eso ganan a las de Preflight, que están en la capa base. La documentación de Tailwind recomienda escribirlas dentro de `@layer base`, y también funciona; aquí se dejaron sin capa porque es lo que se comprobó.",
    },
    {
      type: "code",
      lang: "css",
      title: "Final de app/globals.css",
      code: `h1, h2 { font-weight: 700; }
h2 { font-size: 1.5rem; }
p, ul { margin: 1em 0; }
ul { list-style: disc; }`,
    },
    {
      type: "paragraph",
      text: "Tras ese ajuste, las doce comparaciones, seis pantallas en dos anchos, dieron exactamente las mismas cajas. Mirar una captura no habría detectado esta diferencia con tanta precisión: 88 píxeles en una página larga se ven como un pequeño desajuste y se perdonan. Un número no se perdona.",
    },
    { type: "heading", level: 2, text: "Mirar la pantalla y medirla" },
    {
      type: "paragraph",
      text: "Para comparar usé una técnica que puedes reproducir sin ningún servidor MCP. Un pequeño servidor sirve las plantillas y la aplicación bajo el mismo origen, y desde una página se cargan ambas en dos iframes del mismo ancho. De cada una se recorren los elementos de la cabecera y del contenido, y de cada elemento se anota su etiqueta, su clase y su posición y tamaño redondeados. Si las dos listas coinciden, las pantallas miden lo mismo. Si no, la primera caja que difiere dice qué elemento es y en cuánto. El experimento 12 reproduce ese cálculo con datos reales.",
    },
    {
      type: "paragraph",
      text: "Medir y mirar no se excluyen. La captura de Playwright le enseña a Claude cómo se ve, incluidos colores, contraste y composición, que un número no explica. La medición le dice con exactitud cuánto se aparta. Un buen prompt pide las dos cosas: compara la pantalla con su plantilla, indica las diferencias medidas y corrige las que cambien el diseño.",
    },
    { type: "heading", level: 2, text: "El servidor MCP de Playwright" },
    {
      type: "paragraph",
      text: "Un servidor MCP es un programa que ofrece herramientas a Claude. El de Playwright, que publica el equipo de Playwright de Microsoft, le da las de un navegador: abrir una dirección, hacer clic, escribir, redimensionar la ventana, leer la consola y la red, y tomar capturas y una descripción de la página. En la versión 0.0.86 son 25 herramientas, con nombres como `browser_navigate`, `browser_take_screenshot`, `browser_snapshot`, `browser_click` y `browser_resize`. Con ellas Claude puede abrir `localhost`, ver lo que hiciste y corregirlo en vez de suponerlo.",
    },
    {
      type: "code",
      lang: "bash",
      title: "Terminal, fuera de Claude Code",
      code: `claude mcp add --scope project playwright -- npx @playwright/mcp@latest --output-dir .playwright-screenshots`,
    },
    {
      type: "paragraph",
      text: "Ese comando se ejecuta en tu terminal, no dentro de una sesión. La parte `--` separa las opciones de Claude de las del servidor: todo lo que va después se pasa tal cual al servidor. El alcance cambia dónde se guarda la configuración.",
    },
    {
      type: "table",
      headers: ["Alcance", "Dónde se guarda", "Para quién"],
      rows: [
        ["local (el predeterminado)", "En ~/.claude.json, bajo la ruta de tu proyecto", "Solo para ti, en este proyecto."],
        ["project", "En .mcp.json, en la raíz del proyecto", "Para todo el equipo, si lo guardas en Git. Claude pide aprobación antes de usarlo."],
        ["user", "En ~/.claude.json, para todos tus proyectos", "Solo para ti, en cualquier proyecto."],
      ],
    },
    {
      type: "paragraph",
      text: "Para este proyecto el alcance `project` tiene sentido: la comprobación visual forma parte de cómo se trabaja, y quien clone el repositorio la tendrá. Compruébalo con `claude mcp get playwright`, que muestra el estado y la configuración. Dentro de una sesión, `/mcp` lista los servidores y permite desactivar uno para el proyecto sin borrar su configuración.",
    },
    {
      type: "callout",
      variant: "info",
      text: "Se suele decir que cada servidor MCP gasta tokens solo por estar conectado. Con la búsqueda de herramientas, que es el valor por defecto, al empezar la sesión solo se cargan los nombres de las herramientas y las instrucciones del servidor, y las definiciones completas se cargan cuando hacen falta. Tener Playwright conectado cuesta poco. Aun así, desactiva en /mcp los servidores que no uses en un proyecto.",
    },
    {
      type: "paragraph",
      text: "Una advertencia de seguridad razonable: Playwright abre un navegador real y carga páginas reales. Con tu servidor local no hay problema. Si le pides visitar páginas de terceros, el contenido de esas páginas llega a Claude como datos y puede contener texto que parezca una instrucción. Trátalo como lo que es: datos, no órdenes. Por defecto el navegador se abre con ventana, y la opción `--headless` lo ejecuta sin ella. La opción `--isolated` guarda el perfil en memoria en lugar de en disco, y así no se arrastran cookies entre sesiones.",
    },
    { type: "heading", level: 3, text: "Dónde deja sus archivos, y cómo ordenarlos" },
    {
      type: "paragraph",
      text: "En el video, tras usar Playwright, la raíz del proyecto se llenó de imágenes. Lo reproduje con el servidor real y el comportamiento tiene una explicación clara, que cambia la solución.",
    },
    {
      type: "image",
      src: "/img/dia-22/donde-guarda-playwright.svg",
      alt: "Tres recuadros. Sin opciones: una captura sin nombre y el estado de la página van a la carpeta .playwright-mcp, como page-fecha.png y page-fecha.yml, una carpeta oculta que nadie quiere subir a Git. Con la opción --output-dir: lo que se nombra solo va a la carpeta elegida, por ejemplo .playwright-screenshots, tanto las capturas como los estados de página. Con nombre explícito: un archivo home.png queda en la raíz del proyecto, porque el nombre manda y la opción no lo mueve, y un nombre como .playwright-screenshots/home.png queda en esa carpeta; por eso se desordena la raíz. Debajo, tres ajustes: añadir --output-dir al comando que añade el servidor, escribir en CLAUDE.md que las capturas llevan esa carpeta dentro del nombre del archivo, e ignorar las dos carpetas en .gitignore.",
      caption: "El nombre que pide Claude decide dónde queda el archivo.",
    },
    {
      type: "paragraph",
      text: "Sin ninguna opción, cada navegación y cada captura sin nombre dejan un `.png` y un `.yml` con el estado de la página dentro de `.playwright-mcp/`. Con `--output-dir`, todo lo que se nombra automáticamente va a la carpeta que elijas. Pero si Claude pide la captura con un nombre, como `home.png`, el archivo se resuelve contra la raíz del proyecto y la opción no lo afecta. Eso explica el desorden. La opción de la documentación es exactamente esa: es la carpeta de los archivos con nombre automático, y los que llevan nombre explícito no se tocan.",
    },
    {
      type: "paragraph",
      text: "El video lo resolvía diciéndole a Claude, con una almohadilla al principio del mensaje, que recordara la carpeta. Ese atajo no aparece en la documentación actual de Claude Code, que describe otra forma: pedirle a Claude que lo recuerde, o abrir `/memory`. Y como es un texto que Claude puede ignorar, no sustituye a la configuración. Conviene combinar los tres ajustes: la opción del servidor, una línea en CLAUDE.md que pida el nombre con la carpeta, y las dos carpetas en `.gitignore`.",
    },
    { type: "heading", level: 2, text: "Ejercicios guiados y experimentos" },
    {
      type: "paragraph",
      text: "Los ejercicios 2 a 7 se ejecutan con Git, Node, Next.js y el script, y sus salidas son reales. El ejercicio 6 necesita dos terminales. Los pasos con comandos de Claude y de `claude mcp`, en los ejercicios 1 y 8, son orientativos porque dependen de tu equipo y del modelo. Si tu Claude escribe el código de los pasos 1 a 7, la referencia sirve para comparar. Los experimentos del final se ejecutan en el navegador.",
    },
    {
      type: "exercise",
      title: "Ejercicio 1: preparar y lanzar /spec-impl",
      description: "Tres comprobaciones y el lanzamiento del skill.",
      steps: [
        {
          instruction: "Entra en el proyecto y comprueba la rama, que no haya cambios y el estado del spec.",
          command: "cd ~/ClaudeCode/06-arcade-vault && git branch --show-current && git status --porcelain && head -3 specs/001-mvp-arcade-vault.md",
          expected: "spec/001-mvp-arcade-vault\n---\nestado: aprobado\n---",
        },
        {
          instruction: "Abre Claude Code, limpia la conversación y lanza el skill. Confirma el alcance y el plan, y dile en qué idioma quieres sus mensajes.",
          command: "claude\n/clear\n/spec-impl 001",
          expected: "Claude resume el alcance, el plan y los criterios, y pregunta si empieza por el paso 1. No cambia nada antes de que lo confirmes.",
        },
      ],
      verify: "No aparece ningún archivo nuevo antes de tu confirmación. Si Claude empieza a escribir sin preguntar, para y repasa la cabecera del skill. Los ejercicios 2 a 7 muestran el código de referencia de cada paso para que compares con el tuyo.",
    },
    {
      type: "exercise",
      title: "Ejercicio 2: pasos 1 a 3, datos, base e inicio",
      description: "Los datos de muestra, la cabecera común y la pantalla de inicio.",
      steps: [
        {
          instruction: "Paso 1. Guarda los seis juegos.",
          file: { name: "app/data/juegos.ts", code: `export type Juego = {
  id: string;
  nombre: string;
  genero: string;
  descripcion: string;
  controles: string[];
  mejor: { jugador: string; puntaje: number };
};

export const JUEGOS: Juego[] = [
  {
    id: "rompe-bloques",
    nombre: "Rompe Bloques",
    genero: "Acción",
    descripcion: "Mueve la paleta, rebota la pelota y rompe todos los bloques antes de perder tus tres vidas.",
    controles: ["Flechas: mover la paleta", "P: pausa"],
    mejor: { jugador: "ANA", puntaje: 12450 },
  },
  {
    id: "culebra",
    nombre: "Culebra",
    genero: "Clásico",
    descripcion: "Guía a la culebra para comer fruta sin chocar con las paredes ni con tu propia cola.",
    controles: ["Flechas: girar", "P: pausa"],
    mejor: { jugador: "LUIS", puntaje: 9870 },
  },
  {
    id: "defensor",
    nombre: "Defensor",
    genero: "Disparos",
    descripcion: "Dispara a las naves invasoras antes de que lleguen al suelo.",
    controles: ["Flechas: mover la nave", "Espacio: disparar"],
    mejor: { jugador: "MARTA", puntaje: 15300 },
  },
  {
    id: "laberinto",
    nombre: "Laberinto",
    genero: "Puzzle",
    descripcion: "Encuentra la salida de cada laberinto antes de que se acabe el tiempo.",
    controles: ["Flechas: moverte", "R: reiniciar el nivel"],
    mejor: { jugador: "PEDRO", puntaje: 7420 },
  },
  {
    id: "saltarin",
    nombre: "Saltarín",
    genero: "Plataformas",
    descripcion: "Salta entre plataformas, esquiva obstáculos y recoge monedas.",
    controles: ["Flechas: moverte", "Espacio: saltar"],
    mejor: { jugador: "SOFÍA", puntaje: 11080 },
  },
  {
    id: "memoria",
    nombre: "Memoria",
    genero: "Puzzle",
    descripcion: "Encuentra todas las parejas de cartas con el menor número de intentos.",
    controles: ["Ratón: voltear cartas", "R: reiniciar"],
    mejor: { jugador: "JUAN", puntaje: 5960 },
  },
];

export function buscarJuego(id: string): Juego | undefined {
  return JUEGOS.find((juego) => juego.id === id);
}

export function formatearPuntaje(puntaje: number): string {
  return String(puntaje).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ".");
}` },
        },
        {
          instruction: "Guarda los ocho puntajes de cada juego.",
          file: { name: "app/data/puntajes.ts", code: `export type Puntaje = { jugador: string; puntaje: number };

export const PUNTAJES: Record<string, Puntaje[]> = {
  "rompe-bloques": [
    { jugador: "ANA", puntaje: 12450 },
    { jugador: "MARTA", puntaje: 11900 },
    { jugador: "LUIS", puntaje: 10320 },
    { jugador: "SOFÍA", puntaje: 9870 },
    { jugador: "PEDRO", puntaje: 8140 },
    { jugador: "JUAN", puntaje: 7050 },
    { jugador: "ELENA", puntaje: 6480 },
    { jugador: "DIEGO", puntaje: 5220 },
  ],
  culebra: [
    { jugador: "LUIS", puntaje: 9870 },
    { jugador: "ELENA", puntaje: 9120 },
    { jugador: "ANA", puntaje: 8640 },
    { jugador: "DIEGO", puntaje: 7900 },
    { jugador: "SOFÍA", puntaje: 7310 },
    { jugador: "MARTA", puntaje: 6580 },
    { jugador: "JUAN", puntaje: 5740 },
    { jugador: "PEDRO", puntaje: 4960 },
  ],
  defensor: [
    { jugador: "MARTA", puntaje: 15300 },
    { jugador: "DIEGO", puntaje: 14150 },
    { jugador: "ANA", puntaje: 13020 },
    { jugador: "PEDRO", puntaje: 11870 },
    { jugador: "LUIS", puntaje: 10440 },
    { jugador: "ELENA", puntaje: 9360 },
    { jugador: "SOFÍA", puntaje: 8210 },
    { jugador: "JUAN", puntaje: 6930 },
  ],
  laberinto: [
    { jugador: "PEDRO", puntaje: 7420 },
    { jugador: "SOFÍA", puntaje: 7010 },
    { jugador: "JUAN", puntaje: 6550 },
    { jugador: "ANA", puntaje: 6120 },
    { jugador: "ELENA", puntaje: 5480 },
    { jugador: "MARTA", puntaje: 4890 },
    { jugador: "LUIS", puntaje: 4230 },
    { jugador: "DIEGO", puntaje: 3670 },
  ],
  saltarin: [
    { jugador: "SOFÍA", puntaje: 11080 },
    { jugador: "ANA", puntaje: 10260 },
    { jugador: "JUAN", puntaje: 9540 },
    { jugador: "MARTA", puntaje: 8730 },
    { jugador: "DIEGO", puntaje: 7820 },
    { jugador: "PEDRO", puntaje: 6910 },
    { jugador: "LUIS", puntaje: 5890 },
    { jugador: "ELENA", puntaje: 4720 },
  ],
  memoria: [
    { jugador: "JUAN", puntaje: 5960 },
    { jugador: "ELENA", puntaje: 5640 },
    { jugador: "ANA", puntaje: 5310 },
    { jugador: "LUIS", puntaje: 4870 },
    { jugador: "SOFÍA", puntaje: 4420 },
    { jugador: "DIEGO", puntaje: 3980 },
    { jugador: "MARTA", puntaje: 3540 },
    { jugador: "PEDRO", puntaje: 3100 },
  ],
};` },
        },
        {
          instruction: "Regenera los tipos de las rutas, comprueba los tipos y guarda el paso.",
          command: "npx next typegen > /dev/null 2>&1; npx tsc --noEmit && echo tipos correctos && git add app/data && git commit -q -m \"paso 1: datos de muestra de juegos y puntajes\" && git log --format=%s -1",
          expected: "tipos correctos\npaso 1: datos de muestra de juegos y puntajes",
        },
        {
          instruction: "Paso 2. Sustituye el layout por uno en español y sin fuentes externas.",
          file: { name: "app/layout.tsx", code: `import type { Metadata } from "next";
import Cabecera from "@/components/Cabecera";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arcade Vault",
  description: "Juegos arcade para jugar en el navegador y competir por puntos.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
      <body>
        <Cabecera />
        {children}
      </body>
    </html>
  );
}` },
        },
        {
          instruction: "Crea la cabecera común, que marca la página actual.",
          file: { name: "components/Cabecera.tsx", code: `"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ENLACES = [
  { href: "/", texto: "Juegos", activa: (ruta: string) => ruta === "/" || ruta.startsWith("/juegos") },
  { href: "/salon-de-la-fama", texto: "Salón de la fama", activa: (ruta: string) => ruta.startsWith("/salon-de-la-fama") },
  { href: "/iniciar-sesion", texto: "Iniciar sesión", activa: (ruta: string) => ruta === "/iniciar-sesion" || ruta === "/crear-cuenta" },
];

export default function Cabecera() {
  const ruta = usePathname();
  return (
    <header className="cabecera">
      <Link className="logo" href="/">
        Arcade Vault
      </Link>
      <nav className="nav" aria-label="Principal">
        {ENLACES.map((enlace) => (
          <Link key={enlace.href} href={enlace.href} aria-current={enlace.activa(ruta) ? "page" : undefined}>
            {enlace.texto}
          </Link>
        ))}
      </nav>
    </header>
  );
}` },
        },
        {
          instruction: "Comprueba tipos y lint, y guarda el paso.",
          command: "npx next typegen > /dev/null 2>&1; npx tsc --noEmit && npm run lint --silent && echo tipos y lint correctos && git add app/layout.tsx components && git commit -q -m \"paso 2: layout en español, sin fuentes externas, y cabecera común\" && git log --format=%s -1",
          expected: "tipos y lint correctos\npaso 2: layout en español, sin fuentes externas, y cabecera común",
        },
        {
          instruction: "Paso 3. Sustituye la página de bienvenida de Next.js por la de inicio.",
          file: { name: "app/page.tsx", code: `import Link from "next/link";
import { JUEGOS, formatearPuntaje } from "@/app/data/juegos";

export default function Inicio() {
  return (
    <main className="contenedor">
      <h1>Elige tu juego</h1>
      <p className="subtitulo">Seis juegos de muestra. Cada uno guarda su mejor puntaje.</p>
      <section className="cuadricula" aria-label="Juegos">
        {JUEGOS.map((juego) => (
          <article className="tarjeta" key={juego.id}>
            <div className="arte" role="img" aria-label={\`Imagen de \${juego.nombre}\`} />
            <h2>{juego.nombre}</h2>
            <span className="etiqueta">{juego.genero}</span>
            <p>
              Mejor puntaje: <span className="puntaje">{formatearPuntaje(juego.mejor.puntaje)}</span> por {juego.mejor.jugador}
            </p>
            <Link className="boton boton--sec" href={\`/juegos/\${juego.id}\`}>
              Ver juego
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}` },
        },
        {
          instruction: "Compila y guarda el paso.",
          command: "npm run build > /dev/null 2>&1 && echo build correcto && git add app/page.tsx && git commit -q -m \"paso 3: pantalla de inicio con las seis tarjetas\" && git log --format=%s -1",
          expected: "build correcto\npaso 3: pantalla de inicio con las seis tarjetas",
        },
      ],
      verify: "Tres commits nuevos y el build en verde. Con npm run dev, la página de inicio muestra seis tarjetas con el estilo de neón, y la cabecera tiene tres enlaces.",
    },
    {
      type: "exercise",
      title: "Ejercicio 3: pasos 4 y 5, previsualización y jugar",
      description: "Dos rutas dinámicas que responden 404 si el juego no existe.",
      steps: [
        {
          instruction: "Paso 4. Crea la previsualización de un juego.",
          file: { name: "app/juegos/[id]/page.tsx", code: `import Link from "next/link";
import { notFound } from "next/navigation";
import { JUEGOS, buscarJuego, formatearPuntaje } from "@/app/data/juegos";

export function generateStaticParams() {
  return JUEGOS.map((juego) => ({ id: juego.id }));
}

export default async function Previsualizacion({ params }: PageProps<"/juegos/[id]">) {
  const { id } = await params;
  const juego = buscarJuego(id);
  if (!juego) notFound();
  return (
    <main className="contenedor">
      <div className="preview">
        <div className="arte arte--grande" role="img" aria-label={\`Imagen de \${juego.nombre}\`} />
        <div>
          <h1>{juego.nombre}</h1>
          <span className="etiqueta">{juego.genero}</span>
          <p>{juego.descripcion}</p>
          <h2>Controles</h2>
          <ul className="controles">
            {juego.controles.map((control) => (
              <li key={control}>{control}</li>
            ))}
          </ul>
          <p>
            Mejor puntaje: <span className="puntaje">{formatearPuntaje(juego.mejor.puntaje)}</span> por {juego.mejor.jugador}
          </p>
          <div className="acciones">
            <Link className="boton" href={\`/juegos/\${juego.id}/jugar\`}>
              Jugar
            </Link>
            <Link className="boton boton--sec" href="/">
              Volver
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}` },
        },
        {
          instruction: "Comprueba tipos, lint y build, y guarda el paso.",
          command: "npx next typegen > /dev/null 2>&1; npx tsc --noEmit && npm run lint --silent && npm run build > /dev/null 2>&1 && echo tipos, lint y build correctos && git add app/juegos && git commit -q -m \"paso 4: previsualización de un juego, con 404 si no existe\" && git log --format=%s -1",
          expected: "tipos, lint y build correctos\npaso 4: previsualización de un juego, con 404 si no existe",
        },
        {
          instruction: "Paso 5. Crea la pantalla de jugar.",
          file: { name: "app/juegos/[id]/jugar/page.tsx", code: `import { notFound } from "next/navigation";
import { JUEGOS, buscarJuego } from "@/app/data/juegos";

export function generateStaticParams() {
  return JUEGOS.map((juego) => ({ id: juego.id }));
}

export default async function Jugar({ params }: PageProps<"/juegos/[id]/jugar">) {
  const { id } = await params;
  const juego = buscarJuego(id);
  if (!juego) notFound();
  return (
    <main className="contenedor">
      <div className="hud">
        <h1>{juego.nombre}</h1>
        <div>
          <span className="puntaje">Puntos 0</span> <button className="boton boton--sec" type="button">Pausa</button>
        </div>
      </div>
      <div className="arena" role="img" aria-label="Área de juego, marcador de posición">
        <div className="enemigo" style={{ top: "30px" }} />
        <div className="enemigo" />
        <div className="enemigo" />
        <div className="jugador" />
      </div>
      <p className="aviso">Marcador de posición: aquí irá el juego real.</p>
    </main>
  );
}` },
        },
        {
          instruction: "Comprueba lo mismo y guarda el paso.",
          command: "npx next typegen > /dev/null 2>&1; npx tsc --noEmit && npm run lint --silent && npm run build > /dev/null 2>&1 && echo tipos, lint y build correctos && git add app/juegos && git commit -q -m \"paso 5: pantalla de jugar con la arena de muestra\" && git log --format=%s -1",
          expected: "tipos, lint y build correctos\npaso 5: pantalla de jugar con la arena de muestra",
        },
      ],
      verify: "Con npm run dev, abre /juegos/culebra y /juegos/culebra/jugar. Ves la arena con tres cuadrados que se mueven y un botón de pausa que no hace nada, como pide el spec.",
    },
    {
      type: "exercise",
      title: "Ejercicio 4: paso 6, el error de Suspense",
      description: "Empieza por la versión que falla, para ver el mensaje, y después arréglala.",
      steps: [
        {
          instruction: "Guarda la primera versión del salón, que lee searchParams en la propia página.",
          file: { name: "app/salon-de-la-fama/page.tsx", code: `import Link from "next/link";
import { JUEGOS, buscarJuego, formatearPuntaje } from "@/app/data/juegos";
import { PUNTAJES } from "@/app/data/puntajes";

export default async function SalonDeLaFama({ searchParams }: PageProps<"/salon-de-la-fama">) {
  const { juego: pedido } = await searchParams;
  const id = typeof pedido === "string" ? pedido : JUEGOS[0].id;
  const juego = buscarJuego(id) ?? JUEGOS[0];
  return (
    <main className="contenedor">
      <h1>Salón de la fama</h1>
      <p className="subtitulo">Los mejores puntajes de cada juego.</p>
      <div className="tabs" role="tablist" aria-label="Juegos">
        {JUEGOS.map((j) => (
          <Link key={j.id} className="tab" role="tab" aria-selected={j.id === juego.id} href={\`/salon-de-la-fama?juego=\${j.id}\`}>
            {j.nombre}
          </Link>
        ))}
      </div>
      <table className="tabla">
        <thead>
          <tr>
            <th>Puesto</th>
            <th>Jugador</th>
            <th>Puntaje</th>
          </tr>
        </thead>
        <tbody>
          {PUNTAJES[juego.id].map((fila, indice) => (
            <tr key={fila.jugador}>
              <td>{indice + 1}</td>
              <td>{fila.jugador}</td>
              <td className="puntaje">{formatearPuntaje(fila.puntaje)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}` },
        },
        {
          instruction: "Compila. Debe fallar. Mira el mensaje.",
          command: "npx next typegen > /dev/null 2>&1; npm run build > /tmp/salon.log 2>&1; echo \"salida $?\"; grep -m1 'Route \"/salon-de-la-fama\"' /tmp/salon.log",
          expected: "salida 1\nError: Route \"/salon-de-la-fama\": Next.js encountered uncached or runtime data during prerendering.",
        },
        {
          instruction: "Sustituye el archivo por la versión con Suspense.",
          file: { name: "app/salon-de-la-fama/page.tsx", code: `import { Suspense } from "react";
import Link from "next/link";
import { JUEGOS, buscarJuego, formatearPuntaje } from "@/app/data/juegos";
import { PUNTAJES } from "@/app/data/puntajes";

type Consulta = PageProps<"/salon-de-la-fama">["searchParams"];

async function Clasificacion({ consulta }: { consulta: Consulta }) {
  const { juego: pedido } = await consulta;
  const id = typeof pedido === "string" ? pedido : JUEGOS[0].id;
  const juego = buscarJuego(id) ?? JUEGOS[0];
  return (
    <>
      <div className="tabs" role="tablist" aria-label="Juegos">
        {JUEGOS.map((j) => (
          <Link key={j.id} className="tab" role="tab" aria-selected={j.id === juego.id} href={\`/salon-de-la-fama?juego=\${j.id}\`}>
            {j.nombre}
          </Link>
        ))}
      </div>
      <table className="tabla">
        <thead>
          <tr>
            <th>Puesto</th>
            <th>Jugador</th>
            <th>Puntaje</th>
          </tr>
        </thead>
        <tbody>
          {PUNTAJES[juego.id].map((fila, indice) => (
            <tr key={fila.jugador}>
              <td>{indice + 1}</td>
              <td>{fila.jugador}</td>
              <td className="puntaje">{formatearPuntaje(fila.puntaje)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default function SalonDeLaFama({ searchParams }: PageProps<"/salon-de-la-fama">) {
  return (
    <main className="contenedor">
      <h1>Salón de la fama</h1>
      <p className="subtitulo">Los mejores puntajes de cada juego.</p>
      <Suspense fallback={<p className="aviso">Cargando puntajes…</p>}>
        <Clasificacion consulta={searchParams} />
      </Suspense>
    </main>
  );
}` },
        },
        {
          instruction: "Comprueba tipos, lint y build, y guarda el paso.",
          command: "npx next typegen > /dev/null 2>&1; npx tsc --noEmit && npm run lint --silent && npm run build > /dev/null 2>&1 && echo tipos, lint y build correctos && git add app/salon-de-la-fama && git commit -q -m \"paso 6: salón de la fama con una pestaña por juego\" && git log --format=%s -1",
          expected: "tipos, lint y build correctos\npaso 6: salón de la fama con una pestaña por juego",
        },
      ],
      verify: "La primera compilación termina con código 1 y la segunda con éxito. En /salon-de-la-fama?juego=defensor ves la pestaña Defensor marcada y ocho filas.",
    },
    {
      type: "exercise",
      title: "Ejercicio 5: paso 7, formularios",
      description: "Un formulario compartido que no envía nada.",
      steps: [
        {
          instruction: "Crea el formulario común.",
          file: { name: "components/FormularioCuenta.tsx", code: `"use client";

import Link from "next/link";

type Campo = {
  etiqueta: string;
  tipo: "text" | "email" | "password";
  nombre: string;
  autocompletar: string;
};

type Props = {
  campos: Campo[];
  boton: string;
  aviso: string;
  enlace: { texto: string; href: string };
};

export default function FormularioCuenta({ campos, boton, aviso, enlace }: Props) {
  return (
    <form className="formulario" onSubmit={(evento) => evento.preventDefault()}>
      {campos.map((campo) => (
        <label className="campo" key={campo.nombre}>
          {campo.etiqueta}
          <input type={campo.tipo} name={campo.nombre} autoComplete={campo.autocompletar} />
        </label>
      ))}
      <button className="boton" type="submit">
        {boton}
      </button>
      <div className="separador">o continúa con</div>
      <div className="social">
        <a className="boton boton--sec" href="#">
          Continuar con Google
        </a>
        <a className="boton boton--sec" href="#">
          Continuar con GitHub
        </a>
      </div>
      <p className="aviso">
        {aviso} <Link href={enlace.href}>{enlace.texto}</Link>
      </p>
    </form>
  );
}` },
        },
        {
          instruction: "Crea la página de iniciar sesión.",
          file: { name: "app/iniciar-sesion/page.tsx", code: `import FormularioCuenta from "@/components/FormularioCuenta";

export default function IniciarSesion() {
  return (
    <main className="contenedor">
      <h1>Iniciar sesión</h1>
      <p className="subtitulo">Entra para guardar tus puntajes.</p>
      <FormularioCuenta
        campos={[
          { etiqueta: "Correo", tipo: "email", nombre: "correo", autocompletar: "email" },
          { etiqueta: "Contraseña", tipo: "password", nombre: "clave", autocompletar: "current-password" },
        ]}
        boton="Entrar"
        aviso="¿No tienes cuenta?"
        enlace={{ texto: "Crear cuenta", href: "/crear-cuenta" }}
      />
    </main>
  );
}` },
        },
        {
          instruction: "Crea la de crear cuenta.",
          file: { name: "app/crear-cuenta/page.tsx", code: `import FormularioCuenta from "@/components/FormularioCuenta";

export default function CrearCuenta() {
  return (
    <main className="contenedor">
      <h1>Crear cuenta</h1>
      <p className="subtitulo">Elige un nombre para el salón de la fama.</p>
      <FormularioCuenta
        campos={[
          { etiqueta: "Nombre", tipo: "text", nombre: "nombre", autocompletar: "nickname" },
          { etiqueta: "Correo", tipo: "email", nombre: "correo", autocompletar: "email" },
          { etiqueta: "Contraseña", tipo: "password", nombre: "clave", autocompletar: "new-password" },
        ]}
        boton="Crear cuenta"
        aviso="¿Ya tienes cuenta?"
        enlace={{ texto: "Iniciar sesión", href: "/iniciar-sesion" }}
      />
    </main>
  );
}` },
        },
        {
          instruction: "Comprueba tipos y lint, y guarda el paso.",
          command: "npx next typegen > /dev/null 2>&1; npx tsc --noEmit && npm run lint --silent && echo tipos y lint correctos && git add components app/iniciar-sesion app/crear-cuenta && git commit -q -m \"paso 7: pantallas de iniciar sesión y crear cuenta con un formulario compartido\" && git log --format=%s -1",
          expected: "tipos y lint correctos\npaso 7: pantallas de iniciar sesión y crear cuenta con un formulario compartido",
        },
      ],
      verify: "Con npm run dev, escribe algo en los campos y pulsa Entrar: la dirección no cambia y los campos conservan lo escrito.",
    },
    {
      type: "exercise",
      title: "Ejercicio 6: paso 8, el script y el 404 de la primera visita",
      description: "Necesitas dos terminales: una para el servidor y otra para el script.",
      steps: [
        {
          instruction: "Guarda el script que comprueba las rutas y los criterios.",
          file: { name: "scripts/probar-rutas.mjs", code: `// Uso: node scripts/probar-rutas.mjs http://localhost:3000
const base = (process.argv[2] ?? "http://localhost:3000").replace(/\\/$/, "");
const JUEGOS = ["rompe-bloques", "culebra", "defensor", "laberinto", "saltarin", "memoria"];
const RUTAS_OK = [
  "/",
  "/juegos/rompe-bloques",
  "/juegos/rompe-bloques/jugar",
  "/salon-de-la-fama",
  "/iniciar-sesion",
  "/crear-cuenta",
];
let fallos = 0;
function comprobar(descripcion, cumple) {
  if (!cumple) fallos += 1;
  console.log((cumple ? "ok     " : "FALLA  ") + descripcion);
}
async function pedir(ruta) {
  const respuesta = await fetch(base + ruta);
  return { estado: respuesta.status, html: await respuesta.text() };
}
const contar = (texto, patron) => (texto.match(patron) ?? []).length;

const paginas = {};
for (const ruta of RUTAS_OK) {
  paginas[ruta] = await pedir(ruta);
  comprobar(\`\${ruta} responde 200\`, paginas[ruta].estado === 200);
}
for (const ruta of ["/juegos/tetris", "/juegos/tetris/jugar", "/admin"]) {
  comprobar(\`\${ruta} responde 404\`, (await pedir(ruta)).estado === 404);
}
comprobar("el inicio muestra 6 tarjetas", contar(paginas["/"].html, /class="tarjeta"/g) === 6);

for (const id of JUEGOS) {
  const { html } = await pedir(\`/salon-de-la-fama?juego=\${id}\`);
  const cuerpo = html.match(/<tbody>[\\s\\S]*?<\\/tbody>/)?.[0] ?? "";
  comprobar(\`salón de \${id}: 6 pestañas y 8 filas\`, contar(html, /role="tab"/g) === 6 && contar(cuerpo, /<tr/g) === 8);
}

for (const [ruta, { html }] of Object.entries(paginas)) {
  const nav = html.match(/<nav[\\s\\S]*?<\\/nav>/)?.[0] ?? "";
  comprobar(\`\${ruta}: cabecera con 3 enlaces\`, contar(nav, /<a /g) === 3);
  comprobar(\`\${ruta}: nada de servidores externos\`, !/(src|href)="https?:\\/\\//.test(html));
}

const acceso = paginas["/iniciar-sesion"].html;
const cuenta = paginas["/crear-cuenta"].html;
comprobar("iniciar sesión: 2 campos y sin action", contar(acceso, /<input /g) === 2 && !/<form[^>]* action=/.test(acceso));
comprobar("crear cuenta: 3 campos y sin action", contar(cuenta, /<input /g) === 3 && !/<form[^>]* action=/.test(cuenta));

console.log(fallos === 0 ? "RESULTADO: todo correcto" : \`RESULTADO: \${fallos} fallo(s)\`);
process.exit(fallos === 0 ? 0 : 1);` },
        },
        {
          instruction: "Compila para producción y arranca el servidor en la segunda terminal. Déjalo corriendo.",
          command: "npm run build > /dev/null 2>&1 && echo build correcto\nnpm start",
          expected: "build correcto\nEn la segunda terminal: la versión de Next.js, Local: http://localhost:3000 y Ready.",
        },
        {
          instruction: "En la primera terminal, ejecuta el script y muestra solo lo que no está bien.",
          command: "node scripts/probar-rutas.mjs http://localhost:3000 | grep -v \"^ok\"",
          expected: "FALLA  /juegos/tetris responde 404\nFALLA  /juegos/tetris/jugar responde 404\nRESULTADO: 2 fallo(s)",
        },
        {
          instruction: "Ejecútalo otra vez, sin tocar nada.",
          command: "node scripts/probar-rutas.mjs http://localhost:3000 | grep -v \"^ok\"",
          expected: "RESULTADO: todo correcto",
        },
        {
          instruction: "Detén el servidor con Ctrl+C. Desactiva Partial Prefetching, compila y arranca de nuevo.",
          command: "sed -i.bak 's/partialPrefetching: true/partialPrefetching: false/' next.config.ts && rm next.config.ts.bak && grep -n partialPrefetching next.config.ts\nnpm run build > /dev/null 2>&1 && npm start",
          expected: "6:  partialPrefetching: false,\nEn la segunda terminal, Ready de nuevo.",
        },
        {
          instruction: "Ejecuta el script en un servidor recién arrancado, y cuenta las comprobaciones correctas.",
          command: "node scripts/probar-rutas.mjs http://localhost:3000 | tail -1\nnode scripts/probar-rutas.mjs http://localhost:3000 | grep -c \"^ok\"",
          expected: "RESULTADO: todo correcto\n30",
        },
        {
          instruction: "Guarda el script y el cambio de configuración.",
          command: "git add next.config.ts scripts/probar-rutas.mjs && git commit -q -m \"paso 8: script de rutas y partialPrefetching desactivado\" && git log --format=%s -1",
          expected: "paso 8: script de rutas y partialPrefetching desactivado",
        },
      ],
      verify: "Con la configuración inicial, la primera ejecución falla en las dos rutas de un juego inexistente y la segunda pasa. Con Partial Prefetching desactivado, pasa a la primera. Si el servidor ya había recibido esas peticiones, reinícialo antes de contar.",
    },
    {
      type: "exercise",
      title: "Ejercicio 7: medir, ajustar y cerrar el spec",
      description: "Detecta la diferencia que causa Tailwind, arréglala y pasa el spec a implementado.",
      steps: [
        {
          instruction: "Abre la página de inicio, y también references/templates/index.html. En la consola del navegador de cada una, mide el título de una tarjeta.",
          command: "getComputedStyle(document.querySelector(\"h2\")).fontSize",
          expected: "En la plantilla: 24px. En la aplicación: 16px.",
        },
        {
          instruction: "Añade al final de globals.css las cuatro reglas que devuelven lo que Tailwind quita.",
          command: "printf '%s\\n' 'h1, h2 { font-weight: 700; }' 'h2 { font-size: 1.5rem; }' 'p, ul { margin: 1em 0; }' 'ul { list-style: disc; }' >> app/globals.css && tail -4 app/globals.css",
          expected: "h1, h2 { font-weight: 700; }\nh2 { font-size: 1.5rem; }\np, ul { margin: 1em 0; }\nul { list-style: disc; }",
        },
        {
          instruction: "Comprueba lint y build, y guarda el ajuste. Después repite la medición del primer paso: debe dar 24px en las dos.",
          command: "npm run lint --silent && npm run build > /dev/null 2>&1 && echo lint y build correctos && git add app/globals.css && git commit -q -m \"paso 8: restaurar en globals.css los valores que Tailwind quita\" && git log --format=%s -1",
          expected: "lint y build correctos\npaso 8: restaurar en globals.css los valores que Tailwind quita",
        },
        {
          instruction: "Todos los criterios pasan. Marca el spec como implementado y los criterios como cumplidos.",
          command: "sed -i.bak 's/^estado: aprobado$/estado: implementado/; s/^- \\[ \\] /- [x] /' specs/001-mvp-arcade-vault.md && rm specs/001-mvp-arcade-vault.md.bak && grep -c \"\\[x\\]\" specs/001-mvp-arcade-vault.md && head -3 specs/001-mvp-arcade-vault.md",
          expected: "10\n---\nestado: implementado\n---",
        },
        {
          instruction: "Añade en la sección Decisiones del spec, justo antes de la primera línea que empieza por Descartada, lo que se decidió al implementar.",
          file: {
            name: "specs/001-mvp-arcade-vault.md (líneas nuevas)",
            code: `- Tomada: partialPrefetching en false en next.config.ts, porque con true la primera visita a un juego que no existe responde 200 y solo las siguientes responden 404.
- Tomada: al final de globals.css, reglas que devuelven los valores de navegador que Tailwind elimina (negrita de los títulos, tamaño de h2, márgenes de p y ul y viñetas), para que las pantallas midan igual que las plantillas.
- Tomada: los formularios cancelan el envío con onSubmit, porque sin action el navegador enviaría los campos, contraseña incluida, en la dirección.
- Tomada: un parámetro juego desconocido en el salón de la fama muestra el primer juego.`,
          },
        },
        {
          instruction: "Valida el spec y guarda el cierre.",
          command: "node scripts/validar-spec.js specs/001-mvp-arcade-vault.md | tail -1 && git commit -q -am \"spec 001 implementado: criterios comprobados y decisiones de la implementación\" && git status --porcelain && git log --format=%s -1",
          expected: "RESULTADO: spec válido\nspec 001 implementado: criterios comprobados y decisiones de la implementación",
        },
      ],
      verify: "El árbol queda limpio y el spec tiene diez criterios marcados. Si algún criterio no se cumple, no lo marques: vuelve al paso que corresponde. La rama todavía no se ha subido ni integrado: eso es el Día 23.",
    },
    {
      type: "exercise",
      title: "Ejercicio 8: instalar Playwright y ordenar sus archivos",
      description: "Comandos de Claude orientativos, ajustes de Git reales.",
      steps: [
        {
          instruction: "En la terminal, fuera de Claude Code, añade el servidor con alcance de proyecto y comprueba su estado.",
          command: "claude mcp add --scope project playwright -- npx @playwright/mcp@latest --output-dir .playwright-screenshots\nclaude mcp get playwright",
          expected: "Un aviso de que se añadió el servidor a .mcp.json, y el estado del servidor con su comando y sus argumentos. La primera vez, Claude pedirá aprobación para usar un servidor de proyecto.",
        },
        {
          instruction: "Ignora las dos carpetas de Playwright y comprueba que Git las ignora.",
          command: "printf '%s\\n' '.playwright-mcp/' '.playwright-screenshots/' >> .gitignore && mkdir -p .playwright-mcp .playwright-screenshots && touch .playwright-mcp/pagina.yml .playwright-screenshots/home.png && git check-ignore .playwright-screenshots/home.png .playwright-mcp/pagina.yml",
          expected: ".playwright-screenshots/home.png\n.playwright-mcp/pagina.yml",
        },
        {
          instruction: "Pide a Claude el nombre con carpeta, añadiendo una línea a CLAUDE.md.",
          command: "printf '%s\\n' \"- Guarda las capturas de Playwright en .playwright-screenshots/ y pasa siempre esa ruta como nombre de archivo.\" >> CLAUDE.md && tail -1 CLAUDE.md",
          expected: "- Guarda las capturas de Playwright en .playwright-screenshots/ y pasa siempre esa ruta como nombre de archivo.",
        },
        {
          instruction: "Guarda los ajustes, junto con .mcp.json si se creó.",
          command: "rm -rf .playwright-mcp .playwright-screenshots && git add .gitignore CLAUDE.md .mcp.json && git commit -q -m \"chore: Playwright MCP del proyecto y capturas fuera de Git\" && git log --format=%s -1",
          expected: "chore: Playwright MCP del proyecto y capturas fuera de Git",
        },
        {
          instruction: "En Claude Code, con el servidor de desarrollo corriendo, pide una comprobación visual. Cuando termine, mira dónde quedó la captura.",
          command: "Usa el MCP de Playwright para abrir la pantalla de inicio y compararla con references/templates/index.html. Indica las diferencias y guarda la captura en .playwright-screenshots/inicio.png",
          expected: "Claude abre el navegador, navega, toma la captura y describe diferencias, si las hay. El archivo está en .playwright-screenshots/inicio.png y git status no muestra nada nuevo.",
        },
      ],
      verify: "La raíz del proyecto no tiene imágenes sueltas ni una carpeta .playwright-mcp. Si aparece algún archivo suelto, mira cómo lo nombró Claude: seguramente pasó un nombre sin carpeta.",
    },
    {
      type: "playground",
      title: "Experimento 9: los puntajes con puntos de millar",
      description: "La función formatearPuntaje de app/data/juegos.ts. Prueba otros números, como cuatro cifras o millones.",
      code: `function formatearPuntaje(puntaje) {
  return String(puntaje).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ".");
}
[5960, 12450, 999, 1000, 15300, 1234567].forEach((p) => console.log(p + " -> " + formatearPuntaje(p)));`,
      expected: "5960 -> 5.960\n12450 -> 12.450\n999 -> 999\n1000 -> 1.000\n15300 -> 15.300\n1234567 -> 1.234.567",
    },
    {
      type: "playground",
      title: "Experimento 10: qué pestaña se marca",
      description: "El salón de la fama elige el juego de la dirección, y si no reconoce el valor muestra el primero. Prueba direcciones nuevas.",
      code: `const JUEGOS = ["rompe-bloques", "culebra", "defensor", "laberinto", "saltarin", "memoria"];
function pestanaActiva(consulta) {
  const pedido = new URLSearchParams(consulta).get("juego");
  return JUEGOS.includes(pedido) ? pedido : JUEGOS[0];
}
["", "?juego=culebra", "?juego=memoria", "?juego=tetris", "?juego="].forEach((consulta) => {
  console.log("'" + consulta + "' -> " + pestanaActiva(consulta));
});`,
      expected: "'' -> rompe-bloques\n'?juego=culebra' -> culebra\n'?juego=memoria' -> memoria\n'?juego=tetris' -> rompe-bloques\n'?juego=' -> rompe-bloques",
    },
    {
      type: "playground",
      title: "Experimento 11: dónde queda cada archivo de Playwright",
      description: "El comportamiento que comprobé con el servidor real. Cambia los nombres y las carpetas.",
      code: `function dondeQueda(nombreArchivo, carpetaSalida) {
  if (nombreArchivo) return nombreArchivo;
  return (carpetaSalida || ".playwright-mcp") + "/page-<fecha>.png";
}
const casos = [
  ["sin nombre, sin --output-dir", undefined, undefined],
  ["sin nombre, con --output-dir", undefined, ".playwright-screenshots"],
  ["nombre home.png, con --output-dir", "home.png", ".playwright-screenshots"],
  ["nombre con carpeta, con --output-dir", ".playwright-screenshots/home.png", ".playwright-screenshots"],
];
casos.forEach(([titulo, nombre, carpeta]) => console.log(titulo + " -> " + dondeQueda(nombre, carpeta)));`,
      expected: "sin nombre, sin --output-dir -> .playwright-mcp/page-<fecha>.png\nsin nombre, con --output-dir -> .playwright-screenshots/page-<fecha>.png\nnombre home.png, con --output-dir -> home.png\nnombre con carpeta, con --output-dir -> .playwright-screenshots/home.png",
    },
    {
      type: "playground",
      title: "Experimento 12: la primera caja que difiere",
      description: "La comparación de cajas del apartado de medir. Cambia las alturas y mira qué caja se señala.",
      code: `function primeraDiferencia(plantilla, app) {
  const n = Math.max(plantilla.length, app.length);
  for (let i = 0; i < n; i++) {
    if (plantilla[i] !== app[i]) return "caja " + i + ": plantilla " + plantilla[i] + " | app " + app[i];
  }
  return "igual";
}
const plantilla = ["header|cabecera|0|0|1280|57", "main|contenedor|120|57|1040|860", "section|cuadricula|152|188|976|696"];
const antes = ["header|cabecera|0|0|1280|57", "main|contenedor|120|57|1040|772", "section|cuadricula|152|188|976|608"];
const despues = plantilla.slice();
console.log("antes del ajuste -> " + primeraDiferencia(plantilla, antes));
console.log("después del ajuste -> " + primeraDiferencia(plantilla, despues));`,
      expected: "antes del ajuste -> caja 1: plantilla main|contenedor|120|57|1040|860 | app main|contenedor|120|57|1040|772\ndespués del ajuste -> igual",
    },
    { type: "heading", level: 2, text: "¿Qué usar en cada caso?" },
    {
      type: "table",
      headers: ["Si necesitas...", "Usa...", "Nota"],
      rows: [
        ["Implementar un spec aprobado", "/spec-impl con el número del spec", "Un paso, un commit, una revisión tuya."],
        ["Que Claude no pida permiso en cada comando", "Aceptar el comando concreto, si lo entiendes", "El skill solo permite git status, switch, add y commit."],
        ["Comprobar tipos tras crear rutas nuevas", "npx next typegen y después npx tsc --noEmit", "Build y dev también generan los tipos."],
        ["Leer searchParams con Cache Components", "Un componente dentro de Suspense", "La página recibe la promesa y no la espera."],
        ["Que un id desconocido responda 404 desde la primera vez", "partialPrefetching: false", "Revísalo cuando Cache Components sea la norma."],
        ["Una página idéntica a su plantilla", "Medir las cajas en dos anchos", "Una captura sola perdona diferencias de decenas de píxeles."],
        ["Usar Tailwind con una plantilla en CSS corriente", "Reglas propias al final de globals.css, o desactivar Preflight", "Preflight quita márgenes, negritas y viñetas."],
        ["Comprobar la interfaz con un navegador real", "El servidor MCP de Playwright", "Alcance project para que lo tenga el equipo."],
        ["Capturas fuera de la raíz", "--output-dir, nombres con carpeta y .gitignore", "Las tres cosas juntas."],
      ],
    },
    { type: "heading", level: 2, text: "Datos que suelen aparecer desactualizados" },
    {
      type: "table",
      headers: ["Suele decirse", "Información verificada (noviembre 2026)"],
      rows: [
        ["Playwright deja las capturas en la raíz del proyecto.", "Sin nombre, las deja en .playwright-mcp/. En la raíz quedan las que Claude nombra sin carpeta."],
        ["Una almohadilla al principio del mensaje guarda una instrucción en la memoria.", "Ese atajo no aparece en la documentación actual. Se pide a Claude que lo recuerde, o se usa /memory, y lo que debe cumplirse siempre va en CLAUDE.md."],
        ["Cada servidor MCP gasta tokens solo por estar conectado.", "Con la búsqueda de herramientas, por defecto, solo se cargan los nombres de las herramientas al empezar la sesión."],
        ["El comando de Playwright es claude mcp add playwright npx @playwright/mcp@latest.", "Sigue siendo válido. Con opciones para el servidor conviene separarlas con --, y elegir el alcance con --scope."],
        ["Si el build termina bien, las pantallas se ven bien.", "El build no mide diseño. Una comparación de cajas encontró diferencias de hasta 88 píxeles con el build en verde."],
        ["notFound() siempre responde 404.", "Solo si se ejecuta antes de que empiece la respuesta. Si ya se está emitiendo, el estado queda en 200."],
        ["Los tipos de PageProps existen desde el principio.", "Los genera Next.js al compilar o con next typegen. Con rutas nuevas, hay que regenerarlos."],
        ["Un formulario sin action no hace nada.", "El navegador lo envía por GET a la misma dirección, con los campos en la dirección."],
      ],
    },
    { type: "heading", level: 2, text: "Si algo no funciona" },
    {
      type: "table",
      headers: ["Síntoma", "Causa probable", "Qué hacer"],
      rows: [
        ["/spec-impl dice que el spec no está aprobado", "El estado sigue en borrador", "Léelo, valídalo y cámbialo tú, en su commit."],
        ["tsc dice que una ruta no cumple la restricción", "Faltan los tipos de rutas nuevas", "Ejecuta npx next typegen y repite."],
        ["El build avisa de datos de la petición fuera de Suspense", "Se espera searchParams o params en la página", "Pásalos a un componente envuelto en Suspense."],
        ["El script falla en los 404 y a la segunda pasa", "Partial Prefetching sirve la estructura con 200 la primera vez", "Pon partialPrefetching: false y reinicia el servidor."],
        ["La página se ve con letra fina y sin viñetas", "Preflight de Tailwind quitó los estilos del navegador", "Añade las reglas del final de globals.css."],
        ["La raíz se llena de imágenes", "Claude pide capturas con nombre sin carpeta", "Añade --output-dir, la regla en CLAUDE.md y .gitignore."],
        ["Claude no abre el navegador", "El servidor MCP no está aprobado o conectado", "Mira /mcp y claude mcp get playwright."],
        ["Un paso se queda pensando mucho tiempo", "La tarea es demasiado grande o se atascó", "Cancela y pide continuar desde ese paso."],
      ],
    },
    { type: "heading", level: 2, text: "Preguntas frecuentes" },
    {
      type: "accordion",
      items: [
        {
          title: "¿Por qué un commit por paso?",
          text: "Porque si el paso cuatro sale mal, vuelves al tres sin perder nada y puedes retomar donde te quedaste. Además cada commit se revisa en poco tiempo, que es lo que se busca con los pasos pequeños.",
        },
        {
          title: "¿Y si Claude escribe el código de forma distinta a la referencia?",
          text: "Es lo normal. No es determinista y tu modelo puede ser otro. Lo que debe cumplirse son los criterios del spec y el script de rutas. Si pasan, el código vale, aunque difiera.",
        },
        {
          title: "¿Para qué sirve el script si Claude ya revisa los criterios?",
          text: "Porque es una comprobación que no depende de lo que Claude diga. El fallo del 404 de la primera visita lo encontró un script, no una lectura del código ni una captura.",
        },
        {
          title: "¿Debo desactivar Preflight en vez de añadir reglas?",
          text: "Depende. Si tu proyecto usa casi todo con utilidades de Tailwind, déjalo activo. Si parte de una plantilla en CSS corriente, como aquí, desactivarlo evita tener que compensarlo. Aquí se prefirió el ajuste mínimo para conservar la primera línea del archivo.",
        },
        {
          title: "¿Playwright o Chrome DevTools?",
          text: "Los dos son servidores MCP de navegador y sirven para esto. Playwright es el más extendido para pruebas y tiene herramientas de interacción completas. El de Chrome DevTools aporta además análisis de rendimiento y de la consola. Si tienes uno, no necesitas el otro para esta lección.",
        },
        {
          title: "¿Es seguro dejar a Claude manejar un navegador?",
          text: "En tu servidor local, sí. Si le pides visitar páginas de terceros, el contenido le llega como datos y puede contener texto que parezca una orden. Usa --isolated para no arrastrar sesiones, y revisa lo que Claude te cuenta que hizo.",
        },
      ],
    },
    { type: "heading", level: 2, text: "Qué sigue" },
    {
      type: "paragraph",
      text: "El Día 23 integra la rama del spec: se sube, se abre el pull request con el spec y su implementación juntos, y se vuelve a main. Después empieza una tarea nueva, la pantalla de inicio, y Playwright hace por fin el trabajo para el que se instaló. Antes de seguir, comprueba que estás en spec/001-mvp-arcade-vault, con el árbol limpio, once commits sobre el spec aprobado y el spec en estado implementado.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 23, verifica que puedes explicar...",
      items: [
        "Qué debe estar listo antes de lanzar /spec-impl, y por qué se limpia la conversación.",
        "Por qué cada paso termina en un commit y en tu revisión.",
        "Qué hace npx next typegen y cuándo hay que ejecutarlo.",
        "Por qué searchParams necesita Suspense con Cache Components.",
        "Por qué un juego inexistente responde 200 la primera vez, y qué cambia partialPrefetching.",
        "Qué quita Preflight de Tailwind y por qué un build correcto no lo detecta.",
        "Por qué se mide una pantalla además de mirarla.",
        "Dónde deja Playwright sus archivos y cómo se ordenan.",
      ],
    },
    { type: "heading", level: 2, text: "Fuentes consultadas (noviembre 2026)" },
    {
      type: "list",
      items: [
        "[Claude Code: conectar herramientas con MCP, alcances y búsqueda de herramientas](https://code.claude.com/docs/en/mcp)",
        "[Claude Code: skills](https://code.claude.com/docs/en/skills)",
        "[Claude Code: comandos](https://code.claude.com/docs/en/commands)",
        "[Claude Code: cómo recuerda tu proyecto y el comando /memory](https://code.claude.com/docs/en/memory)",
        "[Servidor MCP de Playwright: instalación y opciones](https://github.com/microsoft/playwright-mcp)",
        "[Next.js: ISR con Cache Components](https://nextjs.org/docs/app/guides/incremental-static-regeneration-cache-components)",
        "[Next.js: notFound](https://nextjs.org/docs/app/api-reference/functions/not-found)",
        "[Next.js: partialPrefetching](https://nextjs.org/docs/app/api-reference/config/next-config-js/partialPrefetching)",
        "[Next.js: la convención de archivo page, con params y searchParams](https://nextjs.org/docs/app/api-reference/file-conventions/page)",
        "[Next.js: caché con Cache Components](https://nextjs.org/docs/app/getting-started/caching)",
        "[Tailwind CSS: Preflight](https://tailwindcss.com/docs/preflight)",
        "[Git: git commit](https://git-scm.com/docs/git-commit)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "¿Qué debe cumplirse antes de lanzar /spec-impl 001?",
      options: [
        "El spec debe estar en borrador",
        "El spec está aprobado y el árbol de trabajo está limpio",
        "Estar en main",
        "Haber instalado Playwright",
      ],
      correctIndex: 1,
      explanation: "El skill se detiene si el spec no está aprobado o si hay cambios sin guardar. Lo ideal es estar ya en la rama del spec.",
    },
    {
      question: "El skill permite sin preguntar git status, switch, add y commit. ¿Qué pasa con npm run build?",
      options: [
        "Se ejecuta sin preguntar",
        "Pide tu permiso, porque no está en la lista de permitidos",
        "No se puede ejecutar",
        "Lo ejecuta Git",
      ],
      correctIndex: 1,
      explanation: "Lo que no figura en allowed-tools pide permiso. Es el comportamiento diseñado, y te deja ver qué se va a ejecutar.",
    },
    {
      question: "tsc dice que una ruta nueva no cumple la restricción de PageProps. ¿Qué haces?",
      options: [
        "Cambias el tipo a any",
        "Ejecutas npx next typegen y repites",
        "Borras la ruta",
        "Reinstalas Next.js",
      ],
      correctIndex: 1,
      explanation: "Los tipos de las rutas los genera Next.js, y typegen los regenera sin compilar.",
    },
    {
      question: "Una página lee searchParams con await y el build falla con Cache Components. ¿Cuál es el arreglo?",
      options: [
        "Desactivar TypeScript",
        "Pasar la promesa a un componente que la espere dentro de Suspense",
        "Usar localStorage",
        "Borrar el parámetro",
      ],
      correctIndex: 1,
      explanation: "Los datos de la petición no pueden leerse fuera de un límite de Suspense. La página queda síncrona y delega la lectura.",
    },
    {
      question: "El script de rutas falla con un 200 en /juegos/tetris la primera vez, y pasa la segunda. ¿Qué indica?",
      options: [
        "Que el script tiene un error",
        "Que se sirve primero la estructura de la página con 200 y luego se guarda el 404",
        "Que el juego existe",
        "Que Git falló",
      ],
      correctIndex: 1,
      explanation: "Con Partial Prefetching, un id no listado recibe primero la estructura con estado 200. Sin él, la primera petición espera al resultado y responde 404.",
    },
    {
      question: "¿Cuándo devuelve notFound() un estado 404?",
      options: [
        "Siempre",
        "Cuando se ejecuta antes de que empiece la respuesta",
        "Nunca",
        "Solo en desarrollo",
      ],
      correctIndex: 1,
      explanation: "Si la respuesta ya se está emitiendo por un límite de Suspense, el estado queda en 200 y Next.js añade noindex.",
    },
    {
      question: "El build termina bien, pero los títulos de tarjeta salen más pequeños que en la plantilla. ¿Por qué?",
      options: [
        "Un error de TypeScript",
        "Preflight de Tailwind hace que los títulos hereden el tamaño del texto",
        "Falta una fuente",
        "El navegador cachea",
      ],
      correctIndex: 1,
      explanation: "Preflight quita tamaños, grosores, márgenes y viñetas del navegador. Se restauran con reglas propias o se desactiva Preflight.",
    },
    {
      question: "¿Por qué se comparan las cajas de una pantalla con las de su plantilla, además de mirar una captura?",
      options: [
        "Porque las capturas no se pueden tomar",
        "Porque un número señala el elemento y la diferencia exacta, y una captura perdona decenas de píxeles",
        "Porque es más lento",
        "Porque lo exige Git",
      ],
      correctIndex: 1,
      explanation: "Medir dice qué caja difiere y en cuánto. Mirar aporta lo que un número no explica, como el color. Se usan las dos cosas.",
    },
    {
      question: "Playwright toma una captura que Claude nombra home.png, con --output-dir configurado. ¿Dónde queda?",
      options: [
        "En la carpeta de --output-dir",
        "En la raíz del proyecto, porque un nombre explícito no se mueve",
        "En .playwright-mcp",
        "En el escritorio",
      ],
      correctIndex: 1,
      explanation: "La opción solo afecta a los archivos con nombre automático. Un nombre explícito se resuelve contra la raíz, salvo que lleve carpeta.",
    },
    {
      question: "¿Qué alcance de claude mcp add comparte el servidor con el equipo mediante un archivo del repositorio?",
      options: [
        "local",
        "project, que escribe .mcp.json",
        "user",
        "Ninguno",
      ],
      correctIndex: 1,
      explanation: "El alcance project guarda el servidor en .mcp.json, en la raíz. Claude pide aprobación antes de usarlo.",
    },
  ],
};
