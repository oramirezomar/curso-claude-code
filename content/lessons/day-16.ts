import type { Lesson } from "@/lib/types";

// Día 16 · Clases 60 y 61 de la transcripción.
// Contenido verificado en noviembre de 2026.
export const day16: Lesson = {
  day: 16,
  slug: "skills-crear-configurar-e-invocar",
  title: "Skills: crear, configurar e invocar",
  section: "Spec Driven Design",
  estimatedMinutes: 60,
  icon: "🧩",
  objectives: [
    "Explicar qué es un skill, qué carga Claude siempre y qué carga solo al usarlo.",
    "Crear un skill de proyecto a mano y otro pidiéndoselo a Claude, y comprobar dónde quedó.",
    "Elegir el modo de invocación (por defecto, solo tú, solo Claude), usar argumentos y pre-aprobar herramientas.",
    "Escribir dos skills propios, spec y spec-impl, que automatizan el flujo de la lección anterior.",
    "Auditar tus skills con un script y decidir cuándo instalar skills de otras personas.",
  ],
  blocks: [
    {
      type: "paragraph",
      text: "Ya has usado skills que vienen con Claude Code, como /batch o /doctor. En esta lección haces los tuyos. Un skill es una carpeta con un archivo SKILL.md: instrucciones que Claude carga cuando son pertinentes o cuando las invocas tú con /nombre. Sirve para dejar de pegar en el chat el mismo procedimiento una y otra vez.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "SKILL.md", label: "Único archivo obligatorio de un skill" },
        { value: ".claude/skills/", label: "Carpeta de skills de proyecto" },
        { value: "~/.claude/skills/", label: "Carpeta de skills personales" },
        { value: "3", label: "Modos de invocación: por defecto, solo tú y solo Claude" },
        { value: "1.536", label: "Caracteres máximos de descripción en el listado de skills" },
        { value: "5.000", label: "Tokens que se conservan de cada skill al compactar" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text: "Contenido verificado en noviembre de 2026 contra la documentación oficial de skills y de comandos. Los archivos de los skills, el script de auditoría y los comandos de Git de los ejercicios los ejecuté de verdad. Lo que responde Claude en los ejercicios 4, 5 y 9 es orientativo, porque depende del modelo.",
    },
    { type: "heading", level: 2, text: "Qué es un skill y para qué sirve" },
    {
      type: "paragraph",
      text: "El archivo CLAUDE.md se carga entero al empezar cada sesión. Un skill es distinto: Claude solo ve su nombre y su descripción, y el cuerpo entra a la conversación cuando alguien lo invoca. Por eso la documentación recomienda un skill cuando una parte de CLAUDE.md ha crecido hasta ser un procedimiento y no un dato. El material largo de referencia cuesta casi nada hasta que se necesita.",
    },
    {
      type: "paragraph",
      text: "Los comandos personalizados que conociste en el Día 14 se fusionaron con los skills. Un archivo en `.claude/commands/` sigue funcionando y se escribe igual, con /nombre. Pero para algo nuevo conviene crear un skill en `.claude/skills/nombre/SKILL.md`: admite archivos de apoyo, como plantillas o scripts, y la carpeta entera viaja junta.",
    },
    {
      type: "image",
      src: "/img/dia-16/anatomia-de-un-skill.svg",
      alt: "A la izquierda, la carpeta .claude/skills/spec con SKILL.md obligatorio, plantilla.md de apoyo y scripts opcional. A la derecha, el archivo SKILL.md con un frontmatter de cinco campos y un cuerpo con instrucciones en Markdown. Debajo, dos notas: el nombre y la descripción están siempre en contexto, y el cuerpo entra solo al invocar el skill.",
      caption: "Una carpeta, un archivo obligatorio y dos partes dentro de él.",
    },
    {
      type: "paragraph",
      text: "Dentro de SKILL.md hay dos partes. El frontmatter va entre dos líneas con tres guiones y debe empezar en la primera línea del archivo. Si no, Claude Code trata todo el archivo como contenido. Después va el cuerpo, que son las instrucciones en Markdown. Todos los campos del frontmatter son opcionales, pero la descripción es la que Claude lee para decidir cuándo usar el skill, así que conviene escribirla.",
    },
    {
      type: "table",
      headers: ["Campo", "Para qué sirve", "Detalle útil"],
      rows: [
        ["name", "Nombre del comando que escribes.", "Si no lo pones, se usa el nombre de la carpeta."],
        ["description", "Qué hace y cuándo usarlo.", "Pon el uso principal al principio. Se corta en 1.536 caracteres junto con when_to_use."],
        ["when_to_use", "Frases o casos que activan el skill.", "Se suma a la descripción y cuenta para el mismo límite."],
        ["argument-hint", "Pista que ves al autocompletar.", "Por ejemplo: [número del spec]."],
        ["disable-model-invocation", "Impide que Claude lo cargue por su cuenta.", "Úsalo en flujos con efectos o con momento propio."],
        ["user-invocable", "Con false, solo Claude puede invocarlo.", "Para conocimiento de fondo que no es una acción."],
        ["allowed-tools", "Herramientas que no piden permiso durante el turno.", "El permiso se borra al enviar tu siguiente mensaje."],
        ["model, context", "Modelo del turno, o ejecución en un subagente.", "Los verás en días posteriores."],
      ],
    },
    {
      type: "callout",
      variant: "warning",
      text: "Claude Code ignora sin avisar un campo del frontmatter que no reconoce. Si escribes disable-model-invocaton con una letra de menos, el skill se carga sin esa restricción y nadie te lo dice. En esta lección hay un script que detecta ese tipo de errata.",
    },
    { type: "heading", level: 2, text: "Dónde viven los skills" },
    {
      type: "image",
      src: "/img/dia-16/donde-viven.svg",
      alt: "Cuatro recuadros apilados: empresa, personal en la carpeta del usuario, proyecto en la carpeta .claude/skills del repositorio y plugin con el nombre del plugin delante. A la derecha, una nota: si hay dos con el mismo nombre gana el nivel más alto, primero empresa, luego personal y luego proyecto.",
      caption: "La ubicación decide en qué sesiones se carga el skill.",
    },
    {
      type: "table",
      headers: ["Ubicación", "Ruta", "Se carga en"],
      rows: [
        ["Empresa", "Carpeta de ajustes administrados", "Todas las personas de la organización."],
        ["Personal", "~/.claude/skills/nombre/SKILL.md", "Todos tus proyectos, en este equipo."],
        ["Proyecto", ".claude/skills/nombre/SKILL.md", "Las sesiones de este repositorio. Se versiona con Git."],
        ["Anidado", "subcarpeta/.claude/skills/nombre/SKILL.md", "Al trabajar en archivos de esa subcarpeta."],
        ["Plugin", "plugin/skills/nombre/SKILL.md", "Donde esté activado el plugin, como /plugin:nombre."],
      ],
    },
    {
      type: "paragraph",
      text: "La carpeta personal vive en tu carpeta de usuario, tanto en Mac y Linux como en Windows. Lo normal es empezar por el nivel de proyecto: el skill viaja con el repositorio y lo recibe todo el equipo al clonar. Una entrada de la carpeta puede ser un enlace simbólico a otra ruta, y Claude Code lo lee igual. Si dos skills de distinto nivel se llaman igual, gana el de nivel más alto, así que un skill de proyecto puede quedar tapado por uno tuyo.",
    },
    { type: "heading", level: 2, text: "Crear un skill a mano" },
    {
      type: "paragraph",
      text: "El ejemplo es pequeño a propósito, para que el efecto se vea de inmediato: un skill llamado breve que obliga a responder en tres frases y a terminar con una palabra fija. Como la marca es siempre la misma, sabes si el skill se aplicó o no con solo mirar la última línea.",
    },
    {
      type: "code",
      lang: "markdown",
      title: ".claude/skills/breve/SKILL.md",
      code: `---
name: breve
description: Responde de forma muy breve. Úsalo cuando la persona pida una respuesta corta o escriba la palabra breve.
---

Responde en español, en un máximo de tres frases.
No uses listas ni encabezados.
Termina siempre con una línea que diga solo: LISTO`,
    },
    {
      type: "paragraph",
      text: "Con el archivo guardado, escribe /breve en Claude Code y el skill debe aparecer en la lista. La documentación dice que Claude Code vigila las carpetas de skills y recoge los cambios dentro de la sesión. Si el skill no aparece, ejecuta /reload-skills, que vuelve a leer las carpetas sin reiniciar. En el video se pedía salir con Ctrl+C y volver a entrar. Reiniciar sigue funcionando, pero normalmente ya no hace falta.",
    },
    { type: "heading", level: 2, text: "Pedirle a Claude que lo cree" },
    {
      type: "paragraph",
      text: "También puedes describir lo que quieres y dejar que Claude escriba el skill. Hay una palabra que no debes omitir: dile que lo haga a nivel de proyecto y que lo guarde en `.claude/skills/`. Si no, puede dejarlo en tu carpeta personal. Mira siempre la ruta que propone antes de aprobar la escritura: si ves tu nombre de usuario o `~`, es el nivel personal.",
    },
    {
      type: "paragraph",
      text: "En el video Claude lo guardó como un comando, en `.claude/commands/`. Funciona, pero hoy es la ruta antigua. Si ves eso, pídele que lo mueva a `.claude/skills/nombre/SKILL.md` y verás el mismo /nombre. Borrar un skill es borrar su carpeta: Claude Code lo quita de la lista en la sesión en curso.",
    },
    { type: "heading", level: 2, text: "Quién puede invocar un skill" },
    {
      type: "image",
      src: "/img/dia-16/quien-invoca.svg",
      alt: "Tres columnas. Por defecto: tú puedes invocarlo, Claude también y la descripción está en contexto. Solo tú, con disable-model-invocation en true: tú sí, Claude no y la descripción no está en contexto. Solo Claude, con user-invocable en false: tú no, Claude sí y la descripción está en contexto. Debajo, una regla práctica.",
      caption: "Dos campos del frontmatter controlan quién lo dispara.",
    },
    {
      type: "paragraph",
      text: "Por defecto, un skill lo puedes invocar tú con /nombre y también Claude por su cuenta si la descripción encaja con lo que hablas. Eso es cómodo para ayudas sin riesgo. Para un flujo con efectos, como hacer un commit o desplegar, no quieres que Claude decida el momento. Con disable-model-invocation: true el skill queda solo para ti, y su descripción ni siquiera ocupa contexto.",
    },
    {
      type: "paragraph",
      text: "Para que /nombre se ejecute directamente, debe ir al principio de tu mensaje. Si lo escribes después de otras palabras, cuenta como permiso para que Claude lo use, pero no lo lanza por sí mismo. Y si lo mencionas sin la barra, es solo texto.",
    },
    { type: "heading", level: 2, text: "Argumentos y archivos de apoyo" },
    {
      type: "paragraph",
      text: "Todo lo que escribes después del nombre llega al skill. Dentro del cuerpo, `$ARGUMENTS` es el texto completo, `$0` y `$1` son la primera y la segunda palabra, y puedes declarar nombres con el campo arguments. Si pasas argumentos y el cuerpo no tiene ningún marcador, Claude Code los añade al final como una línea que empieza por ARGUMENTS:, para que no se pierdan. El campo argument-hint solo es la pista que ves al autocompletar.",
    },
    {
      type: "paragraph",
      text: "Cuando el skill necesita un documento largo, una plantilla o un script, ponlo en la misma carpeta y menciónalo desde SKILL.md. La variable `${CLAUDE_SKILL_DIR}` da la ruta de esa carpeta, así que la referencia funciona aunque estés en otro directorio. Los archivos de apoyo se leen solo cuando el skill los necesita y no cuestan contexto antes.",
    },
    { type: "heading", level: 2, text: "Pre-aprobar herramientas con allowed-tools" },
    {
      type: "paragraph",
      text: "El campo allowed-tools lista herramientas que Claude puede usar sin pedirte permiso mientras dura el turno del skill. Por ejemplo, `Bash(git switch *)` permite crear una rama sin preguntar. Tiene tres matices importantes. No restringe nada: todas las herramientas siguen disponibles y tus ajustes de permisos siguen mandando sobre las que no listas. El permiso se borra cuando envías tu siguiente mensaje. Y si quieres una autorización para toda la sesión, no se hace aquí: se añaden reglas de permiso en tus ajustes.",
    },
    {
      type: "paragraph",
      text: "La consecuencia práctica para un skill que avanza por pasos y se detiene a esperar tu confirmación es que, tras tu respuesta, puede volver a pedir permisos que ya había recibido. No es un error del skill, es cómo está definido el campo.",
    },
    { type: "heading", level: 2, text: "Qué pasa con el cuerpo después de invocarlo" },
    {
      type: "paragraph",
      text: "Al invocar un skill, su cuerpo entra a la conversación como un solo mensaje y se queda ahí. Claude Code no vuelve a leer el archivo en los turnos siguientes. De esto se desprenden tres reglas de redacción. Escribe lo que debe valer en toda la tarea como una norma general, por ejemplo: ejecuta las pruebas tras cada cambio, y no solo: ejecuta las pruebas. Pon lo más importante al principio, porque al compactar la conversación se conservan los primeros 5.000 tokens de cada skill, con un tope común de 25.000. Y si Claude deja de seguirlo tras una compactación, invócalo otra vez.",
    },
    {
      type: "paragraph",
      text: "Una regla que debe cumplirse siempre, sin excepción, no pertenece a un skill sino a un hook, que se ejecuta por evento y no depende de que Claude lo recuerde. Los verás más adelante. Sobre las descripciones, Claude Code reserva para el listado de skills un presupuesto del 1 % de la ventana de contexto. Si tienes muchos, Claude Code recorta primero las descripciones de los que menos invocas, así que elimina o acorta los que no uses.",
    },
    { type: "heading", level: 2, text: "Dos skills para el flujo de specs" },
    {
      type: "paragraph",
      text: "Ahora se junta todo. El flujo del Día 15 tiene dos momentos que conviene separar: pensar el spec y construirlo. Son dos skills. spec entrevista y escribe el documento, sin tocar código. spec-impl lo implementa por pasos en una rama propia. Ambos son solo tuyos, porque entre uno y otro hay una decisión humana: aprobar el spec.",
    },
    {
      type: "image",
      src: "/img/dia-16/spec-y-spec-impl.svg",
      alt: "Cuatro recuadros en fila: /spec entrevista y escribe el spec sin código, el archivo specs/001-nombre.md en estado borrador, tú apruebas y cambias el estado a aprobado, y /spec-impl 001 crea la rama y avanza por pasos con commit, sin merge ni push. Debajo, dos notas: por qué son dos skills y qué muestra spec-impl al terminar.",
      caption: "Entre el spec y la implementación hay una persona que decide.",
    },
    {
      type: "code",
      lang: "markdown",
      title: ".claude/skills/spec/SKILL.md",
      code: `---
name: spec
description: Escribe un spec en specs/ con seis secciones, después de entrevistar a la persona. No escribe código.
argument-hint: "[problema en una frase]"
disable-model-invocation: true
allowed-tools: Read Glob Grep
---

Vas a ayudar a escribir un spec. No escribas código y no toques archivos fuera de specs/.

Problema recibido: $ARGUMENTS

1. Si el problema está vacío o ocupa más de una frase, pide que lo reformule en una frase y espera.
2. Lee README.md y CLAUDE.md si existen, y lista specs/ para elegir el siguiente número.
3. Entrevista a la persona con preguntas cortas, tres como máximo cada vez, con opciones y una recomendación. Cubre alcance, lo que no entra, datos, criterios y decisiones. Sigue hasta que no queden dudas.
4. Redacta el spec con la estructura de \${CLAUDE_SKILL_DIR}/plantilla.md. Cada criterio debe poder responderse con sí o no, sin palabras como bonito, bien o rápido.
5. Guarda el archivo como specs/NNN-nombre.md con estado: borrador. Muestra la ruta y espera la aprobación. Tú no cambias el estado a aprobado.`,
    },
    {
      type: "paragraph",
      text: "El skill spec lee la plantilla de su propia carpeta con `${CLAUDE_SKILL_DIR}`. La plantilla tiene las seis secciones del Día 15, y el validador de esa lección la da por válida. Así, lo que Claude escriba nace con la forma correcta.",
    },
    {
      type: "code",
      lang: "markdown",
      title: ".claude/skills/spec/plantilla.md",
      code: `---
estado: borrador
---

# NNN. Título corto

## Objetivo
Una sola frase que describa el problema.

## Alcance
Entra:
- ...

No entra:
- ...

## Modelo de datos
- ...

## Plan de implementación
1. ...
2. ...

## Criterios de aceptación
- [ ] Un criterio que se responda con sí o no.

## Decisiones
- Tomada: ... porque ...
- Descartada: ... porque ...`,
    },
    {
      type: "code",
      lang: "markdown",
      title: ".claude/skills/spec-impl/SKILL.md",
      code: `---
name: spec-impl
description: Implementa un spec aprobado por pasos, en una rama propia, con un commit por paso.
argument-hint: "[número del spec, por ejemplo 001]"
disable-model-invocation: true
allowed-tools: Bash(git status *) Bash(git switch *) Bash(git add *) Bash(git commit *)
---

Implementa el spec número $ARGUMENTS.

1. Lee specs/$ARGUMENTS-*.md. Si su estado no es aprobado, detente y dilo.
2. Ejecuta git status. Si hay cambios sin guardar, detente y pregunta qué hacer con ellos.
3. Crea la rama spec/<nombre del archivo sin .md> con git switch -c.
4. Sigue el plan en orden. Tras cada paso, muestra el cambio, haz un commit y espera mi confirmación antes del siguiente.
5. Al terminar, comprueba cada criterio de aceptación y muestra su evidencia: el comando y su salida. Si todos pasan, cambia el estado del spec a implementado y haz un commit.
6. No cambies a main, no hagas merge ni push.`,
    },
    {
      type: "paragraph",
      text: "Fíjate en las decisiones de diseño de spec-impl. Exige que el estado sea aprobado antes de empezar. Revisa que no haya cambios sin guardar, para no mezclar trabajo ajeno en la rama. Trabaja en una rama spec/NNN-nombre, de modo que main queda intacta. Se detiene tras cada paso. Muestra evidencia de cada criterio al terminar. Y no hace merge ni push: esas decisiones siguen siendo tuyas. Las herramientas pre-aprobadas son solo las de Git que necesita, no un permiso abierto.",
    },
    { type: "heading", level: 2, text: "Auditar tus skills con un script" },
    {
      type: "paragraph",
      text: "Como los campos desconocidos se ignoran sin avisar, conviene un chequeo mecánico. Este script lee cada SKILL.md de una carpeta, muestra el nombre, quién puede invocarlo y el principio de la descripción, y avisa si falta el frontmatter o si hay un campo que Claude Code no conoce. Termina con código 1 si hay avisos, así que sirve también en una integración continua. No sustituye a la herramienta oficial de validación, que en versiones recientes se ejecuta con claude plugin validate sobre la carpeta de skills.",
    },
    {
      type: "code",
      lang: "js",
      title: "scripts/listar-skills.js",
      code: `// Lista los skills de una carpeta y avisa de campos que Claude Code ignoraría.
const fs = require("fs");
const path = require("path");

const CAMPOS = [
  "name", "description", "when_to_use", "argument-hint", "arguments",
  "disable-model-invocation", "user-invocable", "allowed-tools",
  "disallowed-tools", "model", "effort", "context", "agent", "background",
  "hooks", "paths", "shell", "metadata", "license", "compatibility",
];

function esVerdadero(valor) {
  return /^(true|yes|on|1)$/i.test(String(valor || "").trim());
}

function leerFrontmatter(texto) {
  if (!texto.startsWith("---\\n")) return { campos: {}, aviso: "no empieza con ---" };
  const fin = texto.indexOf("\\n---", 4);
  if (fin === -1) return { campos: {}, aviso: "frontmatter sin cerrar" };
  const campos = {};
  texto
    .slice(4, fin)
    .split("\\n")
    .forEach((linea) => {
      const m = linea.match(/^([A-Za-z_-]+):\\s*(.*)$/);
      if (m) campos[m[1]] = m[2].replace(/^"|"$/g, "");
    });
  return { campos, aviso: "" };
}

function quienInvoca(campos) {
  if (esVerdadero(campos["disable-model-invocation"])) return "solo tú";
  if (campos["user-invocable"] !== undefined && !esVerdadero(campos["user-invocable"])) return "solo Claude";
  return "tú y Claude";
}

const raiz = process.argv[2] || ".claude/skills";
if (!fs.existsSync(raiz)) {
  console.log("No existe la carpeta: " + raiz);
  process.exit(2);
}

let avisos = 0;
fs.readdirSync(raiz)
  .sort()
  .forEach((dir) => {
    const archivo = path.join(raiz, dir, "SKILL.md");
    if (!fs.existsSync(archivo)) return;
    const { campos, aviso } = leerFrontmatter(fs.readFileSync(archivo, "utf8"));
    const nombre = campos.name || dir;
    const desc = (campos.description || "(sin descripción)").slice(0, 48);
    console.log("/" + nombre + " | " + quienInvoca(campos) + " | " + desc);
    if (aviso) {
      avisos++;
      console.log("  AVISO: " + aviso);
    }
    Object.keys(campos)
      .filter((c) => !CAMPOS.includes(c))
      .forEach((c) => {
        avisos++;
        console.log("  AVISO: campo desconocido, se ignora: " + c);
      });
  });
process.exit(avisos > 0 ? 1 : 0);`,
    },
    { type: "heading", level: 2, text: "Instalar skills de otras personas" },
    {
      type: "paragraph",
      text: "Un skill ajeno es una carpeta que puedes copiar a `.claude/skills/` o a tu carpeta personal, o enlazar con un enlace simbólico, y existen catálogos y plugins que lo hacen por ti. Antes de instalar uno, léelo entero. Es texto que Claude seguirá con tus permisos, y puede traer scripts o un campo allowed-tools que pre-apruebe herramientas. La documentación avisa de que el allowed-tools de un skill de proyecto se aplica incluso en una ejecución no interactiva en una carpeta en la que nunca has confiado. Revisa también esos campos en los repositorios que clones.",
    },
    {
      type: "callout",
      variant: "info",
      text: "Adapta lo que instales. Un skill ajeno es un punto de partida: cámbialo a tu idioma, a tu forma de trabajar y a las herramientas que quieres pre-aprobar. Cuanto más lo uses, más fácil te resulta ajustarlo.",
    },
    { type: "heading", level: 2, text: "Ejercicios guiados y experimentos" },
    {
      type: "paragraph",
      text: "Los ejercicios usan un proyecto nuevo, 05-arkanoid. En la próxima lección construirás ahí el juego con los skills de hoy. Las salidas de find, de cat, del script listar-skills, del validador y de Git las ejecuté de verdad. Lo que responde Claude en los ejercicios 4, 5 y 9 es orientativo. Los cálculos de los experimentos del final se ejecutan en el navegador.",
    },
    {
      type: "exercise",
      title: "Ejercicio 1: el proyecto de Arkanoid",
      description: "Crea la carpeta y un README de una línea de propósito.",
      steps: [
        {
          instruction: "Crea la carpeta, con las subcarpetas que usarás, y entra en ella.",
          command: "mkdir -p ~/ClaudeCode/05-arkanoid/scripts ~/ClaudeCode/05-arkanoid/specs && cd ~/ClaudeCode/05-arkanoid",
        },
        {
          instruction: "Guarda un README corto. Es lo único que existe del juego por ahora.",
          file: {
            name: "README.md",
            code: `# Arkanoid

Un juego de Arkanoid, también conocido como Breakout: una pelota rebota en una plataforma y rompe bloques.
Se hace con HTML, CSS y JavaScript, sin dependencias, y se juega en el navegador.
Todavía no está implementado.`,
          },
        },
        {
          instruction: "Comprueba que se guardó.",
          command: "cat README.md",
          expected: "# Arkanoid\n\nUn juego de Arkanoid, también conocido como Breakout: una pelota rebota en una plataforma y rompe bloques.\nSe hace con HTML, CSS y JavaScript, sin dependencias, y se juega en el navegador.\nTodavía no está implementado.",
        },
      ],
      verify: "El proyecto tiene README.md y las carpetas scripts y specs.",
    },
    {
      type: "exercise",
      title: "Ejercicio 2: qué skills ya tienes",
      description: "Mira los skills disponibles antes de crear los tuyos.",
      steps: [
        {
          instruction: "Abre Claude Code en la carpeta del proyecto y lista los skills.",
          command: "claude\n/skills",
          expected: "Una lista con los skills incluidos en Claude Code, como batch, debug o loop, y los tuyos si ya tienes alguno en ~/.claude/skills. Escribe para filtrar y pulsa Esc para cerrar.",
        },
        {
          instruction: "Mira si tienes skills personales. Si la carpeta no existe, es normal.",
          command: "ls ~/.claude/skills",
        },
      ],
      verify: "Sabes distinguir los skills incluidos de los que están en tu carpeta personal y en la del proyecto.",
    },
    {
      type: "exercise",
      title: "Ejercicio 3: tu primer skill a mano",
      description: "Crea el skill breve en el proyecto.",
      steps: [
        {
          instruction: "Crea la carpeta del skill. El nombre de la carpeta será el comando.",
          command: "mkdir -p .claude/skills/breve",
        },
        {
          instruction: "Guarda el archivo SKILL.md. El nombre del archivo va en mayúsculas.",
          file: {
            name: ".claude/skills/breve/SKILL.md",
            code: `---
name: breve
description: Responde de forma muy breve. Úsalo cuando la persona pida una respuesta corta o escriba la palabra breve.
---

Responde en español, en un máximo de tres frases.
No uses listas ni encabezados.
Termina siempre con una línea que diga solo: LISTO`,
          },
        },
        {
          instruction: "Comprueba que está donde debe.",
          command: "find .claude -type f",
          expected: ".claude/skills/breve/SKILL.md",
        },
      ],
      verify: "La ruta es exactamente .claude/skills/breve/SKILL.md, con SKILL.md en mayúsculas.",
    },
    {
      type: "exercise",
      title: "Ejercicio 4: usar el skill",
      description: "Invócalo con la barra y comprueba la marca.",
      steps: [
        {
          instruction: "En Claude Code, comprueba que breve aparece. Si no aparece, vuelve a leer las carpetas.",
          command: "/skills",
          expected: "breve aparece en la lista, marcado como skill de proyecto.",
        },
        {
          instruction: "Si falta, ejecuta esto y vuelve a mirar.",
          command: "/reload-skills",
          expected: "Un mensaje con la cantidad de skills disponibles y cuántos se añadieron.",
        },
        {
          instruction: "Invócalo con una pregunta del proyecto. Lo que va después del nombre llega como argumento.",
          command: "/breve Explícame cómo funciona un juego de Arkanoid",
          expected: "Una respuesta de tres frases como máximo, sin listas, y una última línea con la palabra LISTO.",
        },
      ],
      verify: "La última línea de la respuesta es LISTO. Haz la misma pregunta sin /breve y compara.",
    },
    {
      type: "exercise",
      title: "Ejercicio 5: que Claude lo cree, y borrarlo",
      description: "Pídele un skill a nivel de proyecto y comprueba la ruta.",
      steps: [
        {
          instruction: "Describe el skill y deja claro el nivel. Revisa la ruta antes de aprobar la escritura.",
          command: "Crea un skill llamado glosario que, cuando pregunte por un término del juego como paleta, bloque o power-up, responda con una definición de una frase. Debe ser de proyecto y guardarse en .claude/skills/glosario/SKILL.md, no a nivel personal.",
          expected: "Claude propone escribir .claude/skills/glosario/SKILL.md. Si la ruta contiene tu nombre de usuario, recházala y repite el nivel de proyecto.",
        },
        {
          instruction: "Comprueba que quedó en el proyecto.",
          command: "ls .claude/skills",
          expected: "breve\nglosario",
        },
        {
          instruction: "Bórralo: para quitar un skill basta con borrar su carpeta. Después mira la lista otra vez.",
          command: "rm -r .claude/skills/glosario && ls .claude/skills",
          expected: "breve",
        },
      ],
      verify: "El skill estuvo en .claude/skills, no en ~/.claude, y ya no aparece en /skills.",
    },
    {
      type: "exercise",
      title: "Ejercicio 6: el skill spec",
      description: "Crea el skill que escribe specs, con su plantilla.",
      steps: [
        {
          instruction: "Crea las carpetas de los dos skills que harás en este ejercicio y en el siguiente.",
          command: "mkdir -p .claude/skills/spec .claude/skills/spec-impl",
        },
        {
          instruction: "Guarda el skill spec.",
          file: {
            name: ".claude/skills/spec/SKILL.md",
            code: `---
name: spec
description: Escribe un spec en specs/ con seis secciones, después de entrevistar a la persona. No escribe código.
argument-hint: "[problema en una frase]"
disable-model-invocation: true
allowed-tools: Read Glob Grep
---

Vas a ayudar a escribir un spec. No escribas código y no toques archivos fuera de specs/.

Problema recibido: $ARGUMENTS

1. Si el problema está vacío o ocupa más de una frase, pide que lo reformule en una frase y espera.
2. Lee README.md y CLAUDE.md si existen, y lista specs/ para elegir el siguiente número.
3. Entrevista a la persona con preguntas cortas, tres como máximo cada vez, con opciones y una recomendación. Cubre alcance, lo que no entra, datos, criterios y decisiones. Sigue hasta que no queden dudas.
4. Redacta el spec con la estructura de \${CLAUDE_SKILL_DIR}/plantilla.md. Cada criterio debe poder responderse con sí o no, sin palabras como bonito, bien o rápido.
5. Guarda el archivo como specs/NNN-nombre.md con estado: borrador. Muestra la ruta y espera la aprobación. Tú no cambias el estado a aprobado.`,
          },
        },
        {
          instruction: "Guarda la plantilla en la misma carpeta.",
          file: {
            name: ".claude/skills/spec/plantilla.md",
            code: `---
estado: borrador
---

# NNN. Título corto

## Objetivo
Una sola frase que describa el problema.

## Alcance
Entra:
- ...

No entra:
- ...

## Modelo de datos
- ...

## Plan de implementación
1. ...
2. ...

## Criterios de aceptación
- [ ] Un criterio que se responda con sí o no.

## Decisiones
- Tomada: ... porque ...
- Descartada: ... porque ...`,
          },
        },
        {
          instruction: "Copia el validador de la lección anterior y pásaselo a la plantilla. Debe nacer con la forma correcta.",
          command: "cp ~/ClaudeCode/04-tetris/scripts/validar-spec.js scripts/ && node scripts/validar-spec.js .claude/skills/spec/plantilla.md",
          expected: "OK sección: Objetivo\nOK sección: Alcance\nOK sección: Modelo de datos\nOK sección: Plan de implementación\nOK sección: Criterios de aceptación\nOK sección: Decisiones\nRESULTADO: spec válido",
        },
      ],
      verify: "El validador da spec válido y la carpeta del skill tiene SKILL.md y plantilla.md.",
    },
    {
      type: "exercise",
      title: "Ejercicio 7: el skill spec-impl y su flujo de Git",
      description: "Crea el segundo skill y ejecuta a mano lo que hará con Git.",
      steps: [
        {
          instruction: "Guarda el skill.",
          file: {
            name: ".claude/skills/spec-impl/SKILL.md",
            code: `---
name: spec-impl
description: Implementa un spec aprobado por pasos, en una rama propia, con un commit por paso.
argument-hint: "[número del spec, por ejemplo 001]"
disable-model-invocation: true
allowed-tools: Bash(git status *) Bash(git switch *) Bash(git add *) Bash(git commit *)
---

Implementa el spec número $ARGUMENTS.

1. Lee specs/$ARGUMENTS-*.md. Si su estado no es aprobado, detente y dilo.
2. Ejecuta git status. Si hay cambios sin guardar, detente y pregunta qué hacer con ellos.
3. Crea la rama spec/<nombre del archivo sin .md> con git switch -c.
4. Sigue el plan en orden. Tras cada paso, muestra el cambio, haz un commit y espera mi confirmación antes del siguiente.
5. Al terminar, comprueba cada criterio de aceptación y muestra su evidencia: el comando y su salida. Si todos pasan, cambia el estado del spec a implementado y haz un commit.
6. No cambies a main, no hagas merge ni push.`,
          },
        },
        {
          instruction: "Para ver qué hará, repite sus pasos de Git a mano con un spec de prueba en estado aprobado.",
          command: "printf -- '---\\nestado: aprobado\\n---\\n# 001 Niveles\\n' > specs/001-niveles.md && git init -q -b main && git add -A && git commit -q -m base && git status --porcelain && git switch -c spec/001-niveles",
          expected: "Switched to a new branch 'spec/001-niveles'",
        },
        {
          instruction: "Comprueba la rama y vuelve a main.",
          command: "git branch --show-current && git switch main",
          expected: "spec/001-niveles\nSwitched to branch 'main'",
        },
      ],
      verify: "git status no mostró nada antes de crear la rama: eso es lo que el skill comprueba antes de empezar.",
    },
    {
      type: "exercise",
      title: "Ejercicio 8: auditar con el script",
      description: "Lista los skills y provoca un error de escritura.",
      steps: [
        {
          instruction: "Guarda el script.",
          file: {
            name: "scripts/listar-skills.js",
            code: `// Lista los skills de una carpeta y avisa de campos que Claude Code ignoraría.
const fs = require("fs");
const path = require("path");

const CAMPOS = [
  "name", "description", "when_to_use", "argument-hint", "arguments",
  "disable-model-invocation", "user-invocable", "allowed-tools",
  "disallowed-tools", "model", "effort", "context", "agent", "background",
  "hooks", "paths", "shell", "metadata", "license", "compatibility",
];

function esVerdadero(valor) {
  return /^(true|yes|on|1)$/i.test(String(valor || "").trim());
}

function leerFrontmatter(texto) {
  if (!texto.startsWith("---\\n")) return { campos: {}, aviso: "no empieza con ---" };
  const fin = texto.indexOf("\\n---", 4);
  if (fin === -1) return { campos: {}, aviso: "frontmatter sin cerrar" };
  const campos = {};
  texto
    .slice(4, fin)
    .split("\\n")
    .forEach((linea) => {
      const m = linea.match(/^([A-Za-z_-]+):\\s*(.*)$/);
      if (m) campos[m[1]] = m[2].replace(/^"|"$/g, "");
    });
  return { campos, aviso: "" };
}

function quienInvoca(campos) {
  if (esVerdadero(campos["disable-model-invocation"])) return "solo tú";
  if (campos["user-invocable"] !== undefined && !esVerdadero(campos["user-invocable"])) return "solo Claude";
  return "tú y Claude";
}

const raiz = process.argv[2] || ".claude/skills";
if (!fs.existsSync(raiz)) {
  console.log("No existe la carpeta: " + raiz);
  process.exit(2);
}

let avisos = 0;
fs.readdirSync(raiz)
  .sort()
  .forEach((dir) => {
    const archivo = path.join(raiz, dir, "SKILL.md");
    if (!fs.existsSync(archivo)) return;
    const { campos, aviso } = leerFrontmatter(fs.readFileSync(archivo, "utf8"));
    const nombre = campos.name || dir;
    const desc = (campos.description || "(sin descripción)").slice(0, 48);
    console.log("/" + nombre + " | " + quienInvoca(campos) + " | " + desc);
    if (aviso) {
      avisos++;
      console.log("  AVISO: " + aviso);
    }
    Object.keys(campos)
      .filter((c) => !CAMPOS.includes(c))
      .forEach((c) => {
        avisos++;
        console.log("  AVISO: campo desconocido, se ignora: " + c);
      });
  });
process.exit(avisos > 0 ? 1 : 0);`,
          },
        },
        {
          instruction: "Lista los skills del proyecto.",
          command: "node scripts/listar-skills.js",
          expected: "/breve | tú y Claude | Responde de forma muy breve. Úsalo cuando la per\n/spec | solo tú | Escribe un spec en specs/ con seis secciones, de\n/spec-impl | solo tú | Implementa un spec aprobado por pasos, en una ra",
        },
        {
          instruction: "Crea un skill de prueba con un campo mal escrito y vuelve a listar.",
          command: "mkdir -p .claude/skills/prueba && printf -- '---\\ndescription: Prueba con un campo mal escrito\\ndisable-model-invocaton: true\\n---\\nHola\\n' > .claude/skills/prueba/SKILL.md && node scripts/listar-skills.js",
          expected: "/breve | tú y Claude | Responde de forma muy breve. Úsalo cuando la per\n/prueba | tú y Claude | Prueba con un campo mal escrito\n  AVISO: campo desconocido, se ignora: disable-model-invocaton\n/spec | solo tú | Escribe un spec en specs/ con seis secciones, de\n/spec-impl | solo tú | Implementa un spec aprobado por pasos, en una ra",
        },
        {
          instruction: "Observa que el skill de prueba figura como tú y Claude: la errata dejó sin efecto la restricción. Bórralo.",
          command: "rm -r .claude/skills/prueba",
        },
      ],
      verify: "El aviso aparece solo mientras existe el skill con la errata. Con skills sanos, el script termina con código 0.",
    },
    {
      type: "exercise",
      title: "Ejercicio 9: comprobar que solo tú los lanzas",
      description: "Verifica el efecto de disable-model-invocation.",
      steps: [
        {
          instruction: "En Claude Code, escribe solo la barra y mira la pista de argumentos al autocompletar.",
          command: "/spec",
          expected: "Aparece spec con la pista [problema en una frase].",
        },
        {
          instruction: "Pídelo en lenguaje natural, sin la barra, y observa que Claude no lo carga por su cuenta.",
          command: "Implementa el spec 001",
          expected: "Claude no carga el skill spec-impl. Puede sugerirte que lo ejecutes tú con /spec-impl 001, o intentar hacer el trabajo sin el skill.",
        },
      ],
      verify: "Los dos skills solo se lanzan cuando escribes /nombre al principio de tu mensaje. Aún no ejecutes /spec-impl: lo harás en la próxima lección.",
    },
    {
      type: "playground",
      title: "Experimento 10: leer el frontmatter",
      description: "Esta es la lógica de la auditoría, en pequeño. Cambia los textos y comprueba qué detecta: un campo mal escrito, un frontmatter sin apertura o sin cierre.",
      code: `const CAMPOS = ["name", "description", "argument-hint", "disable-model-invocation", "user-invocable", "allowed-tools"];
function revisar(texto) {
  if (!texto.startsWith("---\\n")) return ["AVISO: no empieza con ---, todo se trata como contenido"];
  const fin = texto.indexOf("\\n---", 4);
  if (fin === -1) return ["AVISO: frontmatter sin cerrar"];
  const salida = [];
  texto.slice(4, fin).split("\\n").forEach((linea) => {
    const m = linea.match(/^([A-Za-z_-]+):\\s*(.*)$/);
    if (!m) return;
    salida.push(CAMPOS.includes(m[1]) ? "ok " + m[1] : "IGNORADO " + m[1]);
  });
  return salida;
}
const skills = {
  correcto: "---\\nname: breve\\ndescription: Responde corto\\n---\\nCuerpo",
  conErrata: "---\\ndescription: Prueba\\ndisable-model-invocaton: true\\n---\\nCuerpo",
  sinApertura: "descripcion: nada\\n---\\nCuerpo",
  sinCierre: "---\\ndescription: Prueba\\nCuerpo",
};
Object.keys(skills).forEach((k) => console.log(k + ": " + revisar(skills[k]).join(", ")));`,
      expected: "correcto: ok name, ok description\nconErrata: ok description, IGNORADO disable-model-invocaton\nsinApertura: AVISO: no empieza con ---, todo se trata como contenido\nsinCierre: AVISO: frontmatter sin cerrar",
    },
    {
      type: "playground",
      title: "Experimento 11: argumentos en el cuerpo",
      description: "Modelo simplificado de cómo se sustituyen los argumentos. Prueba otros cuerpos y valores. Fíjate en qué pasa con un marcador sin valor y con un cuerpo sin marcadores.",
      code: `function renderizar(cuerpo, argumentos, nombres) {
  const lista = argumentos === "" ? [] : argumentos.split(" ");
  let recibio = false;
  const texto = cuerpo.replace(/\\$ARGUMENTS\\[(\\d+)\\]|\\$ARGUMENTS|\\$(\\d+)|\\$([a-z]+)/g, (tal, i1, i2, nombre) => {
    if (tal === "$ARGUMENTS") {
      if (argumentos !== "") recibio = true;
      return argumentos;
    }
    if (i1 !== undefined || i2 !== undefined) {
      const valor = lista[Number(i1 !== undefined ? i1 : i2)];
      if (valor === undefined) return tal;
      recibio = true;
      return valor;
    }
    const pos = nombres.indexOf(nombre);
    if (pos === -1) return tal;
    if (lista[pos] === undefined) return "";
    recibio = true;
    return lista[pos];
  });
  return !recibio && argumentos !== "" ? texto + " | ARGUMENTS: " + argumentos : texto;
}
console.log(renderizar("Implementa el spec número $ARGUMENTS.", "001", []));
console.log(renderizar("Compara $0 con $1.", "viejo nuevo", []));
console.log(renderizar("Arregla $issue en la rama $branch.", "123 arreglo-123", ["issue", "branch"]));
console.log(renderizar("Revisa el código.", "src/game.js", []));
console.log(renderizar("Usa $1 y $0.", "solo", []));`,
      expected: "Implementa el spec número 001.\nCompara viejo con nuevo.\nArregla 123 en la rama arreglo-123.\nRevisa el código. | ARGUMENTS: src/game.js\nUsa $1 y solo.",
    },
    {
      type: "playground",
      title: "Experimento 12: quién invoca",
      description: "Los dos campos del frontmatter determinan tres modos. Añade un caso nuevo o cambia uno.",
      code: `function modo(f) {
  const soloTu = f["disable-model-invocation"] === true;
  const soloClaude = f["user-invocable"] === false;
  return {
    tu: !soloClaude,
    claude: !soloTu,
    descripcion: !soloTu,
  };
}
function texto(v) {
  return v ? "sí" : "no";
}
const casos = {
  breve: {},
  spec: { "disable-model-invocation": true },
  contexto: { "user-invocable": false },
};
Object.keys(casos).forEach((nombre) => {
  const m = modo(casos[nombre]);
  console.log(nombre + " -> tú: " + texto(m.tu) + " | Claude por su cuenta: " + texto(m.claude) + " | descripción en contexto: " + texto(m.descripcion));
});`,
      expected: "breve -> tú: sí | Claude por su cuenta: sí | descripción en contexto: sí\nspec -> tú: sí | Claude por su cuenta: no | descripción en contexto: no\ncontexto -> tú: no | Claude por su cuenta: sí | descripción en contexto: sí",
    },
    {
      type: "playground",
      title: "Experimento 13: nombres repetidos",
      description: "Si dos skills de distinto nivel se llaman igual, gana el más alto. Los de plugin llevan el nombre del plugin delante. Añade otros skills.",
      code: `const ORDEN = ["empresa", "personal", "proyecto"];
function quienResponde(comando, skills) {
  const candidatos = skills
    .filter((s) => s.lugar !== "plugin" && s.nombre === comando)
    .sort((a, b) => ORDEN.indexOf(a.lugar) - ORDEN.indexOf(b.lugar));
  if (candidatos.length === 0) return "ninguno";
  const extra = candidatos.length > 1 ? " (tapa a " + candidatos.slice(1).map((s) => s.lugar).join(", ") + ")" : "";
  return candidatos[0].lugar + extra;
}
const skills = [
  { nombre: "deploy", lugar: "personal" },
  { nombre: "deploy", lugar: "proyecto" },
  { nombre: "spec-impl", lugar: "proyecto" },
  { nombre: "deploy", lugar: "plugin", plugin: "calidad" },
];
["deploy", "spec-impl", "revisar"].forEach((c) => console.log("/" + c + " -> " + quienResponde(c, skills)));
skills.filter((s) => s.lugar === "plugin").forEach((s) => console.log("/" + s.plugin + ":" + s.nombre + " -> plugin " + s.plugin));`,
      expected: "/deploy -> personal (tapa a proyecto)\n/spec-impl -> proyecto\n/revisar -> ninguno\n/calidad:deploy -> plugin calidad",
    },
    { type: "heading", level: 2, text: "¿Qué usar en cada caso?" },
    {
      type: "table",
      headers: ["Si necesitas...", "Usa...", "Nota"],
      rows: [
        ["Una norma que vale siempre", "CLAUDE.md", "Se carga en cada sesión. Mantenlo corto."],
        ["Un procedimiento que repites", "Un skill", "El cuerpo solo cuesta contexto cuando se usa."],
        ["Que Claude lo aplique cuando venga al caso", "Skill por defecto con buena descripción", "Pon el uso principal al principio."],
        ["Controlar el momento", "disable-model-invocation: true", "Para commit, deploy, spec-impl."],
        ["Conocimiento de fondo, no una acción", "user-invocable: false", "Claude lo carga, tú no lo escribes."],
        ["Una plantilla o un script junto al skill", "Archivos en la carpeta", "Se citan con CLAUDE_SKILL_DIR."],
        ["Una regla que nunca puede fallar", "Un hook", "No depende de que Claude lo recuerde."],
        ["Compartirlo con el equipo", ".claude/skills/ del repositorio", "Se versiona y viaja con git clone."],
        ["Tenerlo en todos tus proyectos", "~/.claude/skills/", "Solo en tu equipo."],
      ],
    },
    { type: "heading", level: 2, text: "Datos que suelen aparecer desactualizados" },
    {
      type: "table",
      headers: ["Suele decirse", "Información verificada (noviembre 2026)"],
      rows: [
        ["Hay que cerrar y volver a abrir Claude para ver un skill nuevo.", "Claude Code vigila las carpetas de skills y recoge los cambios en la sesión. Si no aparece, ejecuta /reload-skills."],
        ["Los comandos personalizados y los skills son cosas distintas.", "Se fusionaron. Un archivo de .claude/commands/ sigue funcionando, pero para algo nuevo se prefiere un skill, que admite archivos de apoyo."],
        ["Lo normal es que Claude cree el skill en .claude/commands/.", "Hoy se prefiere .claude/skills/nombre/SKILL.md. Si lo crea en la ruta antigua, pídele que lo mueva."],
        ["El skill se envía a los servidores y por eso Claude lo sigue.", "Claude Code añade el cuerpo a la conversación al invocarlo, como un mensaje más. No relee el archivo en los turnos siguientes."],
        ["Un skill con disable-model-invocation solo cambia quién lo lanza.", "Además su descripción deja de ocupar contexto, porque Claude no necesita saber que existe."],
        ["allowed-tools restringe las herramientas del skill.", "Solo pre-aprueba permisos durante el turno. No restringe nada, y el permiso se borra con tu siguiente mensaje."],
        ["Un campo mal escrito da un error.", "Se ignora en silencio. Por eso conviene un script que lo detecte."],
        ["Un skill ajeno es seguro si tiene muchas estrellas.", "Es texto que Claude seguirá con tus permisos. Léelo y revisa sus scripts y su allowed-tools antes de usarlo."],
        ["Un skill que funcionaba deja de seguirse a mitad de la sesión.", "Suele ser por la compactación del contexto: se conservan solo los primeros 5.000 tokens. Invócalo otra vez y pon lo importante arriba."],
        ["El nombre de la carpeta puede ser cualquiera.", "Es el comando que escribes, salvo que el frontmatter tenga name. Dos skills de distinto nivel con el mismo nombre se tapan entre sí."],
      ],
    },
    { type: "heading", level: 2, text: "Si algo no funciona" },
    {
      type: "table",
      headers: ["Síntoma", "Causa probable", "Qué hacer"],
      rows: [
        ["El skill no aparece en /skills", "Carpeta o nombre de archivo mal puestos", "Debe ser .claude/skills/nombre/SKILL.md, con SKILL.md en mayúsculas. Ejecuta /reload-skills."],
        ["Escribes /nombre y no pasa nada", "El nombre está rechazado o es de otro nivel", "Mira /skills. Revisa caracteres raros en el nombre de la carpeta."],
        ["Claude no lo usa cuando debería", "La descripción no tiene las palabras que usas", "Reescríbela con frases que dirías de verdad, o invócalo con /nombre."],
        ["Claude lo usa cuando no debería", "La descripción es demasiado amplia", "Hazla más específica o añade disable-model-invocation: true."],
        ["Deja de seguirlo a mitad de tarea", "Compactación del contexto", "Invócalo de nuevo y pon lo más importante al principio del cuerpo."],
        ["Un campo no hace efecto", "Está mal escrito, y se ignora", "Pasa scripts/listar-skills.js."],
        ["Otro skill responde a tu /nombre", "Hay un skill de nivel más alto con el mismo nombre", "Mira /skills, renombra el tuyo con un nombre más específico."],
      ],
    },
    { type: "heading", level: 2, text: "Preguntas frecuentes" },
    {
      type: "accordion",
      items: [
        {
          title: "¿Skill o CLAUDE.md?",
          text: "Si es un dato o una norma que debe valer siempre, CLAUDE.md. Si es un procedimiento que solo hace falta a veces, un skill. La diferencia es cuándo cuesta contexto.",
        },
        {
          title: "¿Puedo tener el mismo skill en varios proyectos?",
          text: "Sí. Ponlo en ~/.claude/skills/ para tenerlo en todos, o enlaza simbólicamente la carpeta desde cada proyecto. Un único origen evita que las copias se separen.",
        },
        {
          title: "¿Cuántos skills es demasiado?",
          text: "Cada descripción ocupa sitio en el listado, que tiene un presupuesto de contexto. Si tienes muchos, Claude Code recorta las descripciones de los menos usados. Revisa con /skills y elimina los que no uses.",
        },
        {
          title: "¿Se puede escribir el skill en español?",
          text: "Sí. Escribe las instrucciones en el idioma en que quieres que trabaje Claude, y una descripción con las palabras que dirías tú. Muchos skills ajenos vienen en inglés. Puedes traducirlos.",
        },
        {
          title: "¿Es mala idea pre-aprobar git commit?",
          text: "No si el skill es solo tuyo y es el único momento en que lo necesitas. Aun así, el permiso dura un turno. Si quieres una regla permanente, añádela en los ajustes de permisos, con el alcance más estrecho posible.",
        },
        {
          title: "¿Cómo pruebo un skill que escribí?",
          text: "Invócalo con una tarea pequeña y comprueba una señal clara de que se aplicó, como la palabra LISTO del ejemplo. Después prueba con una petición en lenguaje natural para ver si Claude lo carga solo, cuando es lo que quieres.",
        },
      ],
    },
    { type: "heading", level: 2, text: "Qué sigue" },
    {
      type: "paragraph",
      text: "El Día 17 usa estos dos skills. Con /spec describirás el problema del Arkanoid en una frase, responderás a la entrevista y aprobarás un spec de MVP. Después, con /spec-impl, se implementará por pasos en una rama. Antes, deja el proyecto 05-arkanoid con los tres skills y comprueba que /skills muestra spec y spec-impl.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 17, verifica que puedes explicar...",
      items: [
        "Qué es un skill y qué parte de él está siempre en contexto y qué parte solo al invocarlo.",
        "La ruta exacta de un skill de proyecto y de uno personal.",
        "Qué cambia con disable-model-invocation y con user-invocable.",
        "Cómo llegan los argumentos al cuerpo y qué pasa si no hay marcador.",
        "Por qué allowed-tools no es una restricción y cuánto dura.",
        "Cómo se comprueba que Claude creó el skill a nivel de proyecto.",
        "Cómo se borra un skill y cómo se recargan.",
        "Por qué se revisa un skill ajeno antes de usarlo.",
      ],
    },
    { type: "heading", level: 2, text: "Fuentes consultadas (noviembre 2026)" },
    {
      type: "list",
      items: [
        "[Extender Claude con skills: ubicaciones, frontmatter, invocación y argumentos](https://code.claude.com/docs/en/skills)",
        "[Referencia de comandos: /skills y /reload-skills](https://code.claude.com/docs/en/commands)",
        "[Cómo Claude recuerda tu proyecto: CLAUDE.md y memoria](https://code.claude.com/docs/en/memory)",
        "[Permisos y reglas de herramientas](https://code.claude.com/docs/en/permissions)",
        "[Hooks: reglas que se ejecutan por evento](https://code.claude.com/docs/en/hooks-guide)",
        "[Plugins](https://code.claude.com/docs/en/plugins)",
        "[Estándar abierto Agent Skills](https://agentskills.io)",
        "[Git: git switch](https://git-scm.com/docs/git-switch)",
        "[Git: git status](https://git-scm.com/docs/git-status)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "¿Qué parte de un skill está siempre en el contexto de Claude?",
      options: [
        "El cuerpo completo",
        "El nombre y la descripción",
        "Nada",
        "Los archivos de apoyo",
      ],
      correctIndex: 1,
      explanation: "El listado incluye nombre y descripción. El cuerpo entra a la conversación solo cuando se invoca el skill.",
    },
    {
      question: "¿Cuál es la ruta de un skill de proyecto llamado glosario?",
      options: [
        ".claude/glosario.md",
        ".claude/skills/glosario/SKILL.md",
        "skills/glosario.txt",
        "~/.claude/skills/glosario/SKILL.md",
      ],
      correctIndex: 1,
      explanation: "La carpeta lleva el nombre del skill y el archivo se llama SKILL.md. La última opción sería un skill personal.",
    },
    {
      question: "Pides a Claude que cree un skill y propone escribirlo bajo tu carpeta de usuario. ¿Qué haces?",
      options: [
        "Lo apruebas sin mirar",
        "Lo rechazas y le dices que lo cree a nivel de proyecto, en .claude/skills/",
        "Borras tu carpeta de usuario",
        "Reinicias el ordenador",
      ],
      correctIndex: 1,
      explanation: "Una ruta con tu nombre de usuario es el nivel personal. Si quieres que viaje con el repositorio, pide el nivel de proyecto explícitamente.",
    },
    {
      question: "Creas un skill nuevo y no aparece en /skills. ¿Qué pruebas primero?",
      options: [
        "Reinstalar Claude Code",
        "Comprobar la ruta y el nombre SKILL.md, y ejecutar /reload-skills",
        "Borrar CLAUDE.md",
        "Cambiar de modelo",
      ],
      correctIndex: 1,
      explanation: "Lo habitual es un nombre o una carpeta mal puestos. /reload-skills vuelve a leer las carpetas sin reiniciar.",
    },
    {
      question: "¿Qué efecto tiene disable-model-invocation: true?",
      options: [
        "Impide que tú lo invoques",
        "Impide que Claude lo cargue por su cuenta, y su descripción deja de ocupar contexto",
        "Lo borra",
        "Lo hace global",
      ],
      correctIndex: 1,
      explanation: "El skill queda solo para ti con /nombre. Es lo adecuado para flujos con efectos, como un commit o una implementación.",
    },
    {
      question: "Invocas /spec-impl 001 y el cuerpo contiene $ARGUMENTS. ¿Qué recibe Claude en ese lugar?",
      options: [
        "El texto $ARGUMENTS literal",
        "El valor 001",
        "Una cadena vacía",
        "El nombre del archivo",
      ],
      correctIndex: 1,
      explanation: "El marcador $ARGUMENTS se sustituye por todo lo que escribes después del nombre del skill.",
    },
    {
      question: "¿Qué hace allowed-tools en un skill?",
      options: [
        "Prohíbe todas las demás herramientas",
        "Pre-aprueba las listadas durante el turno, sin restringir las demás, y se borra con tu siguiente mensaje",
        "Concede permisos para siempre",
        "Instala herramientas",
      ],
      correctIndex: 1,
      explanation: "Solo evita pedirte permiso en ese turno. Tus ajustes de permisos siguen mandando sobre lo demás.",
    },
    {
      question: "Escribes disable-model-invocaton, con una letra de menos. ¿Qué ocurre?",
      options: [
        "Claude Code muestra un error y no carga el skill",
        "El campo se ignora en silencio y el skill queda invocable por Claude",
        "El skill se borra",
        "Se corrige solo",
      ],
      correctIndex: 1,
      explanation: "Los campos desconocidos se ignoran sin avisar. Un script como listar-skills.js detecta la errata.",
    },
    {
      question: "Una regla debe cumplirse siempre, sin excepción. ¿Dónde conviene ponerla?",
      options: [
        "En el cuerpo de un skill",
        "En un hook, que se ejecuta por evento y no depende de que Claude la recuerde",
        "En un comentario",
        "En el README",
      ],
      correctIndex: 1,
      explanation: "Un skill es una guía que Claude puede dejar de seguir, por ejemplo tras compactar. Un hook se ejecuta siempre que ocurre su evento.",
    },
    {
      question: "¿Por qué se lee un skill ajeno antes de instalarlo?",
      options: [
        "Porque ocupa mucho espacio",
        "Porque es texto que Claude seguirá con tus permisos, y puede traer scripts o permisos pre-aprobados",
        "Porque no funciona en español",
        "No hace falta leerlo",
      ],
      correctIndex: 1,
      explanation: "Un skill puede indicar herramientas y comandos. Quien lo instala responde de lo que Claude haga con él.",
    },
  ],
};
