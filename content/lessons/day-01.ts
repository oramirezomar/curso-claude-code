import type { Lesson } from "@/lib/types";

// Día 1 · Clases 1, 2 y 4 de la transcripción (la clase 3 se omite).
// Contenido verificado en noviembre de 2026.
export const day01: Lesson = {
  day: 1,
  slug: "introduccion-al-curso-y-preparacion",
  title: "Introducción al curso y preparación del equipo",
  section: "Introducción",
  estimatedMinutes: 45,
  icon: "🧭",
  objectives: [
    "Explicar cómo se organiza el curso en tres bloques (fundamentos, intermedio y avanzado) y qué se construye a lo largo de él.",
    "Distinguir las superficies donde se usa Claude Code (terminal, editor, escritorio, web y móvil) y elegir una según el caso.",
    "Comprobar desde la terminal que Node.js, npm, Git y GitHub CLI responden y entender qué hacer cuando un comando no se reconoce.",
    "Saber qué cuenta hace falta para usar Claude Code y qué no incluye el plan gratuito de Claude.",
    "Autenticar GitHub CLI con `gh auth login` y verificar la sesión con `gh auth status`.",
  ],
  blocks: [
    {
      type: "paragraph",
      text: "Claude Code es un agente de programación que lee tu código, edita archivos, ejecuta comandos y se conecta con tus herramientas de desarrollo. Aprender a usarlo bien exige dos cosas: entender cómo se organiza lo que vas a aprender y tener un equipo preparado, para que los problemas de instalación no te frenen en las lecciones siguientes. Este primer día cubre las dos.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "3", label: "Bloques del curso: fundamentos, intermedio y avanzado" },
        { value: "49", label: "Días de lección, uno por tema" },
        { value: "5", label: "Herramientas a comprobar: cuenta, Node.js, npm, Git y gh" },
        { value: "22+", label: "Versión mínima de Node.js si instalas por npm" },
        { value: "Pago", label: "Plan o cuenta que exige Claude Code" },
        { value: "Terminal", label: "Superficie principal del curso" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text: "Contenido verificado en noviembre de 2026 contra la documentación oficial de Claude Code, la de GitHub CLI y las versiones publicadas de Node.js. Las fuentes están al final de la lección. Las herramientas cambian con frecuencia: ante una diferencia, manda la documentación vigente.",
    },
    { type: "heading", level: 2, text: "Cómo está organizado el curso" },
    {
      type: "paragraph",
      text: "El curso tiene tres bloques grandes y cada bloque se divide en secciones más pequeñas. Los fundamentos cubren desde cero la instalación, el consumo de tokens y los comandos básicos. El bloque intermedio pasa de aprender la herramienta a usarla para trabajar. El avanzado automatiza y paraleliza ese trabajo.",
    },
    {
      type: "image",
      src: "/img/dia-01/mapa-del-curso.svg",
      alt: "Tres columnas con los bloques del curso. Fundamentos: instalación, tokens, Ollama, ciclo del agente, CLAUDE.md, Git, comandos diarios, GitHub, batch y worktrees. Intermedio: specs, skills, MCP de Playwright, hooks, autenticación, plugins. Avanzado: agentes, rutinas, producción, Claude Design y acceso remoto.",
      caption: "Mapa de los tres bloques del curso y su meta: usar la herramienta, trabajar con ella y automatizar el trabajo.",
    },
    { type: "heading", level: 3, text: "Fundamentos" },
    {
      type: "paragraph",
      text: "Aquí aprendes a instalar Claude Code, a entender cómo crece el contexto y cómo se consumen los tokens, y a reducir ese consumo. También aprendes a navegar un proyecto, a hacer cambios y a revertirlos con los comandos de la propia herramienta, sin depender del control de versiones. Eso no sustituye a Git: más adelante se trabaja con ramas, commits y GitHub de forma constante. La mayoría de las personas obtiene ya mucho valor solo con este bloque, porque incluye lanzar agentes, hacer revisiones de código y usar distintos modos de planificación.",
    },
    {
      type: "list",
      items: [
        "Comandos esenciales para controlar sesiones y deshacer cambios.",
        "Consejos para ahorrar tokens: es muy probable alcanzar el límite diario o semanal de tu plan siguiendo el curso, sea cual sea el plan.",
        "Cómo evitar sobrecargar el contexto, incluido el uso de skills.",
        "Cómo seguir practicando con modelos locales de Ollama cuando se agota la cuota. Funciona, pero hacen falta equipos potentes y Claude Code rinde mejor con los modelos oficiales de Anthropic.",
      ],
    },
    { type: "heading", level: 3, text: "Intermedio" },
    {
      type: "paragraph",
      text: "Se construye una plataforma de videojuegos jugables, con base de datos, tabla de posiciones, agentes y skills propias. Sobre ese proyecto se aplica Spec Driven Design: los archivos de especificación sirven después como material para crear otras skills y entrenar agentes. GitHub entra como origen de requerimientos que Claude Code implementa, y se conectan varios servidores MCP para ampliar sus capacidades. También se ve cómo seguir el trabajo desde el móvil, con GitHub y con una terminal remota.",
    },
    { type: "heading", level: 3, text: "Avanzado" },
    {
      type: "paragraph",
      text: "Se lanzan varios agentes en paralelo, se crean skills instalables con hooks para compartirlas, se automatiza el flujo con GitHub (triaje y pipelines) y se programan tareas para que corran sin que estés presente. El objetivo final es tener la aplicación funcionando en producción y poder corregir errores o añadir funciones casi sin tocar el código ni la terminal. Esta parte incluye revisar plugins y skills populares con criterio, porque instalar una skill maliciosa es fácil.",
    },
    {
      type: "callout",
      variant: "info",
      text: "Un ejemplo de lo que se consigue al final del curso: dejar agentes trabajando de madrugada para encontrar los issues ya respondidos o con la corrección propuesta al empezar la jornada. Que solo revisen o que apliquen los cambios depende de la configuración que elijas, y parte del flujo se puede manejar desde GitHub sin abrir la terminal.",
    },
    { type: "heading", level: 2, text: "Dónde se usa Claude Code" },
    {
      type: "paragraph",
      text: "Este curso trabaja sobre todo en la terminal. Claude Code también existe como extensión para VS Code y Cursor, como aplicación de escritorio, en la web y en el móvil. Si no te gusta la terminal, la extensión del editor es una alternativa válida, y se explica cómo instalarla más abajo. Aun así, conviene darle una oportunidad a la terminal: es la base del resto del curso y permite abrir varias instancias para tener agentes trabajando a la vez.",
    },
    {
      type: "image",
      src: "/img/dia-01/superficies-claude-code.svg",
      alt: "Claude Code en el centro, conectado con cuatro superficies: terminal, editor con extensión, aplicación de escritorio y web o móvil.",
      caption: "Superficies donde se usa Claude Code. Todas usan tu cuenta y tu proyecto.",
    },
    {
      type: "table",
      caption: "Superficies de uso",
      headers: ["Superficie", "Qué ofrece", "En este curso"],
      rows: [
        ["Terminal (CLI)", "Se inicia con el comando `claude` en la carpeta del proyecto.", "Es la base de casi todas las lecciones."],
        ["Extensión de VS Code o Cursor", "Panel gráfico con diffs, revisión de planes y menciones de archivos.", "Se instala hoy y se explica en el Día 2."],
        ["Aplicación de escritorio", "Pestaña Code, sesiones en paralelo con aislamiento de Git y tareas programadas locales.", "Se usa con moderación, sobre todo para tareas programadas."],
        ["Web y móvil", "Sesiones en la nube o control remoto de una sesión local.", "Se ve en las secciones de plugins y utilidades."],
      ],
    },
    { type: "heading", level: 2, text: "Agentes en paralelo y aislamiento" },
    {
      type: "paragraph",
      text: "Abrir otra ventana de la terminal y lanzar un segundo agente funciona bien mientras los agentes toquen archivos distintos. El problema aparece cuando dos agentes necesitan modificar los mismos archivos, por ejemplo una ruta de API compartida: cada uno corrige lo que rompió el otro y entran en un ciclo que puede agotar tus tokens sin terminar la tarea. La solución es darle a cada agente una copia independiente del código y unir los resultados al final. Git lo permite con los worktrees, que se ven en el bloque de fundamentos.",
    },
    {
      type: "image",
      src: "/img/dia-01/agentes-paralelos.svg",
      alt: "A la izquierda, dos agentes que modifican el mismo archivo y chocan. A la derecha, cada agente trabaja en su propio worktree y los cambios se unen al final.",
      caption: "Dos agentes sobre la misma carpeta chocan. Con una copia por agente, los conflictos se resuelven una sola vez al unir.",
    },
    {
      type: "callout",
      variant: "warning",
      text: "Varios agentes en paralelo aumentan el consumo de tokens. La documentación de costos señala que el gasto varía mucho según el modelo, el tamaño del código y hábitos como ejecutar varias instancias. El caché de prompts abarata los tokens repetidos dentro de una misma sesión, pero no hace que el costo se mantenga igual. Los Días 2 y 3 lo desarrollan.",
    },
    { type: "heading", level: 2, text: "Preparar el equipo" },
    {
      type: "paragraph",
      text: "Antes de seguir las lecciones conviene tener lo siguiente. Solo la cuenta es imprescindible para usar Claude Code. Node.js, Git y la cuenta de GitHub son necesarios para seguir el curso, porque más adelante se instalan skills y servidores MCP con `npx` y se trabaja con repositorios y pull requests.",
    },
    {
      type: "image",
      src: "/img/dia-01/requisitos-instalacion.svg",
      alt: "Cinco pasos en fila: cuenta de Claude de pago o de Console, terminal, Node.js y npm, Git, y GitHub con gh autenticado. Debajo, una franja de elementos opcionales.",
      caption: "Requisitos del curso, de lo obligatorio a lo opcional.",
    },
    { type: "heading", level: 3, text: "Cuenta de Claude" },
    {
      type: "paragraph",
      text: "Crea una cuenta en Claude. El plan gratuito sirve para el chat web, pero no incluye Claude Code. Para usar Claude Code hace falta una suscripción de pago (Pro, Max, Ultra, Team o Enterprise), una cuenta de Claude Console con crédito prepagado o acceso mediante un proveedor de nube compatible. Los nombres y límites de los planes cambian: consulta la página de precios vigente.",
    },
    {
      type: "paragraph",
      text: "La aplicación de escritorio de Claude es opcional. Más adelante se usa de forma puntual para programar tareas que se ejecutan a una hora fija. Eso permite automatizar trabajo sin exponer credenciales ni información sensible en servicios externos.",
    },
    { type: "heading", level: 3, text: "Terminal" },
    {
      type: "paragraph",
      text: "Puedes usar la terminal que ya tengas: Terminal en macOS, PowerShell en Windows o cualquier otra. El curso usa Warp, una terminal que facilita abrir varias instancias y mantiene un historial cómodo, y que permite iniciar sesiones remotas para lanzar comandos desde otro equipo o desde el móvil. No es obligatoria. Claude Code también ofrece control remoto por su cuenta.",
    },
    { type: "heading", level: 3, text: "Node.js y npm" },
    {
      type: "paragraph",
      text: "Instala una versión LTS de Node.js desde su sitio oficial. npm viene incluido. Después abre una terminal nueva y comprueba que responden `node --version` y `npm --version`. Si el sistema dice que el comando no se reconoce, cierra y vuelve a abrir la terminal, porque la instalación modifica la variable PATH y las ventanas ya abiertas no la ven. Si sigue fallando, no continúes hasta resolverlo.",
    },
    {
      type: "callout",
      variant: "info",
      text: "Claude Code no necesita Node.js para instalarse con el instalador nativo, que es el método recomendado. Solo el paquete de npm exige Node.js 22 o superior. En noviembre de 2026 las líneas con soporte a largo plazo son la 24 (Krypton) y la 26 (Lithium).",
    },
    { type: "heading", level: 3, text: "Git y GitHub" },
    {
      type: "paragraph",
      text: "Comprueba con `git --version` que Git responde. En macOS y Linux es habitual que ya esté instalado. Si el comando no se reconoce, instálalo desde su sitio oficial y repite la comprobación. Después crea una cuenta de GitHub, que se usa en las secciones de flujo de trabajo.",
    },
    {
      type: "paragraph",
      text: "GitHub CLI no es obligatorio, pero es muy útil y permite seguir las secciones que lo usan. El comando se llama `gh`, no `github`. Para conectarlo con tu cuenta se ejecuta `gh auth login`: se elige GitHub.com, el protocolo de Git (HTTPS o SSH), se autentica por el navegador, se copia el código de un solo uso que muestra la terminal, se pega en la página que se abre y se autoriza el acceso. El token queda guardado en el almacén de credenciales del sistema.",
    },
    { type: "heading", level: 3, text: "Editor y extensiones" },
    {
      type: "paragraph",
      text: "Puedes usar el editor que prefieras. Si usas VS Code o Cursor, instala la extensión de Claude Code. Requiere VS Code 1.94.0 o superior, y su icono es una chispa (Spark), visible en la barra de herramientas del editor y en la barra de actividad. Otras extensiones útiles para el curso son Tailwind CSS IntelliSense, porque algunas lecciones generan código con Tailwind, y los conjuntos de iconos y temas, que son cuestión de gusto.",
    },
    {
      type: "paragraph",
      text: "Dos recursos opcionales ayudan a trabajar mejor. El primero es una herramienta de dictado: con prompts largos, dictar suele ser más rápido que escribir. El segundo es la guía de buenas prácticas de la documentación de Claude Code, que explica cómo dar contexto y criterios de verificación en los prompts.",
    },
    { type: "heading", level: 2, text: "Ejercicios guiados y experimentos" },
    {
      type: "paragraph",
      text: "Los ejercicios con terminal se hacen en tu equipo y marcan cada paso que completas. Los editores de código verifican en el navegador la lógica de las comprobaciones, como comparar versiones o interpretar la salida de un comando.",
    },
    {
      type: "exercise",
      title: "Ejercicio 1: comprobar Node.js",
      description: "Confirma que Node.js está instalado y que su versión sirve para instalar paquetes de Claude Code con npm.",
      steps: [
        {
          instruction: "Abre una terminal nueva y ejecuta el comando.",
          command: "node --version",
          expected: "v24.22.3\n(el número será el de tu versión; debe empezar por v22 o más)",
        },
      ],
      verify: "La salida empieza por `v` seguida de un número mayor o igual a 22. Si aparece `command not found`, pasa al ejercicio 5.",
    },
    {
      type: "exercise",
      title: "Ejercicio 2: comprobar npm",
      description: "npm se instala junto con Node.js. Comprueba que responde.",
      steps: [
        {
          instruction: "Ejecuta el comando en la misma terminal.",
          command: "npm --version",
          expected: "10.9.2\n(el número cambia según la versión de Node.js instalada)",
        },
      ],
      verify: "Aparece un número de versión con tres partes separadas por puntos.",
    },
    {
      type: "exercise",
      title: "Ejercicio 3: comprobar Git",
      description: "Confirma que Git está disponible.",
      steps: [
        {
          instruction: "Ejecuta el comando.",
          command: "git --version",
          expected: "git version 2.49.0\n(el número será el de tu instalación)",
        },
      ],
      verify: "La salida empieza por `git version 2.`. Si dice que el comando no existe, instala Git y abre una terminal nueva.",
    },
    {
      type: "exercise",
      title: "Ejercicio 4: comprobar GitHub CLI",
      description: "El comando de GitHub CLI es `gh`. Escribir `github --version` no funciona.",
      steps: [
        {
          instruction: "Ejecuta el comando.",
          command: "gh --version",
          expected: "gh version 2.88.1 (2026-03-12)\nhttps://github.com/cli/cli/releases/tag/v2.88.1\n(la versión y la fecha serán las de tu instalación)",
        },
      ],
      verify: "La primera línea empieza por `gh version`. Si no se reconoce, instálalo desde la página oficial y abre una terminal nueva.",
    },
    {
      type: "exercise",
      title: "Ejercicio 5: diagnosticar un comando no reconocido",
      description: "Reproduce el error y aprende a distinguir un comando ausente de uno mal escrito.",
      steps: [
        {
          instruction: "Ejecuta un comando que no existe para ver cómo responde tu terminal.",
          command: "comandoinexistente --version",
          expected: "zsh: command not found: comandoinexistente\n(en bash el texto cambia a: bash: comandoinexistente: command not found)",
        },
        {
          instruction: "Pregunta a tu sistema dónde está el ejecutable de Node.js. En Windows usa `where node`.",
          command: "which node",
          expected: "/Users/tu-usuario/.nvm/versions/node/v22.14.0/bin/node\n(la ruta depende de cómo instalaste Node.js)",
        },
      ],
      verify: "Con un comando mal escrito ves `command not found`. Con una herramienta bien instalada, `which` muestra una ruta. Si no muestra nada, cierra la terminal, ábrela de nuevo y repite.",
    },
    {
      type: "exercise",
      title: "Ejercicio 6: autenticar GitHub CLI",
      description: "Conecta `gh` con tu cuenta de GitHub por el navegador.",
      steps: [
        {
          instruction: "Inicia el asistente. Elige GitHub.com, el protocolo (HTTPS o SSH) y la opción de autenticarte con el navegador. Copia el código de un solo uso que aparece.",
          command: "gh auth login",
        },
        {
          instruction: "En el navegador pega el código, pulsa continuar y autoriza el acceso. Vuelve a la terminal.",
        },
        {
          instruction: "Comprueba la sesión.",
          command: "gh auth status",
          expected: "github.com\n  ✓ Logged in to github.com account tu-usuario (keyring)\n  - Active account: true\n  - Git operations protocol: https",
        },
      ],
      verify: "La línea con la marca ✓ muestra tu usuario de GitHub. El protocolo mostrado es el que elegiste en el asistente.",
    },
    {
      type: "exercise",
      title: "Ejercicio 7: comprobar todo con un solo comando",
      description: "Recorre las cuatro herramientas y muestra la primera línea de su versión. Funciona en macOS, Linux y WSL. En PowerShell ejecuta los cuatro comandos de los ejercicios anteriores por separado.",
      steps: [
        {
          instruction: "Pega el bucle completo en la terminal.",
          command: "for c in node npm git gh; do printf \"%s: \" \"$c\"; \"$c\" --version | head -1; done",
          expected: "node: v24.22.3\nnpm: 10.9.2\ngit: git version 2.49.0\ngh: gh version 2.88.1 (2026-03-12)",
        },
      ],
      verify: "Aparecen cuatro líneas, una por herramienta. Si falta una o muestra un error, repite el ejercicio de esa herramienta.",
    },
    {
      type: "exercise",
      title: "Ejercicio 8: instalar y localizar la extensión del editor",
      description: "Solo si usas VS Code. Comprueba la versión del editor y que la extensión de Claude Code quedó instalada.",
      steps: [
        {
          instruction: "Comprueba la versión de VS Code. La primera línea debe ser 1.94.0 o superior.",
          command: "code --version",
          expected: "1.147.0\n(la primera línea es la versión; las siguientes son el identificador del commit y la arquitectura)",
        },
        {
          instruction: "Instala la extensión desde el panel de extensiones. Abre la vista con Cmd+Shift+X en macOS o Ctrl+Shift+X en Windows y Linux, busca Claude Code y pulsa Install.",
        },
        {
          instruction: "Comprueba que aparece entre las extensiones instaladas.",
          command: "code --list-extensions | grep -i claude",
          expected: "anthropic.claude-code",
        },
      ],
      verify: "La última salida es `anthropic.claude-code`. Si no imprime nada, reinicia VS Code o ejecuta Developer: Reload Window desde la paleta de comandos.",
    },
    {
      type: "playground",
      title: "Experimento 9: ¿sirve esta versión de Node.js?",
      description: "Aplica la regla del paquete de npm, que exige Node.js 22 o superior, a varias salidas de `node --version`. Cambia los valores y vuelve a ejecutar.",
      code: "const salidas = [\"v20.5.1\", \"v22.14.0\", \"v24.22.3\", \"v26.13.1\"];\n\nfunction cumple(version, minimo) {\n  const mayor = Number(version.replace(\"v\", \"\").split(\".\")[0]);\n  return mayor >= minimo;\n}\n\nfor (const v of salidas) {\n  console.log(v + \" -> \" + (cumple(v, 22) ? \"sirve para instalar con npm\" : \"actualiza Node.js\"));\n}",
      expected: "v20.5.1 -> actualiza Node.js\nv22.14.0 -> sirve para instalar con npm\nv24.22.3 -> sirve para instalar con npm\nv26.13.1 -> sirve para instalar con npm",
    },
    {
      type: "playground",
      title: "Experimento 10: interpretar la salida de Git",
      description: "Extrae la versión de `git --version` y compárala con 2.31, la versión mínima que menciona la documentación para el comando `claude plugin eval`. Git es opcional para ejecutar Claude Code, pero el curso lo usa a diario.",
      code: "function revisarGit(texto) {\n  const m = texto.match(/git version (\\d+)\\.(\\d+)/);\n  if (!m) return \"sin versión\";\n  const mayor = Number(m[1]);\n  const menor = Number(m[2]);\n  return mayor > 2 || (mayor === 2 && menor >= 31) ? \"ok\" : \"antigua\";\n}\n\nconsole.log(revisarGit(\"git version 2.49.0\"));\nconsole.log(revisarGit(\"git version 2.25.1\"));\nconsole.log(revisarGit(\"zsh: command not found: git\"));",
      expected: "ok\nantigua\nsin versión",
    },
    {
      type: "playground",
      title: "Experimento 11: leer la versión de Claude Code",
      description: "La documentación indica que `claude --version` imprime un número de versión seguido de `(Claude Code)`. Este código separa las tres partes y descarta una salida de error.",
      code: "const patron = /^(\\d+)\\.(\\d+)\\.(\\d+) \\(Claude Code\\)$/;\nconst salida = \"2.1.286 (Claude Code)\";\nconst m = salida.match(patron);\n\nconsole.log(JSON.stringify(m ? { mayor: +m[1], menor: +m[2], parche: +m[3] } : null));\nconsole.log(patron.test(\"claude: command not found\"));",
      expected: "{\"mayor\":2,\"menor\":1,\"parche\":286}\nfalse",
    },
    {
      type: "playground",
      title: "Experimento 12: elegir la superficie de uso",
      description: "Una función sencilla que traduce una necesidad en la superficie recomendada en esta lección. Añade tus propios casos al objeto y ejecuta de nuevo.",
      code: "const recomendacion = {\n  \"seguir el curso\": \"terminal\",\n  \"interfaz grafica en el editor\": \"extension de VS Code o Cursor\",\n  \"sesiones sin terminal\": \"aplicacion de escritorio\",\n  \"trabajo programado sin el portatil encendido\": \"tareas programadas en la nube\",\n};\n\nfor (const caso of Object.keys(recomendacion)) {\n  console.log(caso + \" => \" + recomendacion[caso]);\n}\nconsole.log(Object.keys(recomendacion).length);",
      expected: "seguir el curso => terminal\ninterfaz grafica en el editor => extension de VS Code o Cursor\nsesiones sin terminal => aplicacion de escritorio\ntrabajo programado sin el portatil encendido => tareas programadas en la nube\n4",
    },
    { type: "heading", level: 2, text: "¿Qué usar en cada caso?" },
    {
      type: "table",
      headers: ["Si necesitas...", "Usa...", "Nota"],
      rows: [
        ["Seguir el curso tal como está escrito", "La terminal con `claude`", "Las lecciones muestran comandos y salidas de terminal."],
        ["Una interfaz gráfica dentro del editor", "La extensión de VS Code o Cursor", "Requiere VS Code 1.94.0 o superior y una cuenta de pago o de Console."],
        ["Usar Claude Code sin terminal", "La aplicación de escritorio, pestaña Code", "Admite sesiones en paralelo con aislamiento de Git."],
        ["Tareas que corran con tu equipo apagado", "Tareas programadas en la nube", "Antes se llamaban rutinas. Están en vista previa de investigación."],
        ["Seguir una sesión local desde el móvil", "Control remoto (Remote Control)", "Se ve en las secciones de plugins y utilidades."],
        ["Solo conversar con Claude", "El chat web, incluso con plan gratuito", "El plan gratuito no incluye Claude Code."],
        ["Instalar Claude Code sin Node.js", "El instalador nativo", "Es el método recomendado por la documentación."],
      ],
    },
    { type: "heading", level: 2, text: "Datos que suelen aparecer desactualizados" },
    {
      type: "table",
      headers: ["Suele decirse", "Información verificada (noviembre 2026)"],
      rows: [
        ["Hace falta Node.js 24 o superior para usar Claude Code.", "El instalador nativo, recomendado por la documentación, no requiere Node.js. El paquete de npm exige Node.js 22 o superior. Las líneas LTS vigentes son 24 (Krypton) y 26 (Lithium)."],
        ["El comando para comprobar GitHub CLI es `github --version`.", "El ejecutable es `gh`: `gh --version` y `gh auth login`."],
        ["Basta una cuenta gratuita de Claude para empezar.", "El plan gratuito incluye el chat, pero no Claude Code. Hace falta Pro, Max, Ultra, Team o Enterprise, una cuenta de Console o un proveedor de nube."],
        ["Los planes son Pro, Max x5, Max x20 y Pro Ultra.", "La documentación nombra Pro, Max, Ultra, Team y Enterprise. Los nombres y límites cambian: verifica en la página de precios."],
        ["Git 2 o superior es obligatorio.", "Git es opcional para ejecutar Claude Code. `claude plugin eval` exige Git 2.31 o superior. El curso sí usa Git de forma constante."],
        ["La extensión muestra el icono de Anthropic.", "El icono actual es una chispa (Spark). La extensión requiere VS Code 1.94.0 o superior e incluye su propia copia del CLI, pero para usar `claude` en la terminal integrada hace falta instalar el CLI aparte."],
        ["La terminal siempre recibe las funciones nuevas antes.", "La documentación presenta la extensión como la forma recomendada de usar Claude Code en VS Code y no fija un orden de llegada. Algunas funciones piden una versión mínima, y la versión de la extensión coincide con la del CLI que incluye."],
        ["Las rutinas se configuran en la aplicación de escritorio.", "Ahora se llaman tareas programadas. Las de la nube se crean en claude.ai/code/routines o con `/schedule`, y las de escritorio y `/loop` corren en tu equipo."],
      ],
    },
    { type: "heading", level: 2, text: "Preguntas frecuentes" },
    {
      type: "accordion",
      items: [
        {
          title: "¿Puedo seguir el curso sin pagar?",
          text: "Puedes leer las lecciones y hacer los ejercicios de comprobación del equipo. Para usar Claude Code hace falta un plan de pago, una cuenta de Console con crédito o un proveedor de nube compatible. El Día 4 explica cómo apuntar Claude Code a modelos locales de Ollama, con la limitación de que el resultado suele ser inferior al de los modelos oficiales.",
        },
        {
          title: "¿Tengo que usar Warp?",
          text: "No. Cualquier terminal sirve. Warp se usa en el curso porque facilita abrir varias instancias y tiene sesiones remotas, pero todos los comandos funcionan igual en la terminal de tu sistema.",
        },
        {
          title: "¿Terminal o extensión del editor?",
          text: "Ambas son válidas. La extensión ofrece diffs y revisión de planes en un panel gráfico. La terminal es la base del curso y facilita lanzar varios agentes. Puedes combinarlas: la extensión incluye su propia copia del CLI para el panel, pero para usar `claude` en la terminal integrada instala el CLI.",
        },
        {
          title: "Instalé Node.js pero `node --version` no responde. ¿Qué hago?",
          text: "Cierra la terminal y abre una nueva: la instalación cambia el PATH y las ventanas abiertas no lo ven. Si sigue igual, ejecuta `which node` (o `where node` en Windows) para ver si el sistema lo encuentra. No avances hasta que responda.",
        },
        {
          title: "¿Para qué sirve Node.js si Claude Code no lo necesita?",
          text: "Para el curso. Muchas herramientas que se instalan más adelante, como skills y servidores MCP, se ejecutan con `npx`, que viene con npm. También es el requisito del paquete de npm de Claude Code, que exige Node.js 22 o superior.",
        },
        {
          title: "¿Varios agentes consumen el doble de tokens?",
          text: "No hay una regla fija. La documentación de costos indica que el gasto depende del modelo, del tamaño del código y de hábitos como ejecutar varias instancias. El caché de prompts abarata los tokens repetidos dentro de una sesión, pero conviene medir con el comando `/usage`. Se ve en el Día 3.",
        },
      ],
    },
    { type: "heading", level: 2, text: "Qué sigue" },
    {
      type: "paragraph",
      text: "El Día 2 instala Claude Code, revisa los precios y el consumo de cada modelo y configura la extensión de VS Code. Es el primer contacto real con la herramienta, así que deja listas hoy las comprobaciones de este día.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 2, verifica que puedes explicar...",
      items: [
        "Cómo se organiza el curso en fundamentos, intermedio y avanzado, y qué se construye.",
        "Por qué dos agentes sobre los mismos archivos pueden entrar en un ciclo de errores y cómo lo evitan los worktrees.",
        "Qué cuenta necesitas para usar Claude Code y por qué el plan gratuito no basta.",
        "Para qué sirven `node --version`, `npm --version`, `git --version` y `gh --version`.",
        "Qué hacer cuando la terminal responde `command not found` tras una instalación.",
        "Cómo se autentica GitHub CLI y cómo se comprueba la sesión.",
      ],
    },
    { type: "heading", level: 2, text: "Fuentes consultadas (noviembre 2026)" },
    {
      type: "list",
      items: [
        "[Advanced setup: requisitos e instalación de Claude Code](https://code.claude.com/docs/en/setup)",
        "[Quickstart de Claude Code](https://code.claude.com/docs/en/quickstart)",
        "[Claude Code en VS Code: requisitos y extensión](https://code.claude.com/docs/en/vs-code)",
        "[Claude Code en la aplicación de escritorio](https://code.claude.com/docs/en/desktop-quickstart)",
        "[Plataformas e integraciones de Claude Code](https://code.claude.com/docs/en/platforms)",
        "[Tareas programadas (antes rutinas)](https://code.claude.com/docs/en/routines)",
        "[Gestión de costos](https://code.claude.com/docs/en/costs)",
        "[Buenas prácticas para Claude Code](https://code.claude.com/docs/en/best-practices)",
        "[Versiones publicadas de Node.js](https://nodejs.org/en/about/previous-releases)",
        "[Descargas de Git](https://git-scm.com/downloads)",
        "[Manual de GitHub CLI: gh auth login](https://cli.github.com/manual/gh_auth_login)",
        "[Manual de GitHub CLI: gh auth status](https://cli.github.com/manual/gh_auth_status)",
        "[Precios de Claude](https://claude.com/pricing)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "¿Qué incluye el bloque de fundamentos del curso?",
      options: [
        "Solo la instalación de la herramienta",
        "Instalación, consumo de tokens, navegación y reversión de cambios, y comandos esenciales",
        "Agentes en producción y tareas programadas",
        "Solo el uso de GitHub",
      ],
      correctIndex: 1,
      explanation: "Fundamentos va de cero hasta usar la herramienta en el día a día: instalación, tokens, ciclo del agente, memoria, Git y comandos. Los agentes y las tareas programadas pertenecen al bloque avanzado.",
    },
    {
      question: "Dos agentes modifican a la vez los mismos archivos en la misma carpeta. ¿Qué riesgo aparece?",
      options: [
        "Se duplica el código fuente sin consecuencias",
        "Cada uno corrige lo que rompió el otro y el ciclo consume tokens sin terminar",
        "Git bloquea el repositorio por completo",
        "El caché de prompts borra los cambios",
      ],
      correctIndex: 1,
      explanation: "Los cambios se pisan, aparecen errores y cada agente intenta repararlos. Dar una copia independiente a cada agente evita el ciclo.",
    },
    {
      question: "¿Qué función de Git permite dar a cada agente su propia copia de trabajo?",
      options: ["git stash", "Los worktrees", "git blame", "git bisect"],
      correctIndex: 1,
      explanation: "Los worktrees crean varias copias de trabajo de un mismo repositorio, cada una con su rama. Se estudian en el bloque de fundamentos.",
    },
    {
      question: "¿Basta una cuenta gratuita de Claude para usar Claude Code?",
      options: [
        "Sí, con límites reducidos",
        "No: hace falta un plan de pago, una cuenta de Console o un proveedor de nube compatible",
        "Sí, pero solo en la terminal",
        "Solo si instalas Node.js",
      ],
      correctIndex: 1,
      explanation: "La documentación indica que el plan gratuito de claude.ai no incluye Claude Code. Se requiere Pro, Max, Ultra, Team o Enterprise, una cuenta de Console o un proveedor compatible.",
    },
    {
      question: "¿Qué comando comprueba que GitHub CLI está instalado?",
      options: ["github --version", "git hub --version", "gh --version", "ghub -v"],
      correctIndex: 2,
      explanation: "El ejecutable de GitHub CLI se llama gh. Escribir github no corresponde a ninguna herramienta oficial.",
    },
    {
      question: "Tras instalar Node.js, `node --version` responde `command not found`. ¿Qué haces primero?",
      options: [
        "Reinstalar el sistema operativo",
        "Cerrar la terminal y abrir una nueva, porque la instalación cambia el PATH",
        "Cambiar de editor",
        "Instalar Git",
      ],
      correctIndex: 1,
      explanation: "Las ventanas ya abiertas conservan el PATH anterior. Una terminal nueva lo recarga. Si persiste, se usa which o where para ver dónde está el ejecutable.",
    },
    {
      question: "¿Qué versión mínima de Node.js exige el paquete de npm de Claude Code?",
      options: ["14", "18", "22", "26"],
      correctIndex: 2,
      explanation: "La documentación indica Node.js 22 o superior para el paquete de npm. El instalador nativo, recomendado, no requiere Node.js.",
    },
    {
      question: "¿Qué hace `gh auth login` por defecto?",
      options: [
        "Crea una cuenta de GitHub",
        "Abre un flujo en el navegador y guarda el token en el almacén de credenciales del sistema",
        "Instala Git",
        "Sube el proyecto a un repositorio",
      ],
      correctIndex: 1,
      explanation: "El modo predeterminado es el flujo web con navegador. El token resultante se guarda en el almacén de credenciales, y solo si no existe se escribe en un archivo de texto.",
    },
    {
      question: "¿Cómo se llaman hoy las antiguas rutinas de Claude Code?",
      options: [
        "Hooks",
        "Skills programadas",
        "Tareas programadas",
        "Subagentes",
      ],
      correctIndex: 2,
      explanation: "La documentación las llama tareas programadas (antes rutinas). Se ejecutan en la nube según un horario, por una llamada a una API o por eventos de GitHub.",
    },
    {
      question: "Instalaste la extensión de Claude Code y quieres escribir `claude` en la terminal integrada de VS Code. ¿Qué necesitas?",
      options: [
        "Nada: la extensión ya lo habilita",
        "Instalar además el CLI independiente",
        "Cambiar a Cursor",
        "Reinstalar VS Code",
      ],
      correctIndex: 1,
      explanation: "La extensión incluye su propia copia del CLI para su panel de chat. Para usar el comando claude en la terminal integrada hay que instalar el CLI independiente.",
    },
  ],
};
