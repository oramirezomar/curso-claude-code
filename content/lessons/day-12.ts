import type { Lesson } from "@/lib/types";
// Día 12 · Clases 43, 45, 46, 47 y 48 de la transcripción (el artículo 44 solo resume los temas de la sección).
// Contenido verificado en noviembre de 2026.
export const day12: Lesson = {
  day: 12,
  slug: "comando-batch",
  title: "Comando /batch",
  section: "Batch y worktrees",
  estimatedMinutes: 70,
  icon: "🌿",
  objectives: [
    "Explicar por qué varios agentes sobre los mismos archivos chocan y cómo los worktrees de Git lo evitan.",
    "Preparar el proyecto para /batch: estado base subido, rama de integración y un .gitignore adecuado.",
    "Lanzar /batch con tres requisitos, leer su plan antes de aprobarlo y seguir a los agentes en segundo plano.",
    "Unir el trabajo de varias ramas, entender un conflicto de fusión y resolverlo con criterio.",
    "Limpiar los worktrees sin perder trabajo y decidir cuándo /batch vale la pena frente a otras opciones.",
  ],
  blocks: [
    {
      type: "paragraph",
      text: "Esta sección es avanzada. Si nunca has trabajado con Git, puedes saltártela y volver cuando necesites que varios agentes trabajen a la vez. Para el resto, es metódica y reutiliza el Tetris que ya tienes. El tema es uno solo, visto de tres maneras: de forma automática con `/batch` (este día), a mano con `git worktree` y con un comando propio semiautomático (Día 13). Verás cuál se adapta mejor a tu forma de trabajar.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "/batch", label: "Divide un cambio grande y lanza un agente por unidad" },
        { value: "5 a 30", label: "Unidades de trabajo independientes en que divide, según la referencia actual" },
        { value: ".claude/worktrees", label: "Carpeta donde se crean los worktrees de Claude Code" },
        { value: "default", label: "Rama de la que parten los worktrees nuevos: la del remoto, no la tuya" },
        { value: "--force", label: "Opción para quitar un worktree con cambios sin confirmar" },
        { value: "node --check", label: "Comprobación rápida de sintaxis tras resolver conflictos" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text: "Contenido verificado en noviembre de 2026 contra las páginas oficiales de comandos y de worktrees de Claude Code y contra la documentación de git worktree. Los worktrees, la limpieza y los conflictos de fusión se ejecutaron en repositorios de prueba con el Tetris del Día 8: las salidas de los ejercicios 5, 7 y 9 son reales. /batch en sí no se ejecutó, porque depende de tu cuenta, de tu modelo y de tus permisos.",
    },
    { type: "heading", level: 2, text: "El problema: varios agentes en la misma carpeta" },
    {
      type: "paragraph",
      text: "Cuando solo hay un agente, todo cabe en una carpeta. Pero imagina tres tareas largas que tocan el mismo archivo: una añade un menú de pausa, otra guarda la mejor puntuación y otra cambia los colores. Si abres tres terminales con Claude Code en la misma carpeta, los tres editan `game.js` a la vez. Uno sobrescribe lo que otro acaba de escribir, otro detecta un error que causó el anterior y lo corrige, y así sin fin, mientras los tokens se van. Si las tareas fueran independientes, no pasaría. Pero cuando comparten archivos, hay que aislarlas.",
    },
    {
      type: "image",
      src: "/img/dia-12/sin-y-con-worktrees.svg",
      alt: "A la izquierda, tres agentes que editan a la vez el mismo archivo game.js en una sola carpeta, con el riesgo de sobrescribirse. A la derecha, tres carpetas dentro de .claude/worktrees, cada una con su copia del archivo y su rama. Debajo, cuándo hace falta.",
      caption: "Un worktree por agente evita que se pisen mientras trabajan.",
    },
    {
      type: "paragraph",
      text: "La solución son los worktrees de Git. Un worktree es una carpeta de trabajo separada, con sus propios archivos y su propia rama, que comparte el historial y el remoto con tu repositorio. Cada agente edita su copia y no puede estropear la de los demás. Los conflictos no desaparecen, pero se posponen al momento de unir, donde los resuelves una vez y con criterio. Claude Code los crea por defecto en `.claude/worktrees/<nombre>/`, con una rama llamada `worktree-<nombre>`. Conviene añadir `.claude/worktrees/` al `.gitignore` para que no aparezcan como archivos sin seguimiento.",
    },
    {
      type: "image",
      src: "/img/dia-12/tres-formas-de-paralelo.svg",
      alt: "Tres columnas: /batch, el más automático y con menos control; git worktree manual, con más control y menos automatización; y un comando propio, que combina ambos. Se indica que /batch se ve este día y las otras dos el Día 13.",
      caption: "Tres formas de trabajar en paralelo, de más automática a más manual.",
    },
    { type: "heading", level: 2, text: "Qué hace /batch" },
    {
      type: "paragraph",
      text: "`/batch` es un skill incluido que orquesta cambios grandes en paralelo. Investiga el código, divide el trabajo en unidades independientes y te presenta un plan. Cuando lo apruebas, lanza un subagente en segundo plano por cada unidad, cada uno en su worktree aislado. Cada subagente implementa su parte, ejecuta pruebas si las hay y abre un pull request o informa de lo que pasó. Necesita un repositorio de Git, o un hook que cree los worktrees. Fuera de un repositorio exige la versión 2.1.281 o posterior.",
    },
    {
      type: "image",
      src: "/img/dia-12/flujo-de-batch.svg",
      alt: "Seis pasos: pides con /batch, Claude investiga y divide en unidades, te presenta el plan y lo apruebas, lanza un agente por unidad en su worktree, cada uno implementa y prueba, y el resultado es un pull request o un informe. Debajo, lo que gana y lo que cuesta.",
      caption: "De la petición a un pull request por unidad.",
    },
    {
      type: "paragraph",
      text: "El video indica que `/batch` lanza entre tres y cinco worktrees. La referencia actual habla de dividir en entre 5 y 30 unidades independientes, y Claude propone las que considera necesarias según el trabajo. Para tres requisitos pequeños, es normal que proponga tres. Lo que debes hacer es leer el plan completo antes de aprobarlo: cuántas unidades hay, qué archivos toca cada una y cómo se probará. Si Claude juzga que el trabajo es tan pequeño que conviene hacerlo en orden, te lo pregunta: respóndele que lo quieres en paralelo si es lo que buscas.",
    },
    { type: "heading", level: 2, text: "Preparar el proyecto" },
    {
      type: "paragraph",
      text: "Necesitas el Tetris de los días anteriores con el juego funcionando. Si llegas aquí sin él, clona tu repositorio o crea los archivos del Día 8. Hay tres preparativos antes de lanzar nada.",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Deja el estado base en el remoto. Los worktrees nuevos parten de la rama predeterminada del remoto, normalmente `main`, y no de tu rama actual ni de commits sin subir. Si tu trabajo no está en `main` en GitHub, los agentes empezarán sin él. La alternativa es cambiar el ajuste `worktree.baseRef` a `head`, que hace partir de tu `HEAD` local.",
        "Crea una rama de integración con `git switch -c integracion-batch`. Es una copia de `main` donde vas a unir los resultados. Si algo sale mal, `main` queda intacta.",
        "Añade `.claude/worktrees/` al `.gitignore`. Y comprueba que tienes la CLI `gh` con sesión iniciada si quieres que los agentes abran pull requests.",
      ],
    },
    {
      type: "callout",
      variant: "info",
      text: "Un worktree es una copia limpia. Los archivos que Git no sigue, como .env o las dependencias instaladas, no vienen: tendrías que reinstalarlas en cada uno. En el Tetris no hay compilación ni dependencias, así que no hace falta. Si tu proyecto sí las tiene, la documentación explica cómo copiar archivos ignorados con un archivo `.worktreeinclude`.",
    },
    { type: "heading", level: 2, text: "Tres requisitos que tocan los mismos archivos" },
    {
      type: "paragraph",
      text: "Para probar `/batch` necesitas trabajo que compita por los mismos archivos. Estos tres lo hacen: un menú de pausa, una mejor puntuación guardada y varios temas visuales. Guárdalos en un archivo de Markdown, que es una forma ordenada de dar requisitos largos. Todos tocan `game.js` y `index.html`.",
    },
    { type: "heading", level: 2, text: "Lanzar /batch y seguir el trabajo" },
    {
      type: "paragraph",
      text: "Abre Claude Code en la carpeta, en la rama de integración, y escribe `/batch` seguido de los tres requisitos. Claude analiza el código y devuelve un plan: cuántas unidades, qué hace cada una, qué archivos toca y cómo se probará. Léelo con calma, y si hay mucho texto, sube con el desplazamiento. Si no hay pruebas automáticas, el plan lo dirá, y tendrás que confiar en su comprobación de sintaxis y en lo que pruebes tú. Pide que lo escriba en español si prefieres.",
    },
    {
      type: "paragraph",
      text: "Cuando apruebas, empiezan a aparecer carpetas dentro de `.claude/worktrees/`, una por unidad, y los agentes trabajan en segundo plano. Puedes seguirlos con `/tasks`, o desde la terminal con `git worktree list`. Mientras trabajan, te pedirán permisos varias veces: ejecutar `gh pr`, `git push`, crear ramas o confiar en los hooks de Git del proyecto. Aprueba solo lo que entiendes. Si das una autorización permanente, se guarda en `.claude/settings.local.json`, donde puedes borrarla después.",
    },
    {
      type: "callout",
      variant: "warning",
      text: "Un permiso permanente que diste para una tarea sigue vigente cuando acaba. Revisa .claude/settings.local.json al terminar y quita los comandos de git y gh que no quieras seguir permitiendo.",
    },
    { type: "heading", level: 2, text: "Revisar lo que hizo cada agente" },
    {
      type: "paragraph",
      text: "Aquí está lo menos cómodo de `/batch`: los nombres de las carpetas y de las ramas no te dicen de entrada qué requisito resolvió cada una. Abre el `index.html` de cada worktree en el navegador y comprueba qué hace. Cada uno es una copia independiente del repositorio, así que lo puedes servir o abrir directamente. `git worktree list` te da el mapa: ruta, commit y rama de cada uno. Si quieres corregir algo de una unidad, tienes que ir a su carpeta o a su rama, y por eso muchos prefieren las alternativas del Día 13. Puedes pedirle a Claude nombres más claros, pero esto no cambia el diseño: a cambio de la automatización, pierdes visibilidad.",
    },
    {
      type: "paragraph",
      text: "Tras las ejecuciones, en GitHub aparecen los pull requests, uno por unidad, con una explicación del requisito. Si tienes el Claude de GitHub instalado, también se revisan solos. Puedes unir cada pull request desde GitHub o hacerlo tú en local en la rama de integración, que es lo que sigue.",
    },
    { type: "heading", level: 2, text: "Unir el trabajo y resolver conflictos" },
    {
      type: "paragraph",
      text: "Sal de `main` y de cualquier rama de worktree: debes estar en la rama de integración. Vacía el contexto con `/clear` y pídele a Claude que una las tres ramas en la rama de integración. Claude ejecuta `git worktree list` para saber cuáles son y las fusiona una a una. La primera suele entrar limpia. Las siguientes chocan, porque las tres tocaron las mismas líneas: Git avisa de `CONFLICT (content)` y deja el archivo con marcas.",
    },
    {
      type: "image",
      src: "/img/dia-12/unir-el-trabajo.svg",
      alt: "Tres ramas de worktree que se fusionan en una rama de integración, dos de ellas con conflicto, y después se llevan a main. Debajo, un ejemplo de marcas de conflicto con la parte superior que ya había y la inferior que entra, y los tres pasos para resolver con criterio.",
      caption: "Se une en una rama de integración, no en main.",
    },
    {
      type: "paragraph",
      text: "Una marca de conflicto tiene tres partes. Entre `<<<<<<< HEAD` y `=======` está lo que ya había en la rama donde estás. Entre `=======` y `>>>>>>> nombre` está lo que entra de la otra rama. Resolver significa dejar el código final sin ninguna marca, combinando ambas intenciones. Aquí tienes que mirar cada caso: a veces basta quedarse con las dos líneas, y a veces una lógica está pensada para convivir con la otra y hay que adaptarla. Claude lo hace bien con frecuencia, pero no siempre. Una resolución mecánica que conserva ambos lados puede dejar una llave sin cerrar o una función duplicada. En una prueba con este mismo Tetris, quedarse con los dos lados de cada conflicto, sin pensar, dejó el archivo con una llave sin cerrar, y `node --check game.js` lo detectó con `SyntaxError: Unexpected end of input`.",
    },
    {
      type: "paragraph",
      text: "Tras unir, comprueba. Primero la sintaxis, con `node --check game.js` si tienes Node, y después abre el juego y prueba las tres funciones juntas: la pausa, la mejor puntuación y los temas. Cosas que en un solo requisito no se ven, como poder guardar la puntuación varias veces con el mismo nombre, aparecen aquí. Cuando todo funciona en la rama de integración, llévala a `main` con un pull request o con una fusión. Antes de eso, no lo hagas.",
    },
    { type: "heading", level: 2, text: "Limpiar los worktrees" },
    {
      type: "paragraph",
      text: "Cuando el trabajo ya está unido, los worktrees sobran. Pídele a Claude que los borre, o hazlo tú: `git worktree remove .claude/worktrees/nombre`. Es mejor que borrar la carpeta a mano, porque también elimina la referencia en el repositorio. Si el worktree tiene cambios sin confirmar o archivos nuevos, Git se niega y dice `contains modified or untracked files, use --force to delete it`. Añade `--force` solo si estás seguro de que ese trabajo ya no importa. Si borraste una carpeta a mano, `git worktree prune` limpia las referencias huérfanas.",
    },
    {
      type: "paragraph",
      text: "Las ramas `worktree-*` quedan en el repositorio y se borran con `git branch -d nombre` cuando ya están fusionadas. Con `-d`, Git se niega a borrar una rama con commits sin fusionar. Para los worktrees que Claude crea para subagentes o sesiones en segundo plano, Claude Code también hace una limpieza periódica: elimina los que no tienen trabajo pendiente y tienen más de `cleanupPeriodDays`, y deja los que tengan cambios o commits sin subir.",
    },
    { type: "heading", level: 2, text: "Ejercicios guiados y experimentos" },
    {
      type: "paragraph",
      text: "Los ejercicios usan el Tetris del Día 11, con Claude Code y un repositorio en GitHub. `/batch` y lo que responde Claude son orientativos. Las salidas de Git de los ejercicios 5, 7 y 9 las ejecuté en repositorios de prueba, aunque las rutas y los identificadores serán los tuyos. Los cálculos de los experimentos del final se ejecutan en el navegador.",
    },
    {
      type: "exercise",
      title: "Ejercicio 1: dejar el estado base en main",
      description: "Los worktrees nuevos parten de la rama predeterminada del remoto: súbela antes de empezar.",
      steps: [
        {
          instruction: "Comprueba que no hay cambios sin confirmar.",
          command: "cd ~/ClaudeCode/04-tetris && git status --short",
          expected: "(sin salida: el árbol de trabajo está limpio)",
        },
        {
          instruction: "Ignora la carpeta de worktrees y confirma el cambio.",
          command: "echo \".claude/worktrees/\" >> .gitignore && git add .gitignore && git commit -m \"chore: ignorar worktrees de Claude\"",
          expected: "[main abc1234] chore: ignorar worktrees de Claude\n 1 file changed, 1 insertion(+)",
        },
        {
          instruction: "Sube main para que los agentes partan de tu estado actual.",
          command: "git push",
          expected: "main -> main",
        },
        {
          instruction: "Comprueba que la CLI de GitHub tiene sesión.",
          command: "gh auth status",
          expected: "github.com\n  Logged in to github.com account TU-USUARIO",
        },
      ],
      verify: "main en GitHub tiene tu último commit. Si no, los worktrees partirán de una versión antigua.",
    },
    {
      type: "exercise",
      title: "Ejercicio 2: crear la rama de integración",
      description: "Donde se unirá todo, aparte de main.",
      steps: [
        {
          instruction: "Crea la rama y cámbiate a ella.",
          command: "git switch -c integracion-batch",
          expected: "Switched to a new branch 'integracion-batch'",
        },
      ],
      verify: "git branch marca integracion-batch con un asterisco.",
    },
    {
      type: "exercise",
      title: "Ejercicio 3: escribir los tres requisitos",
      description: "Los tres tocan game.js e index.html a propósito.",
      steps: [
        {
          instruction: "Guarda el archivo en la raíz del proyecto, sin confirmarlo todavía.",
          file: {
            name: "requisitos-batch.md",
            code: `# Tres mejoras para el Tetris

## 1. Menú de pausa
Con la tecla P se pausa el juego. Mientras está en pausa se muestra un cartel con las opciones Reanudar y Reiniciar, y no cae ninguna pieza.

## 2. Mejor puntuación
Al terminar la partida, guarda la mayor puntuación en localStorage y muéstrala en la página. Añade un botón para borrarla.

## 3. Temas visuales
Añade un selector con tres temas: clásico, neón y pastel. Guarda la elección en localStorage y aplícala al cargar la página.

Los tres cambios pueden tocar game.js e index.html.`,
          },
        },
      ],
      verify: "El archivo describe tres funciones independientes entre sí que comparten archivos.",
    },
    {
      type: "exercise",
      title: "Ejercicio 4: lanzar /batch y leer el plan",
      description: "Pide el trabajo en paralelo y revisa antes de aprobar.",
      steps: [
        {
          instruction: "Abre Claude Code en la rama de integración.",
          command: "claude",
        },
        {
          instruction: "Lanza el comando con el contenido del archivo.",
          command: "/batch Implementa las tres mejoras de @requisitos-batch.md, cada una en su worktree, y responde en español.",
          expected: "Claude investiga y presenta un plan con unidades de trabajo, por ejemplo tres: pausa, puntuaciones y temas. Pregunta si quieres ejecutarlas en paralelo.",
        },
        {
          instruction: "Lee el plan: cuántas unidades, qué archivos toca cada una, cómo se probará. Elige la ejecución en paralelo y aprueba.",
          expected: "Aparecen carpetas nuevas en .claude/worktrees/ y los agentes empiezan en segundo plano.",
        },
      ],
      verify: "Entiendes qué hará cada unidad antes de aprobar. Si el plan mezcla dos requisitos en una, pídele que los separe.",
    },
    {
      type: "exercise",
      title: "Ejercicio 5: seguir a los agentes",
      description: "Mira qué worktrees existen y qué piden.",
      steps: [
        {
          instruction: "Lista los worktrees desde otra terminal.",
          command: "git worktree list",
          expected: "/ruta/04-tetris                                    f526269 [integracion-batch]\n/ruta/04-tetris/.claude/worktrees/pausa           f526269 [worktree-pausa]\n/ruta/04-tetris/.claude/worktrees/puntuaciones    f526269 [worktree-puntuaciones]",
        },
        {
          instruction: "Dentro de Claude, mira las tareas en segundo plano.",
          command: "/tasks",
          expected: "Una fila por agente, con su estado.",
        },
        {
          instruction: "Responde a las preguntas de permisos con cuidado. Aprueba solo lo que entiendes, y no confíes en hooks de Git de un proyecto que no conozcas.",
          expected: "Pedirá ejecutar gh pr, crear ramas y hacer push. Cada aprobación permanente queda en .claude/settings.local.json.",
        },
      ],
      verify: "Cada agente tiene su carpeta y su rama. Los nombres reales los elige Claude.",
    },
    {
      type: "exercise",
      title: "Ejercicio 6: probar cada unidad",
      description: "Averigua qué hizo cada agente.",
      steps: [
        {
          instruction: "Abre el index.html de cada carpeta de .claude/worktrees/ en el navegador y prueba lo que hace.",
          expected: "Una tiene el menú de pausa, otra la mejor puntuación con su botón y otra el selector de temas.",
        },
        {
          instruction: "Comprueba qué commit hizo cada uno.",
          command: "git log --oneline -3 worktree-pausa",
          expected: "Un commit nuevo con el mensaje de la función, encima del estado base.",
        },
      ],
      verify: "Sabes qué carpeta resuelve cada requisito. Si algo no te convence, anótalo: se corrige en su rama.",
    },
    {
      type: "exercise",
      title: "Ejercicio 7: ver un conflicto sin riesgo",
      description: "Reproduce el problema en un repositorio de juguete antes de unir los reales.",
      steps: [
        {
          instruction: "Crea un repositorio de prueba con dos ramas que cambian la misma zona.",
          command: "mkdir /tmp/prueba-conflicto && cd /tmp/prueba-conflicto && git init -q -b main && printf 'let terminado = false;\\nlet pieza = 1;\\n' > game.js && git add . && git commit -qm \"feat: base\" && git switch -q -c pausa && printf 'let terminado = false;\\nlet pausado = false;\\nlet pieza = 1;\\n' > game.js && git commit -qam \"feat: pausa\" && git switch -q main && git switch -q -c puntos && printf 'let terminado = false;\\nlet mejor = 0;\\nlet pieza = 1;\\n' > game.js && git commit -qam \"feat: puntos\" && git switch main",
          expected: "Switched to branch 'main'",
        },
        {
          instruction: "Une la primera rama. Entra sin problemas.",
          command: "git merge pausa",
          expected: "Updating 8f28772..165ae42\nFast-forward\n game.js | 1 +\n 1 file changed, 1 insertion(+)",
        },
        {
          instruction: "Une la segunda. Las dos añadieron una línea en el mismo sitio.",
          command: "git merge puntos",
          expected: "Auto-merging game.js\nCONFLICT (content): Merge conflict in game.js\nAutomatic merge failed; fix conflicts and then commit the result.",
        },
        {
          instruction: "Mira el estado y el archivo.",
          command: "git status --short && cat game.js",
          expected: "UU game.js\nlet terminado = false;\n<<<<<<< HEAD\nlet pausado = false;\n=======\nlet mejor = 0;\n>>>>>>> puntos\nlet pieza = 1;",
        },
        {
          instruction: "Cancela la fusión. El archivo vuelve a como estaba.",
          command: "git merge --abort && cat game.js",
          expected: "let terminado = false;\nlet pausado = false;\nlet pieza = 1;",
        },
      ],
      verify: "Sabes leer las tres partes de una marca de conflicto y que --abort deshace la fusión. Borra la carpeta de prueba cuando termines.",
    },
    {
      type: "exercise",
      title: "Ejercicio 8: unir con Claude y comprobar",
      description: "Une las tres ramas y verifica el resultado antes de darlo por bueno.",
      steps: [
        {
          instruction: "Vacía el contexto y pide la unión en la rama de integración.",
          command: "/clear",
        },
        {
          instruction: "Dale el requerimiento con el nombre de la rama.",
          command: "Une los tres worktrees creados por /batch en la rama integracion-batch, en la que estamos. Quiero las tres funciones juntas. Si hay conflictos, combínalos con criterio y explícame cada resolución.",
          expected: "Claude ejecuta git worktree list, fusiona las ramas, resuelve los conflictos y hace los commits.",
        },
        {
          instruction: "Comprueba la sintaxis.",
          command: "node --check game.js",
          expected: "(sin salida: la sintaxis es válida)",
        },
        {
          instruction: "Abre el juego y prueba la pausa, la mejor puntuación y los temas, todos juntos.",
          expected: "Las tres funciones conviven. Si algo falla, pídele a Claude que lo corrija en la rama de integración.",
        },
      ],
      verify: "No quedan marcas de conflicto en game.js ni en index.html.",
    },
    {
      type: "exercise",
      title: "Ejercicio 9: limpiar worktrees y ramas",
      description: "Elimina lo que ya no necesitas, sin perder trabajo.",
      steps: [
        {
          instruction: "Quita un worktree que no tiene cambios.",
          command: "git worktree remove .claude/worktrees/pausa",
          expected: "(sin salida)",
        },
        {
          instruction: "Intenta quitar uno con cambios sin confirmar. Git se niega.",
          command: "git worktree remove .claude/worktrees/puntuaciones",
          expected: "fatal: '.claude/worktrees/puntuaciones' contains modified or untracked files, use --force to delete it",
        },
        {
          instruction: "Si ese trabajo ya está unido y no importa, fuérzalo. Quita después el resto de worktrees. Usa los nombres reales de git worktree list.",
          command: "git worktree remove --force .claude/worktrees/puntuaciones && git worktree remove .claude/worktrees/temas && git worktree list",
          expected: "/ruta/04-tetris  f526269 [integracion-batch]",
        },
        {
          instruction: "Borra las ramas que ya están fusionadas.",
          command: "git branch -d worktree-pausa worktree-puntuaciones worktree-temas",
          expected: "Deleted branch worktree-pausa (was f526269).\nDeleted branch worktree-puntuaciones (was f526269).\nDeleted branch worktree-temas (was f526269).",
        },
      ],
      verify: "Solo queda tu carpeta principal. Si -d se niega, la rama tiene commits sin fusionar: revisa antes de forzar.",
    },
    {
      type: "playground",
      title: "Experimento 10: qué archivos se pisan",
      description: "Cuenta cuántas unidades de trabajo tocan cada archivo. Donde hay más de una, habrá conflicto al unir. Cambia las listas.",
      code: `const unidades = {
  pausa: ["game.js", "index.html"],
  puntuaciones: ["game.js", "index.html"],
  temas: ["game.js", "index.html", "temas.css"],
};

const usos = {};
for (const [unidad, archivos] of Object.entries(unidades)) {
  for (const archivo of archivos) {
    usos[archivo] = (usos[archivo] || 0) + 1;
  }
}

for (const [archivo, veces] of Object.entries(usos)) {
  console.log(archivo + ": " + veces + (veces > 1 ? " unidades, riesgo de conflicto" : " unidad"));
}`,
      expected: "game.js: 3 unidades, riesgo de conflicto\nindex.html: 3 unidades, riesgo de conflicto\ntemas.css: 1 unidad",
    },
    {
      type: "playground",
      title: "Experimento 11: tiempo y tokens de un lote",
      description: "Tres tareas de 10, 8 y 12 minutos tardan 30 en secuencia y 12 en paralelo, pero el gasto de tokens no baja. Supón 150000 tokens por agente. Cambia los tiempos.",
      code: `const minutos = [10, 8, 12];
const tokensPorAgente = 150000;

const secuencial = minutos.reduce((a, b) => a + b, 0);
const paralelo = Math.max(...minutos);

console.log("secuencial: " + secuencial + " min");
console.log("paralelo: " + paralelo + " min");
console.log("tokens (iguales o más): " + minutos.length * tokensPorAgente);`,
      expected: "secuencial: 30 min\nparalelo: 12 min\ntokens (iguales o más): 450000",
    },
    {
      type: "playground",
      title: "Experimento 12: leer una marca de conflicto",
      description: "Localiza el bloque de conflicto en un texto y separa lo que ya había de lo que entra. Es lo que lees al resolver. Cambia el texto.",
      code: `const MARCA = "<".repeat(7);
const MEDIO = "=".repeat(7);
const FIN = ">".repeat(7);

const texto = [
  "let terminado = false;",
  MARCA + " HEAD",
  "let pausado = false;",
  MEDIO,
  "let mejor = 0;",
  FIN + " worktree-puntuaciones",
  "let pieza = nuevaPieza();",
].join("\\n");

const lineas = texto.split("\\n");
const inicio = lineas.findIndex((l) => l.startsWith(MARCA));
const medio = lineas.findIndex((l) => l === MEDIO);
const fin = lineas.findIndex((l) => l.startsWith(FIN));

console.log("conflicto en las líneas " + (inicio + 1) + " a " + (fin + 1));
console.log("lo que ya había: " + lineas.slice(inicio + 1, medio).join(" "));
console.log("lo que entra: " + lineas.slice(medio + 1, fin).join(" "));`,
      expected: "conflicto en las líneas 2 a 6\nlo que ya había: let pausado = false;\nlo que entra: let mejor = 0;",
    },
    {
      type: "playground",
      title: "Experimento 13: carpeta y rama de un worktree",
      description: "Con claude --worktree nombre, la carpeta es .claude/worktrees/nombre y la rama es worktree-nombre. Genera los nombres para tres tareas y añade una.",
      code: `function worktree(nombre) {
  return {
    carpeta: ".claude/worktrees/" + nombre,
    rama: "worktree-" + nombre,
  };
}

["pausa", "puntuaciones", "temas"].forEach((n) => {
  const w = worktree(n);
  console.log(w.carpeta + " -> " + w.rama);
});`,
      expected: ".claude/worktrees/pausa -> worktree-pausa\n.claude/worktrees/puntuaciones -> worktree-puntuaciones\n.claude/worktrees/temas -> worktree-temas",
    },
    { type: "heading", level: 2, text: "¿Qué usar en cada caso?" },
    {
      type: "table",
      headers: ["Si necesitas...", "Usa...", "Nota"],
      rows: [
        ["Una sola tarea o tareas que no comparten archivos", "Un solo Claude Code", "No hace falta aislar nada."],
        ["Varias tareas largas sobre los mismos archivos", "Worktrees: uno por tarea", "Los conflictos se posponen a la unión."],
        ["Que todo se haga solo, aunque con poco control", "`/batch`", "Crea ramas, commits y pull requests."],
        ["Lanzar un agente en un worktree concreto", "`claude --worktree nombre`", "Carpeta `.claude/worktrees/nombre` y rama `worktree-nombre`."],
        ["Saber qué worktrees existen", "`git worktree list`", "Muestra ruta, commit y rama."],
        ["Que los agentes partan de tu trabajo local", "`worktree.baseRef` en `head`", "Por defecto parten de la rama predeterminada del remoto."],
        ["Unir con seguridad", "Una rama de integración aparte", "Así `main` no se toca hasta que todo funcione."],
        ["Comprobar tras resolver conflictos", "`node --check` y abrir el juego", "La sintaxis y el comportamiento."],
        ["Quitar un worktree", "`git worktree remove`", "Con `--force` solo si el trabajo ya no importa."],
      ],
    },
    { type: "heading", level: 2, text: "Datos que suelen aparecer desactualizados" },
    {
      type: "table",
      headers: ["Suele decirse", "Información verificada (noviembre 2026)"],
      rows: [
        ["/batch lanza entre tres y cinco worktrees.", "La referencia actual habla de dividir en entre 5 y 30 unidades independientes, y Claude propone las que el trabajo necesita. Revisa el plan antes de aprobar."],
        ["Los worktrees parten de la rama en la que estás.", "Parten de la rama predeterminada del remoto, salvo que configures `worktree.baseRef` en `head`. Sube tu estado base o cambia el ajuste."],
        ["/batch funciona en cualquier carpeta.", "Necesita un repositorio de Git, o un hook de creación de worktrees. Fuera de uno exige la versión 2.1.281 o posterior."],
        ["Se puede borrar la carpeta de un worktree a mano sin más.", "Funciona, pero deja referencias. Usa `git worktree remove`, o `git worktree prune` si ya borraste la carpeta."],
        ["Los worktrees se limpian siempre solos.", "Claude Code limpia los de subagentes y sesiones en segundo plano sin trabajo pendiente, pasado un tiempo. Los que tienen cambios o commits sin subir se conservan."],
        ["Quedarse con los dos lados resuelve un conflicto.", "A veces sí y a veces deja llaves sin cerrar o funciones duplicadas. Comprueba la sintaxis y prueba el juego."],
        ["/batch es mejor que hacerlo a mano.", "Depende: ahorra trabajo mecánico y abre pull requests, pero da poco control y gasta más tokens por agente."],
        ["La carpeta de worktrees puede quedarse en el repositorio.", "Añade `.claude/worktrees/` al `.gitignore` para que no aparezca como archivos sin seguimiento."],
        ["git checkout -b es la forma de crear la rama de integración.", "Funciona, pero `git switch -c` es más claro."],
      ],
    },
    { type: "heading", level: 2, text: "Preguntas frecuentes" },
    {
      type: "accordion",
      items: [
        {
          title: "¿Qué es un worktree y en qué se diferencia de un clon?",
          text: "Es una carpeta de trabajo adicional del mismo repositorio, con su propia rama y sus propios archivos. Comparte el historial y el remoto, así que es más ligero que un clon y los commits son visibles desde cualquiera.",
        },
        {
          title: "Mis agentes empezaron sin mis cambios recientes. ¿Por qué?",
          text: "Porque los worktrees parten de la rama predeterminada del remoto. Sube tus cambios a esa rama, o configura worktree.baseRef con el valor head.",
        },
        {
          title: "¿Puedo usar /batch sin GitHub?",
          text: "Sí, mientras haya un repositorio de Git. Sin remoto ni gh no se abrirán pull requests, pero las ramas y los worktrees se crean igual.",
        },
        {
          title: "¿Cuánto cuesta lanzar tres agentes?",
          text: "Cada agente trabaja con su propio contexto, así que el gasto total suele ser mayor que hacerlo todo en una conversación. A cambio, el tiempo baja al del agente más lento. Úsalo cuando el tiempo importe.",
        },
        {
          title: "¿Se puede cancelar una unidad a mitad de camino?",
          text: "Sí. Revisa /tasks y pídele a Claude que detenga la tarea. Después, quita su worktree con git worktree remove, con --force si tiene cambios que ya no quieres.",
        },
        {
          title: "¿Y si uno de los agentes se equivoca?",
          text: "Corrígelo en su rama, antes de unir. Por eso, leer cada resultado por separado es mejor que unir todo de golpe.",
        },
      ],
    },
    { type: "heading", level: 2, text: "Qué sigue" },
    {
      type: "paragraph",
      text: "El Día 13 repite el ejercicio con los dos enfoques que dan más control: crear los worktrees a mano con `git worktree add` y lanzar un Claude en cada uno, y después automatizarlo a medias con un comando propio. Para llegar con ventaja, deja tu proyecto en el estado base de antes de este día y guarda la rama de integración que usaste, para poder comparar los tres métodos.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 13, verifica que puedes explicar...",
      items: [
        "Por qué varios agentes sobre los mismos archivos se pisan y cómo lo evita un worktree.",
        "Dónde crea Claude Code los worktrees y cómo se llama su rama.",
        "Por qué debes dejar tu estado base en el remoto antes de usar /batch.",
        "Qué hace /batch, paso a paso, y por qué hay que leer su plan antes de aprobar.",
        "Qué es un conflicto de fusión y cómo se leen sus marcas.",
        "Por qué conservar ambos lados de forma mecánica puede romper el código.",
        "Cómo se quitan worktrees y ramas sin perder trabajo.",
        "Qué ventajas y qué costos tiene /batch frente a hacerlo a mano.",
      ],
    },
    { type: "heading", level: 2, text: "Fuentes consultadas (noviembre 2026)" },
    {
      type: "list",
      items: [
        "[Ejecutar sesiones en paralelo con worktrees](https://code.claude.com/docs/en/worktrees)",
        "[Referencia de comandos: /batch y /tasks](https://code.claude.com/docs/en/commands)",
        "[Gestionar sesiones](https://code.claude.com/docs/en/sessions)",
        "[Ajustes de Claude Code](https://code.claude.com/docs/en/settings)",
        "[Permisos de Claude Code](https://code.claude.com/docs/en/permissions)",
        "[Git: git worktree](https://git-scm.com/docs/git-worktree)",
        "[Git: git merge](https://git-scm.com/docs/git-merge)",
        "[Git: git switch](https://git-scm.com/docs/git-switch)",
        "[Git: git branch](https://git-scm.com/docs/git-branch)",
        "[Node.js: opción --check](https://nodejs.org/api/cli.html)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "¿Por qué tres agentes que editan el mismo archivo en la misma carpeta dan problemas?",
      options: [
        "Porque Git no permite tres agentes",
        "Porque se pisan: uno sobrescribe el trabajo de otro, y cada uno corrige errores que causó el anterior",
        "Porque cada agente usa un modelo distinto",
        "No dan ningún problema",
      ],
      correctIndex: 1,
      explanation: "Al compartir archivos y carpeta, los cambios se sobrescriben y se produce un ciclo de correcciones. Un worktree por agente los aísla.",
    },
    {
      question: "¿Qué es un worktree?",
      options: [
        "Una copia del repositorio en la nube",
        "Una carpeta de trabajo adicional del mismo repositorio, con su propia rama y sus propios archivos",
        "Un tipo de commit",
        "Un archivo de configuración",
      ],
      correctIndex: 1,
      explanation: "Comparte historial y remoto con el repositorio, pero cada worktree tiene sus propios archivos y rama.",
    },
    {
      question: "¿Dónde crea Claude Code los worktrees por defecto?",
      options: [
        "En la carpeta personal",
        "En .claude/worktrees/<nombre>/, con una rama llamada worktree-<nombre>",
        "En /tmp",
        "En el escritorio",
      ],
      correctIndex: 1,
      explanation: "Es la ubicación por defecto. Conviene añadir esa carpeta al .gitignore.",
    },
    {
      question: "Tus cambios recientes están solo en tu rama local. ¿Qué pasa con los worktrees nuevos?",
      options: [
        "Parten de tu rama local",
        "Parten de la rama predeterminada del remoto, así que no llevan tus cambios, salvo que cambies worktree.baseRef a head",
        "Se crean vacíos",
        "Se niegan a crearse",
      ],
      correctIndex: 1,
      explanation: "Por defecto parten de la rama predeterminada del remoto. Sube tu estado base o configura baseRef con head.",
    },
    {
      question: "¿Qué hace /batch después de que apruebas el plan?",
      options: [
        "Nada hasta que reinicies",
        "Lanza un subagente en segundo plano por unidad, cada uno en un worktree aislado",
        "Fusiona todo en main",
        "Borra el repositorio",
      ],
      correctIndex: 1,
      explanation: "Cada subagente implementa su unidad, ejecuta pruebas si las hay y abre un pull request o informa. No fusiona nada en main por ti.",
    },
    {
      question: "¿Por qué se une el trabajo en una rama de integración y no directamente en main?",
      options: [
        "Porque main no existe",
        "Para poder resolver conflictos y probar todo junto sin tocar main hasta que funcione",
        "Porque Git lo exige",
        "Por velocidad",
      ],
      correctIndex: 1,
      explanation: "Si algo sale mal, main queda intacta. Cuando todo funcione, llevas la rama de integración a main.",
    },
    {
      question: "En una marca de conflicto, ¿qué hay entre <<<<<<< HEAD y =======?",
      options: [
        "Lo que entra de la otra rama",
        "Lo que ya había en la rama donde estás",
        "Un comentario",
        "El mensaje del commit",
      ],
      correctIndex: 1,
      explanation: "Arriba está lo que ya hay. Debajo del separador, y hasta la marca de cierre, está lo que entra.",
    },
    {
      question: "Resolviste un conflicto conservando ambos lados y el archivo no carga. ¿Qué pudo pasar?",
      options: [
        "Nada, es normal",
        "Quedó una llave sin cerrar o una función duplicada: conservar ambos lados mecánicamente puede romper el código",
        "El navegador está roto",
        "Git borró el archivo",
      ],
      correctIndex: 1,
      explanation: "Hay que combinar con criterio y comprobar, por ejemplo con node --check game.js y probando el juego.",
    },
    {
      question: "git worktree remove se niega porque hay archivos sin confirmar. ¿Qué haces?",
      options: [
        "Borrar .git",
        "Revisar si ese trabajo importa y, solo si no, usar --force",
        "Reinstalar Git",
        "Ignorarlo para siempre",
      ],
      correctIndex: 1,
      explanation: "Git protege el trabajo sin confirmar. --force lo descarta, así que úsalo solo cuando ya esté unido o no importe.",
    },
    {
      question: "¿Qué costo tiene /batch frente a hacerlo a mano?",
      options: [
        "Ninguno",
        "Menos control sobre cada unidad, muchas preguntas de permisos y más tokens por tener un agente por unidad",
        "Solo funciona con Ollama",
        "No crea ramas",
      ],
      correctIndex: 1,
      explanation: "A cambio de automatizar ramas, commits y pull requests, pierdes visibilidad y gastas más. Por eso conviene conocer las alternativas del Día 13.",
    },
  ],
};
