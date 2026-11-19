import type { Lesson } from "@/lib/types";

// Día 2 · Clases 5, 7, 8 y 9 de la transcripción, más el artículo 6 (temas puntuales).
// Contenido verificado en noviembre de 2026.
export const day02: Lesson = {
  day: 2,
  slug: "instalacion-precios-y-vscode",
  title: "Instalación, precios y Claude Code en VS Code",
  section: "Instalación y consumo de tokens",
  estimatedMinutes: 55,
  icon: "⚙️",
  objectives: [
    "Instalar Claude Code con el instalador nativo, comprobar la versión y autenticarte con tu cuenta.",
    "Iniciar una sesión dentro de la carpeta de un proyecto y cambiar de modelo con `/model`, incluido el alias `opusplan`.",
    "Leer una tabla de precios por millón de tokens y distinguir entrada, salida, escritura de caché y lectura de caché.",
    "Consultar tu consumo con `/usage` y con la página de uso de tu cuenta, y entender qué son los créditos de uso adicionales.",
    "Configurar Claude Code en VS Code para que abra la terminal y conectar la CLI al editor con `/ide`.",
  ],
  blocks: [
    {
      type: "paragraph",
      text: "Claude Code se puede instalar en un minuto, pero gran parte de su fama viene de lo rápido que consume tokens. Esta lección instala la herramienta, la prueba por primera vez y enseña a leer lo que cuesta cada modelo y cada tipo de token. Al final la deja integrada con VS Code, sin cambiar el modo de trabajo del curso, que es la terminal.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "1", label: "Comando para instalar con el instalador nativo" },
        { value: "3", label: "Alias de modelo principales: opus, sonnet y haiku" },
        { value: "5x", label: "Precio de la salida frente a la entrada en los modelos 5.5" },
        { value: "0,05x", label: "Precio de leer caché frente a la entrada en Opus 5.5 y Sonnet 5.5" },
        { value: "/usage", label: "Comando que muestra el consumo de la sesión y del plan" },
        { value: "1.94.0", label: "Versión mínima de VS Code para la extensión" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text: "Contenido verificado en noviembre de 2026 contra la documentación oficial de Claude Code y la página de precios de la plataforma. Los modelos y sus precios cambian con frecuencia: la tabla de esta lección es una foto de esa fecha y siempre manda la documentación vigente.",
    },
    { type: "heading", level: 2, text: "Qué cubre esta sección" },
    {
      type: "paragraph",
      text: "La sección tiene dos temas. El primero es instalar Claude Code para usarlo en la terminal y, después, configurarlo en VS Code para que se comporte igual. El segundo es controlar el consumo de tokens: por qué una consulta puede gastar miles de tokens, cómo crece el contexto y qué técnicas lo reducen. Hoy se ve la instalación, los precios y el editor. El contexto y las técnicas de ahorro se ven en el Día 3.",
    },
    {
      type: "callout",
      variant: "info",
      text: "Si quieres empezar a usar la herramienta ya, puedes saltarte los videos de tokens después de instalar. Conviene volver cuando alcances el límite de tu plan, y lo ideal es verlos antes. Dos ideas para llevarte desde ya: entender cómo se envía el contexto al modelo y recordar que los tokens de salida cuestan bastante más que los de entrada.",
    },
    { type: "heading", level: 2, text: "Instalar Claude Code" },
    {
      type: "paragraph",
      text: "La documentación recomienda el instalador nativo. Se copia el comando de tu sistema operativo, se pega en la terminal y se espera: el instalador no muestra progreso mientras descarga. Al terminar, abre una terminal nueva para que el sistema vea el comando `claude`.",
    },
    {
      type: "image",
      src: "/img/dia-02/flujo-instalacion.svg",
      alt: "Cuatro pasos en fila: instalar con el instalador nativo, comprobar con claude --version, autenticar con claude auth login y empezar dentro de la carpeta del proyecto con el comando claude.",
      caption: "Flujo de instalación y primera consulta.",
    },
    {
      type: "tabs",
      title: "Comando de instalación según el sistema",
      tabs: [
        { label: "macOS, Linux y WSL", lang: "bash", code: "curl -fsSL https://claude.ai/install.sh | bash" },
        { label: "Windows PowerShell", lang: "text", code: "irm https://claude.ai/install.ps1 | iex" },
        { label: "Windows CMD", lang: "text", code: "curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd" },
      ],
    },
    {
      type: "paragraph",
      text: "Homebrew (`brew install --cask claude-code`) y WinGet (`winget install Anthropic.ClaudeCode`) también funcionan, pero no se actualizan solos y Claude Code cambia con mucha frecuencia. El instalador nativo se actualiza en segundo plano. Con Homebrew hay que ejecutar `brew upgrade claude-code`, y con WinGet `winget upgrade Anthropic.ClaudeCode`.",
    },
    {
      type: "callout",
      variant: "warning",
      text: "Si en PowerShell ves el error `The token '&&' is not a valid statement separator`, estás usando el comando de CMD. Si en CMD ves `'irm' is not recognized`, estás usando el de PowerShell. Tu prompt muestra `PS C:\\` en PowerShell y `C:\\` en CMD.",
    },
    {
      type: "paragraph",
      text: "Para confirmar la instalación ejecuta `claude --version`: con que imprima un número de versión seguido de `(Claude Code)` es suficiente, aunque la tuya sea posterior a la que aparezca en otros materiales. Si el sistema dice que el comando no se reconoce, cierra la terminal y ábrela de nuevo. Si persiste, la guía oficial de instalación explica cómo verificar el PATH.",
    },
    { type: "heading", level: 3, text: "Una cuenta de pago es obligatoria" },
    {
      type: "paragraph",
      text: "Claude Code exige una suscripción Pro, Max, Ultra, Team o Enterprise, una cuenta de Claude Console con crédito prepagado o acceso a través de un proveedor de nube compatible. El plan gratuito sirve para el chat y para generar algo de código, pero no incluye Claude Code. Si empiezas, la opción más económica que incluya Claude Code es suficiente para seguir el curso.",
    },
    { type: "heading", level: 3, text: "Trabajar siempre dentro de una carpeta de proyecto" },
    {
      type: "paragraph",
      text: "Claude Code lee y modifica los archivos de la carpeta donde lo inicias. Por eso conviene crear una carpeta por ejercicio y arrancarlo siempre ahí, nunca en tu carpeta personal ni en la raíz del disco. Una convención sencilla: una carpeta general, por ejemplo `ClaudeCode`, y dentro una carpeta numerada por ejercicio, como `01-first-code`.",
    },
    { type: "heading", level: 3, text: "Autenticarse y primera consulta" },
    {
      type: "paragraph",
      text: "El comando `claude auth login` abre el navegador para que autorices el acceso a tu cuenta. Lee con atención lo que se solicita antes de autorizar. Si el navegador no se abre, copia el enlace que muestra la terminal y ábrelo a mano. También puedes ejecutar `claude` directamente y seguir los pasos de inicio de sesión, o escribir `/login` dentro de una sesión para cambiar de cuenta. Con `claude auth status` se comprueba el estado de la autenticación.",
    },
    {
      type: "paragraph",
      text: "Después, dentro de la carpeta del proyecto, ejecuta `claude`. Claude Code es un arnés (harness): un envoltorio de los modelos de Anthropic con herramientas para leer, editar y ejecutar. Una consulta mínima como `ping` confirma que todo funciona.",
    },
    { type: "heading", level: 3, text: "Elegir modelo con /model" },
    {
      type: "paragraph",
      text: "Dentro de la sesión, `/model` abre un selector con los modelos disponibles. Puede que veas modelos más nuevos que los de esta lección, y es lo normal. También se puede escribir el alias directamente, por ejemplo `/model sonnet`. El alias `opusplan` es un modo híbrido: usa Opus mientras planificas (modo plan) y cambia a Sonnet para ejecutar. Así se razona con el modelo más capaz y se ejecuta con uno más económico.",
    },
    {
      type: "image",
      src: "/img/dia-02/familias-de-modelos.svg",
      alt: "Tres tarjetas con las familias de modelos: Opus 5.5 con entrada de 4 y salida de 20 dólares por millón de tokens, Sonnet 5.5 con 2 y 10, y Haiku 5.5 con 0,10 y 0,50. Debajo, el modo opusplan con Opus en el plan y Sonnet en la ejecución.",
      caption: "Familias de modelos con sus alias y precios por millón de tokens, noviembre 2026.",
    },
    {
      type: "callout",
      variant: "info",
      text: "Cambiar de modelo a mitad de una conversación tiene un costo: cada modelo tiene su propia caché, así que el siguiente mensaje relee todo el historial sin aciertos de caché. Elige el modelo al empezar la sesión. El Día 3 amplía esta idea.",
    },
    { type: "heading", level: 2, text: "Modelos y precios" },
    {
      type: "paragraph",
      text: "Las familias se distinguen por capacidad y precio. Opus es el modelo de mayor capacidad para tareas pesadas y de razonamiento complejo. Sonnet equilibra calidad y precio y es el de uso diario. Haiku es rápido y barato y se reserva para tareas sencillas, como leer un documento o generar algo simple. Además existe Fable, el modelo más capaz en Claude Code, que se elige de forma explícita con `/model fable`. Los modelos Mythos tienen disponibilidad limitada.",
    },
    {
      type: "table",
      caption: "Precios por millón de tokens en USD (API de Anthropic, noviembre 2026)",
      headers: ["Modelo", "Entrada base", "Escritura de caché 5 min", "Escritura de caché 1 h", "Lectura de caché", "Salida"],
      rows: [
        ["Fable 5.2", "8", "10", "16", "0,20", "40"],
        ["Opus 5.5", "4", "5", "8", "0,20", "20"],
        ["Sonnet 5.5", "2", "2,50", "4", "0,10", "10"],
        ["Haiku 5.5 (prompts de hasta 100 000 tokens)", "0,10", "0,125", "0,20", "0,01", "0,50"],
      ],
    },
    { type: "heading", level: 3, text: "Cómo leer la tabla" },
    {
      type: "list",
      items: [
        "Entrada base: lo que envías al modelo, es decir, tu mensaje, los archivos que lee y el historial de la conversación.",
        "Salida: lo que el modelo responde. En los modelos de la tabla cuesta cinco veces más que la entrada, así que reducir la salida ahorra más que reducir la entrada.",
        "Escritura de caché: guardar un fragmento que se repite en cada mensaje cuesta algo más que enviarlo normal: 1,25 veces la entrada para la caché de 5 minutos y 2 veces para la de 1 hora.",
        "Lectura de caché: releer ese fragmento ya guardado cuesta una fracción: 0,1 veces la entrada en la mayoría de los modelos y 0,05 veces en Opus 5.5 y Sonnet 5.5.",
      ],
    },
    {
      type: "image",
      src: "/img/dia-02/costo-por-tipo-de-token.svg",
      alt: "Gráfico de barras horizontales con el precio por millón de tokens en Sonnet 5.5: lectura de caché 0,10, entrada base 2,00, escritura de caché de 5 minutos 2,50, escritura de caché de 1 hora 4,00 y salida 10,00.",
      caption: "Costo relativo de cada tipo de token en Sonnet 5.5. Leer caché es la opción más barata y la salida la más cara.",
    },
    {
      type: "paragraph",
      text: "Escribir en caché es más caro que enviar el texto normal, pero cada lectura posterior es mucho más barata. Si un contexto grande se repite en muchos mensajes, guardarlo en caché ahorra dinero. Claude Code gestiona esa caché por ti, y por eso los hábitos que la invalidan, como cambiar de modelo, tienen un costo visible.",
    },
    {
      type: "paragraph",
      text: "Un token es un fragmento de texto, no una palabra exacta. Con los modelos anteriores a la versión 4.7, un token equivale a unos 3,5 caracteres en inglés. Desde la 4.7, el tokenizador produce alrededor de un 30 por ciento más de tokens para el mismo texto. No existe forma de saber de antemano cuántos tokens usará una consulta concreta: para contarlos con exactitud se usa el conteo de tokens de la API con el modelo elegido.",
    },
    { type: "heading", level: 3, text: "Ver cuánto estás consumiendo" },
    {
      type: "list",
      items: [
        "`/usage` muestra el consumo de la sesión y, si tienes suscripción, las barras de uso de tu plan, las estadísticas y el desglose. Usa las flechas del teclado para moverte entre pestañas.",
        "`/clear` vacía el contexto y empieza una conversación nueva. Los totales de la sesión vuelven a cero.",
        "La página de uso de tu cuenta de Claude, en Configuración, muestra el uso del plan con más detalle visual.",
        "`/usage-credits` abre la gestión de los créditos de uso adicionales, si los tienes.",
      ],
    },
    {
      type: "callout",
      variant: "warning",
      text: "Los créditos de uso adicionales permiten seguir trabajando cuando agotas el límite del plan, pero se facturan aparte y es fácil descontrolarlos. Si los activas, define un límite mensual de gasto. Compara también el costo del plan superior con lo que gastarías en créditos antes de decidir.",
    },
    {
      type: "paragraph",
      text: "Si tienes suscripción Pro, Max o Ultra, la cifra de costo de la sesión en `/usage` no es relevante para tu factura: tu consumo está incluido en el plan y lo que importa son las barras de uso. La cifra en dólares es una estimación pensada para quien paga por token con una clave de API.",
    },
    { type: "heading", level: 2, text: "Claude Code en VS Code" },
    {
      type: "paragraph",
      text: "La extensión se instala desde el enlace de la documentación o desde la vista de extensiones del editor, y funciona también en Cursor. Al abrir un archivo aparece el icono de chispa en la barra del editor. También puedes abrirla desde la paleta de comandos escribiendo Claude Code. La primera vez te pide autenticarte. Si no responde a un mensaje, escribe `/login`, elige tu suscripción de Claude y autoriza en el navegador.",
    },
    {
      type: "paragraph",
      text: "Por defecto la extensión abre un panel gráfico. Si prefieres el estilo de la terminal, abre los ajustes (Cmd+, en Mac o Ctrl+, en Windows y Linux), ve a Extensions, Claude Code y activa Use Terminal. A partir de ahí, el icono lanza la CLI dentro del editor y cada clic abre una instancia nueva, como cuando abres varias ventanas de terminal.",
    },
    {
      type: "image",
      src: "/img/dia-02/vscode-panel-o-terminal.svg",
      alt: "Tres columnas: el panel gráfico predeterminado, el ajuste Use Terminal que abre la CLI con el icono y la terminal integrada con el comando claude y la conexión del editor con /ide.",
      caption: "Tres formas de usar Claude Code dentro de VS Code.",
    },
    { type: "heading", level: 3, text: "Conectar la CLI con el editor: /ide" },
    {
      type: "paragraph",
      text: "Con la terminal integrada del editor (Cmd+` en Mac o Ctrl+` en Windows y Linux) puedes ejecutar `claude` como en cualquier terminal. Si la extensión está instalada, la CLI se conecta sola. Si trabajas desde una terminal externa, ejecuta `/ide` y elige VS Code. Una vez conectada, Claude ve la selección del editor: al seleccionar líneas, la terminal muestra cuántas están seleccionadas y puedes pedir cambios sobre ellas.",
    },
    {
      type: "callout",
      variant: "info",
      text: "Si conectas una segunda terminal y la primera deja de mostrar la selección, vuelve a ejecutar `/ide` en la que quieras usar. Lo más sencillo es trabajar con una sola terminal conectada a la vez.",
    },
    {
      type: "paragraph",
      text: "Cuando Claude propone un cambio, te muestra los cambios y te pregunta si los aplica. Puedes aceptar uno por uno o permitir todos los cambios similares durante la sesión. Una sesión es cada instancia de Claude Code que tienes abierta, y otra instancia es otra sesión. El ajuste `autosave` de la extensión, activado por defecto, guarda los archivos antes de que Claude los lea o los edite. Con la terminal de Warp u otra externa, guarda tus cambios antes de pedirle uno nuevo para no pisar nada.",
    },
    {
      type: "table",
      caption: "Extensión de VS Code frente a la CLI",
      headers: ["Función", "CLI", "Extensión de VS Code"],
      rows: [
        ["Comandos y skills", "Todos", "Un subconjunto: escribe `/` para ver los disponibles"],
        ["Configuración de servidores MCP", "Sí", "Sí, con `/mcp` en el panel"],
        ["Puntos de control (checkpoints)", "Sí", "Sí"],
        ["Atajo `!` para comandos de shell", "Sí", "No"],
        ["Autocompletado con tabulador", "Sí", "No"],
      ],
    },
    {
      type: "paragraph",
      text: "La extensión y la CLI comparten el historial: para continuar en la CLI una conversación iniciada en la extensión, ejecuta `claude --resume`. Instalar la extensión no agrega el comando `claude` a tu terminal: la extensión incluye su propia copia para el panel, y para usar el comando necesitas la instalación independiente que hiciste al principio.",
    },
    { type: "heading", level: 2, text: "Ejercicios guiados y experimentos" },
    {
      type: "paragraph",
      text: "Los ejercicios se hacen en tu equipo y suponen que ya instalaste las herramientas del Día 1. Los editores de código verifican en el navegador los cálculos de costo y de tokens de la lección.",
    },
    {
      type: "exercise",
      title: "Ejercicio 1: instalar Claude Code",
      description: "Instala con el instalador nativo. El comando depende de tu sistema; las otras variantes están en la pestaña de la sección de instalación.",
      steps: [
        {
          instruction: "En macOS, Linux o WSL pega el comando en la terminal. El instalador no muestra progreso mientras descarga, así que espera a que termine.",
          command: "curl -fsSL https://claude.ai/install.sh | bash",
          expected: "(sin barra de progreso mientras descarga)\nAl terminar vuelve el prompt de la terminal.",
        },
        {
          instruction: "Cierra la terminal y abre una nueva para que el sistema reconozca el comando.",
        },
      ],
      verify: "El prompt vuelve sin mensajes de error. Si ves `syntax error near unexpected token '<'` o un error 403, consulta la guía de solución de problemas de instalación.",
    },
    {
      type: "exercise",
      title: "Ejercicio 2: comprobar la versión instalada",
      description: "Confirma que el comando `claude` responde.",
      steps: [
        {
          instruction: "Ejecuta el comando en la terminal nueva.",
          command: "claude --version",
          expected: "2.1.286 (Claude Code)\n(el número será el de la versión que instalaste)",
        },
      ],
      verify: "La salida es un número de versión seguido de `(Claude Code)`. Si responde que no encuentra el comando, revisa el PATH con la guía de solución de problemas.",
    },
    {
      type: "exercise",
      title: "Ejercicio 3: crear la carpeta de trabajo",
      description: "Crea una carpeta general y una subcarpeta numerada para tu primer experimento. Funciona en macOS, Linux y WSL.",
      steps: [
        {
          instruction: "Crea las carpetas, entra a la del ejercicio y muestra su ruta.",
          command: "mkdir -p ~/ClaudeCode/01-first-code && cd ~/ClaudeCode/01-first-code && pwd",
          expected: "/Users/tu-usuario/ClaudeCode/01-first-code\n(en Linux la ruta empieza por /home/tu-usuario)",
        },
      ],
      verify: "La última línea termina en `/ClaudeCode/01-first-code`. A partir de ahora inicia Claude Code siempre desde una carpeta como esta.",
    },
    {
      type: "exercise",
      title: "Ejercicio 4: autenticarte y comprobar la sesión",
      description: "Conecta Claude Code con tu cuenta y verifica el estado sin abrir una sesión.",
      steps: [
        {
          instruction: "Inicia el inicio de sesión. Se abre el navegador: lee lo que solicita y autoriza.",
          command: "claude auth login",
        },
        {
          instruction: "Comprueba el estado. El comando imprime JSON, con un campo `authMethod` que indica cómo iniciaste sesión. Añade `--text` si prefieres una salida legible.",
          command: "claude auth status",
          expected: "{ ... \"authMethod\": \"claude.ai\" ... }\n(el JSON incluye más campos, como configDirectory)",
        },
        {
          instruction: "Comprueba el código de salida. Con una sesión iniciada debe ser 0.",
          command: "claude auth status > /dev/null; echo $?",
          expected: "0",
        },
      ],
      verify: "El código de salida es 0. Con una cuenta no autenticada el comando termina con el código 1.",
    },
    {
      type: "exercise",
      title: "Ejercicio 5: primera consulta",
      description: "Abre una sesión en tu carpeta de trabajo y envía el mensaje más corto posible.",
      steps: [
        {
          instruction: "Desde la carpeta del ejercicio anterior, inicia Claude Code.",
          command: "claude",
          expected: "Se abre la sesión interactiva con la versión, el modelo actual y el directorio de trabajo sobre el prompt.",
        },
        {
          instruction: "Escribe el mensaje y pulsa Enter.",
          command: "ping",
          expected: "Una respuesta breve de Claude. El texto exacto varía en cada ejecución.",
        },
      ],
      verify: "Recibes una respuesta. Si te pide iniciar sesión, escribe `/login` y repite el ejercicio 4.",
    },
    {
      type: "exercise",
      title: "Ejercicio 6: cambiar de modelo",
      description: "Mira los modelos disponibles y activa el modo híbrido. Hazlo al empezar una sesión, no a mitad de una tarea.",
      steps: [
        {
          instruction: "Dentro de la sesión abre el selector. Muévete con las flechas del teclado sin cambiar nada y sal con Esc.",
          command: "/model",
          expected: "Un selector con los modelos disponibles para tu cuenta y marca en el actual.",
        },
        {
          instruction: "Activa Opus para planificar y Sonnet para ejecutar.",
          command: "/model opusplan",
          expected: "Un mensaje que confirma el modelo elegido.",
        },
      ],
      verify: "Vuelve a ejecutar `/model` y comprueba que la opción activa es la que elegiste. Los modelos y su orden dependen de tu plan.",
    },
    {
      type: "exercise",
      title: "Ejercicio 7: medir el consumo",
      description: "Consulta cuánto llevas gastado y vacía el contexto.",
      steps: [
        {
          instruction: "Abre el panel de uso. Navega por las pestañas con las flechas del teclado.",
          command: "/usage",
          expected: "El panel de uso con las barras de tu plan, el estado y las estadísticas. Con clave de API muestra el costo estimado de la sesión.",
        },
        {
          instruction: "Vacía el contexto y empieza de cero.",
          command: "/clear",
          expected: "Una conversación nueva y vacía. Los totales de la sesión vuelven a cero.",
        },
      ],
      verify: "Al volver a abrir `/usage` después de `/clear`, el total de la sesión empieza otra vez en cero.",
    },
    {
      type: "exercise",
      title: "Ejercicio 8: abrir Claude Code como terminal en VS Code",
      description: "Instala la extensión y cambia su comportamiento para que el icono lance la CLI.",
      steps: [
        {
          instruction: "Abre la carpeta del ejercicio en VS Code y crea un archivo `index.html` vacío. El icono de chispa aparece en la barra del editor.",
        },
        {
          instruction: "Abre los ajustes con Cmd+, (Mac) o Ctrl+, (Windows y Linux), ve a Extensions, Claude Code y activa Use Terminal.",
        },
        {
          instruction: "Pulsa el icono de chispa. Pulsa otra vez para crear una segunda instancia.",
          expected: "Se abre un terminal dentro del editor con Claude Code ya iniciado, en lugar del panel gráfico.",
        },
      ],
      verify: "Cada clic abre una instancia nueva de la CLI. Para volver al panel gráfico, desactiva Use Terminal.",
    },
    {
      type: "exercise",
      title: "Ejercicio 9: conectar la terminal al editor con /ide",
      description: "Comprueba que Claude ve las líneas que seleccionas en VS Code.",
      steps: [
        {
          instruction: "En el archivo `index.html` escribe dos líneas de texto. Abre la terminal integrada con Cmd+` (Mac) o Ctrl+` (Windows y Linux) e inicia Claude Code.",
          command: "claude",
        },
        {
          instruction: "Si la CLI no se conectó sola, ejecútalo y elige VS Code.",
          command: "/ide",
          expected: "Una lista de editores disponibles. Elige VS Code.",
        },
        {
          instruction: "Selecciona las dos líneas del archivo y vuelve a la terminal.",
          expected: "Debajo del prompt aparece un aviso con el número de líneas seleccionadas.",
        },
      ],
      verify: "Escribe un mensaje que haga referencia a la selección. Claude la usa como contexto sin que copies el texto.",
    },
    {
      type: "playground",
      title: "Experimento 10: costo de una misma consulta en cada modelo",
      description: "Calcula el costo en USD de una consulta de 20 000 tokens de entrada y 2 000 de salida, sin caché, con los precios de la tabla. Cambia los tokens y vuelve a ejecutar.",
      code: "const precios = {\n  opus: { entrada: 4, salida: 20, lectura: 0.2 },\n  sonnet: { entrada: 2, salida: 10, lectura: 0.1 },\n  haiku: { entrada: 0.1, salida: 0.5, lectura: 0.01 },\n};\n\nfunction costo(modelo, t) {\n  const p = precios[modelo];\n  const total = t.entrada * p.entrada + t.salida * p.salida + t.cache * p.lectura;\n  return total / 1000000;\n}\n\nconst consulta = { entrada: 20000, salida: 2000, cache: 0 };\nfor (const m of Object.keys(precios)) {\n  console.log(m + \": USD \" + costo(m, consulta).toFixed(4));\n}",
      expected: "opus: USD 0.1200\nsonnet: USD 0.0600\nhaiku: USD 0.0030",
    },
    {
      type: "playground",
      title: "Experimento 11: lo que ahorra la caché",
      description: "Un contexto de 100 000 tokens se envía en 10 mensajes seguidos con Sonnet 5.5. Sin caché se paga la entrada base cada vez. Con caché se paga una escritura de 5 minutos y nueve lecturas.",
      code: "const tokens = 100000;\nconst veces = 10;\nconst entrada = 2;\nconst escritura = 2.5;\nconst lectura = 0.1;\n\nconst sinCache = (tokens * entrada * veces) / 1000000;\nconst conCache = (tokens * escritura + tokens * lectura * (veces - 1)) / 1000000;\n\nconsole.log(\"sin cache: \" + sinCache.toFixed(2));\nconsole.log(\"con cache: \" + conCache.toFixed(2));",
      expected: "sin cache: 2.00\ncon cache: 0.34",
    },
    {
      type: "playground",
      title: "Experimento 12: cuánto más caro es generar que leer",
      description: "Calcula la relación entre el precio de salida y el de entrada de cada modelo de la tabla.",
      code: "const precios = {\n  opus: { entrada: 4, salida: 20 },\n  sonnet: { entrada: 2, salida: 10 },\n  haiku: { entrada: 0.1, salida: 0.5 },\n};\n\nfor (const [modelo, p] of Object.entries(precios)) {\n  console.log(modelo + \": \" + p.salida / p.entrada + \"x\");\n}",
      expected: "opus: 5x\nsonnet: 5x\nhaiku: 5x",
    },
    {
      type: "playground",
      title: "Experimento 13: estimar tokens por caracteres",
      description: "Con los modelos anteriores a la 4.7 un token equivale a unos 3,5 caracteres en inglés. Desde la 4.7 el tokenizador genera alrededor de un 30 por ciento más tokens. La estimación es orientativa: para contar con exactitud usa el conteo de tokens de la API.",
      code: "const caracteres = 7000;\nconst anterior = Math.round(caracteres / 3.5);\nconst nuevo = Math.round(anterior * 1.3);\n\nconsole.log(\"tokenizador anterior: \" + anterior);\nconsole.log(\"tokenizador nuevo: \" + nuevo);",
      expected: "tokenizador anterior: 2000\ntokenizador nuevo: 2600",
    },
    { type: "heading", level: 2, text: "¿Qué usar en cada caso?" },
    {
      type: "table",
      headers: ["Si necesitas...", "Usa...", "Motivo"],
      rows: [
        ["Razonar sobre una arquitectura o un fallo complejo", "`opus` o `/model fable`", "Más capacidad, a mayor precio."],
        ["Programar a diario con buen equilibrio", "`sonnet`", "Calidad alta con la mitad de precio que Opus 5.5."],
        ["Leer un documento o generar algo simple", "`haiku`", "Es el más rápido y barato."],
        ["Planificar con el mejor modelo y ejecutar barato", "`opusplan`", "Opus solo en modo plan, Sonnet para ejecutar."],
        ["Mantener actualizado Claude Code sin esfuerzo", "El instalador nativo", "Se actualiza solo en segundo plano."],
        ["Ver el consumo del plan", "`/usage`", "Muestra barras de uso, estado y estadísticas."],
        ["Seguir trabajando tras agotar el límite del plan", "Créditos de uso adicionales con límite", "Se facturan aparte: define un tope mensual."],
        ["Que el icono del editor abra la terminal", "Ajuste Use Terminal", "Cada clic abre una instancia nueva."],
      ],
    },
    { type: "heading", level: 2, text: "Datos que suelen aparecer desactualizados" },
    {
      type: "table",
      headers: ["Suele decirse", "Información verificada (noviembre 2026)"],
      rows: [
        ["El mejor modelo es el 4.6 y los siguientes serán el 4.7 o el 5.", "Con la API de Anthropic, los alias resuelven hoy a Opus 5.5, Sonnet 5.5 y Haiku 5.5. Fable 5.2 es el modelo más capaz en Claude Code y se elige explícitamente. Mythos tiene disponibilidad limitada."],
        ["Sonnet cuesta 3 dólares por millón de tokens de entrada y la salida de Opus 25.", "Opus 5.5 cuesta 4 de entrada y 20 de salida. Sonnet 5.5, 2 y 10. Haiku 5.5, 0,10 y 0,50 hasta 100 000 tokens de prompt. Los precios de la API se publican en USD."],
        ["Un token es aproximadamente tres cuartos de una palabra.", "Es un fragmento de texto: unos 3,5 caracteres en inglés con los modelos anteriores a la 4.7. Desde la 4.7 el tokenizador produce cerca de un 30 por ciento más tokens para el mismo texto."],
        ["El modo Opus plan se configura con una opción especial.", "Es el alias `opusplan`: usa Opus en modo plan y Sonnet para ejecutar."],
        ["La extensión no tiene las funciones de la terminal.", "Tiene un subconjunto de comandos y no incluye el atajo `!` ni el autocompletado con tabulador. Sí admite servidores MCP con `/mcp` y puntos de control."],
        ["Instalar la extensión permite usar `claude` en cualquier terminal.", "No. Instalar la extensión no agrega `claude` al PATH. Para usarlo en la terminal hace falta la instalación independiente."],
        ["El uso extra se activa desde los ajustes de la cuenta.", "Se llama créditos de uso. Se gestionan con `/usage-credits` o en la página de uso de la cuenta. Se facturan aparte y conviene fijar un límite mensual."],
        ["Los planes son Pro, Max y Enterprise.", "La documentación incluye Pro, Max, Ultra, Team y Enterprise. El plan gratuito no incluye Claude Code."],
      ],
    },
    { type: "heading", level: 2, text: "Preguntas frecuentes" },
    {
      type: "accordion",
      items: [
        {
          title: "¿Por qué recomiendan el instalador nativo y no Homebrew o WinGet?",
          text: "Porque se actualiza solo en segundo plano. Con Homebrew y WinGet hay que actualizar a mano y Claude Code se publica con mucha frecuencia. Homebrew ofrece dos paquetes: `claude-code`, que sigue el canal estable (suele ir una semana por detrás), y `claude-code@latest`.",
        },
        {
          title: "`claude --version` no responde después de instalar. ¿Qué hago?",
          text: "Cierra la terminal y abre una nueva. Si persiste, el directorio de instalación no está en tu PATH: la guía de solución de problemas de instalación explica cómo comprobarlo según tu sistema.",
        },
        {
          title: "¿En qué carpeta debo iniciar `claude`?",
          text: "En la carpeta del proyecto en el que vas a trabajar. Claude Code trabaja sobre los archivos de esa carpeta, así que no lo inicies en tu carpeta personal ni en la raíz. En el curso se usa una carpeta numerada por ejercicio.",
        },
        {
          title: "¿Por qué los tokens de salida cuestan más?",
          text: "Generar texto exige más cómputo que leerlo. En los modelos de la tabla la salida cuesta cinco veces la entrada, por eso las técnicas para pedir respuestas más cortas ahorran proporcionalmente más.",
        },
        {
          title: "¿Cambiar de modelo a mitad de sesión cuesta más?",
          text: "Sí. Cada modelo tiene su propia caché, así que tras cambiar de modelo el siguiente mensaje relee todo el historial sin aciertos de caché. Elige el modelo al empezar la sesión y evita cambiarlo en medio de una tarea.",
        },
        {
          title: "¿Qué son los créditos de uso adicionales y cómo evito sorpresas en la factura?",
          text: "Son un consumo que se factura aparte cuando agotas el límite de tu plan. Actívalos solo si los necesitas y fija un límite mensual de gasto. Se gestionan con `/usage-credits` o en la configuración de uso de tu cuenta.",
        },
      ],
    },
    { type: "heading", level: 2, text: "Qué sigue" },
    {
      type: "paragraph",
      text: "El Día 3 explica por qué crece el contexto, por qué las conversaciones largas cuestan más y qué técnicas oficiales y prácticas reducen el consumo de tokens, incluidos los comandos para gestionar costos y las configuraciones personales. Es la parte que más te ayudará a no agotar tu cuota.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 3, verifica que puedes explicar...",
      items: [
        "Por qué se recomienda el instalador nativo y qué ocurre con Homebrew y WinGet.",
        "Cómo iniciar sesión con `claude auth login` y cómo comprobar el estado con `claude auth status`.",
        "Por qué se inicia `claude` dentro de la carpeta de un proyecto.",
        "Qué hace el alias `opusplan` y qué familia de modelos conviene a cada tipo de tarea.",
        "La diferencia entre entrada, salida, escritura de caché y lectura de caché en la tabla de precios.",
        "Para qué sirven `/usage`, `/clear` y los créditos de uso adicionales.",
        "Cómo hacer que el icono de VS Code abra la terminal y cómo conectar la CLI con `/ide`.",
      ],
    },
    { type: "heading", level: 2, text: "Fuentes consultadas (noviembre 2026)" },
    {
      type: "list",
      items: [
        "[Advanced setup: instalación y requisitos](https://code.claude.com/docs/en/setup)",
        "[Quickstart de Claude Code](https://code.claude.com/docs/en/quickstart)",
        "[Referencia de la CLI: claude auth y otros comandos](https://code.claude.com/docs/en/cli-reference)",
        "[Configuración de modelos y alias](https://code.claude.com/docs/en/model-config)",
        "[Gestión de costos y comando de uso](https://code.claude.com/docs/en/costs)",
        "[Cómo usa Claude Code la caché de prompts](https://code.claude.com/docs/en/prompt-caching)",
        "[Claude Code en VS Code: ajustes, CLI y extensión](https://code.claude.com/docs/en/vs-code)",
        "[Autenticación en Claude Code](https://code.claude.com/docs/en/authentication)",
        "[Solución de problemas de instalación e inicio de sesión](https://code.claude.com/docs/en/troubleshoot-install)",
        "[Precios de modelos en la plataforma de Claude](https://platform.claude.com/docs/en/about-claude/pricing)",
        "[Glosario de la plataforma: tokens](https://platform.claude.com/docs/en/about-claude/glossary)",
        "[Planes y precios de Claude](https://claude.com/pricing)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "¿Por qué la documentación recomienda el instalador nativo?",
      options: [
        "Es el único que funciona en Windows",
        "Se actualiza solo en segundo plano, a diferencia de Homebrew y WinGet",
        "Es el único que no necesita internet",
        "Incluye Node.js",
      ],
      correctIndex: 1,
      explanation: "Homebrew y WinGet funcionan, pero requieren actualizar a mano. El instalador nativo se actualiza en segundo plano.",
    },
    {
      question: "¿Qué indica una instalación correcta al ejecutar `claude --version`?",
      options: [
        "Un número de versión seguido de (Claude Code)",
        "El texto OK",
        "Una lista de modelos",
        "La ruta de instalación",
      ],
      correctIndex: 0,
      explanation: "La documentación indica que el comando imprime un número de versión seguido de (Claude Code).",
    },
    {
      question: "¿Por qué conviene iniciar `claude` dentro de una carpeta de proyecto?",
      options: [
        "Porque así Claude Code es más rápido",
        "Porque Claude Code trabaja sobre los archivos de la carpeta donde lo inicias",
        "Porque lo exige la licencia",
        "Porque guarda la factura en esa carpeta",
      ],
      correctIndex: 1,
      explanation: "Claude Code lee y modifica los archivos de la carpeta actual, por eso se usa una carpeta por ejercicio y no el directorio personal ni la raíz.",
    },
    {
      question: "¿Qué hace el alias `opusplan`?",
      options: [
        "Usa Haiku para planificar y Opus para ejecutar",
        "Usa Opus en modo plan y cambia a Sonnet para ejecutar",
        "Usa siempre Opus",
        "Desactiva el modo plan",
      ],
      correctIndex: 1,
      explanation: "Es un modo híbrido: razona con Opus al planificar y ejecuta con Sonnet, que es más económico.",
    },
    {
      question: "En los modelos 5.5 de la tabla, ¿cuántas veces más cuesta la salida que la entrada?",
      options: ["Dos veces", "Tres veces", "Cinco veces", "Diez veces"],
      correctIndex: 2,
      explanation: "Opus 5.5 cobra 4 y 20 dólares, Sonnet 5.5 cobra 2 y 10, y Haiku 5.5 cobra 0,10 y 0,50: en los tres la salida cuesta cinco veces la entrada.",
    },
    {
      question: "Con una caché de 5 minutos, ¿cómo se compara escribir con enviar el texto sin caché?",
      options: [
        "Escribir cuesta menos que la entrada base",
        "Escribir cuesta 1,25 veces la entrada base, pero leer después es mucho más barato",
        "Escribir y leer cuestan igual que la entrada",
        "Escribir es gratis",
      ],
      correctIndex: 1,
      explanation: "La escritura de 5 minutos cuesta 1,25 veces la entrada base. Cada lectura posterior cuesta una fracción, por lo que compensa si el contexto se repite.",
    },
    {
      question: "¿Qué ocurre con la caché al cambiar de modelo a mitad de una conversación?",
      options: [
        "Se conserva intacta",
        "Se duplica",
        "Se pierde para el nuevo modelo y se relee todo el historial sin aciertos",
        "Se transfiere gratis",
      ],
      correctIndex: 2,
      explanation: "Cada modelo tiene su propia caché. Al cambiar, el siguiente mensaje relee todo el historial sin aciertos de caché.",
    },
    {
      question: "¿Qué comando muestra el consumo y las barras de uso de tu plan?",
      options: ["/clear", "/usage", "/login", "/ide"],
      correctIndex: 1,
      explanation: "`/usage` abre el panel de uso. `/clear` vacía el contexto, `/login` cambia de cuenta e `/ide` conecta la terminal con el editor.",
    },
    {
      question: "¿Qué ajuste de la extensión hace que el icono abra la CLI en lugar del panel gráfico?",
      options: ["Use Terminal", "Auto Save", "Preferred Location", "Hide Onboarding"],
      correctIndex: 0,
      explanation: "El ajuste Use Terminal (claudeCode.useTerminal), desactivado por defecto, lanza la CLI dentro del editor.",
    },
    {
      question: "Instalaste la extensión de VS Code y quieres escribir `claude` en cualquier terminal. ¿Qué necesitas?",
      options: [
        "Nada: la extensión agrega el comando al PATH",
        "La instalación independiente de Claude Code",
        "Reiniciar el equipo",
        "Cambiar a Cursor",
      ],
      correctIndex: 1,
      explanation: "La extensión incluye una copia privada de la CLI para su panel, pero no agrega `claude` al PATH. Para usar el comando en una terminal necesitas la instalación independiente.",
    },
  ],
};
