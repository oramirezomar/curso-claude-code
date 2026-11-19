import type { Lesson } from "@/lib/types";

// Día 4 · Clases 14 y 16 de la transcripción, más el artículo 15 (temas puntuales).
// Contenido verificado en noviembre de 2026.
export const day04: Lesson = {
  day: 4,
  slug: "claude-code-con-modelos-de-ollama",
  title: "Claude Code con modelos de Ollama",
  section: "Claude Code con modelos de Ollama",
  estimatedMinutes: 40,
  icon: "🖥️",
  objectives: [
    "Explicar para qué sirve ejecutar Claude Code con modelos de Ollama y qué límites tiene frente a los modelos de Anthropic.",
    "Ajustar el contexto de Ollama a 64 000 tokens o más y comprobar con `ollama ps` cuánta memoria usa y si corre en GPU.",
    "Descargar y borrar un modelo local con `ollama pull` y `ollama rm`, y distinguirlo de un modelo en la nube con la etiqueta `:cloud`.",
    "Lanzar Claude Code con `ollama launch claude` y comprobar el modelo con `/model` y la conexión con `/status`.",
    "Volver a los modelos de Anthropic sin dejar variables de entorno activas por error.",
  ],
  blocks: [
    {
      type: "paragraph",
      text: "Cuando se agota la cuota del plan, todavía se puede seguir practicando con Claude Code si se le conecta un modelo que corre en tu propio equipo o en la nube de Ollama. Funciona, pero con costos distintos: más lento, con resultados diferentes y sin el respaldo de Anthropic. Esta lección enseña a hacerlo con cuidado y, sobre todo, a saber en todo momento a qué modelo le estás hablando.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "64k", label: "Contexto mínimo recomendado para programar con agentes" },
        { value: "4k", label: "Contexto por defecto de Ollama con menos de 24 GiB de VRAM" },
        { value: "1", label: "Comando para lanzar: ollama launch claude" },
        { value: "3", label: "Variables de entorno de la configuración manual" },
        { value: ":cloud", label: "Etiqueta que marca un modelo alojado en la nube de Ollama" },
        { value: "/status", label: "Comando que muestra el modelo, la cuenta y la conexión" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text: "Contenido verificado en noviembre de 2026 contra la documentación de Ollama (integración con Claude Code, contexto, compatibilidad con la API de Anthropic, precios y preguntas frecuentes de la nube) y la de Claude Code sobre pasarelas. Los modelos disponibles y los precios cambian con frecuencia: usa las listas oficiales vigentes.",
    },
    { type: "heading", level: 2, text: "Qué se puede esperar y qué no" },
    {
      type: "paragraph",
      text: "Claude Code está pensado para trabajar con los modelos de Anthropic y con ellos da los mejores resultados. La documentación de Claude Code aclara que Anthropic no da soporte a enviar Claude Code a modelos que no sean de Claude a través de una pasarela. Ollama, por su parte, documenta cómo conectarlo mediante una API compatible con la de Anthropic, que admite mensajes, respuestas por streaming y llamadas a herramientas, pero no todas las funciones: los controles de elección de herramienta, las herramientas diferidas y la búsqueda web alojada no están totalmente soportados.",
    },
    {
      type: "image",
      src: "/img/dia-04/rutas-de-conexion.svg",
      alt: "Claude Code arriba y tres rutas hacia abajo: modelos de Anthropic con el comando claude, un modelo local de Ollama con ollama launch claude y un modelo en la nube de Ollama con la etiqueta cloud. Una franja inferior recuerda comprobar el modelo con /model y la conexión con /status.",
      caption: "Tres destinos posibles para Claude Code. Solo el primero es la combinación soportada por Anthropic.",
    },
    {
      type: "callout",
      variant: "warning",
      text: "Con un modelo local o de otro proveedor, espera más lentitud y resultados menos fiables en tareas largas. Revisa con más cuidado cada cambio que propone antes de aceptarlo. Para el resto del curso se usan los modelos de Anthropic: esta lección es un plan B, no un reemplazo.",
    },
    { type: "heading", level: 2, text: "Preparar Ollama" },
    {
      type: "paragraph",
      text: "Ollama es una aplicación que descarga y ejecuta modelos en tu equipo y expone una API local. Se instala desde su página de descargas, con un instalador para macOS, Windows y Linux. Los modelos grandes necesitan una tarjeta gráfica con bastante VRAM y memoria RAM, y el rendimiento depende de ellas. Antes de elegir un modelo revisa los requisitos de hardware que indica su ficha.",
    },
    { type: "heading", level: 3, text: "El contexto importa más de lo que parece" },
    {
      type: "paragraph",
      text: "El contexto es la cantidad de tokens que el modelo tiene presente. Por defecto, Ollama asigna un valor según tu VRAM: 4 000 tokens con menos de 24 GiB, 32 000 entre 24 y 48 GiB y 256 000 con 48 GiB o más. Claude Code envía por sí solo una base fija de miles de tokens (Día 3), así que un contexto de 4 000 no alcanza. La documentación de Ollama pide al menos 64 000 tokens para tareas con búsqueda web, agentes y herramientas de programación.",
    },
    {
      type: "image",
      src: "/img/dia-04/contexto-por-memoria.svg",
      alt: "Gráfico de barras con el contexto predeterminado de Ollama según la VRAM: 4 000 con menos de 24 GiB, 32 000 entre 24 y 48 GiB y 256 000 con 48 GiB o más, con una línea vertical en 64 000 como mínimo recomendado.",
      caption: "Contexto predeterminado según la VRAM y el mínimo de 64 000 tokens que conviene fijar.",
    },
    {
      type: "paragraph",
      text: "El valor se cambia con el control deslizante de contexto en los ajustes de la aplicación. Si no puedes usarla, se puede fijar al arrancar el servidor con la variable `OLLAMA_CONTEXT_LENGTH`. Un contexto mayor consume más memoria, así que sube el valor solo hasta donde tu equipo lo soporte. Con `ollama ps` ves cuánto contexto tiene asignado cada modelo en ejecución y si corre en la GPU: conviene evitar que se descargue parte a la CPU, porque el rendimiento cae.",
    },
    {
      type: "code",
      lang: "bash",
      title: "Fijar el contexto al arrancar el servidor",
      code: "OLLAMA_CONTEXT_LENGTH=64000 ollama serve",
    },
    {
      type: "code",
      lang: "text",
      title: "Salida de ollama ps (ejemplo de la documentación)",
      code: "NAME             ID              SIZE      PROCESSOR    CONTEXT    UNTIL\ngemma4:latest    c6eb396dbd59    9.6 GB    100% GPU     131072     2 minutes from now",
    },
    { type: "heading", level: 2, text: "Modelos locales y modelos en la nube" },
    {
      type: "paragraph",
      text: "Los modelos locales se descargan a tu equipo y se ejecutan con tu hardware. Se descargan con `ollama pull nombre`, se listan con `ollama list` y se borran con `ollama rm nombre`. Pesan varios gigabytes, así que revisa el tamaño en la ficha del modelo antes de descargarlo, y ten paciencia con la primera descarga. También se pueden descargar desde el panel visual de la aplicación.",
    },
    {
      type: "paragraph",
      text: "Los modelos de la nube llevan la etiqueta `:cloud`. Se ejecutan en los servidores de Ollama, así que no hace falta una GPU potente, y su contexto está fijado por defecto en el máximo del modelo. Para usarlos necesitas una cuenta de Ollama y haber iniciado sesión desde tu equipo con `ollama signin`. La política de Ollama indica que procesa los mensajes y respuestas de forma transitoria, sin almacenarlos ni usarlos para entrenar.",
    },
    {
      type: "table",
      caption: "Local frente a nube",
      headers: ["Aspecto", "Modelo local", "Modelo en la nube (etiqueta cloud)"],
      rows: [
        ["Dónde se ejecuta", "En tu equipo", "En los servidores de Ollama"],
        ["Hardware", "Depende de tu GPU, tu VRAM y tu RAM", "No lo necesitas"],
        ["Velocidad", "Más lenta, según el equipo", "Normalmente más rápida"],
        ["Costo", "Sin costo por token", "Se factura por uso: pago por token o créditos de un plan"],
        ["Cuenta", "No hace falta", "Cuenta de Ollama con sesión iniciada"],
        ["Contexto", "El que configures, limitado por tu memoria", "El máximo del modelo por defecto"],
      ],
    },
    {
      type: "callout",
      variant: "info",
      text: "Aunque el modelo sea local, Claude Code sigue mostrando contadores de tokens. Son tokens procesados en tu equipo y no cuentan contra tu cuota de Anthropic.",
    },
    { type: "heading", level: 3, text: "Cuánto cuesta la nube de Ollama" },
    {
      type: "paragraph",
      text: "En noviembre de 2026 la página de precios de Ollama ofrece un plan de pago por token con un costo base de 0 dólares, un plan Pro de 20 dólares al mes con 60 dólares de créditos de uso incluidos y un plan Max de 100 dólares al mes con 300 dólares de créditos. Los precios por millón de tokens varían por modelo. Por ejemplo, gemma4 cuesta 0,14 de entrada y 0,40 de salida, y glm-5.3-flash cuesta 0,15 y 0,50.",
    },
    { type: "heading", level: 2, text: "Lanzar Claude Code con Ollama" },
    {
      type: "paragraph",
      text: "Con Ollama instalado y el modelo descargado, el comando más corto es `ollama launch claude`, que abre un selector de modelo. También se puede indicar el modelo directamente. Hazlo desde la carpeta de tu proyecto, igual que con los modelos de Anthropic.",
    },
    {
      type: "image",
      src: "/img/dia-04/flujo-con-ollama.svg",
      alt: "Cinco pasos en fila: instalar Ollama con contexto de 64 000 o más, descargar con ollama pull, lanzar con ollama launch claude --model, comprobar con /model y /status, y volver a los modelos de Anthropic ejecutando claude. Debajo, dos cuidados sobre variables de entorno y calidad de los resultados.",
      caption: "Del modelo descargado a la primera consulta, y cómo regresar.",
    },
    {
      type: "code",
      lang: "bash",
      title: "Lanzar Claude Code con un modelo de Ollama",
      code: "ollama pull qwen3.5\nollama launch claude --model qwen3.5",
    },
    {
      type: "paragraph",
      text: "Dentro de la sesión, `/model` muestra el modelo activo: debe aparecer el modelo de Ollama y no los de Anthropic. `/status` muestra además la conexión. Después puedes pedir algo pequeño, como agregar saludos en varios idiomas a un `index.html` con `@index.html`. Un modelo local puede tardar decenas de segundos en una tarea sencilla, según tu equipo.",
    },
    {
      type: "paragraph",
      text: "Si el comando `ollama launch` no existe, tu Ollama está desactualizado: actualízalo e inténtalo de nuevo. Si lo prefieres, Ollama documenta también una configuración manual con tres variables de entorno.",
    },
    {
      type: "code",
      lang: "bash",
      title: "Configuración manual para un modelo local",
      code: "export ANTHROPIC_AUTH_TOKEN=ollama\nexport ANTHROPIC_API_KEY=\"\"\nexport ANTHROPIC_BASE_URL=http://localhost:11434\n\nclaude --model qwen3.5",
    },
    {
      type: "code",
      lang: "bash",
      title: "Lo mismo en una sola línea, sin dejar variables activas",
      code: "ANTHROPIC_AUTH_TOKEN=ollama ANTHROPIC_BASE_URL=http://localhost:11434 ANTHROPIC_API_KEY=\"\" claude --model qwen3.5",
    },
    {
      type: "callout",
      variant: "warning",
      text: "Con `export`, las variables siguen activas en esa terminal hasta que la cierres o las borres con `unset`. Si después ejecutas `claude` creyendo que hablas con Anthropic, seguirás hablando con Ollama. Con `ollama launch` o con las variables escritas antes del comando, solo afectan a esa ejecución. Comprueba siempre `/model` y `/status`.",
    },
    {
      type: "paragraph",
      text: "Según la documentación de Claude Code, cuando una variable de credencial de pasarela como `ANTHROPIC_AUTH_TOKEN` está activa, las peticiones no usan el inicio de sesión de tu suscripción y sus límites de uso no se aplican. Por eso estas conexiones no consumen tu cuota de Claude.",
    },
    { type: "heading", level: 3, text: "Conexión directa a la nube de Ollama" },
    {
      type: "paragraph",
      text: "La documentación de Ollama también describe conectar Claude Code directamente a la nube, sin instalar Ollama: se apunta `ANTHROPIC_BASE_URL` a `https://ollama.com`, se pasa tu clave de API como `ANTHROPIC_AUTH_TOKEN` y se deja `ANTHROPIC_API_KEY` vacía. Elige un modelo de la nube que admita herramientas. Trata la clave de API como un secreto: no la pegues en archivos que subas a un repositorio.",
    },
    { type: "heading", level: 2, text: "Ejercicios guiados y experimentos" },
    {
      type: "paragraph",
      text: "Los ejercicios con Ollama se hacen en tu equipo y requieren instalarlo y descargar un modelo, algo que no todos los equipos soportan. Si el tuyo no puede, lee los pasos y haz los experimentos de cálculo, que se verifican en el navegador.",
    },
    {
      type: "exercise",
      title: "Ejercicio 1: instalar Ollama y comprobar la versión",
      description: "Descarga el instalador de tu sistema desde la página de descargas de Ollama y ábrelo.",
      steps: [
        {
          instruction: "Abre una terminal nueva y ejecuta el comando.",
          command: "ollama --version",
          expected: "ollama version is 0.x.y\n(el número será el de tu instalación)",
        },
        {
          instruction: "Comprueba que el comando de lanzamiento existe.",
          command: "ollama launch --help",
          expected: "La ayuda del comando launch, que lista las integraciones disponibles.",
        },
      ],
      verify: "Ambos comandos responden. Si `ollama launch` no se reconoce, actualiza Ollama.",
    },
    {
      type: "exercise",
      title: "Ejercicio 2: fijar un contexto de 64 000 tokens",
      description: "Hazlo con el control deslizante de la aplicación o, si no puedes, al arrancar el servidor.",
      steps: [
        {
          instruction: "Abre los ajustes de la aplicación de Ollama y sitúa el control de contexto en 64k o más. Si usas el servidor desde la terminal, ejecuta esto en su lugar.",
          command: "OLLAMA_CONTEXT_LENGTH=64000 ollama serve",
          expected: "El servidor queda en ejecución. Déjalo abierto y usa otra terminal.",
        },
      ],
      verify: "Más adelante, `ollama ps` mostrará en la columna CONTEXT el valor configurado cuando haya un modelo cargado.",
    },
    {
      type: "exercise",
      title: "Ejercicio 3: descargar y listar un modelo",
      description: "Elige uno ligero de la lista de modelos de Ollama. Aquí se usa qwen3.5 como ejemplo: revisa su tamaño antes de descargarlo.",
      steps: [
        {
          instruction: "Descarga el modelo. Puede tardar varios minutos.",
          command: "ollama pull qwen3.5",
          expected: "Una barra de progreso y, al final, el mensaje de éxito. Si ya lo tenías, indica que está actualizado.",
        },
        {
          instruction: "Lista los modelos que tienes.",
          command: "ollama list",
          expected: "Una tabla con el modelo, su identificador, su tamaño y la fecha de modificación.",
        },
      ],
      verify: "El modelo aparece en la lista. Para borrarlo más adelante: `ollama rm qwen3.5`.",
    },
    {
      type: "exercise",
      title: "Ejercicio 4: lanzar Claude Code con el modelo local",
      description: "Crea un `index.html` mínimo en la carpeta del Día 2 con dos párrafos: Hola Mundo y Hello World.",
      steps: [
        {
          instruction: "Desde la carpeta del proyecto, lanza Claude Code con el modelo.",
          command: "cd ~/ClaudeCode/01-first-code && ollama launch claude --model qwen3.5",
          expected: "Se abre Claude Code. Puede tardar unos segundos en cargar el modelo.",
        },
        {
          instruction: "Comprueba el modelo y la conexión.",
          command: "/model",
          expected: "El modelo activo es el de Ollama, no uno de Anthropic.",
        },
        {
          instruction: "Pide un cambio pequeño y revisa el resultado.",
          command: "@index.html agrega cinco saludos más en distintos idiomas",
          expected: "Claude propone editar index.html. Acéptalo tras revisar el cambio.",
        },
      ],
      verify: "El archivo tiene los saludos nuevos. Anota cuánto tardó: sirve para comparar con la nube.",
    },
    {
      type: "exercise",
      title: "Ejercicio 5: comparar con un modelo en la nube",
      description: "Necesitas una cuenta de Ollama. Los modelos en la nube cambian: elige uno con la etiqueta cloud en la lista oficial.",
      steps: [
        {
          instruction: "Sal de Claude Code con Ctrl+C y, si no lo hiciste antes, inicia sesión en Ollama.",
          command: "ollama signin",
          expected: "Se abre el navegador para autorizar tu equipo.",
        },
        {
          instruction: "Lanza Claude Code con un modelo de la nube. Sustituye el nombre por el que elijas de la lista.",
          command: "ollama launch claude --model nombre-del-modelo:cloud",
          expected: "Claude Code abre con el modelo en la nube.",
        },
      ],
      verify: "Repite el mismo pedido del ejercicio anterior. Compara la velocidad y recuerda que este uso se factura según tu plan de Ollama.",
    },
    {
      type: "exercise",
      title: "Ejercicio 6: variables de entorno sin dejar rastro",
      description: "Comprueba la diferencia entre una variable escrita antes del comando y una exportada. Funciona en macOS, Linux y WSL.",
      steps: [
        {
          instruction: "Escribe la variable solo para un comando. Aparece mientras el comando corre.",
          command: "ANTHROPIC_BASE_URL=http://localhost:11434 env | grep ANTHROPIC_BASE_URL",
          expected: "ANTHROPIC_BASE_URL=http://localhost:11434",
        },
        {
          instruction: "Comprueba que no quedó activa en la terminal.",
          command: "env | grep -c ANTHROPIC_BASE_URL",
          expected: "0",
        },
        {
          instruction: "Ahora expórtala y vuelve a mirar. Después bórrala.",
          command: "export ANTHROPIC_BASE_URL=http://localhost:11434; env | grep ANTHROPIC_BASE_URL; unset ANTHROPIC_BASE_URL; env | grep -c ANTHROPIC_BASE_URL",
          expected: "ANTHROPIC_BASE_URL=http://localhost:11434\n0",
        },
      ],
      verify: "Con la variable escrita antes del comando no queda nada activo. Con `export` sí, hasta que ejecutas `unset` o cierras la terminal.",
    },
    {
      type: "exercise",
      title: "Ejercicio 7: volver a los modelos de Anthropic",
      description: "Asegúrate de que la siguiente sesión usa Anthropic.",
      steps: [
        {
          instruction: "Sal de la sesión con Ctrl+C. Comprueba que no quedaron variables de Ollama en la terminal.",
          command: "env | grep ANTHROPIC",
          expected: "(sin salida: no hay variables ANTHROPIC activas)",
        },
        {
          instruction: "Inicia Claude Code y comprueba el modelo.",
          command: "claude",
        },
        {
          instruction: "Dentro de la sesión, mira la cuenta y el modelo.",
          command: "/status",
          expected: "Tu cuenta de Claude y el modelo de Anthropic que tengas configurado.",
        },
      ],
      verify: "Aparece tu cuenta de Claude y un modelo de Anthropic. Si ves un modelo de Ollama, busca variables con `env | grep ANTHROPIC` y bórralas con `unset`.",
    },
    {
      type: "exercise",
      title: "Ejercicio 8: borrar un modelo que ya no usas",
      description: "Los modelos locales ocupan varios gigabytes. Libera el espacio cuando termines.",
      steps: [
        {
          instruction: "Borra el modelo descargado.",
          command: "ollama rm qwen3.5",
          expected: "Un mensaje que confirma que el modelo se eliminó.",
        },
      ],
      verify: "`ollama list` ya no muestra el modelo.",
    },
    {
      type: "playground",
      title: "Experimento 9: contexto predeterminado según la VRAM",
      description: "Calcula el contexto que asigna Ollama por defecto y si llega al mínimo de 64 000 tokens. Prueba con otros valores de VRAM.",
      code: "function contexto(vramGiB) {\n  if (vramGiB < 24) return 4000;\n  if (vramGiB < 48) return 32000;\n  return 256000;\n}\n\nfor (const vram of [16, 32, 64]) {\n  const c = contexto(vram);\n  console.log(vram + \" GiB: \" + c + (c >= 64000 ? \" ok\" : \" insuficiente\"));\n}",
      expected: "16 GiB: 4000 insuficiente\n32 GiB: 32000 insuficiente\n64 GiB: 256000 ok",
    },
    {
      type: "playground",
      title: "Experimento 10: ¿cabe tu sesión en el contexto?",
      description: "La base fija pesa unos 7 850 tokens (Día 3) y cada archivo que lees suma. Comprueba si la sesión cabe en cada tamaño de contexto.",
      code: "const base = 7850;\nconst archivos = 40000;\nconst total = base + archivos;\n\nfor (const contexto of [4000, 32000, 64000]) {\n  const cabe = total <= contexto;\n  console.log(contexto + \": \" + (cabe ? \"cabe\" : \"no cabe\"));\n}",
      expected: "4000: no cabe\n32000: no cabe\n64000: cabe",
    },
    {
      type: "playground",
      title: "Experimento 11: costo de una consulta en la nube de Ollama",
      description: "Con los precios por millón de tokens de la página de precios de Ollama, calcula el costo de una consulta con 50 000 tokens de entrada y 5 000 de salida. Los precios cambian: revisa la página.",
      code: "const precios = {\n  \"gemma4\": { entrada: 0.14, salida: 0.40 },\n  \"glm-5.3-flash\": { entrada: 0.15, salida: 0.50 },\n  \"deepseek-v4.1-flash\": { entrada: 0.30, salida: 1.20 },\n};\n\nfor (const [modelo, p] of Object.entries(precios)) {\n  const costo = (50000 * p.entrada + 5000 * p.salida) / 1000000;\n  console.log(modelo + \": USD \" + costo.toFixed(4));\n}",
      expected: "gemma4: USD 0.0090\nglm-5.3-flash: USD 0.0100\ndeepseek-v4.1-flash: USD 0.0210",
    },
    {
      type: "playground",
      title: "Experimento 12: armar el comando de una sola línea",
      description: "Construye el comando con las variables antes de `claude`, como en la documentación. Cambia la dirección y el modelo para ver cómo se compone.",
      code: "function comando(base, token, modelo) {\n  return \"ANTHROPIC_AUTH_TOKEN=\" + token +\n    \" ANTHROPIC_BASE_URL=\" + base +\n    \" ANTHROPIC_API_KEY=\\\"\\\" claude --model \" + modelo;\n}\n\nconsole.log(comando(\"http://localhost:11434\", \"ollama\", \"qwen3.5\"));",
      expected: "ANTHROPIC_AUTH_TOKEN=ollama ANTHROPIC_BASE_URL=http://localhost:11434 ANTHROPIC_API_KEY=\"\" claude --model qwen3.5",
    },
    { type: "heading", level: 2, text: "¿Qué usar en cada caso?" },
    {
      type: "table",
      headers: ["Si necesitas...", "Usa...", "Nota"],
      rows: [
        ["Resultados fiables y soporte oficial", "Los modelos de Anthropic", "Es la combinación que Anthropic soporta."],
        ["Seguir practicando sin tocar tu cuota", "Un modelo local de Ollama", "Más lento y menos fiable. Requiere buen hardware."],
        ["Más velocidad sin una GPU potente", "Un modelo con etiqueta cloud", "Se factura por uso y requiere cuenta de Ollama."],
        ["Que tu código no salga de tu equipo", "Un modelo local", "Con la nube, el contenido se procesa en los servidores de Ollama."],
        ["Una conexión puntual sin cambiar tu terminal", "`ollama launch claude` o variables antes del comando", "No dejan variables activas."],
        ["Saber a qué modelo hablas", "`/model` y `/status`", "Compruébalo siempre al empezar."],
        ["Liberar espacio en disco", "`ollama rm modelo`", "Los modelos locales ocupan varios gigabytes."],
      ],
    },
    { type: "heading", level: 2, text: "Datos que suelen aparecer desactualizados" },
    {
      type: "table",
      headers: ["Suele decirse", "Información verificada (noviembre 2026)"],
      rows: [
        ["Con la cuenta gratuita de Ollama tienes un uso ligero, con sesiones de 5 horas y límites semanales.", "La página de precios de Ollama describe hoy un plan de pago por token de 0 dólares, un Pro de 20 al mes con 60 dólares de créditos y un Max de 100 al mes con 300 dólares de créditos. Su aviso de cambio de planes indica que los límites de sesión y semanales de los planes anteriores ya no se aplican."],
        ["Hace falta una versión de Ollama posterior a la 0.11.", "La documentación actual solo indica usar `ollama launch claude`. Si el comando no existe, actualiza Ollama a la versión más reciente."],
        ["Un contexto de 64 000 tokens es solo una recomendación de rendimiento.", "Es el mínimo que indica la documentación de Ollama para agentes y herramientas de programación. Con menos, Claude Code no cabe: su base fija ya pesa miles de tokens."],
        ["Los modelos cloud están pensados para Claude Code.", "Ollama los ofrece para usar modelos grandes sin descargarlos. Son modelos de terceros: Anthropic no da soporte a ejecutar Claude Code con ellos."],
        ["Todas las funciones de Claude Code funcionan con modelos de Ollama.", "Ollama soporta un subconjunto de la API de mensajes. Los controles de elección de herramienta, las herramientas diferidas y la búsqueda web alojada no están totalmente soportados."],
        ["Al salir, `claude` vuelve a los modelos de Anthropic.", "Solo si no quedaron variables de entorno exportadas. Con `export` siguen activas en esa terminal hasta que las borras con `unset` o la cierras."],
        ["Los tokens locales son gratis y no se cuentan.", "Se cuentan en pantalla, pero se procesan en tu equipo y no consumen tu cuota de Anthropic. Con modelos en la nube sí se facturan al proveedor."],
      ],
    },
    { type: "heading", level: 2, text: "Preguntas frecuentes" },
    {
      type: "accordion",
      items: [
        {
          title: "¿Puedo usar un modelo local como sustituto del curso entero?",
          text: "Puedes seguir muchos ejercicios, pero con resultados distintos y más lentos. El curso está escrito con los modelos de Anthropic y algunas funciones, como la búsqueda web alojada, no están totalmente soportadas con Ollama.",
        },
        {
          title: "¿Qué hardware necesito?",
          text: "Depende del modelo. Consulta la ficha del modelo en Ollama para ver su tamaño y la memoria que necesita. La VRAM y la RAM son lo que más pesa, y un contexto mayor exige más memoria. Con `ollama ps` ves si corre completamente en GPU.",
        },
        {
          title: "¿Por qué Claude Code responde mal con mi modelo local?",
          text: "Puede deberse a un contexto demasiado pequeño, a un modelo que no maneja bien las herramientas o a la propia diferencia de capacidad frente a los modelos de Anthropic. Sube el contexto a 64 000 o más y prueba un modelo que admita herramientas.",
        },
        {
          title: "¿Mi código sale de mi equipo?",
          text: "Con un modelo local no: se procesa en tu máquina. Con un modelo cloud, el contenido se envía a los servidores de Ollama. Ollama indica que lo procesa de forma transitoria, sin almacenarlo ni entrenar con él. Aun así, no uses la nube con código que tu organización no permita compartir.",
        },
        {
          title: "¿Cómo sé que dejé de usar Ollama?",
          text: "Ejecuta `/status` dentro de Claude Code y revisa el modelo y la cuenta. Fuera de la sesión, `env | grep ANTHROPIC` muestra si hay variables activas.",
        },
        {
          title: "¿Esto consume mi cuota de Claude?",
          text: "No, porque las peticiones van a Ollama y no a Anthropic. Según la documentación, cuando una credencial de pasarela está activa, el inicio de sesión de tu suscripción no se usa. Si usas modelos cloud, el costo lo factura Ollama.",
        },
      ],
    },
    { type: "heading", level: 2, text: "Qué sigue" },
    {
      type: "paragraph",
      text: "El Día 5 empieza el bloque de fundamentos con un recorrido por Claude Code: la pantalla, los atajos, el comando de rebobinado para volver a estados anteriores y el ciclo del agente. A partir de ahí el curso vuelve a trabajar con los modelos de Anthropic.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 5, verifica que puedes explicar...",
      items: [
        "Por qué Anthropic no soporta ejecutar Claude Code con modelos que no son suyos y qué límites tiene la compatibilidad de Ollama.",
        "Por qué el contexto de Ollama debe ser de 64 000 tokens o más y cómo se cambia.",
        "Cómo se descarga, se lista y se borra un modelo local, y cómo se reconoce uno en la nube.",
        "Cómo se lanza Claude Code con `ollama launch claude` y cómo se comprueba con `/model` y `/status`.",
        "La diferencia entre exportar variables de entorno y escribirlas antes de un comando.",
        "Cómo volver a los modelos de Anthropic sin que queden variables activas.",
      ],
    },
    { type: "heading", level: 2, text: "Fuentes consultadas (noviembre 2026)" },
    {
      type: "list",
      items: [
        "[Ollama: integración con Claude Code](https://docs.ollama.com/integrations/claude-code)",
        "[Ollama: longitud de contexto](https://docs.ollama.com/context-length)",
        "[Ollama: referencia de la CLI](https://docs.ollama.com/cli)",
        "[Ollama: compatibilidad con la API de Anthropic](https://docs.ollama.com/api/anthropic-compatibility)",
        "[Ollama: preguntas frecuentes de la nube](https://docs.ollama.com/cloud/faq)",
        "[Ollama: uso y planes de la nube](https://docs.ollama.com/cloud/usage)",
        "[Ollama: precios](https://ollama.com/pricing)",
        "[Ollama: descargas](https://ollama.com/download)",
        "[Claude Code: otras pasarelas de modelos](https://code.claude.com/docs/en/llm-gateway)",
        "[Claude Code: variables de entorno](https://code.claude.com/docs/en/env-vars)",
        "[Claude Code: configuración de modelos](https://code.claude.com/docs/en/model-config)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "¿Qué dice la documentación de Claude Code sobre enviarlo a modelos que no son de Claude?",
      options: [
        "Es la configuración recomendada",
        "Anthropic no da soporte a enrutar Claude Code a modelos que no son de Claude",
        "Solo funciona con la API de Console",
        "Está prohibido por la licencia",
      ],
      correctIndex: 1,
      explanation: "La página sobre pasarelas indica que Anthropic no da soporte a enrutar Claude Code a modelos que no sean de Claude, aunque Ollama documente una integración.",
    },
    {
      question: "¿Qué contexto mínimo recomienda Ollama para agentes y herramientas de programación?",
      options: ["4 000 tokens", "16 000 tokens", "64 000 tokens", "1 000 000 tokens"],
      correctIndex: 2,
      explanation: "La documentación recomienda al menos 64 000 tokens para tareas con búsqueda web, agentes y herramientas de programación.",
    },
    {
      question: "¿Qué contexto asigna Ollama por defecto con menos de 24 GiB de VRAM?",
      options: ["4 000 tokens", "32 000 tokens", "64 000 tokens", "256 000 tokens"],
      correctIndex: 0,
      explanation: "Con menos de 24 GiB de VRAM el valor por defecto es 4 000 tokens, insuficiente para Claude Code. Entre 24 y 48 GiB son 32 000, y con 48 GiB o más, 256 000.",
    },
    {
      question: "¿Qué comando muestra cuánto contexto tiene cada modelo cargado y si corre en GPU?",
      options: ["ollama list", "ollama ps", "ollama rm", "ollama pull"],
      correctIndex: 1,
      explanation: "`ollama ps` lista los modelos en ejecución con su tamaño, el procesador y el contexto. `ollama list` muestra los modelos descargados.",
    },
    {
      question: "¿Qué indica la etiqueta cloud en un modelo de Ollama?",
      options: [
        "Que se ejecuta en tu GPU",
        "Que se ejecuta en los servidores de Ollama y requiere una cuenta",
        "Que es gratuito sin límites",
        "Que es un modelo de Anthropic",
      ],
      correctIndex: 1,
      explanation: "Los modelos cloud se alojan en la nube de Ollama. Necesitan una cuenta con sesión iniciada y se facturan por uso.",
    },
    {
      question: "¿Cuál es el comando más corto para lanzar Claude Code con Ollama?",
      options: ["ollama claude", "ollama launch claude", "claude --ollama", "ollama run claude-code"],
      correctIndex: 1,
      explanation: "`ollama launch claude` abre un selector de modelo. Con `--model nombre` se indica el modelo directamente.",
    },
    {
      question: "Exportaste ANTHROPIC_BASE_URL con export y cerraste Claude Code. Al ejecutar `claude` de nuevo, ¿con qué modelo hablas?",
      options: [
        "Con uno de Anthropic, siempre",
        "Con Ollama, porque la variable sigue activa en esa terminal",
        "Con ninguno",
        "Con el modelo que usaste por última vez en la web",
      ],
      correctIndex: 1,
      explanation: "Las variables exportadas siguen activas en esa terminal. Hay que borrarlas con unset o cerrar la terminal. Escribirlas antes del comando evita el problema.",
    },
    {
      question: "¿Qué comandos usas para comprobar a qué modelo y cuenta estás conectado dentro de Claude Code?",
      options: ["/clear y /compact", "/model y /status", "/usage y /cost", "/rename y /resume"],
      correctIndex: 1,
      explanation: "`/model` muestra el modelo activo y `/status` el modelo, la cuenta y la conexión.",
    },
    {
      question: "Con una credencial de pasarela como ANTHROPIC_AUTH_TOKEN activa, ¿qué ocurre con los límites de tu suscripción?",
      options: [
        "Se aplican igual",
        "No se aplican a esas peticiones, porque no usan el inicio de sesión de tu suscripción",
        "Se duplican",
        "Se pierden para siempre",
      ],
      correctIndex: 1,
      explanation: "La documentación indica que, mientras una credencial de pasarela está activa, las peticiones llevan esa credencial y los límites de la suscripción no se aplican.",
    },
    {
      question: "¿Cuál es una limitación documentada de la API compatible de Ollama?",
      options: [
        "No admite mensajes",
        "No admite respuestas por streaming",
        "Los controles de elección de herramienta, las herramientas diferidas y la búsqueda web alojada no están totalmente soportados",
        "Solo admite imágenes",
      ],
      correctIndex: 2,
      explanation: "Ollama soporta un subconjunto de la API de mensajes. Admite mensajes, streaming y llamadas a funciones, pero no todas las funciones de Claude Code.",
    },
  ],
};
