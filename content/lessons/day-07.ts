import type { Lesson } from "@/lib/types";

// Día 7 · Clases 26, 27 y 28 de la transcripción (el artículo 29 solo enlaza el código de la sección).
// Contenido verificado en noviembre de 2026.
export const day07: Lesson = {
  day: 7,
  slug: "corregir-errores-git-e-implementar-funciones",
  title: "Corregir errores, Git e implementar funcionalidades",
  section: "Fundamentos 101",
  estimatedMinutes: 55,
  icon: "🔧",
  objectives: [
    "Describir un error a Claude Code con el contexto justo, ya sea con el mensaje de la consola o con la descripción de un síntoma.",
    "Hacer que Claude use el historial de Git para encontrar el cambio que rompió algo, y saber cuándo conviene `git revert`.",
    "Implementar una función nueva en una rama propia: crear la rama, planificar, aprobar, revisar, confirmar y fusionar.",
    "Leer los mensajes de commit antes de aceptarlos y comprobar que el programa funciona antes de confirmar.",
    "Elegir entre dar contexto con texto o con una imagen, y entre aceptar un plan tal cual o ajustarlo.",
  ],
  blocks: [
    {
      type: "paragraph",
      text: "Con la herramienta ya instalada y el contexto bajo control, llega el trabajo cotidiano: algo se rompe, hay que encontrar por qué y hay que añadir una función sin estropear lo que ya funciona. Este día reúne tres habilidades que se apoyan entre sí: describir bien un error, aprovechar el historial de Git para ubicar el cambio que lo causó y implementar una función nueva dentro de una rama, con un plan aprobado antes de tocar el código.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "3", label: "Datos que conviene incluir al describir un error: qué hiciste, el mensaje y el lugar" },
        { value: "git log", label: "Comando con el que Claude revisa el historial del repositorio" },
        { value: "git revert", label: "Deshace un commit sin reescribir la historia" },
        { value: "1", label: "Rama nueva por cada función, creada antes de pedir cambios" },
        { value: "/plan", label: "Entra en modo plan desde el cuadro de mensaje" },
        { value: "-d", label: "Opción de git branch que solo borra ramas ya fusionadas" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text: "Contenido verificado en noviembre de 2026 contra las páginas oficiales de flujos comunes, buenas prácticas, modos de permisos y comandos de Claude Code. Los comandos de Git se ejecutaron en un repositorio de prueba para comprobar sus salidas. Los mensajes de error de la consola dependen del navegador.",
    },
    { type: "heading", level: 2, text: "Corregir errores de código" },
    {
      type: "paragraph",
      text: "Claude Code es especialmente bueno con errores y excepciones. Empieza con `/clear` si lo que vas a hacer no se relaciona con lo anterior: el historial viejo no ayuda a diagnosticar un problema nuevo y cuesta tokens. Para practicar, usa el proyecto de nave del Día 6. Si lo deseas, guarda antes tu estado con un commit: te permite volver a un punto conocido si el experimento sale mal.",
    },
    { type: "heading", level: 3, text: "Un error con mensaje" },
    {
      type: "paragraph",
      text: "Borra del archivo `game.js` la línea que declara `keys`. Guarda y recarga el navegador: el juego deja de funcionar. Abre las herramientas de desarrollador, que se abren con un atajo del navegador, y ve a la consola: aparece un `ReferenceError` que indica que `keys` no está definido, con el archivo y la línea. Esa información es exactamente lo que Claude necesita.",
    },
    {
      type: "image",
      src: "/img/dia-07/describir-un-error.svg",
      alt: "Dos columnas. A la izquierda, un mensaje vago como arregla el error, que obliga a Claude a explorar medio proyecto. A la derecha, un mensaje concreto que cuenta qué se hizo, incluye el mensaje exacto de la consola, y señala el archivo, con lo que Claude lee lo justo.",
      caption: "Un mensaje concreto ahorra lecturas y tokens.",
    },
    {
      type: "paragraph",
      text: "Hay dos maneras de pasarle el error. La documentación indica que se puede pegar una captura en el cuadro de mensaje o canalizar la salida de un comando. Pegar el texto del error suele ser más directo que una captura, y también funciona. Con una captura de pantalla (en macOS, Cmd+Shift+4, o el atajo de tu sistema) se pega con Ctrl+V. Acompaña siempre el error con una frase que diga qué hiciste: \"cargué la aplicación y en la consola aparece este error\".",
    },
    {
      type: "list",
      items: [
        "Cuenta qué hiciste y qué esperabas que pasara.",
        "Incluye el mensaje exacto, no una paráfrasis.",
        "Indica el comando o los pasos para reproducirlo, y si falla siempre o solo a veces.",
        "Señala el archivo o la carpeta si los conoces, con `@`.",
        "Evita \"arregla el error\" a secas: Claude tendría que leer todo el proyecto para adivinar.",
      ],
    },
    {
      type: "paragraph",
      text: "Claude lee el archivo, ve en qué línea falla y repone lo que faltaba. Léelo: comprueba que lo que escribió es razonable y recarga el navegador para ver que el juego responde.",
    },
    { type: "heading", level: 3, text: "Un problema sin mensaje" },
    {
      type: "paragraph",
      text: "Ahora borra el bloque de `window.addEventListener` de las teclas y recarga. El juego carga, pero no reacciona al teclado, y la consola no muestra ningún error. Pasa entonces a una conversación limpia y describe el síntoma: qué teclas pulsas, qué debería ocurrir, qué ocurre y que la consola no muestra errores. Con eso Claude lee el archivo, nota que faltan los oyentes de teclado y los restituye. Puede que no escriba el mismo código que tenías, pero el comportamiento vuelve.",
    },
    {
      type: "image",
      src: "/img/dia-07/ciclo-de-correccion.svg",
      alt: "Cinco pasos en fila: reproducir el error, dar contexto, diagnóstico de Claude, corrección y comprobación. Una flecha punteada de vuelta indica que si sigue fallando se aporta el nuevo mensaje. Debajo, un recordatorio de usar /clear entre problemas sin relación.",
      caption: "El ciclo para corregir un error, de reproducirlo a comprobarlo.",
    },
    {
      type: "callout",
      variant: "warning",
      text: "Cuando el proyecto funciona, confirma el estado con un commit. No guardes cambios si el programa no funciona. Y lee los mensajes de commit que se generan solos: pueden describir mal lo que hiciste.",
    },
    { type: "heading", level: 2, text: "Claude Code puede ver Git" },
    {
      type: "paragraph",
      text: "Empieza otra vez con `/clear`. Para ver por qué importa leer los commits, haz este experimento: borra la sección de entrada del teclado, haz un commit con un mensaje que no la describe (por ejemplo \"quitar oyentes redundantes\") y súbelo. El juego ya no responde a las teclas, y si hay un despliegue automático, el problema llegaría a donde juegan los demás. Moraleja: lee el mensaje antes de aceptar un commit, comprueba el comportamiento antes de confirmar y no publiques sin probar.",
    },
    {
      type: "paragraph",
      text: "Para que Claude lo repare, dile que antes funcionaba, qué dejó de funcionar y, si hace falta, que revise el historial de Git. En modo plan, Claude ejecuta `git log --oneline`, encuentra el commit sospechoso, lee sus cambios y concluye que quitó los oyentes de teclado. Puede hacerlo porque trabaja sobre la carpeta del proyecto, que incluye el directorio oculto `.git`.",
    },
    {
      type: "image",
      src: "/img/dia-07/historial-de-git.svg",
      alt: "Línea de tiempo con cuatro commits: A nave con teclado que funciona, B disparo triple que funciona, C refactor que quita los oyentes y rompe el juego, y D, un commit que revierte C. Debajo, una explicación de cómo ayuda Claude Code y qué hace git revert.",
      caption: "Claude lee el historial para ubicar el commit que rompió el juego. git revert lo deshace con un commit nuevo.",
    },
    {
      type: "paragraph",
      text: "Claude puede deshacer el cambio editando el archivo. Si el commit roto ya está publicado, la forma segura es `git revert`: crea un commit nuevo que invierte al anterior y no reescribe la historia. Si el proyecto es grande, acota la búsqueda: menciona un archivo con `@` y su nombre, por ejemplo `@game.js`, y pide que lo revise.",
    },
    {
      type: "callout",
      variant: "info",
      text: "El video menciona un modo llamado ultra plan. La referencia de comandos actual indica que `/ultraplan` ya no existe y que se debe usar el modo plan. Si ves la opción en tu versión, es la misma idea: aprobar el plan antes de que Claude edite.",
    },
    { type: "heading", level: 2, text: "Implementar una función nueva" },
    {
      type: "paragraph",
      text: "Añadir una función es el trabajo que más cuesta si sale mal, así que se hace con dos redes de seguridad: una rama de Git y un plan aprobado. Para el ejemplo, añade un potenciador de disparo triple a la nave: aparece de forma aleatoria cuando se destruye algo, una sola vez por partida, y al recogerlo la nave dispara tres balas en abanico durante unos segundos. Puedes inventar otros: un escudo temporal, cámara lenta o una bomba que destruye todo en pantalla.",
    },
    {
      type: "image",
      src: "/img/dia-07/flujo-de-rama.svg",
      alt: "Un diagrama con la rama main arriba y una rama de función que se separa y se fusiona de nuevo. Debajo, cinco pasos: crear la rama, planificar, implementar, commit y fusionar con git switch main, git merge y git branch -d.",
      caption: "Una función nueva se desarrolla en su rama y se fusiona cuando funciona.",
    },
    { type: "heading", level: 3, text: "Primero, la rama" },
    {
      type: "paragraph",
      text: "Antes de pedir nada, crea la rama. `git switch -c nombre` la crea y te pasa a ella, y es equivalente a `git checkout -b nombre`, la forma clásica. Ponle un nombre con número, por ejemplo `01-powerup-triple-shot`, que facilita completarla con el tabulador. Se puede pedir a Claude que lo haga, pero es un gasto de tokens para algo que tarda una fracción de segundo.",
    },
    { type: "heading", level: 3, text: "Después, el plan" },
    {
      type: "paragraph",
      text: "En la rama nueva, pasa al modo plan con Shift+Tab o con `/plan`. Después describe la función con detalle: qué hace, cuándo aparece, cuánto dura, restricciones. Cuanto más claro lo digas, menos iteraciones necesitarás. Claude lee el código y propone un plan: clases nuevas, cambios en la nave y las constantes de configuración. Léelo entero. Si algo no te cuadra, pídele cambios aún dentro del plan: por ejemplo, que dure 5 segundos y no 10. Solo cuando estés conforme, apruébalo.",
    },
    {
      type: "paragraph",
      text: "Al aprobar, Claude te pregunta cómo continuar: aceptar las ediciones automáticamente, aprobar cada una a mano o seguir ajustando el plan. Mientras implementa, abre el control de versiones de tu editor y mira qué incluye. Un buen indicio es que la implementación piense a futuro, por ejemplo guardando los potenciadores en un arreglo para poder añadir más.",
    },
    { type: "heading", level: 3, text: "Probar, ajustar, confirmar y fusionar" },
    {
      type: "paragraph",
      text: "Recarga el juego y busca el potenciador: debe aparecer con un icono, activar el disparo triple y, si lo pediste, mostrar un temporizador. Si no cumple lo acordado (por ejemplo, que salga al menos una vez por nivel), vuelve al modo plan y pídeselo como un cambio nuevo. Cuando todo esté bien, haz el commit, leyendo el mensaje. Después:",
    },
    {
      type: "code",
      lang: "bash",
      title: "Fusionar la rama y limpiar",
      code: "git switch main\ngit merge 01-powerup-triple-shot\ngit branch -d 01-powerup-triple-shot",
    },
    {
      type: "paragraph",
      text: "La opción `-d` solo borra una rama que ya está fusionada. Si todavía tiene commits sin fusionar, Git se niega y te avisa. Subir `main` al repositorio remoto es un paso aparte, con `git push`, que se hace cuando decides publicarlo. Para crear un pull request en lugar de fusionar en local, la documentación indica que se puede pedir directamente a Claude \"create a pr\", y que conviene revisar lo que genera antes de enviarlo.",
    },
    { type: "heading", level: 2, text: "Ejercicios guiados y experimentos" },
    {
      type: "paragraph",
      text: "Los ejercicios se hacen con Claude Code y Git en tu equipo, sobre el proyecto de nave del Día 6. Los comandos de Git de los ejercicios 5 y 8 los ejecuté en un repositorio de prueba. Los editores de código verifican en el navegador cálculos y reglas de la lección.",
    },
    {
      type: "exercise",
      title: "Ejercicio 1: guardar un estado conocido",
      description: "Crea un repositorio con tu proyecto funcionando. Si ya lo tienes, comprueba el estado.",
      steps: [
        {
          instruction: "Entra en la carpeta del Día 6 y crea el repositorio con la rama main.",
          command: "cd ~/ClaudeCode/03-nave && git init -b main && git add . && git commit -m \"feat: nave con teclado\"",
          expected: "Initialized empty Git repository in .../03-nave/.git/\n[main (root-commit) abc1234] feat: nave con teclado",
        },
        {
          instruction: "Comprueba que no hay cambios pendientes.",
          command: "git status --short",
          expected: "(sin salida: el árbol de trabajo está limpio)",
        },
      ],
      verify: "El estado queda limpio. Si Git pide tu nombre y correo, configúralos con git config. Tienes un punto de vuelta seguro.",
    },
    {
      type: "exercise",
      title: "Ejercicio 2: romper el código a propósito",
      description: "Provoca un error con mensaje y mira cómo se ve.",
      steps: [
        {
          instruction: "En game.js, borra la línea que declara el objeto de teclas (const keys = {};). Guarda.",
        },
        {
          instruction: "Abre index.html en el navegador y la consola de desarrollador. Recarga la página.",
          expected: "La consola muestra un error del tipo ReferenceError: keys is not defined, con el archivo game.js y el número de línea.",
        },
      ],
      verify: "El juego no responde y el error indica el nombre que falta. El texto exacto depende del navegador.",
    },
    {
      type: "exercise",
      title: "Ejercicio 3: pedir la corrección con contexto",
      description: "Hazlo en una conversación limpia.",
      steps: [
        {
          instruction: "Inicia Claude Code, vacía el contexto y envía el mensaje con el error pegado como texto. Si prefieres, pega una captura con Ctrl+V.",
          command: "Cargué index.html y la consola muestra ReferenceError: keys is not defined en game.js. Antes funcionaba. Corrígelo.",
          expected: "Claude lee game.js, explica que falta declarar keys y propone el cambio.",
        },
        {
          instruction: "Acepta el cambio, revisa el diff y recarga el navegador.",
          command: "/diff",
          expected: "La vista de cambios con la línea que se repuso en game.js.",
        },
      ],
      verify: "El juego vuelve a responder. Si no, pega el nuevo mensaje de la consola y repite.",
    },
    {
      type: "exercise",
      title: "Ejercicio 4: un fallo sin mensaje",
      description: "Describe el síntoma, no el error.",
      steps: [
        {
          instruction: "Borra los dos window.addEventListener de game.js, guarda, recarga y comprueba que la nave ya no se mueve y que la consola no muestra errores.",
        },
        {
          instruction: "Vacía el contexto y describe el síntoma.",
          command: "/clear",
        },
        {
          instruction: "Envía el mensaje.",
          command: "La nave no responde a las flechas del teclado. La consola no muestra errores. Debería moverse. Revisa @game.js.",
          expected: "Claude detecta que no hay oyentes de teclado y los añade de nuevo.",
        },
      ],
      verify: "La nave vuelve a moverse. Fíjate en que no pediste \"arregla el error\": diste el síntoma y el archivo.",
    },
    {
      type: "exercise",
      title: "Ejercicio 5: confirmar y revisar el historial",
      description: "Comprueba primero que el juego funciona y después haz el commit.",
      steps: [
        {
          instruction: "Confirma los cambios con un mensaje que describa lo que pasó realmente.",
          command: "git add game.js && git commit -m \"fix: restaurar oyentes de teclado\"",
          expected: "[main abc1234] fix: restaurar oyentes de teclado\n 1 file changed, 8 insertions(+)",
        },
        {
          instruction: "Mira el historial resumido.",
          command: "git log --oneline",
          expected: "abc1234 fix: restaurar oyentes de teclado\n9876543 feat: nave con teclado\n(los identificadores serán los de tu repositorio)",
        },
      ],
      verify: "Cada commit tiene un mensaje que dice lo que hizo. Si un mensaje generado dice otra cosa, edítalo antes de confirmar.",
    },
    {
      type: "exercise",
      title: "Ejercicio 6: encontrar el cambio que rompió el juego",
      description: "Rompe algo en un commit y pide a Claude que use el historial para encontrarlo.",
      steps: [
        {
          instruction: "Borra los oyentes de teclado y confirma con un mensaje engañoso. Recarga y comprueba que no responde.",
          command: "git add game.js && git commit -m \"refactor: quitar codigo redundante\"",
          expected: "[main abc1234] refactor: quitar codigo redundante",
        },
        {
          instruction: "Entra en modo plan con /plan y cuéntaselo, pidiendo que mire Git.",
          command: "El juego ya no reacciona al teclado, pero antes de mis últimos cambios funcionaba. Revisa el historial de Git para encontrar la causa.",
          expected: "Claude ejecuta git log --oneline, localiza el último commit, lee su diff y explica que quitó los oyentes de teclado.",
        },
      ],
      verify: "La causa apunta al commit engañoso. Aprueba la corrección o, si ya está publicado, pídele git revert.",
    },
    {
      type: "exercise",
      title: "Ejercicio 7: implementar una función en una rama",
      description: "Desde main limpio, crea la rama y pide un potenciador. Aprende a ajustar el plan antes de aprobarlo.",
      steps: [
        {
          instruction: "Crea la rama de trabajo.",
          command: "git switch -c 01-powerup-triple-shot",
          expected: "Switched to a new branch '01-powerup-triple-shot'",
        },
        {
          instruction: "Entra en modo plan y pide la función con detalle.",
          command: "Añade un potenciador de disparo triple: aparece una sola vez por partida, al destruir un objeto, al azar. Al recogerlo, la nave dispara tres balas en abanico durante 5 segundos y se muestra un temporizador. Guarda los potenciadores en un arreglo para poder añadir más.",
          expected: "Claude lee game.js y propone un plan con clases, cambios en la nave y constantes de configuración.",
        },
        {
          instruction: "Ajusta el plan con un cambio pequeño y después aprueba la ejecución con ediciones automáticas.",
          command: "Haz que además garantice que aparezca al menos una vez por nivel.",
        },
      ],
      verify: "Recarga el juego y recoge el potenciador. Si no aparece como acordaste, vuelve al modo plan y pídelo como un cambio nuevo.",
    },
    {
      type: "exercise",
      title: "Ejercicio 8: confirmar, fusionar y limpiar",
      description: "Cierra la rama cuando la función funciona.",
      steps: [
        {
          instruction: "Confirma la función con un mensaje que la describa.",
          command: "git add -A && git commit -m \"feat: potenciador de disparo triple\"",
          expected: "[01-powerup-triple-shot abc1234] feat: potenciador de disparo triple",
        },
        {
          instruction: "Vuelve a main y fusiona.",
          command: "git switch main && git merge 01-powerup-triple-shot",
          expected: "Switched to branch 'main'\nUpdating abc1234..def5678\nFast-forward\n game.js | 1 +\n 1 file changed, 1 insertion(+)",
        },
        {
          instruction: "Borra la rama ya fusionada y comprueba las ramas que quedan.",
          command: "git branch -d 01-powerup-triple-shot && git branch",
          expected: "Deleted branch 01-powerup-triple-shot (was abc1234).\n* main",
        },
      ],
      verify: "Solo queda main y el potenciador forma parte de ella. No hace falta hacer push si no quieres publicar.",
    },
    {
      type: "playground",
      title: "Experimento 9: ¿está bien descrito el error?",
      description: "Una comprobación sencilla de un mensaje para Claude: cuenta si incluye qué hiciste, el mensaje del error y el archivo. Escribe tus propios mensajes y vuelve a ejecutar.",
      code: "function evaluar(mensaje) {\n  const t = mensaje.toLowerCase();\n  const datos = [\n    t.includes(\"cargu\") || t.includes(\"al \"),\n    t.includes(\"error\") || t.includes(\"undefined\"),\n    t.includes(\".js\") || t.includes(\"@\"),\n  ];\n  return datos.filter(Boolean).length;\n}\n\nconsole.log(evaluar(\"Arregla el error\"));\nconsole.log(evaluar(\"Cargue la pagina y sale ReferenceError en game.js\"));\nconsole.log(evaluar(\"La nave no se mueve y no hay nada\"));",
      expected: "1\n3\n0",
    },
    {
      type: "playground",
      title: "Experimento 10: buscar el primer commit roto",
      description: "Cuando una función dejó de funcionar, el primer commit que falla es el sospechoso. Recorre el historial de más antiguo a más reciente y encuentra dónde cambia el estado, como lo haría una búsqueda en el historial.",
      code: "const historial = [\n  { mensaje: \"feat: nave con teclado\", funciona: true },\n  { mensaje: \"feat: disparo triple\", funciona: true },\n  { mensaje: \"refactor: quitar listeners\", funciona: false },\n  { mensaje: \"docs: actualizar readme\", funciona: false },\n];\n\nconst indice = historial.findIndex((c) => !c.funciona);\nconsole.log(\"primer commit roto: \" + historial[indice].mensaje);\nconsole.log(\"ultimo que funcionaba: \" + historial[indice - 1].mensaje);",
      expected: "primer commit roto: refactor: quitar listeners\nultimo que funcionaba: feat: disparo triple",
    },
    {
      type: "playground",
      title: "Experimento 11: tres balas en abanico",
      description: "Calcula la velocidad de cada bala del disparo triple con una velocidad de 5 y ángulos de -15, 0 y 15 grados respecto a la vertical. Cambia el ángulo y la velocidad.",
      code: "const velocidad = 5;\n\nfor (const grados of [-15, 0, 15]) {\n  const rad = (grados * Math.PI) / 180;\n  const vx = Math.sin(rad) * velocidad;\n  const vy = -Math.cos(rad) * velocidad;\n  console.log(grados + \" grados: \" + vx.toFixed(2) + \", \" + vy.toFixed(2));\n}",
      expected: "-15 grados: -1.29, -4.83\n0 grados: 0.00, -5.00\n15 grados: 1.29, -4.83",
    },
    {
      type: "playground",
      title: "Experimento 12: duración de un potenciador",
      description: "Un juego a 60 fotogramas por segundo cuenta el tiempo en fotogramas. Calcula cuántos fotogramas dura un potenciador de 5 y de 8 segundos, y cuánto queda tras 2 segundos.",
      code: "const fps = 60;\n\nfunction fotogramas(segundos) {\n  return segundos * fps;\n}\n\nconsole.log(\"5 s = \" + fotogramas(5) + \" fotogramas\");\nconsole.log(\"8 s = \" + fotogramas(8) + \" fotogramas\");\nconsole.log(\"quedan: \" + (fotogramas(5) - fotogramas(2)) + \" fotogramas\");",
      expected: "5 s = 300 fotogramas\n8 s = 480 fotogramas\nquedan: 180 fotogramas",
    },
    { type: "heading", level: 2, text: "¿Qué usar en cada caso?" },
    {
      type: "table",
      headers: ["Si necesitas...", "Usa...", "Nota"],
      rows: [
        ["Corregir un error con mensaje", "Pegar el mensaje exacto con qué hiciste y dónde", "Texto o captura: ambos funcionan."],
        ["Corregir un fallo sin mensaje", "Describir el síntoma y señalar el archivo con `@`", "Qué debería pasar y qué pasa."],
        ["Empezar sin arrastrar lo anterior", "`/clear`", "Cuando el problema nuevo no tiene relación."],
        ["Encontrar qué rompió algo que antes funcionaba", "Pedir que revise el historial de Git", "Ejecuta `git log` y lee los cambios del commit sospechoso."],
        ["Deshacer un commit ya publicado", "`git revert`", "Crea un commit nuevo y no reescribe la historia."],
        ["Añadir una función", "Una rama nueva y el modo plan", "Un punto de control más duradero que el rebobinado."],
        ["Ajustar lo propuesto antes de ejecutar", "Seguir pidiendo cambios dentro del plan", "No aprueba hasta que lo apruebes."],
        ["Volver a la rama principal sin la función", "`git switch main` y borrar la rama sin fusionar con `-D`", "Descarta el trabajo. Úsalo con cuidado."],
        ["Publicar los cambios", "`git push` o pedir un pull request", "Revisa lo que genera antes de enviarlo."],
      ],
    },
    { type: "heading", level: 2, text: "Datos que suelen aparecer desactualizados" },
    {
      type: "table",
      headers: ["Suele decirse", "Información verificada (noviembre 2026)"],
      rows: [
        ["Una captura de pantalla es la forma habitual de enseñar un error.", "La documentación acepta capturas y también salida de comandos. Pegar el texto exacto del error suele ser más directo. Lo importante es acompañarlo de qué hiciste y dónde falla."],
        ["Hay que pasar al modo ultra plan para planificar mejor.", "La referencia de comandos indica que `/ultraplan` ya no existe y que se use el modo plan, que se activa con Shift+Tab o con `/plan`."],
        ["La rama se crea con git checkout -b.", "Sigue funcionando, pero Git ofrece también `git switch -c nombre`, más claro y equivalente para crear y cambiar de rama."],
        ["Para deshacer un cambio publicado se edita el archivo a mano.", "Si el commit está publicado, `git revert` crea un commit que lo invierte sin reescribir la historia."],
        ["`git branch -d` borra cualquier rama.", "Solo borra ramas ya fusionadas. Para descartar una rama sin fusionar se usa `-D`, y se pierde su trabajo."],
        ["Claude Code no puede crear pull requests.", "Se le puede pedir directamente que cree uno. Funciona con `gh` instalado y con sesión iniciada. Revisa la descripción antes de enviarlo."],
        ["Los mensajes de commit generados son fiables.", "Pueden describir mal lo que cambió. Léelos siempre antes de confirmar: es lo que hace útil el historial."],
        ["Publicar sin probar es aceptable si hay un despliegue automático.", "Un despliegue automático publica también lo que está roto. Prueba antes de confirmar y protege `main` con reglas de la rama."],
      ],
    },
    { type: "heading", level: 2, text: "Preguntas frecuentes" },
    {
      type: "accordion",
      items: [
        {
          title: "¿Debo pegar una captura o el texto del error?",
          text: "Cualquiera de los dos funciona. El texto exacto suele ser más directo de procesar. Con una captura de pantalla, acompáñala con una frase que diga qué hiciste.",
        },
        {
          title: "¿Por qué no basta con \"arregla el error\"?",
          text: "Porque Claude no sabe dónde mirar y puede leer muchos archivos para adivinar, lo que cuesta tokens. Con el mensaje, qué hiciste y el archivo, va directo.",
        },
        {
          title: "¿Puede Claude ver mis commits?",
          text: "Sí. Trabaja sobre la carpeta del proyecto, que incluye el directorio `.git`, y puede ejecutar comandos de Git como `git log` para leer el historial. Dile que antes funcionaba y que revise el historial.",
        },
        {
          title: "¿Por qué crear una rama si existe el rebobinado?",
          text: "Porque el rebobinado es de la sesión, solo rastrea los cambios de los archivos que Claude editó y descarta lo posterior. Una rama es un punto de control permanente que puedes comparar, fusionar o descartar sin tocar `main`.",
        },
        {
          title: "¿Qué hago si el plan no me convence?",
          text: "Pídele cambios sin aprobarlo: más corto, otra duración, otra condición. El modo plan no edita hasta que lo apruebas, así que ajustar ahí es barato.",
        },
        {
          title: "Fusioné y ahora me arrepiento. ¿Qué hago?",
          text: "Si no publicaste, revisa `git log` y usa `git revert` sobre el commit de fusión, o `git reset` si prefieres reescribir la historia. Si ya publicaste, usa `git revert` para no cambiar la historia compartida.",
        },
      ],
    },
    { type: "heading", level: 2, text: "Qué sigue" },
    {
      type: "paragraph",
      text: "Con esto termina el bloque de fundamentos de Claude Code. Como práctica final, implementa otro potenciador en una rama nueva: un escudo temporal, cámara lenta o una bomba. El Día 8 empieza el flujo de trabajo diario: un proyecto nuevo y los comandos iniciales de Claude Code.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 8, verifica que puedes explicar...",
      items: [
        "Qué incluir al describir un error y por qué \"arregla el error\" gasta más tokens.",
        "Cómo describir un fallo que no genera mensaje de error.",
        "Cómo le pides a Claude que use el historial de Git para encontrar qué rompió algo.",
        "La diferencia entre revertir con `git revert` y reescribir la historia.",
        "Los pasos para añadir una función: rama, plan, aprobación, revisión, commit y fusión.",
        "Por qué se lee el mensaje de commit y se prueba el programa antes de confirmar.",
        "Qué hace `git branch -d` y cuándo se usa `-D`.",
      ],
    },
    { type: "heading", level: 2, text: "Fuentes consultadas (noviembre 2026)" },
    {
      type: "list",
      items: [
        "[Flujos de trabajo comunes: errores, planes y pull requests](https://code.claude.com/docs/en/common-workflows)",
        "[Buenas prácticas para Claude Code](https://code.claude.com/docs/en/best-practices)",
        "[Modos de permisos y modo plan](https://code.claude.com/docs/en/permission-modes)",
        "[Referencia de comandos](https://code.claude.com/docs/en/commands)",
        "[Puntos de control y rebobinado](https://code.claude.com/docs/en/checkpointing)",
        "[Git: git switch](https://git-scm.com/docs/git-switch)",
        "[Git: git revert](https://git-scm.com/docs/git-revert)",
        "[Git: git branch](https://git-scm.com/docs/git-branch)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "¿Qué debe incluir un buen mensaje para pedir la corrección de un error?",
      options: [
        "Solo la palabra error",
        "Qué hiciste, el mensaje exacto y dónde falla",
        "El código fuente completo del proyecto",
        "Una disculpa a Claude",
      ],
      correctIndex: 1,
      explanation: "Con lo que hiciste, el mensaje exacto y el archivo, Claude lee lo justo. Un mensaje vago obliga a explorar el proyecto y consume tokens.",
    },
    {
      question: "El juego no responde al teclado y la consola no muestra errores. ¿Qué haces?",
      options: [
        "Reinstalar Claude Code",
        "Describir el síntoma: qué debería pasar, qué pasa y que la consola no muestra errores, y señalar el archivo",
        "Escribir arregla el juego",
        "Borrar la carpeta",
      ],
      correctIndex: 1,
      explanation: "Sin mensaje de error, el síntoma es el contexto. Qué esperas, qué ocurre y dónde mirar bastan para que Claude encuentre la causa.",
    },
    {
      question: "Algo que antes funcionaba dejó de hacerlo. ¿Qué le pides a Claude además del síntoma?",
      options: [
        "Que reinicie el equipo",
        "Que revise el historial de Git para encontrar el cambio sospechoso",
        "Que borre el repositorio",
        "Que cambie de modelo",
      ],
      correctIndex: 1,
      explanation: "Claude puede ejecutar git log, leer el diff del commit sospechoso y concluir qué cambió.",
    },
    {
      question: "Un commit roto ya está publicado. ¿Cuál es la forma segura de deshacerlo?",
      options: [
        "git revert, que crea un commit que lo invierte",
        "Borrar la carpeta .git",
        "Reescribir la historia con push forzado",
        "Ignorarlo",
      ],
      correctIndex: 0,
      explanation: "git revert deja la historia intacta y añade un commit que invierte el cambio. Reescribir historia publicada afecta a quien ya la tiene.",
    },
    {
      question: "¿Qué comando crea una rama y te pasa a ella?",
      options: ["git switch -c nombre", "git rama nombre", "git new nombre", "git branch -m nombre"],
      correctIndex: 0,
      explanation: "git switch -c nombre crea y cambia de rama. Es equivalente a git checkout -b nombre.",
    },
    {
      question: "¿Por qué se pide una función nueva primero en modo plan?",
      options: [
        "Porque es más barato que editar",
        "Porque Claude propone un plan que puedes revisar y ajustar antes de que toque el código",
        "Porque el modo plan ejecuta las pruebas",
        "Porque no necesita permisos",
      ],
      correctIndex: 1,
      explanation: "En modo plan Claude lee y propone sin editar. Corregir el plan antes de aprobarlo evita implementar una idea equivocada.",
    },
    {
      question: "¿Qué ocurre con git branch -d en una rama con commits sin fusionar?",
      options: [
        "La borra igualmente",
        "Se niega a borrarla y avisa",
        "La fusiona automáticamente",
        "Borra main",
      ],
      correctIndex: 1,
      explanation: "La opción -d solo borra ramas ya fusionadas. Para descartar una rama sin fusionar hay que usar -D, y se pierde su trabajo.",
    },
    {
      question: "¿Qué comando usas para volver a la rama principal antes de fusionar?",
      options: ["git switch main", "git delete main", "git undo", "git clear"],
      correctIndex: 0,
      explanation: "git switch main te lleva a la rama principal. Desde ahí, git merge rama fusiona la rama de la función.",
    },
    {
      question: "El mensaje de commit que generó una herramienta no describe lo que hiciste. ¿Qué haces?",
      options: [
        "Lo aceptas sin leer",
        "Lo corriges antes de confirmar, porque el historial solo sirve si los mensajes son fieles",
        "Lo borras todo",
        "Haces push de inmediato",
      ],
      correctIndex: 1,
      explanation: "Los mensajes generados pueden equivocarse. Un mensaje engañoso dificulta encontrar después qué cambió.",
    },
    {
      question: "¿Qué sustituye hoy al antiguo modo ultra plan que menciona el video?",
      options: [
        "Nada",
        "El modo plan, con Shift+Tab o /plan",
        "El comando /ultra",
        "El modo automático",
      ],
      correctIndex: 1,
      explanation: "La referencia de comandos indica que /ultraplan ya no existe y que se use el modo plan.",
    },
  ],
};
