import type { Lesson } from "@/lib/types";
// Día 21 · Clases 77 y 78 de la transcripción.
// Contenido verificado en noviembre de 2026.
export const day21: Lesson = {
  day: 21,
  slug: "frontend-skill-estilos-globales-y-spec-del-mvp",
  title: "Frontend skill, estilos globales y el spec del MVP",
  section: "Skills y Playwright MCP",
  estimatedMinutes: 85,
  icon: "🎨",
  objectives: [
    "Repartir las instrucciones entre CLAUDE.md, reglas por ruta, skills y referencias, según cuándo deben llegar a Claude.",
    "Instalar un skill de diseño de forma segura: qué mirar antes de confiar en él, y por qué la popularidad no lo garantiza.",
    "Llevar los estilos de unas plantillas HTML a globals.css de Next.js con Tailwind, y reconocer el fallo silencioso que ocurre si falta el import.",
    "Escribir el spec del MVP en una rama propia, porque main está protegida, y dejar que spec-impl la reutilice.",
    "Leer la correspondencia entre las pantallas de las plantillas y las rutas del App Router de Next.js.",
  ],
  blocks: [
    {
      type: "paragraph",
      text: "El proyecto Arcade Vault ya existe, tiene sus skills de specs y su rama principal protegida. Antes de implementar nada hay que decidir tres cosas que parecen menores y no lo son: dónde vive cada instrucción para Claude, de dónde sale el aspecto de las pantallas y cómo llega el spec a un repositorio en el que no se puede escribir en main. Esta lección resuelve las tres, deja los estilos listos en globals.css y termina con el spec 001 aprobado. La implementación es la lección siguiente.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "4", label: "Lugares donde viven las instrucciones: CLAUDE.md, reglas, skills y referencias" },
        { value: "6", label: "Pantallas con plantilla y con ruta propia" },
        { value: "103", label: "Líneas aproximadas de globals.css tras traer los estilos" },
        { value: "8,1 KB", label: "Tamaño del CSS cuando falta el import de Tailwind, frente a unos 18,9 KB" },
        { value: "0", label: "Avisos de error en el build cuando falta ese import, aunque el CSS salga roto" },
        { value: "2", label: "Commits del spec: borrador y aprobado" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text: "Contenido verificado en noviembre de 2026. Con un proyecto creado con create-next-app y un remoto local que hace de GitHub, ejecuté los comandos de Git, lint y build, el validador del spec y la comprobación del import de Tailwind, y las salidas de los ejercicios son las reales. No pude probar Claude Code ni la interfaz de GitHub en esta máquina: los pasos con comandos de Claude (en los ejercicios 2, 6, 8 y 9) y los de GitHub (el ejercicio 7) son orientativos. Las versiones y los mensajes cambian con el tiempo.",
    },
    { type: "heading", level: 2, text: "Cada instrucción, en su sitio" },
    {
      type: "paragraph",
      text: "Cuando un proyecto crece, la tentación es meter todo en CLAUDE.md. El archivo se llena, Claude lo lee entero en cada sesión y las instrucciones que importan quedan diluidas entre las que no. La pregunta útil es cuándo necesita Claude saber algo, y de ahí sale el lugar.",
    },
    {
      type: "image",
      src: "/img/dia-21/donde-vive-cada-instruccion.svg",
      alt: "Cuatro filas. CLAUDE.md llega en cada sesión y sirve para lo que vale siempre, y debe ser corto. La carpeta .claude/rules llega al tocar un archivo que encaja con la ruta indicada en paths, y sirve para reglas que solo importan en una parte del código. El skill frontend-design muestra su descripción siempre y su cuerpo al usarlo, y sirve como método de trabajo para diseñar interfaces. La carpeta references llega cuando Claude lee un archivo porque lo necesita, y guarda los diseños de las pantallas. Debajo, la frase: cuanto más específica es una instrucción, más lejos del CLAUDE.md debe vivir.",
      caption: "Cuanto más específica es una instrucción, más lejos del CLAUDE.md debe vivir.",
    },
    {
      type: "paragraph",
      text: "El CLAUDE.md del proyecto se queda corto. Conserva la importación de AGENTS.md de la lección anterior, la pila, la forma de trabajar y una regla de idioma. Los comandos para ejecutar el proyecto ya están en el README, así que se quitan de aquí: Claude puede leerlo si los necesita, y los humanos lo leen de todos modos. La única instrucción de comandos que se queda es la que debe cumplirse siempre: lint y build antes de dar un cambio por bueno.",
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
- Node 20.9 o superior. Los comandos para ejecutarlo están en README.md.

## Cómo trabajamos
- Cada funcionalidad empieza con un spec en specs/: /spec para escribirlo y /spec-impl para implementarlo.
- Los diseños de referencia están en references/. Se consultan al trabajar en una pantalla.
- Nunca se trabaja en main: cada cambio va en una rama y llega por pull request.
- Antes de dar un cambio por bueno, deben pasar npm run lint y npm run build.

## Reglas
- Responde siempre en español.
- Las reglas de interfaz están en .claude/rules/interfaz.md y se cargan al tocar archivos de app/.`,
    },
    {
      type: "paragraph",
      text: "Las reglas de interfaz, que solo importan cuando se toca la interfaz, van a su propio archivo en .claude/rules/. Un archivo de reglas con un bloque paths en la cabecera se carga cuando Claude lee o edita un archivo que coincide con alguno de los patrones. En una sesión en la que solo toques scripts o el README, esas reglas ni se cargan.",
    },
    {
      type: "code",
      lang: "markdown",
      title: ".claude/rules/interfaz.md",
      code: `---
paths:
  - "app/**/*.tsx"
  - "app/**/*.css"
  - "components/**/*.tsx"
---
# Reglas de interfaz

- Sigue references/design-brief.md y las plantillas de references/templates/. Si el brief fija una decisión, esa decisión gana a cualquier gusto propio.
- Para crear o rehacer pantallas, usa el skill frontend-design.
- Los estilos de los componentes viven en app/globals.css, con las mismas clases y variables que styles.css. Tailwind se usa solo para el diseño: filas, columnas, cuadrículas y espacios.
- Sin fuentes ni imágenes de servidores externos: solo fuentes del sistema.
- Los datos de muestra viven en app/data/. Ninguna pantalla los escribe a mano.
- Cada pantalla debe verse bien en móvil y en escritorio, con foco visible con el teclado y con animaciones que respeten prefers-reduced-motion.`,
    },
    {
      type: "paragraph",
      text: "Fíjate en los patrones. Las carpetas dinámicas de Next.js llevan corchetes, como app/juegos/[id]/page.tsx. Los corchetes tienen significado propio en un patrón glob, así que en lugar de escribir esa ruta se usa `app/**/*.tsx`, que las cubre todas sin ambigüedad. El experimento 11 reproduce la coincidencia con un modelo simplificado para que lo veas con tus propios archivos.",
    },
    {
      type: "callout",
      variant: "info",
      text: "Dentro de un skill hay otra carga repartida: la descripción se mantiene siempre visible para que Claude sepa que el skill existe, y el cuerpo solo se carga cuando se invoca. Por eso un skill largo no pesa en cada sesión, y una descripción vaga hace que Claude no lo use cuando debería.",
    },
    { type: "heading", level: 2, text: "Un skill de diseño: el plugin oficial y cómo comprobarlo" },
    {
      type: "paragraph",
      text: "Los modelos tienden a producir interfaces genéricas: las mismas tarjetas redondeadas, los mismos degradados, la misma tipografía. Un skill de diseño intenta empujar en la otra dirección dando a Claude un método: primero un plan con paleta, tipografía y estructura, luego una revisión del plan frente al encargo, y después el código. Anthropic publica uno, el plugin frontend-design, en su marketplace oficial.",
    },
    {
      type: "code",
      lang: "text",
      title: "Dentro de Claude Code",
      code: `/plugin install frontend-design@claude-plugins-official`,
    },
    {
      type: "paragraph",
      text: "En una sesión, ese comando no instala de inmediato. Abre el panel del plugin con su descripción, para que lo revises y elijas el alcance: para ti en todos los proyectos, para todos los colaboradores del repositorio, o solo para ti en este repositorio. Una vez instalado, sus skills aparecen en la lista que se abre al escribir una barra, con el nombre del plugin como prefijo. El de este plugin se invoca como /frontend-design:frontend-design.",
    },
    {
      type: "paragraph",
      text: "Hay muchos skills de terceros con miles de descargas y estrellas. Ese número mide popularidad, no seguridad: un skill es texto que Claude obedece, y puede llevar herramientas permitidas, scripts y hooks que se ejecutan en tu máquina. Antes de instalar cualquiera, sea del origen que sea, haz esta revisión.",
    },
    {
      type: "table",
      headers: ["Qué mirar", "Por qué", "Qué hacer"],
      rows: [
        ["Quién lo publica", "Un plugin del marketplace oficial pasa por un origen conocido. Uno de un repositorio cualquiera, no.", "Prefiere el origen oficial, y si no existe, lee más."],
        ["El archivo SKILL.md", "Es lo que Claude va a obedecer. Puede pedir cosas que no esperas.", "Léelo entero. Si no lo entiendes, no lo instales."],
        ["allowed-tools en la cabecera", "Lista herramientas que se usan sin pedir permiso.", "Desconfía si incluye ejecutar comandos o escribir sin necesidad."],
        ["Scripts, hooks y servidores MCP", "Se ejecutan fuera de la conversación, con tus permisos.", "Si el plugin los trae, el panel de detalles los lista: revísalos."],
        ["Coste en contexto", "Para los plugins oficiales, el panel muestra una estimación por turno y otra al invocarlos.", "Compara antes de instalar varios."],
      ],
    },
    {
      type: "paragraph",
      text: "Puedes hacer esa revisión de este plugin en pocos minutos. Su repositorio contiene una licencia, un README, el manifiesto y un único skill, sin scripts ni hooks, y el SKILL.md no declara herramientas permitidas. Ese es el aspecto de algo que se puede instalar con tranquilidad. Si en algún otro hubiera un script o un hook, te corresponde leerlo antes de aceptar.",
    },
    {
      type: "paragraph",
      text: "Lo más importante de leer en su SKILL.md es una frase: donde el encargo fija una dirección visual, el skill la sigue exactamente, porque las palabras del encargo siempre ganan. Eso encaja con el brief de diseño del proyecto, que ya fija colores, tipografía y pantallas. El skill sirve para lo que el brief deja libre, y no para contradecirlo. Además, recomienda revisar su propio trabajo con capturas de pantalla, y eso es lo que habilita el servidor MCP de Playwright de la próxima lección.",
    },
    { type: "heading", level: 2, text: "Plantillas de referencia" },
    {
      type: "paragraph",
      text: "Antes de que Next.js pinte nada, el aspecto se decide en seis páginas HTML estáticas con una hoja de estilos compartida, guardadas en references/templates. Se pueden obtener con una herramienta de diseño o pidiéndoselas a Claude con el skill de diseño, y se abren en el navegador sin servidor. Tienen una ventaja clara: son más baratas de iterar que una aplicación, y fijan lo que debe verse antes de escribir componentes. Las que se usan aquí las escribí a mano para la lección, con una estética de sala recreativa: fondo oscuro, rosa, cian y amarillo de neón, líneas de barrido, fuentes del sistema y animaciones que respetan prefers-reduced-motion.",
    },
    {
      type: "image",
      src: "/img/dia-21/rutas-del-mvp.svg",
      alt: "Tabla de seis filas con tres columnas: la ruta de Next.js, el archivo del proyecto y la plantilla. La ruta barra corresponde a app/page.tsx y a index.html. La ruta barra juegos barra id, a app/juegos/[id]/page.tsx y a previsualizacion.html. La ruta barra juegos barra id barra jugar, a app/juegos/[id]/jugar/page.tsx y a jugar.html. La ruta barra salon-de-la-fama, a app/salon-de-la-fama/page.tsx y a salon-de-la-fama.html. La ruta barra iniciar-sesion, a app/iniciar-sesion/page.tsx y a iniciar-sesion.html. La ruta barra crear-cuenta, a app/crear-cuenta/page.tsx y a crear-cuenta.html. Debajo, una nota: los datos de los juegos y de los puntajes viven en app/data, y un id desconocido responde 404.",
      caption: "Qué ruta sirve cada plantilla.",
    },
    {
      type: "paragraph",
      text: "La correspondencia es directa porque el App Router de Next.js convierte las carpetas de app/ en rutas. Una carpeta entre corchetes, como [id], es un segmento dinámico: la misma página sirve a todos los juegos y recibe el id en sus parámetros. El experimento 13 reproduce ese reparto con un modelo pequeño, incluido el caso de un juego que no existe.",
    },
    { type: "heading", level: 2, text: "Llevar los estilos a globals.css" },
    {
      type: "paragraph",
      text: "Los estilos de las plantillas están en un archivo de CSS corriente. La aplicación de Next.js tiene el suyo, app/globals.css, que hoy empieza con la importación de Tailwind y unas variables de la plantilla de Next.js. La decisión del proyecto es que el aspecto lo definan las clases de la plantilla, con las mismas variables, y que Tailwind se use solo para el diseño: filas, columnas, cuadrículas y espacios. Así el resultado es idéntico a las referencias y no hay dos sistemas de estilo peleando por el mismo elemento.",
    },
    {
      type: "image",
      src: "/img/dia-21/de-plantilla-a-globals.svg",
      alt: "A la izquierda, el archivo references/templates/styles.css, con variables, clases y animaciones en 92 líneas. Una flecha lleva a app/globals.css, que empieza con la importación de tailwindcss, sigue con un bloque theme inline que enlaza variables de color con las de la plantilla y continúa con el contenido de styles.css, unas 103 líneas en total. Debajo, dos resultados. Con el import de Tailwind, la compilación termina sin avisos, el CSS generado pesa unos 18,9 kilobytes y existen las clases flex, grid y gap. Sin el import, la compilación termina pero avisa de que la regla theme es desconocida, el CSS pesa unos 8,1 kilobytes y no hay utilidades de Tailwind, un fallo silencioso.",
      caption: "El import de Tailwind debe seguir en la primera línea de globals.css.",
    },
    {
      type: "paragraph",
      text: "El bloque @theme inline es la pieza que conecta ambos mundos. Declara colores de Tailwind, como --color-rosa, que apuntan a las variables de la plantilla, como --rosa. Con eso se puede escribir una clase de Tailwind que usa un color de la plantilla, sin duplicar los valores. Cuenta con una trampa, que es la parte más fácil de pasar por alto de esta lección.",
    },
    {
      type: "callout",
      variant: "warning",
      text: "Si borras o sobrescribes la primera línea, @import \"tailwindcss\";, el build termina con código de salida 0. Solo avisa de que no reconoce la regla @theme, y genera un CSS de 8,1 KB sin una sola utilidad de Tailwind, como flex o grid. El error no rompe nada visible en el terminal: se ve en la página, con el diseño desmontado. Compruébalo en el ejercicio 5, y lee siempre el aviso del build cuando toques ese archivo.",
    },
    {
      type: "paragraph",
      text: "Fíjate también en qué ocurre con la página de inicio al terminar este paso. Sigue siendo la de bienvenida de Next.js, pero ahora con los estilos globales de la plantilla encima: encabezados en cian con letra monoespaciada, líneas de barrido y un panel claro. Se ve mezclada, y es lo esperado. Las pantallas se reescriben en la siguiente lección, y este paso solo prepara los estilos.",
    },
    {
      type: "paragraph",
      text: "Sobre las fuentes: la plantilla de Next.js usa las de Geist a través de next/font. Según la documentación, next/font descarga los archivos de fuente durante el build y los sirve desde tu propio dominio, sin que el navegador haga peticiones a Google. Aun así, este proyecto usa las fuentes del sistema, porque son las de las plantillas y así el texto se ve como en las referencias. El spec lo recoge entre sus decisiones, y una regla lo repite: sin fuentes ni imágenes de servidores externos.",
    },
    { type: "heading", level: 2, text: "El spec del MVP, en su propia rama" },
    {
      type: "paragraph",
      text: "Con las plantillas y los estilos listos, toca el spec 001, el que describe todo el MVP. Aquí aparece un problema práctico que el flujo de los días anteriores no tenía. El skill /spec escribe el archivo en specs/ y no toca nada más, pero main está protegida: no puedes dejar un spec sin guardar ahí, ni hacer commit directo. Y /spec-impl, tal como lo escribimos, crea la rama de trabajo por su cuenta, así que el spec quedaría en una rama distinta de la de su implementación.",
    },
    {
      type: "image",
      src: "/img/dia-21/rama-del-spec.svg",
      alt: "Un recuadro superior dice que main solo recibe pull requests y que no se puede dejar ahí un spec sin guardar ni hacer commits directos. Debajo, cuatro pasos. Uno, la rama: git switch -c spec/001-mvp-arcade-vault. Dos, el skill spec entrevista y escribe specs/001 en borrador, y se hace un commit. Tres, tú apruebas: lees, validas y cambias el estado a aprobado, con otro commit. Cuatro, spec-impl, en la próxima lección, ve que ya estás en la rama y la usa. Abajo, un recuadro: un solo pull request lleva el spec y su implementación, y quien revisa lee primero el spec y después comprueba que el código lo cumple. Otro recuadro explica el cambio en spec-impl: antes siempre creaba la rama, y ahora la reutiliza si ya estás en spec/ con el nombre del archivo.",
      caption: "Con main protegida, el spec también va en una rama.",
    },
    {
      type: "paragraph",
      text: "La solución es crear la rama del spec antes de lanzar /spec, y hacer que /spec-impl la reutilice. El cambio es de una sola línea en el skill. En el paso 3 de spec-impl, en lugar de crear siempre la rama, comprueba si ya estás en la rama spec/ con el nombre del archivo, y solo la crea si no es así. La ventaja es que el spec y su implementación llegan juntos en un único pull request, y quien lo revisa lee el spec primero y después comprueba que el código lo cumple.",
    },
    {
      type: "comparison",
      lang: "markdown",
      before: {
        title: "Paso 3 de spec-impl antes",
        code: `3. Crea la rama spec/<nombre del archivo sin .md> con git switch -c.`,
      },
      after: {
        title: "Paso 3 de spec-impl después",
        code: `3. Si ya estás en la rama spec/<nombre del archivo sin .md>, úsala. Si no, créala con git switch -c.`,
      },
    },
    {
      type: "paragraph",
      text: "Hay un detalle más del skill que conviene recordar: /spec tiene desactivada la invocación por el modelo y solo puede leer, buscar archivos y listar. No puede escribir código ni tocar nada fuera de specs/. El cambio de estado de borrador a aprobado lo haces tú, a mano, tras leer el spec y pasar el validador. Es el punto de control que impide que Claude implemente un spec que nadie ha aprobado.",
    },
    {
      type: "paragraph",
      text: "Durante la entrevista, Claude te hace preguntas cortas, con opciones y una recomendación. Estas son las decisiones que tomó este proyecto, y que acabaron en el spec. Mira cómo cada una trae su motivo: es lo que permite a quien lea el spec dentro de seis meses entender por qué es así.",
    },
    {
      type: "table",
      headers: ["Decisión", "Elegida", "Motivo"],
      rows: [
        ["Rutas", "Una ruta real por pantalla", "Cada pantalla tiene su dirección y se puede enlazar, a diferencia de una sola página con navegación interna."],
        ["Estilos", "Los de la plantilla en globals.css, y Tailwind solo para el diseño", "Mantiene el aspecto idéntico a las referencias."],
        ["Datos", "Constantes de TypeScript en app/data", "Más adelante vendrán de una base de datos, y las pantallas no cambiarán."],
        ["Pantalla de jugar", "Una arena de muestra animada", "El MVP no incluye juegos reales."],
        ["Fuentes", "Las del sistema", "Son las de las plantillas y no dependen de servidores externos."],
        ["Inclinación 3D de las tarjetas", "Descartada", "Exige JavaScript y no aporta al MVP."],
        ["Autenticación", "Descartada", "Se hará en otro spec: los formularios no envían nada."],
      ],
    },
    { type: "heading", level: 2, text: "Ejercicios guiados y experimentos" },
    {
      type: "paragraph",
      text: "Los ejercicios 1, 3, 4, 5, 6 y 9 se ejecutan con Git, Node y el validador, y sus salidas son reales. En el 7, los comandos de Git son reales y los pasos de GitHub son orientativos. Los pasos con comandos de Claude Code, en los ejercicios 2, 6, 8 y 9, y las acciones en GitHub, dependen de tu cuenta y del modelo. Los experimentos del final se ejecutan en el navegador.",
    },
    {
      type: "exercise",
      title: "Ejercicio 1: partir de main limpio",
      description: "Todo el trabajo de hoy ocurre en ramas. Empieza con main al día.",
      steps: [
        {
          instruction: "Entra en el proyecto de la lección anterior, ve a main, trae los cambios y comprueba que no hay nada pendiente.",
          command: "cd ~/ClaudeCode/06-arcade-vault && git switch -q main && git pull -q && git status -sb | head -1",
          expected: "## main...origin/main",
        },
      ],
      verify: "La línea muestra main al día con origin/main, sin la palabra ahead ni behind. Si aparecen cambios sin guardar, resuélvelos antes de seguir.",
    },
    {
      type: "exercise",
      title: "Ejercicio 2: instalar el plugin de diseño",
      description: "Con la revisión de seguridad de la tabla.",
      steps: [
        {
          instruction: "Abre Claude Code en el proyecto e inicia la instalación. Se abre el panel del plugin.",
          command: "claude\n/plugin install frontend-design@claude-plugins-official",
          expected: "Un panel con la descripción del plugin, la lista de lo que añade (un skill, sin hooks ni servidores) y una estimación del coste en contexto.",
        },
        {
          instruction: "Lee el panel con la tabla de la lección delante. Elige el alcance que prefieras: para ti, o para ti solo en este repositorio.",
          command: "Install for you, in this repo only",
          expected: "Un resumen de instalación. Su última frase indica si el plugin ya está activo o si hace falta recargar.",
        },
        {
          instruction: "Comprueba que el skill aparece y pregúntale cómo se llevaría con el brief del proyecto.",
          command: "/frontend-design:frontend-design ¿Qué haces si el brief ya fija colores y tipografía?",
          expected: "Claude explica que sigue el brief al pie de la letra en lo que fija, y usa el skill para lo que deja libre, como la composición o los detalles. Puede proponer un plan antes de escribir código.",
        },
      ],
      verify: "El skill aparece con el prefijo del plugin. Si no, ejecuta /reload-plugins, o mira la pestaña Errors en /plugin.",
    },
    {
      type: "exercise",
      title: "Ejercicio 3: la rama y las plantillas",
      description: "Guarda las seis pantallas de referencia y su hoja de estilos.",
      steps: [
        {
          instruction: "Crea la rama de esta lección.",
          command: "git switch -c 01-estilos",
          expected: "Switched to a new branch '01-estilos'",
        },
        {
          instruction: "Guarda la hoja de estilos compartida.",
          file: { name: "references/templates/styles.css", code: `:root {
  --fondo: #0b0d1a;
  --panel: #151933;
  --texto: #e8ecff;
  --texto-suave: #a9b0d6;
  --rosa: #ff3d81;
  --cian: #29f0ff;
  --amarillo: #ffd166;
  --borde: rgba(232, 236, 255, 0.18);
  --fuente-titulo: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
  --fuente-texto: system-ui, -apple-system, "Segoe UI", sans-serif;
}
* { box-sizing: border-box; }
body {
  margin: 0;
  min-height: 100vh;
  background: var(--fondo);
  color: var(--texto);
  font-family: var(--fuente-texto);
  line-height: 1.5;
}
body::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  background: repeating-linear-gradient(to bottom, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0) 2px, rgba(0, 0, 0, 0.18) 3px);
}
a { color: inherit; text-decoration: none; }
a:focus-visible, button:focus-visible, input:focus-visible { outline: 2px solid var(--cian); outline-offset: 2px; }
.cabecera {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  background: var(--panel);
  border-bottom: 1px solid var(--borde);
}
.logo { font-family: var(--fuente-titulo); font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--rosa); text-shadow: 0 0 12px rgba(255, 61, 129, 0.6); }
.nav { display: flex; gap: 20px; }
.nav a { color: var(--texto-suave); }
.nav a:hover, .nav a[aria-current="page"] { color: var(--cian); }
.contenedor { max-width: 1040px; margin: 0 auto; padding: 32px; }
h1, h2 { font-family: var(--fuente-titulo); text-transform: uppercase; letter-spacing: 0.12em; margin: 0 0 8px; }
h1 { font-size: 1.8rem; color: var(--cian); }
.subtitulo { color: var(--texto-suave); margin: 0 0 24px; }
.cuadricula { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
.tarjeta { background: var(--panel); border: 1px solid var(--borde); border-radius: 10px; padding: 16px; transition: border-color 0.2s, box-shadow 0.2s; }
.tarjeta:hover { border-color: var(--cian); box-shadow: 0 0 18px rgba(41, 240, 255, 0.35); }
.arte { height: 120px; border-radius: 6px; margin-bottom: 12px; background: linear-gradient(135deg, var(--rosa), var(--cian)); opacity: 0.85; }
.arte--grande { height: 260px; margin-bottom: 0; }
.etiqueta { display: inline-block; padding: 2px 8px; border: 1px solid var(--amarillo); color: var(--amarillo); border-radius: 4px; font-size: 0.8rem; }
.puntaje { color: var(--amarillo); font-family: var(--fuente-titulo); }
.boton { display: inline-block; padding: 10px 20px; border: 1px solid var(--rosa); border-radius: 6px; background: var(--rosa); color: #fff; font: inherit; font-weight: 700; cursor: pointer; transition: box-shadow 0.2s; }
.boton:hover { box-shadow: 0 0 14px rgba(255, 61, 129, 0.7); }
.boton--sec { background: transparent; border-color: var(--cian); color: var(--cian); }
.boton--sec:hover { box-shadow: 0 0 14px rgba(41, 240, 255, 0.6); }
.preview { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
.controles { color: var(--texto-suave); padding-left: 20px; }
.acciones { display: flex; gap: 12px; margin-top: 24px; }
.hud { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.arena { position: relative; height: 380px; overflow: hidden; border: 1px dashed var(--cian); border-radius: 10px; background: var(--panel); }
.enemigo { position: absolute; width: 28px; height: 28px; background: var(--rosa); border-radius: 4px; animation: patrulla 6s linear infinite alternate; }
.enemigo:nth-child(2) { top: 90px; background: var(--amarillo); animation-duration: 4.5s; }
.enemigo:nth-child(3) { top: 150px; background: var(--cian); animation-duration: 7.5s; }
.jugador { position: absolute; bottom: 16px; left: 50%; width: 48px; height: 16px; border-radius: 4px; background: var(--texto); }
@keyframes patrulla { from { left: 8px; } to { left: calc(100% - 36px); } }
.aviso { text-align: center; color: var(--texto-suave); margin-top: 12px; }
.tabs { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
.tab { padding: 6px 14px; border: 1px solid var(--borde); border-radius: 6px; color: var(--texto-suave); }
.tab[aria-selected="true"] { border-color: var(--rosa); color: var(--rosa); }
.tabla { width: 100%; border-collapse: collapse; }
.tabla th, .tabla td { padding: 10px 12px; text-align: left; border-bottom: 1px solid var(--borde); }
.tabla th { color: var(--texto-suave); font-weight: 600; }
.tabla th:last-child, .tabla td:last-child { text-align: right; }
.formulario { max-width: 380px; margin: 0 auto; display: grid; gap: 14px; }
.campo { display: grid; gap: 6px; }
.campo input { padding: 10px 12px; border: 1px solid var(--borde); border-radius: 6px; background: var(--panel); color: var(--texto); font: inherit; }
.separador { text-align: center; color: var(--texto-suave); }
.social { display: grid; gap: 10px; }
.social .boton { text-align: center; }
@media (max-width: 720px) {
  .cabecera { padding: 12px 16px; }
  .contenedor { padding: 20px 16px; }
  .preview { grid-template-columns: 1fr; }
}
@media (prefers-reduced-motion: reduce) {
  .enemigo { animation: none; }
  .tarjeta, .boton { transition: none; }
}` },
        },
        {
          instruction: "Guarda la pantalla de inicio.",
          file: { name: "references/templates/index.html", code: `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Elige tu juego · Arcade Vault</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="cabecera">
    <a class="logo" href="index.html">Arcade Vault</a>
    <nav class="nav" aria-label="Principal">
      <a href="index.html" aria-current="page">Juegos</a>
      <a href="salon-de-la-fama.html">Salón de la fama</a>
      <a href="iniciar-sesion.html">Iniciar sesión</a>
    </nav>
  </header>
  <main class="contenedor">
    <h1>Elige tu juego</h1>
    <p class="subtitulo">Seis juegos de muestra. Cada uno guarda su mejor puntaje.</p>
    <section class="cuadricula" aria-label="Juegos">
      <article class="tarjeta">
        <div class="arte" role="img" aria-label="Imagen de Rompe Bloques"></div>
        <h2>Rompe Bloques</h2>
        <span class="etiqueta">Acción</span>
        <p>Mejor puntaje: <span class="puntaje">12.450</span> por ANA</p>
        <a class="boton boton--sec" href="previsualizacion.html">Ver juego</a>
      </article>
      <article class="tarjeta">
        <div class="arte" role="img" aria-label="Imagen de Culebra"></div>
        <h2>Culebra</h2>
        <span class="etiqueta">Clásico</span>
        <p>Mejor puntaje: <span class="puntaje">9.870</span> por LUIS</p>
        <a class="boton boton--sec" href="previsualizacion.html">Ver juego</a>
      </article>
      <article class="tarjeta">
        <div class="arte" role="img" aria-label="Imagen de Defensor"></div>
        <h2>Defensor</h2>
        <span class="etiqueta">Disparos</span>
        <p>Mejor puntaje: <span class="puntaje">15.300</span> por MARTA</p>
        <a class="boton boton--sec" href="previsualizacion.html">Ver juego</a>
      </article>
      <article class="tarjeta">
        <div class="arte" role="img" aria-label="Imagen de Laberinto"></div>
        <h2>Laberinto</h2>
        <span class="etiqueta">Puzzle</span>
        <p>Mejor puntaje: <span class="puntaje">7.420</span> por PEDRO</p>
        <a class="boton boton--sec" href="previsualizacion.html">Ver juego</a>
      </article>
      <article class="tarjeta">
        <div class="arte" role="img" aria-label="Imagen de Saltarín"></div>
        <h2>Saltarín</h2>
        <span class="etiqueta">Plataformas</span>
        <p>Mejor puntaje: <span class="puntaje">11.080</span> por SOFÍA</p>
        <a class="boton boton--sec" href="previsualizacion.html">Ver juego</a>
      </article>
      <article class="tarjeta">
        <div class="arte" role="img" aria-label="Imagen de Memoria"></div>
        <h2>Memoria</h2>
        <span class="etiqueta">Puzzle</span>
        <p>Mejor puntaje: <span class="puntaje">5.960</span> por JUAN</p>
        <a class="boton boton--sec" href="previsualizacion.html">Ver juego</a>
      </article>
    </section>
  </main>
</body>
</html>` },
        },
        {
          instruction: "Guarda la previsualización de un juego.",
          file: { name: "references/templates/previsualizacion.html", code: `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Rompe Bloques · Arcade Vault</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="cabecera">
    <a class="logo" href="index.html">Arcade Vault</a>
    <nav class="nav" aria-label="Principal">
      <a href="index.html">Juegos</a>
      <a href="salon-de-la-fama.html">Salón de la fama</a>
      <a href="iniciar-sesion.html">Iniciar sesión</a>
    </nav>
  </header>
  <main class="contenedor">
    <div class="preview">
      <div class="arte arte--grande" role="img" aria-label="Imagen de Rompe Bloques"></div>
      <div>
        <h1>Rompe Bloques</h1>
        <span class="etiqueta">Acción</span>
        <p>Mueve la paleta, rebota la pelota y rompe todos los bloques antes de perder tus tres vidas.</p>
        <h2>Controles</h2>
        <ul class="controles">
          <li>Flechas: mover la paleta</li>
          <li>P: pausa</li>
        </ul>
        <p>Mejor puntaje: <span class="puntaje">12.450</span> por ANA</p>
        <div class="acciones">
          <a class="boton" href="jugar.html">Jugar</a>
          <a class="boton boton--sec" href="index.html">Volver</a>
        </div>
      </div>
    </div>
  </main>
</body>
</html>` },
        },
        {
          instruction: "Guarda la pantalla de jugar.",
          file: { name: "references/templates/jugar.html", code: `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Jugar · Arcade Vault</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="cabecera">
    <a class="logo" href="index.html">Arcade Vault</a>
    <nav class="nav" aria-label="Principal">
      <a href="index.html">Juegos</a>
      <a href="salon-de-la-fama.html">Salón de la fama</a>
      <a href="iniciar-sesion.html">Iniciar sesión</a>
    </nav>
  </header>
  <main class="contenedor">
    <div class="hud">
      <h1>Rompe Bloques</h1>
      <div>
        <span class="puntaje">Puntos 0</span>
        <button class="boton boton--sec" type="button">Pausa</button>
      </div>
    </div>
    <div class="arena" role="img" aria-label="Área de juego, marcador de posición">
      <div class="enemigo" style="top: 30px"></div>
      <div class="enemigo"></div>
      <div class="enemigo"></div>
      <div class="jugador"></div>
    </div>
    <p class="aviso">Marcador de posición: aquí irá el juego real.</p>
  </main>
</body>
</html>` },
        },
        {
          instruction: "Guarda el salón de la fama.",
          file: { name: "references/templates/salon-de-la-fama.html", code: `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Salón de la fama · Arcade Vault</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="cabecera">
    <a class="logo" href="index.html">Arcade Vault</a>
    <nav class="nav" aria-label="Principal">
      <a href="index.html">Juegos</a>
      <a href="salon-de-la-fama.html" aria-current="page">Salón de la fama</a>
      <a href="iniciar-sesion.html">Iniciar sesión</a>
    </nav>
  </header>
  <main class="contenedor">
    <h1>Salón de la fama</h1>
    <p class="subtitulo">Los mejores puntajes de cada juego.</p>
    <div class="tabs" role="tablist" aria-label="Juegos">
      <a class="tab" role="tab" aria-selected="true" href="salon-de-la-fama.html">Rompe Bloques</a>
      <a class="tab" role="tab" aria-selected="false" href="salon-de-la-fama.html">Culebra</a>
      <a class="tab" role="tab" aria-selected="false" href="salon-de-la-fama.html">Defensor</a>
      <a class="tab" role="tab" aria-selected="false" href="salon-de-la-fama.html">Laberinto</a>
      <a class="tab" role="tab" aria-selected="false" href="salon-de-la-fama.html">Saltarín</a>
      <a class="tab" role="tab" aria-selected="false" href="salon-de-la-fama.html">Memoria</a>
    </div>
    <table class="tabla">
      <thead><tr><th>Puesto</th><th>Jugador</th><th>Puntaje</th></tr></thead>
      <tbody>
        <tr><td>1</td><td>ANA</td><td class="puntaje">12.450</td></tr>
        <tr><td>2</td><td>MARTA</td><td class="puntaje">11.900</td></tr>
        <tr><td>3</td><td>LUIS</td><td class="puntaje">10.320</td></tr>
        <tr><td>4</td><td>SOFÍA</td><td class="puntaje">9.870</td></tr>
        <tr><td>5</td><td>PEDRO</td><td class="puntaje">8.140</td></tr>
        <tr><td>6</td><td>JUAN</td><td class="puntaje">7.050</td></tr>
        <tr><td>7</td><td>ELENA</td><td class="puntaje">6.480</td></tr>
        <tr><td>8</td><td>DIEGO</td><td class="puntaje">5.220</td></tr>
      </tbody>
    </table>
  </main>
</body>
</html>` },
        },
        {
          instruction: "Guarda la pantalla de iniciar sesión.",
          file: { name: "references/templates/iniciar-sesion.html", code: `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Iniciar sesión · Arcade Vault</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="cabecera">
    <a class="logo" href="index.html">Arcade Vault</a>
    <nav class="nav" aria-label="Principal">
      <a href="index.html">Juegos</a>
      <a href="salon-de-la-fama.html">Salón de la fama</a>
      <a href="iniciar-sesion.html" aria-current="page">Iniciar sesión</a>
    </nav>
  </header>
  <main class="contenedor">
    <h1>Iniciar sesión</h1>
    <p class="subtitulo">Entra para guardar tus puntajes.</p>
    <form class="formulario">
      <label class="campo">Correo<input type="email" name="correo" autocomplete="email"></label>
      <label class="campo">Contraseña<input type="password" name="clave" autocomplete="current-password"></label>
      <button class="boton" type="submit">Entrar</button>
        <div class="separador">o continúa con</div>
        <div class="social">
          <a class="boton boton--sec" href="#">Continuar con Google</a>
          <a class="boton boton--sec" href="#">Continuar con GitHub</a>
        </div>
      <p class="aviso">¿No tienes cuenta? <a href="crear-cuenta.html">Crear cuenta</a></p>
    </form>
  </main>
</body>
</html>` },
        },
        {
          instruction: "Guarda la pantalla de crear cuenta.",
          file: { name: "references/templates/crear-cuenta.html", code: `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Crear cuenta · Arcade Vault</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="cabecera">
    <a class="logo" href="index.html">Arcade Vault</a>
    <nav class="nav" aria-label="Principal">
      <a href="index.html">Juegos</a>
      <a href="salon-de-la-fama.html">Salón de la fama</a>
      <a href="iniciar-sesion.html" aria-current="page">Iniciar sesión</a>
    </nav>
  </header>
  <main class="contenedor">
    <h1>Crear cuenta</h1>
    <p class="subtitulo">Elige un nombre para el salón de la fama.</p>
    <form class="formulario">
      <label class="campo">Nombre<input type="text" name="nombre" autocomplete="nickname"></label>
      <label class="campo">Correo<input type="email" name="correo" autocomplete="email"></label>
      <label class="campo">Contraseña<input type="password" name="clave" autocomplete="new-password"></label>
      <button class="boton" type="submit">Crear cuenta</button>
        <div class="separador">o continúa con</div>
        <div class="social">
          <a class="boton boton--sec" href="#">Continuar con Google</a>
          <a class="boton boton--sec" href="#">Continuar con GitHub</a>
        </div>
      <p class="aviso">¿Ya tienes cuenta? <a href="iniciar-sesion.html">Iniciar sesión</a></p>
    </form>
  </main>
</body>
</html>` },
        },
        {
          instruction: "Comprueba que están las siete y guárdalas en un commit.",
          command: "ls -1 references/templates && git add references/templates && git commit -q -m \"docs: plantillas de referencia de las seis pantallas\" && git log --format=%s -1",
          expected: "crear-cuenta.html\nindex.html\niniciar-sesion.html\njugar.html\nprevisualizacion.html\nsalon-de-la-fama.html\nstyles.css\ndocs: plantillas de referencia de las seis pantallas",
        },
      ],
      verify: "Abre references/templates/index.html en el navegador: ves la cuadrícula de seis juegos con el estilo de neón, y los enlaces llevan a las otras pantallas.",
    },
    {
      type: "exercise",
      title: "Ejercicio 4: los estilos en globals.css",
      description: "El import de Tailwind y el tema arriba, y debajo la hoja de la plantilla.",
      steps: [
        {
          instruction: "Sustituye todo el contenido de app/globals.css por esta cabecera. Es el import de Tailwind y el enlace entre los colores de Tailwind y las variables de la plantilla.",
          file: { name: "app/globals.css", code: `@import "tailwindcss";

@theme inline {
  --color-fondo: var(--fondo);
  --color-panel: var(--panel);
  --color-texto: var(--texto);
  --color-rosa: var(--rosa);
  --color-cian: var(--cian);
  --color-amarillo: var(--amarillo);
}` },
        },
        {
          instruction: "Añade debajo el contenido de la hoja de la plantilla, y comprueba que la primera línea sigue siendo el import y que hay un único bloque :root.",
          command: "printf '\\n' >> app/globals.css && cat references/templates/styles.css >> app/globals.css && head -1 app/globals.css && grep -c \"^:root\" app/globals.css",
          expected: "@import \"tailwindcss\";\n1",
        },
      ],
      verify: "globals.css empieza por el import de Tailwind y contiene las variables de la plantilla. Si tu editor añadió líneas en blanco, no importa.",
    },
    {
      type: "exercise",
      title: "Ejercicio 5: lint, build y la trampa del import",
      description: "Comprueba que compila y mira qué ocurre cuando falta la primera línea.",
      steps: [
        {
          instruction: "Pasa el lint y el build. Ambos deben terminar bien.",
          command: "npm run lint --silent && echo lint correcto && npm run build > /dev/null 2>&1 && echo build correcto",
          expected: "lint correcto\nbuild correcto",
        },
        {
          instruction: "Provoca el fallo a propósito: quita la primera línea, vuelve a compilar y mira el código de salida y el aviso.",
          command: "sed -i.bak '1d' app/globals.css && npm run build > /tmp/sin-import.log 2>&1; echo \"salida $?\"; grep -m1 \"Unknown at rule\" /tmp/sin-import.log",
          expected: "salida 0\nUnknown at rule: @theme",
        },
        {
          instruction: "Restaura el archivo desde la copia y comprueba la primera línea. Después guarda el cambio en un commit.",
          command: "mv app/globals.css.bak app/globals.css && head -1 app/globals.css && git add -A && git commit -q -m \"feat: estilos globales de la plantilla en globals.css\" && git status --porcelain && git log --format=%s -1",
          expected: "@import \"tailwindcss\";\nfeat: estilos globales de la plantilla en globals.css",
        },
      ],
      verify: "El build sin el import termina con código 0 y solo avisa, y con el import no avisa. Tras restaurar, no queda ningún archivo .bak sin guardar. Si ves algún aviso nuevo en el build normal, léelo antes de seguir.",
    },
    {
      type: "exercise",
      title: "Ejercicio 6: CLAUDE.md corto, reglas y spec-impl",
      description: "Reparte las instrucciones y ajusta el skill para que reutilice la rama.",
      steps: [
        {
          instruction: "Sustituye CLAUDE.md por la versión corta de la lección.",
          file: { name: "CLAUDE.md", code: `@AGENTS.md

# Arcade Vault

Plataforma de juegos arcade para jugar en el navegador y competir por puntos.

## Pila
- Next.js con App Router, React, TypeScript y Tailwind CSS. Las versiones están en package.json.
- Node 20.9 o superior. Los comandos para ejecutarlo están en README.md.

## Cómo trabajamos
- Cada funcionalidad empieza con un spec en specs/: /spec para escribirlo y /spec-impl para implementarlo.
- Los diseños de referencia están en references/. Se consultan al trabajar en una pantalla.
- Nunca se trabaja en main: cada cambio va en una rama y llega por pull request.
- Antes de dar un cambio por bueno, deben pasar npm run lint y npm run build.

## Reglas
- Responde siempre en español.
- Las reglas de interfaz están en .claude/rules/interfaz.md y se cargan al tocar archivos de app/.` },
        },
        {
          instruction: "Crea el archivo de reglas de interfaz.",
          file: { name: ".claude/rules/interfaz.md", code: `---
paths:
  - "app/**/*.tsx"
  - "app/**/*.css"
  - "components/**/*.tsx"
---
# Reglas de interfaz

- Sigue references/design-brief.md y las plantillas de references/templates/. Si el brief fija una decisión, esa decisión gana a cualquier gusto propio.
- Para crear o rehacer pantallas, usa el skill frontend-design.
- Los estilos de los componentes viven en app/globals.css, con las mismas clases y variables que styles.css. Tailwind se usa solo para el diseño: filas, columnas, cuadrículas y espacios.
- Sin fuentes ni imágenes de servidores externos: solo fuentes del sistema.
- Los datos de muestra viven en app/data/. Ninguna pantalla los escribe a mano.
- Cada pantalla debe verse bien en móvil y en escritorio, con foco visible con el teclado y con animaciones que respeten prefers-reduced-motion.` },
        },
        {
          instruction: "Guarda ambos en un commit.",
          command: "git add CLAUDE.md .claude/rules && git commit -q -m \"docs: CLAUDE.md corto y reglas de interfaz\" && git log --format=%s -1",
          expected: "docs: CLAUDE.md corto y reglas de interfaz",
        },
        {
          instruction: "En .claude/skills/spec-impl/SKILL.md, sustituye el paso 3 por el de la comparación de la lección. Después comprueba en qué línea del archivo está y guárdalo.",
          command: "grep -n \"Si ya estás en la rama\" .claude/skills/spec-impl/SKILL.md | cut -d: -f1 && git commit -q -am \"feat: spec-impl reutiliza la rama del spec\" && git log --format=%s -1",
          expected: "13\nfeat: spec-impl reutiliza la rama del spec",
        },
        {
          instruction: "En una sesión nueva de Claude Code, comprueba qué se carga al empezar.",
          command: "/context all",
          expected: "CLAUDE.md y su contenido importado aparecen en Memory files. El archivo de reglas no aparece todavía: se cargará al leer o editar un archivo de app/.",
        },
      ],
      verify: "La línea del skill es la 13, y git status no muestra nada pendiente. La cabecera del archivo de reglas empieza con tres guiones y el bloque paths.",
    },
    {
      type: "exercise",
      title: "Ejercicio 7: subir, integrar y limpiar",
      description: "El ciclo de la rama de la lección anterior, esta vez con cuatro commits.",
      steps: [
        {
          instruction: "Mira cuánto cambia la rama respecto a main y súbela.",
          command: "git diff --stat main..HEAD | tail -1 && git push -u origin 01-estilos 2>&1 | tail -1",
          expected: "11 files changed, 460 insertions(+), 25 deletions(-)\nbranch '01-estilos' set up to track 'origin/01-estilos'.",
        },
        {
          instruction: "En GitHub, abre el pull request de 01-estilos hacia main, revisa los cambios e intégralo con Create a merge commit. Borra después la rama remota.",
          command: "Compare & pull request > Create pull request > Merge pull request > Delete branch",
          expected: "GitHub marca el pull request como Merged y la rama remota desaparece.",
        },
        {
          instruction: "Vuelve a main, trae los cambios y cuenta las ramas locales cuya remota ya no existe.",
          command: "git switch -q main && git pull --prune -q && git log --format=%s -2 && git branch -vv | grep -c gone",
          expected: "Merge pull request #1 from TU-USUARIO/01-estilos\nfeat: spec-impl reutiliza la rama del spec\n1",
        },
        {
          instruction: "Borra la rama local, que ya está integrada.",
          command: "git branch -d 01-estilos > /dev/null && git branch",
          expected: "* main",
        },
      ],
      verify: "Solo queda main, con los estilos, las plantillas y las reglas. Con Squash and merge, el último paso fallaría con the branch is not fully merged, como viste en la lección anterior.",
    },
    {
      type: "exercise",
      title: "Ejercicio 8: la rama del spec y /spec",
      description: "Rama primero, entrevista después.",
      steps: [
        {
          instruction: "Crea la rama del spec desde main, ya actualizado.",
          command: "git switch -c spec/001-mvp-arcade-vault",
          expected: "Switched to a new branch 'spec/001-mvp-arcade-vault'",
        },
        {
          instruction: "Abre Claude Code y lanza el skill con el problema en una frase. Responde a las preguntas con las decisiones de la tabla de la lección.",
          command: "claude\n/spec Las seis pantallas de references/templates como páginas de Next.js, con datos de muestra y sin lógica de juego",
          expected: "Claude lee README.md y CLAUDE.md, lista specs/ y te hace preguntas cortas, con opciones y una recomendación, sobre alcance, datos, criterios y decisiones. Al terminar guarda specs/001-<nombre>.md con estado borrador y espera tu aprobación.",
        },
      ],
      verify: "Existe un archivo specs/001-... con estado borrador, y estás en la rama spec/001-mvp-arcade-vault. El texto del spec puede diferir del de referencia, y no pasa nada. El ejercicio siguiente usa el de la lección.",
    },
    {
      type: "exercise",
      title: "Ejercicio 9: el spec, el validador y la aprobación",
      description: "Valida el spec, guárdalo como borrador y apruébalo en un segundo commit.",
      steps: [
        {
          instruction: "Guarda el spec de referencia. Si tu entrevista dio otro, usa el tuyo, pero pásale igualmente el validador.",
          file: { name: "specs/001-mvp-arcade-vault.md", code: `---
estado: borrador
---
# 001 MVP de Arcade Vault
## Objetivo
Que las seis pantallas de references/templates existan en la aplicación Next.js, con datos de muestra y sin ninguna lógica de juego.
## Alcance
Entra:
- Las seis pantallas: inicio, previsualización de un juego, jugar, salón de la fama, iniciar sesión y crear cuenta.
- Rutas reales del App Router de Next.js: /, /juegos/[id], /juegos/[id]/jugar, /salon-de-la-fama, /iniciar-sesion y /crear-cuenta.
- Los estilos de references/templates/styles.css, que ya están en app/globals.css. Tailwind solo se usa para el diseño de filas, columnas y espacios.
- Los efectos de la plantilla hechos solo con CSS: las líneas de barrido, el brillo al pasar el ratón y la arena animada de la pantalla de jugar.
- Datos de muestra en app/data: seis juegos y ocho puntajes por juego.
- Una cabecera común con el nombre y tres enlaces.
- Texto de la interfaz en español.

No entra:
- Ningún juego real: la pantalla de jugar es un marcador de posición.
- Autenticación: los formularios existen pero no envían nada.
- Base de datos, API ni guardado de puntajes.
- Efectos de inclinación 3D ni partículas de fondo.
- Fuentes o imágenes de servidores externos.
## Modelo de datos
- Juego: id, nombre, género, descripción, controles y mejor puntaje, con su jugador.
- Puntaje: jugador y puntaje.
- JUEGOS: la lista de los seis juegos, en app/data/juegos.ts.
- PUNTAJES: los ocho puntajes de cada juego, por id de juego, en app/data/puntajes.ts.
## Plan de implementación
1. Datos: crear app/data/juegos.ts y app/data/puntajes.ts con los datos de muestra.
2. Base: ajustar layout.tsx con el idioma, el título y sin fuentes externas, y crear el componente Cabecera.
3. Inicio: la cuadrícula de seis tarjetas en app/page.tsx.
4. Previsualización: app/juegos/[id]/page.tsx, con 404 si el juego no existe.
5. Jugar: app/juegos/[id]/jugar/page.tsx con la arena de muestra.
6. Salón de la fama: app/salon-de-la-fama/page.tsx con una pestaña por juego.
7. Iniciar sesión y crear cuenta: dos páginas que comparten el diseño del formulario.
8. Verificar los criterios con npm run lint, npm run build y scripts/probar-rutas.mjs, y pasar el estado a implementado.
## Criterios de aceptación
- [ ] npm run lint termina sin errores.
- [ ] npm run build termina sin errores.
- [ ] Las seis rutas responden 200: /, /juegos/rompe-bloques, /juegos/rompe-bloques/jugar, /salon-de-la-fama, /iniciar-sesion y /crear-cuenta.
- [ ] Un juego que no existe responde 404.
- [ ] La página de inicio muestra seis tarjetas, una por juego.
- [ ] El salón de la fama muestra ocho filas por juego y seis pestañas.
- [ ] Todas las páginas tienen la cabecera con tres enlaces.
- [ ] Ninguna página carga fuentes ni imágenes de servidores externos.
- [ ] Los formularios tienen los campos de la plantilla y no envían datos.
- [ ] Cada pantalla se parece a su plantilla de references/templates, y se comprueba mirando.
## Decisiones
- Tomada: rutas reales de Next.js y no una sola página con navegación interna, para que cada pantalla tenga su dirección.
- Tomada: los estilos de la plantilla en globals.css y Tailwind solo para el diseño, para mantener el aspecto idéntico a las referencias.
- Tomada: datos de muestra en constantes de TypeScript, porque más adelante vendrán de una base de datos.
- Tomada: el marcador de la pantalla de jugar copia la arena animada de la plantilla.
- Tomada: fuentes del sistema y no las de Google que trae la plantilla de Next.js, porque así el texto se ve como en las referencias.
- Descartada: la inclinación 3D de las tarjetas, porque exige JavaScript y no aporta al MVP.
- Descartada: la autenticación, porque se hará en otro spec.` },
        },
        {
          instruction: "Pasa el validador y guarda el borrador en un commit.",
          command: "node scripts/validar-spec.js specs/001-mvp-arcade-vault.md | tail -1 && git add specs && git commit -q -m \"spec 001 en borrador: MVP de Arcade Vault\" && git log --format=%s -1",
          expected: "RESULTADO: spec válido\nspec 001 en borrador: MVP de Arcade Vault",
        },
        {
          instruction: "Lee el spec entero. Si estás de acuerdo, cambia tú el estado a aprobado y comprueba la cabecera.",
          command: "sed -i.bak 's/^estado: borrador$/estado: aprobado/' specs/001-mvp-arcade-vault.md && rm specs/001-mvp-arcade-vault.md.bak && head -3 specs/001-mvp-arcade-vault.md",
          expected: "---\nestado: aprobado\n---",
        },
        {
          instruction: "Guarda la aprobación en su propio commit y mira el resultado.",
          command: "git commit -q -am \"spec 001 aprobado\" && git status --porcelain && git log --format=%s -2 && git branch --show-current",
          expected: "spec 001 aprobado\nspec 001 en borrador: MVP de Arcade Vault\nspec/001-mvp-arcade-vault",
        },
      ],
      verify: "El árbol queda limpio, hay dos commits del spec y estás en su rama. No subas todavía la rama: la lección siguiente la implementa y sube todo junto en un pull request.",
    },
    {
      type: "playground",
      title: "Experimento 10: cuándo se carga cada fuente de instrucciones",
      description: "Una lista simple de lo que has visto. Añade una línea para otro lugar que se te ocurra.",
      code: `const fuentes = [
  ["CLAUDE.md", "al empezar la sesión"],
  ["Import @archivo dentro de CLAUDE.md", "al empezar la sesión"],
  ["Regla con paths en .claude/rules/", "al leer o editar un archivo que coincide"],
  ["Skill: nombre y descripción", "siempre, para que Claude sepa que existe"],
  ["Skill: cuerpo", "al invocarlo"],
  ["Archivo de references/ citado como texto", "cuando Claude lo lee, si lo necesita"],
];
fuentes.forEach(([nombre, cuando]) => console.log(nombre + " -> " + cuando));`,
      expected: "CLAUDE.md -> al empezar la sesión\nImport @archivo dentro de CLAUDE.md -> al empezar la sesión\nRegla con paths en .claude/rules/ -> al leer o editar un archivo que coincide\nSkill: nombre y descripción -> siempre, para que Claude sepa que existe\nSkill: cuerpo -> al invocarlo\nArchivo de references/ citado como texto -> cuando Claude lo lee, si lo necesita",
    },
    {
      type: "playground",
      title: "Experimento 11: ¿cargan mis reglas con este archivo?",
      description: "Un modelo simplificado de la coincidencia con los patrones de paths. Prueba con tus propios archivos.",
      code: `function aRegex(patron) {
  const texto = patron
    .replace(/[.+^\${}()|\\\\]/g, "\\\\$&")
    .replace(/\\*\\*\\//g, "@@DIRS@@")
    .replace(/\\*\\*/g, "@@TODO@@")
    .replace(/\\*/g, "[^/]*")
    .replace(/@@DIRS@@/g, "(?:.*/)?")
    .replace(/@@TODO@@/g, ".*");
  return new RegExp("^" + texto + "$");
}
const reglas = ["app/**/*.tsx", "app/**/*.css", "components/**/*.tsx"];
const archivos = [
  "app/page.tsx",
  "app/juegos/[id]/page.tsx",
  "app/globals.css",
  "components/Cabecera.tsx",
  "README.md",
  "scripts/validar-spec.js",
];
archivos.forEach((a) => {
  const carga = reglas.some((r) => aRegex(r).test(a));
  console.log(a + " -> " + (carga ? "carga las reglas de interfaz" : "no carga nada"));
});`,
      expected: "app/page.tsx -> carga las reglas de interfaz\napp/juegos/[id]/page.tsx -> carga las reglas de interfaz\napp/globals.css -> carga las reglas de interfaz\ncomponents/Cabecera.tsx -> carga las reglas de interfaz\nREADME.md -> no carga nada\nscripts/validar-spec.js -> no carga nada",
    },
    {
      type: "playground",
      title: "Experimento 12: el import de Tailwind",
      description: "Reproduce la comprobación del ejercicio 5 sobre cuatro versiones del CSS. Cambia los casos y mira el diagnóstico.",
      code: `function revisarCss(css) {
  const lineas = css.trim().split("\\n");
  const importa = lineas[0].startsWith('@import "tailwindcss"');
  const usaTema = css.includes("@theme");
  if (importa && usaTema) return "completo: Tailwind genera sus utilidades";
  if (!importa && usaTema) return "falta el import: @theme no se reconoce y no hay utilidades";
  if (importa) return "con el import, sin tema propio";
  return "CSS normal, sin Tailwind";
}
const casos = {
  "con import y tema": '@import "tailwindcss";\\n@theme inline { --color-rosa: var(--rosa); }\\n:root { --rosa: #ff3d81; }',
  "sin import": '@theme inline { --color-rosa: var(--rosa); }\\n:root { --rosa: #ff3d81; }',
  "solo import": '@import "tailwindcss";\\n:root { --rosa: #ff3d81; }',
  "sin Tailwind": ":root { --rosa: #ff3d81; }",
};
Object.keys(casos).forEach((k) => console.log(k + " -> " + revisarCss(casos[k])));`,
      expected: "con import y tema -> completo: Tailwind genera sus utilidades\nsin import -> falta el import: @theme no se reconoce y no hay utilidades\nsolo import -> con el import, sin tema propio\nsin Tailwind -> CSS normal, sin Tailwind",
    },
    {
      type: "playground",
      title: "Experimento 13: qué ruta responde qué",
      description: "Un resolvedor pequeño de las rutas del MVP. Prueba otras rutas y mira cuándo da 404.",
      code: `const JUEGOS = ["rompe-bloques", "culebra", "defensor", "laberinto", "saltarin", "memoria"];
function resolver(ruta) {
  const [camino, consulta] = ruta.split("?");
  const partes = camino.split("/").filter(Boolean);
  if (partes.length === 0) return "200 inicio";
  if (partes[0] === "salon-de-la-fama" && partes.length === 1) {
    const juego = consulta ? consulta.replace("juego=", "") : JUEGOS[0];
    return JUEGOS.includes(juego) ? "200 salón, pestaña " + juego : "404";
  }
  if (partes[0] === "juegos" && JUEGOS.includes(partes[1])) {
    if (partes.length === 2) return "200 previsualización de " + partes[1];
    if (partes.length === 3 && partes[2] === "jugar") return "200 jugar " + partes[1];
  }
  if (partes[0] === "iniciar-sesion" && partes.length === 1) return "200 iniciar sesión";
  if (partes[0] === "crear-cuenta" && partes.length === 1) return "200 crear cuenta";
  return "404";
}
["/", "/juegos/rompe-bloques", "/juegos/rompe-bloques/jugar", "/juegos/tetris", "/salon-de-la-fama?juego=culebra", "/crear-cuenta", "/admin"].forEach((r) => console.log(r + " -> " + resolver(r)));`,
      expected: "/ -> 200 inicio\n/juegos/rompe-bloques -> 200 previsualización de rompe-bloques\n/juegos/rompe-bloques/jugar -> 200 jugar rompe-bloques\n/juegos/tetris -> 404\n/salon-de-la-fama?juego=culebra -> 200 salón, pestaña culebra\n/crear-cuenta -> 200 crear cuenta\n/admin -> 404",
    },
    { type: "heading", level: 2, text: "¿Qué usar en cada caso?" },
    {
      type: "table",
      headers: ["Si necesitas...", "Usa...", "Nota"],
      rows: [
        ["Una instrucción que vale en cada sesión", "CLAUDE.md, corto", "Menos de unas 200 líneas."],
        ["Reglas que solo importan en una parte del código", "Un archivo en .claude/rules con paths", "Se carga al leer o editar archivos que coinciden."],
        ["Un diseño grande que se consulta a veces", "references/ citado con su ruta en texto", "Con @ se cargaría siempre."],
        ["Un método de trabajo repetible", "Un skill", "Su descripción siempre está a la vista, su cuerpo al invocarlo."],
        ["Un skill de terceros", "Leer SKILL.md, allowed-tools, scripts y hooks antes", "La popularidad no es una garantía."],
        ["Fijar el aspecto antes de programar", "Plantillas HTML estáticas en references/", "Se abren en el navegador sin servidor."],
        ["Tailwind y estilos propios a la vez", "El import de Tailwind en la primera línea y @theme inline para enlazar variables", "Sin el import, el build no falla pero no hay utilidades."],
        ["Un spec con main protegida", "Crear la rama spec/ antes de lanzar /spec", "spec-impl la reutiliza."],
        ["Pasar un spec a aprobado", "Hacerlo tú, a mano, tras validarlo", "Es el punto de control del flujo."],
      ],
    },
    { type: "heading", level: 2, text: "Datos que suelen aparecer desactualizados" },
    {
      type: "table",
      headers: ["Suele decirse", "Información verificada (noviembre 2026)"],
      rows: [
        ["Un skill popular es un skill seguro.", "La popularidad mide uso, no seguridad. Se revisa el contenido: SKILL.md, herramientas permitidas, scripts y hooks."],
        ["El skill de diseño decide el aspecto de la página.", "Donde el encargo fija una dirección, el skill la sigue. Sirve para lo que el brief deja libre."],
        ["Todo lo que Claude debe saber va en CLAUDE.md.", "Las reglas por ruta, los skills y las referencias llegan cuando hacen falta y mantienen CLAUDE.md corto."],
        ["Los comandos de ejecución van en CLAUDE.md.", "Basta con tenerlos en el README. En CLAUDE.md se deja la regla que debe cumplirse siempre."],
        ["Un build terminado sin error implica que el CSS está bien.", "Sin el import de Tailwind, el build termina con código 0, solo avisa de que no reconoce @theme y genera un CSS sin utilidades."],
        ["Las fuentes de Google en Next.js hacen peticiones a Google desde el navegador.", "next/font las descarga en el build y las sirve desde tu dominio, según la documentación. Este proyecto prefiere las del sistema por coherencia con las plantillas."],
        ["No hace falta rama para escribir un spec.", "Con main protegida, el spec se escribe en una rama propia y spec-impl la reutiliza."],
        ["Los skills de un plugin se invocan solo por su nombre.", "Llevan el nombre del plugin como prefijo: /frontend-design:frontend-design."],
      ],
    },
    { type: "heading", level: 2, text: "Si algo no funciona" },
    {
      type: "table",
      headers: ["Síntoma", "Causa probable", "Qué hacer"],
      rows: [
        ["La página se ve sin diseño y el build no falla", "Falta el import de Tailwind en la primera línea de globals.css", "Restaúralo y vuelve a compilar. Busca Unknown at rule en la salida."],
        ["El skill del plugin no aparece", "No se ha recargado o hubo un error al cargarlo", "Ejecuta /reload-plugins y mira la pestaña Errors de /plugin."],
        ["Claude ignora las reglas de interfaz", "Todavía no ha leído ningún archivo que coincida con paths", "Pídele que lea o edite un archivo de app/ y vuelve a mirar /context."],
        ["Una regla no se aplica a app/juegos/[id]/page.tsx", "El patrón escribe los corchetes literalmente", "Usa `app/**/*.tsx`, que cubre todas las carpetas."],
        ["git push a main se rechaza", "La rama está protegida", "Trabaja en una rama y abre un pull request."],
        ["/spec-impl dice que no encuentra el spec", "El archivo está en otra rama", "Cámbiate a la rama spec/ donde lo guardaste."],
        ["El validador falla", "Falta una sección o hay un criterio que no se puede responder con sí o no", "Lee el mensaje, corrige el spec y vuelve a validar."],
        ["git branch -d no borra la rama", "Se integró con squash o rebase", "Mira que el pull request está integrado y usa -D."],
      ],
    },
    { type: "heading", level: 2, text: "Preguntas frecuentes" },
    {
      type: "accordion",
      items: [
        {
          title: "¿Por qué no pedirle a Claude que haga las plantillas desde cero?",
          text: "Puedes, y el skill de diseño ayuda. La ventaja de fijarlas antes en HTML es que se iteran rápido, se miran sin compilar y quedan como referencia estable para la implementación. Lo que no conviene es dejar que el diseño nazca a la vez que los componentes.",
        },
        {
          title: "¿Y si el skill de diseño produce algo distinto a mi brief?",
          text: "El propio skill dice que las palabras del encargo siempre ganan. Si no ocurre, tu brief es poco concreto en ese punto, o el skill no se ha usado como se pensaba. Concreta el brief y repite.",
        },
        {
          title: "¿Puedo usar un skill de terceros?",
          text: "Sí, tras leerlo. Un SKILL.md es corto y se lee en minutos. Lo que hace daño es instalar sin mirar un plugin que trae scripts o hooks. Si no entiendes lo que hace un script, no lo instales.",
        },
        {
          title: "¿Por qué Tailwind solo para el diseño de filas y columnas?",
          text: "Porque el aspecto ya está definido en la hoja de la plantilla. Mezclar colores y sombras en clases de Tailwind duplicaría esa decisión en dos sitios. Para filas, cuadrículas y espacios, las utilidades son cómodas y no chocan con la hoja.",
        },
        {
          title: "¿Es obligatorio crear la rama del spec?",
          text: "Con main protegida, sí: no puedes dejar el spec sin guardar en main ni hacer un commit directo. Si no la creas antes, el spec quedaría sin guardar cuando spec-impl cambie de rama. En un proyecto sin protección sería opcional.",
        },
        {
          title: "¿Por qué el spec y la implementación van en un solo pull request?",
          text: "Quien revisa lee primero el spec, que dice qué debe hacerse, y luego comprueba que el código lo cumple. Con dos pull requests, la segunda revisión pierde ese contexto.",
        },
      ],
    },
    { type: "heading", level: 2, text: "Qué sigue" },
    {
      type: "paragraph",
      text: "El Día 22 implementa el MVP: lanzarás /spec-impl 001 sobre la rama que has dejado preparada y avanzarás paso a paso por el plan. Además añadirás el servidor MCP de Playwright, para que Claude pueda abrir la aplicación y comparar lo que ve con las plantillas. Antes de seguir, comprueba que estás en spec/001-mvp-arcade-vault, con el spec aprobado y el árbol limpio.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 22, verifica que puedes explicar...",
      items: [
        "Cuándo llega a Claude cada una de las cuatro fuentes de instrucciones.",
        "Por qué CLAUDE.md pierde claridad si lo llenas de todo.",
        "Qué mirar antes de instalar un skill o un plugin, y por qué la popularidad no cuenta.",
        "Quién gana si el skill de diseño y el brief chocan.",
        "Por qué el CSS sin el import de Tailwind se compila sin error y cómo se detecta.",
        "Qué ruta de Next.js sirve cada plantilla y qué hace una carpeta entre corchetes.",
        "Por qué el spec va en una rama con main protegida, y qué cambió en spec-impl.",
        "Por qué el estado aprobado lo cambia una persona.",
      ],
    },
    { type: "heading", level: 2, text: "Fuentes consultadas (noviembre 2026)" },
    {
      type: "list",
      items: [
        "[Claude Code: cómo recuerda tu proyecto, CLAUDE.md, imports y reglas por ruta](https://code.claude.com/docs/en/memory)",
        "[Claude Code: skills](https://code.claude.com/docs/en/skills)",
        "[Claude Code: instalar y gestionar plugins](https://code.claude.com/docs/en/discover-plugins)",
        "[Claude Code: buenas prácticas](https://code.claude.com/docs/en/best-practices)",
        "[Repositorio del marketplace oficial de plugins de Anthropic, con el plugin frontend-design](https://github.com/anthropics/claude-plugins-official)",
        "[Next.js: fuentes y next/font](https://nextjs.org/docs/app/getting-started/fonts)",
        "[Next.js: layouts y páginas, rutas y segmentos dinámicos](https://nextjs.org/docs/app/getting-started/layouts-and-pages)",
        "[GitHub: acerca de las ramas protegidas](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)",
        "[GitHub: acerca de la integración de pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/about-pull-request-merges)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "Una regla de estilo solo importa cuando Claude toca archivos de app/. ¿Dónde la pones?",
      options: [
        "En CLAUDE.md, para que no se olvide",
        "En un archivo de .claude/rules con paths que coincida con esos archivos",
        "En el README",
        "En el nombre de la rama",
      ],
      correctIndex: 1,
      explanation: "Un archivo de reglas con paths se carga cuando Claude lee o edita un archivo que coincide, y no pesa en las demás sesiones.",
    },
    {
      question: "¿Cuándo se carga el cuerpo de un skill?",
      options: [
        "Al empezar cada sesión",
        "Al invocarlo, porque en el arranque solo está su descripción",
        "Nunca",
        "Al hacer un commit",
      ],
      correctIndex: 1,
      explanation: "La descripción está siempre a la vista para que Claude sepa que el skill existe. El cuerpo se carga al usarlo.",
    },
    {
      question: "Un skill tiene miles de descargas. ¿Qué te dice eso sobre su seguridad?",
      options: [
        "Que es seguro",
        "Nada: hay que leer SKILL.md, allowed-tools, scripts y hooks",
        "Que lo revisó el equipo de Claude",
        "Que no tiene scripts",
      ],
      correctIndex: 1,
      explanation: "La popularidad mide uso. Un skill puede llevar herramientas permitidas y scripts que se ejecutan en tu máquina, y solo leyéndolo lo sabes.",
    },
    {
      question: "¿Cómo se invoca el skill del plugin frontend-design?",
      options: [
        "/frontend-design",
        "/frontend-design:frontend-design",
        "/design",
        "@frontend-design",
      ],
      correctIndex: 1,
      explanation: "Los skills de un plugin llevan el nombre del plugin como prefijo, con la forma /plugin:skill.",
    },
    {
      question: "Tu brief fija la paleta y el skill de diseño sugeriría otra. ¿Cuál se sigue?",
      options: [
        "La del skill",
        "La del brief: según el propio skill, las palabras del encargo siempre ganan",
        "La que salga más bonita",
        "Ninguna",
      ],
      correctIndex: 1,
      explanation: "El skill sirve para lo que el brief deja libre. Donde el brief fija una dirección, se sigue exactamente.",
    },
    {
      question: "Quitas la primera línea de globals.css, @import \"tailwindcss\";, y ejecutas npm run build. ¿Qué ocurre?",
      options: [
        "El build falla con código distinto de 0",
        "Termina con código 0, avisa de Unknown at rule: @theme y genera un CSS sin utilidades",
        "Se añade el import solo",
        "Nada cambia",
      ],
      correctIndex: 1,
      explanation: "Es un fallo silencioso: el build no se rompe, pero el CSS sale de unos 8,1 KB y sin clases como flex o grid.",
    },
    {
      question: "¿Para qué sirve el bloque @theme inline de globals.css?",
      options: [
        "Para cargar fuentes",
        "Para que los colores de Tailwind apunten a las variables de la plantilla, sin duplicar los valores",
        "Para activar el modo oscuro",
        "Para importar la hoja de la plantilla",
      ],
      correctIndex: 1,
      explanation: "Declara colores como --color-rosa que valen var(--rosa), así una clase de Tailwind usa un color de la plantilla.",
    },
    {
      question: "Con main protegida, ¿dónde se escribe el spec 001?",
      options: [
        "En main, con un commit directo",
        "En una rama spec/001-... creada antes de lanzar /spec",
        "En ninguna parte",
        "En la rama de otro proyecto",
      ],
      correctIndex: 1,
      explanation: "No puedes dejar el spec en main. Con la rama creada antes, spec y código llegan juntos en un solo pull request.",
    },
    {
      question: "¿Qué hace ahora spec-impl si ya estás en la rama spec/ con el nombre del archivo?",
      options: [
        "Falla",
        "La reutiliza, y solo la crea si no estás en ella",
        "Crea otra con un nombre distinto",
        "Cambia a main",
      ],
      correctIndex: 1,
      explanation: "El paso 3 pasó de crear siempre la rama a usarla si ya estás en ella.",
    },
    {
      question: "Pides /juegos/tetris y el MVP solo tiene seis juegos de muestra. ¿Qué responde la ruta app/juegos/[id]?",
      options: [
        "200 con una página vacía",
        "404, porque ese id no existe",
        "500",
        "Redirige al inicio",
      ],
      correctIndex: 1,
      explanation: "El segmento dinámico recibe el id y la página responde 404 si el juego no existe, como dice el spec.",
    },
  ],
};
