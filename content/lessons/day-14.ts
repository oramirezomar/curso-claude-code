import type { Lesson } from "@/lib/types";
// Día 14 · Clases 52, 53 y 54 de la transcripción (el artículo 55 solo enlaza el código fuente de la sección).
// Contenido verificado en noviembre de 2026.
export const day14: Lesson = {
  day: 14,
  slug: "comando-personalizado-worktree",
  title: "Comando personalizado /worktree",
  section: "Batch y worktrees",
  estimatedMinutes: 65,
  icon: "🧩",
  objectives: [
    "Crear un comando propio en `.claude/skills/` y entender cómo se llama, dónde vive y qué campos lleva.",
    "Escribir las instrucciones de un comando con argumentos, con permisos acotados y sin efectos que no pidas.",
    "Usar /worktree para lanzar un requisito por sesión y revisar cada resultado antes de confirmar.",
    "Comparar el comando propio con /batch, con git worktree a mano y con claude --worktree.",
    "Cerrar el trabajo paralelo: confirmar, unir, comprobar y limpiar, con criterio sobre qué automatizar.",
  ],
  blocks: [
    {
      type: "paragraph",
      text: "El Día 12 lo automatizó todo con `/batch`. El Día 13 lo hiciste todo a mano. Este día es el punto medio: un comando propio, `/worktree`, que se encarga de lo repetitivo, que es elegir el nombre, crear la carpeta y la rama y empezar a trabajar en ella, y te deja a ti lo que importa: probar, iterar, confirmar y unir. Además, aprendes algo útil más allá de los worktrees: cómo escribir un comando personalizado que te sirva a ti.",
    },
    {
      type: "keyFacts",
      items: [
        { value: ".claude/skills/", label: "Carpeta de los skills y comandos de un proyecto" },
        { value: "$ARGUMENTS", label: "Todo lo que escribes tras el nombre del comando" },
        { value: "true", label: "Valor de disable-model-invocation: solo tú lanzas el comando" },
        { value: "allowed-tools", label: "Permisos que el comando concede solo en ese turno" },
        { value: "0", label: "Commits que hace el comando: los haces tú" },
        { value: "/reload-skills", label: "Comando por si el skill nuevo no aparece" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text: "Contenido verificado en noviembre de 2026 contra la documentación de skills, comandos, permisos, subagentes y worktrees de Claude Code. El archivo del comando se validó como YAML, las órdenes de Git que usa se ejecutaron en un repositorio de prueba con el Tetris y los cálculos de los experimentos se verificaron en el navegador. El comando en sí, ejecutado por Claude Code, no se probó aquí: lo que haga depende de tu modelo, tus permisos y tu cuenta.",
    },
    { type: "heading", level: 2, text: "Un comando propio es un skill" },
    {
      type: "paragraph",
      text: "Un comando personalizado es una instrucción que quieres tener a mano: escribes `/nombre` y Claude recibe el texto que guardaste, con lo que añadas detrás. En las versiones actuales los comandos personalizados se fusionaron con los skills. Hay dos formas válidas. La preferida es una carpeta con un archivo `SKILL.md`: `.claude/skills/worktree/SKILL.md` se invoca con `/worktree`. La anterior, un archivo `.claude/commands/worktree.md`, sigue funcionando y también da `/worktree`. Para algo nuevo conviene el skill, porque permite añadir archivos de apoyo y todos los campos.",
    },
    {
      type: "image",
      src: "/img/dia-14/anatomia-del-comando.svg",
      alt: "A la izquierda, la estructura de carpetas con .claude/skills, la carpeta worktree y el archivo SKILL.md, que da el comando /worktree. Debajo, el archivo con su encabezado entre guiones, con cuatro campos, y el cuerpo con instrucciones, la rama actual inyectada y la marca de argumentos.",
      caption: "El nombre de la carpeta es el comando. El archivo lleva un encabezado y unas instrucciones.",
    },
    {
      type: "paragraph",
      text: "Antes de crearlo, comprueba que el nombre está libre: escribe `/work` y mira si `/worktree` aparece en la lista. No es un comando incluido, aunque existen otras formas de usar worktrees. Si el nombre ya lo usara algo, elige otro, como `/custom-worktree`, el que quieras. El lugar importa. En `.claude/skills/` del proyecto, el comando lo ve cualquiera que clone el repositorio, y es lo adecuado si lleva convenciones del proyecto, como la carpeta `.trees`. En `~/.claude/skills/`, vale para todos tus proyectos y solo para ti. En Windows, `~` es tu carpeta de usuario. Un comando de Git genérico y personal tiene sentido ahí. Uno con reglas del proyecto, en el proyecto.",
    },
    {
      type: "paragraph",
      text: "Cuando creas o editas un skill en una carpeta que Claude Code vigila, se detecta en la misma sesión, sin salir. Si el comando nuevo no aparece, ejecuta `/reload-skills`. El video decía que hacía falta reiniciar Claude para verlo, y ya no es necesario.",
    },
    { type: "heading", level: 2, text: "Pedírselo a Claude o escribirlo tú" },
    {
      type: "paragraph",
      text: "Puedes pedirle a Claude que cree el comando: \"crea un comando personalizado llamado worktree que cree un worktree con git worktree add en .trees/nombre y trabaje en él con el requisito que reciba\". Lo hará bien, y a veces añade cosas que no pediste, como usar una herramienta de agentes. Léelo antes de aceptarlo, igual que lees un commit. Al ser un archivo de Markdown, lo puedes ajustar a mano. Aquí tienes una versión escrita con intención, que explico después.",
    },
    {
      type: "code",
      lang: "markdown",
      title: ".claude/skills/worktree/SKILL.md",
      code: `---
description: Crea un worktree aislado en .trees y desarrolla en él el requisito que le pases. Úsalo solo cuando yo lo invoque.
argument-hint: "<requisito a implementar>"
disable-model-invocation: true
allowed-tools: Bash(git worktree add *) Bash(git worktree list *) Bash(git check-ignore *) Bash(git status *) Bash(git branch --show-current) Bash(node --check *)
---

## Estado actual

Rama actual: !\`git branch --show-current\`

Worktrees existentes:
!\`git worktree list\`

## Requisito

$ARGUMENTS

## Instrucciones

1. Elige un nombre corto para el trabajo: de 2 a 4 palabras del requisito, en minúsculas, sin acentos y unidas con guiones. Por ejemplo, menu-pausa.
2. Comprueba que .trees/ está ignorada con \`git check-ignore -q .trees/<nombre>\`. Si no lo está, detente y avísame: no modifiques el .gitignore.
3. Si ya existe un worktree o una rama con ese nombre, detente y propón otro nombre.
4. Crea el worktree con \`git worktree add .trees/<nombre>\`. Parte del commit actual.
5. Implementa el requisito trabajando solo con archivos dentro de .trees/<nombre>. Usa rutas que empiecen por .trees/<nombre>/ y no edites la copia principal.
6. Si hay archivos JavaScript, comprueba su sintaxis con \`node --check\`.
7. No hagas commit, no unas ramas y no borres nada.
8. Termina con un informe corto: carpeta, rama, archivos cambiados, cómo probarlo y qué queda pendiente.`,
    },
    {
      type: "table",
      headers: ["Elemento", "Por qué está así"],
      rows: [
        ["`description`", "Dice qué hace y cuándo usarlo. Con `disable-model-invocation` activo, Claude no lo carga por su cuenta."],
        ["`argument-hint`", "Muestra qué escribir tras el nombre al autocompletar."],
        ["`disable-model-invocation: true`", "Crea carpetas y ramas. Quieres decidir tú cuándo, como con un despliegue. Claude no puede lanzarlo solo."],
        ["`allowed-tools`", "Concede permiso solo para los comandos concretos, durante el turno en que lo invocas. No limita nada más y se borra con tu siguiente mensaje."],
        ["`Bash(git branch --show-current)`", "Se permite solo esa forma de git branch. Con una regla amplia sobre git branch se permitiría también borrar ramas sin preguntar."],
        ["Líneas con `!` y comillas invertidas", "Se ejecutan antes de que Claude lea el comando, y su salida queda dentro: rama actual y worktrees existentes."],
        ["`$ARGUMENTS`", "Se sustituye por todo lo que escribas tras el nombre del comando."],
        ["Instrucción 7", "Dice qué no hace: sin commits, sin uniones y sin borrados. Es la parte que da seguridad."],
      ],
    },
    {
      type: "callout",
      variant: "warning",
      text: "Un skill de un repositorio ajeno puede traer su propio allowed-tools y concederse permisos amplios. Antes de usar un proyecto que no conoces, revisa los skills que incluye y sus herramientas pre-aprobadas. Los permisos de este comando son los mínimos que necesita, y el resto sigue pidiendo confirmación.",
    },
    {
      type: "paragraph",
      text: "El comando hace tres cosas más que `/batch`, y las tres son decisiones que puedes cambiar. Parte del commit en el que estás, no de la rama predeterminada del remoto. Trabaja en la misma sesión, no en segundo plano. Y se detiene antes de confirmar. La instrucción 2 es importante: si `.trees/` no está ignorada, se detiene y te avisa en lugar de modificar el `.gitignore` por su cuenta. Quien escribe las reglas eres tú, no el comando.",
    },
    { type: "heading", level: 2, text: "Usarlo con tres requisitos" },
    {
      type: "image",
      src: "/img/dia-14/flujo-del-comando.svg",
      alt: "Seis pasos: el comando elige un nombre corto, comprueba que .trees esté ignorada y que el nombre esté libre, crea el worktree con git worktree add, implementa trabajando solo dentro de la carpeta nueva, informa con carpeta, rama, archivos y cómo probarlo, y se detiene. Debajo, lo que decide el comando y cómo se usa con tres requisitos.",
      caption: "Qué hace el comando, y dónde termina su trabajo y empieza el tuyo.",
    },
    {
      type: "paragraph",
      text: "Parte de la rama de integración, con `.trees/` ignorada y el estado base confirmado. Abre una terminal, lanza `claude`, escribe `/worktree` seguido de un espacio, y pega el primer requisito. Todo lo que pegas es `$ARGUMENTS`, aunque tenga varias líneas: no hace falta comillas. Al enviar, Claude elige un nombre, comprueba, crea la carpeta y la rama, y empieza a trabajar. Mira `git worktree list` y `git branch`: ya están. Las primeras ediciones te pedirán permiso, porque el comando no pre-aprueba las ediciones de archivos.",
    },
    {
      type: "paragraph",
      text: "Mientras esa sesión trabaja, abre otra terminal y repite con el segundo requisito, y otra con el tercero. Es la misma idea del Día 13, con la diferencia de que la carpeta, la rama y el nombre salen del comando, y no de lo que tecleaste. Puedes tener las sesiones en pestañas o en paneles divididos. Un truco para saber cuál es cuál: `/rename` en cada sesión, con el nombre del trabajo. Otro, un hook que suene al terminar una tarea, algo que verás más adelante.",
    },
    {
      type: "callout",
      variant: "info",
      text: "Cada sesión sigue abierta en la carpeta principal, y el comando le pide editar solo dentro de .trees/nombre. Eso es una instrucción y no un bloqueo: el aislamiento forzado solo existe cuando la sesión se inicia con claude --worktree. Comprueba con git status en la carpeta principal que no apareció ningún cambio. Si quieres aislamiento forzado, abre Claude dentro del worktree o usa claude --worktree.",
    },
    {
      type: "image",
      src: "/img/dia-14/variantes-de-aislamiento.svg",
      alt: "Tres columnas que comparan el comando propio, claude --worktree y un subagente con isolation worktree según de dónde parten, qué aislamiento dan, dónde viven y cómo se limpian.",
      caption: "Tres formas de trabajar con worktrees, y qué cambia en cada una.",
    },
    {
      type: "paragraph",
      text: "Si prefieres un comando que lance el trabajo en segundo plano y en un worktree aislado por Claude, hay una variante: un skill con `context: fork` y un subagente propio con `isolation: worktree`. El subagente trabaja en una copia temporal y se limpia solo cuando no deja cambios. A cambio, esa copia parte de la rama predeterminada del remoto y no de tu `HEAD`, y no sigues el nombre ni la carpeta que tú elegiste. No hay una opción mejor: elige según quieras controlar el punto de partida o el aislamiento.",
    },
    { type: "heading", level: 2, text: "Revisar, corregir y confirmar" },
    {
      type: "paragraph",
      text: "Cuando una sesión termina, el informe te dice la carpeta, la rama y qué probar. Abre el `index.html` de esa carpeta y pruébalo. El resultado de cada requisito puede variar de una ejecución a otra: si quieres un diseño concreto, dilo en el requisito. Si falla algo, como un juego donde las piezas se vuelven invisibles tras cambiar de tema, dile a esa sesión exactamente qué ves, con una captura si hace falta, y corrige ahí. Las demás no se enteran.",
    },
    {
      type: "paragraph",
      text: "El comando no hace commits, por diseño. Cuando estés conforme, pídele a la sesión: \"crea un commit con los cambios de este worktree\", y lee el mensaje. Si cerraste la terminal por error, no pierdes el trabajo: está en la carpeta y la rama. Abre una terminal dentro de `.trees/nombre`, lanza `claude` y pídele el commit. No recordará la conversación, pero ve los cambios en los archivos. Con `git worktree list` ves cuál falta.",
    },
    { type: "heading", level: 2, text: "Unir, comprobar y limpiar" },
    {
      type: "image",
      src: "/img/dia-14/ciclo-completo.svg",
      alt: "Cinco pasos: preparar la rama de integración, lanzar /worktree en cada terminal, revisar cada carpeta, confirmar un commit por rama, y unir y limpiar. Debajo, una tabla que compara /batch, el método a mano y el comando propio en quién crea los worktrees, quién implementa, quién confirma y une, y cuánto control hay.",
      caption: "El ciclo completo, y en qué se diferencian los tres métodos.",
    },
    {
      type: "paragraph",
      text: "Para unir, vuelve a la carpeta principal, a la rama de integración, y repite el Día 13: `git worktree list` para ver las ramas, `git merge` una a una o dile a Claude que las una conservando las tres funciones. Los conflictos aparecerán porque las tres tocan las mismas líneas. Cuando termine, comprueba con `node --check game.js` y prueba el juego con todo junto, empezando por la pausa, los temas y los récords. La integración puede dejar detalles visuales, como dos paneles pegados, que ajustas después en la rama de integración.",
    },
    {
      type: "paragraph",
      text: "La limpieza vuelve a ser la misma: `git worktree remove .trees/nombre` para cada uno y después `git branch -d nombre`. Podrías escribir otro comando para limpiar. Piénsalo dos veces: borrar es destructivo, y aquí la ventaja de hacerlo a mano es que ves el nombre de cada carpeta antes de quitarla. Si lo automatizas, que sea con `disable-model-invocation` y con una comprobación previa de que la rama ya está fusionada.",
    },
    {
      type: "paragraph",
      text: "Qué método elegir depende de ti. `/batch` es lo más cómodo cuando solo quieres delegar y revisar al final, y se paga con menos control y más permisos. El método manual da control total, pero repite los mismos comandos cada vez. El comando propio es un punto medio que se adapta a tus hábitos: tu carpeta, tu nombre de rama, tu punto de partida. Los tres trabajan en paralelo, así que los tres consumen más tokens que hacerlo en una sola conversación. Úsalos cuando el tiempo o el aislamiento lo justifiquen, y no por defecto.",
    },
    { type: "heading", level: 2, text: "Ejercicios guiados y experimentos" },
    {
      type: "paragraph",
      text: "Los ejercicios usan el Tetris de los días anteriores. Las salidas de Git las ejecuté en un repositorio de prueba. Lo que haga Claude Code con el comando en los ejercicios 4 a 8 es orientativo. Los cálculos de los experimentos del final se ejecutan en el navegador.",
    },
    {
      type: "exercise",
      title: "Ejercicio 1: preparar la rama y la carpeta",
      description: "Parte del estado base, sin las tres funciones.",
      steps: [
        {
          instruction: "Cámbiate a main y crea una rama de integración nueva.",
          command: "cd ~/ClaudeCode/04-tetris && git switch main && git switch -c integracion-comando",
          expected: "Switched to branch 'main'\nYour branch is up to date with 'origin/main'.\nSwitched to a new branch 'integracion-comando'",
        },
        {
          instruction: "Comprueba que .trees/ no está ignorada todavía. El código 1 significa que no.",
          command: "git check-ignore -q .trees/menu-pausa; echo \"codigo=$?\"",
          expected: "codigo=1",
        },
        {
          instruction: "Ignórala y confirma el cambio.",
          command: "echo \".trees/\" >> .gitignore && git add .gitignore && git commit -m \"chore: ignorar .trees\"",
          expected: "[integracion-comando abc1234] chore: ignorar .trees\n 1 file changed, 1 insertion(+)",
        },
        {
          instruction: "Comprueba de nuevo. Ahora el código 0 significa que sí.",
          command: "git check-ignore -q .trees/menu-pausa; echo \"codigo=$?\"",
          expected: "codigo=0",
        },
      ],
      verify: "El comando comprobará exactamente esto: si da 1, se detendrá y te avisará.",
    },
    {
      type: "exercise",
      title: "Ejercicio 2: comprobar que el nombre está libre",
      description: "Mira qué comandos existen antes de crear uno.",
      steps: [
        {
          instruction: "Abre Claude Code y escribe el principio del nombre.",
          command: "claude",
        },
        {
          instruction: "Escribe una barra y las letras work, y mira la lista.",
          command: "/work",
          expected: "No aparece ningún comando llamado worktree. Si apareciera, elige otro nombre.",
        },
        {
          instruction: "Lista los skills disponibles.",
          command: "/skills",
          expected: "La lista de skills incluidos y de los tuyos. Todavía no está worktree.",
        },
      ],
      verify: "El nombre está libre. Sal con Ctrl+C dos veces si quieres.",
    },
    {
      type: "exercise",
      title: "Ejercicio 3: crear el comando",
      description: "Guarda el archivo en el proyecto y prueba lo que ejecutará.",
      steps: [
        {
          instruction: "Crea la carpeta y el archivo del skill con el contenido de la lección.",
          file: {
            name: ".claude/skills/worktree/SKILL.md",
            code: `---
description: Crea un worktree aislado en .trees y desarrolla en él el requisito que le pases. Úsalo solo cuando yo lo invoque.
argument-hint: "<requisito a implementar>"
disable-model-invocation: true
allowed-tools: Bash(git worktree add *) Bash(git worktree list *) Bash(git check-ignore *) Bash(git status *) Bash(git branch --show-current) Bash(node --check *)
---

## Estado actual

Rama actual: !\`git branch --show-current\`

Worktrees existentes:
!\`git worktree list\`

## Requisito

$ARGUMENTS

## Instrucciones

1. Elige un nombre corto para el trabajo: de 2 a 4 palabras del requisito, en minúsculas, sin acentos y unidas con guiones. Por ejemplo, menu-pausa.
2. Comprueba que .trees/ está ignorada con \`git check-ignore -q .trees/<nombre>\`. Si no lo está, detente y avísame: no modifiques el .gitignore.
3. Si ya existe un worktree o una rama con ese nombre, detente y propón otro nombre.
4. Crea el worktree con \`git worktree add .trees/<nombre>\`. Parte del commit actual.
5. Implementa el requisito trabajando solo con archivos dentro de .trees/<nombre>. Usa rutas que empiecen por .trees/<nombre>/ y no edites la copia principal.
6. Si hay archivos JavaScript, comprueba su sintaxis con \`node --check\`.
7. No hagas commit, no unas ramas y no borres nada.
8. Termina con un informe corto: carpeta, rama, archivos cambiados, cómo probarlo y qué queda pendiente.`,
          },
        },
        {
          instruction: "Ejecuta a mano las dos líneas que el comando inyecta al invocarse.",
          command: "git branch --show-current && git worktree list",
          expected: "integracion-comando\n/ruta/04-tetris  abc1234 [integracion-comando]",
        },
        {
          instruction: "Dentro de Claude, escribe /work de nuevo. Si no aparece, recarga los skills.",
          command: "/reload-skills",
          expected: "El comando /worktree aparece en la lista, con el texto <requisito a implementar> como pista.",
        },
      ],
      verify: "El comando existe, se llama como la carpeta y solo tú puedes lanzarlo.",
    },
    {
      type: "exercise",
      title: "Ejercicio 4: lanzar el primer requisito",
      description: "Usa el comando con el requisito de la pausa.",
      steps: [
        {
          instruction: "Escribe el comando y pega el primer requisito de requisitos-batch.md, el del menú de pausa.",
          command: "/worktree Con la tecla P se pausa el juego. Mientras está en pausa se muestra un cartel con las opciones Reanudar y Reiniciar, y no cae ninguna pieza.",
          expected: "Claude elige un nombre como menu-pausa, comprueba la carpeta, crea el worktree y empieza a editar. Te pide permiso para las ediciones.",
        },
        {
          instruction: "Desde otra terminal, comprueba lo que creó.",
          command: "git worktree list && git branch",
          expected: "/ruta/04-tetris                    abc1234 [integracion-comando]\n/ruta/04-tetris/.trees/menu-pausa  abc1234 [menu-pausa]\n* integracion-comando\n  main\n+ menu-pausa",
        },
        {
          instruction: "Comprueba que la carpeta principal sigue limpia.",
          command: "git status --short",
          expected: "(sin salida: el trabajo está en .trees/menu-pausa)",
        },
      ],
      verify: "Hay una carpeta y una rama con el nombre que eligió Claude, y la copia principal no cambió.",
    },
    {
      type: "exercise",
      title: "Ejercicio 5: lanzar los otros dos",
      description: "Repite en dos terminales más.",
      steps: [
        {
          instruction: "Abre una terminal nueva en la carpeta del proyecto, lanza claude y usa el comando con el segundo requisito, el de la mejor puntuación.",
          command: "/worktree Al terminar la partida guarda la mayor puntuación en localStorage y muéstrala en la página. Añade un botón para borrarla.",
          expected: "Se crea un segundo worktree con un nombre como mejor-puntuacion-guardada.",
        },
        {
          instruction: "Repite en una tercera terminal con el requisito de los temas.",
          command: "/worktree Añade un selector con tres temas: clásico, neón y pastel. Guarda la elección en localStorage y aplícala al cargar la página.",
          expected: "Se crea un tercer worktree con un nombre como temas-visuales.",
        },
        {
          instruction: "Ponle nombre a cada sesión para no perderte.",
          command: "/rename pausa",
          expected: "El nombre aparece en la barra del cuadro de mensaje.",
        },
      ],
      verify: "Tres sesiones, tres carpetas en .trees y tres ramas. No hay cambios en la carpeta principal.",
    },
    {
      type: "exercise",
      title: "Ejercicio 6: revisar y corregir cada uno",
      description: "Pruébalos por separado y pide ajustes solo donde haga falta.",
      steps: [
        {
          instruction: "Abre el index.html de cada carpeta de .trees y prueba la función.",
          expected: "Cada carpeta tiene su función y no las demás.",
        },
        {
          instruction: "Pide un ajuste a una sola sesión. Si algo se rompe, describe lo que ves.",
          command: "Al cambiar de tema, las piezas se vuelven invisibles. Describe la causa y corrígelo solo en este worktree.",
          expected: "Claude encuentra la causa, la corrige y lo comprueba. Las otras sesiones no se enteran.",
        },
      ],
      verify: "Las tres funciones se comportan como pediste. El comando no hizo ningún commit.",
    },
    {
      type: "exercise",
      title: "Ejercicio 7: confirmar cada rama",
      description: "Un commit por worktree, leyendo el mensaje.",
      steps: [
        {
          instruction: "En cada sesión, pide el commit.",
          command: "Crea un commit con los cambios realizados en este worktree.",
          expected: "Claude muestra el mensaje del commit, por ejemplo feat: menú de pausa con la tecla P. Léelo y apruébalo.",
        },
        {
          instruction: "Comprueba desde la carpeta principal que las tres ramas tienen un commit nuevo.",
          command: "git log --oneline -1 menu-pausa",
          expected: "abc1234 feat: menú de pausa con la tecla P",
        },
        {
          instruction: "Si cerraste una terminal sin hacer el commit, abre una nueva dentro de su carpeta y pídelo allí.",
          command: "cd .trees/temas-visuales && claude",
        },
      ],
      verify: "git worktree list muestra tres ramas con commits y ninguna con cambios sin confirmar.",
    },
    {
      type: "exercise",
      title: "Ejercicio 8: unir y comprobar",
      description: "Une en la rama de integración y comprueba las tres funciones juntas.",
      steps: [
        {
          instruction: "Vuelve a la carpeta principal y vacía el contexto.",
          command: "/clear",
        },
        {
          instruction: "Pide la unión, con los nombres reales de git worktree list.",
          command: "Une las ramas de los tres worktrees en integracion-comando, conservando las tres funciones. Resuelve los conflictos con criterio y explícame cada resolución.",
          expected: "Claude fusiona una a una, resuelve los conflictos y hace los commits de la unión.",
        },
        {
          instruction: "Comprueba la sintaxis y prueba el juego.",
          command: "node --check game.js",
          expected: "(sin salida: la sintaxis es válida)",
        },
      ],
      verify: "La pausa, los récords y los temas funcionan juntos. No quedan marcas de conflicto.",
    },
    {
      type: "exercise",
      title: "Ejercicio 9: limpiar y decidir",
      description: "Cierra el ciclo y quédate con el método que prefieras.",
      steps: [
        {
          instruction: "Quita los tres worktrees, con los nombres reales.",
          command: "git worktree remove .trees/menu-pausa && git worktree list",
          expected: "/ruta/04-tetris  abc1234 [integracion-comando]",
        },
        {
          instruction: "Borra las ramas ya fusionadas.",
          command: "git branch -d menu-pausa",
          expected: "Deleted branch menu-pausa (was abc1234).",
        },
        {
          instruction: "Anota qué método usarías en tu próximo proyecto y por qué, entre /batch, a mano y el comando propio.",
          expected: "Una nota de dos líneas con tu criterio: control, rapidez o consumo de tokens.",
        },
      ],
      verify: "Solo quedan main y la rama de integración. Repite el borrado para los otros dos worktrees.",
    },
    {
      type: "playground",
      title: "Experimento 10: el nombre corto del trabajo",
      description: "El comando pide 2 a 4 palabras en minúsculas, sin acentos y con guiones. Simula esa regla quitando palabras vacías y tomando las tres primeras. Prueba con tus requisitos.",
      code: `const VACIAS = ["un", "una", "el", "la", "los", "las", "de", "del", "con", "y", "al", "que", "para", "en", "por", "anade", "implementa", "agrega", "crea"];

function nombre(requisito) {
  const palabras = requisito
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\\u0300-\\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, " ")
    .split(" ")
    .filter((p) => p && !VACIAS.includes(p));
  return palabras.slice(0, 3).join("-");
}

console.log(nombre("Añade un menú de pausa con la tecla P"));
console.log(nombre("Implementa la mejor puntuación guardada"));
console.log(nombre("Crea temas visuales: clásico, neón y pastel"));`,
      expected: "menu-pausa-tecla\nmejor-puntuacion-guardada\ntemas-visuales-clasico",
    },
    {
      type: "playground",
      title: "Experimento 11: cómo llegan los argumentos",
      description: "El skill recibe todo lo que escribes tras el nombre como ARGUMENTS, y cada palabra o texto entre comillas como un argumento numerado desde cero. Simula la sustitución con un ejemplo. Cambia la entrada.",
      code: `function argumentos(texto) {
  return [...texto.matchAll(/"([^"]*)"|(\\S+)/g)].map((m) => (m[1] !== undefined ? m[1] : m[2]));
}

const plantilla = "Rama: $0. Requisito: $1. Todo: $ARGUMENTS";
const entrada = 'pausa "menú con la tecla P"';
const args = argumentos(entrada);

const salida = plantilla
  .replace("$ARGUMENTS", entrada)
  .replace("$0", args[0])
  .replace("$1", args[1]);

console.log(args.length + " argumentos");
console.log(salida);`,
      expected: "2 argumentos\nRama: pausa. Requisito: menú con la tecla P. Todo: pausa \"menú con la tecla P\"",
    },
    {
      type: "playground",
      title: "Experimento 12: de la ruta al comando",
      description: "Un skill se llama como su carpeta, y un archivo de .claude/commands se llama como el archivo, con dos puntos si está en una subcarpeta. Calcula el comando de cinco rutas. Añade la tuya.",
      code: `function comando(ruta) {
  const skills = ruta.match(/skills\\/([^/]+)\\/SKILL\\.md$/);
  if (skills) return "/" + skills[1];
  const cmd = ruta.match(/commands\\/(.+)\\.md$/);
  if (cmd) return "/" + cmd[1].split("/").join(":");
  return "(no es un comando)";
}

[
  ".claude/skills/worktree/SKILL.md",
  ".claude/commands/worktree.md",
  ".claude/commands/frontend/componente.md",
  "~/.claude/skills/resumen/SKILL.md",
  "notas/worktree.md",
].forEach((r) => console.log(r + " -> " + comando(r)));`,
      expected: ".claude/skills/worktree/SKILL.md -> /worktree\n.claude/commands/worktree.md -> /worktree\n.claude/commands/frontend/componente.md -> /frontend:componente\n~/.claude/skills/resumen/SKILL.md -> /resumen\nnotas/worktree.md -> (no es un comando)",
    },
    {
      type: "playground",
      title: "Experimento 13: ¿está ignorada la carpeta?",
      description: "El comando se detiene si la carpeta no está ignorada. Simula la comprobación con un .gitignore pequeño. Prueba otras rutas y otras reglas.",
      code: `const gitignore = ["node_modules/", ".trees/", "*.log"];

function ignorada(ruta) {
  return gitignore.some((regla) => regla.endsWith("/") && ruta.startsWith(regla));
}

[".trees/menu-pausa", ".claude/worktrees/pausa", "node_modules/x"].forEach((r) =>
  console.log(r + ": " + (ignorada(r) ? "ignorada" : "NO ignorada, el comando se detiene"))
);`,
      expected: ".trees/menu-pausa: ignorada\n.claude/worktrees/pausa: NO ignorada, el comando se detiene\nnode_modules/x: ignorada",
    },
    { type: "heading", level: 2, text: "¿Qué usar en cada caso?" },
    {
      type: "table",
      headers: ["Si necesitas...", "Usa...", "Nota"],
      rows: [
        ["Un atajo para una tarea repetida", "Un skill en `.claude/skills/nombre/SKILL.md`", "El nombre de la carpeta es el comando."],
        ["Que solo tú lo lances", "`disable-model-invocation: true`", "Imprescindible si crea o borra cosas."],
        ["Recibir texto tras el nombre", "`$ARGUMENTS`", "Todo lo escrito después, aunque tenga varias líneas."],
        ["Dar contexto real al empezar", "Una línea con `!` y comillas invertidas", "Se ejecuta antes de que Claude lea el comando."],
        ["Evitar preguntas de permisos", "`allowed-tools` con comandos concretos", "Solo ese turno. Ni más ni menos de lo necesario."],
        ["Compartirlo con el equipo", "`.claude/skills/` del proyecto", "Revísalo antes de usarlo en repositorios ajenos."],
        ["Tenerlo en todos tus proyectos", "`~/.claude/skills/`", "Solo tuyo."],
        ["Que Claude cree y aísle el worktree", "`claude --worktree nombre`", "Parte de la rama predeterminada del remoto."],
        ["Un agente en segundo plano en un worktree", "Skill con `context: fork` y subagente con `isolation: worktree`", "Limpieza automática si no hay cambios."],
        ["Borrar worktrees", "Manual con `git worktree remove`", "Es destructivo: mejor verlo antes de ejecutarlo."],
      ],
    },
    { type: "heading", level: 2, text: "Datos que suelen aparecer desactualizados" },
    {
      type: "table",
      headers: ["Suele decirse", "Información verificada (noviembre 2026)"],
      rows: [
        ["El comando nuevo solo se ve al reiniciar Claude.", "Se detecta en la misma sesión. Si no aparece, `/reload-skills`."],
        ["Los comandos personalizados son archivos en .claude/commands.", "Siguen funcionando, pero se fusionaron con los skills. Para algo nuevo, `.claude/skills/nombre/SKILL.md`."],
        ["El comando generado por Claude es el mejor que puedes tener.", "Puede traer instrucciones que no pediste. Léelo y ajústalo, como cualquier archivo."],
        ["allowed-tools limita lo que Claude puede hacer.", "Solo concede permiso para esos comandos durante el turno. No restringe las demás herramientas. Para quitar herramientas está `disallowed-tools`."],
        ["Permitir git branch con un comodín es inofensivo.", "Permitiría también borrar ramas sin preguntar. Usa la forma concreta, como `Bash(git branch --show-current)`."],
        ["El comando propio aísla igual que claude --worktree.", "El bloqueo de escrituras fuera del worktree solo existe con `claude --worktree` o con un subagente con aislamiento."],
        ["Los worktrees de subagentes parten de tu rama actual.", "Parten de la rama predeterminada del remoto, salvo que configures `worktree.baseRef` como `head`."],
        ["El comando puede hacer los commits por ti.", "El de esta lección no los hace por diseño. Si quieres que los haga, añádelo y pre-aprueba solo `git add` y `git commit`."],
        ["Un comando propio sustituye a /batch.", "Cubre un caso distinto: tú eliges el reparto y el nombre. /batch decide el reparto, ejecuta en segundo plano y abre los pull requests."],
      ],
    },
    { type: "heading", level: 2, text: "Preguntas frecuentes" },
    {
      type: "accordion",
      items: [
        {
          title: "¿Dónde guardo el comando: proyecto o personal?",
          text: "En el proyecto si lleva convenciones del proyecto, como la carpeta .trees, y quieres que el equipo lo use. En ~/.claude/skills/ si es un hábito tuyo que aplica a cualquier proyecto.",
        },
        {
          title: "¿Puedo cambiar la carpeta de los worktrees?",
          text: "Sí. Edita el archivo del comando y cambia .trees por lo que prefieras, por ejemplo una carpeta fuera del proyecto. Si queda dentro, asegúrate de que esté ignorada.",
        },
        {
          title: "El comando no aparece en la lista. ¿Qué reviso?",
          text: "Que el archivo se llame SKILL.md, que esté dentro de una carpeta con el nombre del comando y que el encabezado empiece en la primera línea con tres guiones. Ejecuta /reload-skills. Con claude --debug puedes ver si se rechazó el nombre.",
        },
        {
          title: "¿Puedo pasarle dos datos, por ejemplo rama y requisito?",
          text: "Sí: $0 es la primera palabra o texto entre comillas, y $1 la segunda. También puedes declarar nombres en el campo arguments. $ARGUMENTS sigue siendo todo el texto.",
        },
        {
          title: "¿Las sesiones se pisan si abro varias en la misma carpeta?",
          text: "Cada sesión edita su propia carpeta .trees/nombre, así que no. Lo que comparten son el historial de Git y los permisos permanentes que concedas.",
        },
        {
          title: "¿Cuál de los tres métodos me conviene?",
          text: "Si solo quieres delegar, /batch. Si quieres entender cada paso, a mano. Si repites a menudo el mismo patrón, el comando propio, que te ahorra teclear y mantiene tu convención.",
        },
      ],
    },
    { type: "heading", level: 2, text: "Qué sigue" },
    {
      type: "paragraph",
      text: "Con esto termina la sección de worktrees. El Día 15 empieza otro bloque: diseño guiado por especificaciones, cómo escribir un documento de requisitos que Claude pueda ejecutar y comprobar. Antes, deja tu Tetris con las tres funciones unidas en `main`, publicado, y guarda el comando `/worktree`: lo reutilizarás cuando quieras repartir trabajo.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 15, verifica que puedes explicar...",
      items: [
        "Qué es un comando personalizado hoy y cómo se llama según su carpeta.",
        "Qué hacen description, argument-hint, disable-model-invocation y allowed-tools.",
        "Cómo recibe el comando lo que escribes después de su nombre.",
        "Por qué el comando de esta lección no hace commits ni borra nada.",
        "Qué aislamiento da el comando propio y qué aislamiento da claude --worktree.",
        "Cómo revisas, corriges y confirmas cada sesión antes de unir.",
        "En qué se diferencian /batch, el método manual y el comando propio.",
        "Por qué conviene limpiar manualmente y comprobar antes de borrar.",
      ],
    },
    { type: "heading", level: 2, text: "Fuentes consultadas (noviembre 2026)" },
    {
      type: "list",
      items: [
        "[Extender Claude con skills y comandos](https://code.claude.com/docs/en/skills)",
        "[Referencia de comandos](https://code.claude.com/docs/en/commands)",
        "[Permisos y reglas de Bash](https://code.claude.com/docs/en/permissions)",
        "[Subagentes y aislamiento con worktrees](https://code.claude.com/docs/en/sub-agents)",
        "[Ejecutar sesiones en paralelo con worktrees](https://code.claude.com/docs/en/worktrees)",
        "[Gestionar sesiones](https://code.claude.com/docs/en/sessions)",
        "[Git: git worktree](https://git-scm.com/docs/git-worktree)",
        "[Git: git check-ignore](https://git-scm.com/docs/git-check-ignore)",
        "[Git: gitignore](https://git-scm.com/docs/gitignore)",
        "[Node.js: opción --check](https://nodejs.org/api/cli.html)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "Creas .claude/skills/worktree/SKILL.md. ¿Cómo lo invocas?",
      options: ["/skill worktree", "/worktree", "/SKILL", "/claude worktree"],
      correctIndex: 1,
      explanation: "El nombre de la carpeta es el comando. El archivo antiguo .claude/commands/worktree.md daría el mismo nombre.",
    },
    {
      question: "¿Para qué sirve disable-model-invocation: true en este comando?",
      options: [
        "Para que sea más rápido",
        "Para que solo tú puedas lanzarlo, porque crea carpetas y ramas",
        "Para ocultarlo del menú",
        "Para que no use herramientas",
      ],
      correctIndex: 1,
      explanation: "Con efectos como crear ramas, conviene decidir tú cuándo se ejecuta. Claude no puede lanzarlo por su cuenta.",
    },
    {
      question: "¿Qué recibe $ARGUMENTS?",
      options: [
        "Solo la primera palabra",
        "Todo lo que escribes después del nombre del comando",
        "El nombre del archivo",
        "La rama actual",
      ],
      correctIndex: 1,
      explanation: "Se sustituye por el texto completo tras el nombre, aunque tenga varias líneas.",
    },
    {
      question: "¿Qué hace allowed-tools en el encabezado de un skill?",
      options: [
        "Prohíbe todas las demás herramientas",
        "Concede permiso para esas herramientas solo durante el turno en que se invoca, sin restringir las demás",
        "Instala herramientas nuevas",
        "Desactiva los permisos",
      ],
      correctIndex: 1,
      explanation: "El permiso se borra con el siguiente mensaje y no limita lo que Claude puede usar. Las demás siguen pidiendo permiso según tus ajustes.",
    },
    {
      question: "¿Por qué se pre-aprueba solo la forma concreta Bash(git branch --show-current) y no una regla amplia con comodín sobre git branch?",
      options: [
        "Por estética",
        "Porque la regla amplia permitiría también borrar ramas sin preguntar",
        "Porque git branch no existe",
        "Porque es más lento",
      ],
      correctIndex: 1,
      explanation: "Los permisos de un comando deben ser los mínimos. La forma concreta solo permite leer la rama actual.",
    },
    {
      question: "El comando propio pide editar solo dentro de .trees/nombre. ¿Qué aislamiento garantiza?",
      options: [
        "Un bloqueo total de escrituras fuera de esa carpeta",
        "Ninguno forzado: es una instrucción, y el bloqueo solo existe con claude --worktree o un subagente con aislamiento",
        "Solo lectura de la carpeta principal",
        "El mismo que /batch",
      ],
      correctIndex: 1,
      explanation: "Por eso conviene comprobar con git status que la carpeta principal sigue limpia.",
    },
    {
      question: "¿Por qué el comando comprueba que .trees/ esté ignorada y se detiene si no?",
      options: [
        "Para borrar la carpeta",
        "Para no modificar el .gitignore por su cuenta y evitar que los worktrees aparezcan como archivos nuevos",
        "Para acelerar Git",
        "Porque Git lo exige siempre",
      ],
      correctIndex: 1,
      explanation: "Las reglas del repositorio las decides tú. El comando se detiene y te avisa en lugar de cambiarlas.",
    },
    {
      question: "Cerraste por error la terminal de una sesión sin hacer el commit. ¿Qué haces?",
      options: [
        "Se perdió todo",
        "Abres una terminal dentro de .trees/nombre, lanzas claude y le pides el commit: el trabajo está en la carpeta",
        "Borras la rama",
        "Repites el requisito en main",
      ],
      correctIndex: 1,
      explanation: "El trabajo está en los archivos y la rama. La nueva sesión no recuerda la conversación, pero ve los cambios.",
    },
    {
      question: "¿De dónde parte un worktree creado por un subagente con isolation: worktree?",
      options: [
        "De tu HEAD actual",
        "De la rama predeterminada del remoto, no del HEAD de la sesión",
        "De un commit vacío",
        "De la rama de integración siempre",
      ],
      correctIndex: 1,
      explanation: "La documentación indica que parte por defecto de la rama predeterminada, salvo que configures worktree.baseRef con head.",
    },
    {
      question: "¿Cuándo conviene el comando propio frente a /batch?",
      options: [
        "Nunca",
        "Cuando repites a menudo el mismo patrón y quieres tu convención de carpeta, nombre y punto de partida, con el control de revisar y unir tú",
        "Cuando no tienes Git",
        "Cuando quieres que abra los pull requests solo",
      ],
      correctIndex: 1,
      explanation: "/batch decide el reparto y delega. El comando propio automatiza lo repetitivo y te deja el criterio.",
    },
  ],
};
