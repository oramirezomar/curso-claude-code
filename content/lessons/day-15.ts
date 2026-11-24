import type { Lesson } from "@/lib/types";
// Día 15 · Clases 56, 58 y 59 de la transcripción (el artículo 57 solo resume los temas de la sección).
// Contenido verificado en noviembre de 2026.
export const day15: Lesson = {
  day: 15,
  slug: "spec-driven-design-concepto-y-anatomia",
  title: "Spec Driven Design: concepto y anatomía de un spec",
  section: "Spec Driven Design",
  estimatedMinutes: 65,
  icon: "📐",
  objectives: [
    "Explicar qué es el diseño guiado por especificaciones, en qué se parece a escribir pruebas primero y por qué no es un prompt largo.",
    "Seguir el flujo de seis pasos: problema, discusión, refinamiento, guardado, ejecución por pasos y ajuste.",
    "Escribir un spec con sus seis secciones mínimas y criterios de aceptación que se puedan comprobar con un sí o un no.",
    "Decidir cuándo un cambio merece un spec y cuándo basta un prompt directo.",
    "Pedir a Claude que te entreviste para escribir el spec, ejecutarlo por pasos y revisar el resultado contra él.",
  ],
  blocks: [
    {
      type: "paragraph",
      text: "Hasta ahora has pedido cambios con mensajes sueltos o con un plan. Esta sección da un paso más: antes de escribir una línea de código, escribes un documento que dice qué se quiere, qué no, cómo se comprobará y por qué se tomaron ciertas decisiones. Ese documento es el spec. Sirve para ti, porque te obliga a pensar y a entender lo que se va a construir, y sirve para Claude, que lo usa como una guía precisa. Este día ves el concepto y la anatomía de un spec útil. Los siguientes lo aplican.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "6", label: "Secciones mínimas de un spec" },
        { value: "1 frase", label: "Longitud del objetivo: si se pasa, divide el spec" },
        { value: "problema", label: "Se describe el problema, no la solución" },
        { value: "sí o no", label: "Forma de cada criterio de aceptación" },
        { value: "specs/", label: "Carpeta de ejemplo, con número y nombre en cada archivo" },
        { value: "SPEC.md", label: "Archivo que la guía oficial propone escribir tras una entrevista" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text: "Contenido verificado en noviembre de 2026 contra la guía oficial de buenas prácticas de Claude Code, que recomienda entrevistarse con Claude para escribir un spec, construir desde él en una sesión nueva y revisar contra él. El spec de ejemplo y su validador se ejecutaron: las salidas de los ejercicios 5 y 6 son reales. Esta lección no se apoya en un único método: el diseño guiado por specs es una de varias formas de trabajar y se debate.",
    },
    { type: "heading", level: 2, text: "Qué es un spec y por qué no es un prompt largo" },
    {
      type: "paragraph",
      text: "Escribir primero la especificación no es nuevo, ni tiene que ver con la inteligencia artificial. Se parece al desarrollo guiado por pruebas, donde se escriben primero las pruebas que fallan y luego el código que las pasa. Aquí se escribe primero un documento con una estructura fija: el problema, los pasos para resolverlo, qué entra y qué no, cómo se verificará y qué se decidió. Encaja bien con la IA porque ese documento es justo lo que ella necesita como entrada. Se puede ver, de forma superficial, como un mensaje enorme y bien estructurado.",
    },
    {
      type: "paragraph",
      text: "La alternativa que se quiere evitar es el mensaje de una frase: \"hazme un Instagram\", \"hazme un sistema de contabilidad\". Tiene demasiadas decisiones técnicas sin tomar, y Claude se las inventa. El resultado puede no ser mantenible o no parecerse a lo que imaginabas. Un MVP fácil de generar, como un panel de administración, no responde a las preguntas que importan: cómo fluye la información, cómo es, de dónde viene. Si tú no sabes responderlas, tampoco sabrás dirigir a Claude. Por eso el valor del spec no está solo en el documento. Está en el pensamiento que te obliga a hacer para escribirlo.",
    },
    {
      type: "paragraph",
      text: "La guía oficial dice algo muy parecido. Cuando no sabes exactamente qué quieres, no hace falta resolverlo todo antes de escribir: pídele a Claude que te entreviste. Un mensaje como \"quiero añadir límites de uso a la API pero no lo he pensado del todo; entrevístame hasta que puedas escribir el spec y guárdalo en SPEC.md\" hace que Claude te devuelva preguntas con opciones sobre las partes que no has definido, y siga preguntando hasta que las respuestas formen un spec. Después recomienda empezar una sesión nueva para construir desde ese archivo, de modo que la construcción arranque con un contexto limpio y una definición escrita de lo que significa terminar.",
    },
    { type: "heading", level: 2, text: "El flujo en seis pasos" },
    {
      type: "image",
      src: "/img/dia-15/flujo-spec-driven.svg",
      alt: "Seis pasos: describir el problema, discutirlo en modo plan, refinarlo en decisiones concretas, guardar el spec en una carpeta, ejecutarlo por pasos con pausas, y ajustarlo si algo cambia. Una flecha punteada vuelve de refinar a discutir. Debajo, por qué la conversación es lo valioso y qué evita el flujo.",
      caption: "El spec es el resultado de una conversación, no un papel que se rellena.",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Describe el problema, no la solución. \"Necesito autenticar a mis usuarios\" es un problema. \"Vamos a usar tokens JWT\" ya es una solución. Deja que Claude proponga y guía tú. Así descubres opciones que no habías considerado.",
        "Discute en modo plan. Entra en modo plan, o pídele a Claude que te entreviste, y habla del problema. Tú sabes cosas que Claude no puede comprobar: la finalidad, los servicios que ya tienes contratados, lo que te gusta. Él conoce opciones que tú no. Esa conversación es lo más valioso de todo el método.",
        "Refina con decisiones concretas. Nada de \"tal vez\", \"sería bueno\" ni \"algo que luzca bien\". \"Usamos esta base de datos\", \"con este intervalo\", \"con esta librería\". Claude seguirá lo que escribas, y lo ambiguo lo resuelve por su cuenta. Repite pasos 2 y 3 hasta que todo esté claro.",
        "Guarda el spec en un archivo. Una carpeta `specs/` con el número y el nombre, como `001-niveles-por-lineas.md`, y un estado: borrador, aprobado, implementado o rechazado. Con un nombre así es fácil de discutir, de leer y de encontrar después.",
        "Ejecuta paso a paso. Dale el spec aprobado a Claude y pídele que avance por el plan y pause para revisar. Que cada cambio sea pequeño y se pueda probar. Si algo se tuerce, lo detectas pronto: cuesta menos corregir una base de datos equivocada al primer paso que al décimo, y gastas menos.",
        "Ajusta. Si cambias de idea, vuelve al spec. Aunque cierta flexibilidad es razonable: mucho del conocimiento de una aplicación aparece al programarla, y un detalle menor se puede corregir sin rehacer el documento. Si el cambio es grande, actualiza el spec.",
      ],
    },
    {
      type: "paragraph",
      text: "El video menciona que el método no es la mejor forma de trabajar, y la crítica más común es esa: parte del pensamiento crítico de una aplicación nace al programarla, y un spec no lo anticipa todo. Es una crítica razonable. El spec sirve por el pensamiento que fuerza, no porque sea una norma. Úsalo donde ayude, ajústalo donde estorbe y no lo trates como un dogma.",
    },
    { type: "heading", level: 2, text: "Anatomía de un spec útil" },
    {
      type: "image",
      src: "/img/dia-15/anatomia-de-un-spec.svg",
      alt: "Seis recuadros: objetivo en una frase, alcance con lo que entra y lo que no, modelo de datos, plan por pasos, criterios de aceptación como lista de sí o no, y decisiones tomadas y descartadas. Cada uno con un ejemplo corto del Tetris.",
      caption: "Las seis secciones que un spec necesita como mínimo.",
    },
    {
      type: "table",
      headers: ["Sección", "Qué contiene", "Por qué importa"],
      rows: [
        ["Objetivo", "El problema en una sola frase.", "Si necesitas más, probablemente son dos o tres specs."],
        ["Alcance", "Qué entra y, sobre todo, qué no entra.", "Lo que no entra es tan valioso como lo que sí: Claude no cuestiona un límite escrito."],
        ["Modelo de datos", "Estructuras, campos y nombres.", "Todavía no es código, pero permite corregir nombres y formas antes de que se escriban."],
        ["Plan de implementación", "Pasos ordenados y pequeños.", "Cada paso es un punto de control: puedes girar el timón antes de estrellarte."],
        ["Criterios de aceptación", "Una lista de casillas que se responden con sí o no.", "Es lo que permite comprobar que el spec está cumplido."],
        ["Decisiones", "Las tomadas y las descartadas, con su razón.", "Evita repetir discusiones y alimenta futuras consultas con el porqué."],
      ],
    },
    {
      type: "paragraph",
      text: "Con menos de estas seis secciones, normalmente el trabajo se podría haber hecho con un solo mensaje, y el spec no guiaría lo bastante. Puedes añadir más: estado, riesgos, referencias a otros specs, pruebas manuales. Tras aprobarse e implementarse, el spec pasa a formar parte de la base de código y alimenta futuras conversaciones con la IA.",
    },
    { type: "heading", level: 3, text: "Criterios que se pueden comprobar" },
    {
      type: "image",
      src: "/img/dia-15/criterios-comprobables.svg",
      alt: "A la izquierda, criterios vagos como que el juego se ve bonito o funciona bien, que no se pueden probar. A la derecha, criterios comprobables como que con 10 líneas el nivel es 1, que el intervalo nunca baja de 100 ms o que node --check no da errores. Debajo, el consejo de pedir evidencia.",
      caption: "Si dos personas pueden responder distinto, el criterio no sirve.",
    },
    {
      type: "paragraph",
      text: "Los criterios de aceptación son la parte que más se descuida. Que \"se vea bonito\", que \"funcione bien\" o que \"sea rápido\" no son criterios: la belleza es subjetiva. Un criterio válido se responde con un sí o un no por observación o por un comando. \"El build de producción no da ningún error\" lo es. \"No tiene errores\" a secas, no. La guía oficial insiste en lo mismo con otras palabras: dale a Claude algo que pueda ejecutar y que devuelva pasa o falla, como un comando de pruebas, una comprobación de tipos o una captura junto al diseño, y con eso puede seguir solo sin que lo vigiles. Y pide evidencia: el comando que se ejecutó y su salida, no un \"todo pasa\".",
    },
    {
      type: "paragraph",
      text: "Este es un ejemplo completo para el Tetris: que la velocidad de caída suba con las líneas borradas. Fíjate en que el objetivo es una frase, el alcance dice lo que no se hace, los criterios son cifras y comandos, y las decisiones descartadas dicen por qué.",
    },
    {
      type: "code",
      lang: "markdown",
      title: "specs/001-niveles-por-lineas.md",
      code: `---
estado: borrador
---

# 001 Niveles por líneas

## Objetivo

Que la velocidad de caída aumente a medida que el jugador borra líneas, para que la partida sea cada vez más difícil.

## Alcance

Entra:
- Un nivel que sube cada 10 líneas borradas.
- Un intervalo de caída que baja con el nivel, sin pasar de un mínimo.
- Mostrar el nivel actual en la página.

No entra:
- Cambiar los puntos que da cada línea.
- Sonidos, animaciones o temas nuevos.
- Guardar el nivel entre partidas.

## Modelo de datos

- lineasTotales: número de líneas borradas en la partida, empieza en 0.
- nivel: Math.floor(lineasTotales / 10), empieza en 0.
- intervaloMs: Math.max(100, 500 - 40 * nivel), empieza en 500.

## Plan de implementación

1. Añadir lineasTotales, nivel e intervaloMs en game.js y actualizarlos en limpiarLineas.
2. Sustituir el intervalo fijo de 500 ms por intervaloMs, reiniciando el temporizador cuando cambie.
3. Mostrar el nivel en index.html, junto a los puntos.
4. Probar a mano con una partida y con valores forzados desde la consola.

## Criterios de aceptación

- [ ] Con 0 líneas, el nivel es 0 y el intervalo es 500 ms.
- [ ] Con 10 líneas, el nivel es 1 y el intervalo es 460 ms.
- [ ] El intervalo nunca baja de 100 ms, ni con 200 líneas.
- [ ] El nivel aparece en la página y se actualiza al borrar una línea.
- [ ] node --check game.js no muestra errores.
- [ ] Los puntos por línea siguen siendo 100, 300, 500 y 800.

## Decisiones

Tomadas:
- Se sube de nivel cada 10 líneas: es una cifra fácil de probar a mano.
- El intervalo baja 40 ms por nivel con un mínimo de 100 ms, para que el juego siga siendo jugable.

Descartadas:
- Subir el nivel por tiempo: haría que jugar mal también fuera más difícil.
- Una curva exponencial: es más difícil de probar y de explicar.`,
    },
    { type: "heading", level: 2, text: "Cuándo usar un spec y cuándo no" },
    {
      type: "image",
      src: "/img/dia-15/spec-o-prompt.svg",
      alt: "Dos columnas. A la izquierda, cuándo escribir un spec: toca más de dos archivos, la decisión es cara de revertir, se olvidará en una semana, abarca varias sesiones, es un contrato con otros artefactos o da pereza plantearlo. A la derecha, cuándo basta un prompt directo: corrección puntual, refactorización mecánica, experimento, cabe en un prompt, tarea única o planearla aburre.",
      caption: "Reglas prácticas, no leyes. Discútelas con tu equipo.",
    },
    {
      type: "paragraph",
      text: "No todo merece un spec, y no hay una regla universal. Estas son pautas que funcionan. Escribe un spec cuando el cambio toca más de dos archivos, cuando incluye decisiones caras de revertir, como un esquema, un formato o un endpoint, cuando lo olvidarás en una semana, cuando vas a trabajar con Claude durante más de una sesión y no quieres depender de lo que recuerde la herramienta, cuando el cambio es un contrato con skills, hooks u otros specs, o cuando te da pereza plantearlo por lo complejo. Esa pereza es una señal clara.",
    },
    {
      type: "paragraph",
      text: "Basta un prompt directo en una corrección puntual, en una refactorización mecánica como renombrar archivos, en un experimento exploratorio donde pides algo de un tirón y, si no te convence, lo revierte y entonces escribes el spec, cuando lo que quieres cabe en un mensaje y se entiende a la primera, o cuando es una tarea única. Si la tarea se repite, piensa mejor en un skill o un comando. Y si planear la función te aburre porque es muy corta, probablemente no necesita un archivo. La guía oficial lo resume en la misma línea: el modo plan es útil cuando hay incertidumbre o el cambio toca varios archivos, y es un sobrecoste si podrías describir el cambio en una frase. Una regla de fondo: tú serás juzgado por el código que Claude escribe y tú apruebas. Si es importante, aunque sea pequeño, merece un spec.",
    },
    { type: "heading", level: 2, text: "Ejecutar y revisar contra el spec" },
    {
      type: "paragraph",
      text: "Con el spec aprobado, empieza una sesión nueva con el contexto vacío y dale el archivo con `@specs/001-niveles-por-lineas.md`. Pídele que avance por el plan y se detenga tras cada paso para que revises el cambio. Haz un commit por paso: si algo se tuerce, vuelves con poco coste. Cuando termine, revisa el resultado contra el spec. La guía oficial propone escribir el mensaje de revisión tú mismo, por ejemplo: \"usa un subagente para revisar el diff contra el spec, comprueba que cada requisito está implementado y que los casos límite listados tienen prueba, y avisa solo de los fallos que afecten a la corrección, sin comentar el estilo\".",
    },
    {
      type: "paragraph",
      text: "No omitas la parte de \"sin comentar el estilo\". Un revisor al que le pides encontrar problemas siempre encontrará algo, y si arreglas todo, terminas con capas de abstracción y pruebas para casos que no pueden ocurrir. Pide también la evidencia de cada criterio: el comando y su salida.",
    },
    {
      type: "paragraph",
      text: "Para que Claude no se olvide de los specs entre sesiones, puedes dejar una línea en el `CLAUDE.md`: \"los specs viven en specs/; antes de cambiar una función con spec, léelo\". Mantén el archivo corto: solo lo que Claude no puede deducir del código.",
    },
    { type: "heading", level: 2, text: "Un validador para no olvidar secciones" },
    {
      type: "paragraph",
      text: "Escribir los seis apartados con disciplina cansa, y por eso conviene automatizar lo mecánico. Este pequeño script comprueba que el archivo tiene las seis secciones, que el objetivo es una sola frase y que los criterios son casillas sin palabras vagas. No sustituye tu juicio: comprueba la forma, no que el criterio tenga sentido. En los días siguientes verás cómo convertir esto en un skill.",
    },
    {
      type: "code",
      lang: "js",
      title: "scripts/validar-spec.js",
      code: `const fs = require("fs");

const archivo = process.argv[2];
if (!archivo) {
  console.log("Uso: node scripts/validar-spec.js specs/NNN-nombre.md");
  process.exit(2);
}

const texto = fs.readFileSync(archivo, "utf8");
const SECCIONES = [
  "Objetivo",
  "Alcance",
  "Modelo de datos",
  "Plan de implementación",
  "Criterios de aceptación",
  "Decisiones",
];
const VAGAS = ["bonito", "bien", "rápido", "rápida", "agradable", "intuitivo", "limpio", "funcione"];

function cuerpo(titulo) {
  const partes = texto.split(/^## /m).slice(1);
  const parte = partes.find((p) => p.toLowerCase().startsWith(titulo.toLowerCase()));
  return parte ? parte.split("\\n").slice(1).join("\\n").trim() : null;
}

let errores = 0;
for (const s of SECCIONES) {
  if (cuerpo(s) === null) {
    console.log("FALTA sección: " + s);
    errores++;
  } else {
    console.log("OK sección: " + s);
  }
}

const objetivo = cuerpo("Objetivo");
if (objetivo !== null) {
  const frases = objetivo.split(/[.!?](\\s|$)/).filter((f) => f && f.trim());
  if (frases.length > 1) {
    console.log("AVISO objetivo con más de una frase: valora dividir el spec");
    errores++;
  }
}

const criterios = cuerpo("Criterios de aceptación");
if (criterios !== null) {
  const lineas = criterios.split("\\n").filter((l) => l.trim());
  const casillas = lineas.filter((l) => /^- \\[[ x]\\] /.test(l));
  if (casillas.length === 0) {
    console.log("FALTA lista de criterios con casillas - [ ]");
    errores++;
  }
  for (const l of casillas) {
    const vaga = VAGAS.find((v) => new RegExp("(^|[^a-záéíóúñ])" + v + "([^a-záéíóúñ]|$)", "i").test(l));
    if (vaga) {
      console.log("VAGO (" + vaga + "): " + l.replace(/^- \\[[ x]\\] /, ""));
      errores++;
    }
  }
}

console.log(errores === 0 ? "RESULTADO: spec válido" : "RESULTADO: " + errores + " problema(s)");
process.exit(errores === 0 ? 0 : 1);`,
    },
    { type: "heading", level: 2, text: "Ejercicios guiados y experimentos" },
    {
      type: "paragraph",
      text: "Los ejercicios usan el Tetris de los días anteriores y el spec de ejemplo de la lección. El validador y sus salidas de los ejercicios 5 y 6 los ejecuté con Node. Lo que responde Claude en los ejercicios 3, 8 y 9 es orientativo. Los cálculos de los experimentos del final se ejecutan en el navegador.",
    },
    {
      type: "exercise",
      title: "Ejercicio 1: ¿spec o prompt directo?",
      description: "Clasifica cinco tareas del Tetris con las pautas de la lección.",
      steps: [
        {
          instruction: "Decide para cada tarea si merece un spec o basta un prompt directo. Escribe tu respuesta antes de seguir.",
          command: "1) Cambiar el color de la pieza J. 2) Añadir niveles que aceleran el juego. 3) Cambiar el formato en que se guardan los récords. 4) Renombrar una variable en todo el proyecto. 5) Probar si un efecto de sonido encaja.",
          expected: "1) Prompt directo: corrección puntual.\n2) Spec: toca varios archivos y tiene decisiones de diseño.\n3) Spec: es un formato, caro de revertir.\n4) Prompt directo: refactorización mecánica.\n5) Prompt directo: experimento exploratorio.",
        },
      ],
      verify: "Puedes justificar cada respuesta con una de las pautas. Si dudas en alguna, es un buen tema para discutir con tu equipo.",
    },
    {
      type: "exercise",
      title: "Ejercicio 2: el problema, no la solución",
      description: "Reescribe tres peticiones para plantear el problema.",
      steps: [
        {
          instruction: "Reformula cada una como un problema que alguien necesita resolver.",
          command: "a) Usar localStorage para guardar la mejor puntuación. b) Añadir una curva exponencial de velocidad. c) Poner un botón de pausa con un menú.",
          expected: "a) Necesito conservar la mejor puntuación entre partidas.\nb) Necesito que el juego se haga más difícil a medida que avanza la partida.\nc) Necesito poder detener la partida y retomarla sin perder el estado.",
        },
      ],
      verify: "Ninguna frase menciona una tecnología ni una técnica concreta.",
    },
    {
      type: "exercise",
      title: "Ejercicio 3: que Claude te entreviste",
      description: "Usa la técnica de la guía oficial para escribir el primer borrador.",
      steps: [
        {
          instruction: "Abre Claude Code en el proyecto, entra en modo plan con Shift+Tab y plantea el problema.",
          command: "Quiero que el juego se vuelva más difícil a medida que se borran líneas, pero no lo he pensado del todo. Entrévistame hasta que puedas escribir el spec y guárdalo en specs/001-niveles-por-lineas.md.",
          expected: "Claude pregunta, con opciones, cada cuántas líneas sube el nivel, qué es lo que cambia, si hay un límite, qué no debe tocarse y cómo se mostrará.",
        },
        {
          instruction: "Responde con decisiones concretas, sin tal vez ni quizá.",
          command: "Cada 10 líneas. Solo cambia la velocidad de caída, con un mínimo de 100 ms. No tocamos los puntos ni añadimos sonidos.",
          expected: "Claude sigue preguntando hasta cubrir lo que falta y propone un spec con las seis secciones.",
        },
      ],
      verify: "El borrador respeta lo que decidiste. Léelo entero antes de aprobarlo.",
    },
    {
      type: "exercise",
      title: "Ejercicio 4: guardar el spec",
      description: "Crea la carpeta y el archivo de ejemplo de la lección, o ajusta el que generó Claude.",
      steps: [
        {
          instruction: "Crea la carpeta de specs en la raíz del proyecto.",
          command: "cd ~/ClaudeCode/04-tetris && mkdir -p specs scripts",
        },
        {
          instruction: "Guarda el spec de ejemplo, o revisa el tuyo y compáralo.",
          file: {
            name: "specs/001-niveles-por-lineas.md",
            code: `---
estado: borrador
---

# 001 Niveles por líneas

## Objetivo

Que la velocidad de caída aumente a medida que el jugador borra líneas, para que la partida sea cada vez más difícil.

## Alcance

Entra:
- Un nivel que sube cada 10 líneas borradas.
- Un intervalo de caída que baja con el nivel, sin pasar de un mínimo.
- Mostrar el nivel actual en la página.

No entra:
- Cambiar los puntos que da cada línea.
- Sonidos, animaciones o temas nuevos.
- Guardar el nivel entre partidas.

## Modelo de datos

- lineasTotales: número de líneas borradas en la partida, empieza en 0.
- nivel: Math.floor(lineasTotales / 10), empieza en 0.
- intervaloMs: Math.max(100, 500 - 40 * nivel), empieza en 500.

## Plan de implementación

1. Añadir lineasTotales, nivel e intervaloMs en game.js y actualizarlos en limpiarLineas.
2. Sustituir el intervalo fijo de 500 ms por intervaloMs, reiniciando el temporizador cuando cambie.
3. Mostrar el nivel en index.html, junto a los puntos.
4. Probar a mano con una partida y con valores forzados desde la consola.

## Criterios de aceptación

- [ ] Con 0 líneas, el nivel es 0 y el intervalo es 500 ms.
- [ ] Con 10 líneas, el nivel es 1 y el intervalo es 460 ms.
- [ ] El intervalo nunca baja de 100 ms, ni con 200 líneas.
- [ ] El nivel aparece en la página y se actualiza al borrar una línea.
- [ ] node --check game.js no muestra errores.
- [ ] Los puntos por línea siguen siendo 100, 300, 500 y 800.

## Decisiones

Tomadas:
- Se sube de nivel cada 10 líneas: es una cifra fácil de probar a mano.
- El intervalo baja 40 ms por nivel con un mínimo de 100 ms, para que el juego siga siendo jugable.

Descartadas:
- Subir el nivel por tiempo: haría que jugar mal también fuera más difícil.
- Una curva exponencial: es más difícil de probar y de explicar.`,
          },
        },
      ],
      verify: "El archivo tiene las seis secciones y un estado en la cabecera.",
    },
    {
      type: "exercise",
      title: "Ejercicio 5: validar el spec",
      description: "Pasa el validador al spec de ejemplo.",
      steps: [
        {
          instruction: "Guarda el script de la lección en scripts/validar-spec.js.",
          file: {
            name: "scripts/validar-spec.js",
            code: `const fs = require("fs");

const archivo = process.argv[2];
if (!archivo) {
  console.log("Uso: node scripts/validar-spec.js specs/NNN-nombre.md");
  process.exit(2);
}

const texto = fs.readFileSync(archivo, "utf8");
const SECCIONES = [
  "Objetivo",
  "Alcance",
  "Modelo de datos",
  "Plan de implementación",
  "Criterios de aceptación",
  "Decisiones",
];
const VAGAS = ["bonito", "bien", "rápido", "rápida", "agradable", "intuitivo", "limpio", "funcione"];

function cuerpo(titulo) {
  const partes = texto.split(/^## /m).slice(1);
  const parte = partes.find((p) => p.toLowerCase().startsWith(titulo.toLowerCase()));
  return parte ? parte.split("\\n").slice(1).join("\\n").trim() : null;
}

let errores = 0;
for (const s of SECCIONES) {
  if (cuerpo(s) === null) {
    console.log("FALTA sección: " + s);
    errores++;
  } else {
    console.log("OK sección: " + s);
  }
}

const objetivo = cuerpo("Objetivo");
if (objetivo !== null) {
  const frases = objetivo.split(/[.!?](\\s|$)/).filter((f) => f && f.trim());
  if (frases.length > 1) {
    console.log("AVISO objetivo con más de una frase: valora dividir el spec");
    errores++;
  }
}

const criterios = cuerpo("Criterios de aceptación");
if (criterios !== null) {
  const lineas = criterios.split("\\n").filter((l) => l.trim());
  const casillas = lineas.filter((l) => /^- \\[[ x]\\] /.test(l));
  if (casillas.length === 0) {
    console.log("FALTA lista de criterios con casillas - [ ]");
    errores++;
  }
  for (const l of casillas) {
    const vaga = VAGAS.find((v) => new RegExp("(^|[^a-záéíóúñ])" + v + "([^a-záéíóúñ]|$)", "i").test(l));
    if (vaga) {
      console.log("VAGO (" + vaga + "): " + l.replace(/^- \\[[ x]\\] /, ""));
      errores++;
    }
  }
}

console.log(errores === 0 ? "RESULTADO: spec válido" : "RESULTADO: " + errores + " problema(s)");
process.exit(errores === 0 ? 0 : 1);`,
          },
        },
        {
          instruction: "Ejecútalo sobre el spec.",
          command: "node scripts/validar-spec.js specs/001-niveles-por-lineas.md",
          expected: "OK sección: Objetivo\nOK sección: Alcance\nOK sección: Modelo de datos\nOK sección: Plan de implementación\nOK sección: Criterios de aceptación\nOK sección: Decisiones\nRESULTADO: spec válido",
        },
        {
          instruction: "Sin argumento, muestra el uso.",
          command: "node scripts/validar-spec.js",
          expected: "Uso: node scripts/validar-spec.js specs/NNN-nombre.md",
        },
      ],
      verify: "El resultado es spec válido y el código de salida es 0. Para ver el código, ejecuta echo $? justo después.",
    },
    {
      type: "exercise",
      title: "Ejercicio 6: romperlo a propósito",
      description: "Mira qué detecta el validador.",
      steps: [
        {
          instruction: "Copia el spec y, en la copia, cambia el criterio del nivel en la página por uno vago.",
          command: "cp specs/001-niveles-por-lineas.md specs/003-vago.md",
        },
        {
          instruction: "Edita specs/003-vago.md: sustituye la línea del nivel por esta y ejecuta el validador.",
          command: "- [ ] El nivel se ve bonito y todo funcione bien.",
          expected: "OK sección: Decisiones\nVAGO (bonito): El nivel se ve bonito y todo funcione bien.\nRESULTADO: 1 problema(s)",
        },
        {
          instruction: "Quita ahora la sección Criterios de aceptación entera y ejecútalo otra vez.",
          expected: "FALTA sección: Criterios de aceptación\nRESULTADO: 1 problema(s)",
        },
        {
          instruction: "Borra la copia.",
          command: "rm specs/003-vago.md",
        },
      ],
      verify: "Entiendes qué comprueba el script: la forma. Que el criterio tenga sentido sigue siendo cosa tuya.",
    },
    {
      type: "exercise",
      title: "Ejercicio 7: criterios que se pueden comprobar",
      description: "Reescribe criterios vagos.",
      steps: [
        {
          instruction: "Convierte cada criterio en uno que se responda con sí o no.",
          command: "a) El juego funciona bien. b) La pausa es rápida. c) El código es limpio. d) Los niveles se ven bonitos.",
          expected: "a) node --check game.js no da errores y una partida completa no lanza errores en la consola.\nb) Al pulsar P, no cae ninguna pieza en el siguiente fotograma.\nc) La comprobación de formato y de estilo del proyecto termina sin avisos.\nd) El nivel aparece en la página y cambia al borrar la línea número 10.",
        },
      ],
      verify: "Cada criterio nombra un comando, una cifra o un comportamiento observable.",
    },
    {
      type: "exercise",
      title: "Ejercicio 8: ejecutar por pasos",
      description: "Construye desde el spec en una sesión nueva, con pausas.",
      steps: [
        {
          instruction: "Vacía el contexto y entra en una rama de trabajo.",
          command: "git switch -c 01-niveles && claude",
          expected: "Switched to a new branch '01-niveles'",
        },
        {
          instruction: "Dale el spec y pide solo el primer paso con una pausa.",
          command: "Implementa el paso 1 de @specs/001-niveles-por-lineas.md y detente para que revise el cambio.",
          expected: "Claude cambia solo game.js, calcula lineasTotales, nivel e intervaloMs, y se detiene.",
        },
        {
          instruction: "Revisa el diff y confirma el paso. Repite con el siguiente.",
          command: "git diff --stat && git commit -am \"feat: calcular nivel e intervalo\"",
          expected: "game.js | 12 ++++++++++\n 1 file changed, 12 insertions(+)\n[01-niveles abc1234] feat: calcular nivel e intervalo",
        },
      ],
      verify: "Hay un commit por paso del plan, y puedes volver a cualquiera sin perder el resto.",
    },
    {
      type: "exercise",
      title: "Ejercicio 9: revisar contra el spec",
      description: "Comprueba cada criterio, con evidencia.",
      steps: [
        {
          instruction: "Cuando termine el plan, pide la revisión con un subagente, sin comentarios de estilo.",
          command: "Usa un subagente para revisar el diff contra @specs/001-niveles-por-lineas.md. Comprueba que cada criterio de aceptación se cumple, muéstrame el comando o la cifra que lo demuestra y avisa solo de fallos que afecten a la corrección. No comentes el estilo.",
          expected: "Una lista con cada criterio, el resultado y su evidencia, y los fallos de corrección si los hay.",
        },
        {
          instruction: "Comprueba por tu cuenta uno de los criterios.",
          command: "node --check game.js",
          expected: "(sin salida: la sintaxis es válida)",
        },
        {
          instruction: "Cambia el estado del spec en su cabecera y confirma el cambio.",
          command: "git commit -am \"docs: spec 001 implementado\"",
          expected: "[01-niveles abc1234] docs: spec 001 implementado",
        },
      ],
      verify: "Cada criterio tiene una evidencia. El estado del spec refleja la realidad.",
    },
    {
      type: "playground",
      title: "Experimento 10: ¿spec o prompt directo?",
      description: "Aplica las pautas de la lección a cuatro tareas: suma las señales a favor de un spec y las señales a favor de un prompt. Cambia las tareas.",
      code: `function decidir(t) {
  const a = Number(t.archivos > 2) + Number(t.cuesta_revertir) + Number(t.variasSesiones) + Number(t.contrato);
  const b = Number(t.fixPuntual) + Number(t.mecanica) + Number(t.exploratoria) + Number(t.unaVez);
  return a > b ? "spec" : "prompt directo";
}

const tareas = [
  { nombre: "Corregir el color de la pieza J", archivos: 1, cuesta_revertir: false, variasSesiones: false, contrato: false, fixPuntual: true, mecanica: false, exploratoria: false, unaVez: true },
  { nombre: "Sistema de niveles por líneas", archivos: 3, cuesta_revertir: false, variasSesiones: true, contrato: false, fixPuntual: false, mecanica: false, exploratoria: false, unaVez: true },
  { nombre: "Cambiar el formato de guardado de récords", archivos: 2, cuesta_revertir: true, variasSesiones: false, contrato: true, fixPuntual: false, mecanica: false, exploratoria: false, unaVez: true },
  { nombre: "Renombrar una variable en todo el proyecto", archivos: 4, cuesta_revertir: false, variasSesiones: false, contrato: false, fixPuntual: false, mecanica: true, exploratoria: false, unaVez: true },
];

tareas.forEach((t) => console.log(t.nombre + ": " + decidir(t)));`,
      expected: "Corregir el color de la pieza J: prompt directo\nSistema de niveles por líneas: spec\nCambiar el formato de guardado de récords: spec\nRenombrar una variable en todo el proyecto: prompt directo",
    },
    {
      type: "playground",
      title: "Experimento 11: criterios vagos o comprobables",
      description: "Detecta palabras subjetivas en un criterio. Así funciona la comprobación del validador. Prueba tus propios criterios.",
      code: `const VAGAS = ["bonito", "bien", "rápido", "rápida", "agradable", "intuitivo", "limpio"];

function revisar(criterio) {
  const vaga = VAGAS.find((v) => new RegExp("(^|[^a-záéíóúñ])" + v + "([^a-záéíóúñ]|$)", "i").test(criterio));
  return vaga ? "vago (" + vaga + ")" : "comprobable";
}

[
  "El juego se ve bonito",
  "node --check game.js no muestra errores",
  "El intervalo nunca baja de 100 ms",
  "La pausa es rápida",
  "Con 10 líneas, el nivel es 1",
].forEach((c) => console.log(c + " -> " + revisar(c)));`,
      expected: "El juego se ve bonito -> vago (bonito)\nnode --check game.js no muestra errores -> comprobable\nEl intervalo nunca baja de 100 ms -> comprobable\nLa pausa es rápida -> vago (rápida)\nCon 10 líneas, el nivel es 1 -> comprobable",
    },
    {
      type: "playground",
      title: "Experimento 12: probar los criterios del spec",
      description: "El spec de ejemplo dice qué debe pasar con 0, 10 y 200 líneas. Calcula el nivel y el intervalo para varias cantidades de líneas y comprueba esos criterios. Cambia la fórmula.",
      code: `function nivel(lineas) {
  return Math.floor(lineas / 10);
}

function intervaloMs(lineas) {
  return Math.max(100, 500 - 40 * nivel(lineas));
}

[0, 9, 10, 25, 95, 200].forEach((l) =>
  console.log(l + " líneas -> nivel " + nivel(l) + ", " + intervaloMs(l) + " ms")
);`,
      expected: "0 líneas -> nivel 0, 500 ms\n9 líneas -> nivel 0, 500 ms\n10 líneas -> nivel 1, 460 ms\n25 líneas -> nivel 2, 420 ms\n95 líneas -> nivel 9, 140 ms\n200 líneas -> nivel 20, 100 ms",
    },
    {
      type: "playground",
      title: "Experimento 13: el estado de un spec",
      description: "Un spec pasa de borrador a aprobado, y de aprobado a implementado. También puede rechazarse. Comprueba qué secuencias son válidas. Añade otras.",
      code: `const PERMITIDAS = {
  borrador: ["aprobado", "rechazado"],
  aprobado: ["implementado", "rechazado"],
  implementado: [],
  rechazado: [],
};

function secuenciaValida(estados) {
  for (let i = 0; i < estados.length - 1; i++) {
    if (!PERMITIDAS[estados[i]].includes(estados[i + 1])) {
      return "no válida: " + estados[i] + " -> " + estados[i + 1];
    }
  }
  return "válida";
}

console.log(secuenciaValida(["borrador", "aprobado", "implementado"]));
console.log(secuenciaValida(["borrador", "implementado"]));
console.log(secuenciaValida(["borrador", "rechazado"]));`,
      expected: "válida\nno válida: borrador -> implementado\nválida",
    },
    { type: "heading", level: 2, text: "¿Qué usar en cada caso?" },
    {
      type: "table",
      headers: ["Si necesitas...", "Usa...", "Nota"],
      rows: [
        ["Un cambio pequeño y claro", "Un prompt directo", "Si cabe en una frase, no hace falta más."],
        ["Un cambio que toca varios archivos", "Un spec", "Documenta qué y por qué."],
        ["No saber todavía qué quieres", "Pedir a Claude que te entreviste", "Hasta que pueda escribir el spec."],
        ["Una decisión cara de revertir", "Un spec con decisiones descartadas", "Esquemas, formatos y endpoints."],
        ["Que Claude pare y no improvise", "Un apartado de lo que no entra", "Un límite escrito no se cuestiona."],
        ["Comprobar que está terminado", "Criterios de sí o no", "Comandos, cifras o comportamientos."],
        ["Avanzar con control", "Un plan por pasos, con pausa y commit en cada uno", "Cada paso es un punto de vuelta."],
        ["Revisar el resultado", "Una revisión contra el spec, sin estilo", "Con evidencia de cada criterio."],
        ["Una tarea que se repite", "Un skill o un comando", "No un spec nuevo cada vez."],
      ],
    },
    { type: "heading", level: 2, text: "Datos que suelen aparecer desactualizados" },
    {
      type: "table",
      headers: ["Suele decirse", "Información verificada (noviembre 2026)"],
      rows: [
        ["Hay niveles de pensamiento llamados thinking, extrathinking y ultrathinking.", "Solo `ultrathink` es una palabra clave, y actúa en un mensaje. Lo demás se regula con `/effort`. Es independiente del spec."],
        ["Un spec sustituye al modo plan.", "El modo plan ayuda a discutir y a preparar el spec. La guía oficial propone, además, la entrevista de Claude para escribirlo."],
        ["El spec debe cubrirlo todo antes de programar.", "No siempre: parte del conocimiento aparece al programar. Un detalle menor se ajusta sin rehacer el documento. Uno grande, se actualiza."],
        ["Un spec bueno es un prompt muy largo.", "Es un documento estructurado, con límites, criterios y decisiones, y se revisa y aprueba antes de ejecutarlo."],
        ["Los criterios pueden ser subjetivos.", "Deben responderse con sí o no por observación o por comando. Lo vago se detecta y se reescribe."],
        ["Se construye en la misma sesión donde se escribió el spec.", "La guía oficial recomienda una sesión nueva para construir, con el contexto limpio y el spec como definición de terminado."],
        ["La revisión debe encontrar todo lo que se pueda mejorar.", "Si pides problemas en general, siempre encontrará algo. Pide la revisión contra el spec y sin estilo."],
        ["El método de specs es la mejor forma de trabajar.", "Es una herramienta más, útil donde obliga a pensar. Hay otros enfoques, como entrevistarse con Claude sin guardar un documento largo."],
        ["La carpeta specs/ y la numeración son un estándar.", "Es una convención del autor del curso, práctica y fácil de leer. Cada equipo puede usar la suya."],
      ],
    },
    { type: "heading", level: 2, text: "Preguntas frecuentes" },
    {
      type: "accordion",
      items: [
        {
          title: "¿Qué diferencia hay entre un spec y un plan de Claude?",
          text: "El plan es un resultado de la sesión y desaparece con ella. El spec es un archivo del proyecto, con alcance, criterios y decisiones, que puedes versionar, revisar y reutilizar en otras sesiones y por otras personas.",
        },
        {
          title: "¿Cuántas secciones debe tener?",
          text: "Al menos las seis de la lección. Puedes añadir más. Con menos, el spec no guía lo bastante y casi te habría bastado un prompt.",
        },
        {
          title: "¿Y si el objetivo no cabe en una frase?",
          text: "Es una señal de que son dos o tres cambios. Divídelos en specs distintos y numerados, y ejecútalos por separado.",
        },
        {
          title: "¿Quién aprueba el spec?",
          text: "Una persona. Un spec que nadie ha leído no te protege. La aprobación es el momento en que tú decides que lo escrito es lo que quieres.",
        },
        {
          title: "¿Puedo pedir a Claude que escriba el spec solo?",
          text: "Sí, y la guía oficial recomienda la entrevista. Pero lee y corrige el resultado: el valor está en que tú tomes y entiendas las decisiones.",
        },
        {
          title: "¿Esto sirve para código que no es mío?",
          text: "Sirve especialmente: un spec con el alcance y los criterios te permite revisar lo que Claude cambia en un proyecto que no conoces a fondo.",
        },
      ],
    },
    { type: "heading", level: 2, text: "Qué sigue" },
    {
      type: "paragraph",
      text: "El Día 16 empieza a automatizar esto con skills: cómo se configuran y cómo se usan para escribir y revisar specs sin repetir las mismas instrucciones. Antes, guarda el spec de ejemplo en tu proyecto y piensa en una función real que quieras añadir a tu Tetris, porque la usarás para el spec de verdad.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 16, verifica que puedes explicar...",
      items: [
        "Qué es un spec y en qué se parece a escribir pruebas antes del código.",
        "Por qué se describe el problema y no la solución.",
        "Los seis pasos del flujo, y qué se gana en la conversación.",
        "Las seis secciones mínimas y por qué lo que no entra importa.",
        "Qué hace comprobable a un criterio de aceptación.",
        "Cuándo conviene un spec y cuándo un prompt directo.",
        "Por qué se ejecuta por pasos con pausas y un commit por paso.",
        "Cómo se revisa un resultado contra el spec, con evidencia y sin estilo.",
      ],
    },
    { type: "heading", level: 2, text: "Fuentes consultadas (noviembre 2026)" },
    {
      type: "list",
      items: [
        "[Buenas prácticas para Claude Code: entrevistarse con Claude y revisar contra un spec](https://code.claude.com/docs/en/best-practices)",
        "[Cómo Claude recuerda tu proyecto: CLAUDE.md y memoria](https://code.claude.com/docs/en/memory)",
        "[Modos de permisos y modo plan](https://code.claude.com/docs/en/permission-modes)",
        "[Configuración de modelos, esfuerzo y ultrathink](https://code.claude.com/docs/en/model-config)",
        "[Referencia de comandos](https://code.claude.com/docs/en/commands)",
        "[Git: git commit](https://git-scm.com/docs/git-commit)",
        "[Git: git switch](https://git-scm.com/docs/git-switch)",
        "[Node.js: opción --check](https://nodejs.org/api/cli.html)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "¿Por qué un spec no es solo un prompt largo?",
      options: [
        "Porque es más corto",
        "Porque es un documento estructurado con alcance, criterios y decisiones, que se revisa y aprueba antes de ejecutar",
        "Porque no lo lee Claude",
        "Porque no necesita revisión",
      ],
      correctIndex: 1,
      explanation: "Su valor está en la estructura y en el pensamiento que exige, además de servir de guía a Claude.",
    },
    {
      question: "¿Qué se describe en el primer paso del flujo?",
      options: [
        "La solución técnica",
        "El problema, no la solución",
        "El código final",
        "El nombre de la rama",
      ],
      correctIndex: 1,
      explanation: "Describir el problema deja que Claude proponga opciones y que tú guíes, en lugar de fijar una solución demasiado pronto.",
    },
    {
      question: "¿Qué debe tener el objetivo de un spec?",
      options: [
        "Una página",
        "Una sola frase: si se alarga, conviene dividir el spec",
        "Una lista de tecnologías",
        "Un diagrama",
      ],
      correctIndex: 1,
      explanation: "Un objetivo que necesita más de una frase suele esconder dos o tres cambios distintos.",
    },
    {
      question: "¿Por qué es valioso escribir lo que no entra en el alcance?",
      options: [
        "Porque ocupa espacio",
        "Porque Claude no cuestionará un límite escrito y no improvisará fuera de él",
        "Porque no sirve para nada",
        "Porque lo exige Git",
      ],
      correctIndex: 1,
      explanation: "Lo que no entra evita que Claude añada funciones por su cuenta.",
    },
    {
      question: "¿Cuál de estos es un criterio de aceptación válido?",
      options: [
        "El código es limpio",
        "Con 10 líneas, el nivel es 1 y el intervalo es 460 ms",
        "El juego funciona bien",
        "Se ve bonito",
      ],
      correctIndex: 1,
      explanation: "Un criterio válido se responde con sí o no por observación o por un comando. Los demás son subjetivos.",
    },
    {
      question: "¿Qué propone la guía oficial cuando no sabes exactamente qué quieres?",
      options: [
        "Escribir un spec de memoria",
        "Pedir a Claude que te entreviste hasta poder escribir el spec",
        "Esperar a tener más experiencia",
        "Hacer un prompt de una frase",
      ],
      correctIndex: 1,
      explanation: "Claude hace preguntas con opciones sobre lo que no has definido y sigue hasta que las respuestas forman un spec.",
    },
    {
      question: "Tienes un spec aprobado. ¿Cómo empiezas la construcción?",
      options: [
        "En la misma sesión larga donde lo discutiste, sin pausas",
        "En una sesión nueva con el contexto limpio, dándole el spec y pidiendo pausas tras cada paso",
        "Sin plan",
        "Con un prompt de una frase",
      ],
      correctIndex: 1,
      explanation: "Un contexto limpio y un spec como definición de terminado mejoran el resultado, y las pausas permiten corregir pronto.",
    },
    {
      question: "Es una corrección puntual del color de una pieza. ¿Qué haces?",
      options: [
        "Un spec con seis secciones",
        "Un prompt directo",
        "Un proyecto nuevo",
        "Nada",
      ],
      correctIndex: 1,
      explanation: "Una corrección puntual cabe en un mensaje. Un spec sería sobrecoste.",
    },
    {
      question: "¿Qué instrucción conviene incluir al pedir la revisión contra el spec?",
      options: [
        "Encuentra todo lo que se pueda mejorar",
        "Comprueba cada criterio, muestra la evidencia y avisa solo de fallos de corrección, sin comentar el estilo",
        "Reescribe todo el código",
        "No muestres evidencia",
      ],
      correctIndex: 1,
      explanation: "Un revisor al que se le pide buscar problemas siempre encontrará alguno. Acotar la revisión evita abstracciones y pruebas inútiles.",
    },
    {
      question: "¿Qué comprueba el validador de la lección?",
      options: [
        "Que el criterio tenga sentido",
        "La forma: las seis secciones, el objetivo de una frase y criterios en casillas sin palabras vagas",
        "Que el código funcione",
        "Que el spec esté aprobado",
      ],
      correctIndex: 1,
      explanation: "Comprueba la forma. Que cada criterio tenga sentido sigue dependiendo de ti.",
    },
  ],
};
