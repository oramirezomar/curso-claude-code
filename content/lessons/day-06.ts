import type { Lesson } from "@/lib/types";

// Día 6 · Clases 22, 23, 24 y 25 de la transcripción.
// Contenido verificado en noviembre de 2026.
export const day06: Lesson = {
  day: 6,
  slug: "base-de-codigo-claude-md-memoria-y-multimodal",
  title: "Base de código, CLAUDE.md, memoria y entradas multimodales",
  section: "Fundamentos 101",
  estimatedMinutes: 55,
  icon: "🧠",
  objectives: [
    "Pedirle a Claude Code un mapa de un proyecto desconocido y contrastarlo con el código real.",
    "Ejecutar un comando de larga duración sin llenar el contexto: `!` y `Ctrl+B`, `/tasks`, o una segunda terminal.",
    "Generar un CLAUDE.md con `/init`, saber dónde puede vivir y mantenerlo corto.",
    "Distinguir CLAUDE.md de la memoria automática y saber dónde se guarda cada una.",
    "Dar contexto con imágenes, texto pegado, archivos y menciones con `@`, y deshacer un experimento con el rebobinado.",
  ],
  blocks: [
    {
      type: "paragraph",
      text: "Trabajar con un código que no escribiste es la situación más común. Esta lección enseña a pedirle a Claude Code que lo explique, a darle memoria persistente para que no tengas que repetirle las mismas reglas en cada sesión y a pasarle imágenes, texto y archivos como contexto. También recoge dos hábitos que ahorran tokens: limpiar el contexto al terminar cada función y no dejar comandos infinitos dentro de la conversación.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "/init", label: "Genera un CLAUDE.md inicial a partir del código" },
        { value: "4", label: "Ubicaciones de CLAUDE.md: gestionada, usuario, proyecto y local" },
        { value: "200", label: "Líneas máximas recomendadas para un CLAUDE.md" },
        { value: "25 KB", label: "Tope de MEMORY.md que se carga al empezar, o 200 líneas" },
        { value: "Ctrl+B", label: "Envía un comando de shell a segundo plano" },
        { value: "[Image #1]", label: "Referencia que aparece al pegar una imagen" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text: "Contenido verificado en noviembre de 2026 contra las páginas oficiales de memoria, modo interactivo, comandos y buenas prácticas de Claude Code. Los atajos y los textos de la pantalla cambian entre versiones: si algo no coincide con lo que ves, manda la documentación vigente.",
    },
    { type: "heading", level: 2, text: "Conocer un proyecto con Claude Code" },
    {
      type: "paragraph",
      text: "Para esta práctica necesitas un proyecto pequeño que no conozcas. Puedes descargar o clonar cualquier repositorio pequeño, o crear el que se muestra más abajo. Ponlo dentro de tu carpeta general de ejercicios y mantén sin tocar la carpeta del Día 5. Antes de empezar, cierra cualquier sesión abierta con Ctrl+C dos veces. Al cerrar, Claude Code te indica cómo volver a esa misma conversación con `/resume` o con `claude --resume nombre`. Si no le diste nombre, te muestra el identificador de la sesión.",
    },
    {
      type: "image",
      src: "/img/dia-06/exploracion-del-proyecto.svg",
      alt: "Cinco pasos en fila: carpeta, iniciar Claude Code, preguntar cómo funciona el proyecto, leer el mapa con la tecnología y la estructura, y profundizar en una parte concreta. Debajo, cuatro buenas prácticas para explorar.",
      caption: "De una carpeta desconocida a un mapa del proyecto, antes de tocar el código.",
    },
    {
      type: "paragraph",
      text: "Si clonaste un repositorio con `git clone`, además tienes el control de versiones del proyecto. Al iniciar `claude` por primera vez en una carpeta nueva se te pide confirmar que confías en ella: acéptalo solo si confías en su contenido. Comprueba el modelo activo antes de empezar, porque uno caro puede consumir mucho solo en explorar. Después pídele una explicación general: qué tecnología usa, cómo está organizado y cómo funciona.",
    },
    {
      type: "paragraph",
      text: "Claude lee los archivos con sus herramientas y devuelve un resumen: tecnología, archivos principales, clases o módulos, ciclo del programa y decisiones notables. Abre la carpeta en tu editor y contrasta el resumen con el código. Después sigue preguntando lo que quieras, por ejemplo cómo funcionan las teclas, cómo se detectan las colisiones o cómo se dibuja. Cuanto más concreta la pregunta, menos tokens gasta.",
    },
    { type: "heading", level: 3, text: "Un proyecto mínimo para practicar" },
    {
      type: "paragraph",
      text: "Si no tienes un proyecto a mano, crea esta nave que se mueve con las flechas. Es un ejemplo original y pequeño: dos archivos, sin dependencias.",
    },
    {
      type: "code",
      lang: "html",
      title: "index.html",
      code: "<!doctype html>\n<html lang=\"es\">\n<head><meta charset=\"utf-8\"><title>Nave</title></head>\n<body>\n  <canvas id=\"c\" width=\"400\" height=\"300\"></canvas>\n  <script src=\"game.js\"></script>\n</body>\n</html>",
    },
    {
      type: "code",
      lang: "js",
      title: "game.js",
      code: "const canvas = document.getElementById(\"c\");\nconst ctx = canvas.getContext(\"2d\");\n\nclass Ship {\n  constructor() {\n    this.x = 200;\n    this.y = 150;\n    this.size = 12;\n  }\n  move(dx, dy) {\n    this.x = (this.x + dx + canvas.width) % canvas.width;\n    this.y = (this.y + dy + canvas.height) % canvas.height;\n  }\n  draw() {\n    ctx.fillStyle = \"white\";\n    ctx.fillRect(this.x - 6, this.y - 6, this.size, this.size);\n  }\n}\n\nconst ship = new Ship();\nconst keys = {};\nwindow.addEventListener(\"keydown\", (e) => (keys[e.key] = true));\nwindow.addEventListener(\"keyup\", (e) => (keys[e.key] = false));\n\nfunction loop() {\n  ctx.fillStyle = \"black\";\n  ctx.fillRect(0, 0, canvas.width, canvas.height);\n  ship.move((keys.ArrowRight ? 3 : 0) - (keys.ArrowLeft ? 3 : 0), (keys.ArrowDown ? 3 : 0) - (keys.ArrowUp ? 3 : 0));\n  ship.draw();\n  requestAnimationFrame(loop);\n}\nloop();",
    },
    { type: "heading", level: 3, text: "Comandos que no terminan" },
    {
      type: "paragraph",
      text: "Muchos proyectos se sirven con un comando que nunca termina, como un servidor local. Si lo lanzas desde Claude Code con el prefijo `!`, su salida entra en el historial. Con Ctrl+B se envía a segundo plano, queda funcionando y se le asigna un identificador, y su salida se escribe en un archivo temporal. `/tasks` lista los shells y subagentes en ejecución, y desde esa lista se puede detener la tarea. También se le puede pedir a Claude que detenga las tareas de segundo plano.",
    },
    {
      type: "callout",
      variant: "info",
      text: "Para un servidor que debe seguir vivo, lo más económico es abrir otra pestaña de la terminal y ejecutarlo allí. Así los registros que no necesitas no entran en el contexto. Cuando necesites depurar, copia solo la parte que importa y pégala en Claude.",
    },
    { type: "heading", level: 2, text: "CLAUDE.md: memoria persistente" },
    {
      type: "paragraph",
      text: "Acostúmbrate a vaciar el contexto con `/clear` cada vez que termines una función y, si usas Git, después de hacer el commit. Un proyecto nuevo o uno que cargas por primera vez no suele tener un archivo CLAUDE.md. Es un archivo de Markdown con la información y las guías que Claude necesita para trabajar en ese repositorio, y se carga en cada conversación. La forma más fácil de crearlo es `/init`.",
    },
    {
      type: "paragraph",
      text: "`/init` analiza el proyecto, entiende su objetivo y cómo funciona, y escribe un CLAUDE.md inicial con comandos de compilación, de pruebas y las convenciones que descubre. Si ya existe un CLAUDE.md, sugiere mejoras en lugar de sobrescribirlo. Claude te pregunta antes de crear el archivo. Si empezaste un proyecto totalmente vacío, puedes esperar a tener algo de código antes de usar `/init`, o crear el archivo y escribir tú las reglas.",
    },
    {
      type: "callout",
      variant: "warning",
      text: "Revisa lo que `/init` genera. Debe ser compacto y útil, porque todo el archivo viaja en cada petición. Si no usas Git, copia el archivo antes de pedir cambios para poder comparar. Con Git ves en el editor qué cambió.",
    },
    {
      type: "image",
      src: "/img/dia-06/ubicaciones-claude-md.svg",
      alt: "Cuatro niveles apilados con sus rutas: política gestionada, usuario en ~/.claude/CLAUDE.md, proyecto en ./CLAUDE.md o ./.claude/CLAUDE.md y local en ./CLAUDE.local.md. Una flecha vertical indica que cada nivel es más específico que el anterior.",
      caption: "Ubicaciones de CLAUDE.md, de lo general a lo específico.",
    },
    {
      type: "table",
      caption: "Dónde poner cada instrucción",
      headers: ["Ubicación", "Para qué", "Se comparte"],
      rows: [
        ["Política gestionada (carpeta del sistema)", "Estándares y políticas de la organización", "Con todos los usuarios"],
        ["`~/.claude/CLAUDE.md`", "Tus preferencias en todos los proyectos, por ejemplo cómo reportar resultados", "Solo contigo"],
        ["`./CLAUDE.md` o `./.claude/CLAUDE.md`", "Arquitectura, estándares y flujos del proyecto", "Con el equipo, por control de versiones"],
        ["`./CLAUDE.local.md`", "Preferencias privadas del proyecto. Añádelo a .gitignore", "Solo contigo, en ese proyecto"],
      ],
    },
    {
      type: "paragraph",
      text: "Los archivos de los directorios superiores al de trabajo se cargan al iniciar y los de las subcarpetas se cargan cuando hacen falta. Además existe `.claude/rules/` para reglas por tema o por carpeta, que se verá más adelante. Si necesitas ver o modificar tu CLAUDE.md global, pídeselo a Claude o usa `/memory`. El global debe ser todavía más pequeño que el del proyecto, porque aplica a todo.",
    },
    {
      type: "paragraph",
      text: "Mantén el CLAUDE.md por debajo de 200 líneas. Cuando crezca, saca las instrucciones de un tema concreto, como las pruebas, a otros archivos o a skills, y deja en el CLAUDE.md solo una referencia que indique a Claude dónde buscar cuando haga falta. También puedes importar otros archivos desde el CLAUDE.md. Un archivo grande es costoso, y los largos reducen que se sigan las reglas.",
    },
    { type: "heading", level: 2, text: "Memoria rápida" },
    {
      type: "paragraph",
      text: "Usa `/clear` al empezar cada implementación nueva y consulta `/context` para ver qué ocupa tu contexto. No esperes a que esté casi lleno: con un uso alto el modelo se confunde con más facilidad. Una pauta práctica es pensar en compactar cuando pasas de la mitad, y Claude Code compacta por su cuenta cuando se acerca al límite.",
    },
    {
      type: "paragraph",
      text: "En CLAUDE.md van las reglas de arquitectura, los objetivos y cómo quieres que responda. ¿Y si Claude resuelve algo de una forma que no quieres y deseas que lo recuerde siempre? Dile directamente qué recordar, por ejemplo \"recuerda que siempre me respondas en español\". Claude lo guarda en su memoria automática. Si prefieres que quede en CLAUDE.md, dilo expresamente (\"añade esto a CLAUDE.md\") o edítalo tú con `/memory`. Observa qué ocurrió: aparece un aviso como \"Saved 1 memory\" y con Ctrl+O se expande el detalle.",
    },
    {
      type: "image",
      src: "/img/dia-06/claude-md-vs-memoria.svg",
      alt: "Dos columnas comparadas. CLAUDE.md: lo escribes tú, contiene reglas y arquitectura, se carga entero y está en tu usuario, proyecto o carpeta local. Memoria automática: la escribe Claude, contiene preferencias y datos que no salen del código, se cargan las primeras 200 líneas o 25 KB de MEMORY.md y vive en ~/.claude/projects.",
      caption: "CLAUDE.md y memoria automática: quién escribe, qué contienen y dónde viven.",
    },
    {
      type: "paragraph",
      text: "La memoria automática se guarda en `~/.claude/projects/<proyecto>/memory/`. Contiene un `MEMORY.md`, que es un índice con una línea por recuerdo, y un archivo por tema. Todos los subdirectorios y árboles de trabajo del mismo repositorio comparten esa carpeta, y no se comparte entre equipos ni entre máquinas. De `MEMORY.md` se cargan al empezar las primeras 200 líneas o 25 KB, lo que ocurra primero. Con `/memory` se activa o desactiva y se ven sus entradas.",
    },
    {
      type: "callout",
      variant: "info",
      text: "Si una memoria no te gusta, bórrala: son archivos de texto. Después usa `/clear` o reinicia Claude Code, porque el contexto de la sesión puede conservar lo que ya cargó. Y si no sabes dónde se guarda algo, pregúntaselo a Claude.",
    },
    { type: "heading", level: 2, text: "Entradas multimodales" },
    {
      type: "paragraph",
      text: "Empieza una conversación nueva con `/clear` para tener el contexto limpio. Claude Code acepta más que texto. Si copias una imagen y la pegas en el cuadro de mensaje con Ctrl+V (Cmd+V en iTerm2, Alt+V en Windows y WSL), aparece una referencia numerada como `[Image #1]` que puedes citar en tu mensaje. No hace falta guardar la imagen dentro del proyecto. Un texto largo pegado se muestra compactado para no ocupar todo el espacio, y se borra con Retroceso.",
    },
    {
      type: "image",
      src: "/img/dia-06/entradas-multimodales.svg",
      alt: "Cuatro formas de dar contexto: pegar una imagen, pegar un texto largo, pegar un archivo copiado y mencionar con arroba. Todas llegan al cuadro de mensaje como una referencia numerada que se envía con el texto.",
      caption: "Las entradas que Claude Code entiende además del texto.",
    },
    {
      type: "paragraph",
      text: "Si copias un archivo en el explorador y lo pegas, en lugar de pegar su contenido se pega su ruta, y Claude lee el archivo desde ahí. Eso sirve con PDF, SVG y otros formatos. Con `@` y la ruta mencionas archivos y carpetas del proyecto. Para borrar lo que escribiste, incluidas las imágenes, pulsa Esc dos veces con texto en el cuadro. Si lo único que querías era quitar un archivo, es más fácil borrar ese elemento con Retroceso.",
    },
    {
      type: "callout",
      variant: "warning",
      text: "Para cambios que tocan código, pasa antes por el modo plan y revisa lo que propone. En el ejemplo de esta clase, pedir que una imagen se implemente como un tipo de enemigo da un resultado aproximado, no exacto. Si no te convence y no hiciste un commit antes, `/rewind` permite deshacer, aunque lo posterior se pierde. Haz un commit cuando el resultado te guste.",
    },
    { type: "heading", level: 2, text: "Ejercicios guiados y experimentos" },
    {
      type: "paragraph",
      text: "Los ejercicios se hacen con Claude Code en tu equipo, sobre el proyecto mínimo o sobre otro pequeño que elijas. Los editores de código verifican en el navegador cálculos y reglas de la lección.",
    },
    {
      type: "exercise",
      title: "Ejercicio 1: preparar el proyecto de práctica",
      description: "Crea los dos archivos del proyecto mínimo. Funciona en macOS, Linux y WSL. Copia el contenido de los bloques de código de la lección.",
      steps: [
        {
          instruction: "Crea la carpeta y entra en ella.",
          command: "mkdir -p ~/ClaudeCode/03-nave && cd ~/ClaudeCode/03-nave && pwd",
          expected: "/Users/tu-usuario/ClaudeCode/03-nave\n(en Linux la ruta empieza por /home/tu-usuario)",
        },
        {
          instruction: "Crea index.html y game.js con el contenido de los bloques anteriores. Después comprueba que el JavaScript no tiene errores de sintaxis. Si usas Node.js, funciona así.",
          command: "node --check game.js && echo ok",
          expected: "ok",
        },
      ],
      verify: "Aparece ok. Si ves un error de sintaxis, revisa que copiaste game.js completo.",
    },
    {
      type: "exercise",
      title: "Ejercicio 2: pedir el mapa del proyecto",
      description: "Hazlo en modo plan para no tocar nada mientras exploras.",
      steps: [
        {
          instruction: "Inicia Claude Code en la carpeta, cambia a modo plan con Shift+Tab y comprueba el modelo con /model.",
          command: "claude",
        },
        {
          instruction: "Envía la pregunta.",
          command: "Necesito entender este proyecto: qué tecnología usa, cómo está organizado y cómo se ejecuta. No modifiques nada.",
          expected: "Un resumen con la tecnología (HTML con canvas y JavaScript sin dependencias), los archivos, la clase Ship y el bucle principal.",
        },
      ],
      verify: "Contrasta el resumen con game.js. Si algo no coincide, pregúntale por qué.",
    },
    {
      type: "exercise",
      title: "Ejercicio 3: servir el proyecto sin llenar el contexto",
      description: "Compara dos formas de ejecutar un servidor. Usa Python si lo tienes instalado.",
      steps: [
        {
          instruction: "Primero, la forma económica: en otra pestaña de la terminal, sirve la carpeta.",
          command: "python3 -m http.server 8000",
          expected: "Serving HTTP on :: port 8000 (http://[::]:8000/) ...",
        },
        {
          instruction: "Abre la dirección en el navegador. Después detén el servidor con Ctrl+C.",
          command: "open http://localhost:8000",
          expected: "La página con el canvas negro y el cuadro blanco que se mueve con las flechas.",
        },
        {
          instruction: "Ahora la forma contraria, solo para ver la diferencia: en Claude Code, lanza el servidor con el prefijo de shell, envíalo a segundo plano con Ctrl+B y mira la lista de tareas.",
          command: "!python3 -m http.server 8000",
        },
        {
          instruction: "Abre la lista de tareas en segundo plano y detén la que sigue activa.",
          command: "/tasks",
          expected: "Una lista con la tarea del servidor y su estado. Desde ahí puedes detenerla.",
        },
      ],
      verify: "Tras detener la tarea, recargar el navegador ya no carga la página. Los registros de la segunda forma entran en el contexto: es la razón de preferir la primera.",
    },
    {
      type: "exercise",
      title: "Ejercicio 4: generar el CLAUDE.md con /init",
      description: "Haz primero un /clear para empezar una conversación limpia.",
      steps: [
        {
          instruction: "Ejecuta el comando y acepta la creación del archivo cuando Claude lo pregunte.",
          command: "/init",
          expected: "Claude analiza el proyecto y propone crear CLAUDE.md con comandos y estructura.",
        },
        {
          instruction: "Abre el archivo en el editor. Lee cada línea y recorta lo que no aporte. Comprueba cuántas líneas tiene.",
          command: "wc -l CLAUDE.md",
          expected: "Un número menor de 200 seguido del nombre del archivo.",
        },
      ],
      verify: "El archivo describe cómo ejecutar el proyecto y su arquitectura, y no es largo. Si usas Git, `git diff` o el editor te muestran qué creó.",
    },
    {
      type: "exercise",
      title: "Ejercicio 5: ver tu CLAUDE.md global",
      description: "El archivo del usuario puede no existir. Si no existe, puedes crearlo con una sola regla breve.",
      steps: [
        {
          instruction: "Comprueba si existe.",
          command: "ls ~/.claude/CLAUDE.md",
          expected: "La ruta del archivo, o un aviso de que no existe.",
        },
        {
          instruction: "Pídele a Claude que te muestre su contenido y qué reglas globales tienes.",
          command: "Muéstrame mi archivo CLAUDE.md global.",
          expected: "El contenido del archivo, tras pedirte permiso para leerlo.",
        },
      ],
      verify: "Sabes qué reglas viajan en todas tus conversaciones. Si hay muchas, recórtalas.",
    },
    {
      type: "exercise",
      title: "Ejercicio 6: guardar y localizar una memoria",
      description: "Comprueba dónde guarda Claude lo que le pides recordar.",
      steps: [
        {
          instruction: "Pídele que recuerde una preferencia.",
          command: "Recuerda que siempre me respondas en español.",
          expected: "Un aviso como Saved 1 memory. Con Ctrl+O se ve el detalle.",
        },
        {
          instruction: "Abre el panel de memoria para ver las entradas y el interruptor de la memoria automática.",
          command: "/memory",
          expected: "Los archivos CLAUDE.md que se cargan y las entradas de memoria automática.",
        },
        {
          instruction: "Busca la carpeta de memoria de tus proyectos.",
          command: "ls ~/.claude/projects/",
          expected: "Una carpeta por proyecto, con el nombre derivado de la ruta.",
        },
      ],
      verify: "Dentro de la carpeta del proyecto está memory/MEMORY.md. Puedes editarlo o borrarlo si no quieres esa memoria.",
    },
    {
      type: "exercise",
      title: "Ejercicio 7: dar contexto con una imagen",
      description: "Busca o dibuja una imagen sencilla de lo que quieres, por ejemplo la silueta de un asteroide.",
      steps: [
        {
          instruction: "Empieza una conversación limpia y activa el modo plan.",
          command: "/clear",
        },
        {
          instruction: "Copia la imagen y pégala en el cuadro de mensaje con Ctrl+V (Cmd+V en iTerm2, Alt+V en Windows y WSL). Escribe después tu petición.",
          command: "Con la imagen [Image #1] como referencia, propón cómo añadir un obstáculo con esa forma a game.js.",
          expected: "Una referencia [Image #1] en el cuadro y un plan que describe los cambios a game.js.",
        },
      ],
      verify: "El plan menciona la forma de la imagen. Si ejecutas el cambio y no te gusta, vuelve atrás con /rewind o con Git.",
    },
    {
      type: "exercise",
      title: "Ejercicio 8: ver el contexto y empezar de cero",
      description: "Cierra el ciclo de trabajo con los dos comandos de higiene.",
      steps: [
        {
          instruction: "Mira qué ocupa tu contexto después de todo lo anterior.",
          command: "/context",
          expected: "Una cuadrícula con el espacio usado por categorías, incluidos los archivos de memoria y los mensajes.",
        },
        {
          instruction: "Vacía el contexto al terminar.",
          command: "/clear",
          expected: "Una conversación nueva y vacía.",
        },
      ],
      verify: "Tras `/clear`, `/context` muestra de nuevo solo la base fija, que incluye tu CLAUDE.md y la memoria.",
    },
    {
      type: "playground",
      title: "Experimento 9: ¿cuánto del contexto estás usando?",
      description: "Calcula el porcentaje de uso y avisa cuando conviene compactar. Los números de la ventana dependen del modelo: cambia el valor de la ventana y los tokens usados.",
      code: "function revisar(usados, ventana) {\n  const porcentaje = Math.round((usados / ventana) * 100);\n  if (porcentaje >= 80) return porcentaje + \"%: compacta o limpia ya\";\n  if (porcentaje >= 50) return porcentaje + \"%: piensa en compactar\";\n  return porcentaje + \"%: bien\";\n}\n\nconsole.log(revisar(30000, 200000));\nconsole.log(revisar(110000, 200000));\nconsole.log(revisar(170000, 200000));",
      expected: "15%: bien\n55%: piensa en compactar\n85%: compacta o limpia ya",
    },
    {
      type: "playground",
      title: "Experimento 10: el orden de carga de CLAUDE.md",
      description: "Los niveles se cargan de lo más general a lo más específico, así que el último que dice algo aparece más cerca de tu mensaje. Añade una regla en otro nivel y observa el orden.",
      code: "const niveles = [\n  { nombre: \"gestionada\", regla: \"cumple la politica de la empresa\" },\n  { nombre: \"usuario\", regla: \"responde en espanol\" },\n  { nombre: \"proyecto\", regla: \"usa el estilo del proyecto\" },\n  { nombre: \"local\", regla: \"usa mi base de datos de pruebas\" },\n];\n\nniveles.forEach((n, i) => console.log((i + 1) + \". \" + n.nombre + \": \" + n.regla));\nconsole.log(\"ultimo en cargarse: \" + niveles[niveles.length - 1].nombre);",
      expected: "1. gestionada: cumple la politica de la empresa\n2. usuario: responde en espanol\n3. proyecto: usa el estilo del proyecto\n4. local: usa mi base de datos de pruebas\nultimo en cargarse: local",
    },
    {
      type: "playground",
      title: "Experimento 11: cuánto de MEMORY.md se carga",
      description: "Se cargan las primeras 200 líneas o los primeros 25 KB, lo que ocurra primero. Prueba con otros tamaños.",
      code: "function cargado(lineas, kb) {\n  const porLineas = Math.min(lineas, 200);\n  const proporcion = Math.min(1, 25 / kb);\n  const porTamano = Math.floor(lineas * proporcion);\n  return Math.min(porLineas, porTamano);\n}\n\nconsole.log(cargado(120, 8));\nconsole.log(cargado(400, 10));\nconsole.log(cargado(180, 50));",
      expected: "120\n200\n90",
    },
    {
      type: "playground",
      title: "Experimento 12: ¿dónde guardo esta instrucción?",
      description: "Una función que elige el lugar adecuado según el tipo de instrucción. Añade tus propios casos.",
      code: "const donde = {\n  \"preferencia personal en todos los proyectos\": \"~/.claude/CLAUDE.md\",\n  \"regla compartida del proyecto\": \"./CLAUDE.md\",\n  \"preferencia privada del proyecto\": \"./CLAUDE.local.md\",\n  \"correccion que Claude debe aprender\": \"memoria automatica\",\n};\n\nfor (const [tipo, lugar] of Object.entries(donde)) {\n  console.log(tipo + \" => \" + lugar);\n}",
      expected: "preferencia personal en todos los proyectos => ~/.claude/CLAUDE.md\nregla compartida del proyecto => ./CLAUDE.md\npreferencia privada del proyecto => ./CLAUDE.local.md\ncorreccion que Claude debe aprender => memoria automatica",
    },
    { type: "heading", level: 2, text: "¿Qué usar en cada caso?" },
    {
      type: "table",
      headers: ["Si necesitas...", "Usa...", "Nota"],
      rows: [
        ["Entender un proyecto nuevo", "Una pregunta general en modo plan", "No modifica nada y gasta menos."],
        ["Crear el CLAUDE.md inicial", "`/init`", "Revísalo y recórtalo: debe ser breve."],
        ["Una preferencia en todos tus proyectos", "`~/.claude/CLAUDE.md`", "Muy corto, aplica a todas tus conversaciones."],
        ["Una regla del proyecto para el equipo", "`./CLAUDE.md`", "Se comparte con el control de versiones."],
        ["Una preferencia privada del proyecto", "`./CLAUDE.local.md`", "Añádelo a .gitignore."],
        ["Que Claude aprenda una corrección", "Memoria automática (\"recuerda que...\")", "Se guarda en ~/.claude/projects."],
        ["Un servidor que no termina", "Otra pestaña de la terminal", "Evita meter registros innecesarios en el contexto."],
        ["Pasar una imagen o un archivo", "Ctrl+V, `@` o pegar el archivo", "Entra como referencia numerada o como ruta."],
        ["Deshacer un experimento sin commit", "`/rewind`", "Lo posterior se pierde: usa Git para versiones valiosas."],
      ],
    },
    { type: "heading", level: 2, text: "Datos que suelen aparecer desactualizados" },
    {
      type: "table",
      headers: ["Suele decirse", "Información verificada (noviembre 2026)"],
      rows: [
        ["CLAUDE.md vive en tres lugares: el proyecto, las reglas y la carpeta de usuario.", "La documentación lista cuatro ubicaciones: política gestionada, usuario (`~/.claude/CLAUDE.md`), proyecto (`./CLAUDE.md` o `./.claude/CLAUDE.md`) y local (`./CLAUDE.local.md`). Además existen las reglas por tema en `.claude/rules/`."],
        ["Para guardar algo en memoria se escribe un signo de numeral al principio del mensaje.", "Esa instrucción no figura en la documentación actual. Se le pide a Claude que recuerde algo y lo guarda en la memoria automática. Para que quede en CLAUDE.md hay que pedirlo (\"añade esto a CLAUDE.md\") o editarlo con `/memory`."],
        ["La memoria se guarda en un único archivo del proyecto.", "Cada proyecto tiene una carpeta en `~/.claude/projects/<proyecto>/memory/` con un índice `MEMORY.md` y un archivo por tema. Es local a tu máquina y la comparten los árboles de trabajo de un mismo repositorio."],
        ["La memoria automática se carga entera.", "Solo se carga el principio de MEMORY.md: las primeras 200 líneas o 25 KB, lo que ocurra primero."],
        ["Conviene compactar al llegar al 50 por ciento del contexto.", "Es una pauta práctica, no una regla de la documentación. Claude Code compacta por sí solo cuando se acerca al límite, y `/compact` permite hacerlo antes con instrucciones."],
        ["`!` y Ctrl+B son la única forma de ver un comando largo.", "También hay `/tasks` para listar y detener las tareas en segundo plano. Lo más económico para un servidor es otra pestaña de la terminal."],
        ["Al pegar un archivo se pega su contenido.", "Se pega su ruta, y Claude lo lee desde ahí. Las imágenes se pegan con Ctrl+V (Cmd+V en iTerm2, Alt+V en Windows) y se citan como [Image #N]."],
        ["El archivo CLAUDE.md puede ser tan largo como se necesite.", "La recomendación es menos de 200 líneas por archivo. Los archivos largos consumen más contexto y reducen que se sigan las reglas."],
      ],
    },
    { type: "heading", level: 2, text: "Preguntas frecuentes" },
    {
      type: "accordion",
      items: [
        {
          title: "¿Por qué no tengo un CLAUDE.md en mi proyecto?",
          text: "Porque no se crea solo. Es un archivo que tú o Claude generan. Con `/init` lo crea a partir del código, y puedes ir ajustándolo a medida que avanzas.",
        },
        {
          title: "¿Qué diferencia hay entre CLAUDE.md y la memoria automática?",
          text: "CLAUDE.md lo escribes tú con reglas e instrucciones. La memoria automática la escribe Claude a partir de tus correcciones y preferencias. Ambos se cargan en cada conversación y ambos son contexto: no son reglas obligatorias.",
        },
        {
          title: "Pedí que respondiera en español y sigue en inglés. ¿Qué hago?",
          text: "Puede que la conversación conserve contexto anterior. Usa `/clear` o reinicia Claude Code. Si la memoria no es la que querías, ábrela con `/memory`, corrígela o bórrala.",
        },
        {
          title: "¿Es seguro aceptar la confianza en una carpeta?",
          text: "Solo si confías en su contenido: Claude Code puede leer y ejecutar cosas dentro de ella. Con repositorios desconocidos, revísalos primero.",
        },
        {
          title: "¿Puedo pegar un PDF o un SVG?",
          text: "Sí. Si copias el archivo y lo pegas, se pega su ruta y Claude lo lee desde ahí. Si no sabe abrir el formato, puede usar una skill que lo sepa.",
        },
        {
          title: "Me gustó un cambio pero luego no. ¿Cómo vuelvo?",
          text: "Si no hiciste commit, `/rewind` restaura el código y la conversación a un punto anterior, pero lo posterior se pierde. Si ya hiciste commit, vuelves con Git. Por eso conviene hacer commits cuando algo funciona.",
        },
      ],
    },
    { type: "heading", level: 2, text: "Qué sigue" },
    {
      type: "paragraph",
      text: "El Día 7 usa todo esto para trabajar de verdad: corregir errores, que Claude Code lea el estado de Git y aprovecharlo, e implementar una función nueva con un flujo de ramas básico. Con eso termina la sección de fundamentos.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 7, verifica que puedes explicar...",
      items: [
        "Cómo pedirle a Claude un mapa de un proyecto nuevo y cómo contrastarlo con el código.",
        "Por qué no conviene ejecutar un servidor infinito dentro del contexto y qué alternativas hay.",
        "Qué hace `/init` y por qué hay que revisar y recortar lo que genera.",
        "Las cuatro ubicaciones de CLAUDE.md y cuál usar para cada instrucción.",
        "La diferencia entre CLAUDE.md y la memoria automática, y dónde se guarda esta.",
        "Cómo pegar una imagen o un archivo y cómo mencionar rutas con `@`.",
        "Por qué conviene un commit antes de experimentar, aunque exista `/rewind`.",
      ],
    },
    { type: "heading", level: 2, text: "Fuentes consultadas (noviembre 2026)" },
    {
      type: "list",
      items: [
        "[Cómo recuerda Claude tu proyecto: CLAUDE.md y memoria automática](https://code.claude.com/docs/en/memory)",
        "[Modo interactivo: atajos, segundo plano y pegado](https://code.claude.com/docs/en/interactive-mode)",
        "[Referencia de comandos](https://code.claude.com/docs/en/commands)",
        "[Buenas prácticas para Claude Code](https://code.claude.com/docs/en/best-practices)",
        "[Explorar la ventana de contexto](https://code.claude.com/docs/en/context-window)",
        "[Puntos de control y rebobinado](https://code.claude.com/docs/en/checkpointing)",
        "[Gestión de sesiones](https://code.claude.com/docs/en/sessions)",
        "[Cómo funciona Claude Code](https://code.claude.com/docs/en/how-claude-code-works)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "¿Qué hace `/init`?",
      options: [
        "Borra el contexto",
        "Analiza el proyecto y genera un CLAUDE.md inicial, o sugiere mejoras si ya existe",
        "Instala Claude Code",
        "Reinicia el modelo",
      ],
      correctIndex: 1,
      explanation: "`/init` analiza el código y crea un CLAUDE.md con comandos, estructura y convenciones. Si ya existe, propone mejoras en lugar de sobrescribirlo.",
    },
    {
      question: "¿Cuál de estas es una ubicación válida de CLAUDE.md?",
      options: ["~/.claude/CLAUDE.md", "~/Documentos/CLAUDE.md", "/tmp/CLAUDE.md", "~/.claude/skills/CLAUDE.md"],
      correctIndex: 0,
      explanation: "La ubicación de usuario es ~/.claude/CLAUDE.md. Las otras ubicaciones válidas son la política gestionada, el proyecto (./CLAUDE.md o ./.claude/CLAUDE.md) y el archivo local (./CLAUDE.local.md).",
    },
    {
      question: "¿Para qué sirve CLAUDE.local.md?",
      options: [
        "Para compartir reglas con el equipo",
        "Para preferencias privadas de un proyecto, y se añade a .gitignore",
        "Para guardar la memoria automática",
        "Para configurar el modelo",
      ],
      correctIndex: 1,
      explanation: "Es el archivo local del proyecto: preferencias personales que no se versionan. Debe ir en .gitignore para no subirlo.",
    },
    {
      question: "¿Cuántas líneas se recomienda como máximo para un CLAUDE.md?",
      options: ["20", "200", "2 000", "No hay límite recomendado"],
      correctIndex: 1,
      explanation: "La documentación recomienda menos de 200 líneas: los archivos largos consumen más contexto y reducen que se sigan las reglas.",
    },
    {
      question: "¿Quién escribe la memoria automática?",
      options: ["Tú, a mano", "Claude, a partir de tus correcciones y preferencias", "El editor", "Git"],
      correctIndex: 1,
      explanation: "Tú escribes CLAUDE.md. La memoria automática la escribe Claude cuando decide que algo merece recordarse o cuando le pides que lo recuerde.",
    },
    {
      question: "¿Dónde se guarda la memoria automática de un proyecto?",
      options: [
        "En ./CLAUDE.md",
        "En ~/.claude/projects/<proyecto>/memory/",
        "En la nube de Anthropic únicamente",
        "En el archivo package.json",
      ],
      correctIndex: 1,
      explanation: "Cada proyecto tiene su carpeta en ~/.claude/projects/<proyecto>/memory/, con un MEMORY.md como índice y un archivo por tema.",
    },
    {
      question: "¿Cuánto de MEMORY.md se carga al empezar una conversación?",
      options: [
        "Todo, sin importar el tamaño",
        "Las primeras 200 líneas o 25 KB, lo que ocurra primero",
        "Solo la última línea",
        "Nada: hay que pedirlo",
      ],
      correctIndex: 1,
      explanation: "Se cargan las primeras 200 líneas o los primeros 25 KB, lo que llegue antes. Lo que sobra no se carga al empezar.",
    },
    {
      question: "Lanzaste un servidor con el prefijo de shell y quieres seguir trabajando. ¿Qué haces?",
      options: [
        "Cerrar Claude Code",
        "Pulsar Ctrl+B para enviarlo a segundo plano y usar /tasks para verlo o detenerlo",
        "Esperar a que termine",
        "Reiniciar el equipo",
      ],
      correctIndex: 1,
      explanation: "Ctrl+B envía el comando a segundo plano y /tasks lista y permite detener las tareas. Aun así, lo más económico es ejecutar el servidor en otra pestaña de la terminal.",
    },
    {
      question: "Copias un archivo en el explorador y lo pegas en el cuadro de mensaje. ¿Qué se pega?",
      options: [
        "El contenido completo del archivo",
        "La ruta del archivo, que Claude lee desde ahí",
        "Una captura de pantalla del archivo",
        "Nada",
      ],
      correctIndex: 1,
      explanation: "Se pega la ruta, y Claude lee el archivo. Las imágenes copiadas se pegan con Ctrl+V y aparecen como una referencia numerada.",
    },
    {
      question: "Pediste implementar algo desde una imagen y no te gustó. No hiciste commit. ¿Qué te permite volver?",
      options: [
        "No se puede deshacer",
        "El rebobinado con /rewind o Esc dos veces, sabiendo que lo posterior se pierde",
        "Reinstalar Claude Code",
        "Borrar el contexto con /clear",
      ],
      correctIndex: 1,
      explanation: "El rebobinado restaura código y conversación a un punto anterior, pero descarta lo posterior. Para conservar versiones valiosas, haz commits. `/clear` solo vacía el contexto, no deshace archivos.",
    },
  ],
};
