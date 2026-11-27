import type { Lesson } from "@/lib/types";
// Día 23 · Clases 81, 82, 83 y 84 de la transcripción.
// Contenido verificado en noviembre de 2026.
export const day23: Lesson = {
  day: 23,
  slug: "integrar-el-mvp-y-la-tarea-de-la-pagina-de-inicio",
  title: "Integrar el MVP y la tarea de la página de inicio",
  section: "Skills y Playwright MCP",
  estimatedMinutes: 95,
  icon: "🚦",
  objectives: [
    "Ignorar las capturas de Playwright conservando su carpeta con un archivo .gitkeep, y entender por qué el patrón importa.",
    "Llevar el spec del MVP a main con un pull request, y saber qué pasa si lo cierras o si borras la rama.",
    "Resolver una tarea completa con el flujo de specs: plantillas, spec, implementación y pull request.",
    "Mover una página con git mv, actualizar sus enlaces y comprobar que no queda ninguno apuntando al sitio equivocado.",
    "Decidir qué comandos aprueba Claude Code de forma permanente y cuáles se deniegan.",
  ],
  blocks: [
    {
      type: "paragraph",
      text: "Con el MVP implementado, esta lección hace dos cosas. Primero cierra el trabajo del Día 22: ordena las capturas de Playwright, publica la rama del spec, la integra por pull request y deja main al día. Después propone una tarea para hacer sin ayuda y la resuelve completa: la página de inicio de Arcade Vault, con su spec, su implementación y su propio pull request. La parte nueva del flujo es pequeña. Lo valioso es repetirlo con otra funcionalidad y ver qué se mantiene igual.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "9", label: "Commits de la rama del spec 002" },
        { value: "42", label: "Comprobaciones del script de rutas tras el spec 002" },
        { value: "10", label: "Criterios de aceptación del spec 002" },
        { value: "2", label: "Enlaces que siguen apuntando a la raíz: el logo y Inicio" },
        { value: "4", label: "Enlaces de la cabecera nueva" },
        { value: ".gitkeep", label: "Archivo vacío que conserva la carpeta de capturas" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text: "Contenido verificado en noviembre de 2026. Partí del proyecto del Día 22 y ejecuté todo el flujo con un remoto local que hace de GitHub: el patrón de .gitignore, el pull request simulado, el git mv, la implementación del spec 002 con un commit por paso, el script de rutas y la medida de la página contra su plantilla en dos anchos. Las salidas de los ejercicios son reales. No pude probar Claude Code ni la interfaz de GitHub: los comandos de Claude de los ejercicios 4, 5, 6 y 7 y los pasos de GitHub de los ejercicios 2 y 8 son orientativos. Las plantillas de la tarea no vienen de ningún sitio externo: las escribí para esta lección.",
    },
    { type: "heading", level: 2, text: "Capturas fuera de Git, carpeta dentro" },
    {
      type: "paragraph",
      text: "El Día 22 dejó `.playwright-screenshots/` ignorada entera. Es lo correcto para las capturas, que son temporales, pero tiene un inconveniente: Git guarda archivos, no carpetas, y una carpeta que no contiene nada versionado no llega al repositorio. Quien clone el proyecto no tendrá la carpeta donde el servidor MCP debe dejar sus archivos. La solución habitual es un archivo vacío dentro, que por convención se llama `.gitkeep`. No es una función de Git, sino un nombre acordado: podría llamarse de cualquier otra forma.",
    },
    {
      type: "image",
      src: "/img/dia-23/gitignore-y-gitkeep.svg",
      alt: "Dos casos. A la izquierda, ignorar la carpeta entera con la línea .capturas barra, seguida de una excepción para .gitkeep: Git ni mira dentro de una carpeta ignorada, así que la excepción no tiene efecto, ambos archivos quedan ignorados y la carpeta no llega al repositorio. A la derecha, ignorar el contenido con la línea .capturas barra asterisco y la misma excepción: se ignoran los archivos de dentro y la excepción sí puede rescatar uno, de modo que .gitkeep se guarda, inicio.png sigue ignorado y la carpeta llega con su archivo vacío. Debajo, una nota: Git guarda archivos y no carpetas, y .gitkeep es solo una convención.",
      caption: "Para rescatar un archivo hay que ignorar el contenido, no la carpeta.",
    },
    {
      type: "paragraph",
      text: "La diferencia entre las dos formas está en la barra final. `carpeta/` ignora la carpeta, y Git no examina lo que hay dentro, así que una excepción como `!carpeta/.gitkeep` no puede rescatar nada. `carpeta/*` ignora lo que contiene, y entonces la excepción sí funciona. Lo comprobé con Git real en las dos configuraciones, y el experimento 9 reproduce el resultado. Para `.playwright-mcp/`, que no necesita carpeta preexistente, basta ignorarla entera.",
    },
    { type: "heading", level: 2, text: "Del MVP a main" },
    {
      type: "paragraph",
      text: "La rama `spec/001-mvp-arcade-vault` tiene el spec, su implementación y el spec en estado implementado. Falta llevarla a main, y eso solo se hace por pull request. En esta lección el estado del spec ya es el correcto, porque el Día 22 lo dejó cerrado dentro de la propia rama. Merece la pena pararse en por qué es importante: quien revisa un pull request lee primero el spec para saber qué se prometió, y su estado le dice si la promesa se dio por cumplida. Si el pull request llega con el spec aún en aprobado, hay que corregirlo en la misma rama, y cada commit nuevo se suma al pull request abierto.",
    },
    {
      type: "image",
      src: "/img/dia-23/ciclo-del-pull-request.svg",
      alt: "Cinco recuadros en fila: uno, publicar la rama del spec con git push -u origin; dos, abrir el pull request de la rama a main con el spec dentro; tres, revisión, donde alguien lee el spec y comprueba el estado; cuatro, integrar con el botón de merge y borrar la rama remota; cinco, limpiar con git switch main, git pull --prune y git branch -d. Debajo, a la izquierda, lo que debe cumplirse antes de abrir el pull request: el estado del spec es implementado, lint y build pasan, no hay cambios sin guardar y la rama está publicada; si falta algo se corrige en la misma rama. A la derecha, qué pasa si cierras el pull request: tus commits siguen en tu copia local, si además borras la rama remota Git la marca como gone en git branch -vv, un git push desde la terminal la vuelve a crear y abres un pull request nuevo.",
      caption: "Cinco pasos, y una lista corta antes del primero.",
    },
    {
      type: "paragraph",
      text: "En el video, el pull request se cierra a propósito porque el spec no estaba marcado como implementado. Después se cambia el estado, se vuelve a subir la rama y se abre otro. Es una buena lección sobre la revisión, y deja una duda práctica: qué pasa con una rama cuyo pull request se cerró y cuya rama remota se borró. Lo probé con Git en la terminal y no hay ningún error. Git marca la rama local como `gone` en `git branch -vv`, y un `git push` la vuelve a crear en el remoto sin más. Si tu editor da un error en ese punto, es de su interfaz: la terminal lo resuelve con un comando.",
    },
    {
      type: "paragraph",
      text: "Para integrar, vale lo que se vio en el Día 20. Con un merge commit, `git branch -d` borra la rama local sin protestar. Con squash o con rebase, Git no reconoce la rama como integrada y exige `-D`. Después de integrar, `git pull --prune` trae los cambios y elimina las referencias a ramas remotas que ya no existen. Y el comando de limpieza no cambia: `git switch main` y `git pull`. Algunos tutoriales usan `git checkout main` con el mismo resultado; `switch` es la forma más nueva y hace una sola cosa.",
    },
    { type: "heading", level: 2, text: "La tarea: una página de inicio" },
    {
      type: "paragraph",
      text: "Hasta ahora, `/` muestra la galería de juegos. Un visitante nuevo debería ver otra cosa: qué es Arcade Vault, por qué usarlo y qué juegos hay. La galería pasa a `/juegos`, que hoy responde 404 aunque sea el prefijo de la previsualización. La tarea consiste en hacerlo con el flujo completo: una rama, el material de diseño en `references`, un spec, la implementación por pasos y un pull request.",
    },
    {
      type: "image",
      src: "/img/dia-23/de-galeria-a-inicio.svg",
      alt: "Un cuadro Antes y otro Después, unidos por una flecha con el texto git mv. Antes: la raíz es la galería de juegos, la ruta juegos da 404, juegos con un identificador es la previsualización, y la cabecera tiene tres enlaces. Después: la raíz es la página de inicio, juegos es la galería, juegos con un identificador sigue siendo la previsualización, y la cabecera tiene cuatro enlaces. Debajo, dos recuadros. A la izquierda, los enlaces que se actualizan, que son el enlace Juegos de la cabecera y el botón Volver de la previsualización, y los que se quedan en la raíz, que son el logo y el nuevo enlace Inicio; se comprueba con grep antes del commit. A la derecha, lo que queda fuera del spec: la página Acerca de tiene plantilla en references pero no se implementa, por lo que la ruta acerca-de debe responder 404 hasta que llegue su propio spec.",
      caption: "Qué cambia con el spec 002, y qué se deja fuera a propósito.",
    },
    {
      type: "paragraph",
      text: "Hay una trampa de alcance a propósito. El material de diseño incluye la plantilla de la página Acerca de, aunque el spec no debe implementarla. Tener el material a mano no la mete en el alcance, y es muy fácil que un agente la construya porque la ve. Por eso el spec lo dice en su sección No entra, y por eso hay un criterio que comprueba que `/acerca-de` responde 404. Si se cuela, la rama se descarta y se rehace, porque deshacer un alcance mezclado cuesta más que empezar de nuevo.",
    },
    {
      type: "paragraph",
      text: "Las plantillas son las mismas que usó la lección anterior. La hoja de estilos compartida está en `references/templates/styles.css`, y la página de inicio, la de Acerca de y una hoja con los estilos nuevos van en una subcarpeta propia. Cuando una referencia deja de hacer falta se puede borrar, y así se reduce lo que Claude lee sin necesidad. Aquí se conservan, porque el spec de la página Acerca de las usará.",
    },
    {
      type: "paragraph",
      text: "El `/spec` pregunta antes de escribir, y sus preguntas conviene contestarlas con pocas palabras, porque cada respuesta se suma al contexto. Estas son las decisiones que salieron, y que quedaron en el spec con su motivo.",
    },
    {
      type: "table",
      headers: ["Decisión", "Elegida", "Motivo"],
      rows: [
        ["Dónde va la galería", "En /juegos", "Es el prefijo de la previsualización, y deja de dar 404."],
        ["Qué apunta a la raíz", "El logo y el enlace Inicio", "El resto de enlaces a la galería pasan a /juegos."],
        ["De dónde salen los juegos de las tarjetas pequeñas", "De JUEGOS, en app/data/juegos.ts", "Para no duplicar datos."],
        ["Actividad en vivo", "Descartada", "Necesita datos que todavía no existen."],
        ["JavaScript de cliente", "Ninguno nuevo", "La página es un componente de servidor."],
        ["Página Acerca de", "Fuera del alcance", "Se hará en otro spec."],
      ],
    },
    { type: "heading", level: 2, text: "Implementar sin perder el hilo" },
    {
      type: "paragraph",
      text: "El spec 002 se implementa con las mismas reglas del Día 22: un paso, un commit, tu revisión. Lo que cambia es lo que conviene mirar. En el primer paso, Claude mueve la galería con `git mv`. Es lo que debe hacer, y conviene entender por qué. Git no guarda renombrados como tales: detecta que un archivo desapareció de un sitio y apareció en otro con un contenido casi igual. Aun así, la historia no se pierde. Con `git log --follow` sobre el archivo nuevo se ven sus commits de antes del cambio, que en este proyecto llegan hasta el primero. Es más exacto que decir que `git mv` mueve la historia.",
    },
    {
      type: "paragraph",
      text: "El segundo paso es el que más fácil se hace mal, porque nadie lo ve: actualizar enlaces. La comprobación no es mirar la página, sino buscar. Un `grep` de los destinos que apuntan a `/` en el código debe devolver solo el logo. Los demás, el enlace Juegos de la cabecera y el botón Volver, ya apuntan a `/juegos`. El enlace Inicio nuevo escribe su destino dentro de una lista de datos, por eso no aparece en esa búsqueda. En la rama intermedia, tras el primer paso, el enlace Juegos todavía apunta a una ruta que ahora da 404. Es lo esperado entre dos commits, y la razón de que el paso 2 vaya inmediatamente después.",
    },
    {
      type: "paragraph",
      text: "El script de rutas cambia con el spec. La cabecera pasa de tres enlaces a cuatro, así que la comprobación de la lección anterior ya no vale. Un spec nuevo puede sustituir un criterio de uno anterior, y lo correcto es decirlo en el spec y actualizar la comprobación, en lugar de dejarla fallando o relajarla en silencio. Aquí el script también comprueba que solo el logo y Inicio apuntan a la raíz, y que `/acerca-de` responde 404.",
    },
    { type: "heading", level: 3, text: "Qué aprobar y qué denegar" },
    {
      type: "paragraph",
      text: "Cada vez que Claude te pide permiso para un comando, puedes aprobarlo una vez o elegir que no te lo vuelva a pedir. En el segundo caso, la regla se guarda en `.claude/settings.local.json`, en la raíz del repositorio. Ese archivo es tuyo: Claude Code lo mantiene fuera de Git al crearlo. Vale la pena leerlo de vez en cuando, y borrar lo que ya no quieras. Los comandos de solo lectura, como `grep` o `sed -n`, son una buena opción para aprobar de forma permanente. Los que modifican algo fuera del proyecto, leen variables de entorno o borran, es mejor que sigan preguntando, o denegarlos.",
    },
    {
      type: "code",
      lang: "json",
      title: ".claude/settings.json, un ejemplo de permisos del proyecto",
      code: `{
  "permissions": {
    "allow": [
      "Bash(npm run *)",
      "Bash(git commit *)"
    ],
    "deny": [
      "Bash(git push *)",
      "Read(./.env)"
    ]
  }
}`,
    },
    {
      type: "paragraph",
      text: "Si no reconoces un comando, investígalo antes de aprobarlo. `sed -n 90,98p archivo` imprime solo las líneas 90 a 98, y `echo ---` sirve de separador entre dos salidas. Ninguno de los dos modifica nada. Preguntarlo a otra herramienta o al propio Claude cuesta segundos, y con el tiempo reconoces los comandos habituales. El experimento 10 reproduce lo que hace `sed -n`.",
    },
    {
      type: "paragraph",
      text: "Una última decisión de método: pedirle a Claude que abra siempre Playwright al terminar un cambio de interfaz, o pedírselo cuando lo necesites. Lo primero asegura la comprobación y gasta tiempo y contexto en cambios triviales. Lo segundo exige acordarse. Puedes ponerlo como una línea en CLAUDE.md, pero ten claro que es una instrucción que Claude puede pasar por alto. Si algo debe pasar siempre, es un trabajo para un hook, que se verá más adelante.",
    },
    { type: "heading", level: 2, text: "Ejercicios guiados y experimentos" },
    {
      type: "paragraph",
      text: "Los ejercicios 1, 3, 5, 6 y la parte de Git de los ejercicios 2, 4, 7 y 8 se ejecutan con Git, Node y Next.js, y sus salidas son reales. Los comandos de Claude (`/spec` y `/spec-impl`) y los pasos de GitHub, en los ejercicios 2, 4 a 8, son orientativos. Si tu Claude escribe el código, la referencia sirve para comparar. Los experimentos del final se ejecutan en el navegador.",
    },
    {
      type: "exercise",
      title: "Ejercicio 1: capturas fuera de Git, carpeta dentro",
      description: "Cambia el patrón de .gitignore y comprueba el resultado.",
      steps: [
        {
          instruction: "Estás en la rama del spec 001. Quita la línea que ignora la carpeta entera y añade las dos que ignoran su contenido salvo .gitkeep.",
          command: "cd ~/ClaudeCode/06-arcade-vault && grep -v '^\\.playwright-screenshots/$' .gitignore > .gitignore.nuevo && mv .gitignore.nuevo .gitignore && printf '%s\\n' '.playwright-screenshots/*' '!.playwright-screenshots/.gitkeep' >> .gitignore && tail -4 .gitignore",
          expected: "next-env.d.ts\n.playwright-mcp/\n.playwright-screenshots/*\n!.playwright-screenshots/.gitkeep",
        },
        {
          instruction: "Crea la carpeta con el archivo vacío y una captura de prueba. Mira qué ve Git.",
          command: "mkdir -p .playwright-screenshots && touch .playwright-screenshots/.gitkeep .playwright-screenshots/inicio.png && git status --porcelain",
          expected: " M .gitignore\n?? .playwright-screenshots/",
        },
        {
          instruction: "Pregunta a Git qué archivos ignora. Solo debe nombrar la captura.",
          command: "git check-ignore .playwright-screenshots/inicio.png .playwright-screenshots/.gitkeep",
          expected: ".playwright-screenshots/inicio.png",
        },
        {
          instruction: "Guarda el cambio, con el archivo vacío incluido.",
          command: "git add .gitignore .playwright-screenshots/.gitkeep && git commit -q -m \"chore: carpeta de capturas con .gitkeep y el resto ignorado\" && git log --format=%s -1",
          expected: "chore: carpeta de capturas con .gitkeep y el resto ignorado",
        },
      ],
      verify: "Git ignora la captura y guarda el .gitkeep. Si ignoraras la carpeta entera, con una línea que termina en barra, check-ignore nombraría también el .gitkeep.",
    },
    {
      type: "exercise",
      title: "Ejercicio 2: publicar e integrar el MVP",
      description: "Publica la rama, prueba qué pasa si su remota se borra, e intégrala.",
      steps: [
        {
          instruction: "Publica la rama del spec 001.",
          command: "git push -u origin spec/001-mvp-arcade-vault 2>&1 | tail -1",
          expected: "branch 'spec/001-mvp-arcade-vault' set up to track 'origin/spec/001-mvp-arcade-vault'.",
        },
        {
          instruction: "Ensayo opcional, antes de abrir el pull request. Borra la rama remota, como pasaría al cerrar un pull request y borrar su rama. Mira cómo la ve Git y vuelve a subirla.",
          command: "git push origin --delete spec/001-mvp-arcade-vault 2>&1 | tail -1\ngit branch -vv | grep -c gone\ngit push -u origin spec/001-mvp-arcade-vault 2>&1 | tail -1",
          expected: " - [deleted]         spec/001-mvp-arcade-vault\n1\nbranch 'spec/001-mvp-arcade-vault' set up to track 'origin/spec/001-mvp-arcade-vault'.",
        },
        {
          instruction: "En GitHub, abre el pull request de spec/001-mvp-arcade-vault hacia main. Describe el spec y comprueba que su estado es implementado. Integra con Create a merge commit y borra la rama remota.",
          command: "Compare & pull request > Create pull request > Merge pull request > Delete branch",
          expected: "GitHub marca el pull request como Merged y la rama remota desaparece.",
        },
        {
          instruction: "Vuelve a main, trae los cambios y comprueba el estado del spec.",
          command: "git switch -q main && git pull --prune -q && git log --format=%s -1 && grep -m1 \"^estado\" specs/001-mvp-arcade-vault.md && git branch -vv | grep -c gone",
          expected: "Merge pull request #2 from TU-USUARIO/spec/001-mvp-arcade-vault\nestado: implementado\n1",
        },
        {
          instruction: "Borra la rama local, que ya está integrada.",
          command: "git branch -d spec/001-mvp-arcade-vault > /dev/null && git branch",
          expected: "* main",
        },
      ],
      verify: "main tiene el MVP y el spec en implementado, y solo queda la rama main. Si usaste Squash and merge, el último paso pedirá -D.",
    },
    {
      type: "exercise",
      title: "Ejercicio 3: la tarea, rama y plantillas",
      description: "Crea la rama del spec 002 y guarda el material de diseño.",
      steps: [
        {
          instruction: "Crea la rama del nuevo spec desde main.",
          command: "git switch -c spec/002-home-landing-page",
          expected: "Switched to a new branch 'spec/002-home-landing-page'",
        },
        {
          instruction: "Guarda los estilos de la página de inicio.",
          file: { name: "references/templates/home-about/home.css", code: `.hero { text-align: center; padding: 48px 0 24px; }
.hero h1 { font-size: 2.6rem; }
.hero p { max-width: 560px; margin: 0 auto 24px; color: var(--texto-suave); }
.hero .acciones { justify-content: center; }
.seccion { margin-top: 48px; }
.razones { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; }
.razon { background: var(--panel); border: 1px solid var(--borde); border-radius: 10px; padding: 16px; }
.razon p { margin: 0; color: var(--texto-suave); }
.razon .razon-titulo { margin: 0 0 4px; color: var(--texto); font-weight: 700; }
.icono { display: inline-grid; place-items: center; width: 36px; height: 36px; margin-bottom: 8px; border: 1px solid var(--cian); border-radius: 8px; color: var(--cian); }
.minis { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px; }
.mini { display: block; background: var(--panel); border: 1px solid var(--borde); border-radius: 8px; padding: 12px; transition: border-color 0.2s, box-shadow 0.2s; }
.mini:hover { border-color: var(--cian); box-shadow: 0 0 14px rgba(41, 240, 255, 0.3); }
.mini .arte { height: 56px; margin-bottom: 8px; }
.mini strong { display: block; margin-bottom: 4px; }
.cta { margin-top: 56px; padding: 24px; text-align: center; border: 1px dashed var(--rosa); border-radius: 10px; }
@media (max-width: 720px) {
  .hero h1 { font-size: 1.8rem; }
}
@media (prefers-reduced-motion: reduce) {
  .mini { transition: none; }
}` },
        },
        {
          instruction: "Guarda la plantilla de la página de inicio.",
          file: { name: "references/templates/home-about/inicio.html", code: `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Arcade Vault</title>
  <link rel="stylesheet" href="../styles.css">
  <link rel="stylesheet" href="home.css">
</head>
<body>
  <header class="cabecera">
    <a class="logo" href="inicio.html">Arcade Vault</a>
    <nav class="nav" aria-label="Principal">
      <a href="inicio.html" aria-current="page">Inicio</a>
      <a href="../index.html">Juegos</a>
      <a href="../salon-de-la-fama.html">Salón de la fama</a>
      <a href="../iniciar-sesion.html">Iniciar sesión</a>
    </nav>
  </header>
  <main class="contenedor">
    <section class="hero">
      <h1>Arcade Vault</h1>
      <p>Juegos arcade para jugar en el navegador y competir por puntos. Sin descargas y sin esperas.</p>
      <div class="acciones">
        <a class="boton" href="../index.html">Explorar juegos</a>
        <a class="boton boton--sec" href="../salon-de-la-fama.html">Ver el salón de la fama</a>
      </div>
    </section>
    <section class="seccion" aria-labelledby="por-que">
      <h2 id="por-que">¿Por qué Arcade Vault?</h2>
      <div class="razones">
        <article class="razon">
          <span class="icono" aria-hidden="true">▶</span>
          <p class="razon-titulo">Juega al instante</p>
          <p>Todo corre en el navegador, sin descargas ni instalaciones.</p>
        </article>
        <article class="razon">
          <span class="icono" aria-hidden="true">★</span>
          <p class="razon-titulo">Compite por puntos</p>
          <p>Cada juego tiene su salón de la fama con los mejores puntajes.</p>
        </article>
        <article class="razon">
          <span class="icono" aria-hidden="true">◆</span>
          <p class="razon-titulo">6 juegos para empezar</p>
          <p>De acción, puzzle y plataformas, listos para jugar.</p>
        </article>
        <article class="razon">
          <span class="icono" aria-hidden="true">✦</span>
          <p class="razon-titulo">Para móvil y escritorio</p>
          <p>El diseño se adapta a cualquier tamaño de pantalla.</p>
        </article>
      </div>
    </section>
    <section class="seccion" aria-labelledby="ahora">
      <h2 id="ahora">Juegos disponibles ahora</h2>
      <div class="minis">
        <a class="mini" href="../previsualizacion.html">
          <div class="arte" role="img" aria-label="Imagen de Rompe Bloques"></div>
          <strong>Rompe Bloques</strong>
          <span class="etiqueta">Acción</span>
        </a>
        <a class="mini" href="../previsualizacion.html">
          <div class="arte" role="img" aria-label="Imagen de Culebra"></div>
          <strong>Culebra</strong>
          <span class="etiqueta">Clásico</span>
        </a>
        <a class="mini" href="../previsualizacion.html">
          <div class="arte" role="img" aria-label="Imagen de Defensor"></div>
          <strong>Defensor</strong>
          <span class="etiqueta">Disparos</span>
        </a>
        <a class="mini" href="../previsualizacion.html">
          <div class="arte" role="img" aria-label="Imagen de Laberinto"></div>
          <strong>Laberinto</strong>
          <span class="etiqueta">Puzzle</span>
        </a>
        <a class="mini" href="../previsualizacion.html">
          <div class="arte" role="img" aria-label="Imagen de Saltarín"></div>
          <strong>Saltarín</strong>
          <span class="etiqueta">Plataformas</span>
        </a>
        <a class="mini" href="../previsualizacion.html">
          <div class="arte" role="img" aria-label="Imagen de Memoria"></div>
          <strong>Memoria</strong>
          <span class="etiqueta">Puzzle</span>
        </a>
      </div>
    </section>
    <section class="cta">
      <h2>Empieza ahora</h2>
      <p>Crea una cuenta y guarda tus puntajes en el salón de la fama.</p>
      <a class="boton" href="../crear-cuenta.html">Crear cuenta</a>
    </section>
  </main>
</body>
</html>` },
        },
        {
          instruction: "Guarda la plantilla de Acerca de. Está para que no se implemente.",
          file: { name: "references/templates/home-about/acerca-de.html", code: `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Acerca de · Arcade Vault</title>
  <link rel="stylesheet" href="../styles.css">
  <link rel="stylesheet" href="home.css">
</head>
<body>
  <header class="cabecera">
    <a class="logo" href="inicio.html">Arcade Vault</a>
    <nav class="nav" aria-label="Principal">
      <a href="inicio.html">Inicio</a>
      <a href="../index.html">Juegos</a>
      <a href="acerca-de.html" aria-current="page">Acerca de</a>
      <a href="../iniciar-sesion.html">Iniciar sesión</a>
    </nav>
  </header>
  <main class="contenedor">
    <h1>Acerca de Arcade Vault</h1>
    <p class="subtitulo">Una plataforma pequeña de juegos arcade.</p>
    <p>Arcade Vault reúne juegos clásicos que se juegan en el navegador. Cada juego guarda sus mejores puntajes en un salón de la fama compartido.</p>
    <h2>Qué incluye</h2>
    <ul class="controles">
      <li>Una galería con seis juegos de muestra.</li>
      <li>Una pantalla de previsualización y otra para jugar.</li>
      <li>Un salón de la fama con una pestaña por juego.</li>
    </ul>
  </main>
</body>
</html>` },
        },
        {
          instruction: "Comprueba los tres archivos y guárdalos.",
          command: "ls -1 references/templates/home-about && git add references/templates/home-about && git commit -q -m \"docs: plantillas de inicio y acerca de\" && git log --format=%s -1",
          expected: "acerca-de.html\nhome.css\ninicio.html\ndocs: plantillas de inicio y acerca de",
        },
      ],
      verify: "Abre references/templates/home-about/inicio.html en el navegador: ves la presentación, las cuatro razones, los seis juegos y la invitación final. Los enlaces llevan a las plantillas de la carpeta superior.",
    },
    {
      type: "exercise",
      title: "Ejercicio 4: el spec 002",
      description: "Escríbelo con /spec, o usa el de referencia, y apruébalo.",
      steps: [
        {
          instruction: "En Claude Code, lanza el skill con el problema en una frase y las plantillas como referencia. Contesta con pocas palabras, usando las decisiones de la tabla.",
          command: "claude\n/clear\n/spec Que la raíz muestre la página de references/templates/home-about/inicio.html y la galería pase a /juegos, sin la página Acerca de",
          expected: "Claude lee las plantillas, pregunta por la ruta de la galería, los enlaces y los datos de las tarjetas, y guarda specs/002-<nombre>.md con estado borrador.",
        },
        {
          instruction: "Guarda el spec de referencia. Si tu entrevista dio otro, usa el tuyo, pero comprueba que deja fuera Acerca de y que incluye el criterio del 404.",
          file: { name: "specs/002-home-landing-page.md", code: `---
estado: borrador
---
# 002 Página de inicio de Arcade Vault
## Objetivo
Que la ruta / muestre la página de inicio de references/templates/home-about/inicio.html, y que la galería de juegos pase a /juegos.
## Alcance
Entra:
- Mover la galería de app/page.tsx a app/juegos/page.tsx con git mv, para que Git conserve su historial.
- Actualizar los enlaces internos que apuntaban a / como galería: la cabecera y el botón Volver de la previsualización.
- Una cabecera con cuatro enlaces: Inicio, Juegos, Salón de la fama e Iniciar sesión.
- Una nueva app/page.tsx con la presentación y sus dos botones, cuatro razones para usar Arcade Vault, los seis juegos como tarjetas pequeñas y una invitación final a crear una cuenta.
- Los estilos de references/templates/home-about/home.css, añadidos al final de app/globals.css.
- Los juegos de las tarjetas pequeñas salen de app/data/juegos.ts.
No entra:
- La página Acerca de, aunque exista su plantilla en references/templates/home-about/acerca-de.html.
- Datos de actividad en vivo ni indicadores animados.
- Efectos de inclinación 3D y JavaScript de cliente nuevo.
- Cambios de diseño en las demás pantallas.
## Modelo de datos
- No se añade ningún modelo de datos. La página usa JUEGOS, de app/data/juegos.ts.
## Plan de implementación
1. Mover la galería: git mv app/page.tsx app/juegos/page.tsx y renombrar su componente a Juegos.
2. Enlaces: cabecera con cuatro enlaces y botón Volver de la previsualización apuntando a /juegos.
3. Estilos: añadir home.css al final de app/globals.css.
4. Inicio: crear app/page.tsx con la presentación, las razones, los juegos y la invitación final.
5. Verificar: actualizar scripts/probar-rutas.mjs a las rutas nuevas, ejecutar lint, build y el script, medir la página contra su plantilla y pasar el estado a implementado.
## Criterios de aceptación
- [ ] npm run lint termina sin errores.
- [ ] npm run build termina sin errores.
- [ ] / responde 200 y muestra 4 razones y 6 tarjetas pequeñas.
- [ ] /juegos responde 200 y muestra 6 tarjetas, como antes lo hacía /.
- [ ] Solo el logo y el enlace Inicio apuntan a / en cada página.
- [ ] Todas las páginas tienen la cabecera con cuatro enlaces.
- [ ] /juegos/tetris responde 404 desde la primera visita.
- [ ] /acerca-de responde 404.
- [ ] La página de inicio mide lo mismo que su plantilla con 1280 y con 390 píxeles de ancho.
- [ ] Ninguna página carga fuentes ni imágenes de servidores externos.
## Decisiones
- Tomada: la galería pasa a /juegos, porque ese era ya el prefijo de la previsualización y ahora /juegos deja de dar 404.
- Tomada: el logo y el enlace Inicio apuntan a /, y el enlace Juegos a /juegos.
- Tomada: los juegos de las tarjetas pequeñas se leen de JUEGOS, para no duplicar datos.
- Tomada: la página de inicio es un componente de servidor, sin JavaScript de cliente.
- Descartada: la página Acerca de, porque se hará en otro spec.
- Descartada: la actividad en vivo, porque necesita datos que todavía no existen.` },
        },
        {
          instruction: "Valida el spec y guárdalo como borrador.",
          command: "node scripts/validar-spec.js specs/002-home-landing-page.md | tail -1 && git add specs && git commit -q -m \"spec 002 en borrador: página de inicio\" && git log --format=%s -1",
          expected: "RESULTADO: spec válido\nspec 002 en borrador: página de inicio",
        },
        {
          instruction: "Léelo entero. Si estás de acuerdo, apruébalo tú, en su propio commit.",
          command: "sed -i.bak 's/^estado: borrador$/estado: aprobado/' specs/002-home-landing-page.md && rm specs/002-home-landing-page.md.bak && head -3 specs/002-home-landing-page.md && git commit -q -am \"spec 002 aprobado\" && git status --porcelain && git log --format=%s -2",
          expected: "---\nestado: aprobado\n---\nspec 002 aprobado\nspec 002 en borrador: página de inicio",
        },
      ],
      verify: "El árbol queda limpio y el spec está aprobado. Si tu spec incluye una ruta de Acerca de, quítala antes de aprobarlo.",
    },
    {
      type: "exercise",
      title: "Ejercicio 5: pasos 1 y 2, mover y enlazar",
      description: "Mueve la galería con git mv y actualiza los enlaces.",
      steps: [
        {
          instruction: "Con /clear y /spec-impl 002, o a mano. Empieza por mover la galería.",
          command: "git mv app/page.tsx app/juegos/page.tsx && git status --porcelain",
          expected: "R  app/page.tsx -> app/juegos/page.tsx",
        },
        {
          instruction: "Renombra el componente y guarda el paso. Mira que la historia sigue accesible con --follow.",
          command: "sed -i.bak 's/export default function Inicio()/export default function Juegos()/' app/juegos/page.tsx && rm app/juegos/page.tsx.bak && grep -n \"export default\" app/juegos/page.tsx\ngit add app/juegos/page.tsx && git commit -q -m \"paso 1: mover la galería a /juegos con git mv\" && git log --follow --format=%s app/juegos/page.tsx | head -3",
          expected: "4:export default function Juegos() {\npaso 1: mover la galería a /juegos con git mv\npaso 3: pantalla de inicio con las seis tarjetas\nInitial commit from Create Next App",
        },
        {
          instruction: "Paso 2. Sustituye la cabecera por la de cuatro enlaces.",
          file: { name: "components/Cabecera.tsx", code: `"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ENLACES = [
  { href: "/", texto: "Inicio", activa: (ruta: string) => ruta === "/" },
  { href: "/juegos", texto: "Juegos", activa: (ruta: string) => ruta.startsWith("/juegos") },
  { href: "/salon-de-la-fama", texto: "Salón de la fama", activa: (ruta: string) => ruta.startsWith("/salon-de-la-fama") },
  { href: "/iniciar-sesion", texto: "Iniciar sesión", activa: (ruta: string) => ruta === "/iniciar-sesion" || ruta === "/crear-cuenta" },
];

export default function Cabecera() {
  const ruta = usePathname();
  return (
    <header className="cabecera">
      <Link className="logo" href="/">
        Arcade Vault
      </Link>
      <nav className="nav" aria-label="Principal">
        {ENLACES.map((enlace) => (
          <Link key={enlace.href} href={enlace.href} aria-current={enlace.activa(ruta) ? "page" : undefined}>
            {enlace.texto}
          </Link>
        ))}
      </nav>
    </header>
  );
}` },
        },
        {
          instruction: "Cambia el botón Volver de la previsualización y busca los enlaces que aún apuntan a la raíz.",
          command: "sed -i.bak 's|href=\"/\">|href=\"/juegos\">|' \"app/juegos/[id]/page.tsx\" && rm \"app/juegos/[id]/page.tsx.bak\"\ngrep -rn 'href=\"/\"' app components",
          expected: "components/Cabecera.tsx:17:      <Link className=\"logo\" href=\"/\">",
        },
        {
          instruction: "Comprueba tipos y lint, y guarda el paso.",
          command: "npx next typegen > /dev/null 2>&1; npx tsc --noEmit && npm run lint --silent && echo tipos y lint correctos && git add components \"app/juegos/[id]/page.tsx\" && git commit -q -m \"paso 2: cabecera con cuatro enlaces y botón Volver a /juegos\" && git log --format=%s -1",
          expected: "tipos y lint correctos\npaso 2: cabecera con cuatro enlaces y botón Volver a /juegos",
        },
      ],
      verify: "Solo el logo escribe href con la raíz. El enlace Inicio y la ruta de la galería están en la lista de datos de la cabecera. Si tu grep devuelve más líneas, revisa cada una.",
    },
    {
      type: "exercise",
      title: "Ejercicio 6: pasos 3 y 4, estilos y página de inicio",
      description: "Añade los estilos al final de globals.css y crea la nueva página.",
      steps: [
        {
          instruction: "Paso 3. Añade al final de globals.css la hoja de las plantillas nuevas.",
          command: "printf '\\n' >> app/globals.css && cat references/templates/home-about/home.css >> app/globals.css && tail -3 app/globals.css && grep -c \"^\\.hero\" app/globals.css",
          expected: "@media (prefers-reduced-motion: reduce) {\n  .mini { transition: none; }\n}\n4",
        },
        {
          instruction: "Guarda el paso.",
          command: "git add app/globals.css && git commit -q -m \"paso 3: estilos de la página de inicio\" && git log --format=%s -1",
          expected: "paso 3: estilos de la página de inicio",
        },
        {
          instruction: "Paso 4. Crea la página de inicio.",
          file: { name: "app/page.tsx", code: `import Link from "next/link";
import { JUEGOS } from "@/app/data/juegos";

const RAZONES = [
  { icono: "▶", titulo: "Juega al instante", texto: "Todo corre en el navegador, sin descargas ni instalaciones." },
  { icono: "★", titulo: "Compite por puntos", texto: "Cada juego tiene su salón de la fama con los mejores puntajes." },
  { icono: "◆", titulo: \`\${JUEGOS.length} juegos para empezar\`, texto: "De acción, puzzle y plataformas, listos para jugar." },
  { icono: "✦", titulo: "Para móvil y escritorio", texto: "El diseño se adapta a cualquier tamaño de pantalla." },
];

export default function Inicio() {
  return (
    <main className="contenedor">
      <section className="hero">
        <h1>Arcade Vault</h1>
        <p>Juegos arcade para jugar en el navegador y competir por puntos. Sin descargas y sin esperas.</p>
        <div className="acciones">
          <Link className="boton" href="/juegos">
            Explorar juegos
          </Link>
          <Link className="boton boton--sec" href="/salon-de-la-fama">
            Ver el salón de la fama
          </Link>
        </div>
      </section>
      <section className="seccion" aria-labelledby="por-que">
        <h2 id="por-que">¿Por qué Arcade Vault?</h2>
        <div className="razones">
          {RAZONES.map((razon) => (
            <article className="razon" key={razon.titulo}>
              <span className="icono" aria-hidden="true">
                {razon.icono}
              </span>
              <p className="razon-titulo">{razon.titulo}</p>
              <p>{razon.texto}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="seccion" aria-labelledby="ahora">
        <h2 id="ahora">Juegos disponibles ahora</h2>
        <div className="minis">
          {JUEGOS.map((juego) => (
            <Link className="mini" key={juego.id} href={\`/juegos/\${juego.id}\`}>
              <div className="arte" role="img" aria-label={\`Imagen de \${juego.nombre}\`} />
              <strong>{juego.nombre}</strong>
              <span className="etiqueta">{juego.genero}</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="cta">
        <h2>Empieza ahora</h2>
        <p>Crea una cuenta y guarda tus puntajes en el salón de la fama.</p>
        <Link className="boton" href="/crear-cuenta">
          Crear cuenta
        </Link>
      </section>
    </main>
  );
}` },
        },
        {
          instruction: "Comprueba tipos, lint y build, y guarda el paso.",
          command: "npx next typegen > /dev/null 2>&1; npx tsc --noEmit && npm run lint --silent && npm run build > /dev/null 2>&1 && echo tipos, lint y build correctos && git add app/page.tsx && git commit -q -m \"paso 4: página de inicio\" && git log --format=%s -1",
          expected: "tipos, lint y build correctos\npaso 4: página de inicio",
        },
      ],
      verify: "Con npm run dev, la raíz muestra la presentación, las cuatro razones, los seis juegos y la invitación final, y /juegos muestra la galería de siempre.",
    },
    {
      type: "exercise",
      title: "Ejercicio 7: paso 5, verificar y cerrar el spec",
      description: "El script, la medida contra la plantilla y el estado del spec.",
      steps: [
        {
          instruction: "Sustituye el script de rutas por la versión que conoce las rutas nuevas.",
          file: { name: "scripts/probar-rutas.mjs", code: `// Uso: node scripts/probar-rutas.mjs http://localhost:3000
const base = (process.argv[2] ?? "http://localhost:3000").replace(/\\/$/, "");
const JUEGOS = ["rompe-bloques", "culebra", "defensor", "laberinto", "saltarin", "memoria"];
const RUTAS_OK = [
  "/",
  "/juegos",
  "/juegos/rompe-bloques",
  "/juegos/rompe-bloques/jugar",
  "/salon-de-la-fama",
  "/iniciar-sesion",
  "/crear-cuenta",
];
let fallos = 0;
function comprobar(descripcion, cumple) {
  if (!cumple) fallos += 1;
  console.log((cumple ? "ok     " : "FALLA  ") + descripcion);
}
async function pedir(ruta) {
  const respuesta = await fetch(base + ruta);
  return { estado: respuesta.status, html: await respuesta.text() };
}
const contar = (texto, patron) => (texto.match(patron) ?? []).length;

const paginas = {};
for (const ruta of RUTAS_OK) {
  paginas[ruta] = await pedir(ruta);
  comprobar(\`\${ruta} responde 200\`, paginas[ruta].estado === 200);
}
for (const ruta of ["/juegos/tetris", "/juegos/tetris/jugar", "/acerca-de", "/admin"]) {
  comprobar(\`\${ruta} responde 404\`, (await pedir(ruta)).estado === 404);
}
comprobar("el inicio muestra 4 razones y 6 tarjetas pequeñas", contar(paginas["/"].html, /class="razon"/g) === 4 && contar(paginas["/"].html, /class="mini"/g) === 6);
comprobar("la galería muestra 6 tarjetas", contar(paginas["/juegos"].html, /class="tarjeta"/g) === 6);

for (const id of JUEGOS) {
  const { html } = await pedir(\`/salon-de-la-fama?juego=\${id}\`);
  const cuerpo = html.match(/<tbody>[\\s\\S]*?<\\/tbody>/)?.[0] ?? "";
  comprobar(\`salón de \${id}: 6 pestañas y 8 filas\`, contar(html, /role="tab"/g) === 6 && contar(cuerpo, /<tr/g) === 8);
}

for (const [ruta, { html }] of Object.entries(paginas)) {
  const nav = html.match(/<nav[\\s\\S]*?<\\/nav>/)?.[0] ?? "";
  comprobar(\`\${ruta}: cabecera con 4 enlaces\`, contar(nav, /<a /g) === 4);
  comprobar(\`\${ruta}: solo el logo y Inicio apuntan a /\`, contar(html, /href="\\/"/g) === 2);
  comprobar(\`\${ruta}: nada de servidores externos\`, !/(src|href)="https?:\\/\\//.test(html));
}

const acceso = paginas["/iniciar-sesion"].html;
const cuenta = paginas["/crear-cuenta"].html;
comprobar("iniciar sesión: 2 campos y sin action", contar(acceso, /<input /g) === 2 && !/<form[^>]* action=/.test(acceso));
comprobar("crear cuenta: 3 campos y sin action", contar(cuenta, /<input /g) === 3 && !/<form[^>]* action=/.test(cuenta));

console.log(fallos === 0 ? "RESULTADO: todo correcto" : \`RESULTADO: \${fallos} fallo(s)\`);
process.exit(fallos === 0 ? 0 : 1);` },
        },
        {
          instruction: "Compila y arranca el servidor en la segunda terminal. Después, en la primera, ejecuta el script y cuenta las comprobaciones correctas.",
          command: "npm run build > /dev/null 2>&1 && npm start\nnode scripts/probar-rutas.mjs http://localhost:3000 | grep -v \"^ok\"\nnode scripts/probar-rutas.mjs http://localhost:3000 | grep -c \"^ok\"",
          expected: "RESULTADO: todo correcto\n42",
        },
        {
          instruction: "Compara la página con su plantilla. Pide a Claude que lo haga con Playwright, o mide a mano la altura del contenido en las dos páginas con la consola, con el navegador a 1280 y a 390 píxeles de ancho.",
          command: "Usa el MCP de Playwright para abrir la raíz y compararla con references/templates/home-about/inicio.html, con 1280 y con 390 píxeles de ancho. Guarda las capturas en .playwright-screenshots/ y dime qué diferencias hay.",
          expected: "Claude abre las dos páginas, toma las capturas en .playwright-screenshots/ y describe las diferencias, si las hay. Si mides a mano: document.querySelector(\"main\").getBoundingClientRect().height da el mismo valor en las dos.",
        },
        {
          instruction: "Para el servidor con Ctrl+C. Guarda el script, y marca el spec como implementado y sus criterios como cumplidos.",
          command: "git add scripts/probar-rutas.mjs && git commit -q -m \"paso 5: script de rutas con las rutas nuevas\" && git log --format=%s -1\nsed -i.bak 's/^estado: aprobado$/estado: implementado/; s/^- \\[ \\] /- [x] /' specs/002-home-landing-page.md && rm specs/002-home-landing-page.md.bak && grep -c \"\\[x\\]\" specs/002-home-landing-page.md && head -3 specs/002-home-landing-page.md",
          expected: "paso 5: script de rutas con las rutas nuevas\n10\n---\nestado: implementado\n---",
        },
        {
          instruction: "Valida el spec y guarda el cierre.",
          command: "node scripts/validar-spec.js specs/002-home-landing-page.md | tail -1 && git commit -q -am \"spec 002 implementado: criterios comprobados\" && git status --porcelain && git rev-list --count main..HEAD",
          expected: "RESULTADO: spec válido\n9",
        },
      ],
      verify: "El script termina con todo correcto, el árbol queda limpio y la rama tiene nueve commits sobre main. Si solo falla el 404 de /juegos/tetris la primera vez, revisa partialPrefetching: debe seguir en false.",
    },
    {
      type: "exercise",
      title: "Ejercicio 8: integrar el spec 002",
      description: "El mismo ciclo del ejercicio 2, ahora con la página de inicio.",
      steps: [
        {
          instruction: "Publica la rama.",
          command: "git push -u origin spec/002-home-landing-page 2>&1 | tail -1",
          expected: "branch 'spec/002-home-landing-page' set up to track 'origin/spec/002-home-landing-page'.",
        },
        {
          instruction: "En GitHub, abre el pull request, comprueba que el spec figura como implementado e intégralo con un merge commit. Borra la rama remota.",
          command: "Compare & pull request > Create pull request > Merge pull request > Delete branch",
          expected: "GitHub marca el pull request como Merged y la rama remota desaparece.",
        },
        {
          instruction: "Vuelve a main, trae los cambios y comprueba que el spec 002 llegó con su estado.",
          command: "git switch -q main && git pull --prune -q && git log --format=%s -1 && ls specs && grep -m1 \"^estado\" specs/002-home-landing-page.md && git branch -vv | grep -c gone",
          expected: "Merge pull request #3 from TU-USUARIO/spec/002-home-landing-page\n001-mvp-arcade-vault.md\n002-home-landing-page.md\nestado: implementado\n1",
        },
        {
          instruction: "Borra la rama local.",
          command: "git branch -d spec/002-home-landing-page > /dev/null && git branch",
          expected: "* main",
        },
      ],
      verify: "main tiene los dos specs en implementado, la página de inicio en la raíz y la galería en /juegos. Arranca el servidor de desarrollo y compruébalo con tus ojos.",
    },
    {
      type: "playground",
      title: "Experimento 9: qué ignora cada patrón",
      description: "Un modelo de las reglas de .gitignore del ejercicio 1. Cambia los patrones y mira qué archivo se guarda.",
      code: `function ignorado(ruta, reglas) {
  const partes = ruta.split("/");
  for (let i = 1; i < partes.length; i++) {
    const carpeta = partes.slice(0, i).join("/");
    if (reglas.includes(carpeta + "/")) return true;
  }
  let resultado = false;
  for (const regla of reglas) {
    const negada = regla.startsWith("!");
    const patron = negada ? regla.slice(1) : regla;
    const padre = partes.slice(0, -1).join("/");
    const coincide = patron === ruta || patron === padre + "/*";
    if (coincide) resultado = !negada;
  }
  return resultado;
}
const casos = [
  ["carpeta entera", [".cap/", "!.cap/.gitkeep"]],
  ["contenido de la carpeta", [".cap/*", "!.cap/.gitkeep"]],
];
casos.forEach(([titulo, reglas]) => {
  [".cap/.gitkeep", ".cap/inicio.png"].forEach((ruta) => {
    console.log(titulo + " | " + ruta + " -> " + (ignorado(ruta, reglas) ? "ignorado" : "se guarda"));
  });
});`,
      expected: "carpeta entera | .cap/.gitkeep -> ignorado\ncarpeta entera | .cap/inicio.png -> ignorado\ncontenido de la carpeta | .cap/.gitkeep -> se guarda\ncontenido de la carpeta | .cap/inicio.png -> ignorado",
    },
    {
      type: "playground",
      title: "Experimento 10: qué imprime sed -n",
      description: "El comando que Claude usó para leer líneas sueltas. Prueba otros rangos.",
      code: `function imprimirLineas(texto, desde, hasta) {
  return texto.split("\\n").slice(desde - 1, hasta).join("\\n");
}
const archivo = ["uno", "dos", "tres", "cuatro", "cinco"].join("\\n");
console.log("sed -n 2,4p:");
console.log(imprimirLineas(archivo, 2, 4));
console.log("sed -n 5,5p:");
console.log(imprimirLineas(archivo, 5, 5));`,
      expected: "sed -n 2,4p:\ndos\ntres\ncuatro\nsed -n 5,5p:\ncinco",
    },
    {
      type: "playground",
      title: "Experimento 11: qué enlaces cambian",
      description: "La regla del paso 2 sobre enlaces que apuntan a la raíz. Añade enlaces de tu proyecto.",
      code: `const enlaces = [
  ["Cabecera: logo", "/", "inicio"],
  ["Cabecera: enlace Juegos", "/", "galería"],
  ["Previsualización: botón Volver", "/", "galería"],
  ["Inicio: botón Explorar juegos", "/juegos", "galería"],
  ["Formulario: enlace Crear cuenta", "/crear-cuenta", "cuenta"],
];
enlaces.forEach(([donde, destino, es]) => {
  const cambia = destino === "/" && es === "galería";
  console.log(donde + " -> " + (cambia ? "pasa a /juegos" : "se queda en " + destino));
});`,
      expected: "Cabecera: logo -> se queda en /\nCabecera: enlace Juegos -> pasa a /juegos\nPrevisualización: botón Volver -> pasa a /juegos\nInicio: botón Explorar juegos -> se queda en /juegos\nFormulario: enlace Crear cuenta -> se queda en /crear-cuenta",
    },
    {
      type: "playground",
      title: "Experimento 12: ¿está lista la rama para el pull request?",
      description: "La lista previa del pull request como una función. Prueba otras combinaciones.",
      code: `function listoParaIntegrar(estado) {
  const faltan = [];
  if (estado.spec !== "implementado") faltan.push("el spec no está en implementado");
  if (!estado.lint) faltan.push("lint falla");
  if (!estado.build) faltan.push("el build falla");
  if (estado.sinGuardar > 0) faltan.push("hay cambios sin guardar");
  if (!estado.publicada) faltan.push("la rama no está publicada");
  return faltan.length ? "no: " + faltan.join(", ") : "listo para abrir el pull request";
}
const casos = {
  "todo en orden": { spec: "implementado", lint: true, build: true, sinGuardar: 0, publicada: true },
  "spec sin cerrar": { spec: "aprobado", lint: true, build: true, sinGuardar: 0, publicada: true },
  "dos cosas a la vez": { spec: "aprobado", lint: true, build: true, sinGuardar: 2, publicada: false },
};
Object.keys(casos).forEach((nombre) => console.log(nombre + " -> " + listoParaIntegrar(casos[nombre])));`,
      expected: "todo en orden -> listo para abrir el pull request\nspec sin cerrar -> no: el spec no está en implementado\ndos cosas a la vez -> no: el spec no está en implementado, hay cambios sin guardar, la rama no está publicada",
    },
    { type: "heading", level: 2, text: "¿Qué usar en cada caso?" },
    {
      type: "table",
      headers: ["Si necesitas...", "Usa...", "Nota"],
      rows: [
        ["Ignorar capturas y conservar su carpeta", "`carpeta/*` y `!carpeta/.gitkeep`", "Con `carpeta/` la excepción no funciona."],
        ["Que Git reconozca una página movida", "git mv, o mover y dejar que Git lo detecte", "Ver la historia: git log --follow."],
        ["Comprobar que no quedan enlaces viejos", "grep sobre el código", "Mirar la página no basta."],
        ["Llevar un spec a main", "Un pull request con el spec dentro y su estado en implementado", "El estado se corrige en la misma rama."],
        ["Reabrir trabajo tras cerrar un pull request", "git push desde la rama", "Vuelve a crear la rama remota."],
        ["Limpiar tras integrar", "git switch main, git pull --prune y git branch -d", "Con squash o rebase, -D."],
        ["Que Claude no pida permiso en un comando de solo lectura", "Yes, and don't ask again", "Se guarda en .claude/settings.local.json."],
        ["Impedir un comando o la lectura de un archivo", "Reglas deny en .claude/settings.json", "Por ejemplo `Bash(git push *)` o `Read(./.env)`."],
        ["Que una página nueva no arrastre otra", "Un criterio que la comprueba", "Un 404 esperado también es un criterio."],
      ],
    },
    { type: "heading", level: 2, text: "Datos que suelen aparecer desactualizados" },
    {
      type: "table",
      headers: ["Suele decirse", "Información verificada (noviembre 2026)"],
      rows: [
        ["git mv mueve la historia del archivo.", "Git no guarda renombrados: los detecta por la similitud. La historia se ve con git log --follow."],
        ["Ignorar la carpeta y rescatar su .gitkeep con una excepción funciona.", "No funciona: Git no mira dentro de una carpeta ignorada. Hay que ignorar su contenido con `carpeta/*`."],
        ["Un pull request cerrado y su rama borrada obligan a rehacer el trabajo.", "Los commits siguen en tu copia. Un git push vuelve a crear la rama remota."],
        ["El error al volver a subir viene de Git.", "Con la terminal no hay error. Si aparece en un editor, es de su interfaz."],
        ["Las aprobaciones permanentes se guardan en un archivo de la aplicación.", "Se guardan como reglas allow en .claude/settings.local.json, en la raíz del repositorio, y Claude Code lo mantiene fuera de Git."],
        ["Leer variables de entorno es peligroso y solo cabe vigilarlo.", "Se puede denegar con una regla, por ejemplo Read(./.env) en los permisos."],
        ["git checkout main es el comando para volver a main.", "Sirve, pero git switch main es más nuevo y hace una sola cosa."],
        ["Un spec nuevo no puede cambiar un criterio de uno anterior.", "Puede, si lo dice y se actualiza la comprobación. Aquí la cabecera pasó de tres enlaces a cuatro."],
      ],
    },
    { type: "heading", level: 2, text: "Si algo no funciona" },
    {
      type: "table",
      headers: ["Síntoma", "Causa probable", "Qué hacer"],
      rows: [
        ["La carpeta de capturas no existe al clonar", "Está ignorada entera, sin .gitkeep", "Ignora el contenido con `carpeta/*` y guarda el `.gitkeep`."],
        ["El .gitkeep sigue ignorado", "El patrón de la carpeta termina en barra", "Cámbialo a `carpeta/*`."],
        ["git push dice que no hay rama remota", "Falta -u en el primer push", "git push -u origin <rama>."],
        ["La rama local aparece con gone", "Su rama remota se borró", "Integrada, bórrala con -d. Si no, vuelve a subirla."],
        ["/juegos da 404 tras mover la galería", "El git mv se quedó a medias, o falta el archivo", "Comprueba que existe app/juegos/page.tsx."],
        ["La cabecera sigue con tres enlaces", "Quedó la versión anterior del componente", "Revisa components/Cabecera.tsx y la lista ENLACES."],
        ["Existe la ruta /acerca-de", "Se colaron plantillas fuera de alcance", "Descarta la rama y rehaz el paso desde el spec."],
        ["El script falla en el 404 de la primera visita", "partialPrefetching volvió a true", "Ponlo en false, vuelve a compilar y reinicia el servidor."],
      ],
    },
    { type: "heading", level: 2, text: "Preguntas frecuentes" },
    {
      type: "accordion",
      items: [
        {
          title: "¿Por qué una tarea pequeña tiene tantos pasos?",
          text: "Porque el objetivo es practicar el flujo, no la página. Cada paso se comprueba de forma independiente, y cuando una funcionalidad grande se rompe, ya sabes dónde mirar.",
        },
        {
          title: "¿Debo borrar las plantillas de references?",
          text: "Cuando ya no se usan, puedes. Cuanto menos material tenga el proyecto, menos hay que leer y mantener. Aquí se conservan, porque el siguiente spec usa la plantilla de Acerca de.",
        },
        {
          title: "¿Y si el pull request llega con el spec sin cerrar?",
          text: "No lo integres. Corrige en la misma rama, cambia el estado, haz un commit y súbelo: el pull request abierto se actualiza solo. Cerrarlo y abrir otro es innecesario salvo que la rama haya cambiado de rumbo.",
        },
        {
          title: "¿Por qué no basta con mirar la página para saber que los enlaces están bien?",
          text: "Porque un enlace roto se ve solo si lo pulsas, y hay muchos. Una búsqueda en el código encuentra todos los destinos antiguos de una vez, y un script de rutas confirma los nuevos.",
        },
        {
          title: "¿Aprobar comandos de forma permanente no es peligroso?",
          text: "Depende del comando. Los de solo lectura, no. Los que escriben, borran o salen del proyecto, mejor que sigan preguntando. Y las reglas deny existen precisamente para lo que nunca debe ejecutarse.",
        },
        {
          title: "¿Puedo hacer los pasos sin Claude?",
          text: "Sí, y conviene hacerlo alguna vez. Los comandos de los ejercicios no dependen de Claude. Tener claro qué hace cada paso te permite revisar mejor lo que él hace.",
        },
      ],
    },
    { type: "heading", level: 2, text: "Qué sigue" },
    {
      type: "paragraph",
      text: "El Día 24 implementa la página Acerca de, la que quedó fuera de este spec a propósito, y añade el envío de correo. Antes de seguir, comprueba que estás en main, al día con el remoto, con los dos specs en implementado, que `/` muestra la página de inicio y que `/juegos` muestra la galería.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 24, verifica que puedes explicar...",
      items: [
        "Por qué `carpeta/*` permite rescatar un `.gitkeep` y `carpeta/` no.",
        "Qué debe cumplirse antes de abrir el pull request de un spec.",
        "Qué pasa con una rama cuyo pull request se cerró y cuya rama remota se borró.",
        "Qué hace git mv exactamente, y cómo se ve la historia después.",
        "Cómo se comprueba que no quedan enlaces apuntando al sitio viejo.",
        "Por qué la plantilla de Acerca de está en references y no se implementa.",
        "Cómo se actualizan los criterios de un spec anterior cuando uno nuevo los cambia.",
        "Dónde se guardan los permisos aprobados y cómo se deniega un comando.",
      ],
    },
    { type: "heading", level: 2, text: "Fuentes consultadas (noviembre 2026)" },
    {
      type: "list",
      items: [
        "[Git: gitignore, patrones y excepciones](https://git-scm.com/docs/gitignore)",
        "[Git: git mv](https://git-scm.com/docs/git-mv)",
        "[Git: git log y la opción --follow](https://git-scm.com/docs/git-log)",
        "[Git: git switch](https://git-scm.com/docs/git-switch)",
        "[Git: git pull y la opción --prune](https://git-scm.com/docs/git-pull)",
        "[GitHub: acerca de la integración de pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/about-pull-request-merges)",
        "[Claude Code: permisos, reglas allow y deny](https://code.claude.com/docs/en/permissions)",
        "[Claude Code: ajustes y archivos de configuración](https://code.claude.com/docs/en/settings)",
        "[Claude Code: skills](https://code.claude.com/docs/en/skills)",
        "[Servidor MCP de Playwright](https://github.com/microsoft/playwright-mcp)",
        "[Next.js: layouts y páginas](https://nextjs.org/docs/app/getting-started/layouts-and-pages)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "Quieres ignorar las capturas de una carpeta y conservar la carpeta con un .gitkeep. ¿Qué patrón usas?",
      options: [
        "`carpeta/` y `!carpeta/.gitkeep`",
        "`carpeta/*` y `!carpeta/.gitkeep`",
        "Solo `!carpeta/.gitkeep`",
        "carpeta",
      ],
      correctIndex: 1,
      explanation: "Con `carpeta/*` se ignora el contenido y la excepción puede rescatar el `.gitkeep`. Con `carpeta/`, Git no mira dentro y la excepción no funciona.",
    },
    {
      question: "¿Qué es un .gitkeep?",
      options: [
        "Una función de Git que conserva carpetas",
        "Un archivo vacío cuyo nombre es una convención para que la carpeta exista en el repositorio",
        "Un comando",
        "Un archivo de configuración obligatorio",
      ],
      correctIndex: 1,
      explanation: "Git guarda archivos, no carpetas. El archivo vacío es lo que hace que la carpeta se guarde. Podría llamarse de otra forma.",
    },
    {
      question: "Cierras un pull request y borras su rama remota. ¿Qué ocurre con tus commits locales?",
      options: [
        "Se pierden",
        "Siguen en tu copia, y un git push vuelve a crear la rama remota",
        "Git exige rehacerlos",
        "Pasan a main",
      ],
      correctIndex: 1,
      explanation: "La rama local queda marcada como gone, pero conserva sus commits. Un git push la vuelve a publicar.",
    },
    {
      question: "¿Qué debe mostrar el spec antes de abrir su pull request?",
      options: [
        "Estado borrador",
        "Estado implementado, con los criterios comprobados",
        "Ningún estado",
        "El estado de otro spec",
      ],
      correctIndex: 1,
      explanation: "Quien revisa lee el spec primero, y su estado dice si la promesa se dio por cumplida.",
    },
    {
      question: "¿Qué hace git mv respecto a la historia de un archivo?",
      options: [
        "La mueve y la reescribe",
        "No guarda el renombrado como tal: Git lo detecta, y git log --follow muestra la historia anterior",
        "La borra",
        "La duplica",
      ],
      correctIndex: 1,
      explanation: "Git deduce los renombrados por similitud de contenido. Con --follow se sigue la historia del archivo a través del cambio de nombre.",
    },
    {
      question: "Tras mover la galería a /juegos, ¿cómo compruebas que no quedan enlaces viejos a la raíz?",
      options: [
        "Mirando la página",
        "Con una búsqueda en el código de los destinos que apuntan a la raíz, que debe devolver solo el logo",
        "Reiniciando el servidor",
        "No se puede comprobar",
      ],
      correctIndex: 1,
      explanation: "Una búsqueda recorre todo el código a la vez. Mirar solo encuentra los enlaces que pulsas.",
    },
    {
      question: "La plantilla de Acerca de está en references, pero el spec 002 no debe implementarla. ¿Cómo lo aseguras?",
      options: [
        "Borrando la plantilla",
        "Con una sección No entra en el spec y un criterio que comprueba que /acerca-de responde 404",
        "Confiando en Claude",
        "Renombrando la carpeta",
      ],
      correctIndex: 1,
      explanation: "Tener el material no la mete en el alcance, y un criterio comprobable evita que se cuele.",
    },
    {
      question: "Apruebas con Yes, and don't ask again un comando de Bash. ¿Dónde se guarda esa regla?",
      options: [
        "En package.json",
        "En .claude/settings.local.json, en la raíz del repositorio",
        "En el servidor de Anthropic",
        "En .gitignore",
      ],
      correctIndex: 1,
      explanation: "Se guarda como regla allow en ese archivo, que Claude Code mantiene fuera de Git.",
    },
    {
      question: "¿Cómo impides que Claude lea tu archivo .env con una regla de permisos?",
      options: [
        "Borrando el archivo",
        "Con una regla deny, por ejemplo Read(./.env)",
        "Con un comentario en CLAUDE.md",
        "No se puede",
      ],
      correctIndex: 1,
      explanation: "Las reglas deny bloquean la herramienta de lectura para esa ruta. Una línea en CLAUDE.md es solo una instrucción que Claude podría ignorar.",
    },
    {
      question: "El spec 002 cambia la cabecera de tres enlaces a cuatro, y el script del spec 001 comprobaba tres. ¿Qué haces?",
      options: [
        "Dejas fallar el script",
        "Lo dices en el spec nuevo y actualizas la comprobación",
        "Borras la comprobación",
        "Vuelves a tres enlaces",
      ],
      correctIndex: 1,
      explanation: "Un spec nuevo puede sustituir un criterio anterior, siempre que quede dicho y la comprobación se actualice.",
    },
  ],
};
