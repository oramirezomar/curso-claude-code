import type { Lesson } from "@/lib/types";

// Día 20 · Clases 73, 75 y 76 de la transcripción (el artículo 74 solo resume los temas de la sección).
// Contenido verificado en noviembre de 2026.
export const day20: Lesson = {
  day: 20,
  slug: "arcade-vault-proyecto-repositorio-y-rama-protegida",
  title: "Arcade Vault: proyecto nuevo, repositorio y rama protegida",
  section: "Skills y Playwright MCP",
  estimatedMinutes: 90,
  icon: "🕹️",
  objectives: [
    "Crear un proyecto Next.js con create-next-app, saber qué genera y comprobar que arranca.",
    "Entender por qué un CLAUDE.md creado con /init deja de leer AGENTS.md, y resolverlo con un import.",
    "Dejar el proyecto listo para trabajar con specs: README, skills, referencias de diseño, lint y build en verde.",
    "Publicar el repositorio en GitHub y proteger main para que todo cambio llegue por un pull request.",
    "Recorrer el flujo completo de una rama: crear, subir, integrar, traer los cambios y borrar la rama, incluido el caso del squash.",
  ],
  blocks: [
    {
      type: "paragraph",
      text: "Empieza la sección 8 con un proyecto nuevo y más grande que el Arkanoid: Arcade Vault, una pequeña plataforma de juegos arcade para jugar en el navegador y competir por puntos. En esta lección solo se prepara el terreno: el proyecto con Next.js, los archivos que Claude lee, los skills del flujo con specs, las referencias de diseño y un repositorio con la rama principal protegida. Las pantallas y el correo electrónico vienen después.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "20.9", label: "Versión mínima de Node que pide Next.js" },
        { value: "6", label: "Pantallas obligatorias del MVP" },
        { value: "AGENTS.md", label: "Único archivo de instrucciones que genera create-next-app" },
        { value: "@AGENTS.md", label: "Línea que mantiene esas instrucciones tras un /init" },
        { value: "0", label: "Pushes directos a main una vez protegida" },
        { value: "-d o -D", label: "Dos formas de borrar la rama, con consecuencias distintas" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text: "Contenido verificado en noviembre de 2026. Creé el proyecto con create-next-app, lo arranqué, ejecuté lint y build, y probé el flujo de ramas con un repositorio remoto local que hace de GitHub. Eso me permitió ver las salidas reales de Git, incluido el error del squash. No pude probar la interfaz de GitHub ni sus mensajes, así que esos pasos y los de Claude Code, en los ejercicios 2, 6, 9 y 10, son orientativos. Las versiones que aparecen cambian con el tiempo.",
    },
    { type: "heading", level: 2, text: "Qué se va a construir" },
    {
      type: "image",
      src: "/img/dia-20/pantallas-del-mvp.svg",
      alt: "Seis esquemas oscuros de pantallas con acentos de neón. Inicio con una cuadrícula de tarjetas de juegos. Previsualización con una imagen, un texto y un botón Jugar. Jugar con un área de juego marcada como marcador de posición y un botón de pausa. Salón de la fama con pestañas y una tabla de puestos. Iniciar sesión con dos campos, un botón y dos botones de redes sociales. Crear cuenta con tres campos, un botón y los mismos botones sociales.",
      caption: "Las seis pantallas que debe tener el MVP.",
    },
    {
      type: "paragraph",
      text: "Los juegos de la plataforma serán marcadores de posición: lo que importa es la estructura, el diseño y el flujo. Más adelante añadirás skills para crear y modificar juegos, y un servidor MCP que controla el navegador para comprobar que la interfaz se parece a las referencias. Es un camino más lento que escribir prompts sueltos. A cambio tomas decisiones, piensas con espíritu crítico y pruebas paso a paso, de modo que si la inteligencia artificial se descarrila lo ves pronto, y no cuando ya construyó mucho encima de un error.",
    },
    {
      type: "paragraph",
      text: "Una advertencia sobre los servidores MCP, porque a menudo se exagera. Cada herramienta cuesta contexto, pero Claude Code usa por defecto la búsqueda de herramientas: al empezar la sesión solo carga los nombres de las herramientas y las instrucciones del servidor, y el resto de las definiciones se cargan cuando hacen falta. Añadir servidores sigue teniendo coste, pero es menor de lo que se piensa.",
    },
    { type: "heading", level: 2, text: "Crear el proyecto con create-next-app" },
    {
      type: "paragraph",
      text: "Necesitas Node 20.9 o superior: es lo que pide el paquete de Next.js que se instala hoy. Con una versión anterior, el comando falla al instalar. Si no estás seguro de la tuya, el experimento 11 te lo dice. La carpeta se llamará 06-arcade-vault, para seguir la numeración de los ejercicios: el Tetris fue el 04 y el Arkanoid el 05.",
    },
    {
      type: "code",
      lang: "bash",
      title: "Terminal",
      code: `cd ~/ClaudeCode
npx create-next-app@latest 06-arcade-vault --yes --use-npm`,
    },
    {
      type: "paragraph",
      text: "Sin el indicador --yes, el comando te pregunta, y la primera opción es usar los valores recomendados, que es lo que conviene aquí. Con --yes se aceptan directamente. Según la documentación actual de create-next-app, esos valores son los de la tabla.",
    },
    {
      type: "table",
      headers: ["Opción", "Valor recomendado", "Qué significa"],
      rows: [
        ["Lenguaje", "TypeScript", "JavaScript con tipos."],
        ["Linter", "ESLint", "Revisa el código. Biome es la alternativa."],
        ["React Compiler", "No", "Optimización opcional que aquí no se usa."],
        ["Estilos", "Tailwind CSS", "Clases utilitarias dentro del HTML."],
        ["Carpeta src/", "No", "Las carpetas van en la raíz."],
        ["Enrutador", "App Router", "Las rutas son carpetas dentro de app/."],
        ["Cache Components", "Sí", "El modelo de caché actual de Next.js."],
        ["AGENTS.md", "Sí", "Un archivo de instrucciones para agentes de código."],
        ["Comentarios de agentes", "Sí", "Permite que los agentes preparen comentarios anónimos sobre Next.js para que los revises."],
      ],
    },
    {
      type: "callout",
      variant: "warning",
      text: "La última opción merece una decisión consciente. Los comentarios de los agentes vienen activados en los valores recomendados. No se envía nada sin que lo revises, pero si prefieres no tenerlo, añade --no-agent-feedback al comando, o desactívalo después con experimental.agentFeedback: false en next.config.ts.",
    },
    {
      type: "paragraph",
      text: "Esto es lo que genera hoy, comprobado en mi máquina. La plantilla es mínima, con una sola página. El comando inicializa el repositorio de Git por sí mismo, con un primer commit llamado Initial commit from Create Next App, en la rama main. Y crea un AGENTS.md, pero no un CLAUDE.md, aunque en el video se mencionaba como si crease los dos: ese lo creas tú, con /init.",
    },
    {
      type: "table",
      headers: ["Dato", "Valor verificado (noviembre de 2026)"],
      rows: [
        ["Next.js", "16.4.6, con Turbopack."],
        ["React", "19.3.0."],
        ["Tailwind CSS", "4.3.3, con el cargador de Turbopack. La plantilla no incluye postcss.config."],
        ["Paquetes instalados", "361, sin vulnerabilidades en el momento de la prueba."],
        ["Rama y commit", "main, con un commit inicial."],
        ["Archivos de agentes", "AGENTS.md. No hay CLAUDE.md."],
        ["Documentación local", "node_modules/next/dist/docs, con la documentación de la versión instalada."],
      ],
    },
    {
      type: "paragraph",
      text: "Para comprobar que arranca, ejecuta `npm run dev` y abre http://localhost:3000. Debes ver la página de bienvenida de Next.js, sin errores en la terminal. Para en ese momento con Ctrl+C: todavía no hay nada que mirar.",
    },
    { type: "heading", level: 2, text: "AGENTS.md y CLAUDE.md" },
    {
      type: "image",
      src: "/img/dia-20/agents-y-claude-md.svg",
      alt: "Tres casos. Un repositorio con solo AGENTS.md: Claude lee AGENTS.md, que es la situación tras create-next-app. Con AGENTS.md y CLAUDE.md, que es lo que queda tras /init: Claude lee solo CLAUDE.md y AGENTS.md deja de leerse. Con un CLAUDE.md que empieza con @AGENTS.md: Claude lee los dos, el importado primero. Debajo, una explicación de por qué importa en este proyecto y cómo comprobarlo con /context all.",
      caption: "En cuanto existe un CLAUDE.md, el AGENTS.md hay que importarlo.",
    },
    {
      type: "paragraph",
      text: "Esto es lo más fácil de pasar por alto de la lección. Claude Code puede leer AGENTS.md como instrucciones del proyecto, pero solo cuando no hay ningún CLAUDE.md en tu carpeta ni por encima. Tras lanzar `/init`, aparece un CLAUDE.md y el AGENTS.md deja de leerse por defecto. Es un problema real aquí: el AGENTS.md de Next.js pide leer la documentación incluida en node_modules antes de escribir código, porque esta versión tiene cambios que un modelo puede no conocer.",
    },
    {
      type: "paragraph",
      text: "La solución recomendada por la documentación es poner `@AGENTS.md` en la primera línea de CLAUDE.md: es un import, y Claude lee el archivo importado primero y después el resto. El comando /init, por su parte, lee las instrucciones de otras herramientas e incorpora lo relevante al CLAUDE.md que genera, así que puede que ya lo haga. No lo des por hecho: abre el archivo y mira. Después ejecuta `/context all` en una sesión nueva, y comprueba que CLAUDE.md aparece en Memory files y que incluye el contenido importado.",
    },
    {
      type: "code",
      lang: "markdown",
      title: "CLAUDE.md",
      code: `@AGENTS.md

# Arcade Vault

Plataforma de juegos arcade para jugar en el navegador y competir por puntos.

## Pila
- Next.js con App Router, React, TypeScript y Tailwind CSS. Las versiones están en package.json.
- Node 20.9 o superior.

## Comandos
- npm run dev: servidor de desarrollo en el puerto 3000.
- npm run lint y npm run build: se ejecutan antes de dar un cambio por bueno.

## Cómo trabajamos
- Cada funcionalidad empieza con un spec en specs/: /spec para escribirlo y /spec-impl para implementarlo.
- Los diseños de referencia están en references/. Se consultan al trabajar en una pantalla, no se cargan siempre.
- Nunca se trabaja en main: cada cambio va en una rama y llega por pull request.

## Reglas
- Responde siempre en español.`,
    },
    {
      type: "paragraph",
      text: "Mantenlo corto, como en los proyectos anteriores. Describe la pila, los comandos y el modo de trabajar, y deja fuera lo que Claude deduce del código. Fíjate en cómo se menciona references/: con la ruta en texto normal, y no con un import. Así Claude sabe que existe y la consulta cuando trabaja en una pantalla, en lugar de cargar todos los diseños en cada sesión.",
    },
    { type: "heading", level: 2, text: "README, skills y referencias" },
    {
      type: "paragraph",
      text: "El README que trae la plantilla es el genérico de Next.js. Sustitúyelo por uno que cuente qué es el proyecto, cómo se construye y cómo se ejecuta. Es lo primero que lee cualquier persona, y también una buena fuente de contexto para Claude.",
    },
    {
      type: "code",
      lang: "markdown",
      title: "README.md",
      code: `# Arcade Vault

Una plataforma de videojuegos arcade para jugar en el navegador y competir por puntos.

## Qué tiene el MVP
- Selección de juegos.
- Previsualización de cada juego y pantalla para jugarlo.
- Salón de la fama con los mejores puntajes.
- Inicio de sesión y creación de cuenta.

## Cómo se construye
- Con Spec Driven Design: cada funcionalidad empieza con /spec y se implementa con /spec-impl.
- Los diseños de referencia están en references/.
- Pila: Next.js, React, TypeScript y Tailwind CSS.

## Cómo ejecutarlo
Hace falta Node 20.9 o superior.

    npm install
    npm run dev

Abre http://localhost:3000.`,
    },
    {
      type: "paragraph",
      text: "Los skills spec y spec-impl que escribiste en el Día 16 se copian al proyecto, a nivel de proyecto, para que viajen con el repositorio y los tenga quien lo clone. Tampoco hace falta instalar nada de terceros: ya tienes los tuyos. Si más adelante instalas skills ajenos, léelos antes, como en el Día 16. Copia también el validador de specs y el listador de skills, que son genéricos.",
    },
    {
      type: "code",
      lang: "bash",
      title: "Terminal, dentro de 06-arcade-vault",
      code: `mkdir -p .claude/skills scripts references
cp -R ~/ClaudeCode/05-arkanoid/.claude/skills/spec .claude/skills/
cp -R ~/ClaudeCode/05-arkanoid/.claude/skills/spec-impl .claude/skills/
cp ~/ClaudeCode/05-arkanoid/scripts/validar-spec.js ~/ClaudeCode/05-arkanoid/scripts/listar-skills.js scripts/`,
    },
    {
      type: "paragraph",
      text: "Aquí apareció un problema real. Esos scripts están escritos en CommonJS, con require, y la plantilla de Next.js trae reglas de ESLint que lo prohíben. El resultado: `npm run lint` falla con tres errores en archivos que no son de la aplicación. Y como el CLAUDE.md dice que el lint debe pasar antes de dar un cambio por bueno, no puedes dejarlo así. La solución es decirle a ESLint que ignore la carpeta scripts, en eslint.config.mjs.",
    },
    {
      type: "comparison",
      lang: "js",
      before: {
        title: "eslint.config.mjs antes",
        code: `    "next-env.d.ts",
  ]),`,
      },
      after: {
        title: "eslint.config.mjs después",
        code: `    "next-env.d.ts",
    // Scripts de apoyo del flujo con specs, escritos en CommonJS.
    "scripts/**",
  ]),`,
      },
    },
    {
      type: "paragraph",
      text: "Es una lección general: al llevar herramientas de un proyecto a otro, comprueba que el proyecto sigue en verde antes del primer commit. Mejor descubrir el error ahora que mezclado con la primera funcionalidad. Y una nota sobre los permisos: si Claude te pide permiso y eliges permitir, guarda esa decisión en .claude/settings.local.json. Claude Code lo mantiene fuera de Git la primera vez que lo escribe, así que no hace falta añadirlo al .gitignore, salvo que lo crees a mano.",
    },
    {
      type: "paragraph",
      text: "Queda la carpeta references/, donde viven los diseños que Claude comparará más adelante con lo que construya. Para el curso, el contenido es este brief de diseño. Sirve de texto para pedirle una plantilla a una herramienta de diseño, como la que verás en las lecciones de Claude Design, y también de referencia directa. Si usas una herramienta que genera archivos HTML o React, descárgalos a esta carpeta: son archivos locales que revisas, versionas y consultas sin depender de otro servicio.",
    },
    {
      type: "code",
      lang: "markdown",
      title: "references/design-brief.md",
      code: `# Arcade Vault: brief de diseño

Plataforma de juegos arcade en el navegador. Estética de sala recreativa nocturna: fondo oscuro, colores de neón y mucho contraste. Sirve como texto para una herramienta de diseño y como referencia de la implementación.

## Colores
- Fondo: #0b0d1a. Paneles: #151933. Texto: #e8ecff.
- Acento principal: #ff3d81. Acento secundario: #29f0ff. Puntos y premios: #ffd166.

## Tipografía
- Títulos en la fuente monoespaciada del sistema, en mayúsculas y con espaciado entre letras.
- Texto en la fuente sans-serif del sistema.

## Pantallas obligatorias
1. Inicio, con la selección de juegos: una cuadrícula de seis tarjetas, cada una con nombre, género y mejor puntaje.
2. Previsualización de un juego: nombre, descripción corta, controles y un botón Jugar.
3. Jugar: un área de juego, el puntaje y un botón de pausa. En el MVP el área de juego es un marcador de posición.
4. Salón de la fama: pestañas por juego y una tabla con puesto, jugador y puntaje.
5. Iniciar sesión: correo, contraseña y dos botones de redes sociales.
6. Crear cuenta: nombre, correo, contraseña y los mismos dos botones.

## Juegos de muestra
Rompe Bloques, Culebra, Defensor, Laberinto, Saltarín y Memoria. Son marcadores de posición.

## Reglas de diseño
- Mismo encabezado en todas las pantallas, con el nombre, el acceso al Salón de la fama y el inicio de sesión.
- Botones con un color de acento y un borde brillante al pasar el ratón.
- Todo debe leerse bien en una pantalla de móvil y en una de escritorio.`,
    },
    { type: "heading", level: 2, text: "Un primer commit en verde" },
    {
      type: "image",
      src: "/img/dia-20/del-cero-al-repo.svg",
      alt: "Siete pasos en dos filas. Arriba: crear con create-next-app, describir con README y CLAUDE.md, equipar con los skills y las referencias, y comprobar con lint y build. Abajo: guardar en un commit, publicar en un repositorio de GitHub con git push, y proteger main. Una nota dice que el primer commit directo en main es el último que haces ahí.",
      caption: "Todo lo que hay que dejar hecho antes de proteger main.",
    },
    {
      type: "paragraph",
      text: "Antes de guardar, ejecuta `npm run lint` y `npm run build`. Los dos deben terminar sin errores. El build, además, comprueba los tipos de TypeScript y genera la página estática, y es la mejor señal de que el proyecto base está sano. Después, un solo commit con todo lo añadido. Es el último commit que harás directamente en main.",
    },
    { type: "heading", level: 2, text: "El repositorio en GitHub" },
    {
      type: "paragraph",
      text: "Crea un repositorio nuevo en GitHub, sin README ni .gitignore, porque ya los tienes. GitHub te mostrará tres comandos para un repositorio existente: añadir el remoto, asegurar que la rama se llama main y hacer el primer push. Son los que ejecutas en tu carpeta.",
    },
    {
      type: "code",
      lang: "bash",
      title: "Terminal, con la dirección que te da GitHub",
      code: `git remote add origin git@github.com:TU-USUARIO/arcade-vault.git
git branch -M main
git push -u origin main`,
    },
    {
      type: "paragraph",
      text: "Decide si el repositorio es público o privado, y fíjate en esto, que condiciona lo que viene. Según la documentación de GitHub, las ramas protegidas están disponibles en repositorios públicos con GitHub Free. En repositorios privados hace falta GitHub Pro, Team o Enterprise. Si tu repositorio es privado y tu plan es el gratuito, no podrás activar la protección: es un buen motivo para hacerlo público, o para seguir el flujo de ramas igualmente por disciplina.",
    },
    { type: "heading", level: 2, text: "Proteger la rama principal" },
    {
      type: "paragraph",
      text: "La rama main es la que, en un proyecto real, dispara el despliegue. Por eso no conviene que nadie, tú incluido, pueda cambiarla de forma directa. En Settings, apartado Branches, GitHub ofrece las reglas de protección clásicas y, además, los rulesets, una alternativa más flexible, en la que varias reglas pueden aplicarse a la vez, y que cuenta con una herramienta de conversión desde las reglas clásicas. Aquí se usa la regla clásica por ser la más sencilla de seguir. Estas son las casillas.",
    },
    {
      type: "table",
      headers: ["Casilla", "Qué hace", "Cómo dejarla"],
      rows: [
        ["Rama a proteger", "El patrón del nombre.", "main."],
        ["Require a pull request before merging", "Todo cambio llega por un pull request.", "Activada."],
        ["Required approvals", "Cuántas personas deben aprobar.", "0 si trabajas solo. En equipo, al menos 1."],
        ["Require status checks to pass", "Exige que pasen las comprobaciones elegidas.", "Activada. Sin pruebas automáticas todavía no hay comprobaciones que elegir."],
        ["Require branches to be up to date", "La rama debe estar actualizada con main antes de integrar.", "Activada."],
        ["Do not allow bypassing the above settings", "Aplica las reglas también a los administradores.", "Activada."],
      ],
    },
    {
      type: "paragraph",
      text: "La última casilla es la que convierte las reglas en obligación. Por defecto, las restricciones de una regla de protección no se aplican a quienes tienen permisos de administración del repositorio, y eso incluye a la persona que lo creó. Sin esa casilla, tú podrías seguir empujando a main. Con ella activada, un git push directo se rechaza, y verás un mensaje del tipo Protected branch update failed. Es la prueba de que funciona: intenta cambiar el README en main y empujar.",
    },
    {
      type: "image",
      src: "/img/dia-20/rama-pull-request-y-limpieza.svg",
      alt: "Cuatro pasos en una fila: crear la rama con git switch -c, subirla con git push -u origin, abrir y integrar el pull request en GitHub y traer los cambios con git switch main y git pull --prune. Debajo, git branch -d según cómo se integró. Con un merge commit funciona y dice Deleted branch. Con squash and merge da el error the branch is not fully merged y hace falta -D. Con rebase and merge pasa lo mismo, porque los commits se reescriben. Una nota avisa de comprobar el pull request antes de usar -D.",
      caption: "El ciclo de una rama, y por qué a veces -d no basta.",
    },
    { type: "heading", level: 2, text: "El ciclo de una rama" },
    {
      type: "paragraph",
      text: "Desde ahora, todo cambio sigue el mismo camino. Creas una rama con `git switch -c 01-config`, haces tus commits y la subes con `git push -u origin 01-config`. GitHub te ofrece abrir un pull request: lo creas, lo revisas, y lo integras con el botón de merge. Después, borras la rama remota desde GitHub, vuelves a main y traes los cambios con `git pull --prune`, que además elimina la referencia a la rama remota ya borrada. Por último, borras la rama local.",
    },
    {
      type: "paragraph",
      text: "Ese último paso tiene una trampa que conviene conocer, y que reproduje con un remoto local que hace de GitHub. El botón de merge tiene tres modos. Con Create a merge commit, los commits de tu rama pasan a formar parte de main, y `git branch -d` funciona. Con Squash and merge, main recibe un commit nuevo con el mismo cambio, pero los commits de tu rama no están en main. Con Rebase and merge, GitHub reescribe los commits y crea otros con distinto identificador, según su documentación. En esos dos casos, Git no ve tu rama como integrada y se niega a borrarla.",
    },
    {
      type: "code",
      lang: "text",
      title: "Salida real de git branch -d tras un squash",
      code: `error: the branch '01-config' is not fully merged
hint: If you are sure you want to delete it, run 'git branch -D 01-config'
hint: Disable this message with "git config set advice.forceDeleteBranch false"`,
    },
    {
      type: "paragraph",
      text: "No es un error del proyecto. Es Git avisando de que no puede demostrar que el trabajo está en main. Si has comprobado en GitHub que el pull request figura como integrado, puedes usar `git branch -D 01-config` sin riesgo. Hazlo siempre tras mirar: -D borra sin preguntar. Tras `git pull --prune`, `git branch -vv` marca la rama local como [origin/01-config: gone] cuando la remota ya no existe, otra señal útil.",
    },
    { type: "heading", level: 2, text: "Ejercicios guiados y experimentos" },
    {
      type: "paragraph",
      text: "Los ejercicios 3, 7 y 8 se ejecutan con Git y Node y sus salidas son reales, igual que los comandos locales de Git del 10. Los ejercicios 1, 2, 4, 5, 6 y 9, y los pasos de GitHub y de Claude Code del 10, dependen de tu equipo, de tu cuenta o del modelo, y sus salidas son orientativas. Los experimentos del final se ejecutan en el navegador.",
    },
    {
      type: "exercise",
      title: "Ejercicio 1: comprobar Node",
      description: "Next.js pide Node 20.9 o superior.",
      steps: [
        {
          instruction: "Mira tu versión. Si es anterior, actualiza antes de seguir, por ejemplo con nvm.",
          command: "node -v",
          expected: "v20.9.0 o una versión posterior, como v22.13.1.",
        },
      ],
      verify: "La versión es 20.9.0 o superior. El experimento 11 hace esa comparación por ti.",
    },
    {
      type: "exercise",
      title: "Ejercicio 2: crear el proyecto",
      description: "Con los valores recomendados.",
      steps: [
        {
          instruction: "Ve a la carpeta de los ejercicios y crea el proyecto. Si prefieres no activar los comentarios de agentes, añade --no-agent-feedback.",
          command: "cd ~/ClaudeCode && npx create-next-app@latest 06-arcade-vault --yes --use-npm",
          expected: "Una lista de las dependencias que se instalan, y al final: Initialized a git repository. y Success! Created 06-arcade-vault, con la ruta completa.",
        },
      ],
      verify: "Existe la carpeta 06-arcade-vault. Si el comando se queja de la versión de Node, vuelve al ejercicio 1.",
    },
    {
      type: "exercise",
      title: "Ejercicio 3: qué se ha generado",
      description: "Mira el repositorio que creó el comando.",
      steps: [
        {
          instruction: "Entra en el proyecto y mira el commit inicial, la rama y los archivos guardados.",
          command: "cd 06-arcade-vault && git log --format=%s && git branch --show-current && git ls-files",
          expected: "Initial commit from Create Next App\nmain\n.gitignore\nAGENTS.md\nREADME.md\napp/favicon.ico\napp/globals.css\napp/layout.tsx\napp/page.tsx\neslint.config.mjs\nnext.config.ts\npackage-lock.json\npackage.json\npublic/file.svg\npublic/globe.svg\npublic/next.svg\npublic/vercel.svg\npublic/window.svg\ntsconfig.json",
        },
      ],
      verify: "Hay un AGENTS.md y no hay ningún CLAUDE.md. Si tu lista difiere ligeramente, puede ser que la plantilla haya cambiado.",
    },
    {
      type: "exercise",
      title: "Ejercicio 4: el primer arranque",
      description: "Comprueba que la plantilla funciona antes de tocarla.",
      steps: [
        {
          instruction: "Arranca el servidor de desarrollo, abre la dirección y para con Ctrl+C.",
          command: "npm run dev",
          expected: "Next.js, con su versión, y debajo Local: http://localhost:3000 y un mensaje Ready.",
        },
      ],
      verify: "La página de bienvenida carga sin errores en la terminal ni en el navegador.",
    },
    {
      type: "exercise",
      title: "Ejercicio 5: README y CLAUDE.md",
      description: "Describe el proyecto y mantén las instrucciones de Next.js.",
      steps: [
        {
          instruction: "Sustituye el README por el de referencia.",
          file: {
            name: "README.md",
            code: `# Arcade Vault

Una plataforma de videojuegos arcade para jugar en el navegador y competir por puntos.

## Qué tiene el MVP
- Selección de juegos.
- Previsualización de cada juego y pantalla para jugarlo.
- Salón de la fama con los mejores puntajes.
- Inicio de sesión y creación de cuenta.

## Cómo se construye
- Con Spec Driven Design: cada funcionalidad empieza con /spec y se implementa con /spec-impl.
- Los diseños de referencia están en references/.
- Pila: Next.js, React, TypeScript y Tailwind CSS.

## Cómo ejecutarlo
Hace falta Node 20.9 o superior.

    npm install
    npm run dev

Abre http://localhost:3000.`,
          },
        },
        {
          instruction: "Abre Claude Code y lanza /init. Lee con atención lo que genera, y comprueba si ha incorporado el contenido de AGENTS.md.",
          command: "claude\n/init",
          expected: "Claude revisa el proyecto y crea un CLAUDE.md con la pila, los comandos y la estructura. Puede que ya incluya lo esencial de AGENTS.md, o puede que no.",
        },
        {
          instruction: "Guarda el CLAUDE.md de referencia, que importa AGENTS.md, o corrige el tuyo para que lo haga.",
          file: {
            name: "CLAUDE.md",
            code: `@AGENTS.md

# Arcade Vault

Plataforma de juegos arcade para jugar en el navegador y competir por puntos.

## Pila
- Next.js con App Router, React, TypeScript y Tailwind CSS. Las versiones están en package.json.
- Node 20.9 o superior.

## Comandos
- npm run dev: servidor de desarrollo en el puerto 3000.
- npm run lint y npm run build: se ejecutan antes de dar un cambio por bueno.

## Cómo trabajamos
- Cada funcionalidad empieza con un spec en specs/: /spec para escribirlo y /spec-impl para implementarlo.
- Los diseños de referencia están en references/. Se consultan al trabajar en una pantalla, no se cargan siempre.
- Nunca se trabaja en main: cada cambio va en una rama y llega por pull request.

## Reglas
- Responde siempre en español.`,
          },
        },
        {
          instruction: "En una sesión nueva, comprueba qué se carga.",
          command: "/context all",
          expected: "CLAUDE.md aparece en Memory files, y su contenido incluye el de AGENTS.md importado.",
        },
      ],
      verify: "La primera línea de CLAUDE.md es @AGENTS.md y /context all muestra el archivo.",
    },
    {
      type: "exercise",
      title: "Ejercicio 6: skills, scripts y lint",
      description: "Lleva los skills al proyecto y arregla el lint.",
      steps: [
        {
          instruction: "Copia los skills y los scripts del Arkanoid.",
          command: "mkdir -p .claude/skills scripts references && cp -R ~/ClaudeCode/05-arkanoid/.claude/skills/spec ~/ClaudeCode/05-arkanoid/.claude/skills/spec-impl .claude/skills/ && cp ~/ClaudeCode/05-arkanoid/scripts/validar-spec.js ~/ClaudeCode/05-arkanoid/scripts/listar-skills.js scripts/",
        },
        {
          instruction: "Comprueba que los dos skills se ven.",
          command: "node scripts/listar-skills.js",
          expected: "/spec | solo tú | Escribe un spec en specs/ con seis secciones, de\n/spec-impl | solo tú | Implementa un spec aprobado por pasos, en una ra",
        },
        {
          instruction: "Pasa el lint. Debe fallar por los scripts, que están escritos con require.",
          command: "npm run lint 2>&1 | grep problems",
          expected: "✖ 3 problems (3 errors, 0 warnings)",
        },
        {
          instruction: "En eslint.config.mjs, añade la línea de scripts a la lista de ignorados, como en la comparación de la lección. Vuelve a pasar el lint.",
          command: "npm run lint --silent && echo lint correcto",
          expected: "lint correcto",
        },
      ],
      verify: "El lint pasa sin tocar los scripts, y /skills en Claude Code muestra spec y spec-impl.",
    },
    {
      type: "exercise",
      title: "Ejercicio 7: referencias y primer commit",
      description: "Guarda el brief de diseño, comprueba el build y guarda todo.",
      steps: [
        {
          instruction: "Guarda el brief de diseño de referencia.",
          file: {
            name: "references/design-brief.md",
            code: `# Arcade Vault: brief de diseño

Plataforma de juegos arcade en el navegador. Estética de sala recreativa nocturna: fondo oscuro, colores de neón y mucho contraste. Sirve como texto para una herramienta de diseño y como referencia de la implementación.

## Colores
- Fondo: #0b0d1a. Paneles: #151933. Texto: #e8ecff.
- Acento principal: #ff3d81. Acento secundario: #29f0ff. Puntos y premios: #ffd166.

## Tipografía
- Títulos en la fuente monoespaciada del sistema, en mayúsculas y con espaciado entre letras.
- Texto en la fuente sans-serif del sistema.

## Pantallas obligatorias
1. Inicio, con la selección de juegos: una cuadrícula de seis tarjetas, cada una con nombre, género y mejor puntaje.
2. Previsualización de un juego: nombre, descripción corta, controles y un botón Jugar.
3. Jugar: un área de juego, el puntaje y un botón de pausa. En el MVP el área de juego es un marcador de posición.
4. Salón de la fama: pestañas por juego y una tabla con puesto, jugador y puntaje.
5. Iniciar sesión: correo, contraseña y dos botones de redes sociales.
6. Crear cuenta: nombre, correo, contraseña y los mismos dos botones.

## Juegos de muestra
Rompe Bloques, Culebra, Defensor, Laberinto, Saltarín y Memoria. Son marcadores de posición.

## Reglas de diseño
- Mismo encabezado en todas las pantallas, con el nombre, el acceso al Salón de la fama y el inicio de sesión.
- Botones con un color de acento y un borde brillante al pasar el ratón.
- Todo debe leerse bien en una pantalla de móvil y en una de escritorio.`,
          },
        },
        {
          instruction: "Comprueba que el proyecto compila.",
          command: "npm run build > /dev/null 2>&1 && echo build correcto",
          expected: "build correcto",
        },
        {
          instruction: "Guarda todo en un commit.",
          command: "git add -A && git commit -q -m \"chore: README, skills de specs, CLAUDE.md y referencias de diseño\" && git status --porcelain && git log --format=%s",
          expected: "chore: README, skills de specs, CLAUDE.md y referencias de diseño\nInitial commit from Create Next App",
        },
      ],
      verify: "El build termina sin errores y no quedan cambios sin guardar.",
    },
    {
      type: "exercise",
      title: "Ejercicio 8: el repositorio en GitHub",
      description: "Crea el repositorio y sube main.",
      steps: [
        {
          instruction: "En GitHub, crea un repositorio llamado arcade-vault, sin README ni .gitignore. Público si quieres proteger main con un plan gratuito.",
          command: "git remote add origin git@github.com:TU-USUARIO/arcade-vault.git && git branch -M main && git push -u origin main",
          expected: "Una lista de objetos enviados y, al final: branch 'main' set up to track 'origin/main'.",
        },
        {
          instruction: "Comprueba el remoto.",
          command: "git status -sb | head -1",
          expected: "## main...origin/main",
        },
      ],
      verify: "En GitHub ves tus archivos, incluido CLAUDE.md y la carpeta references.",
    },
    {
      type: "exercise",
      title: "Ejercicio 9: proteger main",
      description: "Activa las reglas y comprueba que rechazan un push directo.",
      steps: [
        {
          instruction: "En GitHub, ve a Settings, Branches y crea una regla para main con las casillas de la tabla. Si trabajas solo, pon las aprobaciones en 0.",
          command: "Settings > Branches > Add branch protection rule",
          expected: "La regla aparece listada para main.",
        },
        {
          instruction: "Prueba que funciona: cambia algo del README en main, guárdalo e intenta subirlo.",
          command: "echo \"Hola mundo\" >> README.md && git commit -q -am \"docs: prueba\" && git push",
          expected: "El push se rechaza, con un mensaje de que la rama protegida no se puede actualizar (Protected branch update failed).",
        },
        {
          instruction: "Descarta solo ese commit de prueba en local, para dejar main como estaba en el remoto.",
          command: "git reset -q --hard origin/main && git status --porcelain && git log --format=%s -1",
          expected: "chore: README, skills de specs, CLAUDE.md y referencias de diseño",
        },
      ],
      verify: "Un push directo a main se rechaza. Si se acepta, revisa que activaste Do not allow bypassing the above settings.",
    },
    {
      type: "exercise",
      title: "Ejercicio 10: el ciclo de una rama",
      description: "Rama, commit, pull request, integración y limpieza.",
      steps: [
        {
          instruction: "Crea la rama de configuración, haz un cambio y súbela.",
          command: "git switch -c 01-config && echo \"Hola mundo\" >> README.md && git commit -q -am \"docs: sección de prueba en el README\" && git push -u origin 01-config",
          expected: "branch '01-config' set up to track 'origin/01-config'.",
        },
        {
          instruction: "En GitHub, abre el pull request desde 01-config hacia main, revisa los cambios e intégralo. Elige Create a merge commit. Después, borra la rama remota con el botón que ofrece.",
          command: "Compare & pull request > Create pull request > Merge pull request > Delete branch",
          expected: "GitHub marca el pull request como Merged y la rama remota desaparece.",
        },
        {
          instruction: "Vuelve a main, trae los cambios y cuenta las ramas locales cuya remota ya no existe.",
          command: "git switch main && git pull --prune -q && git log --format=%s -2 && git branch -vv | grep -c gone",
          expected: "Merge pull request #1 from TU-USUARIO/01-config\ndocs: sección de prueba en el README\n1",
        },
        {
          instruction: "Borra la rama local. Con un merge commit, -d funciona.",
          command: "git branch -d 01-config > /dev/null && git branch",
          expected: "* main",
        },
      ],
      verify: "Solo queda main. Si hubieras elegido Squash and merge, el último paso habría fallado con the branch is not fully merged: tras comprobar que el pull request está integrado, se resuelve con git branch -D 01-config.",
    },
    {
      type: "playground",
      title: "Experimento 11: ¿sirve mi versión de Node?",
      description: "Next.js pide 20.9.0 o superior. Prueba tu versión añadiéndola a la lista.",
      code: `function cumple(version) {
  const [mayor, menor] = version.replace("v", "").split(".").map(Number);
  return mayor > 20 || (mayor === 20 && menor >= 9);
}
["v18.20.8", "v20.5.1", "v20.9.0", "v21.0.0", "v22.13.1"].forEach((v) => {
  console.log(v + " -> " + (cumple(v) ? "sirve para Next.js 16" : "hace falta actualizar"));
});`,
      expected: "v18.20.8 -> hace falta actualizar\nv20.5.1 -> hace falta actualizar\nv20.9.0 -> sirve para Next.js 16\nv21.0.0 -> sirve para Next.js 16\nv22.13.1 -> sirve para Next.js 16",
    },
    {
      type: "playground",
      title: "Experimento 12: qué instrucciones lee Claude",
      description: "Cuatro situaciones de un repositorio. Cambia los valores y mira cuándo AGENTS.md deja de leerse.",
      code: `function queLee(tieneAgents, tieneClaude, claudeImportaAgents) {
  if (tieneClaude && claudeImportaAgents) return "CLAUDE.md y AGENTS.md";
  if (tieneClaude) return "solo CLAUDE.md";
  if (tieneAgents) return "AGENTS.md";
  return "ninguno";
}
const casos = [
  ["Recién creado con create-next-app", true, false, false],
  ["Después de /init, sin import", true, true, false],
  ["CLAUDE.md que empieza con @AGENTS.md", true, true, true],
  ["Un proyecto sin ningún archivo", false, false, false],
];
casos.forEach(([nombre, a, c, i]) => console.log(nombre + " -> " + queLee(a, c, i)));`,
      expected: "Recién creado con create-next-app -> AGENTS.md\nDespués de /init, sin import -> solo CLAUDE.md\nCLAUDE.md que empieza con @AGENTS.md -> CLAUDE.md y AGENTS.md\nUn proyecto sin ningún archivo -> ninguno",
    },
    {
      type: "playground",
      title: "Experimento 13: las reglas de la rama protegida",
      description: "Un modelo muy simplificado de la regla. Cambia aplicarAAdmins o el número de aprobaciones y mira qué se permite.",
      code: `const regla = { exigirPullRequest: true, aprobaciones: 0, aplicarAAdmins: true };
function resultado(accion, quien, aprobaciones) {
  if (accion === "push directo a main") {
    if (!regla.exigirPullRequest) return "permitido";
    if (quien === "admin" && !regla.aplicarAAdmins) return "permitido (el admin se salta la regla)";
    return "rechazado: la rama está protegida";
  }
  if (accion === "merge de un pull request") {
    return aprobaciones >= regla.aprobaciones ? "permitido" : "bloqueado: faltan aprobaciones";
  }
  return "no definido";
}
const casos = [
  ["push directo a main", "colaborador", 0],
  ["push directo a main", "admin", 0],
  ["merge de un pull request", "admin", 0],
];
casos.forEach(([accion, quien, n]) => console.log(quien + ": " + accion + " -> " + resultado(accion, quien, n)));
regla.aplicarAAdmins = false;
console.log("Sin 'no permitir saltarse las reglas':");
console.log("admin: push directo a main -> " + resultado("push directo a main", "admin", 0));
regla.aplicarAAdmins = true;
regla.aprobaciones = 1;
console.log("Con una aprobación exigida:");
console.log("colaborador: merge sin aprobar -> " + resultado("merge de un pull request", "colaborador", 0));
console.log("colaborador: merge con una aprobación -> " + resultado("merge de un pull request", "colaborador", 1));`,
      expected: "colaborador: push directo a main -> rechazado: la rama está protegida\nadmin: push directo a main -> rechazado: la rama está protegida\nadmin: merge de un pull request -> permitido\nSin 'no permitir saltarse las reglas':\nadmin: push directo a main -> permitido (el admin se salta la regla)\nCon una aprobación exigida:\ncolaborador: merge sin aprobar -> bloqueado: faltan aprobaciones\ncolaborador: merge con una aprobación -> permitido",
    },
    {
      type: "playground",
      title: "Experimento 14: cuándo funciona git branch -d",
      description: "El tipo de merge decide si Git ve la rama como integrada. Añade casos o cambia los valores.",
      code: `function borrar(cuando) {
  const { tipoMerge, ramaRemotaExiste } = cuando;
  const enMain = tipoMerge === "merge commit";
  if (enMain) return "Deleted branch";
  if (ramaRemotaExiste) return "Deleted branch, con aviso: aún no está en HEAD";
  return "error: the branch is not fully merged";
}
const casos = [
  { tipoMerge: "merge commit", ramaRemotaExiste: false },
  { tipoMerge: "squash", ramaRemotaExiste: false },
  { tipoMerge: "squash", ramaRemotaExiste: true },
  { tipoMerge: "rebase", ramaRemotaExiste: false },
];
casos.forEach((c) => {
  const remota = c.ramaRemotaExiste ? "rama remota existe" : "rama remota borrada";
  console.log(c.tipoMerge + ", " + remota + " -> " + borrar(c));
});`,
      expected: "merge commit, rama remota borrada -> Deleted branch\nsquash, rama remota borrada -> error: the branch is not fully merged\nsquash, rama remota existe -> Deleted branch, con aviso: aún no está en HEAD\nrebase, rama remota borrada -> error: the branch is not fully merged",
    },
    { type: "heading", level: 2, text: "¿Qué usar en cada caso?" },
    {
      type: "table",
      headers: ["Si necesitas...", "Usa...", "Nota"],
      rows: [
        ["Empezar un proyecto Next.js", "create-next-app con los valores recomendados", "Node 20.9 o superior."],
        ["Que Claude conozca la pila y los comandos", "Un CLAUDE.md corto, creado con /init y revisado", "Menos de unas 200 líneas."],
        ["Mantener las instrucciones de AGENTS.md", "@AGENTS.md en la primera línea de CLAUDE.md", "Compruébalo con /context all."],
        ["Que Claude consulte un archivo grande a veces", "La ruta en texto normal", "Con @ se carga siempre."],
        ["Los skills del flujo con specs en un proyecto nuevo", "Copiarlos a .claude/skills/", "Viajan con el repositorio."],
        ["Llevar scripts de otro proyecto", "Comprobar lint y build antes del primer commit", "O ignorar la carpeta en ESLint."],
        ["Que main no se pueda tocar", "Una regla de protección con la casilla de no saltarse las reglas", "Los administradores quedan exentos por defecto."],
        ["Borrar una rama tras un pull request", "git branch -d, y -D si fue squash o rebase", "Mira antes que el pull request está integrado."],
        ["Reglas más flexibles", "Rulesets de GitHub", "Pueden combinarse varias a la vez."],
      ],
    },
    { type: "heading", level: 2, text: "Datos que suelen aparecer desactualizados" },
    {
      type: "table",
      headers: ["Suele decirse", "Información verificada (noviembre 2026)"],
      rows: [
        ["create-next-app crea un CLAUDE.md y un AGENTS.md.", "Hoy solo crea AGENTS.md. El CLAUDE.md lo crea /init."],
        ["Tras /init, Claude sigue leyendo AGENTS.md.", "No: con un CLAUDE.md en el proyecto, solo lee ese. Hay que importarlo con @AGENTS.md."],
        ["Hay que responder preguntas una a una al crear el proyecto.", "Con --yes se aceptan los valores recomendados."],
        ["Next.js necesita PostCSS para Tailwind.", "La plantilla actual no trae postcss.config. Tailwind se carga con un cargador de Turbopack en next.config.ts."],
        ["Cualquier Node reciente sirve.", "Next.js pide Node 20.9.0 o superior."],
        ["Los comentarios de agentes son una opción oculta.", "Aparecen entre los valores recomendados y pueden desactivarse con --no-agent-feedback."],
        ["Las ramas protegidas funcionan en cualquier repositorio.", "En repositorios privados hacen falta GitHub Pro, Team o Enterprise. En los públicos sirve el plan gratuito."],
        ["Las reglas de protección valen también para quien administra.", "No por defecto: hay que activar Do not allow bypassing the above settings."],
        ["Tras un pull request, git branch -d siempre funciona.", "Solo con un merge commit. Con squash o rebase, Git se niega y hace falta -D."],
        ["Un servidor MCP carga todas sus herramientas en el contexto.", "Con la búsqueda de herramientas, que es el valor por defecto, al empezar solo se cargan los nombres."],
      ],
    },
    { type: "heading", level: 2, text: "Si algo no funciona" },
    {
      type: "table",
      headers: ["Síntoma", "Causa probable", "Qué hacer"],
      rows: [
        ["create-next-app falla con un error de versión", "Tu Node es anterior a 20.9", "Actualiza Node, por ejemplo con nvm, y repite."],
        ["npm run lint falla por los scripts", "Están en CommonJS y la regla lo prohíbe", "Añade la carpeta scripts a los ignorados de eslint.config.mjs."],
        ["Claude no sigue lo que dice AGENTS.md", "Hay un CLAUDE.md que no lo importa", "Pon @AGENTS.md en su primera línea y mira /context all."],
        ["No aparece /spec", "El skill no está en .claude/skills/spec/SKILL.md", "Revisa la ruta y ejecuta /reload-skills."],
        ["git push a main se rechaza", "La rama está protegida", "Crea una rama, súbela y abre un pull request."],
        ["No puedes activar la protección en un repositorio privado", "El plan gratuito no lo permite", "Hazlo público, o usa un plan de pago."],
        ["El pull request no deja integrar", "Faltan aprobaciones o comprobaciones", "Si trabajas solo, pon las aprobaciones en 0."],
        ["git branch -d dice not fully merged", "Se integró con squash o con rebase", "Comprueba el pull request y usa git branch -D."],
      ],
    },
    { type: "heading", level: 2, text: "Preguntas frecuentes" },
    {
      type: "accordion",
      items: [
        {
          title: "¿Hace falta saber Next.js?",
          text: "No para seguir la lección, porque casi no se toca código a mano. Pero cuanto más sepas, mejores instrucciones darás a Claude y antes verás cuándo se equivoca.",
        },
        {
          title: "¿Puedo usar otro framework?",
          text: "Sí. Los skills y el flujo con specs no dependen de él. Los ejemplos del curso usan Next.js, React y Tailwind, así que seguirlos con otra pila exige que adaptes lo que veas.",
        },
        {
          title: "¿Por qué proteger main si trabajo solo?",
          text: "Por disciplina y por seguridad. Obliga a pasar por una rama, deja una revisión y te protege de un accidente en la rama que, en un proyecto real, despliega. Es una costumbre que se transfiere al trabajo en equipo.",
        },
        {
          title: "¿Y si la protección me estorba?",
          text: "Puedes desactivarla en Settings. Es un ajuste del repositorio, no del proyecto. Pero hacer la prueba una vez enseña lo que es trabajar con una rama principal bloqueada.",
        },
        {
          title: "¿Cuál es mejor, merge commit o squash?",
          text: "Depende del equipo. El merge commit conserva todos los commits de la rama. El squash deja un historial más corto, con un solo commit por pull request, a cambio de perder los intermedios. Para borrar la rama local, el merge commit es más cómodo.",
        },
        {
          title: "¿Debo versionar references/?",
          text: "Sí, si son archivos que forman parte del proyecto, como un brief o plantillas en texto. Si pesan mucho, por ejemplo imágenes grandes, valora no meterlas en Git o usar otro almacenamiento.",
        },
      ],
    },
    { type: "heading", level: 2, text: "Qué sigue" },
    {
      type: "paragraph",
      text: "El Día 21 crea un skill de frontend para que Claude genere interfaces consistentes, y escribe con /spec el spec del MVP de Arcade Vault. Antes de seguir, comprueba que main está protegida, que tu clon local está en main y sin cambios, y que /skills muestra spec y spec-impl.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 21, verifica que puedes explicar...",
      items: [
        "Qué genera create-next-app hoy y por qué no hay un CLAUDE.md.",
        "Por qué un /init hace que AGENTS.md deje de leerse, y cómo lo evita @AGENTS.md.",
        "Por qué hay que comprobar lint y build antes del primer commit.",
        "Cómo se mencionan los archivos de referencia sin cargarlos siempre.",
        "Qué hace cada casilla de la regla de protección y cuál obliga también a los administradores.",
        "Por qué las ramas protegidas dependen del plan en repositorios privados.",
        "El ciclo de una rama, de git switch -c a git branch -d.",
        "Por qué git branch -d falla tras un squash, y cuándo es seguro usar -D.",
      ],
    },
    { type: "heading", level: 2, text: "Fuentes consultadas (noviembre 2026)" },
    {
      type: "list",
      items: [
        "[Next.js: create-next-app, opciones y valores recomendados](https://nextjs.org/docs/app/api-reference/cli/create-next-app)",
        "[Next.js: instalación](https://nextjs.org/docs/app/getting-started/installation)",
        "[Cómo Claude recuerda tu proyecto: AGENTS.md, CLAUDE.md e imports](https://code.claude.com/docs/en/memory)",
        "[Ajustes de Claude Code: settings.local.json](https://code.claude.com/docs/en/settings)",
        "[Claude Code y MCP: búsqueda de herramientas](https://code.claude.com/docs/en/mcp)",
        "[GitHub: acerca de las ramas protegidas](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)",
        "[GitHub: acerca de los rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets)",
        "[GitHub: acerca de la integración de pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/about-pull-request-merges)",
        "[Git: git branch](https://git-scm.com/docs/git-branch)",
        "[Git: git switch](https://git-scm.com/docs/git-switch)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "¿Qué versión mínima de Node pide el Next.js que instala create-next-app hoy?",
      options: ["14", "18.0", "20.9", "Cualquiera"],
      correctIndex: 2,
      explanation: "El paquete de Next.js declara node 20.9.0 o superior. Con una versión anterior, la instalación falla.",
    },
    {
      question: "¿Qué archivos de instrucciones para agentes crea create-next-app?",
      options: [
        "CLAUDE.md y AGENTS.md",
        "Solo AGENTS.md",
        "Solo CLAUDE.md",
        "Ninguno",
      ],
      correctIndex: 1,
      explanation: "Crea AGENTS.md. El CLAUDE.md lo genera /init cuando lo lanzas.",
    },
    {
      question: "Lanzas /init y aparece un CLAUDE.md que no menciona AGENTS.md. ¿Qué ocurre con AGENTS.md?",
      options: [
        "Se lee igual",
        "Deja de leerse por defecto: Claude lee solo CLAUDE.md",
        "Se borra",
        "Se fusiona solo",
      ],
      correctIndex: 1,
      explanation: "Con un CLAUDE.md en el proyecto, Claude lee solo ese. Un @AGENTS.md en su primera línea mantiene las instrucciones.",
    },
    {
      question: "Quieres que Claude consulte references/ solo cuando trabaje en una pantalla. ¿Cómo lo mencionas en CLAUDE.md?",
      options: [
        "Con @references/, para que se cargue",
        "Con la ruta en texto normal, para que la lea cuando la necesite",
        "No se puede",
        "Copiando todos los diseños",
      ],
      correctIndex: 1,
      explanation: "Una ruta en texto se consulta cuando hace falta. Un import con @ carga el archivo al empezar cada sesión.",
    },
    {
      question: "Al copiar tus scripts al proyecto, npm run lint falla. ¿Qué haces?",
      options: [
        "Desactivas ESLint",
        "Añades la carpeta scripts a los ignorados de eslint.config.mjs",
        "Borras los scripts",
        "Reinstalas Next.js",
      ],
      correctIndex: 1,
      explanation: "Los scripts están en CommonJS y la plantilla de TypeScript lo prohíbe. Ignorar la carpeta es lo más sencillo y no toca la aplicación.",
    },
    {
      question: "¿Qué casilla de la regla de protección hace que también los administradores tengan que cumplirla?",
      options: [
        "Require a pull request before merging",
        "Require status checks to pass",
        "Do not allow bypassing the above settings",
        "Require branches to be up to date",
      ],
      correctIndex: 2,
      explanation: "Por defecto, las restricciones no se aplican a quien administra el repositorio. Esa casilla las hace obligatorias para todos.",
    },
    {
      question: "Tienes un repositorio privado y el plan gratuito de GitHub. ¿Qué pasa con la protección de ramas?",
      options: [
        "Funciona igual",
        "No está disponible: hace falta un plan de pago, o un repositorio público",
        "Funciona solo con rulesets",
        "Se activa sola",
      ],
      correctIndex: 1,
      explanation: "Las ramas protegidas están en repositorios públicos con el plan gratuito, y en privados con Pro, Team o Enterprise.",
    },
    {
      question: "Integras un pull request con Squash and merge y ejecutas git branch -d. ¿Qué ocurre?",
      options: [
        "Borra la rama",
        "Da el error the branch is not fully merged, porque los commits de la rama no están en main",
        "Borra main",
        "Pide una contraseña",
      ],
      correctIndex: 1,
      explanation: "El squash crea un commit nuevo. Git no puede demostrar que tu rama está integrada, y se niega.",
    },
    {
      question: "Git rechaza borrar una rama con -d tras un squash. ¿Cuándo es seguro usar -D?",
      options: [
        "Siempre",
        "Cuando has comprobado en GitHub que el pull request figura como integrado",
        "Nunca",
        "Solo con permiso del administrador",
      ],
      correctIndex: 1,
      explanation: "-D borra sin preguntar. Si el pull request está integrado, el trabajo está en main y no se pierde nada.",
    },
    {
      question: "¿Por qué hay que ejecutar lint y build antes del primer commit?",
      options: [
        "Por costumbre",
        "Para dejar una línea base en verde, y que cualquier fallo posterior sea de un cambio concreto",
        "Porque GitHub lo exige",
        "Para ahorrar tokens",
      ],
      correctIndex: 1,
      explanation: "Si el proyecto ya falla antes de empezar, luego no sabrás si el error es tuyo o heredado.",
    },
  ],
};
