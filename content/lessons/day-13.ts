import type { Lesson } from "@/lib/types";
// Día 13 · Clases 49, 50 y 51 de la transcripción.
// Contenido verificado en noviembre de 2026.
export const day13: Lesson = {
  day: 13,
  slug: "git-worktrees-y-agentes-en-paralelo",
  title: "Git worktrees y agentes en paralelo",
  section: "Batch y worktrees",
  estimatedMinutes: 65,
  icon: "🌳",
  objectives: [
    "Crear worktrees a mano con git worktree add y entender qué carpeta y qué rama crea cada uno.",
    "Lanzar un Claude Code en cada worktree, repartir los requisitos y revisar cada resultado por separado.",
    "Confirmar el trabajo de cada rama y unirlo en una rama de integración, resolviendo conflictos con criterio.",
    "Quitar worktrees y ramas en el orden correcto, sin perder trabajo.",
    "Decidir cuándo conviene el método manual frente a /batch.",
  ],
  blocks: [
    {
      type: "paragraph",
      text: "El Día 12 dejó que `/batch` hiciera todo. Este día haces lo mismo a mano: eres tú quien crea los worktrees, quien abre un Claude Code en cada uno, quien confirma el trabajo y quien lo une. Es más largo, pero ves y controlas cada etapa, y cuando algo no te convence lo corriges en su sitio. Además, entender el método manual te ayuda a sacar partido a `/batch` y al comando propio del Día 14.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "git worktree add", label: "Crea una carpeta de trabajo y una rama nueva" },
        { value: ".trees/", label: "Carpeta de ejemplo para los worktrees, ignorada en Git" },
        { value: "-b", label: "Opción para elegir el nombre de la rama nueva" },
        { value: "+", label: "Marca en git branch de una rama abierta en otro worktree" },
        { value: "remove", label: "Quita el worktree. Después se borra la rama" },
        { value: "1", label: "Rama como máximo en cada worktree a la vez" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text: "Contenido verificado en noviembre de 2026 contra la documentación de worktrees de Claude Code y la de git worktree. Todo el flujo se ejecutó en un repositorio de prueba con el Tetris del Día 8: crear tres worktrees, editar y confirmar en cada uno, fusionar con conflictos reales y limpiar. Las salidas de los ejercicios de Git son reales, con rutas e identificadores que serán los tuyos. Lo que responde Claude Code es orientativo.",
    },
    { type: "heading", level: 2, text: "Preparar el punto de partida" },
    {
      type: "paragraph",
      text: "Para comparar los dos métodos necesitas el proyecto sin las tres funciones. Si seguiste el Día 12, `main` está como estaba, porque trabajaste en `integracion-batch`. Cámbiate a `main` y crea una rama nueva para esta práctica, con un nombre distinto al del Día 12: `integracion-manual`. Si llegas sin el Tetris, usa el código del Día 8. Ten a mano el archivo `requisitos-batch.md` del Día 12, con los tres requisitos: menú de pausa, mejor puntuación y temas visuales.",
    },
    {
      type: "paragraph",
      text: "Antes de crear nada, decide dónde van los worktrees y haz que Git los ignore. Aquí usarás una carpeta `.trees/` dentro del proyecto. El nombre es libre, y la ventaja de ponerla dentro es que ves de un vistazo qué hay. Sin ignorarla, `git status` muestra `?? .trees/` como archivos nuevos. Otra opción, que usa la documentación de Claude Code, es crearlos fuera del repositorio, por ejemplo en `../tetris-pausa`. Claude Code por su cuenta usa `.claude/worktrees/`.",
    },
    { type: "heading", level: 2, text: "Crear los worktrees" },
    {
      type: "image",
      src: "/img/dia-13/anatomia-worktree-add.svg",
      alt: "El comando git worktree add .trees/pausa produce dos cosas: una carpeta nueva con los archivos del proyecto tal como están ahora, y una rama nueva que se llama como el último tramo de la ruta, pausa. Debajo, reglas: una rama solo puede estar en un worktree a la vez, y hay que ignorar .trees/ antes de crearlos.",
      caption: "Una carpeta y una rama, en un solo comando.",
    },
    {
      type: "paragraph",
      text: "La forma más simple es `git worktree add <ruta>`. Git crea la carpeta, deja en ella los archivos del commit actual y crea una rama nueva con el nombre del último tramo de la ruta: `git worktree add .trees/pausa` crea la rama `pausa`. Si prefieres otro nombre, `-b`: `git worktree add -b rama-x .trees/x`. Para usar una rama que ya existe, la pones detrás de la ruta: `git worktree add .trees/otra rama-existente`. Cada worktree arranca desde el commit donde estás en ese momento, no desde la rama predeterminada del remoto como hace `claude --worktree`. Por eso conviene estar ya en la rama de integración.",
    },
    {
      type: "paragraph",
      text: "Crea tres: pausa, puntuaciones y temas. Con `git worktree list` ves la ruta, el commit y la rama de cada uno, y con `git branch`, las ramas abiertas en otros worktrees se marcan con un signo más. Una rama no puede estar abierta en dos worktrees a la vez: si en la carpeta principal intentas `git switch pausa`, Git responde que esa rama ya la usa un worktree, con su ruta. Eso evita que dos agentes editen la misma rama por error.",
    },
    { type: "heading", level: 2, text: "Un Claude Code en cada carpeta" },
    {
      type: "image",
      src: "/img/dia-13/un-claude-por-worktree.svg",
      alt: "Cuatro terminales: una principal en la rama de integración sin agente, y tres con un claude cada una, en .trees/pausa, .trees/puntuaciones y .trees/temas, cada una con su requisito. Debajo, reglas del reparto y lo que los worktrees comparten.",
      caption: "Cada requisito va a la terminal de su rama.",
    },
    {
      type: "paragraph",
      text: "Abre una terminal por worktree y lanza `claude` en cada una: `cd .trees/pausa && claude`. En VS Code, el menú de la carpeta ofrece abrirla en la terminal integrada, y puedes arrastrarlas para verlas lado a lado. Pega en cada una solo el requisito que le corresponde. Comprueba antes que la rama coincida con el requisito: si le das a la rama `pausa` el requisito de los temas, el resultado no tendrá sentido. Para estar seguro, `git branch --show-current` dentro de la carpeta dice la rama.",
    },
    {
      type: "paragraph",
      text: "Esto equivale a lo que hace `/batch`, pero con chats independientes que tú ves y puedes iterar. Si una tarea requiere plan, usa Shift+Tab en esa terminal. Ningún cambio de un agente choca con otro porque cada uno edita su copia. Hay detalles de lo que comparten: el historial y el remoto, los skills y comandos del proyecto principal si el worktree no tiene los suyos, y los permisos. Si respondes \"sí, y no preguntes más\" a un comando de Bash, la regla se guarda en el `.claude/settings.local.json` del proyecto principal y vale en todos los worktrees, incluso después de quitarlos.",
    },
    {
      type: "callout",
      variant: "info",
      text: "Claude Code bloquea que un agente escriba fuera de su carpeta solo cuando la sesión se inicia con claude --worktree. Si abres Claude dentro de un worktree creado a mano, el aislamiento depende de la carpeta en la que lo abres, y Claude podría editar la copia principal si se lo pides o por error. Revisa en qué carpeta lanzas cada uno. La alternativa es claude --worktree nombre, que crea el worktree por ti en .claude/worktrees/ y, si ya existe uno con ese nombre, lo reabre.",
    },
    { type: "heading", level: 2, text: "Iterar y revisar cada resultado" },
    {
      type: "paragraph",
      text: "Cuando un agente termina, abre el `index.html` de su carpeta y pruébalo. Si no te convence, pídele cambios en esa misma terminal: más niveles en la pausa, un límite de tres letras en el nombre de los récords, otro tema visual. Los demás no se enteran. Es la ventaja de este método sobre `/batch`: sabes qué hace cada carpeta porque la nombraste tú, y corriges en su sitio. A cambio, tú haces el reparto, los commits y la unión.",
    },
    { type: "heading", level: 2, text: "Confirmar cada rama y unir" },
    {
      type: "image",
      src: "/img/dia-13/unir-y-limpiar.svg",
      alt: "Cinco pasos en fila: confirmar en cada rama, unir desde la rama de integración con git merge, comprobar con node --check y probando el juego, quitar los worktrees con git worktree remove, y borrar las ramas con git branch -d. Debajo, por qué importa el orden y qué hacer después.",
      caption: "Se confirma, se une, se comprueba y recién entonces se limpia.",
    },
    {
      type: "paragraph",
      text: "Antes de unir, cada rama necesita un commit: `/batch` los hacía solo, pero aquí los haces tú. Puedes pedírselo a Claude en cada terminal (\"genera un commit con los cambios de esta rama, con un mensaje que los describa\") o ejecutar `git commit -am \"feat: pausa\"` en la carpeta. Lee el mensaje que genera. Para comprobarlo desde fuera, `git log --oneline -2 pausa` muestra el commit nuevo encima del estado base. Sin commit no hay nada que unir, y además `git worktree remove` se niega a quitar un worktree con cambios sin confirmar.",
    },
    {
      type: "paragraph",
      text: "Vuelve a la terminal de la carpeta principal, en la rama de integración, y une las ramas una a una: `git merge pausa`, `git merge puntuaciones`, `git merge temas`. La primera entra limpia, porque la rama de integración no tiene cambios propios. Las siguientes chocan, porque tocaron las mismas líneas. Ya viste en el Día 12 cómo se lee un conflicto. Puedes resolverlos a mano o pedírselo a Claude: pásale los nombres de las ramas y las rutas de `git worktree list`, y especifica que quieres conservar las funciones de las tres, no solo que las una. Si te pregunta por permisos para ejecutar comandos de apoyo, como un `python3 -c` para localizar las marcas de conflicto, apruébalos solo si entiendes lo que hacen.",
    },
    {
      type: "paragraph",
      text: "Comprueba el resultado antes de borrar nada: `node --check game.js` para la sintaxis, y abre el juego para probar a la vez la pausa, los temas y los récords. En esta unión, Claude suele resolver bien los conflictos simples, como dos variables nuevas una tras otra, e incluso integra detalles como juntar dos ventanas. Pero un detalle de integración, como una separación visual que no te gusta, lo ajustas después en la rama de integración con un solo Claude.",
    },
    { type: "heading", level: 2, text: "Limpiar en el orden correcto" },
    {
      type: "paragraph",
      text: "Con todo unido y probado, quita los worktrees: `git worktree remove .trees/pausa` y los demás. Después borra las ramas con `git branch -d pausa puntuaciones temas`. El orden importa: mientras una rama sigue abierta en un worktree, Git se niega a borrarla (`cannot delete branch 'pausa' used by worktree at ...`). Y mientras un worktree tenga cambios sin confirmar, se niega a quitarlo. `-d` borra solo ramas ya fusionadas. La carpeta `.trees` puede quedar vacía: bórrala si quieres. Si borraste una carpeta de worktree a mano, `git worktree prune` limpia la referencia.",
    },
    {
      type: "image",
      src: "/img/dia-13/errores-de-worktrees.svg",
      alt: "Cuatro mensajes de error habituales con su explicación: una rama ya está usada por otro worktree, un worktree contiene archivos sin confirmar, una rama no se puede borrar mientras la use un worktree, y .trees aparece como archivos nuevos si no se ignoró.",
      caption: "Los cuatro errores que verás con más frecuencia.",
    },
    {
      type: "paragraph",
      text: "Si quieres delegar la limpieza, dile a Claude qué worktrees ya no necesitas y que borre también sus ramas. Hará los mismos comandos de Git, con un coste en tokens que tú puedes ahorrarte. Al final, confirma lo que falte y lleva la rama de integración a `main`, con un pull request o una fusión.",
    },
    { type: "heading", level: 2, text: "Ejercicios guiados y experimentos" },
    {
      type: "paragraph",
      text: "Los ejercicios usan el Tetris de los días anteriores. Las salidas de Git las ejecuté en un repositorio de prueba. Lo que haga Claude Code en los ejercicios 5, 6 y 8 es orientativo. Los cálculos de los experimentos del final se ejecutan en el navegador.",
    },
    {
      type: "exercise",
      title: "Ejercicio 1: partir del estado base",
      description: "Vuelve a main y crea una rama de integración nueva.",
      steps: [
        {
          instruction: "Cámbiate a main y comprueba que no tienes las tres funciones del Día 12.",
          command: "cd ~/ClaudeCode/04-tetris && git switch main && git status --short",
          expected: "Switched to branch 'main'\nYour branch is up to date with 'origin/main'.",
        },
        {
          instruction: "Crea la rama donde unirás el trabajo.",
          command: "git switch -c integracion-manual",
          expected: "Switched to a new branch 'integracion-manual'",
        },
      ],
      verify: "Estás en integracion-manual y el juego no tiene pausa, récords ni temas.",
    },
    {
      type: "exercise",
      title: "Ejercicio 2: ignorar la carpeta de worktrees",
      description: "Hazlo antes de crear ninguno.",
      steps: [
        {
          instruction: "Añade la carpeta al .gitignore y confirma el cambio.",
          command: "echo \".trees/\" >> .gitignore && git add .gitignore && git commit -m \"chore: ignorar .trees\"",
          expected: "[integracion-manual abc1234] chore: ignorar .trees\n 1 file changed, 1 insertion(+)",
        },
      ],
      verify: "El .gitignore incluye .trees/. Si ya lo tenías, Git avisa de que no hay cambios.",
    },
    {
      type: "exercise",
      title: "Ejercicio 3: crear los tres worktrees",
      description: "Una carpeta y una rama por requisito.",
      steps: [
        {
          instruction: "Crea el de la pausa.",
          command: "git worktree add .trees/pausa",
          expected: "Preparing worktree (new branch 'pausa')\nHEAD is now at abc1234 chore: ignorar .trees",
        },
        {
          instruction: "Crea los otros dos con la flecha arriba y cambiando el nombre.",
          command: "git worktree add .trees/puntuaciones && git worktree add .trees/temas",
          expected: "Preparing worktree (new branch 'puntuaciones')\nHEAD is now at abc1234 chore: ignorar .trees\nPreparing worktree (new branch 'temas')\nHEAD is now at abc1234 chore: ignorar .trees",
        },
      ],
      verify: "Hay tres carpetas dentro de .trees y tres ramas nuevas.",
    },
    {
      type: "exercise",
      title: "Ejercicio 4: comprobar el estado",
      description: "Mira qué existe y prueba la regla de una rama por worktree.",
      steps: [
        {
          instruction: "Lista los worktrees.",
          command: "git worktree list",
          expected: "/ruta/04-tetris                      abc1234 [integracion-manual]\n/ruta/04-tetris/.trees/pausa         abc1234 [pausa]\n/ruta/04-tetris/.trees/puntuaciones  abc1234 [puntuaciones]\n/ruta/04-tetris/.trees/temas         abc1234 [temas]",
        },
        {
          instruction: "Mira las ramas. Las abiertas en otros worktrees llevan un signo más.",
          command: "git branch",
          expected: "* integracion-manual\n  main\n+ pausa\n+ puntuaciones\n+ temas",
        },
        {
          instruction: "Intenta cambiarte a una de ellas desde la carpeta principal.",
          command: "git switch pausa",
          expected: "fatal: 'pausa' is already used by worktree at '/ruta/04-tetris/.trees/pausa'",
        },
        {
          instruction: "Comprueba que git status sigue limpio.",
          command: "git status --short",
          expected: "(sin salida: .trees está ignorada)",
        },
      ],
      verify: "Entiendes por qué Git no te deja abrir la misma rama en dos sitios.",
    },
    {
      type: "exercise",
      title: "Ejercicio 5: un Claude Code por worktree",
      description: "Reparte los tres requisitos, uno por terminal.",
      steps: [
        {
          instruction: "Abre tres terminales nuevas, una en cada carpeta de .trees, y lanza claude en cada una.",
          command: "cd ~/ClaudeCode/04-tetris/.trees/pausa && claude",
        },
        {
          instruction: "Antes de pegar nada, confirma la rama de cada carpeta.",
          command: "git -C .trees/pausa branch --show-current",
          expected: "pausa",
        },
        {
          instruction: "En cada terminal, pega solo el requisito que le toca de requisitos-batch.md. Lánzalos casi a la vez.",
          expected: "Los tres agentes trabajan a la vez, cada uno sobre su copia, sin pisarse.",
        },
      ],
      verify: "Cada terminal muestra la rama correcta y trabaja en su requisito.",
    },
    {
      type: "exercise",
      title: "Ejercicio 6: iterar y probar cada uno",
      description: "Aprovecha el control que da este método.",
      steps: [
        {
          instruction: "Cuando uno termine, abre el index.html de su carpeta en el navegador y pruébalo.",
          expected: "La pausa muestra su menú, los récords guardan nombres y los temas cambian los colores.",
        },
        {
          instruction: "Pide un ajuste solo a uno de ellos, en su terminal.",
          command: "Limita el nombre del récord a tres letras.",
          expected: "Solo cambia esa rama. Los otros agentes no se enteran.",
        },
      ],
      verify: "Sabes qué hace cada carpeta y puedes corregir una sin tocar las demás.",
    },
    {
      type: "exercise",
      title: "Ejercicio 7: confirmar cada rama",
      description: "Sin commit no hay nada que unir.",
      steps: [
        {
          instruction: "Mira el estado de un worktree con trabajo sin confirmar.",
          command: "git -C .trees/pausa status --short",
          expected: " M game.js\n M index.html",
        },
        {
          instruction: "Comprueba que Git no te deja quitarlo así.",
          command: "git worktree remove .trees/pausa",
          expected: "fatal: '.trees/pausa' contains modified or untracked files, use --force to delete it",
        },
        {
          instruction: "Pide a Claude el commit en cada terminal, o hazlo tú. Lee el mensaje.",
          command: "git -C .trees/pausa commit -am \"feat: menú de pausa con la tecla P\"",
          expected: "[pausa abc1234] feat: menú de pausa con la tecla P\n 2 files changed, 4 insertions(+), 2 deletions(-)",
        },
        {
          instruction: "Comprueba el commit desde la carpeta principal.",
          command: "git log --oneline -2 pausa",
          expected: "abc1234 feat: menú de pausa con la tecla P\ndef5678 chore: ignorar .trees",
        },
      ],
      verify: "Las tres ramas tienen un commit con un mensaje fiel. Repite para puntuaciones y temas.",
    },
    {
      type: "exercise",
      title: "Ejercicio 8: unir y comprobar",
      description: "Une desde la rama de integración y resuelve los conflictos.",
      steps: [
        {
          instruction: "En la carpeta principal, une la primera rama. Entra sin conflicto.",
          command: "git merge pausa",
          expected: "Updating def5678..abc1234\nFast-forward\n game.js    | 2 ++\n index.html | 2 +-\n 2 files changed, 3 insertions(+), 1 deletion(-)",
        },
        {
          instruction: "Une la segunda. Habrá conflicto, porque las dos tocan las mismas líneas.",
          command: "git merge puntuaciones",
          expected: "Auto-merging game.js\nCONFLICT (content): Merge conflict in game.js\nAutomatic merge failed; fix conflicts and then commit the result.",
        },
        {
          instruction: "Abre Claude Code aquí y pídele que resuelva los conflictos conservando las funciones de las tres ramas. Dale los nombres de las ramas.",
          command: "Une las ramas pausa, puntuaciones y temas en integracion-manual, resolviendo los conflictos. Quiero conservar las tres funciones, no solo juntar el código. Explícame cada resolución.",
          expected: "Claude resuelve cada conflicto, hace los commits de la unión y resume lo que combinó.",
        },
        {
          instruction: "Comprueba la sintaxis y prueba las tres funciones juntas en el navegador.",
          command: "node --check game.js",
          expected: "(sin salida: la sintaxis es válida)",
        },
      ],
      verify: "No quedan marcas de conflicto y el juego tiene pausa, récords y temas a la vez.",
    },
    {
      type: "exercise",
      title: "Ejercicio 9: limpiar worktrees y ramas",
      description: "En el orden que Git exige.",
      steps: [
        {
          instruction: "Intenta borrar una rama que sigue abierta en un worktree.",
          command: "git branch -d pausa",
          expected: "error: cannot delete branch 'pausa' used by worktree at '/ruta/04-tetris/.trees/pausa'",
        },
        {
          instruction: "Quita los tres worktrees y comprueba que solo queda el principal.",
          command: "git worktree remove .trees/pausa && git worktree remove .trees/puntuaciones && git worktree remove .trees/temas && git worktree list",
          expected: "/ruta/04-tetris  abc1234 [integracion-manual]",
        },
        {
          instruction: "Ahora borra las ramas, que ya están fusionadas.",
          command: "git branch -d pausa puntuaciones temas",
          expected: "Deleted branch pausa (was abc1234).\nDeleted branch puntuaciones (was def5678).\nDeleted branch temas (was 9abcdef).",
        },
        {
          instruction: "Comprueba las ramas que quedan.",
          command: "git branch",
          expected: "* integracion-manual\n  main",
        },
      ],
      verify: "Solo quedan main y la rama de integración. La carpeta .trees puede estar vacía.",
    },
    {
      type: "playground",
      title: "Experimento 10: la rama que crea worktree add",
      description: "Sin -b, la rama se llama como el último tramo de la ruta. Calcúlala para tres rutas y añade la tuya.",
      code: `function ramaPorDefecto(ruta) {
  const partes = ruta.split("/").filter(Boolean);
  return partes[partes.length - 1];
}

const rutas = [".trees/pausa", ".trees/puntuaciones", "../tetris-temas"];
rutas.forEach((r) => console.log("git worktree add " + r + " -> rama " + ramaPorDefecto(r)));
console.log("con -b rama-x .trees/x -> rama rama-x");`,
      expected: "git worktree add .trees/pausa -> rama pausa\ngit worktree add .trees/puntuaciones -> rama puntuaciones\ngit worktree add ../tetris-temas -> rama tetris-temas\ncon -b rama-x .trees/x -> rama rama-x",
    },
    {
      type: "playground",
      title: "Experimento 11: una rama, un worktree",
      description: "Git no deja abrir una rama que otro worktree ya usa. Simula la comprobación con tres worktrees y dos intentos de cambio. Prueba con otros nombres.",
      code: `const worktrees = [
  { ruta: "/p/04-tetris", rama: "integracion-manual" },
  { ruta: "/p/04-tetris/.trees/pausa", rama: "pausa" },
  { ruta: "/p/04-tetris/.trees/temas", rama: "temas" },
];

function cambiarA(rama) {
  const usado = worktrees.find((w) => w.rama === rama);
  if (usado) return "fatal: '" + rama + "' is already used by worktree at '" + usado.ruta + "'";
  return "Switched to branch '" + rama + "'";
}

console.log(cambiarA("pausa"));
console.log(cambiarA("nueva"));`,
      expected: "fatal: 'pausa' is already used by worktree at '/p/04-tetris/.trees/pausa'\nSwitched to branch 'nueva'",
    },
    {
      type: "playground",
      title: "Experimento 12: qué uniones chocarán",
      description: "Al unir en orden, una rama choca si toca un archivo que ya tocó otra unida antes. Calcula qué uniones tendrán conflicto con estos tres trabajos. Cambia los archivos.",
      code: `const unidades = [
  { nombre: "pausa", archivos: ["game.js", "index.html"] },
  { nombre: "puntuaciones", archivos: ["game.js", "index.html"] },
  { nombre: "temas", archivos: ["game.js", "index.html", "temas.css"] },
];

const unidos = new Set();
for (const u of unidades) {
  const choques = u.archivos.filter((a) => unidos.has(a));
  console.log(u.nombre + ": " + (choques.length ? "conflicto en " + choques.join(", ") : "sin conflicto"));
  u.archivos.forEach((a) => unidos.add(a));
}`,
      expected: "pausa: sin conflicto\npuntuaciones: conflicto en game.js, index.html\ntemas: conflicto en game.js, index.html",
    },
    {
      type: "playground",
      title: "Experimento 13: plan de limpieza",
      description: "Decide qué hacer con cada worktree según tenga cambios sin confirmar o commits sin fusionar. Cambia los estados.",
      code: `const worktrees = [
  { nombre: "pausa", sinConfirmar: false, fusionada: true },
  { nombre: "puntuaciones", sinConfirmar: true, fusionada: true },
  { nombre: "temas", sinConfirmar: false, fusionada: false },
];

for (const w of worktrees) {
  let accion;
  if (!w.fusionada) accion = "no borrar: tiene commits sin fusionar";
  else if (w.sinConfirmar) accion = "revisar y, si no importa, git worktree remove --force";
  else accion = "git worktree remove y después git branch -d";
  console.log(w.nombre + ": " + accion);
}`,
      expected: "pausa: git worktree remove y después git branch -d\npuntuaciones: revisar y, si no importa, git worktree remove --force\ntemas: no borrar: tiene commits sin fusionar",
    },
    { type: "heading", level: 2, text: "¿Qué usar en cada caso?" },
    {
      type: "table",
      headers: ["Si necesitas...", "Usa...", "Nota"],
      rows: [
        ["Crear un worktree con su rama", "`git worktree add ruta`", "La rama se llama como el último tramo de la ruta."],
        ["Elegir el nombre de la rama", "`git worktree add -b nombre ruta`", "La carpeta y la rama pueden llamarse distinto."],
        ["Usar una rama que ya existe", "`git worktree add ruta rama`", "Esa rama no puede estar abierta en otro worktree."],
        ["Ver todos los worktrees", "`git worktree list`", "Ruta, commit y rama."],
        ["Saber la rama de una carpeta", "`git -C ruta branch --show-current`", "Útil antes de pegar un requisito."],
        ["Que Claude cree y aísle el worktree", "`claude --worktree nombre`", "Va a `.claude/worktrees/` y bloquea escrituras fuera."],
        ["Unir el trabajo", "`git merge` desde la rama de integración", "Una rama cada vez."],
        ["Quitar un worktree", "`git worktree remove ruta`", "Falla si hay cambios sin confirmar."],
        ["Borrar la rama después", "`git branch -d nombre`", "Solo si está fusionada y ya sin worktree."],
        ["Limpiar una carpeta borrada a mano", "`git worktree prune`", "Quita las referencias huérfanas."],
      ],
    },
    { type: "heading", level: 2, text: "Datos que suelen aparecer desactualizados" },
    {
      type: "table",
      headers: ["Suele decirse", "Información verificada (noviembre 2026)"],
      rows: [
        ["Para ver las ramas se usa git branch -a con la letra a.", "Las ramas abiertas en otros worktrees se marcan con un signo más en `git branch`. Con `-a` se añaden las remotas."],
        ["Una rama puede abrirse en dos worktrees.", "No. Git responde que la rama ya la usa un worktree, con su ruta."],
        ["Se puede lanzar Claude en el worktree y quedará aislado.", "El bloqueo de escrituras fuera del worktree solo se aplica si inicias la sesión con `claude --worktree`. En un worktree creado a mano, depende de dónde abres Claude."],
        ["Los worktrees de git worktree add parten de main.", "Parten del commit donde estás. Los de `claude --worktree` parten de la rama predeterminada del remoto."],
        ["Los permisos de un worktree son independientes.", "Un permiso permanente de Bash se guarda en el `.claude/settings.local.json` del proyecto principal y vale en todos los worktrees."],
        ["Borrar la carpeta del worktree basta.", "Deja referencias. Usa `git worktree remove`, o `git worktree prune` si ya la borraste."],
        ["Se puede borrar una rama sin quitar su worktree.", "Git se niega: primero quita el worktree."],
        ["Los commits los hace solo cada agente.", "Con este método, tú o Claude en cada terminal los confirmáis. `/batch` los hacía automáticamente."],
        ["git checkout -b crea la rama de integración.", "Funciona, pero `git switch -c` es más claro."],
      ],
    },
    { type: "heading", level: 2, text: "Preguntas frecuentes" },
    {
      type: "accordion",
      items: [
        {
          title: "¿Es obligatorio llamar a la carpeta .trees?",
          text: "No. Puede llamarse como quieras o estar fuera del proyecto, por ejemplo en `../tetris-pausa`. Lo único importante es que, si queda dentro, la ignores en el .gitignore.",
        },
        {
          title: "¿Qué pasa si un agente tarda más que los otros?",
          text: "Nada: cada worktree es independiente. Une las ramas que ya estén listas y deja la lenta para el final, o espera a que termine.",
        },
        {
          title: "¿Puedo lanzar dos Claude en el mismo worktree?",
          text: "Puedes, pero volverías al problema original: dos agentes editando los mismos archivos. Usa un worktree por agente.",
        },
        {
          title: "¿Y si borré un worktree a mano?",
          text: "Ejecuta `git worktree prune` en el repositorio principal para limpiar las referencias que quedaron.",
        },
        {
          title: "¿Cuándo prefiero este método a /batch?",
          text: "Cuando quieres nombres claros, poder iterar cada resultado por separado y controlar cuándo se confirma y se une. Cuando solo quieres delegar y revisar al final, /batch ahorra pasos.",
        },
        {
          title: "¿Y si las ramas no chocan?",
          text: "Entonces la unión es trivial y Git la hace sola. Los worktrees valen igual, porque aíslan el trabajo mientras ocurre.",
        },
      ],
    },
    { type: "heading", level: 2, text: "Qué sigue" },
    {
      type: "paragraph",
      text: "El Día 14 automatiza lo que acabas de hacer, a medias: un comando personalizado `/worktree` que crea la rama y el worktree por ti y deja que decidas el resto. Antes, ten a mano los comandos de este día, porque el comando propio ejecuta justo esos pasos, y deja el Tetris en `main` sin las tres funciones para repetir el ejercicio por tercera vez.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 14, verifica que puedes explicar...",
      items: [
        "Qué crea git worktree add y cómo se elige el nombre de la rama.",
        "Por qué una rama no puede estar abierta en dos worktrees a la vez.",
        "Por qué hay que ignorar la carpeta de worktrees antes de crearlos.",
        "Cómo repartes un requisito por terminal y compruebas la rama de cada una.",
        "Qué comparten los worktrees y cuándo Claude Code aísla las escrituras.",
        "Por qué cada rama necesita un commit antes de unirse.",
        "El orden de limpieza: primero worktree remove y después branch -d.",
        "Qué ganas y qué pierdes frente a /batch.",
      ],
    },
    { type: "heading", level: 2, text: "Fuentes consultadas (noviembre 2026)" },
    {
      type: "list",
      items: [
        "[Ejecutar sesiones en paralelo con worktrees](https://code.claude.com/docs/en/worktrees)",
        "[Git: git worktree](https://git-scm.com/docs/git-worktree)",
        "[Git: git merge](https://git-scm.com/docs/git-merge)",
        "[Git: git switch](https://git-scm.com/docs/git-switch)",
        "[Git: git branch](https://git-scm.com/docs/git-branch)",
        "[Git: gitignore](https://git-scm.com/docs/gitignore)",
        "[Referencia de comandos de Claude Code](https://code.claude.com/docs/en/commands)",
        "[Permisos de Claude Code](https://code.claude.com/docs/en/permissions)",
        "[Node.js: opción --check](https://nodejs.org/api/cli.html)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "¿Qué crea git worktree add .trees/pausa?",
      options: [
        "Solo una carpeta",
        "Una carpeta con los archivos del commit actual y una rama nueva llamada pausa",
        "Un clon en la nube",
        "Un tag",
      ],
      correctIndex: 1,
      explanation: "Crea la carpeta, deja en ella los archivos del commit actual y una rama nueva con el nombre del último tramo de la ruta.",
    },
    {
      question: "¿Cómo eliges un nombre de rama distinto al de la carpeta?",
      options: [
        "No se puede",
        "Con la opción -b: git worktree add -b nombre ruta",
        "Renombrando la carpeta después",
        "Con git rename",
      ],
      correctIndex: 1,
      explanation: "La opción -b indica el nombre de la rama nueva, independientemente de la ruta.",
    },
    {
      question: "Intentas cambiarte a una rama que otro worktree tiene abierta. ¿Qué pasa?",
      options: [
        "Se cambia sin problema",
        "Git avisa de que esa rama ya la usa un worktree y muestra su ruta",
        "Se borra el otro worktree",
        "Se crea una copia",
      ],
      correctIndex: 1,
      explanation: "Una rama solo puede estar abierta en un worktree a la vez. Eso protege contra editar la misma rama desde dos sitios.",
    },
    {
      question: "¿Por qué se añade .trees/ al .gitignore antes de crear los worktrees?",
      options: [
        "Porque Git lo exige",
        "Para que no aparezcan como archivos nuevos en git status",
        "Para que Claude los vea",
        "Para acelerarlos",
      ],
      correctIndex: 1,
      explanation: "Sin ignorar la carpeta, git status muestra ?? .trees/ como archivos sin seguimiento.",
    },
    {
      question: "Lanzas claude dentro de un worktree creado a mano. ¿Qué aislamiento tienes?",
      options: [
        "Bloqueo total de escrituras fuera del worktree",
        "El que da la carpeta donde lo abres: el bloqueo automático solo se aplica con claude --worktree",
        "Ninguna, porque Claude no usa carpetas",
        "Solo lectura",
      ],
      correctIndex: 1,
      explanation: "La documentación indica que la sesión queda aislada si se inicia con --worktree. En un worktree creado a mano, depende de dónde abres Claude.",
    },
    {
      question: "¿Qué debes hacer en cada rama antes de unirla?",
      options: [
        "Borrarla",
        "Confirmar el trabajo con un commit",
        "Cerrar Claude",
        "Renombrarla",
      ],
      correctIndex: 1,
      explanation: "Solo se une lo que está confirmado. Además, git worktree remove se niega a quitar un worktree con cambios sin confirmar.",
    },
    {
      question: "¿Desde qué rama y en qué orden se hacen las uniones?",
      options: [
        "Desde cualquier worktree, todas a la vez",
        "Desde la carpeta principal, en la rama de integración, una rama cada vez",
        "Desde main directamente",
        "No se pueden unir",
      ],
      correctIndex: 1,
      explanation: "Unir en una rama de integración deja main intacta. Las primeras uniones suelen entrar limpias y las siguientes chocan si tocan las mismas líneas.",
    },
    {
      question: "Quieres borrar la rama pausa, pero sigue abierta en un worktree. ¿Qué haces?",
      options: [
        "Usar -D siempre",
        "Quitar primero el worktree con git worktree remove y luego borrar la rama",
        "Borrar la carpeta a mano",
        "Reiniciar el equipo",
      ],
      correctIndex: 1,
      explanation: "Git se niega a borrar una rama usada por un worktree. El orden es: quitar el worktree y después git branch -d.",
    },
    {
      question: "Borraste la carpeta de un worktree a mano. ¿Qué comando limpia las referencias?",
      options: ["git clean", "git worktree prune", "git reset", "git gc --all"],
      correctIndex: 1,
      explanation: "git worktree prune elimina la información administrativa de los worktrees cuya carpeta ya no existe.",
    },
    {
      question: "¿Qué ventaja da el método manual sobre /batch?",
      options: [
        "Es más rápido siempre",
        "Control: nombras cada carpeta, iteras cada resultado por separado y decides cuándo confirmar y unir",
        "Gasta menos tokens siempre",
        "No necesita Git",
      ],
      correctIndex: 1,
      explanation: "A cambio de hacer tú el reparto, los commits y la unión, sabes qué hace cada carpeta y corriges en su sitio.",
    },
  ],
};
