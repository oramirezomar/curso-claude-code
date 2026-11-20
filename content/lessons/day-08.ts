import type { Lesson } from "@/lib/types";
// Día 8 · Clases 30, 32 y 33 de la transcripción (el artículo 31 solo resume los temas de la sección).
// Contenido verificado en noviembre de 2026.
export const day08: Lesson = {
  day: 8,
  slug: "primer-proyecto-y-comandos-iniciales",
  title: "Primer proyecto y comandos iniciales",
  section: "Flujo de trabajo",
  estimatedMinutes: 60,
  icon: "🧰",
  objectives: [
    "Explicar qué se hará en la sección de flujo de trabajo y por qué hay que entender el código que Claude propone.",
    "Traer un proyecto con fork y git clone, ponerle un nombre de carpeta propio y abrir Claude Code dentro.",
    "Ejecutar /init, revisar el CLAUDE.md resultante y preguntar por la base de código sin modificar nada.",
    "Usar los atajos del cuadro de mensaje (barra inclinada, signo de exclamación y arroba) y saber cuáles ya no existen.",
    "Recorrer los comandos iniciales: /config, /permissions, /theme, /model, /statusline y /doctor.",
  ],
  blocks: [
    {
      type: "paragraph",
      text: "Con los fundamentos resueltos, empieza la parte práctica del día a día. Esta sección trabaja sobre un proyecto pequeño, un Tetris en el navegador, y avanza por etapas: comandos básicos, integración con GitHub, corrección de errores y funciones nuevas. Este día cubre el arranque: cómo traer un proyecto ajeno a tu equipo, cómo presentárselo a Claude Code con /init, cómo preguntarle por el código y qué hace cada comando inicial.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "04-tetris", label: "Carpeta del proyecto de la sección" },
        { value: "/init", label: "Crea el archivo CLAUDE.md a partir del código" },
        { value: "200", label: "Líneas como máximo recomendado para un CLAUDE.md" },
        { value: "0", label: "Tokens de API que gasta la barra de estado al ejecutarse" },
        { value: "60%", label: "Contexto que conviene no superar, como regla práctica" },
        { value: "/doctor", label: "Revisa instalación y ajustes, y propone arreglos" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text: "Contenido verificado en noviembre de 2026 contra las páginas oficiales de modo interactivo, comandos, barra de estado, configuración del terminal, ajustes, memoria, seguridad y GitHub Actions de Claude Code. Los comandos de Git y el servidor local de los ejercicios se ejecutaron en un equipo de prueba, y el juego de este día se probó en un navegador: movimiento, rotación, borrado de líneas y fin de la partida.",
    },
    {
      type: "callout",
      variant: "warning",
      text: "Si trabajas con modelos locales de Ollama, la parte de GitHub de la sección (Día 10 en adelante) necesita una suscripción o una clave de API de Claude en el repositorio, así que no se reproduce al pie de la letra. Lo demás se puede seguir en local, y los mensajes que usarías en los issues sirven como mensajes para tu Claude Code local.",
    },
    { type: "heading", level: 2, text: "Por qué entender el código sigue importando" },
    {
      type: "paragraph",
      text: "Se puede pedir casi todo a Claude Code: \"haz esto\", \"implementa aquello\". Aun así, Claude propone lo que cree que encaja con lo que ve, y tú decides si encaja con lo que necesitas. Cuanto más sepas del lenguaje y de la estructura del proyecto, mejor lo dirigirás. En este proyecto, por ejemplo, las piezas del juego son un arreglo de arreglos: una pieza nueva solo funciona si respeta ese formato. Aceptar sin leer lleva a código que no sabes mantener, y entender qué pasa te permite redirigir la conversación cuando algo se desvía.",
    },
    { type: "heading", level: 2, text: "El proyecto de la sección: un Tetris pequeño" },
    {
      type: "paragraph",
      text: "Para no depender de un repositorio externo, usa esta versión mínima. Son dos archivos: la página y la lógica del juego. Guárdalos en la carpeta `~/ClaudeCode/04-tetris`. Las piezas están definidas en el objeto `PIEZAS`: cada una tiene un color y una matriz de unos y ceros que dibuja su forma.",
    },
    {
      type: "code",
      lang: "html",
      title: "index.html",
      code: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Tetris</title>
  <style>
    body { background: #111; color: #eee; font-family: sans-serif; text-align: center; }
    canvas { background: #000; border: 2px solid #444; }
  </style>
</head>
<body>
  <h1>Tetris</h1>
  <p>Puntos: <span id="puntos">0</span></p>
  <canvas id="tablero" width="240" height="480"></canvas>
  <p>Flechas: mover y rotar. Espacio: caer.</p>
  <script src="game.js"></script>
</body>
</html>`,
    },
    {
      type: "code",
      lang: "js",
      title: "game.js",
      code: `const COLUMNAS = 10;
const FILAS = 20;
const TAMANO = 24;
const PUNTOS_POR_LINEAS = [0, 100, 300, 500, 800];

const PIEZAS = {
  I: { color: "#00bcd4", forma: [[1, 1, 1, 1]] },
  O: { color: "#fdd835", forma: [[1, 1], [1, 1]] },
  T: { color: "#9c27b0", forma: [[0, 1, 0], [1, 1, 1]] },
  S: { color: "#4caf50", forma: [[0, 1, 1], [1, 1, 0]] },
  Z: { color: "#f44336", forma: [[1, 1, 0], [0, 1, 1]] },
  J: { color: "#3f51b5", forma: [[1, 0, 0], [1, 1, 1]] },
  L: { color: "#ff9800", forma: [[0, 0, 1], [1, 1, 1]] },
};

const ctx = document.getElementById("tablero").getContext("2d");
let tablero = Array.from({ length: FILAS }, () => Array(COLUMNAS).fill(null));
let puntos = 0;
let terminado = false;
let pieza = nuevaPieza();

function nuevaPieza() {
  const nombres = Object.keys(PIEZAS);
  const nombre = nombres[Math.floor(Math.random() * nombres.length)];
  const { color, forma } = PIEZAS[nombre];
  return { color, forma, x: Math.floor((COLUMNAS - forma[0].length) / 2), y: 0 };
}

function colisiona(forma, x, y) {
  return forma.some((fila, j) =>
    fila.some((celda, i) => {
      if (!celda) return false;
      const fx = x + i;
      const fy = y + j;
      return fx < 0 || fx >= COLUMNAS || fy >= FILAS || (fy >= 0 && tablero[fy][fx]);
    })
  );
}

function limpiarLineas() {
  const restantes = tablero.filter((fila) => fila.some((celda) => !celda));
  const borradas = FILAS - restantes.length;
  while (restantes.length < FILAS) restantes.unshift(Array(COLUMNAS).fill(null));
  tablero = restantes;
  puntos += PUNTOS_POR_LINEAS[borradas];
  document.getElementById("puntos").textContent = puntos;
}

function fijar() {
  pieza.forma.forEach((fila, j) =>
    fila.forEach((celda, i) => {
      if (celda) tablero[pieza.y + j][pieza.x + i] = pieza.color;
    })
  );
  limpiarLineas();
  pieza = nuevaPieza();
  if (colisiona(pieza.forma, pieza.x, pieza.y)) terminado = true;
}

function mover(dx, dy) {
  if (colisiona(pieza.forma, pieza.x + dx, pieza.y + dy)) return false;
  pieza.x += dx;
  pieza.y += dy;
  return true;
}

function bajar() {
  if (!mover(0, 1)) fijar();
}

function rotar() {
  const rotada = pieza.forma[0].map((_, i) => pieza.forma.map((fila) => fila[i]).reverse());
  if (!colisiona(rotada, pieza.x, pieza.y)) pieza.forma = rotada;
}

function caer() {
  while (mover(0, 1));
  fijar();
}

function celda(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * TAMANO, y * TAMANO, TAMANO - 1, TAMANO - 1);
}

function dibujar() {
  ctx.clearRect(0, 0, COLUMNAS * TAMANO, FILAS * TAMANO);
  tablero.forEach((fila, y) => fila.forEach((color, x) => color && celda(x, y, color)));
  pieza.forma.forEach((fila, j) =>
    fila.forEach((c, i) => c && celda(pieza.x + i, pieza.y + j, pieza.color))
  );
  if (terminado) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, COLUMNAS * TAMANO, FILAS * TAMANO);
    ctx.fillStyle = "#fff";
    ctx.font = "24px sans-serif";
    ctx.fillText("Fin del juego", 50, 240);
  }
}

document.addEventListener("keydown", (e) => {
  if (terminado) return;
  if (e.key === "ArrowLeft") mover(-1, 0);
  else if (e.key === "ArrowRight") mover(1, 0);
  else if (e.key === "ArrowDown") bajar();
  else if (e.key === "ArrowUp") rotar();
  else if (e.code === "Space") caer();
  dibujar();
});

setInterval(() => {
  if (!terminado) bajar();
  dibujar();
}, 500);
dibujar();`,
    },
    {
      type: "paragraph",
      text: "El juego se mueve con las flechas izquierda y derecha, la flecha arriba rota la pieza, la flecha abajo la baja una fila y la barra espaciadora la deja caer. Cada vez que se completa una línea se borra y suma puntos: 100 por una, 300 por dos, 500 por tres y 800 por cuatro. Cuando una pieza nueva no cabe, aparece el cartel de fin del juego.",
    },
    { type: "heading", level: 2, text: "Traer un proyecto ajeno: fork y clon" },
    {
      type: "paragraph",
      text: "Si el proyecto es de otra persona, el flujo habitual es hacer un fork: una copia del repositorio en tu cuenta de GitHub. Trabajas y haces cambios en tu copia, y el original no se toca. Es el paso previo a integrar el repositorio con GitHub más adelante. En la página del repositorio pulsa el botón Fork, deja el nombre que prefieras y comprueba que el repositorio nuevo aparece bajo tu usuario y con una nota que indica de dónde se bifurcó. Si usas la herramienta de línea de comandos de GitHub, `gh repo fork propietario/repositorio --clone` hace el fork y el clon en un solo paso.",
    },
    {
      type: "paragraph",
      text: "Después copia la dirección del botón verde Code, siempre de tu copia y no del original, y clónala. Pásale a `git clone` un segundo argumento para elegir el nombre de la carpeta: `git clone URL 04-tetris`. Eso cambia solo la carpeta de tu equipo. El nombre del repositorio en GitHub no se modifica.",
    },
    {
      type: "image",
      src: "/img/dia-08/flujo-primer-proyecto.svg",
      alt: "Cinco pasos en fila: traer el código con fork y clon, ponerle carpeta propia, abrir Claude en la carpeta, ejecutar /init para crear el CLAUDE.md y hacer preguntas sobre el código. Debajo, dos recuadros: qué revisar al abrir Claude Code y qué debe tener un buen CLAUDE.md.",
      caption: "Del repositorio ajeno a las primeras preguntas sobre el código.",
    },
    {
      type: "callout",
      variant: "warning",
      text: "Un repositorio ajeno es código ajeno. Antes de abrir Claude Code en él, lee el README y revisa qué contiene. La documentación de seguridad explica que Claude Code muestra un diálogo de confianza al abrir una carpeta nueva, y que los archivos de un repositorio pueden ejecutar cosas en tu equipo. Acepta ese diálogo solo cuando conozcas el origen.",
    },
    { type: "heading", level: 2, text: "Primera sesión: abrir, /init y revisar" },
    {
      type: "paragraph",
      text: "Entra en la carpeta y escribe `claude`. Si la carpeta es nueva para ti, aparece el diálogo de confianza. Al abrir, fíjate en el modelo activo. Con `/model` ves cuál está seleccionado y puedes cambiarlo. El valor por defecto depende de tu plan y de lo que haya configurado tu organización, y los alias `opus`, `sonnet` y `haiku` apuntan a la versión más reciente disponible en tu proveedor, así que lo que usabas en otro proyecto puede no coincidir. Mirarlo al empezar evita sorpresas de costo.",
    },
    {
      type: "paragraph",
      text: "Lo primero que conviene hacer en un proyecto nuevo es `/init`. Claude explora el código, lee el README y los archivos principales, deduce la estructura y las convenciones, y escribe un `CLAUDE.md` en la raíz. Te pide permiso para editar el archivo. Puedes aprobarlo solo esta vez o activar la edición automática de la sesión con Shift+Tab. Si ejecutas `CLAUDE_CODE_NEW_INIT=1 claude`, `/init` usa un flujo interactivo que además recorre skills, hooks y archivos de memoria personal.",
    },
    {
      type: "paragraph",
      text: "El `CLAUDE.md` se lee al inicio de cada sesión y forma parte del contexto, por eso importa lo que contiene. Ábrelo y revisa que sea cierto: cómo se ejecuta el proyecto, dónde están los archivos y qué convenciones hay. Para este Tetris, lo normal es que diga que no hace falta compilar y que se abre `index.html` o se sirve la carpeta con un servidor local. El contenido puede variar, porque lo escribe el modelo. La guía recomienda mantenerlo por debajo de 200 líneas: un archivo más largo consume más contexto y reduce el seguimiento de las instrucciones. Cuando el proyecto crezca, actualízalo.",
    },
    { type: "heading", level: 3, text: "Preguntar por la base de código" },
    {
      type: "paragraph",
      text: "Con el `CLAUDE.md` listo, vacía la conversación con `/clear` y pregunta. Es una forma barata de aprender un proyecto: \"¿cómo se crean las piezas y sus formas?\". Claude lee `game.js` y suele citar las líneas donde está la definición. Una segunda pregunta útil: \"¿se puede añadir una pieza nueva con esta estructura?\". La respuesta es que sí: basta con una entrada más en `PIEZAS`, por ejemplo una pieza en forma de U con la matriz `[[1, 0, 1], [1, 1, 1]]`. Claude puede ofrecerse a agregarla. Si solo era una pregunta, di que no.",
    },
    {
      type: "paragraph",
      text: "Un detalle sobre costos: una configuración que hace las respuestas más breves, como `/output-style concise`, reduce los tokens de salida a cambio de unos pocos tokens de entrada adicionales. Como los de salida cuestan más que los de entrada, suele compensar. Pruébalo y mide con lo que viste en el Día 3.",
    },
    { type: "heading", level: 2, text: "Atajos del cuadro de mensaje" },
    {
      type: "paragraph",
      text: "Antes de los comandos con barra, el cuadro de mensaje tiene atajos propios. Los vigentes en la documentación son estos: la barra inclinada al inicio para comandos y skills, el signo de exclamación al inicio para el modo shell, la arroba para mencionar archivos y carpetas, y los dos puntos para emojis. Con `?` en un cuadro vacío se abre el panel de ayuda con todos los atajos de tu terminal, que es más fiable que cualquier hoja impresa, porque los atajos cambian entre versiones.",
    },
    {
      type: "image",
      src: "/img/dia-08/atajos-del-prompt.svg",
      alt: "Cuatro recuadros con atajos: la barra inclinada para comandos y skills, el signo de exclamación para el modo shell, la arroba para archivos y carpetas, y Ctrl+B para segundo plano. Debajo, un aviso sobre atajos antiguos como la almohadilla y el ampersand, y sobre el costo del modo shell.",
      caption: "Los atajos del cuadro de mensaje y los que ya no figuran en la documentación.",
    },
    {
      type: "list",
      items: [
        "`/` al inicio: abre la lista de comandos y de skills. Puedes empezar a escribir y completar con Tab.",
        "`!` al inicio: modo shell. Ejecuta el comando directamente, añade la salida a la conversación y deja que Claude responda a ella. Por ejemplo `! git status`.",
        "`@`: menciona un archivo o una carpeta con autocompletado y le da foco a Claude sobre lo que te interesa.",
        "Ctrl+B: pasa a segundo plano un comando de Bash en ejecución. `/tasks` lista lo que corre.",
        "Para varias líneas: `\\` y Enter funciona en todas partes, Ctrl+J también, y Shift+Enter depende de tu terminal.",
      ],
    },
    {
      type: "paragraph",
      text: "El modo shell es cómodo, pero todo lo que imprime pasa a formar parte del contexto, y eso cuesta tokens. Un servidor de desarrollo que escribe una línea por cada petición llenaría la conversación de ruido. Es mejor levantarlo en otra terminal, y si necesitas que Claude vea un fallo, copia solo las líneas de error en lugar de toda la salida. La regla general es hacer tú lo que no necesite inteligencia.",
    },
    {
      type: "callout",
      variant: "info",
      text: "En el video se muestran dos atajos que ya no figuran en la lista actual: la almohadilla al inicio para guardar una nota en la memoria, y el ampersand al inicio para mandar una tarea a segundo plano. Para lo primero, pide a Claude \"recuerda que...\" o abre `/memory`. Para lo segundo, usa `/background` (alias `/bg`) o Ctrl+B. Si los escribes hoy, serán simplemente texto del mensaje.",
    },
    { type: "heading", level: 2, text: "Comandos iniciales" },
    {
      type: "paragraph",
      text: "No hace falta usar todos, pero conviene saber que existen. Escribe `/` y las primeras letras: el menú filtra, y cuando aparece el comando que buscas, Tab o Enter lo completan. La lista cambia con las versiones, así que consulta la referencia de comandos cuando algo no aparezca.",
    },
    {
      type: "image",
      src: "/img/dia-08/comandos-iniciales.svg",
      alt: "Cuatro recuadros con comandos agrupados: proyecto y cuenta con init, login, logout y model; ajustes con config, permissions, theme y terminal-setup; diagnóstico y barra de estado con doctor, statusline y status; e integraciones con mcp, hooks, chrome e install-github-app.",
      caption: "Los comandos iniciales, agrupados según su uso.",
    },
    {
      type: "table",
      headers: ["Comando", "Qué hace", "Detalle útil"],
      rows: [
        ["`/init`", "Crea el CLAUDE.md del proyecto", "Revisa el resultado. No lo dejes crecer sin control."],
        ["`/login` y `/logout`", "Inicia y cierra sesión", "Cierra sesión en equipos que dejas de usar, para que nadie gaste tu cuota."],
        ["`/config`", "Abre el panel de ajustes", "Tiene búsqueda y alias `/settings`. Con `/config clave=valor` cambias un ajuste directamente. Esc sale sin cambiar nada."],
        ["`/permissions`", "Gestiona las reglas de permitir, preguntar y denegar", "Muestra las reglas por ámbito y los directorios de trabajo. Si diste un permiso de más, quítalo aquí."],
        ["`/model`", "Cambia el modelo y su nivel de esfuerzo", "Guarda tu elección como valor por defecto. Con la tecla s en una fila lo cambias solo para la sesión."],
        ["`/theme`", "Cambia el tema de colores", "Incluye un modo automático, temas claros y oscuros, versiones para daltonismo y temas propios en `~/.claude/themes/`."],
        ["`/terminal-setup`", "Instala el atajo Shift+Enter", "Se usa una vez en VS Code, Cursor, Zed y Alacritty anterior a la 0.16."],
        ["`/statusline`", "Configura la barra de estado", "Describe lo que quieres ver y Claude escribe el script."],
        ["`/doctor`", "Revisa instalación, ajustes y extensiones", "Propone arreglos que se aplican después de que los confirmes."],
        ["`/mcp`, `/hooks`, `/chrome`", "Servidores MCP, hooks y Claude en Chrome", "Se ven más adelante en el curso."],
        ["`/install-github-app`", "Instala la aplicación de GitHub", "Solo para repositorios de github.com. Se usa en el Día 10."],
      ],
    },
    { type: "heading", level: 3, text: "La barra de estado" },
    {
      type: "paragraph",
      text: "`/statusline` muestra información útil bajo el cuadro de mensaje: el modelo, el directorio, la rama de Git y, sobre todo, el porcentaje de contexto usado. Describe en lenguaje natural lo que quieres, por ejemplo \"muestra el modelo y el porcentaje de contexto\", y Claude genera un script en `~/.claude/` y añade el campo `statusLine` a tu `settings.json`. Generar el script sí consume tokens, porque lo hace el modelo. Pero una vez creado, la barra se ejecuta en tu equipo y no consume tokens de API. El video indica lo contrario, y vale la pena precisarlo.",
    },
    {
      type: "image",
      src: "/img/dia-08/barra-de-estado.svg",
      alt: "Una terminal con una barra de estado que muestra el modelo, la carpeta, la rama y el contexto en 10 por ciento. Debajo, tres recuadros: generar la barra con /statusline gasta tokens una vez, usarla no consume tokens de API porque corre en local, y qué vigilar: el porcentaje de contexto, sin pasar del 60 por ciento.",
      caption: "Generar la barra cuesta unos tokens. Usarla es gratis.",
    },
    {
      type: "code",
      lang: "json",
      title: "~/.claude/settings.json (fragmento)",
      code: `{\n  "statusLine": {\n    "type": "command",\n    "command": "~/.claude/statusline.sh"\n  }\n}`,
    },
    {
      type: "paragraph",
      text: "Vigila el porcentaje de contexto. No hay una cifra mágica, pero a más contexto más tokens por mensaje y más riesgo de que se pierdan detalles. Una regla práctica es procurar no pasar del 60 por ciento y vaciar con `/clear` entre tareas. En Windows, `~/.claude` es `%USERPROFILE%\\.claude`. Para quitar la barra, pide a Claude `/statusline` que la elimine, o borra el campo `statusLine` del archivo.",
    },
    { type: "heading", level: 3, text: "Si algo falla en los ajustes" },
    {
      type: "paragraph",
      text: "Si un archivo de ajustes queda mal formado, por ejemplo por una coma de más, Claude Code lo detecta y te sugiere ejecutar `/doctor`. El comando hace una revisión de la instalación, los ajustes, las extensiones y el `CLAUDE.md`, y propone arreglos que Claude aplica solo después de que los confirmes. Esto reemplaza el atajo con la tecla F del video. Desde la terminal, `claude doctor` imprime un diagnóstico de solo lectura sin abrir una sesión, que sirve cuando Claude no arranca. Si el arreglo es trivial, corregirlo a mano gasta menos que pedírselo al modelo.",
    },
    {
      type: "paragraph",
      text: "Sobre Shift+Enter: en terminales como Ghostty, Kitty, iTerm2, WezTerm, Warp y Windows Terminal reciente funciona sin configurar. En VS Code, Cursor, Zed y Alacritty anterior a la 0.16 hay que ejecutar `/terminal-setup` una vez. En gnome-terminal y en los IDE de JetBrains no está disponible, y ahí se usa Ctrl+J o `\\` seguido de Enter. El video dice que este comando ya no hace falta, pero la documentación actual aún lo necesita en algunos editores.",
    },
    { type: "heading", level: 2, text: "Ejercicios guiados y experimentos" },
    {
      type: "paragraph",
      text: "Los ejercicios se hacen en tu equipo con el Tetris de este día. Los comandos de Git y el servidor local de los ejercicios 2 y 3 los ejecuté en un equipo de prueba. Lo que dice Claude Code en los ejercicios 4 a 9 es orientativo, porque depende del modelo. Los cálculos de los experimentos del final se ejecutan en el navegador.",
    },
    {
      type: "exercise",
      title: "Ejercicio 1: crear el proyecto",
      description: "Crea la carpeta y guarda los dos archivos de este día.",
      steps: [
        {
          instruction: "Crea la carpeta del proyecto y entra en ella.",
          command: "mkdir -p ~/ClaudeCode/04-tetris && cd ~/ClaudeCode/04-tetris",
        },
        {
          instruction: "Guarda index.html con el código de la lección.",
          file: { name: "index.html", code: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Tetris</title>
  <style>
    body { background: #111; color: #eee; font-family: sans-serif; text-align: center; }
    canvas { background: #000; border: 2px solid #444; }
  </style>
</head>
<body>
  <h1>Tetris</h1>
  <p>Puntos: <span id="puntos">0</span></p>
  <canvas id="tablero" width="240" height="480"></canvas>
  <p>Flechas: mover y rotar. Espacio: caer.</p>
  <script src="game.js"></script>
</body>
</html>` },
        },
        {
          instruction: "Guarda game.js con el código de la lección.",
          file: { name: "game.js", code: `const COLUMNAS = 10;
const FILAS = 20;
const TAMANO = 24;
const PUNTOS_POR_LINEAS = [0, 100, 300, 500, 800];

const PIEZAS = {
  I: { color: "#00bcd4", forma: [[1, 1, 1, 1]] },
  O: { color: "#fdd835", forma: [[1, 1], [1, 1]] },
  T: { color: "#9c27b0", forma: [[0, 1, 0], [1, 1, 1]] },
  S: { color: "#4caf50", forma: [[0, 1, 1], [1, 1, 0]] },
  Z: { color: "#f44336", forma: [[1, 1, 0], [0, 1, 1]] },
  J: { color: "#3f51b5", forma: [[1, 0, 0], [1, 1, 1]] },
  L: { color: "#ff9800", forma: [[0, 0, 1], [1, 1, 1]] },
};

const ctx = document.getElementById("tablero").getContext("2d");
let tablero = Array.from({ length: FILAS }, () => Array(COLUMNAS).fill(null));
let puntos = 0;
let terminado = false;
let pieza = nuevaPieza();

function nuevaPieza() {
  const nombres = Object.keys(PIEZAS);
  const nombre = nombres[Math.floor(Math.random() * nombres.length)];
  const { color, forma } = PIEZAS[nombre];
  return { color, forma, x: Math.floor((COLUMNAS - forma[0].length) / 2), y: 0 };
}

function colisiona(forma, x, y) {
  return forma.some((fila, j) =>
    fila.some((celda, i) => {
      if (!celda) return false;
      const fx = x + i;
      const fy = y + j;
      return fx < 0 || fx >= COLUMNAS || fy >= FILAS || (fy >= 0 && tablero[fy][fx]);
    })
  );
}

function limpiarLineas() {
  const restantes = tablero.filter((fila) => fila.some((celda) => !celda));
  const borradas = FILAS - restantes.length;
  while (restantes.length < FILAS) restantes.unshift(Array(COLUMNAS).fill(null));
  tablero = restantes;
  puntos += PUNTOS_POR_LINEAS[borradas];
  document.getElementById("puntos").textContent = puntos;
}

function fijar() {
  pieza.forma.forEach((fila, j) =>
    fila.forEach((celda, i) => {
      if (celda) tablero[pieza.y + j][pieza.x + i] = pieza.color;
    })
  );
  limpiarLineas();
  pieza = nuevaPieza();
  if (colisiona(pieza.forma, pieza.x, pieza.y)) terminado = true;
}

function mover(dx, dy) {
  if (colisiona(pieza.forma, pieza.x + dx, pieza.y + dy)) return false;
  pieza.x += dx;
  pieza.y += dy;
  return true;
}

function bajar() {
  if (!mover(0, 1)) fijar();
}

function rotar() {
  const rotada = pieza.forma[0].map((_, i) => pieza.forma.map((fila) => fila[i]).reverse());
  if (!colisiona(rotada, pieza.x, pieza.y)) pieza.forma = rotada;
}

function caer() {
  while (mover(0, 1));
  fijar();
}

function celda(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * TAMANO, y * TAMANO, TAMANO - 1, TAMANO - 1);
}

function dibujar() {
  ctx.clearRect(0, 0, COLUMNAS * TAMANO, FILAS * TAMANO);
  tablero.forEach((fila, y) => fila.forEach((color, x) => color && celda(x, y, color)));
  pieza.forma.forEach((fila, j) =>
    fila.forEach((c, i) => c && celda(pieza.x + i, pieza.y + j, pieza.color))
  );
  if (terminado) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, COLUMNAS * TAMANO, FILAS * TAMANO);
    ctx.fillStyle = "#fff";
    ctx.font = "24px sans-serif";
    ctx.fillText("Fin del juego", 50, 240);
  }
}

document.addEventListener("keydown", (e) => {
  if (terminado) return;
  if (e.key === "ArrowLeft") mover(-1, 0);
  else if (e.key === "ArrowRight") mover(1, 0);
  else if (e.key === "ArrowDown") bajar();
  else if (e.key === "ArrowUp") rotar();
  else if (e.code === "Space") caer();
  dibujar();
});

setInterval(() => {
  if (!terminado) bajar();
  dibujar();
}, 500);
dibujar();` },
        },
        {
          instruction: "Comprueba que están los dos archivos.",
          command: "ls",
          expected: "game.js\nindex.html",
        },
      ],
      verify: "La carpeta tiene exactamente esos dos archivos. Si copiaste el código a mano, revisa que no falte ninguna llave.",
    },
    {
      type: "exercise",
      title: "Ejercicio 2: jugar en el navegador",
      description: "Sirve la carpeta con un servidor local y prueba el juego.",
      steps: [
        {
          instruction: "Levanta un servidor solo en tu equipo. Si el puerto 8000 está ocupado, usa otro número.",
          command: "python3 -m http.server 8000 --bind 127.0.0.1",
          expected: "Serving HTTP on 127.0.0.1 port 8000 (http://127.0.0.1:8000/) ...",
        },
        {
          instruction: "Abre la dirección en el navegador y juega un rato con las flechas y la barra espaciadora.",
          command: "http://127.0.0.1:8000/index.html",
          expected: "Aparece el tablero. La pieza baja sola, se mueve con las flechas, rota con la flecha arriba y cae con la barra.",
        },
        {
          instruction: "Detén el servidor con Ctrl+C cuando termines.",
        },
      ],
      verify: "Puedes perder la partida y ver el cartel de fin del juego. Dejar el servidor en una terminal aparte es lo que se hará en el resto de la sección.",
    },
    {
      type: "exercise",
      title: "Ejercicio 3: clonar con otro nombre de carpeta",
      description: "Practica el clon con un repositorio local, sin necesidad de usar GitHub todavía.",
      steps: [
        {
          instruction: "Crea un repositorio de origen con un commit.",
          command: "cd /tmp && git init -b main origen && cd origen && echo hola > leeme.txt && git add leeme.txt && git commit -m \"feat: primer commit\" && cd ..",
          expected: "Initialized empty Git repository in /tmp/origen/.git/\n[main (root-commit) abc1234] feat: primer commit\n 1 file changed, 1 insertion(+)\n create mode 100644 leeme.txt",
        },
        {
          instruction: "Clónalo eligiendo el nombre de la carpeta destino.",
          command: "git clone origen 04-clon",
          expected: "Cloning into '04-clon'...\ndone.",
        },
        {
          instruction: "Comprueba de dónde viene la copia y en qué rama está.",
          command: "git -C 04-clon remote -v && git -C 04-clon branch",
          expected: "origin\t/tmp/origen (fetch)\norigin\t/tmp/origen (push)\n* main",
        },
      ],
      verify: "La carpeta se llama 04-clon, pero su origen sigue siendo origen. Con un fork en GitHub, la dirección sería la de tu copia.",
    },
    {
      type: "exercise",
      title: "Ejercicio 4: abrir Claude y revisar el modelo",
      description: "Abre Claude Code en la carpeta del proyecto.",
      steps: [
        {
          instruction: "Entra en la carpeta y lanza Claude Code.",
          command: "cd ~/ClaudeCode/04-tetris && claude",
          expected: "Si es la primera vez en esa carpeta, aparece el diálogo de confianza. Después, el cuadro de mensaje.",
        },
        {
          instruction: "Mira qué modelo está activo.",
          command: "/model",
          expected: "Un selector con los modelos disponibles y el actual marcado. Cierra con Esc si no quieres cambiarlo.",
        },
      ],
      verify: "Sabes qué modelo vas a usar antes de gastar tokens. Si algo no coincide con tu plan, mira tu cuenta y el modelo en /status.",
    },
    {
      type: "exercise",
      title: "Ejercicio 5: inicializar el proyecto con /init",
      description: "Deja que Claude escriba el CLAUDE.md y revísalo.",
      steps: [
        {
          instruction: "Ejecuta el comando.",
          command: "/init",
          expected: "Claude lee index.html y game.js, propone un CLAUDE.md y pide permiso para crearlo.",
        },
        {
          instruction: "Aprueba la creación. Abre el archivo y revisa lo que dice.",
          command: "! cat CLAUDE.md",
          expected: "Un archivo breve que explica que no hay paso de compilación, cómo abrir el juego y cómo está organizado game.js.",
        },
        {
          instruction: "Comprueba su longitud.",
          command: "! wc -l CLAUDE.md",
          expected: "Un número por debajo de 200, seguido de CLAUDE.md.",
        },
      ],
      verify: "Todo lo que dice el archivo es cierto sobre tu proyecto. Si algo es inventado, edítalo: es lo primero que Claude leerá en cada sesión.",
    },
    {
      type: "exercise",
      title: "Ejercicio 6: preguntar por el código sin cambiarlo",
      description: "Aprende el proyecto haciendo preguntas.",
      steps: [
        {
          instruction: "Vacía la conversación y haz la primera pregunta.",
          command: "/clear",
        },
        {
          instruction: "Pregunta por las piezas.",
          command: "¿Cómo se crean las piezas y sus formas? Revisa @game.js.",
          expected: "Claude explica que PIEZAS es un objeto con color y una matriz de unos y ceros por pieza, y suele citar las líneas donde están.",
        },
        {
          instruction: "Pregunta por una pieza nueva sin pedir que la añada.",
          command: "¿Se puede crear una pieza nueva que no existe en Tetris, con esta estructura? Solo explícalo, no cambies nada.",
          expected: "Claude indica que basta añadir una entrada a PIEZAS, por ejemplo una U con [[1, 0, 1], [1, 1, 1]], y puede ofrecerse a hacerlo.",
        },
      ],
      verify: "No se modificó ningún archivo. Comprueba con git status si hiciste git init.",
    },
    {
      type: "exercise",
      title: "Ejercicio 7: atajos del cuadro de mensaje",
      description: "Prueba cada atajo y fíjate en lo que entra al contexto.",
      steps: [
        {
          instruction: "Abre el panel de atajos con la tecla de interrogación en un cuadro vacío.",
          command: "?",
          expected: "Un panel con los atajos de tu terminal.",
        },
        {
          instruction: "Ejecuta un comando en modo shell y míralo en la conversación.",
          command: "! ls",
          expected: "CLAUDE.md\ngame.js\nindex.html",
        },
        {
          instruction: "Menciona un archivo con arroba y haz una pregunta corta.",
          command: "¿Cuántas piezas distintas define @game.js?",
          expected: "Claude responde 7: I, O, T, S, Z, J y L.",
        },
        {
          instruction: "Levanta el servidor desde el modo shell, pásalo a segundo plano con Ctrl+B y lista las tareas.",
          command: "! python3 -m http.server 8000 --bind 127.0.0.1",
          expected: "Después de Ctrl+B, el cuadro de mensaje queda libre. Con /tasks aparece el servidor en ejecución.",
        },
      ],
      verify: "Entiendes que lo que imprime el servidor entra al contexto. Para el día a día, déjalo en otra terminal.",
    },
    {
      type: "exercise",
      title: "Ejercicio 8: ajustes, permisos y tema",
      description: "Mira los paneles sin cambiar nada importante.",
      steps: [
        {
          instruction: "Abre los ajustes y busca uno por nombre escribiendo en el buscador.",
          command: "/config",
          expected: "El panel de ajustes. Escribir un término filtra la lista. Esc sale sin guardar.",
        },
        {
          instruction: "Revisa las reglas de permisos.",
          command: "/permissions",
          expected: "Las reglas para permitir, preguntar y denegar, por ámbito, y los directorios de trabajo.",
        },
        {
          instruction: "Mira los temas disponibles y cierra sin elegir.",
          command: "/theme",
          expected: "La lista de temas, con un modo automático, claros, oscuros y opciones para daltonismo.",
        },
      ],
      verify: "Sabes dónde se quita un permiso que diste por error. Esc cierra todos estos paneles sin cambios.",
    },
    {
      type: "exercise",
      title: "Ejercicio 9: barra de estado y diagnóstico",
      description: "Configura la barra, comprueba dónde se guarda y haz un diagnóstico.",
      steps: [
        {
          instruction: "Pide la barra con una descripción concreta. Elige guardarla a nivel de usuario.",
          command: "/statusline muestra el modelo, la carpeta y el porcentaje de contexto",
          expected: "Claude escribe un script en ~/.claude/ y actualiza settings.json. Gasta unos tokens.",
        },
        {
          instruction: "Comprueba que el ajuste quedó guardado.",
          command: "! grep statusLine ~/.claude/settings.json",
          expected: "\"statusLine\": {",
        },
        {
          instruction: "Ejecuta el diagnóstico.",
          command: "/doctor",
          expected: "Un informe de instalación, ajustes y extensiones, con arreglos propuestos solo si hay problemas.",
        },
        {
          instruction: "Desde otra terminal, prueba el diagnóstico de solo lectura.",
          command: "claude doctor",
          expected: "Un resumen de la instalación y de los archivos de ajustes, sin abrir una sesión.",
        },
      ],
      verify: "La barra muestra el porcentaje de contexto y no se actualiza consumiendo tokens. Si no te gusta, bórrala con /statusline o quitando el campo del archivo.",
    },
    {
      type: "playground",
      title: "Experimento 10: rotar la pieza T",
      description: "Una pieza se rota transponiendo su matriz e invirtiendo cada fila. Mira la T en sus cuatro rotaciones y comprueba que tras cuatro vuelve a la forma original. Prueba con otra pieza.",
      code: `const forma = [[0, 1, 0], [1, 1, 1]];

function rotar(m) {
  return m[0].map((_, i) => m.map((fila) => fila[i]).reverse());
}

function texto(m) {
  return m.map((fila) => fila.map((c) => (c ? "#" : ".")).join("")).join(" / ");
}

console.log(texto(forma));
console.log(texto(rotar(forma)));
console.log(texto(rotar(rotar(rotar(rotar(forma))))));`,
      expected: ".#. / ###\n#. / ## / #.\n.#. / ###",
    },
    {
      type: "playground",
      title: "Experimento 11: puntos por líneas",
      description: "El juego da 100, 300, 500 u 800 puntos según cuántas líneas se borran a la vez. Calcula el total de una partida con una, dos y cuatro líneas. Cambia los valores de la lista.",
      code: `const PUNTOS = [0, 100, 300, 500, 800];
let total = 0;

for (const lineas of [1, 2, 4]) {
  total += PUNTOS[lineas];
  console.log("Líneas " + lineas + ": " + PUNTOS[lineas] + " puntos");
}

console.log("total: " + total);`,
      expected: "Líneas 1: 100 puntos\nLíneas 2: 300 puntos\nLíneas 4: 800 puntos\ntotal: 1200",
    },
    {
      type: "playground",
      title: "Experimento 12: porcentaje de contexto",
      description: "La barra de estado muestra los tokens usados como porcentaje de la ventana de contexto. Calcula el porcentaje para tres sesiones y marca cuándo conviene limpiar con la regla del 60 por ciento. Cambia el tamaño de la ventana.",
      code: `const ventana = 1000000;

function estado(tokens) {
  const pct = Math.round((tokens / ventana) * 100);
  return pct + "% " + (pct > 60 ? "conviene limpiar" : "bien");
}

for (const tokens of [100000, 450000, 650000]) {
  console.log(tokens + " tokens: " + estado(tokens));
}`,
      expected: "100000 tokens: 10% bien\n450000 tokens: 45% bien\n650000 tokens: 65% conviene limpiar",
    },
    {
      type: "playground",
      title: "Experimento 13: filtrar solo los errores",
      description: "En lugar de pegar toda la salida de un servidor, extrae solo las líneas útiles. Aquí se queda con las que contienen 404 o la palabra Error. Añade otra condición.",
      code: `const salida = [
  "GET / 200",
  "GET /game.js 200",
  "GET /favicon.ico 404",
  "Error: keys is not defined",
  "GET /index.html 200",
].join("\\n");

const lineas = salida.split("\\n");
const utiles = lineas.filter((l) => l.includes("404") || l.includes("Error"));

console.log(utiles.length + " de " + lineas.length + " líneas");
console.log(utiles.join(" | "));`,
      expected: "2 de 5 líneas\nGET /favicon.ico 404 | Error: keys is not defined",
    },
    { type: "heading", level: 2, text: "¿Qué usar en cada caso?" },
    {
      type: "table",
      headers: ["Si necesitas...", "Usa...", "Nota"],
      rows: [
        ["Presentar un proyecto nuevo a Claude", "`/init`", "Revisa el CLAUDE.md que genera."],
        ["Entender cómo funciona el código", "Preguntas con `@archivo`", "Sin pedir cambios: es barato y no modifica nada."],
        ["Ejecutar un comando y que Claude lo vea", "`!` seguido del comando", "La salida entra al contexto."],
        ["Correr un servidor sin gastar tokens", "Otra terminal", "El servidor imprime mucho y llena el contexto."],
        ["Quitar un permiso que diste", "`/permissions`", "También puedes pedírselo a Claude."],
        ["Ver cuánto contexto llevas", "`/statusline`", "Vacía con `/clear` entre tareas."],
        ["Un ajuste que quedó roto", "`/doctor` o `claude doctor`", "El segundo es de solo lectura y no abre sesión."],
        ["Saltos de línea en un editor", "`/terminal-setup` una vez", "O Ctrl+J, que funciona siempre."],
        ["Guardar una nota en memoria", "\"Recuerda que...\" o `/memory`", "La almohadilla del video ya no figura."],
        ["Mandar una tarea a segundo plano", "`/background`, `/bg` o Ctrl+B", "El ampersand del video ya no figura."],
      ],
    },
    { type: "heading", level: 2, text: "Datos que suelen aparecer desactualizados" },
    {
      type: "table",
      headers: ["Suele decirse", "Información verificada (noviembre 2026)"],
      rows: [
        ["La almohadilla al inicio guarda una nota en la memoria.", "No aparece en la lista actual de atajos. Pide \"recuerda que...\" o abre `/memory`, que edita los CLAUDE.md y gestiona la memoria automática."],
        ["El ampersand al inicio manda la tarea a segundo plano.", "No aparece en la lista actual. Usa `/background` (alias `/bg`) o Ctrl+B para un comando de Bash en ejecución."],
        ["La barra de estado consume tokens.", "Generarla con `/statusline` sí, porque lo hace el modelo. Una vez creada, se ejecuta en tu equipo y no consume tokens de API."],
        ["Con /doctor se arregla pulsando la tecla F.", "Hoy `/doctor` hace una revisión de instalación, ajustes y extensiones, y propone arreglos que se aplican tras confirmarlos. `claude doctor` es el diagnóstico de solo lectura."],
        ["/terminal-setup ya no hace falta.", "Sigue haciendo falta una vez en VS Code, Cursor, Zed y Alacritty anterior a la 0.16 para activar Shift+Enter."],
        ["El modelo más caro es Opus 4.7.", "Los alias resuelven hoy a Opus 5.5, Sonnet 5.5 y Haiku 5.5 en la API de Anthropic. Revisa `/model` al abrir cada proyecto."],
        ["El CLAUDE.md viaja en todas las peticiones.", "Se lee al inicio de cada sesión y forma parte del contexto. Mantenlo por debajo de 200 líneas."],
        ["Una hoja de atajos impresa basta.", "Los atajos cambian entre versiones. Usa `?` en un cuadro vacío y la referencia del modo interactivo."],
        ["Se puede ejecutar /install-github-app en cualquier repositorio.", "Solo funciona con repositorios de github.com. Con GitLab o Bitbucket imprime un aviso y termina."],
      ],
    },
    { type: "heading", level: 2, text: "Preguntas frecuentes" },
    {
      type: "accordion",
      items: [
        {
          title: "¿Hace falta hacer un fork o basta con clonar?",
          text: "Si solo quieres leer o probar el código, clonar el original basta. Si vas a hacer cambios y a integrarlo con GitHub, haz un fork: tendrás una copia propia donde puedes subir ramas sin tocar el original.",
        },
        {
          title: "¿Qué pasa si no hago /init?",
          text: "Claude Code funciona igual, pero tendrá que redescubrir la estructura del proyecto en cada sesión. Un CLAUDE.md breve y cierto ahorra esa exploración.",
        },
        {
          title: "¿Puedo editar el CLAUDE.md a mano?",
          text: "Sí, y conviene. El archivo lo escribió un modelo, así que puede tener errores o detalles innecesarios. Es texto normal y lo lee en la siguiente sesión.",
        },
        {
          title: "¿Por qué no usar el modo shell para el servidor?",
          text: "Porque cada línea que imprime entra en la conversación y consume contexto y tokens, y no aporta información útil. Déjalo en otra terminal y copia solo los errores si los necesitas.",
        },
        {
          title: "¿Dónde se guardan los ajustes?",
          text: "En `~/.claude/settings.json` para los ajustes de usuario, que aplican a todos tus proyectos. En Windows, ese directorio es `%USERPROFILE%\\.claude`. Un proyecto puede tener su propio `.claude/settings.json`.",
        },
        {
          title: "¿Puedo seguir la parte de GitHub con Ollama?",
          text: "No completa. El flujo con Actions necesita una suscripción o una clave de API de Claude en el repositorio. Puedes reproducir en local lo que harías en un issue pasándole el texto como mensaje a tu Claude Code local.",
        },
      ],
    },
    { type: "heading", level: 2, text: "Qué sigue" },
    {
      type: "paragraph",
      text: "Con el proyecto listo y los comandos iniciales claros, el Día 9 sigue con los comandos del flujo diario y las utilidades. Antes, deja el juego abierto, practica las preguntas sobre el código y fija en tu `CLAUDE.md` un dato que Claude no pueda deducir leyendo el código, como el comando que usas para probar los cambios.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 9, verifica que puedes explicar...",
      items: [
        "Para qué sirve un fork y cómo se clona con un nombre de carpeta propio.",
        "Qué hace /init y qué debes revisar en el CLAUDE.md que genera.",
        "Cómo preguntar por el código sin que Claude modifique nada.",
        "Qué hacen /, !, @ y Ctrl+B, y por qué el modo shell consume contexto.",
        "Qué atajos del video ya no figuran y cómo sustituirlos.",
        "Para qué sirven /config, /permissions, /theme, /model y /terminal-setup.",
        "Por qué la barra de estado no consume tokens al usarla y qué porcentaje conviene vigilar.",
        "Qué hace /doctor y cuándo usar claude doctor en la terminal.",
      ],
    },
    { type: "heading", level: 2, text: "Fuentes consultadas (noviembre 2026)" },
    {
      type: "list",
      items: [
        "[Modo interactivo: atajos, modo shell y segundo plano](https://code.claude.com/docs/en/interactive-mode)",
        "[Referencia de comandos](https://code.claude.com/docs/en/commands)",
        "[Personalizar la barra de estado](https://code.claude.com/docs/en/statusline)",
        "[Configuración del terminal: Shift+Enter y /terminal-setup](https://code.claude.com/docs/en/terminal-config)",
        "[Ajustes de Claude Code](https://code.claude.com/docs/en/settings)",
        "[Cómo Claude recuerda tu proyecto: CLAUDE.md y memoria](https://code.claude.com/docs/en/memory)",
        "[Configuración de modelos](https://code.claude.com/docs/en/model-config)",
        "[Depurar tu configuración](https://code.claude.com/docs/en/debug-your-config)",
        "[Seguridad y confianza en el espacio de trabajo](https://code.claude.com/docs/en/security)",
        "[Claude Code en GitHub Actions](https://code.claude.com/docs/en/github-actions)",
        "[Buenas prácticas para Claude Code](https://code.claude.com/docs/en/best-practices)",
        "[GitHub: bifurcar un repositorio](https://docs.github.com/en/get-started/quickstart/fork-a-repo)",
        "[GitHub CLI: gh repo fork](https://cli.github.com/manual/gh_repo_fork)",
        "[Git: git clone](https://git-scm.com/docs/git-clone)",
        "[Python: http.server](https://docs.python.org/3/library/http.server.html)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "¿Qué cambia al pasar un segundo argumento a git clone, como git clone URL 04-tetris?",
      options: [
        "El nombre del repositorio en GitHub",
        "Solo el nombre de la carpeta en tu equipo",
        "La rama principal",
        "El propietario del repositorio",
      ],
      correctIndex: 1,
      explanation: "El segundo argumento elige la carpeta de destino. El repositorio remoto y su nombre no se tocan.",
    },
    {
      question: "¿Qué hace /init?",
      options: [
        "Reinstala Claude Code",
        "Explora el proyecto y crea un CLAUDE.md con su estructura y convenciones",
        "Borra el historial de la conversación",
        "Sube el proyecto a GitHub",
      ],
      correctIndex: 1,
      explanation: "/init lee el código y escribe un CLAUDE.md en la raíz, que Claude carga al inicio de cada sesión.",
    },
    {
      question: "¿Qué longitud conviene que no supere un CLAUDE.md?",
      options: ["Unas 20 líneas", "Menos de 200 líneas", "Más de 1000 líneas", "No hay recomendación"],
      correctIndex: 1,
      explanation: "La guía recomienda quedarse por debajo de 200 líneas: más contexto reduce el seguimiento de las instrucciones.",
    },
    {
      question: "Quieres entender el código sin que Claude cambie nada. ¿Qué haces?",
      options: [
        "Pedir que implemente algo",
        "Hacer preguntas con @archivo y aclarar que solo quieres una explicación",
        "Borrar el CLAUDE.md",
        "Ejecutar /doctor",
      ],
      correctIndex: 1,
      explanation: "Las preguntas sobre el código son baratas y no modifican archivos. Si Claude se ofrece a cambiar algo, responde que no.",
    },
    {
      question: "¿Qué ocurre con la salida de un comando ejecutado con ! al inicio?",
      options: [
        "Se descarta",
        "Se añade al contexto de la conversación y cuesta tokens",
        "Solo la ve Claude, sin costo",
        "Se guarda en el CLAUDE.md",
      ],
      correctIndex: 1,
      explanation: "El modo shell añade el comando y su salida a la conversación, así que un servidor que imprime mucho llena el contexto.",
    },
    {
      question: "¿Cómo se guarda hoy una nota en la memoria, ya que la almohadilla del video no figura en la lista actual?",
      options: [
        "Con el ampersand",
        "Pidiéndole a Claude que lo recuerde, o abriendo /memory",
        "Con /theme",
        "No se puede guardar nada",
      ],
      correctIndex: 1,
      explanation: "Se pide a Claude \"recuerda que...\" o se edita desde /memory, que gestiona los CLAUDE.md y la memoria automática.",
    },
    {
      question: "¿Cuándo consume tokens la barra de estado?",
      options: [
        "En cada actualización de la barra",
        "Al generarla con /statusline, porque lo hace el modelo. Después corre en local sin consumir tokens de API",
        "Nunca consume ni al generarla",
        "Solo si usas Ollama",
      ],
      correctIndex: 1,
      explanation: "El script lo escribe el modelo, y eso gasta tokens una vez. Después se ejecuta en tu equipo.",
    },
    {
      question: "¿Qué hace /doctor hoy?",
      options: [
        "Cierra la sesión",
        "Revisa instalación, ajustes y extensiones y propone arreglos que se aplican tras confirmarlos",
        "Cambia el tema",
        "Instala la aplicación de GitHub",
      ],
      correctIndex: 1,
      explanation: "Es una revisión de la configuración con arreglos propuestos. Desde la terminal, claude doctor imprime un diagnóstico de solo lectura.",
    },
    {
      question: "Usas VS Code y Shift+Enter envía el mensaje en lugar de saltar de línea. ¿Qué haces?",
      options: [
        "Reinstalar el editor",
        "Ejecutar /terminal-setup una vez, o usar Ctrl+J",
        "Cambiar de modelo",
        "No se puede",
      ],
      correctIndex: 1,
      explanation: "En VS Code, /terminal-setup instala el atajo. Ctrl+J funciona en cualquier terminal.",
    },
    {
      question: "¿Con qué repositorios funciona /install-github-app?",
      options: [
        "Con cualquiera",
        "Solo con repositorios de github.com",
        "Solo con GitLab",
        "Solo con Bitbucket",
      ],
      correctIndex: 1,
      explanation: "Si el origen está en gitlab.com o bitbucket.org, el comando muestra un aviso y termina.",
    },
  ],
};
