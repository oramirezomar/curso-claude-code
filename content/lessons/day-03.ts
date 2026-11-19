import type { Lesson } from "@/lib/types";

// Día 3 · Clases 10, 11, 12 y 13 de la transcripción.
// Contenido verificado en noviembre de 2026.
export const day03: Lesson = {
  day: 3,
  slug: "contexto-tokens-y-control-de-costos",
  title: "Contexto, tokens y control de costos",
  section: "Instalación y consumo de tokens",
  estimatedMinutes: 60,
  icon: "💰",
  objectives: [
    "Explicar por qué un modelo sin estado recibe el historial completo en cada mensaje y qué más viaja en cada petición.",
    "Usar `/context`, `/usage`, `/clear`, `/rename`, `/resume` y `/compact` para ver, vaciar, conservar y retomar el contexto.",
    "Reducir el consumo con elección de modelo, herramientas de línea de comandos, hooks, skills, subagentes y niveles de esfuerzo.",
    "Mantener pequeño el archivo CLAUDE.md y saber qué se carga siempre y qué solo cuando se invoca.",
    "Aplicar hábitos de trabajo que evitan gastar tokens en rutas equivocadas: plan, verificación y cambios pequeños.",
  ],
  blocks: [
    {
      type: "paragraph",
      text: "Casi todo el consumo inesperado de tokens se explica con una idea: el modelo no guarda nada entre mensajes, así que cada petición reenvía todo lo que ya se habló. Entender qué viaja en cada petición y qué comando lo vacía o lo resume permite alargar la cuota diaria, que es el cuello de botella real al seguir este curso.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "Todo", label: "El historial completo se reenvía en cada mensaje" },
        { value: "0", label: "Costo de empezar de cero con /clear" },
        { value: "200", label: "Líneas máximas recomendadas para un CLAUDE.md" },
        { value: "5", label: "Archivos que Claude Code relee tras compactar" },
        { value: "/context", label: "Comando que muestra qué ocupa tu contexto" },
        { value: "7x", label: "Tokens aproximados de un equipo de agentes en modo plan" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text: "Contenido verificado en noviembre de 2026 contra las páginas oficiales de costos, contexto, comandos, memoria, sesiones y skills de Claude Code. Los comandos y los números cambian con las versiones: si algo no coincide con tu pantalla, revisa la documentación vigente.",
    },
    { type: "heading", level: 2, text: "Cómo crece el contexto" },
    {
      type: "paragraph",
      text: "Un modelo de lenguaje no tiene estado: no recuerda nada entre una petición y la siguiente. Cuando respondes en una conversación, la aplicación empaqueta tu nuevo mensaje junto con todo el historial anterior (tus mensajes, las respuestas del modelo y los resultados de las herramientas) y lo envía de nuevo. La respuesta pasa a formar parte del historial, y el siguiente mensaje volverá a enviarlo todo. Por eso cada turno es más grande que el anterior.",
    },
    {
      type: "image",
      src: "/img/dia-03/contexto-por-mensaje.svg",
      alt: "Tres columnas con las peticiones 1, 2 y 3. Cada una tiene la misma base fija arriba y debajo una pila de mensajes y respuestas que crece de uno a cinco bloques.",
      caption: "La base fija se repite en cada petición y el historial se acumula debajo.",
    },
    {
      type: "paragraph",
      text: "Además del historial viaja una base fija que Claude Code carga antes de que escribas nada. Según la documentación, antes de tu primer mensaje entran en el contexto el prompt del sistema, la memoria automática, la información del entorno, los nombres de las herramientas MCP, las descripciones de tus skills y los archivos CLAUDE.md. Durante el trabajo se suman los archivos que Claude lee, los resultados de las herramientas y la salida de los hooks.",
    },
    {
      type: "table",
      caption: "Ejemplo de la base fija en una sesión (cifras ilustrativas de la documentación)",
      headers: ["Qué entra antes de escribir", "Tokens de ejemplo"],
      rows: [
        ["Prompt del sistema", "4 200"],
        ["Memoria automática (MEMORY.md)", "680"],
        ["Información del entorno", "280"],
        ["Nombres de herramientas MCP", "120"],
        ["Descripciones de skills", "450"],
        ["CLAUDE.md del usuario", "320"],
        ["CLAUDE.md del proyecto", "1 800"],
      ],
    },
    {
      type: "callout",
      variant: "info",
      text: "Las cifras de la tabla son de un ejemplo de la documentación y cambian con el tamaño de tu CLAUDE.md, tus servidores MCP y tus skills. Para ver tus números reales ejecuta `/context`.",
    },
    { type: "heading", level: 3, text: "Qué vacía /clear y qué vuelve a cargarse" },
    {
      type: "paragraph",
      text: "El comando `/clear` empieza una conversación nueva con el contexto vacío. Descarta los mensajes, las respuestas, las lecturas de archivos y los resultados de herramientas, es decir, lo que crece mientras trabajas. La base fija, en cambio, se carga de nuevo al empezar la conversación siguiente. Por eso importa que esa base sea pequeña, y por eso conviene limpiar entre tareas: el historial viejo ocupa espacio en cada mensaje y no aporta nada a la tarea nueva.",
    },
    {
      type: "image",
      src: "/img/dia-03/que-vacia-clear.svg",
      alt: "Dos recuadros. A la izquierda lo que se vacía con clear: mensajes, respuestas, archivos leídos, resultados de herramientas e imágenes. A la derecha lo que vuelve a cargarse al empezar: instrucciones del sistema, CLAUDE.md y memoria, descripciones de skills y nombres MCP.",
      caption: "Lo que crece se vacía y lo que forma la base fija vuelve a cargarse.",
    },
    {
      type: "paragraph",
      text: "Una consecuencia práctica: una sesión abierta durante horas puede gastar mucho más de lo que sugiere tu actividad. Claude Code envía la conversación completa en cada petición y, con la caché de prompts, la relee a precio de lectura de caché. Si pasas más tiempo del que dura la caché sin escribir, el primer mensaje tras la pausa no la aprovecha y reprocesa todo el contexto.",
    },
    {
      type: "callout",
      variant: "warning",
      text: "Los servidores MCP, las skills, los subagentes y los archivos de memoria aportan contexto a la base fija de cada petición. Lo que dejas instalado todos los días tiene un costo en cada mensaje, lo uses o no.",
    },
    { type: "heading", level: 3, text: "Memoria: CLAUDE.md y memoria automática" },
    {
      type: "paragraph",
      text: "Claude Code carga en cada sesión tus archivos CLAUDE.md. Además puede guardar notas propias en la memoria automática, por ejemplo cuando le pides que siempre responda en español o que resuelva un problema de una forma concreta. De la memoria automática se carga el principio de `MEMORY.md`, hasta 200 líneas o 25 KB, lo que ocurra primero. Para CLAUDE.md la recomendación es no pasar de 200 líneas: los archivos más largos consumen más contexto y reducen la obediencia a las reglas. Se ven y se editan con `/memory`.",
    },
    { type: "heading", level: 2, text: "Ver y gestionar el consumo" },
    {
      type: "list",
      items: [
        "`/usage` muestra el consumo de la sesión, los límites del plan y, en suscripción, el desglose de qué cuenta contra tu límite con recomendaciones. `/cost` es un alias de `/usage`.",
        "`/context` dibuja una cuadrícula con lo que ocupa tu contexto: prompt del sistema, herramientas, archivos de memoria, skills y mensajes. Sugiere optimizaciones para lo que pesa más.",
        "El contador junto al indicador de trabajo muestra de forma aproximada los tokens de salida del turno actual. No incluye tu prompt ni el historial.",
        "`/insights` genera un informe en HTML sobre cómo trabajas, con fricciones y sugerencias.",
        "La línea de estado puede mostrar el uso del contexto de forma continua.",
      ],
    },
    {
      type: "paragraph",
      text: "En suscripción, la cifra en dólares de `/usage` no es tu factura: lo útil son las barras de uso del plan. El comando de costos en dólares tiene sentido para quien paga por token con una clave de API.",
    },
    { type: "heading", level: 3, text: "Limpiar, nombrar, retomar y compactar" },
    {
      type: "image",
      src: "/img/dia-03/flujo-de-sesiones.svg",
      alt: "Flujo de izquierda a derecha: tarea A con una conversación larga, rename para darle nombre, clear para vaciar el contexto y tarea B. Una flecha punteada de vuelta a la tarea A indica que se retoma con claude --resume o /resume.",
      caption: "Nombrar, limpiar y retomar una sesión al cambiar de tarea.",
    },
    {
      type: "list",
      items: [
        "`/clear` vacía el contexto. Si le pasas un nombre (`/clear mi-tarea`) etiqueta la conversación anterior en el selector de `/resume`.",
        "`/rename nombre` pone nombre a la sesión. Sin argumento, Claude propone uno a partir de la conversación. Es útil cuando tienes varias instancias abiertas.",
        "`/resume` abre el selector de sesiones. Desde la terminal, `claude --resume nombre` retoma una sesión por su nombre y `claude --continue` reabre la más reciente de la carpeta.",
        "`/compact` resume la conversación para liberar espacio y seguir en la misma sesión. Puedes darle instrucciones: `/compact conserva el código de ejemplo y el uso de la API`.",
        "También puedes guardar instrucciones de compactación en el CLAUDE.md del proyecto, bajo un encabezado como Compact instructions.",
      ],
    },
    {
      type: "paragraph",
      text: "Tras compactar, el CLAUDE.md del proyecto, la memoria automática y las descripciones de skills se reinyectan desde disco. Claude Code vuelve a leer hasta cinco de los archivos que había leído o editado, los más recientes primero. Compactar es en sí una petición grande, porque lee la conversación que va a resumir. Cuando quieres un comienzo limpio, `/clear` no cuesta nada. Además, con `/autocompact` puedes elegir cuánto se llena la ventana antes de que Claude Code compacte por sí mismo.",
    },
    { type: "heading", level: 2, text: "Técnicas oficiales para reducir tokens" },
    {
      type: "image",
      src: "/img/dia-03/palancas-de-ahorro.svg",
      alt: "Seis tarjetas con las palancas de ahorro: contexto, modelo, herramientas, delegar, razonamiento y hábitos, cada una con sus comandos y prácticas.",
      caption: "Las seis palancas de ahorro de tokens que se desarrollan en esta sección.",
    },
    { type: "heading", level: 3, text: "Elegir el modelo adecuado" },
    {
      type: "paragraph",
      text: "Sonnet resuelve bien la mayoría de las tareas de programación y cuesta menos que Opus. Reserva Opus para decisiones de arquitectura o razonamiento de varios pasos. `opusplan` combina ambos: Opus en modo plan y Sonnet para ejecutar. Para los subagentes sencillos se puede indicar `model: haiku`. No hay una regla absoluta: un modelo más potente suele dar mejores resultados, pero agota antes tu cuota.",
    },
    { type: "heading", level: 3, text: "Reducir la carga de los servidores MCP" },
    {
      type: "paragraph",
      text: "Las definiciones de las herramientas MCP están diferidas por defecto: solo entran en el contexto los nombres de las herramientas y las instrucciones del servidor hasta que Claude usa una concreta. Aun así, las herramientas de línea de comandos como `gh`, `aws`, `gcloud` o `sentry-cli` son más eficientes, porque Claude ya sabe usarlas y no añaden listado por herramienta. Ejecuta `/mcp` para ver los servidores configurados y desactivar los que no uses.",
    },
    { type: "heading", level: 3, text: "Plugins de inteligencia de código" },
    {
      type: "paragraph",
      text: "Estos plugins conectan Claude con un servidor de lenguaje. Le permiten saltar a una definición con una sola llamada en lugar de buscar texto y leer varios archivos, y avisan de errores de tipos tras cada edición. La documentación los ofrece para C y C++, C#, Go, Java, Kotlin, Lua, PHP, Python, Ruby, Rust, Swift y TypeScript y JavaScript. Se instalan en el momento de trabajar en tu aplicación (Día 40).",
    },
    {
      type: "callout",
      variant: "warning",
      text: "Instala solo plugins y skills de fuentes oficiales o de autores y comunidades que conozcas, y revisa su contenido antes. Un plugin o una skill malintencionados pueden manipular el comportamiento de Claude. La popularidad ayuda, pero no es una garantía.",
    },
    { type: "heading", level: 3, text: "Delegar el procesamiento: hooks, skills y subagentes" },
    {
      type: "paragraph",
      text: "Un hook es un comando que se ejecuta antes o después de una acción de Claude. En lugar de que Claude lea un registro de 10 000 líneas para encontrar errores, un hook puede quedarse solo con las líneas con ERROR y reducir decenas de miles de tokens a unos cientos. Una skill aporta conocimiento del dominio sin que Claude tenga que explorar: carga su contenido solo cuando se invoca. Un subagente hace tareas voluminosas (ejecutar pruebas, leer documentación o procesar registros) en su propia ventana de contexto y devuelve solo un resumen.",
    },
    {
      type: "code",
      lang: "json",
      title: "settings.json: hook que se ejecuta antes de cada comando Bash",
      code: "{\n  \"hooks\": {\n    \"PreToolUse\": [\n      {\n        \"matcher\": \"Bash\",\n        \"hooks\": [\n          {\n            \"type\": \"command\",\n            \"command\": \"~/.claude/hooks/filter-test-output.sh\"\n          }\n        ]\n      }\n    ]\n  }\n}",
    },
    {
      type: "paragraph",
      text: "Los hooks se estudian a fondo en el bloque intermedio. Aquí basta con la idea: filtrar antes de que el modelo lo vea es más barato que pedirle que filtre. Con `/hooks` puedes comprobar qué hooks están activos.",
    },
    { type: "heading", level: 3, text: "CLAUDE.md corto y reglas en skills" },
    {
      type: "paragraph",
      text: "CLAUDE.md se carga en todas las peticiones, así que conviene que contenga solo las reglas esenciales, con un tope práctico de 200 líneas. Las instrucciones de flujos específicos, como revisar pull requests o hacer migraciones, se mueven a skills: de una skill entra en cada turno solo su descripción, y el contenido completo se carga cuando se invoca. Una skill instalada de forma global tiene entonces un costo permanente pequeño, y `/skill-doctor` muestra cuánto cuesta cada una y con qué frecuencia se usa.",
    },
    {
      type: "callout",
      variant: "info",
      text: "Las documentaciones públicas suelen ofrecer una versión en Markdown de cada página. La de Claude Code la publica añadiendo `.md` a la dirección. Pasarle a Claude esa versión consume menos que pedirle que lea una página web completa, con su CSS y su JavaScript.",
    },
    { type: "heading", level: 3, text: "Ajustar el pensamiento" },
    {
      type: "paragraph",
      text: "El pensamiento extendido está activado por defecto y se factura como tokens de salida, que son los más caros. Se controla con el nivel de esfuerzo: `/effort` fija un nivel desde bajo hasta máximo, o automático. En los modelos Opus 5.5, Sonnet 5.5, Haiku 5.5 y los de la familia Fable el pensamiento no se puede desactivar. Usa niveles altos solo en tareas críticas.",
    },
    { type: "heading", level: 3, text: "Prompts específicos y hábitos de trabajo" },
    {
      type: "list",
      items: [
        "Prompts concretos: pedir mejorar el código base provoca una exploración amplia. Pedir añadir validación de entrada a la función de inicio de sesión de un archivo concreto necesita pocas lecturas.",
        "Modo plan en tareas complejas: Shift+Tab cambia de modo, y `/plan` entra directamente. Claude explora y propone un enfoque que puedes corregir antes de que empiece a escribir.",
        "Corregir pronto: pulsa Escape para detener a Claude en cuanto tome una dirección equivocada. `/rewind`, o Escape dos veces, restaura la conversación y el código a un punto anterior.",
        "Objetivos de verificación: incluye casos de prueba, capturas de pantalla o la salida esperada, para que Claude pueda comprobar su propio trabajo.",
        "Cambios pequeños: escribe un archivo, pruébalo y sigue. No pidas un sistema completo y sin errores de una sola vez.",
        "Tareas largas desatendidas: hay consumo en segundo plano, como los resúmenes de sesión, la compactación en reposo y las sugerencias de siguiente prompt. Evita dejar tareas abiertas durante mucho tiempo.",
      ],
    },
    {
      type: "callout",
      variant: "warning",
      text: "Los equipos de agentes consumen aproximadamente siete veces más tokens que una sesión normal cuando los compañeros trabajan en modo plan, porque cada uno mantiene su propia ventana de contexto. Es un tema del bloque avanzado: por ahora, ten presente que más agentes significan más gasto.",
    },
    { type: "heading", level: 2, text: "Configuraciones personales mínimas" },
    {
      type: "paragraph",
      text: "Dos ajustes rápidos que conviene dejar hechos al empezar. El primero es el modelo: `/model opusplan` para planificar con Opus y ejecutar con Sonnet. El segundo es una skill de estilo conciso, que pide a Claude respuestas cortas. La idea es aceptar un poco más de tokens de entrada, porque la descripción de la skill viaja en cada petición, a cambio de menos tokens de salida, que cuestan cinco veces más y son más fáciles de leer.",
    },
    {
      type: "paragraph",
      text: "Estas skills las publican terceros y su efecto varía con el tipo de trabajo, así que no hay una verdad absoluta sobre cuál es mejor. Sigue las instrucciones del repositorio de la skill que elijas, instala solo la que proceda de un autor de confianza, elige si la instalas solo en el proyecto o de forma global, y comprueba con tus propias consultas si de verdad ahorras. Si el comportamiento que buscas es sencillo, puedes escribir tu propia skill (Día 16 y siguientes).",
    },
    {
      type: "callout",
      variant: "info",
      text: "Instala por proyecto lo que sea específico de un proyecto, y de forma global solo lo que usarías en todos. Cada skill global aporta su descripción a todas tus conversaciones.",
    },
    { type: "heading", level: 2, text: "Ejercicios guiados y experimentos" },
    {
      type: "paragraph",
      text: "Los ejercicios con Claude Code se hacen en tu equipo, dentro de la carpeta del Día 2. Los editores de código verifican en el navegador los cálculos de la lección. Los resultados de pantalla dependen de tu versión y tu plan: la verificación de cada ejercicio indica qué debes comprobar.",
    },
    {
      type: "exercise",
      title: "Ejercicio 1: ver qué ocupa tu contexto",
      description: "Abre una sesión nueva y mira el contexto antes de escribir nada.",
      steps: [
        {
          instruction: "Entra a la carpeta del ejercicio e inicia Claude Code.",
          command: "cd ~/ClaudeCode/01-first-code && claude",
        },
        {
          instruction: "Pide el desglose del contexto.",
          command: "/context",
          expected: "Una cuadrícula con el espacio usado por el prompt del sistema, las herramientas, los archivos de memoria, las skills y los mensajes, y el espacio libre.",
        },
      ],
      verify: "Ves categorías con su número de tokens. Antes de escribir nada, el uso es bajo pero no es cero: es la base fija.",
    },
    {
      type: "exercise",
      title: "Ejercicio 2: nombrar, limpiar y retomar una sesión",
      description: "Practica el ciclo de la imagen: rename, clear y resume.",
      steps: [
        {
          instruction: "Pide algo pequeño que haga leer un archivo. Por ejemplo, referencia `index.html` con @ y pide que cambie los textos a capitalizados correctamente. Revisa y aprueba el cambio.",
        },
        {
          instruction: "Pon nombre a la sesión. Sin argumento, Claude propone uno a partir de la conversación.",
          command: "/rename",
          expected: "El nombre de la sesión aparece en la barra del prompt.",
        },
        {
          instruction: "Vacía el contexto.",
          command: "/clear",
          expected: "Conversación nueva y vacía.",
        },
        {
          instruction: "Sal de Claude Code (Ctrl+C dos veces) y retoma la sesión por su nombre desde la terminal. Sustituye el nombre por el que viste.",
          command: "claude --resume nombre-de-la-sesion",
          expected: "Se abre la conversación anterior con todo su historial.",
        },
      ],
      verify: "Al reanudar ves el mensaje y el cambio de la primera parte. Con `/resume` dentro de una sesión se abre el selector con tus sesiones.",
    },
    {
      type: "exercise",
      title: "Ejercicio 3: compactar con instrucciones",
      description: "Resume una conversación larga indicando qué conservar.",
      steps: [
        {
          instruction: "En una sesión con varios turnos, ejecuta el comando con una instrucción de enfoque.",
          command: "/compact conserva los cambios hechos en index.html",
          expected: "Claude resume la conversación. Después, el comando /context muestra menos uso que antes.",
        },
      ],
      verify: "Compara `/context` antes y después. Recuerda que compactar es una petición grande: úsalo cuando quieras continuidad. Para un comienzo limpio, usa `/clear`.",
    },
    {
      type: "exercise",
      title: "Ejercicio 4: desactivar un servidor MCP",
      description: "Aprende a ver y apagar lo que no uses. Si no tienes servidores MCP configurados, solo comprobarás que la lista está vacía.",
      steps: [
        {
          instruction: "Abre la lista de servidores. Muévete con las flechas y sal con Esc.",
          command: "/mcp",
          expected: "Lista de los servidores configurados con su estado, o un aviso si no hay ninguno.",
        },
        {
          instruction: "Si tienes alguno que no uses ahora, desactívalo por nombre.",
          command: "/mcp disable nombre-del-servidor",
          expected: "El servidor queda desactivado y su estado cambia en la lista.",
        },
      ],
      verify: "Vuelve a abrir `/mcp`: el servidor aparece desactivado. Puedes reactivarlo con `/mcp enable nombre-del-servidor`.",
    },
    {
      type: "exercise",
      title: "Ejercicio 5: consultar y ajustar el esfuerzo",
      description: "Mira el nivel de razonamiento actual y baja el esfuerzo en una tarea sencilla.",
      steps: [
        {
          instruction: "Consulta el nivel actual.",
          command: "/effort status",
          expected: "El nivel de esfuerzo en uso, por ejemplo high o auto.",
        },
        {
          instruction: "Fija un nivel bajo para una tarea simple.",
          command: "/effort low",
          expected: "Un mensaje que confirma el nuevo nivel.",
        },
      ],
      verify: "Vuelve a ejecutar `/effort status` y comprueba el cambio. Los niveles disponibles dependen del modelo activo.",
    },
    {
      type: "exercise",
      title: "Ejercicio 6: la idea del hook en tu terminal",
      description: "Un hook que filtra salida es, en el fondo, un comando como este. Mide cuánto se reduce una salida larga al quedarte solo con las últimas 100 líneas. Funciona en macOS, Linux y WSL.",
      steps: [
        {
          instruction: "Cuenta los caracteres de una salida de 10 000 líneas.",
          command: "seq 1 10000 | wc -c",
          expected: "48894",
        },
        {
          instruction: "Cuenta los caracteres de la misma salida filtrada a las últimas 100 líneas.",
          command: "seq 1 10000 | tail -n 100 | wc -c",
          expected: "501",
        },
        {
          instruction: "Comprueba qué línea queda primero tras el filtro.",
          command: "seq 1 10000 | tail -n 100 | head -1",
          expected: "9901",
        },
      ],
      verify: "Pasas de 48 894 caracteres a 501, aproximadamente un uno por ciento. Es la reducción que busca un hook de este tipo antes de que Claude vea la salida. En macOS `wc -c` puede mostrar espacios delante del número.",
    },
    {
      type: "exercise",
      title: "Ejercicio 7: plan antes de implementar",
      description: "Practica el modo plan con una tarea pequeña.",
      steps: [
        {
          instruction: "Entra en modo plan con una tarea concreta.",
          command: "/plan crear un index.html con un encabezado y un párrafo",
          expected: "Claude explora y propone un plan, sin editar archivos todavía.",
        },
        {
          instruction: "Lee el plan. Si algo no te cuadra, corrígelo ahora en lugar de después de implementar. Cuando estés de acuerdo, aprueba la ejecución.",
        },
      ],
      verify: "No se modifica ningún archivo hasta que apruebas el plan. Con Shift+Tab también puedes cambiar de modo desde el prompt.",
    },
    {
      type: "playground",
      title: "Experimento 8: cuánto cuesta no limpiar el contexto",
      description: "Cada turno agrega 1 000 tokens al historial y la base fija pesa 7 850 tokens, como en la tabla de ejemplo. Cuenta los tokens que se envían en 10 turnos, con y sin un `/clear` después del quinto. Es un cálculo sin precios ni caché: solo cuenta lo que se reenvía.",
      code: "const base = 7850;\nconst porTurno = 1000;\n\nfunction enviados(turnos) {\n  let total = 0;\n  for (let k = 1; k <= turnos; k++) {\n    total += base + porTurno * k;\n  }\n  return total;\n}\n\nconst sinClear = enviados(10);\nconst conClear = enviados(5) + enviados(5);\n\nconsole.log(\"sin clear: \" + sinClear);\nconsole.log(\"con clear: \" + conClear);\nconsole.log(\"diferencia: \" + (sinClear - conClear));",
      expected: "sin clear: 133500\ncon clear: 108500\ndiferencia: 25000",
    },
    {
      type: "playground",
      title: "Experimento 9: el pensamiento se paga como salida",
      description: "Un turno genera 20 000 tokens de pensamiento. Se facturan como tokens de salida. Calcula su costo en cada modelo con los precios del Día 2.",
      code: "const salidaPorMillon = { opus: 20, sonnet: 10, haiku: 0.5 };\nconst pensamiento = 20000;\n\nfor (const modelo of Object.keys(salidaPorMillon)) {\n  const costo = (pensamiento * salidaPorMillon[modelo]) / 1000000;\n  console.log(modelo + \": USD \" + costo.toFixed(2));\n}",
      expected: "opus: USD 0.40\nsonnet: USD 0.20\nhaiku: USD 0.01",
    },
    {
      type: "playground",
      title: "Experimento 10: ¿compensa una skill de estilo conciso?",
      description: "Un cálculo hipotético, no una medición: 100 respuestas de 800 tokens, una reducción supuesta del 30 por ciento en la salida y 150 tokens de descripción extra en cada petición, con precios de Sonnet 5.5. Cambia los supuestos y mira cuándo deja de compensar.",
      code: "const respuestas = 100;\nconst salidaMedia = 800;\nconst reduccion = 0.3;\nconst descripcion = 150;\nconst precioSalida = 10;\nconst precioEntrada = 2;\n\nconst ahorro = (respuestas * salidaMedia * reduccion * precioSalida) / 1000000;\nconst extra = (respuestas * descripcion * precioEntrada) / 1000000;\n\nconsole.log(\"ahorro en salida: \" + ahorro.toFixed(2));\nconsole.log(\"costo extra de entrada: \" + extra.toFixed(2));\nconsole.log(\"neto: \" + (ahorro - extra).toFixed(2));",
      expected: "ahorro en salida: 0.24\ncosto extra de entrada: 0.03\nneto: 0.21",
    },
    {
      type: "playground",
      title: "Experimento 11: revisar el tamaño de un CLAUDE.md",
      description: "La recomendación es no pasar de 200 líneas. Esta función indica si un archivo cumple o cuántas líneas conviene mover a skills o reglas por ruta.",
      code: "function revisar(lineas) {\n  if (lineas <= 200) return lineas + \": ok\";\n  return lineas + \": mueve \" + (lineas - 200) + \" lineas a skills\";\n}\n\nconsole.log(revisar(120));\nconsole.log(revisar(200));\nconsole.log(revisar(260));",
      expected: "120: ok\n200: ok\n260: mueve 60 lineas a skills",
    },
    { type: "heading", level: 2, text: "¿Qué usar en cada caso?" },
    {
      type: "table",
      headers: ["Si necesitas...", "Usa...", "Motivo"],
      rows: [
        ["Cambiar a una tarea sin relación con la anterior", "`/clear`", "No cuesta nada y quita el historial viejo."],
        ["Poder volver a la conversación después", "`/rename` y `claude --resume nombre`", "Retoma la sesión con todo su historial."],
        ["Seguir en la misma conversación con menos contexto", "`/compact` con instrucciones", "Conserva lo importante, pero es una petición grande."],
        ["Ver qué ocupa tu contexto", "`/context`", "Muestra categorías y sugiere optimizaciones."],
        ["Ver cuánto llevas gastado del plan", "`/usage`", "Barras de uso y desglose con recomendaciones."],
        ["Trabajar con GitHub, AWS o gcloud", "Sus herramientas de línea de comandos", "Claude ya las conoce y no añaden listado por herramienta."],
        ["Un servidor MCP que no estás usando", "`/mcp disable nombre`", "Quita su peso del contexto."],
        ["Instrucciones de un flujo específico", "Una skill", "Carga el contenido solo cuando se invoca."],
        ["Procesar salidas enormes", "Un hook o un subagente", "El modelo solo recibe lo relevante o un resumen."],
        ["Una tarea sencilla que no necesita razonar mucho", "`/effort low`", "El pensamiento se factura como salida."],
      ],
    },
    { type: "heading", level: 2, text: "Datos que suelen aparecer desactualizados" },
    {
      type: "table",
      headers: ["Suele decirse", "Información verificada (noviembre 2026)"],
      rows: [
        ["Las definiciones de todas las herramientas MCP viajan en cada petición.", "Por defecto están diferidas: solo entran los nombres de las herramientas y las instrucciones del servidor hasta que Claude usa una. Aun así, desactivar lo que no uses y preferir herramientas de línea de comandos sigue ahorrando contexto."],
        ["El contenido completo de las skills se envía siempre.", "En una sesión normal solo se carga el listado con nombres y descripciones. El contenido completo se carga al invocar la skill. Los subagentes con skills precargadas inyectan el contenido completo al empezar."],
        ["`/cost` solo funciona fuera de la suscripción.", "`/cost` es un alias de `/usage`. En suscripción muestra barras de uso y desglose del plan, y la cifra en dólares no es tu factura."],
        ["No tienes control sobre qué conserva `/compact`.", "Puedes darle instrucciones con `/compact enfoque`, resumir solo una parte con `/rewind`, fijar instrucciones de compactación en CLAUDE.md y elegir cuándo compacta de forma automática con `/autocompact`."],
        ["Los tokens de entrada cuestan 5 dólares y los de salida 25.", "Con Opus 5.5 cuestan 4 y 20. Sonnet 5.5, 2 y 10. Haiku 5.5, 0,10 y 0,50 hasta 100 000 tokens de prompt. En los tres, la salida cuesta cinco veces la entrada."],
        ["El pensamiento extendido se activa solo en tareas difíciles.", "Está activado por defecto. En Opus 5.5, Sonnet 5.5, Haiku 5.5 y Fable no se puede desactivar. Se controla con `/effort`."],
        ["Los plugins de inteligencia de código son solo para lenguajes tipados.", "La documentación los ofrece también para Python, Ruby, PHP y Lua, además de C y C++, C#, Go, Java, Kotlin, Rust, Swift y TypeScript y JavaScript."],
        ["Con muchas estrellas, un plugin es seguro.", "La popularidad no es una garantía. Revisa el contenido y prefiere fuentes oficiales o autores que conozcas."],
        ["Un CLAUDE.md puede ser tan largo como quieras.", "La recomendación es menos de 200 líneas. De la memoria automática se carga el principio de MEMORY.md, hasta 200 líneas o 25 KB."],
      ],
    },
    { type: "heading", level: 2, text: "Preguntas frecuentes" },
    {
      type: "accordion",
      items: [
        {
          title: "Si el modelo no recuerda nada, ¿cómo \"recuerda\" la conversación?",
          text: "Porque la aplicación se la reenvía completa en cada mensaje. No hay memoria en el modelo entre peticiones: lo que parece memoria es historial reenviado, junto con los archivos de memoria que Claude Code carga al empezar.",
        },
        {
          title: "¿Cuándo uso `/clear` y cuándo `/compact`?",
          text: "Usa `/clear` al cambiar a una tarea sin relación: no cuesta nada. Usa `/compact` cuando quieras seguir en la misma conversación con menos contexto. Compactar lee toda la conversación para resumirla, así que es una petición grande y puede perder detalles que Claude no considere importantes.",
        },
        {
          title: "¿Por qué una pregunta corta consume tanto al final del día?",
          text: "Porque envía toda la conversación acumulada. Con la caché de prompts se relee a precio de lectura, que es bajo, pero sigue contando. Si pasaste más tiempo del que dura la caché sin escribir, el primer mensaje reprocesa todo el contexto.",
        },
        {
          title: "¿Debo evitar los servidores MCP?",
          text: "No. Sirven cuando necesitas una integración que no tiene herramienta de línea de comandos. Lo que conviene es no dejar activos los que no uses, y preferir `gh`, `aws` o `gcloud` cuando existan.",
        },
        {
          title: "¿Una skill de respuestas cortas siempre ahorra?",
          text: "No está garantizado. Su descripción viaja en cada petición y su efecto depende de lo que pidas. Pruébala con tus propias consultas, mira el contador de tokens de salida junto al indicador de trabajo y decide.",
        },
        {
          title: "¿Los agentes en paralelo multiplican el gasto?",
          text: "Cada agente o subagente mantiene su propio contexto y hace sus propias peticiones. La documentación cifra en unas siete veces el consumo de un equipo de agentes en modo plan frente a una sesión normal. Úsalos con tareas pequeñas y bien acotadas.",
        },
      ],
    },
    { type: "heading", level: 2, text: "Qué sigue" },
    {
      type: "paragraph",
      text: "El Día 4 muestra cómo ejecutar Claude Code con modelos locales de Ollama para seguir practicando cuando se agota la cuota, con sus límites de calidad y de hardware. Después, desde el Día 5, empieza el bloque de fundamentos con el recorrido por la herramienta, el comando de rebobinado y el ciclo del agente.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 4, verifica que puedes explicar...",
      items: [
        "Por qué cada mensaje reenvía todo el historial y qué más forma la base fija de cada petición.",
        "Qué descarta `/clear` y qué vuelve a cargarse al empezar una conversación nueva.",
        "Cómo se nombra, se limpia y se retoma una sesión con `/rename`, `/clear` y `claude --resume`.",
        "La diferencia entre `/clear` y `/compact`, y por qué compactar es una petición grande.",
        "Por qué conviene preferir herramientas de línea de comandos a servidores MCP y cómo desactivar los que no usas.",
        "Qué cargan siempre CLAUDE.md y las skills, y por qué conviene un CLAUDE.md de menos de 200 líneas.",
        "Cómo se factura el pensamiento extendido y cómo se ajusta con `/effort`.",
        "Qué hábitos evitan gastar tokens en rutas equivocadas: plan, corrección temprana, verificación y cambios pequeños.",
      ],
    },
    { type: "heading", level: 2, text: "Fuentes consultadas (noviembre 2026)" },
    {
      type: "list",
      items: [
        "[Gestión de costos: técnicas para reducir tokens](https://code.claude.com/docs/en/costs)",
        "[Explorar la ventana de contexto](https://code.claude.com/docs/en/context-window)",
        "[Referencia de comandos de Claude Code](https://code.claude.com/docs/en/commands)",
        "[Cómo recuerda Claude tu proyecto: CLAUDE.md y memoria automática](https://code.claude.com/docs/en/memory)",
        "[Gestión de sesiones: reanudar, nombrar y continuar](https://code.claude.com/docs/en/sessions)",
        "[Extender Claude con skills](https://code.claude.com/docs/en/skills)",
        "[Plugins de inteligencia de código](https://code.claude.com/docs/en/plugins/code-intelligence)",
        "[Cómo usa Claude Code la caché de prompts](https://code.claude.com/docs/en/prompt-caching)",
        "[Cómo funciona Claude Code](https://code.claude.com/docs/en/how-claude-code-works)",
        "[Buenas prácticas para Claude Code](https://code.claude.com/docs/en/best-practices)",
        "[Configuración de modelos, esfuerzo y opusplan](https://code.claude.com/docs/en/model-config)",
        "[Precios de modelos en la plataforma de Claude](https://platform.claude.com/docs/en/about-claude/pricing)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "¿Por qué el historial completo se reenvía en cada mensaje?",
      options: [
        "Porque el modelo no guarda estado entre peticiones",
        "Porque Claude Code no usa caché",
        "Porque los archivos de memoria lo exigen",
        "Porque cada mensaje se factura por separado",
      ],
      correctIndex: 0,
      explanation: "El modelo no tiene estado: no recuerda nada entre peticiones, así que la aplicación le envía el historial y el mensaje nuevo en cada ocasión.",
    },
    {
      question: "¿Qué descarta `/clear`?",
      options: [
        "El CLAUDE.md y la memoria",
        "Los mensajes, las respuestas, las lecturas de archivos y los resultados de herramientas",
        "Las skills instaladas",
        "La autenticación",
      ],
      correctIndex: 1,
      explanation: "`/clear` empieza una conversación vacía. La base fija, como CLAUDE.md, la memoria y las descripciones de skills, se carga de nuevo al empezar.",
    },
    {
      question: "¿Cómo retomas desde la terminal una sesión que nombraste con `/rename`?",
      options: [
        "claude --resume nombre",
        "claude --restore nombre",
        "claude /resume nombre",
        "claude --name nombre",
      ],
      correctIndex: 0,
      explanation: "`claude --resume nombre` reanuda la sesión por su nombre. `claude --continue` reabre la más reciente de la carpeta.",
    },
    {
      question: "¿Qué es cierto de `/compact`?",
      options: [
        "No cuesta nada",
        "Borra por completo el historial",
        "Resume la conversación para liberar espacio, y puede recibir instrucciones sobre qué conservar",
        "Solo funciona con claves de API",
      ],
      correctIndex: 2,
      explanation: "`/compact` resume la conversación y admite instrucciones de enfoque. Es una petición grande, porque lee lo que va a resumir. Para empezar de cero, `/clear` no cuesta nada.",
    },
    {
      question: "¿Qué ocurre por defecto con las definiciones de las herramientas MCP?",
      options: [
        "Se envían completas en cada petición",
        "Están diferidas: solo entran los nombres de las herramientas y las instrucciones del servidor hasta que se usa una",
        "No se envían nunca",
        "Se envían una vez por semana",
      ],
      correctIndex: 1,
      explanation: "La documentación indica que las definiciones de herramientas MCP están diferidas por defecto. Aun así, conviene desactivar servidores sin uso y preferir herramientas de línea de comandos.",
    },
    {
      question: "¿Qué se carga de una skill en cada turno de una sesión normal?",
      options: [
        "Su contenido completo",
        "Solo su nombre y su descripción; el contenido se carga al invocarla",
        "Nada hasta que escribes su nombre",
        "Su código fuente y sus dependencias",
      ],
      correctIndex: 1,
      explanation: "El listado de skills con sus descripciones va en el contexto. El contenido completo se carga cuando la skill se invoca.",
    },
    {
      question: "¿Cuántas líneas se recomienda como máximo para un CLAUDE.md?",
      options: ["20", "50", "200", "2 000"],
      correctIndex: 2,
      explanation: "La documentación recomienda menos de 200 líneas por archivo: los más largos consumen más contexto y reducen la obediencia a las reglas.",
    },
    {
      question: "¿Cómo se factura el pensamiento extendido?",
      options: [
        "Como tokens de salida",
        "Como tokens de entrada",
        "Es gratuito",
        "Como lectura de caché",
      ],
      correctIndex: 0,
      explanation: "Los tokens de pensamiento se facturan como tokens de salida, que son los más caros. `/effort` permite ajustar el nivel.",
    },
    {
      question: "Quieres que Claude revise 10 000 líneas de un registro buscando errores. ¿Qué enfoque ahorra más tokens?",
      options: [
        "Pegar el registro completo en el prompt",
        "Un hook o un subagente que filtre las líneas con error y devuelva solo lo relevante",
        "Subir el nivel de esfuerzo al máximo",
        "Cambiar a un modelo más caro",
      ],
      correctIndex: 1,
      explanation: "Filtrar antes de que el modelo lo vea, con un hook, o aislar la lectura en un subagente, mantiene fuera de tu contexto lo que no importa.",
    },
    {
      question: "¿Cuál de estos hábitos evita gastar tokens en una dirección equivocada?",
      options: [
        "Pedir el sistema completo en un solo mensaje",
        "Usar el modo plan, corregir pronto con Escape o `/rewind`, y probar cambios pequeños",
        "Dejar tareas abiertas durante horas",
        "Escribir prompts vagos para que Claude explore",
      ],
      correctIndex: 1,
      explanation: "Planificar antes de implementar, detener a Claude en cuanto se desvía y avanzar con cambios pequeños y verificables evita rehacer trabajo, y cada salida se paga.",
    },
  ],
};
