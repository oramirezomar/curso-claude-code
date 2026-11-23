import type { Lesson } from "@/lib/types";
// Día 11 · Clases 39, 40 y 41 de la transcripción (el artículo 42 solo enlaza el código fuente y recursos de la sección).
// Contenido verificado en noviembre de 2026.
export const day11: Lesson = {
  day: 11,
  slug: "implementar-desde-github-thinking-y-tarea",
  title: "Implementar desde GitHub, thinking y tarea",
  section: "Flujo de trabajo",
  estimatedMinutes: 65,
  icon: "🧠",
  objectives: [
    "Publicar el juego con GitHub Pages y entender sus requisitos y su visibilidad.",
    "Pedir con @claude que implemente la solución de un issue y revisar el resultado antes de fusionar.",
    "Corregir un fallo en local con el modo plan, y elegir entre un mensaje claro, /effort y ultrathink para pedir más razonamiento.",
    "Añadir una función nueva en una rama propia con un plan aprobado: el ejemplo es una pieza de 3 por 3.",
    "Planificar una tarea propia de varias funciones sin romper el juego que sigue sirviendo de base.",
  ],
  blocks: [
    {
      type: "paragraph",
      text: "El Día 10 dejó a Claude conectado a tu repositorio. Este día lo usas de punta a punta: publicas el juego en internet, pides desde un issue una función nueva y ves cómo llega a la página publicada. Después vuelves al trabajo local: corriges un fallo con el modo plan, aprendes cómo se pide más razonamiento sin gastar tokens de más, y añades una pieza nueva en una rama. Termina con una tarea propia.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "main", label: "Rama que GitHub Pages publica, desde la carpeta raíz" },
        { value: "ultrathink", label: "Palabra que pide más razonamiento solo en ese mensaje" },
        { value: "medium", label: "Esfuerzo por defecto de los modelos 5.5 actuales" },
        { value: "opusplan", label: "Opus para planificar y Sonnet para ejecutar" },
        { value: "8", label: "Piezas del juego tras añadir la tuerca de 3 por 3" },
        { value: "-d", label: "Opción de git branch para borrar una rama ya fusionada" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text: "Contenido verificado en noviembre de 2026 contra las páginas oficiales de configuración de modelos y esfuerzo, buenas prácticas, modos de permisos y GitHub Actions de Claude Code, y contra la documentación de GitHub Pages. El juego de este día se probó en un navegador: el fallo del fin de partida, la pieza nueva y su colocación. Los comandos de Git se ejecutaron en un repositorio de prueba. La publicación en Pages y los workflows dependen de tu cuenta y no se ejecutaron.",
    },
    { type: "heading", level: 2, text: "Publicar el juego con GitHub Pages" },
    {
      type: "paragraph",
      text: "Para ver los cambios funcionando en internet, publica el repositorio como un sitio estático. En GitHub, entra en Settings, después en Pages, elige Deploy from a branch como origen, la rama `main` y la carpeta raíz, y guarda. GitHub busca un `index.html` en la raíz y lo sirve. Sigue el avance en la pestaña Actions: aparece un workflow llamado `pages-build-deployment`. Al terminar, Settings, Pages te muestra la dirección del sitio.",
    },
    {
      type: "image",
      src: "/img/dia-11/de-issue-a-sitio-publicado.svg",
      alt: "Cinco pasos: un issue con una petición, un comentario con @claude que pide implementarla, una rama con un enlace al pull request, tu revisión y la revisión automática, y la fusión tras la que Pages publica de nuevo. Debajo, los pasos para activar Pages y los requisitos previos.",
      caption: "Del issue a la página publicada, con tu revisión en medio.",
    },
    {
      type: "callout",
      variant: "warning",
      text: "GitHub Pages está disponible en repositorios públicos con el plan Free, y en públicos y privados con los planes de pago. Un sitio de Pages es público en internet aunque el repositorio sea privado. Si creaste el repositorio del Día 10 como privado, necesitas un plan de pago o hacerlo público. Y no publiques datos sensibles. Este ejercicio usa Pages por comodidad: en un proyecto real, el despliegue puede ser cualquier flujo de integración y despliegue continuos, y GitHub recomienda un workflow de Actions si necesitas un proceso de compilación distinto.",
    },
    { type: "heading", level: 2, text: "Pedir una implementación desde un issue" },
    {
      type: "paragraph",
      text: "Crea un issue con una petición breve, por ejemplo \"Interruptor de tema claro y oscuro\": por defecto el juego se ve en modo oscuro, y un interruptor lo cambia a modo claro. No añadas más. Al crearlo, el workflow de clasificación del Día 10 se dispara solo, con una ejecución nueva en Actions. Tarda porque levanta un entorno Linux, carga las credenciales y llama a Claude. Si lo que hace es poner etiquetas, es lo esperado: ese workflow clasifica, no implementa.",
    },
    {
      type: "paragraph",
      text: "Para que implemente, hay que pedirlo. Escribe un comentario en el issue con `@claude` y la petición: \"implementa esta solución y arregla este issue\". Esto dispara `claude.yml`, que lee el repositorio, escribe el código y deja una rama con un enlace para crear el pull request. Mientras tanto, puedes ver el progreso en la ejecución de Actions o en el comentario de estado del propio issue. Ármate de paciencia: es un servidor que arranca, instala y trabaja. Cuanto más concreta sea la petición, menos tendrá que adivinar.",
    },
    {
      type: "paragraph",
      text: "Revisa antes de fusionar, y mejor en local: copia el nombre de la rama, ejecuta `git fetch` y `git switch nombre-de-la-rama`, y abre `index.html`. Para el interruptor, comprueba que el modo por defecto es el oscuro y que al cambiar se ven bien las piezas y el tablero. Después `git switch main` para volver. Con el pull request creado, espera la revisión automática: puede tardar unos tres minutos. Fusiona, borra la rama y verás que Pages vuelve a publicar solo, con otro `pages-build-deployment`. Hasta que termine, el sitio sigue mostrando la versión anterior. Recarga sin caché (Ctrl+Shift+R o Cmd+Shift+R) si ves lo viejo.",
    },
    {
      type: "paragraph",
      text: "Todo lo anterior ocurre en el repositorio remoto. En tu equipo, el proyecto no cambia hasta que ejecutas `git pull` en `main`. Haz lo mismo con cualquier cambio que se fusione en GitHub.",
    },
    { type: "heading", level: 2, text: "Corregir un fallo en local" },
    {
      type: "paragraph",
      text: "El juego tiene un fallo que se ve al perder: cuando la partida termina, las teclas siguen funcionando y siguen apareciendo piezas una sobre otra. Tu versión no lo tiene, porque la función que atiende el teclado empieza con una guarda: `if (terminado) return;`. Para reproducirlo, bórrala. Guarda, recarga, pierde la partida y pulsa la barra espaciadora varias veces: las piezas siguen cayendo y fijándose bajo el cartel de fin de juego.",
    },
    {
      type: "paragraph",
      text: "Para pedir la corrección, describe lo que pasa con precisión, con el estado y la expectativa. Si ayuda, pega una captura. Algo como: \"Cuando el juego termina, las piezas siguen apareciendo y se superponen. El juego debería quedar congelado. Encuentra la causa y aplica una solución que toque el código lo menos posible.\" Pídelo en modo plan (Shift+Tab). En un fallo pequeño y evidente puedes saltarte el plan. Pero si hay que pensar, el plan sale a cuenta: Claude lee, explica la causa, señala el archivo y la línea y propone el cambio. Tú lo lees antes de que toque nada.",
    },
    {
      type: "paragraph",
      text: "Cuando el plan esté listo, Claude te pregunta cómo seguir. Las opciones actuales son aprobar y trabajar en modo automático, aprobar y revisar cada edición a mano, o seguir planificando. Con Ctrl+G abres el plan en tu editor para retocarlo. Desde la versión 2.1.283, el modo automático es el modo inicial de las sesiones interactivas: un segundo modelo revisa las acciones antes de ejecutarlas. Aprueba, recarga el navegador y comprueba que ya no ocurre. Luego haz el commit con un mensaje fiel, como `fix: ignorar el teclado al terminar la partida`, y vacía el contexto con `/clear` para lo siguiente.",
    },
    { type: "heading", level: 2, text: "Pedir más razonamiento sin gastar de más" },
    {
      type: "image",
      src: "/img/dia-11/subir-el-razonamiento.svg",
      alt: "Cuatro niveles apilados: un mensaje claro, el modo plan, /effort para toda la sesión y ultrathink para un solo mensaje. Debajo, un aviso: frases como think hard son texto normal y no palabras clave.",
      caption: "Del más barato al más caro: pide más razonamiento solo cuando haga falta.",
    },
    {
      type: "paragraph",
      text: "El video dice que se dispara un nivel de pensamiento con las frases \"think\", \"think hard\" o \"usa extra thinking\". Eso ya no es así. La documentación indica que Claude Code pasa \"think\", \"think hard\" y \"think more\" como texto normal y no las reconoce como palabras clave. La única palabra reservada es `ultrathink`: si la incluyes en tu mensaje, pides un razonamiento más profundo solo en ese turno, sin cambiar el esfuerzo de la sesión. En la terminal se ve en colores cuando puede subir el turno, y lo lleva a xhigh. Es ideal para una pregunta difícil dentro de un trabajo rutinario.",
    },
    {
      type: "paragraph",
      text: "Para toda la sesión, el control es `/effort`, con los niveles low, medium, high, xhigh y max. El razonamiento es adaptable: el modelo decide cuánto pensar en cada paso según la dificultad, y el nivel fija el tope. Los modelos 5.5 actuales empiezan en medium, y la documentación indica que Opus 5.5 en medium iguala o supera a Opus 5 en high en programación. Sube a high o xhigh cuando acertar dependa de casos fáciles de pasar por alto, como un fallo en código ajeno, una prueba intermitente o un cambio de esquema. Baja a low para ir rápido y revisar cada resultado. Reserva max para un problema difícil que quieras que resuelva sin ti, porque en tareas ordinarias tiende a pensar de más. Más esfuerzo siempre significa más tokens y más espera.",
    },
    { type: "heading", level: 2, text: "Una función nueva en una rama" },
    {
      type: "paragraph",
      text: "Para añadir una pieza nueva, repite el método del Día 7. Crea primero la rama, aunque tengas el rebobinado de Claude Code: `git switch -c 01-pieza-3x3`. Un nombre con número inicial facilita completarlo con el tabulador y ordena las ramas. Con la rama, Claude puede equivocarse tanto como quiera sin que `main` lo note. Más adelante verás cómo trabajar varias ramas a la vez. Hasta entonces, un solo agente por carpeta: abrir dos instancias de Claude en la misma carpeta puede producir conflictos si tocan el mismo archivo.",
    },
    {
      type: "image",
      src: "/img/dia-11/pieza-tuerca.svg",
      alt: "A la izquierda, una cuadrícula de 3 por 3 de color gris con el cuadrado central vacío, que representa una tuerca. A la derecha, el código de la pieza en game.js con su color y su matriz, y una lista de lo que revisar: estructura, frecuencia, comentario y rama propia.",
      caption: "La tuerca: ocho celdas con un hueco en el centro.",
    },
    {
      type: "paragraph",
      text: "Describe la pieza: \"Añade una nueva pieza de 3 por 3 como reto. Es una tuerca, con un hueco vacío en el centro, lo que dificulta el juego.\" Mejor en modo plan, y con `opusplan` como modelo: Opus planifica, que es la parte más difícil, y Sonnet ejecuta. Claude puede hacerte preguntas antes de proponer: con qué frecuencia debe salir, cómo debe verse. Responde, por ejemplo, que aparezca igual que las demás, y que sea un cuadrado de 3 por 3 con un hueco. Lee el plan con atención. Aquí es donde conocer el código ayuda: sabes que una pieza nueva va en `PIEZAS`, con el formato de color y matriz, y que conviene dejar un comentario para que una sesión futura la entienda.",
    },
    {
      type: "paragraph",
      text: "Aprueba, recarga y comprueba que sale, que cae y que la matriz con hueco se coloca bien. Con ocho piezas distintas, a cada una le toca una de cada ocho. Si sale demasiado, pide bajar su frecuencia. Cuando estés conforme, haz el commit, vuelve a `main`, fusiona y borra la rama con `git branch -d`, que con el tabulador es inmediato. Borra siempre las ramas que ya no uses: se acumulan.",
    },
    { type: "heading", level: 2, text: "La tarea de la sección" },
    {
      type: "paragraph",
      text: "Implementa por tu cuenta otras funciones sobre el mismo juego, cada una en su rama, con plan, prueba y commit. Algunas ideas, pensadas para que el juego siga funcionando:",
    },
    {
      type: "list",
      items: [
        "Reservar una pieza con una tecla, para sacarla cuando convenga.",
        "Una sombra que muestre dónde caerá la pieza actual.",
        "Una vista previa de la pieza siguiente.",
        "Una velocidad que aumente con las líneas borradas.",
        "Una pausa con una tecla.",
        "Guardar la mejor puntuación en el navegador.",
      ],
    },
    {
      type: "paragraph",
      text: "Si en las secciones siguientes se retoma este proyecto, conviene que no lo desvíes con cambios ajenos a estos retos. Puedes dárselos primero a Claude Code o a otro asistente para que los convierta en un requerimiento claro. Y cuando termines, publícalo: ya tienes el sitio en Pages.",
    },
    { type: "heading", level: 2, text: "Ejercicios guiados y experimentos" },
    {
      type: "paragraph",
      text: "Los ejercicios usan el Tetris del Día 8 en tu repositorio de GitHub con la integración del Día 10. La búsqueda de piezas, el diff y los comandos de Git de los ejercicios 5 y 8 los ejecuté en un repositorio de prueba. Lo que responde GitHub y Claude es orientativo. Los cálculos de los experimentos del final se ejecutan en el navegador.",
    },
    {
      type: "exercise",
      title: "Ejercicio 1: publicar con GitHub Pages",
      description: "Pon el juego en internet.",
      steps: [
        {
          instruction: "Comprueba que tu repositorio es público, o que tu plan permite Pages en privados.",
          command: "gh repo view --json visibility",
          expected: "{\"visibility\":\"PUBLIC\"}",
        },
        {
          instruction: "En GitHub, entra en Settings, Pages. Elige Deploy from a branch, la rama main, la carpeta raíz, y pulsa Save.",
          expected: "Aparece un aviso de que el sitio se está publicando. En Actions se ve el workflow pages-build-deployment.",
        },
        {
          instruction: "Espera a que termine y abre la dirección que muestra Settings, Pages.",
          expected: "El Tetris se abre en una dirección de github.io.",
        },
      ],
      verify: "Puedes jugar desde internet. Recuerda que el sitio es público.",
    },
    {
      type: "exercise",
      title: "Ejercicio 2: crear el issue",
      description: "Redacta una petición breve y mira cómo reacciona el clasificador.",
      steps: [
        {
          instruction: "Crea un issue con el título Interruptor de tema claro y oscuro.",
        },
        {
          instruction: "En la descripción pide que por defecto el juego esté en modo oscuro y que un interruptor lo cambie a modo claro. No añadas más.",
          expected: "En Actions aparece una ejecución de Claude Issue Triage, y el issue recibe etiquetas y un comentario.",
        },
      ],
      verify: "El clasificador etiquetó el issue pero no escribió código: eso lo hace claude.yml cuando se lo pides.",
    },
    {
      type: "exercise",
      title: "Ejercicio 3: pedir la implementación",
      description: "Menciona a @claude y sigue el trabajo.",
      steps: [
        {
          instruction: "En un comentario del issue, escribe la petición completa, con la arroba.",
          command: "@claude implementa esta solución y arregla este issue",
          expected: "Aparece una ejecución nueva en Actions y un comentario de estado en el issue.",
        },
        {
          instruction: "Espera con paciencia. Revisa la ejecución si quieres ver cómo avanza.",
          expected: "Claude deja una rama y un enlace para crear el pull request.",
        },
      ],
      verify: "Hay una rama nueva con los cambios. Aún no fusiones.",
    },
    {
      type: "exercise",
      title: "Ejercicio 4: revisar y fusionar",
      description: "Pruébalo en local y fusiona desde GitHub.",
      steps: [
        {
          instruction: "Trae la rama y cámbiate a ella.",
          command: "git fetch && git switch nombre-de-la-rama",
          expected: "branch 'nombre-de-la-rama' set up to track 'origin/nombre-de-la-rama'.\nSwitched to a new branch 'nombre-de-la-rama'",
        },
        {
          instruction: "Abre index.html en el navegador y prueba el interruptor: debe empezar en oscuro y cambiar a claro.",
          expected: "El juego cambia de tema y las piezas siguen viéndose bien.",
        },
        {
          instruction: "Vuelve a main. En GitHub, crea el pull request, espera la revisión automática y fusiona.",
          command: "git switch main",
          expected: "Switched to branch 'main'\nYour branch is up to date with 'origin/main'.",
        },
        {
          instruction: "Trae los cambios fusionados y borra la rama local.",
          command: "git pull && git branch -d nombre-de-la-rama",
          expected: "Deleted branch nombre-de-la-rama (was abc1234).",
        },
        {
          instruction: "Espera a que Pages vuelva a publicar y recarga el sitio sin caché.",
          expected: "En Actions aparece otro pages-build-deployment. Al terminar, el sitio publicado tiene el interruptor.",
        },
      ],
      verify: "El sitio publicado y tu copia local coinciden. Si ves lo viejo, recarga con Ctrl+Shift+R o Cmd+Shift+R.",
    },
    {
      type: "exercise",
      title: "Ejercicio 5: provocar el fallo del fin de partida",
      description: "Quita la guarda del teclado para reproducir el fallo.",
      steps: [
        {
          instruction: "Edita game.js y borra la línea if (terminado) return; al principio de la función que atiende el teclado. Guarda.",
        },
        {
          instruction: "Comprueba el cambio con Git.",
          command: "git diff",
          expected: "@@ -99,7 +99,6 @@ function dibujar() {\n }\n \n document.addEventListener(\"keydown\", (e) => {\n-  if (terminado) return;\n   if (e.key === \"ArrowLeft\") mover(-1, 0);\n   else if (e.key === \"ArrowRight\") mover(1, 0);\n   else if (e.key === \"ArrowDown\") bajar();",
        },
        {
          instruction: "Recarga el juego, pierde la partida y pulsa la barra espaciadora varias veces.",
          expected: "Aunque aparece el cartel de fin de juego, las piezas siguen cayendo y fijándose una sobre otra.",
        },
      ],
      verify: "Reproduces el fallo a voluntad, que es lo primero para poder corregirlo.",
    },
    {
      type: "exercise",
      title: "Ejercicio 6: corregirlo con el modo plan",
      description: "Pide el diagnóstico con contexto y revisa el plan.",
      steps: [
        {
          instruction: "Abre Claude Code, vacía el contexto y entra en modo plan.",
          command: "/clear",
        },
        {
          instruction: "Describe el fallo con estado y expectativa.",
          command: "Cuando el juego termina, las piezas siguen apareciendo y se superponen bajo el cartel de fin. El juego debería quedar congelado. Encuentra la causa en @game.js y propone una solución que cambie lo mínimo.",
          expected: "Claude explica que el teclado sigue activo tras terminar y propone devolver una guarda al inicio de la función de teclas.",
        },
        {
          instruction: "Lee el plan. Si hace falta, ábrelo con Ctrl+G y retócalo. Después aprueba y comprueba el resultado en el navegador.",
          expected: "Las teclas dejan de tener efecto al terminar. Las piezas ya no aparecen.",
        },
        {
          instruction: "Haz el commit con un mensaje fiel.",
          command: "git commit -am \"fix: ignorar el teclado al terminar la partida\"",
          expected: "[main abc1234] fix: ignorar el teclado al terminar la partida\n 1 file changed, 1 insertion(+)",
        },
      ],
      verify: "El fallo ya no se reproduce con la misma secuencia. Prueba también una partida normal.",
    },
    {
      type: "exercise",
      title: "Ejercicio 7: ultrathink y esfuerzo",
      description: "Compara un mensaje normal con uno con ultrathink, y mira el esfuerzo de la sesión.",
      steps: [
        {
          instruction: "Mira el nivel de esfuerzo actual.",
          command: "/effort status",
          expected: "El nivel del modelo activo, normalmente medium.",
        },
        {
          instruction: "Haz una pregunta difícil con la palabra clave. En la terminal debería verse en colores.",
          command: "ultrathink: ¿puede una pieza nueva quedar fuera del tablero al aparecer en game.js? Explica los casos.",
          expected: "Claude razona más ese turno y repasa los casos de posición y colisión al aparecer.",
        },
        {
          instruction: "Escribe ahora la misma pregunta con think hard y compara. No debería cambiar nada especial.",
          command: "think hard: ¿puede una pieza nueva quedar fuera del tablero al aparecer en game.js?",
          expected: "Se trata como texto normal, sin elevar el razonamiento.",
        },
      ],
      verify: "Sabes que ultrathink actúa solo en ese mensaje y que /effort cambia toda la sesión. Ninguno de los dos es gratis.",
    },
    {
      type: "exercise",
      title: "Ejercicio 8: una pieza nueva en una rama",
      description: "Añade la tuerca de 3 por 3 con plan, prueba y fusión.",
      steps: [
        {
          instruction: "Cuenta las piezas actuales antes de empezar.",
          command: "grep -c \"^  [A-Z]:\" game.js",
          expected: "7",
        },
        {
          instruction: "Crea la rama de trabajo.",
          command: "git switch -c 01-pieza-3x3",
          expected: "Switched to a new branch '01-pieza-3x3'",
        },
        {
          instruction: "Entra en modo plan y pide la pieza.",
          command: "Añade una nueva pieza de 3 por 3 como reto. Es una tuerca con un hueco vacío en el centro. Respeta la estructura de PIEZAS y deja un comentario.",
          expected: "Claude pregunta por la frecuencia y el aspecto, y propone un plan con la entrada nueva en PIEZAS.",
        },
        {
          instruction: "Responde que salga igual que las demás. Aprueba el plan.",
          expected: "Se añade una entrada N con color gris y la matriz de ocho celdas.",
        },
        {
          instruction: "Comprueba que ahora hay ocho piezas y prueba el juego hasta que salga la tuerca.",
          command: "grep -c \"^  [A-Z]:\" game.js",
          expected: "8",
        },
        {
          instruction: "Confirma, vuelve a main, fusiona y borra la rama.",
          command: "git commit -am \"feat: pieza tuerca de 3x3\" && git switch main && git merge 01-pieza-3x3 && git branch -d 01-pieza-3x3",
          expected: "[01-pieza-3x3 abc1234] feat: pieza tuerca de 3x3\n 1 file changed, 1 insertion(+)\nSwitched to branch 'main'\nUpdating abc1234..def5678\nFast-forward\n game.js | 1 +\n 1 file changed, 1 insertion(+)\nDeleted branch 01-pieza-3x3 (was def5678).",
        },
      ],
      verify: "La pieza sale, se coloca bien y main la contiene. Si sale demasiado, pide bajar su frecuencia.",
    },
    {
      type: "exercise",
      title: "Ejercicio 9: tu propia tarea",
      description: "Elige dos funciones de la lista y llévalas hasta main.",
      steps: [
        {
          instruction: "Elige dos ideas y crea una rama para cada una, por ejemplo 02-reservar-pieza y 03-sombra.",
          command: "git switch -c 02-reservar-pieza",
          expected: "Switched to a new branch '02-reservar-pieza'",
        },
        {
          instruction: "Para cada una: modo plan, lee el plan, aprueba, prueba el juego y haz el commit con un mensaje fiel.",
          expected: "Cada función queda en su rama, con un commit que la describe.",
        },
        {
          instruction: "Fusiona, borra las ramas y sube a GitHub para que Pages publique.",
          command: "git switch main && git merge 02-reservar-pieza && git branch -d 02-reservar-pieza && git push",
          expected: "Fast-forward y la rama borrada. Después, el push sube los cambios.",
        },
      ],
      verify: "El sitio publicado tiene tus funciones y el juego sigue funcionando.",
    },
    {
      type: "playground",
      title: "Experimento 10: dibujar la tuerca",
      description: "Una pieza es una matriz de unos y ceros. Dibuja la tuerca con almohadillas y puntos, y cuenta sus celdas. Cambia la matriz para inventar otra pieza.",
      code: `const tuerca = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
];

const dibujo = tuerca.map((fila) => fila.map((c) => (c ? "#" : ".")).join(""));
const celdas = tuerca.flat().filter(Boolean).length;

dibujo.forEach((fila) => console.log(fila));
console.log("celdas: " + celdas);`,
      expected: "###\n#.#\n###\nceldas: 8",
    },
    {
      type: "playground",
      title: "Experimento 11: con qué frecuencia sale",
      description: "Con ocho piezas elegidas al azar, la tuerca debería salir una de cada ocho veces. Simula mil salidas con un generador de números fijo, para que el resultado sea siempre el mismo, y compara con lo esperado.",
      code: `let semilla = 7;
function aleatorio() {
  semilla = (semilla * 16807) % 2147483647;
  return semilla / 2147483647;
}

const piezas = 8;
const salidas = 1000;
let tuercas = 0;

for (let i = 0; i < salidas; i++) {
  if (Math.floor(aleatorio() * piezas) === 7) tuercas++;
}

console.log("esperadas: " + salidas / piezas);
console.log("salieron: " + tuercas);`,
      expected: "esperadas: 125\nsalieron: 127",
    },
    {
      type: "playground",
      title: "Experimento 12: el efecto de la guarda",
      description: "Una guarda al inicio de la función del teclado evita que se actúe tras terminar la partida. Cuenta cuántas piezas nuevas se crean al pulsar tres veces después del fin, con y sin guarda.",
      code: `function pulsaciones(conGuardia, veces) {
  let terminado = true;
  let piezasNuevas = 0;
  for (let i = 0; i < veces; i++) {
    if (conGuardia && terminado) continue;
    piezasNuevas++;
  }
  return piezasNuevas;
}

console.log("con guardia: " + pulsaciones(true, 3) + " piezas nuevas");
console.log("sin guardia: " + pulsaciones(false, 3) + " piezas nuevas");`,
      expected: "con guardia: 0 piezas nuevas\nsin guardia: 3 piezas nuevas",
    },
    {
      type: "playground",
      title: "Experimento 13: qué palabra pide razonar más",
      description: "Solo ultrathink, como palabra completa, es una palabra clave. Las demás frases son texto normal. Comprueba cuatro mensajes y añade los tuyos.",
      code: `function pideRazonar(mensaje) {
  return /\\bultrathink\\b/i.test(mensaje);
}

const mensajes = [
  "ultrathink: encuentra por qué se repiten las fichas",
  "think hard sobre este error",
  "piensa más sobre esto",
  "revisa el fallo y usa ultrathink solo esta vez",
];

mensajes.forEach((m) => console.log(pideRazonar(m) + ": " + m));`,
      expected: "true: ultrathink: encuentra por qué se repiten las fichas\nfalse: think hard sobre este error\nfalse: piensa más sobre esto\ntrue: revisa el fallo y usa ultrathink solo esta vez",
    },
    { type: "heading", level: 2, text: "¿Qué usar en cada caso?" },
    {
      type: "table",
      headers: ["Si necesitas...", "Usa...", "Nota"],
      rows: [
        ["Ver el juego en internet", "GitHub Pages desde `main`, carpeta raíz", "Público siempre. Repositorio público con el plan Free."],
        ["Que Claude implemente un issue", "Un comentario con `@claude` y la petición", "El clasificador solo etiqueta."],
        ["Comprobar el resultado antes de fusionar", "`git fetch` y `git switch rama`", "Gratis. Luego `git pull` en `main` tras fusionar."],
        ["Un fallo pequeño y obvio", "Pedirlo con aprobación de ediciones", "El plan sobra si el cambio es trivial."],
        ["Un fallo que requiere pensar", "Modo plan con un mensaje preciso", "Revisa causa, archivo y cambio antes de aprobar."],
        ["Más razonamiento en un mensaje", "`ultrathink`", "Solo ese turno. Sin cambiar la sesión."],
        ["Más razonamiento en toda la sesión", "`/effort`", "Los modelos 5.5 empiezan en medium."],
        ["Una función nueva", "Una rama, el modo plan y una prueba", "Planificar con Opus y ejecutar con Sonnet: `opusplan`."],
        ["Limpiar al terminar", "`git branch -d` tras fusionar", "Solo borra ramas ya fusionadas."],
      ],
    },
    { type: "heading", level: 2, text: "Datos que suelen aparecer desactualizados" },
    {
      type: "table",
      headers: ["Suele decirse", "Información verificada (noviembre 2026)"],
      rows: [
        ["Las frases think, think hard y think more activan niveles de pensamiento.", "Claude Code las pasa como texto normal. Solo `ultrathink` es una palabra clave y actúa en ese turno."],
        ["Hay que activar un modo extra thinking.", "En Opus 5.5, Sonnet 5.5, Haiku 5.5 y los modelos Fable el razonamiento extendido está siempre activo y es adaptable. El control es `/effort`."],
        ["Opus 4.7 es el modelo más potente.", "El alias opus resuelve hoy a Opus 5.5. Revisa tu modelo con `/model`."],
        ["Al aprobar un plan se elige accept auto edits.", "Hoy las opciones son aprobar con modo automático, aprobar revisando cada edición, o seguir planificando. Ctrl+G abre el plan en tu editor."],
        ["Pages funciona con cualquier repositorio.", "Con el plan Free, el repositorio debe ser público. Con planes de pago, también privados. El sitio siempre es público."],
        ["Para ver la rama se usa git checkout.", "Funciona, pero `git switch` crea la rama local con seguimiento y es más claro."],
        ["Tras fusionar en GitHub, mi copia local ya está al día.", "No: hay que ejecutar `git pull` en `main`."],
        ["Un único prompt largo evita revisar.", "Aunque el plan sea bueno, revisa el diff y prueba antes de fusionar."],
        ["Se pueden abrir dos Claude en la misma carpeta.", "Se puede, pero si tocan el mismo archivo hay conflictos. Más adelante verás ramas y árboles de trabajo separados."],
      ],
    },
    { type: "heading", level: 2, text: "Preguntas frecuentes" },
    {
      type: "accordion",
      items: [
        {
          title: "¿Por qué Claude solo puso etiquetas y no implementó?",
          text: "Porque el workflow de clasificación solo lee, etiqueta y comenta. Para implementar hay que mencionar a @claude en un comentario, lo que dispara claude.yml.",
        },
        {
          title: "Pages no muestra mi cambio. ¿Qué hago?",
          text: "Espera a que termine el último pages-build-deployment en Actions y recarga sin caché con Ctrl+Shift+R o Cmd+Shift+R. Mira también que fusionaste en main y no en otra rama.",
        },
        {
          title: "¿Cuándo uso ultrathink y cuándo /effort?",
          text: "Usa ultrathink para una pregunta difícil dentro de un trabajo rutinario. Usa /effort cuando toda la tarea es difícil. En ambos casos subes el gasto de tokens.",
        },
        {
          title: "¿Es mejor siempre el modo plan?",
          text: "No. Para un cambio trivial, el plan es sobrecoste. Para tocar código con consecuencias, o cuando hay varias formas de resolverlo, merece la pena.",
        },
        {
          title: "Mi pieza nueva sale demasiado. ¿Cómo lo cambio?",
          text: "Pide una frecuencia menor o define una probabilidad. Claude puede ajustar cómo se elige la pieza al azar. Revisa el diff.",
        },
        {
          title: "¿Puedo hacer la tarea con funciones distintas a las de la lista?",
          text: "Sí. Si en las siguientes secciones se retoma este juego, conviene que sigan funcionando los controles y las reglas básicas.",
        },
      ],
    },
    { type: "heading", level: 2, text: "Qué sigue" },
    {
      type: "paragraph",
      text: "Con el flujo de trabajo cerrado, el Día 12 abre una sección nueva con `/batch`, que reparte un cambio grande entre varias unidades de trabajo en paralelo. Antes, deja tu Tetris con alguna función propia en `main` y publicado en Pages: lo vas a reutilizar.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 12, verifica que puedes explicar...",
      items: [
        "Cómo se publica el juego con GitHub Pages y qué requisitos y visibilidad tiene.",
        "Por qué el clasificador etiqueta pero no implementa, y qué comentario sí lo hace.",
        "Cómo revisas la rama de Claude en local antes de fusionar y qué haces después con git pull.",
        "Cómo describes un fallo y qué ganas pidiéndolo en modo plan.",
        "Qué palabra es clave para razonar más en un mensaje y por qué think hard no cuenta.",
        "Cuándo conviene /effort y qué nivel es el predeterminado.",
        "Los pasos para añadir una pieza nueva en una rama, de la creación al borrado.",
        "Qué ideas propias vas a implementar y en qué ramas.",
      ],
    },
    { type: "heading", level: 2, text: "Fuentes consultadas (noviembre 2026)" },
    {
      type: "list",
      items: [
        "[Configuración de modelos, esfuerzo y ultrathink](https://code.claude.com/docs/en/model-config)",
        "[Buenas prácticas para Claude Code](https://code.claude.com/docs/en/best-practices)",
        "[Modos de permisos: revisar y aprobar un plan](https://code.claude.com/docs/en/permission-modes)",
        "[Claude Code en GitHub Actions](https://code.claude.com/docs/en/github-actions)",
        "[Modo interactivo y atajos](https://code.claude.com/docs/en/interactive-mode)",
        "[Referencia de comandos](https://code.claude.com/docs/en/commands)",
        "[GitHub Pages: configurar una fuente de publicación](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)",
        "[GitHub Pages: qué es](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)",
        "[GitHub: vincular un pull request a un issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/linking-a-pull-request-to-an-issue)",
        "[Git: git switch](https://git-scm.com/docs/git-switch)",
        "[Git: git branch](https://git-scm.com/docs/git-branch)",
        "[Git: git merge](https://git-scm.com/docs/git-merge)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "¿Qué rama y carpeta se eligen para publicar con GitHub Pages en este ejercicio?",
      options: ["La rama main, carpeta raíz", "Una rama vacía", "La carpeta docs de otra rama", "Solo la rama del issue"],
      correctIndex: 0,
      explanation: "Pages busca un index.html en la carpeta raíz de main y lo sirve. Cada fusión en main vuelve a publicar.",
    },
    {
      question: "Tu repositorio es privado y tienes el plan Free. ¿Qué pasa con Pages?",
      options: [
        "Funciona igual",
        "Necesitas un plan de pago o hacer el repositorio público. El sitio, además, siempre es público",
        "Solo se publica en tu equipo",
        "Se publica pero cifrado",
      ],
      correctIndex: 1,
      explanation: "Con el plan Free, Pages solo está en repositorios públicos. Y un sitio de Pages es público aunque el repositorio sea privado.",
    },
    {
      question: "El clasificador etiquetó tu issue. ¿Cómo haces que Claude implemente la solución?",
      options: [
        "Cerrar el issue",
        "Comentar con @claude y pedirlo",
        "Borrar las etiquetas",
        "Esperar a que lo haga solo",
      ],
      correctIndex: 1,
      explanation: "El clasificador solo etiqueta y comenta. La implementación la dispara una mención a @claude.",
    },
    {
      question: "Fusionaste el pull request en GitHub. ¿Qué hace falta para que tu copia local lo tenga?",
      options: ["Nada, es automático", "git pull en main", "Borrar la carpeta", "Reiniciar Claude Code"],
      correctIndex: 1,
      explanation: "Los cambios fusionados en GitHub están en el remoto. Tu equipo los recibe con git pull.",
    },
    {
      question: "¿Qué palabra pide un razonamiento más profundo solo en ese mensaje?",
      options: ["think hard", "ultrathink", "pensar mucho", "extra"],
      correctIndex: 1,
      explanation: "Solo ultrathink es una palabra clave. Think, think hard y think more se pasan como texto normal.",
    },
    {
      question: "¿Qué nivel de esfuerzo es el predeterminado en los modelos 5.5 actuales?",
      options: ["low", "medium", "max", "No hay nivel"],
      correctIndex: 1,
      explanation: "Opus 5.5, Sonnet 5.5, Haiku 5.5 y Fable 5.2 empiezan en medium, y se cambia con /effort.",
    },
    {
      question: "¿Cuándo conviene pedir un fallo en modo plan en lugar de aprobar ediciones directamente?",
      options: [
        "Siempre, aunque sea trivial",
        "Cuando hay que pensar: el plan explica la causa y te deja revisar el cambio antes de tocar nada",
        "Nunca",
        "Solo con Ollama",
      ],
      correctIndex: 1,
      explanation: "El plan cuesta algo más, pero evita aplicar a ciegas un cambio que requiere razonar.",
    },
    {
      question: "¿Qué hace el modo opusplan?",
      options: [
        "Usa siempre Haiku",
        "Usa Opus para planificar y Sonnet para ejecutar",
        "Desactiva el plan",
        "Solo funciona en GitHub",
      ],
      correctIndex: 1,
      explanation: "La parte más difícil es pensar la solución. opusplan reserva el modelo más fuerte para eso.",
    },
    {
      question: "Quieres una pieza nueva. ¿Qué haces antes de pedirla?",
      options: [
        "Nada, pedirla directamente",
        "Crear una rama propia, por ejemplo con git switch -c 01-pieza-3x3",
        "Borrar main",
        "Hacer un fork nuevo",
      ],
      correctIndex: 1,
      explanation: "Con una rama, Claude puede equivocarse sin tocar main. Además, el número inicial ayuda con el tabulador.",
    },
    {
      question: "¿Qué hace git branch -d tras fusionar?",
      options: [
        "Borra también la rama remota",
        "Borra la rama local ya fusionada",
        "Borra main",
        "Deshace la fusión",
      ],
      correctIndex: 1,
      explanation: "Solo borra la copia local y únicamente si está fusionada. El remoto es otro comando.",
    },
  ],
};
