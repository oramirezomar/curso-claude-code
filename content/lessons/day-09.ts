import type { Lesson } from "@/lib/types";
// Día 9 · Clases 34 y 35 de la transcripción.
// Contenido verificado en noviembre de 2026.
export const day09: Lesson = {
  day: 9,
  slug: "comandos-del-flujo-diario-y-utilidades",
  title: "Comandos del flujo diario y utilidades",
  section: "Flujo de trabajo",
  estimatedMinutes: 65,
  icon: "🧭",
  objectives: [
    "Elegir entre /clear, /compact y la compactación automática, y saber qué sobrevive a una compactación.",
    "Reanudar una conversación con /resume, claude --continue y claude --resume, y ponerle nombre con /rename.",
    "Sacar información de la sesión con /copy, /export y /recap.",
    "Ajustar velocidad y esfuerzo con /fast y /effort sabiendo qué cuestan.",
    "Programar tareas repetidas con /loop y /schedule, y crear un skill de proyecto que se invoca como un comando.",
  ],
  blocks: [
    {
      type: "paragraph",
      text: "El Día 8 dejó el proyecto listo y los comandos de arranque claros. Este día reúne los comandos del trabajo cotidiano: los que gestionan el contexto y las conversaciones, los que sacan información de la sesión, los que cambian la velocidad y el esfuerzo del modelo, y los que automatizan tareas repetidas. Al final crearás un skill propio que se usa como cualquier comando.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "/clear", label: "Vacía la conversación y no cuesta nada" },
        { value: "/compact", label: "Resume la conversación y puede perder detalles" },
        { value: "7 días", label: "Duración máxima de un loop recurrente" },
        { value: "2.5x", label: "Velocidad máxima del modo rápido, a mayor costo por token" },
        { value: "20", label: "Idiomas que admite el dictado por voz, entre ellos el español" },
        { value: "medium", label: "Esfuerzo por defecto de los modelos 5.5 actuales" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text: "Contenido verificado en noviembre de 2026 contra las páginas oficiales de comandos, sesiones, ventana de contexto, costos, configuración de modelos, modo rápido, dictado por voz, tareas programadas, skills y modo interactivo de Claude Code. La búsqueda del skill de ejemplo se ejecutó contra el Tetris del Día 8 para comprobar su salida.",
    },
    { type: "heading", level: 2, text: "Gestionar el contexto" },
    {
      type: "paragraph",
      text: "El Día 3 explicó por qué el contexto cuesta dinero. Tres comandos lo controlan. `/clear` empieza una conversación nueva y no cuesta nada: úsalo cada vez que cambies de tema. `/compact` resume la conversación para seguir en ella con menos tokens. Y existe una compactación automática que se activa sola al acercarse al límite de la ventana.",
    },
    {
      type: "image",
      src: "/img/dia-09/limpiar-o-compactar.svg",
      alt: "Tres recuadros: /clear empieza una conversación vacía y no cuesta nada, /compact resume la conversación pero hace una petición grande y puede perder detalles, y la compactación automática resume sola al acercarse al límite y se ajusta con /autocompact. Debajo, qué sobrevive a una compactación.",
      caption: "Tres formas de liberar contexto, con sus costos.",
    },
    {
      type: "paragraph",
      text: "`/compact` no es gratis: para resumir, Claude tiene que leer toda la conversación, así que compactar un contexto enorme es en sí una petición grande. Tampoco es perfecto. El resumen puede descartar algo que Claude considera menor y tú no. Por eso conviene indicarle qué conservar: `/compact enfócate en el cambio de la pieza T y las pruebas pendientes`. Y para conservar algo sin riesgo, ponlo en el `CLAUDE.md`: se vuelve a leer desde disco tras cada compactación.",
    },
    {
      type: "table",
      headers: ["Elemento", "Tras compactar"],
      rows: [
        ["El CLAUDE.md de la raíz y las reglas sin ámbito", "Se vuelve a cargar desde disco."],
        ["La memoria automática", "Se vuelve a cargar desde disco."],
        ["El plan escrito en modo plan", "Se vuelve a cargar desde disco."],
        ["Archivos que Claude leyó o editó", "Se releen hasta cinco, los modificados más recientemente. Uno de más de 5000 tokens vuelve solo como referencia a su ruta."],
        ["Las instrucciones que diste solo en la conversación", "Se resumen con el resto y pueden perderse."],
        ["Tareas en segundo plano", "Siguen ejecutándose."],
      ],
    },
    {
      type: "list",
      items: [
        "`/context` muestra una cuadrícula con el uso actual y avisa de capacidad y de memoria que pesa de más.",
        "`/autocompact 500k` fija cuánto puede llenarse la ventana antes de la compactación automática. `/autocompact auto` vuelve al valor que corresponde a tu modelo.",
        "`/rewind` y la opción Resumir desde aquí compactan solo una parte de la conversación, a partir de un mensaje que eliges.",
        "`claude --autocompact 500k` fija esa ventana solo para un arranque. El valor mínimo que acepta es 100K tokens.",
      ],
    },
    { type: "heading", level: 3, text: "Memoria y planes" },
    {
      type: "paragraph",
      text: "`/memory` abre un menú para editar los archivos CLAUDE.md (el de usuario, el del proyecto), activar o desactivar la memoria automática y ver lo que Claude ha guardado. Si borras esos archivos, Claude pierde esas referencias, así que revisa antes de purgar. `/plan` entra en modo plan desde el cuadro de mensaje, y puede llevar la tarea en la misma línea: `/plan añade una pieza U`. Es útil cuando quieres que cada tarea de cierto tipo empiece con un plan.",
    },
    {
      type: "paragraph",
      text: "Para dar acceso a otra carpeta, el comando es `/add-dir ruta`, no `/add`. Claude podrá leer y editar archivos de esa carpeta, aunque la mayor parte de la configuración de `.claude/` que haya allí no se descubre. Además, `/tasks` lista lo que corre en segundo plano, `/skills` muestra los skills disponibles y `/agents` ya no abre una interfaz: imprime un recordatorio para pedirle a Claude que cree o gestione subagentes, o para editar a mano `.claude/agents/`.",
    },
    { type: "heading", level: 2, text: "Volver a una conversación" },
    {
      type: "paragraph",
      text: "Al salir de Claude Code con Ctrl+C dos veces, o con `/exit`, la conversación no se pierde. Se guarda en tu equipo como un archivo `.jsonl` en `~/.claude/projects/` y no en la nube. Al abrir `claude` de nuevo, empiezas con el contexto limpio. Para volver a la anterior tienes cuatro caminos.",
    },
    {
      type: "image",
      src: "/img/dia-09/reanudar-conversaciones.svg",
      alt: "Una línea con cuatro pasos: sesión abierta, se guarda en local como un archivo en la carpeta de proyectos de Claude, cierras Claude y empiezas una nueva sesión con contexto limpio. Debajo, las formas de recuperar la conversación: /resume, claude --continue, claude --resume y /rename.",
      caption: "La conversación se guarda en tu equipo y se puede reanudar.",
    },
    {
      type: "list",
      items: [
        "`/resume` dentro de Claude abre el selector de sesiones. También acepta un identificador o un nombre. Su alias es `/continue`.",
        "`claude --continue` reabre la sesión más reciente de la carpeta actual.",
        "`claude --resume` abre el selector, y `claude --resume nombre` continúa una sesión por su nombre.",
        "`/rename nombre` le pone un nombre a la sesión actual. Sin nombre, genera uno a partir de la conversación.",
      ],
    },
    {
      type: "paragraph",
      text: "Al reanudar, la sesión sigue con el modelo que usaba y recupera el modo de permisos en que estaba, salvo excepciones. Una sesión que reanudas es la misma conversación continuada, y por eso `/resume` convive bien con `/clear`: limpia sin miedo, porque la conversación anterior queda en el selector.",
    },
    { type: "heading", level: 2, text: "Sacar información de la sesión" },
    {
      type: "table",
      headers: ["Comando", "Qué hace", "Detalle útil"],
      rows: [
        ["`/copy`", "Copia la última respuesta al portapapeles", "Con `/copy 2` copia la penúltima. Si hay bloques de código, abre un selector para elegir un bloque o la respuesta completa. Con w guarda en un archivo."],
        ["`/export`", "Exporta la conversación como texto plano", "Con `/export conversacion.txt` la escribe directamente en un archivo. Sin nombre, ofrece copiar o guardar."],
        ["`/recap`", "Genera un resumen de una línea de la sesión", "Sirve para saber en qué ibas al volver de una pausa."],
        ["`/btw`", "Hace una pregunta lateral", "No se añade a la conversación."],
        ["`/usage`", "Muestra costo de sesión, límites del plan y estadísticas", "Los alias son `/cost` y `/stats`."],
      ],
    },
    {
      type: "paragraph",
      text: "Copiar con `/copy` conserva las marcas de código de la respuesta, así que al pegar un bloque en tu editor ya viene identificado como JSON, Python o el lenguaje que sea. Es la diferencia con seleccionar el texto en pantalla. `/export`, en cambio, produce texto plano sin formato, útil si quieres guardar la conversación entera o adjuntarla como contexto a otra herramienta.",
    },
    { type: "heading", level: 2, text: "Apariencia y entrada" },
    {
      type: "list",
      items: [
        "`/color red` cambia el color de la barra del cuadro de mensaje de la sesión. Los colores son red, blue, green, yellow, purple, orange, pink y cyan, y `/color default` lo restablece. Sirve para distinguir varias sesiones abiertas.",
        "`/focus` alterna una vista que muestra solo tu último mensaje, un resumen de una línea de las herramientas usadas y la respuesta final. Solo está disponible en el modo de pantalla completa, que se activa con `/tui fullscreen`.",
        "`/keybindings` abre el archivo de atajos de teclado. Los atajos son personales y valen en todos tus proyectos. Si cometes un error de sintaxis, `/doctor` lo detecta.",
        "`/voice` activa el dictado por voz. Requiere una cuenta de Claude.ai y un micrófono local. Se mantiene Espacio para hablar, o se cambia a pulsar una vez con `/voice tap`.",
      ],
    },
    {
      type: "paragraph",
      text: "El video indica que el dictado solo funciona en inglés. Eso ya no es cierto: la documentación lista 20 idiomas, entre ellos el español, y el idioma se toma del ajuste `language`. Si ese ajuste está vacío, el dictado usa inglés. La transcripción no consume mensajes ni tokens ni cuenta para los límites de `/usage`. Si tu idioma no está en la lista, `/voice` avisa y recurre al inglés para el dictado.",
    },
    { type: "heading", level: 2, text: "Velocidad y esfuerzo" },
    {
      type: "paragraph",
      text: "Dos controles cambian cómo responde el modelo, y los dos tienen un precio. `/effort` fija el nivel de esfuerzo de razonamiento: low, medium, high, xhigh o max. A más esfuerzo, más tokens. Para Opus 5.5, Sonnet 5.5, Haiku 5.5 y Fable 5.2 el valor por defecto es medium, y es un buen punto de partida para el día a día. Súbelo cuando una tarea no se resuelve, y bájalo de nuevo al terminar. Sin argumento abre un control deslizante: Enter guarda el nivel como predeterminado, y la tecla s lo aplica solo a esta sesión. El nivel max siempre dura solo la sesión. Cada modelo guarda su propio nivel.",
    },
    {
      type: "paragraph",
      text: "`/fast` activa el modo rápido: el mismo modelo con una configuración distinta que lo hace hasta 2.5 veces más rápido, a mayor costo por token. El video dice que se sacrifica calidad, y la documentación indica lo contrario: la calidad y las capacidades son las mismas. Lo que sube es el costo. Funciona con Opus y Fable, no con Sonnet ni Haiku, y si tu modelo no lo admite, activarlo cambia de modelo. Es una herramienta para iterar en vivo o depurar con prisa, y para apagar cuando importa más el costo.",
    },
    {
      type: "paragraph",
      text: "Sobre el pensamiento extendido: en Opus 5.5, Sonnet 5.5, Haiku 5.5 y los modelos Fable siempre está activo, y el atajo para alternarlo no tiene efecto. Y si agotas tu cuota, `/usage-credits` abre la configuración de créditos de uso. Antes se llamaba `/extra-usage`. Usarlos tiene costo adicional.",
    },
    { type: "heading", level: 2, text: "Tareas repetidas: /loop y /schedule" },
    {
      type: "paragraph",
      text: "`/loop` repite un mensaje mientras la sesión sigue abierta. Con intervalo y mensaje, como `/loop 5m comprueba si el despliegue terminó`, Claude lo convierte en una programación fija y confirma el ritmo y el identificador del trabajo. Sin intervalo, Claude elige uno entre uno y sesenta minutos según lo que observa. Las unidades son s, m, h y d, y los segundos se redondean al minuto porque la granularidad es de un minuto. Es un skill incluido, con alias `/proactive`.",
    },
    {
      type: "image",
      src: "/img/dia-09/loop-o-schedule.svg",
      alt: "Tres columnas que comparan /loop, las tareas del escritorio y /schedule. /loop corre en tu equipo dentro de la sesión, con intervalo mínimo de un minuto y caducidad de siete días. El escritorio corre en tu equipo sin necesitar la sesión y persiste. /schedule corre en la nube, con intervalo mínimo de una hora. Debajo, cómo detener un loop.",
      caption: "Dónde corre cada opción y para qué sirve.",
    },
    {
      type: "paragraph",
      text: "Hay cuatro detalles que el video pasa por alto. Las tareas de `/loop` son de la sesión: no se ejecutan si la cierras, aunque se restauran al reanudar con `--resume` o `--continue` si no han caducado. Una tarea recurrente caduca a los siete días: se ejecuta una última vez y se borra sola. Esc y Ctrl+C no la detienen: hay que pedirle a Claude que la cancele, por ejemplo \"cancela el loop del despliegue\". Y cada ejecución gasta tokens de tu cuota, así que un intervalo corto durante días suma mucho.",
    },
    {
      type: "paragraph",
      text: "`/schedule` es otra cosa: crea tareas programadas en la nube, antes llamadas rutinas, con alias `/routines`. Corren en infraestructura de Anthropic sobre un clon nuevo del repositorio, sin que tu equipo esté encendido ni haya una sesión abierta, con un intervalo mínimo de una hora. Pueden usar los conectores que configures en cada tarea. Conviene dejarlas para cuando exista un servicio propio y una tarea con sustancia. También consumen tu cuota.",
    },
    { type: "heading", level: 2, text: "Crear un skill de proyecto" },
    {
      type: "paragraph",
      text: "Un skill es una carpeta con un archivo `SKILL.md`: una descripción entre guiones que le dice a Claude cuándo usarlo, y las instrucciones en Markdown. El nombre de la carpeta es el comando: `.claude/skills/piezas/SKILL.md` se invoca con `/piezas`. Si el skill vive dentro del proyecto, se comparte con quien clone el repositorio. Si vive en `~/.claude/skills/`, es solo tuyo y vale en todos los proyectos. No hace falta escribirlo a mano: puedes pedirle a Claude \"crea un skill de proyecto que haga esto\" y verificar el archivo que genera.",
    },
    {
      type: "image",
      src: "/img/dia-09/skill-como-comando.svg",
      alt: "A la izquierda, una estructura de carpetas con el proyecto, su carpeta .claude, la carpeta skills, la carpeta piezas y el archivo SKILL.md. A la derecha, el comando resultante, barra piezas, con un argumento T. Debajo, qué contiene SKILL.md: descripción, comandos que se ejecutan antes, argumentos y recarga automática.",
      caption: "El nombre de la carpeta del skill es el comando.",
    },
    {
      type: "paragraph",
      text: "Dos recursos hacen útiles a los skills. Una línea que empieza con un signo de exclamación y va entre comillas invertidas se ejecuta antes de que Claude lea el skill, y su salida se inserta en el texto. Y `$ARGUMENTS` se sustituye por lo que escribas tras el nombre del comando. Los cambios se detectan en la misma sesión, sin reiniciar. Si un skill nuevo no aparece, ejecuta `/reload-skills`. El video dice que hay que salir de Claude para ver el skill: ya no es necesario. Los archivos antiguos de `.claude/commands/` siguen funcionando, porque los comandos personalizados se fusionaron con los skills, pero para algo nuevo conviene un skill.",
    },
    { type: "heading", level: 2, text: "Ejercicios guiados y experimentos" },
    {
      type: "paragraph",
      text: "Los ejercicios usan el Tetris del Día 8 en `~/ClaudeCode/04-tetris`. La búsqueda del ejercicio 9 la ejecuté contra ese proyecto. Lo que responde Claude en los demás es orientativo, porque depende del modelo y de tu plan. Los cálculos de los experimentos del final se ejecutan en el navegador.",
    },
    {
      type: "exercise",
      title: "Ejercicio 1: ver el contexto y vaciarlo",
      description: "Mide lo que pesa tu conversación y comprueba que /clear lo reinicia.",
      steps: [
        {
          instruction: "Abre Claude Code en el proyecto y haz una pregunta que lea archivos.",
          command: "cd ~/ClaudeCode/04-tetris && claude",
        },
        {
          instruction: "Pide un resumen de los dos archivos para que el contexto crezca.",
          command: "Resume @game.js y @index.html en cinco líneas.",
          expected: "Claude lee los dos archivos y responde con un resumen breve.",
        },
        {
          instruction: "Mira el uso de contexto.",
          command: "/context",
          expected: "Una cuadrícula coloreada con el contexto usado y, si procede, sugerencias para reducirlo.",
        },
        {
          instruction: "Vacía la conversación y vuelve a mirar.",
          command: "/clear",
          expected: "La conversación queda vacía y el contexto vuelve al mínimo inicial.",
        },
      ],
      verify: "Tras /clear, el uso baja a lo que carga una sesión nueva: el sistema, el CLAUDE.md y poco más.",
    },
    {
      type: "exercise",
      title: "Ejercicio 2: compactar con instrucciones",
      description: "Compara el contexto antes y después de /compact.",
      steps: [
        {
          instruction: "Genera algo de conversación con dos preguntas sobre el código.",
          command: "¿Cómo funciona la función limpiarLineas de @game.js? Después, ¿y la función rotar?",
          expected: "Claude explica ambas funciones.",
        },
        {
          instruction: "Compacta indicando qué debe conservar.",
          command: "/compact conserva cómo funcionan limpiarLineas y rotar",
          expected: "Claude resume la conversación. El uso de contexto baja y se sigue en la misma sesión.",
        },
        {
          instruction: "Pregunta algo que dependa de lo conservado.",
          command: "¿Cuántos puntos da borrar tres líneas a la vez?",
          expected: "Claude responde 500, porque lo conservó o vuelve a leer game.js.",
        },
      ],
      verify: "El resumen conserva lo que pediste. Ten presente que compactar un contexto grande es en sí una petición grande.",
    },
    {
      type: "exercise",
      title: "Ejercicio 3: memoria y modo plan",
      description: "Mira dónde se guarda lo que Claude recuerda y entra en modo plan desde el cuadro de mensaje.",
      steps: [
        {
          instruction: "Abre el menú de memoria.",
          command: "/memory",
          expected: "Un menú con los archivos CLAUDE.md y la opción de activar o desactivar la memoria automática. Esc cierra.",
        },
        {
          instruction: "Pide a Claude que recuerde una preferencia.",
          command: "Recuerda que en este proyecto las respuestas deben ir en español.",
          expected: "Claude confirma y la guarda en la memoria automática o en el CLAUDE.md.",
        },
        {
          instruction: "Entra en modo plan con una tarea, sin ejecutar nada.",
          command: "/plan añade una pieza U al juego",
          expected: "El indicador de modo cambia a plan y Claude propone un plan sin editar archivos. Sal con Shift+Tab.",
        },
      ],
      verify: "Sabes dónde ver y editar lo que Claude recuerda, y que el modo plan no modifica archivos hasta que lo apruebes.",
    },
    {
      type: "exercise",
      title: "Ejercicio 4: salir y reanudar",
      description: "Comprueba que la conversación sobrevive al cierre.",
      steps: [
        {
          instruction: "Dale nombre a la sesión actual.",
          command: "/rename practica-dia-9",
          expected: "El nombre aparece en la barra del cuadro de mensaje.",
        },
        {
          instruction: "Sal con Ctrl+C dos veces y vuelve a entrar.",
          command: "claude",
          expected: "Empiezas con un contexto limpio, sin la conversación anterior.",
        },
        {
          instruction: "Reanuda la anterior por su nombre.",
          command: "claude --resume practica-dia-9",
          expected: "Claude carga la conversación completa con el modelo que usaba.",
        },
        {
          instruction: "Comprueba dónde se guardó en tu equipo.",
          command: "ls ~/.claude/projects | head",
          expected: "Una carpeta por proyecto, con el nombre de su ruta convertido con guiones.",
        },
      ],
      verify: "La conversación está en tu disco. Prueba también claude --continue, que reabre la más reciente de la carpeta.",
    },
    {
      type: "exercise",
      title: "Ejercicio 5: copiar y exportar",
      description: "Saca una respuesta y la conversación entera.",
      steps: [
        {
          instruction: "Pide una respuesta con un bloque de código.",
          command: "Dame en formato JSON un objeto con las piezas de game.js y su color.",
          expected: "Claude responde con un bloque de código JSON.",
        },
        {
          instruction: "Copia la última respuesta y elige el bloque en el selector.",
          command: "/copy",
          expected: "Un selector con los bloques de código y la respuesta completa. Enter copia al portapapeles.",
        },
        {
          instruction: "Pega en tu editor y comprueba que el JSON ya viene con su marca de lenguaje. Después exporta la conversación.",
          command: "/export conversacion.txt",
          expected: "Se crea el archivo conversacion.txt en texto plano, sin formato.",
        },
        {
          instruction: "Comprueba el archivo creado.",
          command: "! head -5 conversacion.txt",
          expected: "Las primeras líneas de la conversación en texto plano.",
        },
      ],
      verify: "Entiendes la diferencia: /copy conserva las marcas de código y /export lo pasa todo a texto plano.",
    },
    {
      type: "exercise",
      title: "Ejercicio 6: color, atajos y voz",
      description: "Personaliza la sesión.",
      steps: [
        {
          instruction: "Cambia el color de la barra del cuadro de mensaje y vuelve al valor por defecto.",
          command: "/color orange",
          expected: "La barra del cuadro de mensaje cambia a naranja. Con /color default se restablece.",
        },
        {
          instruction: "Abre el archivo de atajos y ciérralo sin cambiar nada.",
          command: "/keybindings",
          expected: "Se abre tu archivo de atajos en el editor.",
        },
        {
          instruction: "Prueba el dictado, si tienes cuenta de Claude.ai y micrófono. Después desactívalo.",
          command: "/voice",
          expected: "Un mensaje de que el modo de voz está activo y de que mantengas pulsado Espacio para grabar. Con /voice off se apaga.",
        },
      ],
      verify: "El color no cambia nada del comportamiento. Si no tienes cuenta de Claude.ai, /voice te lo indicará.",
    },
    {
      type: "exercise",
      title: "Ejercicio 7: esfuerzo y velocidad",
      description: "Mira qué controles tienes y qué cuesta cada uno.",
      steps: [
        {
          instruction: "Mira el nivel de esfuerzo actual.",
          command: "/effort status",
          expected: "El nivel del modelo activo, normalmente medium.",
        },
        {
          instruction: "Súbelo solo para esta sesión: abre el control con /effort y pulsa s en el nivel high.",
          command: "/effort",
          expected: "Un control deslizante. s aplica el nivel solo a la sesión actual.",
        },
        {
          instruction: "Consulta si el modo rápido está disponible con tu modelo.",
          command: "/fast",
          expected: "Se activa si tu modelo lo admite, o cambia de modelo, o indica que no está disponible. Apágalo con /fast off.",
        },
      ],
      verify: "Sabes que subir el esfuerzo y activar /fast cuestan más. Déjalos como estaban al terminar.",
    },
    {
      type: "exercise",
      title: "Ejercicio 8: un loop y cómo detenerlo",
      description: "Programa una tarea inofensiva en la sesión.",
      steps: [
        {
          instruction: "Programa una tarea cada dos minutos.",
          command: "/loop 2m ejecuta date y dime la hora actual en una línea",
          expected: "Claude confirma el ritmo y el identificador del trabajo, y ejecuta la primera vez. Te puede pedir permiso para date.",
        },
        {
          instruction: "Espera a la segunda ejecución y comprueba que se repite.",
          expected: "A los dos minutos aparece una nueva hora.",
        },
        {
          instruction: "Intenta detenerlo con Ctrl+C. Después pídeselo a Claude.",
          command: "Cancela el loop de la hora.",
          expected: "Ctrl+C no lo cancela. Al pedirlo, Claude confirma que lo canceló.",
        },
      ],
      verify: "No queda ningún loop activo. Pregunta a Claude por las tareas programadas si dudas.",
    },
    {
      type: "exercise",
      title: "Ejercicio 9: tu primer skill",
      description: "Crea un skill de proyecto que lista las piezas del juego con una búsqueda y acepta un argumento.",
      steps: [
        {
          instruction: "Crea el archivo del skill dentro del proyecto.",
          file: {
            name: ".claude/skills/piezas/SKILL.md",
            code: `---
description: Lista las piezas definidas en game.js y explica la que se indique. Úsalo cuando se pregunte por las piezas del Tetris.
---

## Piezas definidas

!\`grep -n "^  [A-Z]:" game.js\`

## Instrucciones

Resume las piezas anteriores en una tabla con su letra, su color y el tamaño de su matriz.
Si el usuario indicó una pieza como argumento ($ARGUMENTS), explica solo esa pieza.`,
          },
        },
        {
          instruction: "Comprueba por tu cuenta que la búsqueda del skill devuelve las siete piezas.",
          command: "grep -n \"^  [A-Z]:\" game.js",
          expected: "7:  I: { color: \"#00bcd4\", forma: [[1, 1, 1, 1]] },\n8:  O: { color: \"#fdd835\", forma: [[1, 1], [1, 1]] },\n9:  T: { color: \"#9c27b0\", forma: [[0, 1, 0], [1, 1, 1]] },\n10:  S: { color: \"#4caf50\", forma: [[0, 1, 1], [1, 1, 0]] },\n11:  Z: { color: \"#f44336\", forma: [[1, 1, 0], [0, 1, 1]] },\n12:  J: { color: \"#3f51b5\", forma: [[1, 0, 0], [1, 1, 1]] },\n13:  L: { color: \"#ff9800\", forma: [[0, 0, 1], [1, 1, 1]] },",
        },
        {
          instruction: "Dentro de Claude, comprueba que el skill aparece sin reiniciar. Si no está, recarga.",
          command: "/skills",
          expected: "La lista incluye piezas. Si no aparece, ejecuta /reload-skills.",
        },
        {
          instruction: "Invócalo sin argumento y con uno.",
          command: "/piezas T",
          expected: "Claude explica solo la pieza T: color #9c27b0, forma de tres columnas y dos filas.",
        },
      ],
      verify: "El comando se llama como la carpeta. Si editas SKILL.md, el cambio se aplica en la misma sesión.",
    },
    {
      type: "playground",
      title: "Experimento 10: cuánto ahorra compactar",
      description: "La documentación muestra una sesión con 22225 tokens antes de compactar y 17095 después. Calcula el ahorro. Cambia las cifras por las de tu sesión.",
      code: `const antes = 22225;
const despues = 17095;
const ahorro = antes - despues;
const pct = Math.round((ahorro / antes) * 100);

console.log("antes: " + antes + " tokens");
console.log("despues: " + despues + " tokens");
console.log("ahorro: " + ahorro + " tokens (" + pct + "%)");`,
      expected: "antes: 22225 tokens\ndespues: 17095 tokens\nahorro: 5130 tokens (23%)",
    },
    {
      type: "playground",
      title: "Experimento 11: lo que cuesta un loop",
      description: "Un loop cada cinco minutos que no cancelas corre los siete días. Calcula cuántas ejecuciones son y cuántos tokens suma si cada una gasta 1500. Cambia el intervalo.",
      code: `const cadaMinutos = 5;
const dias = 7;
const tokensPorEjecucion = 1500;

const ejecuciones = Math.round((dias * 24 * 60) / cadaMinutos);
const total = ejecuciones * tokensPorEjecucion;

console.log("ejecuciones: " + ejecuciones);
console.log("tokens: " + total);
console.log("millones de tokens: " + (total / 1000000).toFixed(2));`,
      expected: "ejecuciones: 2016\ntokens: 3024000\nmillones de tokens: 3.02",
    },
    {
      type: "playground",
      title: "Experimento 12: separar los bloques de código",
      description: "Es lo que hace el selector de /copy: separar una respuesta en sus bloques de código. Aquí se parte el texto por las marcas de código y se descarta la primera línea de cada bloque, que es el nombre del lenguaje. Añade un tercer bloque.",
      code: `const FENCE = String.fromCharCode(96).repeat(3);
const respuesta = [
  "Aqui tienes la pieza:",
  FENCE + "js",
  "const U = [[1, 0, 1], [1, 1, 1]];",
  FENCE,
  "Y la prueba:",
  FENCE + "js",
  "console.log(U.length);",
  FENCE,
].join("\\n");

const bloques = respuesta
  .split(FENCE)
  .filter((_, i) => i % 2 === 1)
  .map((b) => b.split("\\n").slice(1).join("\\n").trim());

console.log(bloques.length + " bloques");
bloques.forEach((b) => console.log("- " + b));`,
      expected: "2 bloques\n- const U = [[1, 0, 1], [1, 1, 1]];\n- console.log(U.length);",
    },
    {
      type: "playground",
      title: "Experimento 13: de la ruta al comando",
      description: "El nombre del comando sale de la carpeta del skill o del archivo del comando antiguo. Comprueba tres rutas y añade la tuya.",
      code: `function comando(ruta) {
  const partes = ruta.split("/");
  const i = partes.indexOf("skills");
  if (i >= 0) return "/" + partes[i + 1];
  const j = partes.indexOf("commands");
  return "/" + partes[j + 1].replace(".md", "");
}

const rutas = [
  ".claude/skills/piezas/SKILL.md",
  ".claude/commands/clima.md",
  "~/.claude/skills/resumen-git/SKILL.md",
];

rutas.forEach((r) => console.log(r + " -> " + comando(r)));`,
      expected: ".claude/skills/piezas/SKILL.md -> /piezas\n.claude/commands/clima.md -> /clima\n~/.claude/skills/resumen-git/SKILL.md -> /resumen-git",
    },
    { type: "heading", level: 2, text: "¿Qué usar en cada caso?" },
    {
      type: "table",
      headers: ["Si necesitas...", "Usa...", "Nota"],
      rows: [
        ["Cambiar de tema", "`/clear`", "Gratis. La conversación anterior se recupera con `/resume`."],
        ["Seguir en la misma tarea con menos contexto", "`/compact` con instrucciones", "Cuesta una petición grande y puede perder detalles."],
        ["Que algo sobreviva a cualquier compactación", "El CLAUDE.md", "Se vuelve a leer desde disco."],
        ["Volver a una conversación anterior", "`/resume` o `claude --continue`", "Se guarda en local, en `~/.claude/projects/`."],
        ["Distinguir sesiones abiertas", "`/rename` y `/color`", "El nombre ayuda en el selector."],
        ["Llevarte una respuesta con su formato", "`/copy`", "Conserva las marcas de código."],
        ["Guardar toda la conversación", "`/export archivo.txt`", "Texto plano."],
        ["Iterar rápido, aunque cueste más", "`/fast`", "Misma calidad, hasta 2.5 veces más rápido. Solo Opus y Fable."],
        ["Un problema difícil", "`/effort` más alto, y volver después", "Más esfuerzo, más tokens."],
        ["Vigilar algo mientras trabajas", "`/loop`", "Caduca a los siete días. Se cancela pidiéndoselo a Claude."],
        ["Una rutina que corra sin tu equipo", "`/schedule`", "En la nube, mínimo una hora."],
        ["Un comando propio del proyecto", "Un skill en `.claude/skills/`", "El nombre de la carpeta es el comando."],
      ],
    },
    { type: "heading", level: 2, text: "Datos que suelen aparecer desactualizados" },
    {
      type: "table",
      headers: ["Suele decirse", "Información verificada (noviembre 2026)"],
      rows: [
        ["Se añade otra carpeta con /add.", "El comando es `/add-dir ruta`."],
        ["El dictado por voz solo funciona en inglés.", "Admite 20 idiomas, entre ellos el español, según el ajuste `language`. Requiere cuenta de Claude.ai y micrófono local, y no consume tokens."],
        ["El modo rápido sacrifica calidad.", "Es el mismo modelo con otra configuración: calidad y capacidades iguales, hasta 2.5 veces más rápido y con mayor costo por token. Solo Opus y Fable."],
        ["Ctrl+C detiene un loop.", "No lo detiene. Hay que pedirle a Claude que lo cancele. Un loop recurrente caduca a los siete días."],
        ["Para ver un skill nuevo hay que salir de Claude.", "Se detecta en la misma sesión. Si no aparece, `/reload-skills`."],
        ["/extra-usage abre el exceso de uso.", "El comando actual es `/usage-credits`."],
        ["/agents abre una interfaz para gestionar agentes.", "Imprime un recordatorio para pedirle a Claude que cree o gestione subagentes, o para editar `.claude/agents/`."],
        ["Los comandos personalizados son archivos en .claude/commands.", "Siguen funcionando, pero se fusionaron con los skills. Para algo nuevo, usa `.claude/skills/nombre/SKILL.md`."],
        ["/compact hace un trabajo perfecto.", "Puede descartar detalles. Dale instrucciones y deja lo importante en el CLAUDE.md."],
        ["/schedule es lo mismo que /loop.", "`/loop` vive en la sesión. `/schedule` crea tareas en la nube, antes llamadas rutinas, con mínimo una hora."],
      ],
    },
    { type: "heading", level: 2, text: "Preguntas frecuentes" },
    {
      type: "accordion",
      items: [
        {
          title: "¿Cuándo uso /compact y cuándo /clear?",
          text: "Usa /clear al cambiar de tema, porque no cuesta nada. Usa /compact cuando sigues en la misma tarea y la conversación pesa, indicándole qué conservar. Si hay algo que no puedes perder, escríbelo en el CLAUDE.md.",
        },
        {
          title: "¿Se pierde la conversación al hacer /clear?",
          text: "No. La conversación anterior queda guardada y se recupera con /resume.",
        },
        {
          title: "¿Dónde se guardan las conversaciones?",
          text: "En tu equipo, como archivos .jsonl en `~/.claude/projects/<proyecto>/`. No están en la nube. Si borras esa carpeta, pierdes el historial.",
        },
        {
          title: "¿El loop sigue corriendo si cierro Claude?",
          text: "No. Es de la sesión. Se restaura al reanudar con --resume o --continue si no ha caducado. Para algo que corra sin tu equipo, usa /schedule.",
        },
        {
          title: "¿Los loops y las tareas programadas gastan cuota?",
          text: "Sí. Cada ejecución es una petición. Un intervalo corto durante días suma muchos tokens, como muestra el experimento 11.",
        },
        {
          title: "¿Un skill de proyecto lo ven los demás?",
          text: "Sí, si está en `.claude/skills/` del proyecto y lo subes al repositorio. Para algo personal, ponlo en `~/.claude/skills/`.",
        },
      ],
    },
    { type: "heading", level: 2, text: "Qué sigue" },
    {
      type: "paragraph",
      text: "Con los comandos del día a día claros, el Día 10 abre la integración con GitHub: instalar la aplicación de Claude, revisar pull requests y dar formato a issues con Actions. Antes, deja el skill de piezas en tu proyecto y mira cuánto contexto usa tu sesión después de un rato de trabajo, con `/context`.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 10, verifica que puedes explicar...",
      items: [
        "La diferencia entre /clear, /compact y la compactación automática, y qué sobrevive a una compactación.",
        "Cómo se reanuda una conversación y dónde se guarda.",
        "Qué hacen /copy, /export y /recap, y cuándo conviene cada uno.",
        "Qué cuestan /fast y /effort, y cuál es el esfuerzo por defecto.",
        "En qué se parecen y en qué se diferencian /loop y /schedule, y cómo se detiene un loop.",
        "Cómo se crea un skill de proyecto y por qué su comando se llama como su carpeta.",
        "Qué comandos del video cambiaron: /add-dir, /extra-usage, /agents y el idioma del dictado.",
      ],
    },
    { type: "heading", level: 2, text: "Fuentes consultadas (noviembre 2026)" },
    {
      type: "list",
      items: [
        "[Referencia de comandos](https://code.claude.com/docs/en/commands)",
        "[Gestionar sesiones: continue, resume y rename](https://code.claude.com/docs/en/sessions)",
        "[Explorar la ventana de contexto y qué sobrevive a la compactación](https://code.claude.com/docs/en/context-window)",
        "[Gestionar costos](https://code.claude.com/docs/en/costs)",
        "[Configuración de modelos, esfuerzo y ventana de autocompactación](https://code.claude.com/docs/en/model-config)",
        "[Acelerar las respuestas con el modo rápido](https://code.claude.com/docs/en/fast-mode)",
        "[Dictado por voz](https://code.claude.com/docs/en/voice-dictation)",
        "[Ejecutar mensajes de forma programada con /loop](https://code.claude.com/docs/en/scheduled-tasks)",
        "[Tareas programadas en la nube](https://code.claude.com/docs/en/routines)",
        "[Extender Claude con skills](https://code.claude.com/docs/en/skills)",
        "[Modo interactivo](https://code.claude.com/docs/en/interactive-mode)",
        "[Cómo Claude recuerda tu proyecto](https://code.claude.com/docs/en/memory)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "Cambias a un tema sin relación con lo anterior. ¿Qué haces?",
      options: [
        "Compactar siempre",
        "Usar /clear, que es gratis y empieza de cero",
        "Seguir en la misma conversación",
        "Cerrar la terminal",
      ],
      correctIndex: 1,
      explanation: "/clear no cuesta nada y evita arrastrar contexto que no ayuda. La conversación anterior se recupera con /resume.",
    },
    {
      question: "¿Qué riesgo tiene /compact?",
      options: [
        "Borra el CLAUDE.md",
        "Es una petición grande y el resumen puede descartar detalles que sí importaban",
        "Cierra la sesión",
        "Cambia de modelo",
      ],
      correctIndex: 1,
      explanation: "Claude lee toda la conversación para resumirla, y el resumen puede perder detalles. Indica qué conservar y deja lo vital en el CLAUDE.md.",
    },
    {
      question: "¿Dónde dejas algo que debe sobrevivir a cualquier compactación?",
      options: [
        "En un mensaje de la conversación",
        "En el CLAUDE.md, que se vuelve a leer desde disco",
        "En el portapapeles",
        "En el nombre de la sesión",
      ],
      correctIndex: 1,
      explanation: "Tras compactar se vuelven a cargar desde disco el CLAUDE.md de la raíz y la memoria automática. Lo dicho solo en la conversación se resume.",
    },
    {
      question: "¿Cómo reabres la conversación más reciente de la carpeta actual desde la terminal?",
      options: [
        "claude --continue",
        "claude --new",
        "claude --clear",
        "claude --history",
      ],
      correctIndex: 0,
      explanation: "claude --continue reabre la más reciente. claude --resume abre el selector o continúa una por nombre.",
    },
    {
      question: "¿Qué diferencia hay entre /copy y /export?",
      options: [
        "Ninguna",
        "/copy conserva las marcas de código de una respuesta y /export saca la conversación entera como texto plano",
        "/copy borra la conversación",
        "/export solo funciona en la nube",
      ],
      correctIndex: 1,
      explanation: "/copy toma una respuesta y conserva el formato de sus bloques de código. /export escribe la conversación completa como texto plano.",
    },
    {
      question: "¿Qué hace el modo rápido, /fast?",
      options: [
        "Reduce la calidad para ir más rápido",
        "Usa el mismo modelo, hasta 2.5 veces más rápido, a mayor costo por token",
        "Es gratis",
        "Funciona con Haiku",
      ],
      correctIndex: 1,
      explanation: "La calidad no cambia. Cambia el costo por token. Solo está disponible en Opus y Fable.",
    },
    {
      question: "¿Cómo se detiene un /loop recurrente?",
      options: [
        "Con Ctrl+C",
        "Con Esc",
        "Pidiéndole a Claude que lo cancele",
        "No se puede",
      ],
      correctIndex: 2,
      explanation: "Esc y Ctrl+C no detienen un loop. Hay que pedirle a Claude que lo cancele. Si no lo haces, caduca a los siete días.",
    },
    {
      question: "¿En qué se diferencia /schedule de /loop?",
      options: [
        "En nada",
        "/loop vive en tu sesión y /schedule crea tareas en la nube que corren sin tu equipo, con mínimo una hora",
        "/schedule es gratis",
        "/loop corre en la nube",
      ],
      correctIndex: 1,
      explanation: "/loop corre en tu equipo mientras la sesión esté abierta. /schedule crea tareas programadas en la nube, antes llamadas rutinas.",
    },
    {
      question: "Creas .claude/skills/piezas/SKILL.md. ¿Cómo lo invocas?",
      options: [
        "/skill piezas",
        "/piezas",
        "/SKILL",
        "/claude piezas",
      ],
      correctIndex: 1,
      explanation: "El nombre de la carpeta es el comando. Además, se detecta sin reiniciar, y si no aparece se usa /reload-skills.",
    },
    {
      question: "¿Qué comando abre la configuración de créditos de uso, que antes se llamaba /extra-usage?",
      options: ["/credits", "/usage-credits", "/billing", "/more"],
      correctIndex: 1,
      explanation: "El comando actual es /usage-credits. Usar créditos de uso supone un costo adicional.",
    },
  ],
};
