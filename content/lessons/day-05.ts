import type { Lesson } from "@/lib/types";

// Día 5 · Clases 17, 19, 20 y 21 de la transcripción, más el artículo 18 (temas puntuales).
// Contenido verificado en noviembre de 2026.
export const day05: Lesson = {
  day: 5,
  slug: "tour-rewind-y-ciclo-del-agente",
  title: "Tour, rewind y ciclo del agente",
  section: "Fundamentos 101",
  estimatedMinutes: 50,
  icon: "🧭",
  objectives: [
    "Reconocer las piezas de la pantalla de Claude Code y los prefijos del cuadro de mensaje: barra, arroba, signo de exclamación y signo de interrogación.",
    "Cambiar de modo de permisos con Shift+Tab y saber cuándo conviene el modo plan.",
    "Volver a un punto anterior del código y de la conversación con `/rewind` o con Esc dos veces, y conocer sus límites frente a Git.",
    "Describir el ciclo del agente: reunir contexto, actuar, verificar, y dónde intervienen el historial, las herramientas y los hooks.",
    "Hacer una pregunta lateral con `/btw` y mandar una sesión a segundo plano con `/background`.",
  ],
  blocks: [
    {
      type: "paragraph",
      text: "Con la instalación lista y el consumo de tokens bajo control, empieza el trabajo real con Claude Code. Este día recorre la pantalla y sus atajos, enseña a deshacer cambios de varios archivos de una vez con `/rewind` y explica qué ocurre dentro de la herramienta desde que envías un mensaje hasta que recibes la respuesta.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "Esc Esc", label: "Abre el menú de rebobinado con el cuadro de mensaje vacío" },
        { value: "3", label: "Modos que recorre Shift+Tab: manual, aceptar ediciones y plan" },
        { value: "100", label: "Puntos de control con copia de archivos que se conservan por sesión" },
        { value: "3", label: "Fases del ciclo: reunir contexto, actuar y verificar" },
        { value: "/btw", label: "Pregunta lateral que no engrosa la conversación" },
        { value: "Git", label: "Sigue siendo el historial permanente: rewind no lo sustituye" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text: "Contenido verificado en noviembre de 2026 contra las páginas oficiales de puntos de control, modo interactivo, modos de permisos, comandos y funcionamiento de Claude Code. Los atajos y la apariencia de la pantalla cambian entre versiones: si algo difiere en tu equipo, manda la documentación vigente.",
    },
    { type: "heading", level: 2, text: "Qué se verá en esta sección" },
    {
      type: "paragraph",
      text: "La sección de fundamentos tiene un objetivo práctico: aprender a usar Claude Code antes de integrarlo con herramientas más avanzadas. Se empieza por el recorrido de la pantalla y el rebobinado, que permite volver atrás aunque no tengas control de versiones configurado. Después se ve cómo la herramienta explora un código, cómo se le da memoria persistente con CLAUDE.md, cómo se le pasan imágenes y archivos y cómo corrige errores, usa Git e implementa funciones. La sección cierra con un ejercicio sobre una aplicación de asteroides, donde se corrigen errores, se hacen cambios, se añaden funciones y se unen ramas.",
    },
    {
      type: "callout",
      variant: "info",
      text: "El rebobinado y Git no se sustituyen. El rebobinado deshace cambios de la sesión y es muy cómodo cuando Claude modifica muchos archivos a la vez, algo que un simple Ctrl+Z no resuelve. Git guarda el historial permanente. Más adelante harás commits y ramas de forma constante.",
    },
    { type: "heading", level: 2, text: "Recorrido por la pantalla" },
    {
      type: "paragraph",
      text: "Empieza creando una carpeta nueva dentro de tu carpeta general de ejercicios y abre en ella tu editor de código solo para ver los archivos. Después abre una terminal, entra a la carpeta y ejecuta `claude`. Trabajar siempre dentro de una carpeta de proyecto sigue siendo la regla.",
    },
    {
      type: "image",
      src: "/img/dia-05/pantalla-de-claude-code.svg",
      alt: "Esquema de una terminal con Claude Code: una cabecera con versión, modelo, esfuerzo, plan y carpeta; un cuadro de mensaje con las pistas de barra, arroba, exclamación e interrogación; y una barra de estado con el modo de permisos actual.",
      caption: "Piezas de la pantalla de Claude Code. El diseño exacto varía con la versión.",
    },
    {
      type: "paragraph",
      text: "Algunas partes de lo que ves pertenecen a tu terminal y no a Claude Code, como los paneles propios de Warp. Lo que importa está en el centro. La cabecera muestra el nombre y la versión de la herramienta, el modelo activo, el nivel de esfuerzo, tu plan y la carpeta de trabajo. El esfuerzo es una palanca de compromiso: más esfuerzo suele dar mejores resultados y consume más tokens, y menos esfuerzo consume menos y puede rendir peor. Con `/effort` se cambia según la tarea.",
    },
    {
      type: "table",
      caption: "Prefijos y atajos del cuadro de mensaje",
      headers: ["Escribes o pulsas", "Qué hace"],
      rows: [
        ["`?` con el cuadro vacío", "Muestra u oculta el panel de ayuda con los atajos."],
        ["`/` al principio", "Abre la lista de comandos y skills."],
        ["`@`", "Autocompleta la ruta de un archivo o carpeta para mencionarla."],
        ["`!` al principio", "Ejecuta un comando de shell y añade su salida a la sesión."],
        ["`/btw pregunta`", "Hace una pregunta lateral sin añadirla al historial. Se puede usar mientras Claude trabaja."],
        ["`/background` o `/bg`", "Envía la conversación actual a segundo plano y libera la terminal."],
        ["Ctrl+V (o Cmd+V en iTerm2)", "Pega una imagen del portapapeles y la inserta como una referencia numerada."],
        ["Esc", "Detiene a Claude en pleno trabajo. Conserva lo hecho hasta ese punto."],
        ["Esc dos veces", "Con texto escrito, lo borra y lo guarda en el historial. Con el cuadro vacío, abre el rebobinado."],
        ["Shift+Tab", "Cambia el modo de permisos."],
      ],
    },
    {
      type: "paragraph",
      text: "También puedes arrastrar archivos, documentos o imágenes a la terminal, o copiar un archivo y pegarlo, y se incorporan al contexto. Pegar rutas también funciona. La lección sobre entradas multimodales amplía esto en el Día 6.",
    },
    { type: "heading", level: 3, text: "Primer ejercicio: un contador en HTML" },
    {
      type: "paragraph",
      text: "Pídele algo muy simple: un archivo HTML con un contador, sin estilos, lo más sencillo posible. Claude propone crear el archivo y te pregunta si le das permiso. Puedes aceptar una vez o aceptar las ediciones durante toda la sesión. Aparece el consumo de tokens y el tiempo de ejecución. Abre el archivo en el navegador: debe incrementar y decrementar. Revisa siempre lo que modificó.",
    },
    {
      type: "paragraph",
      text: "Después, en la misma conversación, pide un fondo oscuro con texto legible. Claude puede equivocarse al editar, ver el error y corregirlo solo. Como no hay recarga automática, tendrás que refrescar el navegador. Observa que todo lo que escribes, las respuestas y los archivos creados forman parte del contexto de esa conversación.",
    },
    { type: "heading", level: 3, text: "Modos de permisos" },
    {
      type: "paragraph",
      text: "La barra de estado muestra el modo actual. Con Shift+Tab se recorre el ciclo manual, aceptar ediciones y plan. En manual, Claude pregunta antes de editar archivos, ejecutar comandos o acceder a la red. Con aceptar ediciones, edita archivos y usa comandos comunes de archivos sin preguntar, pero sigue pidiendo permiso para el resto. En modo plan solo lee y propone: no modifica nada hasta que lo apruebes. Es el modo adecuado antes de una tarea pesada, porque corregir el plan es mucho más barato que corregir el código que generó una idea equivocada.",
    },
    {
      type: "image",
      src: "/img/dia-05/modos-de-permiso.svg",
      alt: "Tres tarjetas en fila: modo manual, aceptar ediciones y plan, conectadas con flechas y una flecha punteada de vuelta al inicio. Debajo, una nota sobre modos opcionales que pueden aparecer tras plan.",
      caption: "Shift+Tab recorre los modos de permiso. Plan solo lee y propone.",
    },
    {
      type: "callout",
      variant: "info",
      text: "En las versiones recientes el modo automático puede ser el modo de inicio, según tu versión y tu plan, y entonces el ciclo empieza por otro punto: desde el modo automático, la primera pulsación de Shift+Tab lleva al modo manual. Mira siempre la barra de estado antes de escribir una tarea importante.",
    },
    { type: "heading", level: 2, text: "Volver atrás con /rewind" },
    {
      type: "paragraph",
      text: "Claude Code registra un punto de control antes de cada mensaje tuyo que inicia un turno, y guarda copias de los archivos que sus herramientas de edición modifican. Con `/rewind` (alias `/undo` y `/checkpoint`), o pulsando Esc dos veces con el cuadro de mensaje vacío, se abre el menú con los mensajes de la sesión. Eliges uno y después una acción.",
    },
    {
      type: "list",
      items: [
        "Restaurar código y conversación: devuelve ambos al punto elegido.",
        "Restaurar conversación: vuelve a ese mensaje y conserva el código actual.",
        "Restaurar código: deshace los cambios de archivos y conserva la conversación.",
        "Resumir desde aquí: comprime la conversación desde ese mensaje en adelante y libera contexto.",
        "Resumir hasta aquí: comprime la conversación anterior a ese mensaje y conserva lo posterior.",
        "Nada: vuelves a la lista sin cambiar nada.",
      ],
    },
    {
      type: "image",
      src: "/img/dia-05/menu-rewind.svg",
      alt: "A la izquierda, cuatro mensajes con su estado del código: rosado, morado, gris y negro. El tercero está resaltado. A la derecha, el menú con las seis acciones. Debajo, el resultado de restaurar código y conversación en el mensaje tres.",
      caption: "Restaurar en el mensaje 3 deja el código como estaba antes de ese mensaje.",
    },
    {
      type: "paragraph",
      text: "El ejemplo con colores sirve para ver el efecto. Se piden cuatro cambios seguidos de color de fondo: rosado, morado oscuro, gris oscuro y negro. Si abres el rebobinado y eliges el mensaje del gris oscuro con la opción de restaurar código y conversación, la página vuelve al morado, porque el punto de control es el estado anterior a ese mensaje. La conversación conserva los dos primeros mensajes y el texto del tercero vuelve al cuadro para que lo reenvíes o lo edites. Los cambios posteriores, incluido el negro, desaparecen del código y del historial.",
    },
    {
      type: "callout",
      variant: "warning",
      text: "Rebobinar descarta lo posterior. Si quieres conservar una versión que funciona, haz un commit antes de seguir experimentando. Si vaciaste el contexto con `/clear` en esa misma ejecución, el menú de rebobinado ofrece una entrada para reanudar la conversación anterior.",
    },
    {
      type: "table",
      caption: "Lo que el rebobinado no cubre",
      headers: ["Situación", "Qué ocurre"],
      rows: [
        ["Archivos modificados solo por comandos de shell", "No se rastrean. Si Claude ya había editado el archivo con sus herramientas, el rebobinado sí deshace los cambios posteriores del shell. Para el resto, usa Git."],
        ["Ediciones de subagentes", "Normalmente no se restauran, salvo las de una skill en primer plano con contexto bifurcado. Usa Git."],
        ["Cambios que haces tú fuera de Claude Code", "No se capturan, salvo que toquen los mismos archivos de la sesión."],
        ["Archivos con enlaces simbólicos o duros", "Se omiten y se avisa de cuántos."],
        ["Sesiones muy antiguas", "Las copias se limpian pasado un tiempo, unos 30 días por defecto. Restaurar puede fallar."],
      ],
    },
    {
      type: "paragraph",
      text: "Si escribes un nombre con `/rename`, o lo dejas vacío para que Claude lo sugiera, localizarás la sesión sin esfuerzo cuando tengas varias abiertas. Es especialmente útil cuando trabajas con varias instancias a la vez.",
    },
    { type: "heading", level: 2, text: "El ciclo del agente" },
    {
      type: "paragraph",
      text: "Cuando le das una tarea, Claude Code trabaja en un ciclo de tres fases que se mezclan: reunir contexto (buscar y leer), actuar (editar y ejecutar comandos) y verificar (probar). Una pregunta sobre tu código puede necesitar solo la primera. Corregir un error recorre las tres varias veces. Tú también formas parte del ciclo: puedes interrumpir en cualquier momento para dar contexto o cambiar de rumbo.",
    },
    {
      type: "image",
      src: "/img/dia-05/ciclo-del-agente.svg",
      alt: "Cuatro cajas en fila: tu mensaje, contexto con historial y base fija, el modelo, y las herramientas, con una flecha punteada que devuelve el resultado al modelo. Debajo, una nota sobre las tres fases y dos recuadros: respuesta y hooks, y tu papel en el ciclo.",
      caption: "Del mensaje a la respuesta: contexto, modelo y herramientas se alternan hasta terminar.",
    },
    {
      type: "paragraph",
      text: "Paso a paso, con un pedido como \"busca todos los comentarios dentro de `src` y haz un resumen\": primero tu mensaje se prepara en tu equipo: se separa, se agrupan los adjuntos y se añade al historial de la conversación, igual que harías en un chat propio con un arreglo de mensajes. Después se le suma la base fija, es decir, las instrucciones del sistema, el CLAUDE.md, las herramientas y la información de MCP y skills. Todo eso viaja a la API de Anthropic. El modelo responde, y esa respuesta puede pedir llamar a una herramienta: leer archivos o ejecutar un comando. El resultado vuelve al modelo y el ciclo se repite hasta que no quedan más pasos.",
    },
    {
      type: "paragraph",
      text: "Al final se muestra la respuesta. Aquí es donde actúan las técnicas para reducir la salida que viste en el Día 3. Después pueden dispararse los hooks, acciones propias al terminar un turno, como un sonido para saber qué instancia terminó cuando tienes varias, una revisión de código por otro agente o pruebas automáticas. Por último, la sesión queda a la espera de tu siguiente mensaje, que se suma al mismo historial, o de un `/clear` para empezar de cero.",
    },
    {
      type: "callout",
      variant: "info",
      text: "Cuando escribes `src` sin más, solo es un texto: Claude lo interpreta como un directorio, y si hay varios directorios con ese nombre los recorrerá todos o te preguntará en modo plan. Para señalar uno concreto, menciónalo con `@` y su ruta.",
    },
    { type: "heading", level: 2, text: "Ejercicios guiados y experimentos" },
    {
      type: "paragraph",
      text: "Los ejercicios se hacen con Claude Code en tu equipo. Pide cosas pequeñas: cada mensaje consume tokens. Los experimentos de código modelan el rebobinado, el ciclo de modos y las fases del agente, y se verifican en el navegador.",
    },
    {
      type: "exercise",
      title: "Ejercicio 1: preparar una carpeta limpia",
      description: "Una carpeta nueva evita mezclar este ejercicio con el del Día 2. Funciona en macOS, Linux y WSL.",
      steps: [
        {
          instruction: "Crea la carpeta y entra en ella.",
          command: "mkdir -p ~/ClaudeCode/02-tour && cd ~/ClaudeCode/02-tour && pwd",
          expected: "/Users/tu-usuario/ClaudeCode/02-tour\n(en Linux la ruta empieza por /home/tu-usuario)",
        },
        {
          instruction: "Abre la carpeta en tu editor, solo para ver los archivos, e inicia Claude Code.",
          command: "claude",
        },
      ],
      verify: "Ves la pantalla de Claude Code con la carpeta de trabajo en la cabecera.",
    },
    {
      type: "exercise",
      title: "Ejercicio 2: reconocer las piezas de la pantalla",
      description: "Identifica cada parte sin escribir tareas.",
      steps: [
        {
          instruction: "Localiza la cabecera: versión, modelo, nivel de esfuerzo, plan y carpeta.",
        },
        {
          instruction: "Con el cuadro de mensaje vacío, escribe el signo de interrogación.",
          command: "?",
          expected: "Un panel con la lista de atajos de teclado. Vuelve a escribir ? para ocultarlo.",
        },
        {
          instruction: "Abre la lista de comandos con la barra y recórrela con las flechas.",
          command: "/",
          expected: "Una lista de comandos y skills con una descripción breve de cada uno.",
        },
      ],
      verify: "Sabes en qué modelo y con qué esfuerzo estás, y puedes abrir el panel de ayuda cuando lo necesites.",
    },
    {
      type: "exercise",
      title: "Ejercicio 3: crear un contador",
      description: "Tu primera tarea. Hazla con un mensaje corto.",
      steps: [
        {
          instruction: "Envía este mensaje y concede el permiso cuando lo pida.",
          command: "Crea un archivo contador.html con un contador con botones para incrementar y decrementar. Sin estilos, lo más simple posible y que funcione.",
          expected: "Claude propone crear contador.html y pide permiso. Tras aceptar, muestra el archivo creado y el consumo de tokens.",
        },
        {
          instruction: "Abre el archivo en el navegador. En macOS usa el comando de la derecha; en Windows, haz doble clic sobre el archivo.",
          command: "open contador.html",
        },
      ],
      verify: "El contador sube y baja con los botones. Revisa en el editor lo que Claude escribió.",
    },
    {
      type: "exercise",
      title: "Ejercicio 4: recorrer los modos de permisos",
      description: "Observa la barra de estado mientras cambias de modo.",
      steps: [
        {
          instruction: "Con el cuadro de mensaje vacío, pulsa Shift+Tab y mira el texto de la barra de estado. Repite hasta volver al modo inicial.",
          expected: "La barra cambia entre manual, accept edits on y plan mode on, y puede incluir el modo automático según tu versión.",
        },
        {
          instruction: "Entra en modo plan y pide un cambio.",
          command: "Ponle al contador un fondo oscuro y texto legible.",
          expected: "Claude explora y propone un plan, sin editar el archivo todavía.",
        },
        {
          instruction: "Lee el plan, corrígelo si hace falta y apruébalo para que lo ejecute.",
        },
      ],
      verify: "Hasta que no apruebas el plan, el archivo no cambia. Recarga el navegador para ver el fondo oscuro.",
    },
    {
      type: "exercise",
      title: "Ejercicio 5: preparar el camino para el rebobinado",
      description: "Haz cuatro cambios de color seguidos para tener varios puntos de control. Planifica antes de escribir: cada mensaje consume tokens.",
      steps: [
        {
          instruction: "Vacía el contexto y asegúrate de que el modo no es plan.",
          command: "/clear",
        },
        {
          instruction: "Envía cuatro mensajes, uno por uno, recargando el navegador tras cada uno. Para localizar la sesión después, ejecuta /rename tras el segundo, con o sin nombre.",
          command: "Cambia el color de fondo a un rosado claro.",
          expected: "El fondo cambia a rosado. Los otros tres mensajes: morado oscuro, gris oscuro y negro.",
        },
      ],
      verify: "La página termina con fondo negro y la conversación tiene cuatro mensajes de color.",
    },
    {
      type: "exercise",
      title: "Ejercicio 6: rebobinar al punto anterior al gris",
      description: "Predice primero qué color verás: gris, morado o negro.",
      steps: [
        {
          instruction: "Con el cuadro de mensaje vacío, pulsa Esc dos veces, o ejecuta el comando.",
          command: "/rewind",
          expected: "Una lista con los mensajes de la sesión y, bajo cada uno, el número de líneas modificadas.",
        },
        {
          instruction: "Elige el mensaje del gris oscuro y la opción de restaurar el código y la conversación. Recarga el navegador.",
          expected: "La página muestra el fondo morado. El texto del mensaje del gris vuelve al cuadro para reenviarlo.",
        },
        {
          instruction: "Abre otra vez el rebobinado. Comprueba que el mensaje del negro ya no aparece en la lista.",
        },
      ],
      verify: "El color es el que estaba antes del mensaje elegido, no el del mensaje elegido. Los cambios posteriores se perdieron.",
    },
    {
      type: "exercise",
      title: "Ejercicio 7: preguntar sin ensuciar la conversación",
      description: "Una pregunta lateral se contesta con lo que ya hay en el contexto y no entra en el historial.",
      steps: [
        {
          instruction: "Haz una pregunta sobre lo que ya se habló.",
          command: "/btw ¿cómo se llama el archivo que creamos?",
          expected: "Una respuesta breve en un panel superpuesto que desaparece con Espacio, Enter o Esc. No cambia la conversación.",
        },
        {
          instruction: "Ejecuta un comando de shell desde Claude Code. Su salida se añade a la sesión.",
          command: "!ls",
          expected: "contador.html\n(y cualquier otro archivo de la carpeta)",
        },
      ],
      verify: "La pregunta lateral no aparece en la lista del rebobinado. La salida de `!ls` sí queda en el contexto.",
    },
    {
      type: "exercise",
      title: "Ejercicio 8: revisar los cambios y mandar la sesión a segundo plano",
      description: "Dos comandos útiles cuando trabajas con varias sesiones.",
      steps: [
        {
          instruction: "Revisa los cambios del árbol de trabajo, incluidas las ediciones de Claude.",
          command: "/diff",
          expected: "Una vista con los archivos modificados y sus cambios línea por línea.",
        },
        {
          instruction: "Envía la sesión actual a segundo plano para liberar la terminal.",
          command: "/background",
          expected: "La sesión se desacopla y vuelves al prompt de tu shell.",
        },
        {
          instruction: "Mira las sesiones en segundo plano desde tu shell.",
          command: "claude agents",
        },
      ],
      verify: "Ves la sesión en la vista de agentes. Más adelante la usarás para trabajar en paralelo.",
    },
    {
      type: "playground",
      title: "Experimento 9: simular un punto de control",
      description: "Cuatro mensajes con su estado del código. Restaurar en el mensaje k deja el código como estaba antes de ese mensaje, conserva los k-1 anteriores y devuelve el texto del mensaje al cuadro. Cambia el valor de k.",
      code: "const historial = [\n  { prompt: \"fondo rosado\", codigo: \"rosado\" },\n  { prompt: \"fondo morado oscuro\", codigo: \"morado oscuro\" },\n  { prompt: \"fondo gris oscuro\", codigo: \"gris oscuro\" },\n  { prompt: \"fondo negro\", codigo: \"negro\" },\n];\n\nfunction rewind(k) {\n  const antes = historial.slice(0, k - 1);\n  const codigo = antes.length ? antes[antes.length - 1].codigo : \"sin cambios\";\n  return {\n    codigo: codigo,\n    conversacion: antes.map((h) => h.prompt),\n    cuadro: historial[k - 1].prompt,\n  };\n}\n\nconsole.log(JSON.stringify(rewind(3)));\nconsole.log(JSON.stringify(rewind(1)));",
      expected: "{\"codigo\":\"morado oscuro\",\"conversacion\":[\"fondo rosado\",\"fondo morado oscuro\"],\"cuadro\":\"fondo gris oscuro\"}\n{\"codigo\":\"sin cambios\",\"conversacion\":[],\"cuadro\":\"fondo rosado\"}",
    },
    {
      type: "playground",
      title: "Experimento 10: el ciclo de Shift+Tab",
      description: "Con los modos base, cada pulsación avanza al siguiente y, tras plan, vuelve a manual. Con modos opcionales habilitados, la lista de tu versión puede ser más larga.",
      code: "const modos = [\"manual\", \"acceptEdits\", \"plan\"];\nlet actual = 0;\n\nfor (let pulsacion = 1; pulsacion <= 4; pulsacion++) {\n  actual = (actual + 1) % modos.length;\n  console.log(pulsacion + \": \" + modos[actual]);\n}",
      expected: "1: acceptEdits\n2: plan\n3: manual\n4: acceptEdits",
    },
    {
      type: "playground",
      title: "Experimento 11: cuántos pasos pide cada tarea",
      description: "Cada tipo de tarea recorre las fases del ciclo de forma distinta. Cambia las secuencias y observa cómo crece el número de pasos, que es también un número de peticiones.",
      code: "const tareas = {\n  \"pregunta sobre el codigo\": [\"reunir\"],\n  \"corregir un error\": [\"reunir\", \"actuar\", \"verificar\", \"actuar\", \"verificar\"],\n  \"refactorizar\": [\"reunir\", \"actuar\", \"actuar\", \"verificar\", \"verificar\", \"verificar\"],\n};\n\nfor (const [nombre, pasos] of Object.entries(tareas)) {\n  console.log(nombre + \": \" + pasos.length + \" pasos\");\n}",
      expected: "pregunta sobre el codigo: 1 pasos\ncorregir un error: 5 pasos\nrefactorizar: 6 pasos",
    },
    {
      type: "playground",
      title: "Experimento 12: qué incluye cada petición del ciclo",
      description: "En cada vuelta del ciclo se reenvía todo lo anterior. Suma los tokens enviados en una tarea de 4 vueltas, con una base de 7 850 tokens y 1 500 tokens nuevos por vuelta.",
      code: "const base = 7850;\nconst nuevosPorVuelta = 1500;\nlet total = 0;\n\nfor (let vuelta = 1; vuelta <= 4; vuelta++) {\n  const enviados = base + nuevosPorVuelta * vuelta;\n  total += enviados;\n  console.log(\"vuelta \" + vuelta + \": \" + enviados);\n}\nconsole.log(\"total: \" + total);",
      expected: "vuelta 1: 9350\nvuelta 2: 10850\nvuelta 3: 12350\nvuelta 4: 13850\ntotal: 46400",
    },
    { type: "heading", level: 2, text: "¿Qué usar en cada caso?" },
    {
      type: "table",
      headers: ["Si necesitas...", "Usa...", "Nota"],
      rows: [
        ["Deshacer cambios de varios archivos de la sesión", "`/rewind` o Esc dos veces", "Restaura código, conversación o ambos al punto anterior a un mensaje."],
        ["Conservar una versión que funciona", "Un commit de Git", "El rebobinado es por sesión y no es historial permanente."],
        ["Ver el plan antes de que Claude toque el código", "Modo plan con Shift+Tab o `/plan`", "No se modifica nada hasta que lo apruebas."],
        ["Que edite sin preguntar cada vez", "El modo accept edits", "Los comandos de shell siguen pidiendo permiso."],
        ["Recordar qué hacía cada sesión", "`/rename`", "Con tres o más instancias es casi obligatorio."],
        ["Hacer una duda rápida sin gastar historial", "`/btw`", "Responde con lo que ya está en el contexto."],
        ["Liberar la terminal sin parar el trabajo", "`/background`", "Se retoma con `claude agents` o `/resume`."],
        ["Detener a Claude que se desvía", "Esc", "Conserva el trabajo ya hecho."],
        ["Referenciar un directorio concreto", "`@` con su ruta", "Evita que Claude interprete un nombre ambiguo."],
      ],
    },
    { type: "heading", level: 2, text: "Datos que suelen aparecer desactualizados" },
    {
      type: "table",
      headers: ["Suele decirse", "Información verificada (noviembre 2026)"],
      rows: [
        ["El signo & al principio manda una tarea a segundo plano.", "Los medios documentados son el comando `/background` (alias `/bg`) y la flecha izquierda con el cuadro de mensaje vacío. Una exclamación al principio abre el modo shell."],
        ["El modo plan es solo lectura y siempre empieza fuera de él.", "El modo plan solo lee y propone. El modo de inicio depende de tu versión y de tu plan: con las versiones recientes puede ser el automático, y Shift+Tab recorre manual, aceptar ediciones y plan."],
        ["Al rebobinar eliges un mensaje y vuelves a ese mismo estado.", "El punto de control es el estado anterior a ese mensaje, y el texto del mensaje vuelve al cuadro. Por eso el ejemplo de los colores muestra el color previo, no el del mensaje elegido."],
        ["Rebobinar deshace cualquier cambio del proyecto.", "Solo rastrea archivos que editaron las herramientas de edición en esa sesión. No cubre archivos tocados solo por shell, ediciones de subagentes ni cambios hechos fuera de Claude Code."],
        ["El rebobinado tiene alias solo con la barra y Esc dos veces.", "También existen `/undo` y `/checkpoint`. Conserva copias de los 100 puntos de control más recientes por sesión."],
        ["Las preguntas laterales se hacen con una frase especial.", "Se hacen con `/btw`. No añaden nada al historial y funcionan aunque Claude esté trabajando, pero no pueden usar herramientas."],
        ["El ciclo del agente es un diagrama propio de una web.", "La documentación lo resume en tres fases que se mezclan: reunir contexto, actuar y verificar. El usuario puede interrumpir en cualquier punto."],
        ["Se usa el mínimo esfuerzo siempre.", "El nivel de esfuerzo se elige según la tarea con `/effort`. Más esfuerzo mejora el resultado y consume más tokens."],
      ],
    },
    { type: "heading", level: 2, text: "Preguntas frecuentes" },
    {
      type: "accordion",
      items: [
        {
          title: "¿Rebobinar sustituye a Git?",
          text: "No. Es una recuperación rápida dentro de una sesión. No guarda historial permanente ni sirve para colaborar. Haz commits y trabaja en ramas cuando tengas una versión que funciona.",
        },
        {
          title: "¿Qué pasa si rebobino y luego cierro Claude Code sin escribir nada?",
          text: "Los mensajes rebobinados pueden volver al reanudar. Antes de salir, envía un mensaje: Claude Code guarda entonces la conversación rebobinada. Los archivos que restauraste se quedan como los dejó el rebobinado.",
        },
        {
          title: "¿Por qué Claude me pide permiso para todo?",
          text: "Porque el modo manual pregunta antes de editar archivos, ejecutar comandos y salir a la red. Puedes aceptar una vez o para toda la sesión. Cuando confíes en lo que hace, cambia a aceptar ediciones, y deja el modo plan para las tareas grandes.",
        },
        {
          title: "¿Puedo pedirle cosas a Claude mientras trabaja?",
          text: "Sí. Puedes escribir un mensaje y quedará en cola, usar `/btw` para una duda rápida que no interrumpe, o pulsar Esc para detenerlo y redirigirlo. Lo hecho hasta ese punto se conserva.",
        },
        {
          title: "¿Cuántas veces se repite el ciclo?",
          text: "Las que haga falta. Claude decide el siguiente paso con lo aprendido en el anterior, y cada vuelta reenvía todo el historial, de modo que las tareas largas cuestan más. Por eso conviene plan, prompts específicos y verificación temprana.",
        },
        {
          title: "¿Para qué sirven los hooks en el ciclo?",
          text: "Para disparar acciones tuyas en momentos concretos, por ejemplo al terminar un turno: un sonido, una revisión de código por otro agente o pruebas automáticas. Se estudian en el bloque intermedio.",
        },
      ],
    },
    { type: "heading", level: 2, text: "Qué sigue" },
    {
      type: "paragraph",
      text: "El Día 6 enseña a Claude Code a conocer un código: cómo explorar una base de código, la memoria persistente con CLAUDE.md, la memoria rápida y las entradas multimodales con imágenes y archivos. Es la base para trabajar con proyectos reales.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 6, verifica que puedes explicar...",
      items: [
        "Qué muestra la cabecera de Claude Code y qué hacen los prefijos barra, arroba, exclamación e interrogación.",
        "Cómo cambia Shift+Tab entre los modos manual, aceptar ediciones y plan, y cuándo usar el plan.",
        "Cómo se abre el rebobinado y por qué restaurar en un mensaje deja el código anterior a ese mensaje.",
        "Qué no cubre el rebobinado y por qué sigue haciendo falta Git.",
        "Las tres fases del ciclo del agente y dónde actúan el historial, las herramientas y los hooks.",
        "Para qué sirven `/btw`, `/background` y `/rename`.",
      ],
    },
    { type: "heading", level: 2, text: "Fuentes consultadas (noviembre 2026)" },
    {
      type: "list",
      items: [
        "[Puntos de control y rebobinado](https://code.claude.com/docs/en/checkpointing)",
        "[Modo interactivo: atajos y comandos rápidos](https://code.claude.com/docs/en/interactive-mode)",
        "[Modos de permisos](https://code.claude.com/docs/en/permission-modes)",
        "[Referencia de comandos](https://code.claude.com/docs/en/commands)",
        "[Cómo funciona Claude Code: el ciclo del agente](https://code.claude.com/docs/en/how-claude-code-works)",
        "[Vista de agentes y sesiones en segundo plano](https://code.claude.com/docs/en/agent-view)",
        "[Referencia de la CLI](https://code.claude.com/docs/en/cli-reference)",
        "[Gestión de costos](https://code.claude.com/docs/en/costs)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "¿Qué prefijo del cuadro de mensaje ejecuta un comando de shell y añade su salida a la sesión?",
      options: ["/", "@", "!", "?"],
      correctIndex: 2,
      explanation: "La exclamación al principio abre el modo shell. La barra abre comandos y skills, la arroba menciona archivos y la interrogación muestra la ayuda.",
    },
    {
      question: "¿Qué hace Shift+Tab en Claude Code?",
      options: [
        "Pega una imagen",
        "Recorre los modos de permisos",
        "Detiene a Claude",
        "Abre el rebobinado",
      ],
      correctIndex: 1,
      explanation: "Recorre los modos de permisos: manual, aceptar ediciones y plan, y los opcionales que tengas disponibles.",
    },
    {
      question: "¿Qué garantiza el modo plan?",
      options: [
        "Que Claude tarda menos",
        "Que solo lee y propone, sin modificar nada hasta que apruebes",
        "Que no se gastan tokens",
        "Que se ejecutan las pruebas",
      ],
      correctIndex: 1,
      explanation: "En modo plan Claude explora y propone un enfoque. No edita hasta que lo apruebas, lo que evita rehacer trabajo si la idea inicial era equivocada.",
    },
    {
      question: "Pides cuatro cambios de color: rosado, morado, gris y negro. Rebobinas al mensaje del gris con restaurar código y conversación. ¿Qué color verás?",
      options: ["Rosado", "Morado", "Gris", "Negro"],
      correctIndex: 1,
      explanation: "El punto de control es el estado anterior al mensaje elegido. Antes del mensaje del gris el código estaba en morado.",
    },
    {
      question: "¿Qué ocurre con el texto del mensaje elegido al rebobinar?",
      options: [
        "Se borra para siempre",
        "Vuelve al cuadro de mensaje para que lo reenvíes o lo edites",
        "Se envía solo",
        "Se guarda en Git",
      ],
      correctIndex: 1,
      explanation: "Tras restaurar la conversación, el mensaje original vuelve al cuadro de texto para poder reenviarlo o editarlo.",
    },
    {
      question: "¿Qué cambio del proyecto NO rastrea el rebobinado?",
      options: [
        "Un archivo que Claude editó con sus herramientas",
        "Un archivo modificado solo por un comando de shell que Claude nunca editó",
        "El cambio de color de una página",
        "Un archivo nuevo creado por Claude",
      ],
      correctIndex: 1,
      explanation: "Un archivo cambiado solo por comandos de shell no se rastrea. Tampoco las ediciones de subagentes ni los cambios fuera de la sesión. Para eso se usa Git.",
    },
    {
      question: "¿Cuáles son las tres fases del ciclo del agente?",
      options: [
        "Planificar, programar y desplegar",
        "Reunir contexto, actuar y verificar",
        "Leer, escribir y borrar",
        "Preguntar, responder y cerrar",
      ],
      correctIndex: 1,
      explanation: "La documentación describe tres fases que se mezclan: reunir contexto, actuar y verificar. Claude usa herramientas en todas ellas.",
    },
    {
      question: "¿Qué ocurre con los tokens al repetirse el ciclo en una tarea larga?",
      options: [
        "Se reduce el costo en cada vuelta",
        "Cada vuelta reenvía el historial completo, así que las tareas largas cuestan más",
        "Los tokens no cambian",
        "Solo se cobra la última vuelta",
      ],
      correctIndex: 1,
      explanation: "Cada petición lleva el historial acumulado y los resultados de herramientas. Por eso conviene mensajes específicos, plan y limpiar el contexto entre tareas.",
    },
    {
      question: "¿Para qué sirve `/btw`?",
      options: [
        "Para cambiar de modelo",
        "Para hacer una pregunta lateral sin añadirla al historial, aunque Claude esté trabajando",
        "Para enviar la sesión a segundo plano",
        "Para borrar la conversación",
      ],
      correctIndex: 1,
      explanation: "`/btw` responde con lo que ya está en el contexto, sin herramientas y sin añadir nada al historial. La sesión a segundo plano se manda con `/background`.",
    },
    {
      question: "Tienes una versión que funciona y vas a experimentar. ¿Qué haces antes de seguir?",
      options: [
        "Confiar en el rebobinado como único respaldo",
        "Hacer un commit en Git, porque el rebobinado no es historial permanente",
        "Cerrar Claude Code",
        "Cambiar a modo plan",
      ],
      correctIndex: 1,
      explanation: "El rebobinado es una recuperación por sesión. Para conservar versiones que funcionan, el historial permanente es Git: commits y ramas.",
    },
  ],
};
