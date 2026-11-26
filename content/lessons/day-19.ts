import type { Lesson } from "@/lib/types";

// Día 19 · Clases 67 a 71 de la transcripción (el artículo 72 solo enlaza el código fuente de la sección).
// Contenido verificado en noviembre de 2026.
export const day19: Lesson = {
  day: 19,
  slug: "tarea-guiada-sonidos-niveles-y-referencias",
  title: "Tarea guiada: sonidos y niveles, prompts rápidos y referencias",
  section: "Spec Driven Design",
  estimatedMinutes: 100,
  icon: "🎯",
  objectives: [
    "Planear con /spec una tarea de varias partes, sonidos y cinco niveles, y decidir si va en un spec o en dos.",
    "Implementarla con /spec-impl y reaccionar cuando Claude se sale del plan: parar, actualizar el spec y seguir.",
    "Actualizar los criterios de specs anteriores cuando una decisión nueva los contradice, sin dejar la regresión en rojo.",
    "Hacer ajustes visuales con un prompt rápido en una rama, con la regresión como red de seguridad.",
    "Mantener al día CLAUDE.md y README, y distinguir una referencia a un archivo de un import con @.",
  ],
  blocks: [
    {
      type: "paragraph",
      text: "Con el MVP y la animación ya integrados, esta lección es una práctica: una tarea con dos partes, sonidos y niveles, que tienes que plantear y construir tú, y que luego se resuelve paso a paso. Después, dos hábitos que mantienen el proyecto sano: arreglos visuales con un prompt rápido en una rama, y poner al día los archivos que Claude lee en cada sesión.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "5", label: "Niveles con distinto diseño de bloques" },
        { value: "10 %", label: "Aumento de la velocidad de la pelota en cada nivel" },
        { value: "2", label: "Sonidos: rebote y bloque roto" },
        { value: "8", label: "Pasos del plan del spec 003" },
        { value: "13", label: "Criterios del spec 003, 12 con script y 1 oyendo" },
        { value: "3", label: "Scripts de regresión que deben seguir en verde" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text: "Contenido verificado en noviembre de 2026. El spec, el código, los tres scripts de criterios y los comandos de Git los ejecuté de verdad, con un historial de ocho commits, dos merges y la rama del prompt rápido. También probé el juego en un navegador: los sonidos que se disparan en cada caso, el paso de nivel, la pausa, el selector con clic y con teclas, y el final del juego. Lo que responde Claude en los ejercicios 2, 4, 9 y 10 es orientativo, porque depende del modelo y su código será distinto del de referencia.",
    },
    { type: "heading", level: 2, text: "La tarea" },
    {
      type: "paragraph",
      text: "Antes de seguir, haz un /clear: las decisiones anteriores ya están escritas en los specs, y no necesitas el historial de la conversación. Esto es lo que se pide. Intenta resolverlo por tu cuenta antes de leer la solución: es el mejor modo de ver qué decisiones se te ocurren a ti y cuáles te propone Claude.",
    },
    {
      type: "checklist",
      title: "Requisitos de la tarea",
      items: [
        "El juego suena: un sonido cuando la pelota rebota en las paredes, el techo o la paleta.",
        "Cuando la pelota toca un bloque, suena solo el sonido del bloque, no el del rebote.",
        "Hay varios niveles, con distinto diseño de bloques, y la dificultad sube de uno a otro.",
        "Se puede poner pausa y elegir el nivel, para poder probar los niveles sin jugar todos.",
        "Al terminar el último nivel, el juego se gana.",
      ],
    },
    {
      type: "paragraph",
      text: "Hay una cuestión de proceso que merece pensarse. Sonidos y niveles son dos requisitos casi independientes. El sonido es pequeño, y los niveles son más complejos. Puedes hacer un prompt directo para el sonido, un spec para los niveles, o un único spec para los dos. No hay una respuesta única, y esta lección elige un spec combinado a propósito, para practicar un cambio con varias partes. Pero conviene saber lo que se gana y se pierde.",
    },
    {
      type: "table",
      headers: ["", "Un spec con todo", "Dos specs separados"],
      rows: [
        ["Rapidez", "Una sola entrevista y una sola rama.", "Dos entrevistas y dos ramas."],
        ["Revisión", "Un plan más largo, con más que leer.", "Cada plan es corto y se revisa de una vez."],
        ["Riesgo", "Un problema en una parte bloquea la otra.", "Cada parte se integra cuando está lista."],
        ["Lo recomendado", "Cambios pequeños y relacionados.", "Cuando una parte es trivial y la otra no. Es lo que el skill sugiere."],
      ],
    },
    {
      type: "paragraph",
      text: "El skill spec suele recomendar separar, porque una tarea con varias partes rompe la regla de un spec, un objetivo. Ahí estás tú, que decides. En esta lección va junto, y la consecuencia se ve: un plan de ocho pasos, más criterios y una decisión que se corrige a mitad de camino.",
    },
    { type: "heading", level: 2, text: "Qué cambia respecto a usar archivos de audio" },
    {
      type: "paragraph",
      text: "El enunciado habitual trae dos archivos de sonido. Aquí no hay ningún archivo: los sonidos se generan con la API Web Audio, con un oscilador y un control de volumen. Es más corto, no depende de recursos y se puede razonar. Tiene tres consecuencias que importan.",
    },
    {
      type: "list",
      items: [
        "Cada sonido crea su propio oscilador, así que dos sonidos seguidos se solapan sin pisarse. Con un elemento de audio de un archivo, el mismo objeto no se puede reproducir dos veces a la vez: hay que clonarlo.",
        "Los navegadores solo dejan sonar el audio tras un gesto de la persona, como un clic o una tecla. Mover el ratón no cuenta. Por eso el código reanuda el contexto de audio en el primer keydown o pointerdown.",
        "Los sonidos de la lógica no se oyen: se anotan. La lógica solo dice qué sonido toca, rebote o bloque, y game.js decide cómo suena. Esa separación hace posible probar los sonidos con Node.",
      ],
    },
    {
      type: "image",
      src: "/img/dia-19/un-sonido-por-paso.svg",
      alt: "El paso de la lógica detecta si la pelota toca una pared, el techo o la paleta, que marca rebote, o un bloque, que marca bloque roto. Al final del paso, si hay bloque roto anota bloque y, si no, si hay rebote anota rebote. Debajo, dos recuadros: la lógica decide qué sonido toca y game.js decide cómo suena, con la frecuencia, la onda y la duración de cada uno.",
      caption: "Como máximo un evento por paso, y el bloque gana al rebote.",
    },
    { type: "heading", level: 2, text: "El spec 003" },
    {
      type: "paragraph",
      text: "Lanza /spec con el problema en una frase: que el juego suene y tenga varios niveles. Y responde con decisiones. Estas son las del ejemplo, y las dos primeras se las propone Claude como opciones.",
    },
    {
      type: "table",
      headers: ["Claude pregunta", "Tu decisión", "Por qué"],
      rows: [
        ["¿Un spec o dos?", "Uno, para practicar con varias partes.", "Es una elección de proceso, no técnica."],
        ["¿Qué dispara cada sonido?", "El rebote en paredes, techo y paleta. En un bloque, solo el del bloque.", "Es el requisito de la tarea, y se puede comprobar."],
        ["¿Volumen?", "Sin control. El sonido por defecto.", "No hace falta todavía."],
        ["¿Qué cambia entre niveles?", "El diseño y la velocidad. Sin power-ups.", "Los power-ups serían otro spec."],
        ["¿Cuántos niveles y qué pasa al final?", "Cinco. Al terminar el quinto, se gana. Sin bucle infinito.", "Un final claro es más fácil de comprobar."],
        ["¿Cuánto más rápido va cada nivel?", "Un 10 %.", "Una cifra concreta se comprueba. Más rápido no."],
        ["¿Cómo se prueban los niveles?", "Pausa con P y Escape, y un selector con botones numerados.", "Es un requisito que aparece al pensar cómo probar."],
        ["¿Dónde viven los niveles?", "En levels.js, como datos.", "Cambiar un nivel es cambiar texto y no código."],
      ],
    },
    {
      type: "image",
      src: "/img/dia-19/niveles-del-juego.svg",
      alt: "Cinco recuadros negros con la miniatura de cada nivel. Parrilla, con 60 bloques y 320 píxeles por segundo. Pirámide, con 40 bloques y 352. Tablero, con 30 bloques y 387. Franjas, con 30 bloques y 426. Marco, con 40 bloques y 469. Debajo, una nota: un nivel es una lista de textos, cada almohadilla es un bloque y cada punto es un hueco.",
      caption: "Los cinco niveles de referencia. Los tuyos pueden ser otros.",
    },
    {
      type: "paragraph",
      text: "Este es el resultado de referencia. Fíjate en tres cosas. Hay un criterio que solo puede comprobarse oyendo, y se declara así. El plan tiene ocho pasos, y cada uno deja el juego funcional. Y en las decisiones hay una línea nueva, Actualizada, que reconoce que este spec contradice una decisión del spec 001, la del único nivel.",
    },
    {
      type: "code",
      lang: "markdown",
      title: "specs/003-sonidos-y-niveles.md",
      code: `---
estado: borrador
---
# 003 Sonidos y cinco niveles con pausa
## Objetivo
Que el juego suene al rebotar y al romper bloques, y que tenga cinco niveles que se pueden elegir desde una pausa.
## Alcance
Entra:
- Dos sonidos generados con código: uno para el rebote y otro para romper un bloque.
- El rebote suena en las paredes, el techo y la paleta. Al tocar un bloque suena solo el del bloque.
- Cinco niveles con distinto diseño de bloques, guardados en levels.js.
- Cada nivel sube un 10 % la velocidad de la pelota.
- Al romper todos los bloques de un nivel se pasa al siguiente, con los puntos y las vidas actuales.
- Al romper todos los del nivel 5 se muestra ¡GANASTE!.
- Pausa con las teclas P y Escape, con un selector de nivel de botones numerados.
- Mostrar el número de nivel en la pantalla.

No entra:
- Control de volumen, música ni sonidos de GAME OVER.
- Más de cinco niveles, power-ups ni guardar el progreso.
- Archivos de audio o de imagen.
## Modelo de datos
- NIVELES, en levels.js: lista de niveles con nombre y filas de texto, donde # es un bloque y . es un hueco.
- juego.nivel: número del nivel actual, de 1 a 5.
- juego.eventos: lista de sonidos pendientes, con los valores rebote y bloque.
- Fase nueva: pausa.
## Plan de implementación
1. Eventos de sonido: que paso anote rebote o bloque, y que al tocar un bloque solo quede bloque.
2. Sonidos: reproducirlos en game.js con la API Web Audio, y actualizar los criterios de los specs 001 y 002 sobre audio.
3. Datos de los niveles: crear levels.js con los cinco diseños y construir los bloques desde ahí.
4. Avance de nivel: velocidad de la pelota, paso al siguiente nivel y fase ganaste en el último, con los criterios del spec 001 actualizados.
5. Pausa: las teclas P y Escape alternan la fase pausa, y en pausa nada se mueve.
6. Selector: botones numerados en la pausa, elegibles con clic o con las teclas del 1 al 5.
7. Pantalla: mostrar el nivel actual.
8. Verificar con scripts/probar-niveles.js, comprobar que los specs anteriores siguen pasando y pasar el estado a implementado.
## Criterios de aceptación
- [ ] Hay cinco niveles, y cada uno tiene al menos 20 bloques dentro del lienzo.
- [ ] El nivel 1 es la parrilla de 60 bloques.
- [ ] La pelota de cada nivel es un 10 % más veloz que la del anterior.
- [ ] Al romper el último bloque de un nivel que no es el 5, se pasa al siguiente con los mismos puntos y vidas.
- [ ] Al romper el último bloque del nivel 5, la fase es ganaste.
- [ ] Con la fase pausa nada se mueve, y alternarla vuelve a jugando.
- [ ] El clic en un botón numerado, o su tecla, lleva a ese nivel.
- [ ] El rebote en una pared, el techo o la paleta anota un evento rebote.
- [ ] Al romper un bloque se anota solo el evento bloque, aunque ese paso toque también una pared.
- [ ] Dos bloques rotos seguidos anotan dos eventos bloque.
- [ ] El código no carga archivos de audio ni de imagen: los sonidos se generan con código.
- [ ] Los criterios de los specs 001 y 002 siguen cumpliéndose.
- [ ] Al jugar se oyen los dos sonidos, y al romper un bloque no se oye el rebote.
## Decisiones
- Tomada: un único spec para sonidos y niveles, aunque son separables, para practicar un cambio con varias partes.
- Tomada: los sonidos se generan con la API Web Audio, para no depender de archivos.
- Tomada: los niveles viven en levels.js como datos, no dentro de game.js.
- Tomada: un 10 % más de velocidad por nivel, porque es una cifra que se puede comprobar.
- Tomada: pausa con P y Escape, y selector de nivel con botones numerados, para poder probar los niveles.
- Actualizada: el spec 001 decía un único nivel y sin audio. Sus criterios se ajustan a este spec.
- Descartada: bucle infinito de niveles, porque al terminar el quinto se gana.
- Descartada: control de volumen, porque no se necesita todavía.`,
    },
    { type: "heading", level: 2, text: "Cuando un spec nuevo contradice a los anteriores" },
    {
      type: "paragraph",
      text: "Aquí aparece algo que en un proyecto real pasa más a menudo de lo que parece. El spec 001 decía que había un único nivel, y que el código no usaba audio. El spec 003 cambia las dos cosas. Si no se tocan los specs viejos y sus scripts, la regresión falla, o peor, pasa mintiendo.",
    },
    {
      type: "image",
      src: "/img/dia-19/specs-que-cambian-specs.svg",
      alt: "Dos decisiones del spec 001 que el spec 003 cambia. Un único nivel pasa a cinco niveles, lo que afecta al criterio de ganar con cero bloques, que ahora es en el último nivel. Sin audio pasa a sonidos generados con código, lo que afecta al criterio que prohibía audio e imagen, que ahora prohíbe cargar archivos. Debajo, qué se actualiza: el criterio en el spec, su comprobación en el script, y una línea Actualizada en las decisiones.",
      caption: "Se actualiza el texto, el script y las decisiones, a la vez.",
    },
    {
      type: "paragraph",
      text: "Se actualiza en el mismo paso que cambia el código, y no al final. Así, tras cada paso, los tres scripts siguen en verde, y si uno falla sabes qué cambio lo ha causado. Este es el cambio real en el paso 4, cuando el juego deja de ganar en el primer nivel.",
    },
    {
      type: "code",
      lang: "text",
      title: "git show del paso 4, solo scripts y specs",
      code: `--- a/scripts/probar-criterios.js
+++ b/scripts/probar-criterios.js
@@ -1,7 +1,7 @@
 // Comprueba los criterios del spec 001 que se pueden verificar sin navegador.
 const fs = require("fs");
 const { execFileSync } = require("child_process");
-const { CFG, nuevoJuego, moverPaleta, colocarPaleta, paso } = require("../logica.js");
+const { CFG, NIVELES, nuevoJuego, cargarNivel, moverPaleta, colocarPaleta, paso } = require("../logica.js");
 
 let fallos = 0;
 function criterio(nombre, cumple) {
@@ -50,9 +50,10 @@ paso(j, 0.5);
 criterio("Con 0 vidas la fase es gameover y la pelota deja de moverse", j.fase === "gameover" && antes === j.bola.x + "," + j.bola.y);
 
 j = nuevoJuego();
+cargarNivel(j, NIVELES.length);
 j.bloques.forEach((b) => (b.vivo = false));
 paso(j, 0.001);
-criterio("Con 0 bloques la fase es ganaste", j.fase === "ganaste");
+criterio("Con 0 bloques en el último nivel la fase es ganaste", j.fase === "ganaste");
 
 let sintaxis = true;
 try {
--- a/scripts/probar-explosiones.js
+++ b/scripts/probar-explosiones.js
@@ -1,7 +1,7 @@
 // Comprueba los criterios del spec 002 que se pueden verificar sin navegador.
 const fs = require("fs");
 const { execFileSync } = require("child_process");
-const { CFG, nuevoJuego, paso, avanzarExplosiones, fotograma } = require("../logica.js");
+const { CFG, NIVELES, nuevoJuego, cargarNivel, paso, avanzarExplosiones, fotograma } = require("../logica.js");
 
 let fallos = 0;
 function criterio(nombre, cumple) {
@@ -58,6 +58,7 @@ romper(j, j.bloques[1]);
 criterio("Si se rompen dos bloques seguidos, hay dos explosiones a la vez", j.explosiones.length === 2);
 
 j = nuevoJuego();
+cargarNivel(j, NIVELES.length);
 j.bloques.slice(1).forEach((b) => (b.vivo = false));
 romper(j, j.bloques[0]);
 const alGanar = j.fase === "ganaste" && j.explosiones.length === 1;
--- a/specs/001-mvp-arkanoid.md
+++ b/specs/001-mvp-arkanoid.md
@@ -39,11 +39,12 @@ No entra:
 - [ ] Romper un bloque suma 10 puntos y lo hace desaparecer.
 - [ ] Si la pelota cae, se pierde una vida y la pelota vuelve a empezar.
 - [ ] Con 0 vidas la fase es gameover y la pelota deja de moverse.
-- [ ] Con 0 bloques la fase es ganaste.
+- [ ] Con 0 bloques en el último nivel la fase es ganaste.
 - [ ] node --check no da errores en logica.js ni en game.js.
 - [ ] El código no carga archivos de audio ni de imagen.
 ## Decisiones
 - Tomada: un único nivel, para probar el juego completo cuanto antes.
+- Actualizada por el spec 003: ahora hay cinco niveles, y la fase ganaste llega al romper todos los bloques del último.
 - Tomada: rebote simple que invierte la velocidad, porque la física es predecible.
 - Tomada: ratón y teclado a la vez, para que se pueda jugar con cualquiera.
 - Tomada: separar la lógica en logica.js, para poder probarla con Node.`,
    },
    {
      type: "paragraph",
      text: "En el paso 2 pasó algo curioso. El criterio decía que el código no usa audio, y se cambió a que no carga archivos de audio ni de imagen. Pero el script, con la expresión antigua, habría seguido pasando: el código de Web Audio se escribe como new, un paréntesis y window.AudioContext, y la búsqueda de new Audio no lo encuentra. Pasar por casualidad es una mala señal: el texto del criterio mentía y el script no lo notaba. Por eso se reescribe la expresión para que busque lo que dice el criterio, que es new Audio con paréntesis, new Image con paréntesis y las extensiones de archivo.",
    },
    { type: "heading", level: 2, text: "Implementar con /spec-impl" },
    {
      type: "paragraph",
      text: "Con el spec aprobado y guardado, otro /clear y a implementarlo. Es el mismo ciclo del Día 18. Merece la pena repasar qué se aprende en este spec más largo.",
    },
    {
      type: "table",
      headers: ["Paso", "Qué añade", "Cómo lo compruebas"],
      rows: [
        ["1. Eventos", "juego.eventos y los avisos rebote y bloque dentro de paso.", "Un test de Node mira la lista tras un paso."],
        ["2. Sonidos", "iniciarAudio, tono y SONIDOS en game.js, con la API Web Audio.", "En el navegador suena, tras un clic o una tecla."],
        ["3. Datos", "levels.js con los cinco niveles, y crearBloques(nivel).", "El nivel 1 sigue teniendo 60 bloques."],
        ["4. Avance", "cargarNivel, la velocidad +10 % y la fase ganaste en el último.", "Romper el último bloque del nivel 1 lleva al nivel 2."],
        ["5. Pausa", "alternarPausa, P y Escape, y paso que no hace nada en pausa.", "La pelota queda quieta al pulsar P."],
        ["6. Selector", "botonesNivel, nivelEnPunto, irANivel y los botones dibujados.", "Un clic en el 4 carga el nivel 4."],
        ["7. Pantalla", "El texto Nivel N arriba, en el centro.", "Se ve el número de nivel."],
        ["8. Criterios", "scripts/probar-niveles.js y el estado implementado.", "Los tres scripts, en verde."],
      ],
    },
    {
      type: "paragraph",
      text: "El detalle de la lógica de eventos es lo más delicado. En cada paso, la pelota puede rebotar contra una pared y, a la vez, romper un bloque. El requisito dice que, entonces, solo suena el bloque. Se resuelve con dos marcas, una para el rebote y otra para el bloque roto, y una decisión al final del paso.",
    },
    {
      type: "code",
      lang: "js",
      title: "Fragmento de paso en logica.js",
      code: `  if (bloqueRoto) juego.eventos.push("bloque");
  else if (rebote) juego.eventos.push("rebote");`,
    },
    {
      type: "code",
      lang: "js",
      title: "Fragmento de game.js",
      code: `function tono(frecuencia, duracion, tipo) {
  if (!audio) return;
  const oscilador = audio.createOscillator();
  const volumen = audio.createGain();
  oscilador.type = tipo;
  oscilador.frequency.value = frecuencia;
  volumen.gain.setValueAtTime(0.15, audio.currentTime);
  volumen.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + duracion);
  oscilador.connect(volumen);
  volumen.connect(audio.destination);
  oscilador.start();
  oscilador.stop(audio.currentTime + duracion);
}

const SONIDOS = {
  rebote: () => tono(220, 0.08, "square"),
  bloque: () => tono(660, 0.15, "triangle"),
};`,
    },
    {
      type: "paragraph",
      text: "Y los niveles, que son datos. Un archivo de texto con un dibujo por nivel. Es fácil de leer, de cambiar y de revisar en un diff. Podría ser un JSON, si algún día los niveles vinieran de un servidor.",
    },
    {
      type: "code",
      lang: "js",
      title: "levels.js",
      code: `// Niveles del juego. Cada nivel tiene 6 filas de 10 columnas.
// # es un bloque y . es un hueco.
const NIVELES = [
  {
    nombre: "Parrilla",
    filas: ["##########", "##########", "##########", "##########", "##########", "##########"],
  },
  {
    nombre: "Pirámide",
    filas: ["....##....", "...####...", "..######..", ".########.", "##########", "##########"],
  },
  {
    nombre: "Tablero",
    filas: ["#.#.#.#.#.", ".#.#.#.#.#", "#.#.#.#.#.", ".#.#.#.#.#", "#.#.#.#.#.", ".#.#.#.#.#"],
  },
  {
    nombre: "Franjas",
    filas: ["##########", "..........", "##########", "..........", "##########", ".........."],
  },
  {
    nombre: "Marco",
    filas: ["##########", "#........#", "#.######.#", "#.######.#", "#........#", "##########"],
  },
];

if (typeof module !== "undefined") {
  module.exports = { NIVELES };
}`,
    },
    { type: "heading", level: 2, text: "Cuando Claude se sale del plan" },
    {
      type: "paragraph",
      text: "A mitad de la implementación puede aparecer algo que tú no esperabas. Por ejemplo, que Claude defina los niveles dentro de game.js, cuando el spec decía levels.js, o que añada una constante que el plan no mencionaba. Un buen skill te lo señala, diciendo que algo queda fuera del alcance y ofreciendo anotarlo para otro spec o hacerlo ahora.",
    },
    {
      type: "paragraph",
      text: "Es el momento de parar y decidir, y hay dos salidas. O lo dejas fuera, y lo anotas para el siguiente spec. O lo incorporas, y actualizas el spec antes de seguir. Lo que no debes hacer es dejarlo pasar, porque entonces el código y el spec dicen cosas distintas. Un mensaje así lo resuelve.",
    },
    {
      type: "code",
      lang: "text",
      title: "En Claude Code, a mitad del paso",
      code: `Los niveles tienen que ir en un archivo aparte, levels.js, y no dentro de game.js. Actualiza el spec con esa decisión y hazlo en este paso.`,
    },
    {
      type: "paragraph",
      text: "Si los pasos terminan en commits con el número del paso en el mensaje, como spec 003 paso 4, puedes ver la relación entre lo que pasó y el plan. Es un trabajo extra pequeño que se agradece cuando vuelves al proyecto semanas después.",
    },
    { type: "heading", level: 2, text: "Probar un sonido sin oírlo" },
    {
      type: "paragraph",
      text: "Con las pruebas de Node compruebas qué evento se anota. Con una partida compruebas qué suena. Entre las dos, hay un truco útil en el navegador: sustituir tono por una función que anote lo que recibe, y jugar. Así ves, sin altavoces, qué frecuencia y qué onda se piden en cada caso.",
    },
    {
      type: "code",
      lang: "js",
      title: "En la consola del navegador",
      code: `const llamadas = [];
window.tono = (frecuencia, duracion, tipo) => llamadas.push(frecuencia + ":" + tipo);
// juega unos segundos y luego mira
llamadas`,
    },
    {
      type: "paragraph",
      text: "En la prueba que hice con el código de referencia, romper un bloque pidió un solo tono de 660 Hz con onda triangular, y rebotar contra la pared pidió uno de 220 Hz con onda cuadrada. Pero esto no sustituye a oír el resultado: criterios como que no se oiga el rebote al romper un bloque se comprueban a mano, y eso es lo que dice el último criterio del spec.",
    },
    { type: "heading", level: 2, text: "Pausa y selector de nivel" },
    {
      type: "image",
      src: "/img/dia-19/pausa-y-selector.svg",
      alt: "A la izquierda, la pantalla del juego en pausa: el título PAUSA, el texto elige un nivel o pulsa P para seguir y cinco botones numerados, con el 2 resaltado. A la derecha, las fases jugando y pausa con flechas en las dos direcciones para las teclas P y Escape, y una explicación: en pausa nada se mueve, ni siquiera las explosiones, un clic o una tecla del 1 al 5 carga el nivel y se conservan los puntos y las vidas.",
      caption: "La pausa es una fase más, con sus propias reglas.",
    },
    {
      type: "paragraph",
      text: "La pausa merece un comentario sobre diseño. Es una fase del juego, igual que gameover, y por eso la lógica de paso no tiene que saber nada de teclas: game.js traduce P y Escape a una llamada a alternarPausa. El selector hace lo mismo. La lógica sabe dónde están los botones y qué nivel hay en un punto, y game.js solo convierte el clic en coordenadas del lienzo. Con eso se prueba el selector sin navegador.",
    },
    { type: "heading", level: 2, text: "Prompts rápidos de edición" },
    {
      type: "paragraph",
      text: "Con los niveles ya en su sitio, quedan arreglos estéticos: la paleta se ve demasiado grande y los bloques, algo pequeños. Aquí no hace falta un spec: es un cambio de dos números. Pero sí hace falta cuidado, y hay un ciclo corto que se repite siempre.",
    },
    {
      type: "image",
      src: "/img/dia-19/prompt-rapido.svg",
      alt: "Seis pasos: crear una rama con git switch -c ajustes-visuales, limpiar el contexto con /clear y adjuntar una captura si es visual, escribir un prompt con cifras, revisar con git diff y jugando, ejecutar la regresión de los tres scripts y hacer commit, e integrar con git switch main, git merge y git branch -d. Una nota explica que si el resultado no gusta se borra la rama con -D y main no ha cambiado.",
      caption: "Una rama y una regresión, por pequeño que sea el cambio.",
    },
    {
      type: "code",
      lang: "text",
      title: "En la terminal y en Claude Code",
      code: `git switch -c ajustes-visuales
/clear
La paleta tiene que medir la mitad de lo que mide ahora y los bloques tienen que ser un poco más grandes.`,
    },
    {
      type: "paragraph",
      text: "Aquí el cambio fue de dos líneas en logica.js, y los tres scripts siguieron en verde. Eso no es casualidad: los criterios usan los datos del juego, como CFG.paleta.w, y no cifras fijas, de modo que un cambio de tamaño no los rompe. Es una buena razón para escribir criterios sobre la configuración y no sobre números mágicos.",
    },
    {
      type: "comparison",
      lang: "js",
      before: {
        title: "logica.js antes",
        code: `  paleta: { w: 100, h: 14, y: 560, vel: 520 },
  bloques: { cols: 10, filas: 6, w: 70, h: 24, hueco: 6, arriba: 60 },`,
      },
      after: {
        title: "logica.js después",
        code: `  paleta: { w: 50, h: 14, y: 560, vel: 520 },
  bloques: { cols: 10, filas: 6, w: 72, h: 26, hueco: 6, arriba: 60 },`,
      },
    },
    {
      type: "paragraph",
      text: "Hacerlo en una rama es la red de seguridad: si Claude toca archivos que no debía, o el resultado no te convence, descartas la rama con `git branch -D` y main no se ha enterado. Si hubiera sido un cambio con decisiones, como cuántos bloques más, sería un spec. Para un cambio de tamaño con cifras concretas, un prompt basta. Con las tres preguntas del Día 18, la respuesta es la misma.",
    },
    { type: "heading", level: 2, text: "Mantener las referencias al día" },
    {
      type: "paragraph",
      text: "Cuando el proyecto crece, hay archivos que se quedan desactualizados y que Claude lee siempre. El primero es CLAUDE.md, que se carga al empezar cada sesión: si dice cosas viejas, Claude decide con información vieja. El segundo es el README, que lee la gente. Y el tercero son los estados de los specs. Cada vez que cierras un spec, comprueba que dice implementado.",
    },
    {
      type: "paragraph",
      text: "Puedes pedirle a Claude que lo actualice. Esto sale bien si le pides que lo haga a partir de la estructura y de los patrones del proyecto, y si luego lees el diff. Un buen CLAUDE.md nombra la estructura, el flujo de trabajo y las reglas que no se deducen del código, y sigue siendo corto. La guía oficial apunta a menos de unas 200 líneas por archivo. Este tiene 19.",
    },
    {
      type: "code",
      lang: "markdown",
      title: "CLAUDE.md",
      code: `# Arkanoid

Juego de Arkanoid en HTML, CSS y JavaScript sin dependencias. Se juega abriendo index.html en el navegador.

## Estructura
- logica.js: las reglas del juego. No toca el DOM y se prueba con Node.
- levels.js: los cinco niveles, como datos.
- game.js: dibujo, sonidos y entradas.
- scripts/: validar-spec.js y un script probar-*.js por cada spec.

## Cómo trabajamos
- Los cambios con decisiones se hacen con specs en specs/: /spec para escribirlos y /spec-impl para implementarlos.
- Un spec pasa de borrador a aprobado, que cambia una persona, y a implementado. El estado está en la cabecera de cada archivo.
- Antes de dar un cambio por bueno, ejecuta los tres scripts: probar-criterios.js, probar-explosiones.js y probar-niveles.js.
- Los ajustes visuales pequeños se piden con un prompt directo, en una rama.

## Reglas
- Responde siempre en español.
- No uses archivos de audio ni de imagen: los sonidos se generan con código.`,
    },
    {
      type: "code",
      lang: "markdown",
      title: "README.md",
      code: `# Arkanoid

Un Arkanoid hecho con HTML, CSS y JavaScript, sin dependencias ni compilación. Una pelota rebota en una paleta y rompe bloques a lo largo de cinco niveles.

## Cómo jugar
Abre index.html en el navegador.
- Ratón o flechas: mover la paleta.
- P o Escape: pausa. En la pausa se elige un nivel con el ratón o con las teclas del 1 al 5.
- Enter: otra partida, tras GAME OVER o ¡GANASTE!.

## Reglas
- Tres vidas. Cada bloque da 10 puntos.
- Cada nivel sube un 10 % la velocidad de la pelota.
- La pelota suena al rebotar, y al romper un bloque suena otro sonido.

## Desarrollo
Las reglas están en logica.js y se prueban con Node:

    node scripts/probar-criterios.js
    node scripts/probar-explosiones.js
    node scripts/probar-niveles.js

Los cambios se describen en specs/ con /spec y se implementan con /spec-impl.

## Specs
- 001 MVP jugable: implementado.
- 002 Animación de explosión: implementado.
- 003 Sonidos y cinco niveles con pausa: implementado.`,
    },
    {
      type: "paragraph",
      text: "Una duda habitual es cómo hacer referencia a un archivo grande, como una paleta de colores o una guía de estilo, sin llenar el CLAUDE.md. Hay dos maneras, y se comportan distinto. Si escribes la ruta como texto normal, por ejemplo: para los colores, mira docs/colores.md, Claude sabe que existe y lo lee cuando lo necesita. Si escribes @docs/colores.md fuera de un bloque de código, es un import: el archivo se expande y se carga en el contexto al empezar. Para algo grande que no siempre hace falta, usa la ruta en texto. Y si quieres citar una ruta sin importarla, envuélvela en comillas invertidas.",
    },
    { type: "heading", level: 2, text: "Ideas para seguir" },
    {
      type: "paragraph",
      text: "El juego ya da para más. Cada una de estas ideas es un spec nuevo, y te sirve de ejercicio libre: power-ups que caen al romper cierta cantidad de bloques, bloques más resistentes que piden dos golpes, bloques de un color que valen más, un sonido para GAME OVER, o un generador aleatorio de niveles. Si no sabes si algo es spec o prompt, usa las tres preguntas.",
    },
    { type: "heading", level: 2, text: "Ejercicios guiados y experimentos" },
    {
      type: "paragraph",
      text: "Los ejercicios 1, 3, 5, 6, 7 y 8 se ejecutan con Git y Node y sus salidas son reales, igual que las partes de Git y Node de los ejercicios 9 y 10. Los ejercicios 2 y 4, y los pasos con Claude de los ejercicios 9 y 10, son orientativos. Los experimentos del final se ejecutan en el navegador.",
    },
    {
      type: "exercise",
      title: "Ejercicio 1: partir de un main limpio",
      description: "Comprueba que el spec 002 está integrado y que no hay ramas colgadas.",
      steps: [
        {
          instruction: "Ve al proyecto y mira los cambios sin guardar y las ramas.",
          command: "cd ~/ClaudeCode/05-arkanoid && git switch -q main && git status --porcelain && git branch",
          expected: "* main",
        },
        {
          instruction: "Si algún spec anterior no dice implementado, corrígelo ahora. Lo comprobamos de un vistazo.",
          command: "head -2 specs/001-mvp-arkanoid.md specs/002-animacion-explosion-bloques.md | grep estado",
          expected: "estado: implementado\nestado: implementado",
        },
      ],
      verify: "Estás en main, sin cambios sin guardar, y los dos specs dicen implementado.",
    },
    {
      type: "exercise",
      title: "Ejercicio 2: el spec de sonidos y niveles",
      description: "Una frase, y las decisiones de la tabla.",
      steps: [
        {
          instruction: "Limpia el contexto, entra en modo plan con Shift+Tab y lanza el skill.",
          command: "claude\n/clear\n/spec Necesito que el juego suene y tenga varios niveles",
          expected: "Claude lee los specs anteriores y el código, y pregunta: si va en un spec o en dos, qué eventos suenan, volumen, qué cambia entre niveles, cuántos niveles.",
        },
        {
          instruction: "Responde con las decisiones de la tabla. Si Claude recomienda dos specs, elige uno y di por qué.",
          command: "Un único spec, para practicar. El rebote suena en paredes, techo y paleta, pero al tocar un bloque solo suena el del bloque. Cinco niveles con distinto diseño, un 10 % más de velocidad por nivel, sin power-ups. Al terminar el quinto se gana. Pausa con P y Escape, y un selector de nivel con botones numerados. Los niveles van en levels.js. Los sonidos se generan con código, sin archivos.",
          expected: "Claude presenta el spec por secciones, con dependencias en los specs 001 y 002. Al final pide permiso para guardar specs/003-sonidos-y-niveles.md.",
        },
      ],
      verify: "El spec tiene criterios de sí o no, una línea Actualizada sobre el spec 001 y un criterio que se comprueba oyendo.",
    },
    {
      type: "exercise",
      title: "Ejercicio 3: validar, aprobar y guardar",
      description: "Si prefieres el spec de referencia, guárdalo y valídalo.",
      steps: [
        {
          instruction: "Guarda el spec de referencia, o compáralo con el tuyo.",
          file: {
            name: "specs/003-sonidos-y-niveles.md",
            code: `---
estado: borrador
---
# 003 Sonidos y cinco niveles con pausa
## Objetivo
Que el juego suene al rebotar y al romper bloques, y que tenga cinco niveles que se pueden elegir desde una pausa.
## Alcance
Entra:
- Dos sonidos generados con código: uno para el rebote y otro para romper un bloque.
- El rebote suena en las paredes, el techo y la paleta. Al tocar un bloque suena solo el del bloque.
- Cinco niveles con distinto diseño de bloques, guardados en levels.js.
- Cada nivel sube un 10 % la velocidad de la pelota.
- Al romper todos los bloques de un nivel se pasa al siguiente, con los puntos y las vidas actuales.
- Al romper todos los del nivel 5 se muestra ¡GANASTE!.
- Pausa con las teclas P y Escape, con un selector de nivel de botones numerados.
- Mostrar el número de nivel en la pantalla.

No entra:
- Control de volumen, música ni sonidos de GAME OVER.
- Más de cinco niveles, power-ups ni guardar el progreso.
- Archivos de audio o de imagen.
## Modelo de datos
- NIVELES, en levels.js: lista de niveles con nombre y filas de texto, donde # es un bloque y . es un hueco.
- juego.nivel: número del nivel actual, de 1 a 5.
- juego.eventos: lista de sonidos pendientes, con los valores rebote y bloque.
- Fase nueva: pausa.
## Plan de implementación
1. Eventos de sonido: que paso anote rebote o bloque, y que al tocar un bloque solo quede bloque.
2. Sonidos: reproducirlos en game.js con la API Web Audio, y actualizar los criterios de los specs 001 y 002 sobre audio.
3. Datos de los niveles: crear levels.js con los cinco diseños y construir los bloques desde ahí.
4. Avance de nivel: velocidad de la pelota, paso al siguiente nivel y fase ganaste en el último, con los criterios del spec 001 actualizados.
5. Pausa: las teclas P y Escape alternan la fase pausa, y en pausa nada se mueve.
6. Selector: botones numerados en la pausa, elegibles con clic o con las teclas del 1 al 5.
7. Pantalla: mostrar el nivel actual.
8. Verificar con scripts/probar-niveles.js, comprobar que los specs anteriores siguen pasando y pasar el estado a implementado.
## Criterios de aceptación
- [ ] Hay cinco niveles, y cada uno tiene al menos 20 bloques dentro del lienzo.
- [ ] El nivel 1 es la parrilla de 60 bloques.
- [ ] La pelota de cada nivel es un 10 % más veloz que la del anterior.
- [ ] Al romper el último bloque de un nivel que no es el 5, se pasa al siguiente con los mismos puntos y vidas.
- [ ] Al romper el último bloque del nivel 5, la fase es ganaste.
- [ ] Con la fase pausa nada se mueve, y alternarla vuelve a jugando.
- [ ] El clic en un botón numerado, o su tecla, lleva a ese nivel.
- [ ] El rebote en una pared, el techo o la paleta anota un evento rebote.
- [ ] Al romper un bloque se anota solo el evento bloque, aunque ese paso toque también una pared.
- [ ] Dos bloques rotos seguidos anotan dos eventos bloque.
- [ ] El código no carga archivos de audio ni de imagen: los sonidos se generan con código.
- [ ] Los criterios de los specs 001 y 002 siguen cumpliéndose.
- [ ] Al jugar se oyen los dos sonidos, y al romper un bloque no se oye el rebote.
## Decisiones
- Tomada: un único spec para sonidos y niveles, aunque son separables, para practicar un cambio con varias partes.
- Tomada: los sonidos se generan con la API Web Audio, para no depender de archivos.
- Tomada: los niveles viven en levels.js como datos, no dentro de game.js.
- Tomada: un 10 % más de velocidad por nivel, porque es una cifra que se puede comprobar.
- Tomada: pausa con P y Escape, y selector de nivel con botones numerados, para poder probar los niveles.
- Actualizada: el spec 001 decía un único nivel y sin audio. Sus criterios se ajustan a este spec.
- Descartada: bucle infinito de niveles, porque al terminar el quinto se gana.
- Descartada: control de volumen, porque no se necesita todavía.`,
          },
        },
        {
          instruction: "Valídalo.",
          command: "node scripts/validar-spec.js specs/003-sonidos-y-niveles.md",
          expected: "OK sección: Objetivo\nOK sección: Alcance\nOK sección: Modelo de datos\nOK sección: Plan de implementación\nOK sección: Criterios de aceptación\nOK sección: Decisiones\nRESULTADO: spec válido",
        },
        {
          instruction: "Guarda el borrador.",
          command: "git add specs && git commit -q -m \"spec 003 en borrador\" && git log --format=%s -1",
          expected: "spec 003 en borrador",
        },
        {
          instruction: "Lee el spec. Cuando estés de acuerdo, cambia estado: borrador por estado: aprobado, comprueba y guarda.",
          command: "head -3 specs/003-sonidos-y-niveles.md && git commit -q -am \"spec 003 aprobado\" && git status --porcelain && git log --format=%s -1",
          expected: "---\nestado: aprobado\n---\nspec 003 aprobado",
        },
      ],
      verify: "El spec pasó de borrador a aprobado en dos commits y no quedan cambios sin guardar.",
    },
    {
      type: "exercise",
      title: "Ejercicio 4: /spec-impl 003, y qué hacer si se sale del plan",
      description: "Implementa por pasos, y corrige el rumbo si hace falta.",
      steps: [
        {
          instruction: "Limpia el contexto y lanza la implementación.",
          command: "claude\n/clear\n/spec-impl 003",
          expected: "Claude lee el spec, comprueba que está aprobado, ejecuta git status y crea la rama spec/003-sonidos-y-niveles. Te pregunta si empieza.",
        },
        {
          instruction: "Tras cada paso, mira el commit que acaba de hacer. Si ves que algo se sale del plan, por ejemplo los niveles dentro de game.js, párale.",
          command: "Los niveles tienen que ir en un archivo aparte, levels.js, y no dentro de game.js. Actualiza el spec con esa decisión y hazlo en este paso.",
          expected: "Claude actualiza el spec, crea levels.js con los niveles como datos y vuelve a hacer el paso.",
        },
        {
          instruction: "Comprueba la rama.",
          command: "git branch --show-current",
          expected: "spec/003-sonidos-y-niveles",
        },
      ],
      verify: "Estás en la rama del spec, y el spec y el código dicen lo mismo sobre dónde viven los niveles.",
    },
    {
      type: "exercise",
      title: "Ejercicio 5: el código de referencia",
      description: "Para seguir la lección al pie de la letra, usa el código de referencia.",
      steps: [
        {
          instruction: "Guarda levels.js.",
          file: {
            name: "levels.js",
            code: `// Niveles del juego. Cada nivel tiene 6 filas de 10 columnas.
// # es un bloque y . es un hueco.
const NIVELES = [
  {
    nombre: "Parrilla",
    filas: ["##########", "##########", "##########", "##########", "##########", "##########"],
  },
  {
    nombre: "Pirámide",
    filas: ["....##....", "...####...", "..######..", ".########.", "##########", "##########"],
  },
  {
    nombre: "Tablero",
    filas: ["#.#.#.#.#.", ".#.#.#.#.#", "#.#.#.#.#.", ".#.#.#.#.#", "#.#.#.#.#.", ".#.#.#.#.#"],
  },
  {
    nombre: "Franjas",
    filas: ["##########", "..........", "##########", "..........", "##########", ".........."],
  },
  {
    nombre: "Marco",
    filas: ["##########", "#........#", "#.######.#", "#.######.#", "#........#", "##########"],
  },
];

if (typeof module !== "undefined") {
  module.exports = { NIVELES };
}`,
          },
        },
        {
          instruction: "Guarda index.html.",
          file: {
            name: "index.html",
            code: `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Arkanoid</title>
  <style>
    body { margin: 0; background: #2b2b2b; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
    canvas { background: #000000; border: 2px solid #9a9a9a; }
  </style>
</head>
<body>
  <canvas id="lienzo" width="800" height="600"></canvas>
  <script src="levels.js"></script>
  <script src="logica.js"></script>
  <script src="game.js"></script>
</body>
</html>`,
          },
        },
        {
          instruction: "Guarda logica.js.",
          file: {
            name: "logica.js",
            code: `// Lógica pura del juego. No toca el DOM, así se puede probar con Node.
const LISTA_NIVELES = typeof module !== "undefined" ? require("./levels.js").NIVELES : NIVELES;
const CFG = {
  ancho: 800,
  alto: 600,
  vidas: 3,
  puntosPorBloque: 10,
  paleta: { w: 50, h: 14, y: 560, vel: 520 },
  bola: { r: 8, vel: 320 },
  bloques: { cols: 10, filas: 6, w: 72, h: 26, hueco: 6, arriba: 60 },
  explosion: { fotogramas: 4, duracionMs: 240 },
  nivel: { subidaVelocidad: 0.1 },
};

function limitar(valor, min, max) {
  return Math.max(min, Math.min(max, valor));
}

function bolaInicial(nivel) {
  const vel = CFG.bola.vel * Math.pow(1 + CFG.nivel.subidaVelocidad, nivel - 1);
  return {
    x: CFG.ancho / 2,
    y: CFG.paleta.y - CFG.bola.r - 1,
    vx: vel * 0.6,
    vy: -vel * 0.8,
  };
}

function crearBloques(nivel) {
  const c = CFG.bloques;
  const margen = (CFG.ancho - (c.cols * c.w + (c.cols - 1) * c.hueco)) / 2;
  const lista = [];
  const filas = LISTA_NIVELES[nivel - 1].filas;
  for (let fila = 0; fila < filas.length; fila++) {
    for (let col = 0; col < c.cols; col++) {
      if (filas[fila][col] !== "#") continue;
      lista.push({
        x: margen + col * (c.w + c.hueco),
        y: c.arriba + fila * (c.h + c.hueco),
        w: c.w,
        h: c.h,
        fila,
        vivo: true,
      });
    }
  }
  return lista;
}

function nuevoJuego() {
  return {
    fase: "jugando",
    vidas: CFG.vidas,
    puntos: 0,
    nivel: 1,
    paleta: { x: (CFG.ancho - CFG.paleta.w) / 2, y: CFG.paleta.y, w: CFG.paleta.w, h: CFG.paleta.h },
    bola: bolaInicial(1),
    bloques: crearBloques(1),
    explosiones: [],
    eventos: [],
  };
}

function cargarNivel(juego, nivel) {
  juego.nivel = nivel;
  juego.bloques = crearBloques(nivel);
  juego.bola = bolaInicial(nivel);
}

function irANivel(juego, nivel) {
  juego.explosiones = [];
  juego.fase = "jugando";
  cargarNivel(juego, nivel);
}

function alternarPausa(juego) {
  if (juego.fase === "jugando") juego.fase = "pausa";
  else if (juego.fase === "pausa") juego.fase = "jugando";
}

const BOTON = { w: 60, h: 60, hueco: 20, y: 300 };
function botonesNivel() {
  const n = LISTA_NIVELES.length;
  const total = n * BOTON.w + (n - 1) * BOTON.hueco;
  const x0 = (CFG.ancho - total) / 2;
  return LISTA_NIVELES.map((_, i) => ({ nivel: i + 1, x: x0 + i * (BOTON.w + BOTON.hueco), y: BOTON.y, w: BOTON.w, h: BOTON.h }));
}

function nivelEnPunto(x, y) {
  const boton = botonesNivel().find((b) => x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h);
  return boton ? boton.nivel : 0;
}

function moverPaleta(juego, dx) {
  juego.paleta.x = limitar(juego.paleta.x + dx, 0, CFG.ancho - juego.paleta.w);
}

function colocarPaleta(juego, xCentro) {
  juego.paleta.x = limitar(xCentro - juego.paleta.w / 2, 0, CFG.ancho - juego.paleta.w);
}

function bolaToca(bola, rect) {
  const cx = limitar(bola.x, rect.x, rect.x + rect.w);
  const cy = limitar(bola.y, rect.y, rect.y + rect.h);
  const dx = bola.x - cx;
  const dy = bola.y - cy;
  return dx * dx + dy * dy <= CFG.bola.r * CFG.bola.r;
}

function perderVida(juego) {
  juego.vidas -= 1;
  if (juego.vidas === 0) {
    juego.fase = "gameover";
  } else {
    juego.bola = bolaInicial(juego.nivel);
  }
}

function avanzarExplosiones(juego, dt) {
  for (const e of juego.explosiones) e.ms += dt * 1000;
  juego.explosiones = juego.explosiones.filter((e) => e.ms < CFG.explosion.duracionMs);
}

function fotograma(explosion) {
  const f = Math.floor((explosion.ms / CFG.explosion.duracionMs) * CFG.explosion.fotogramas);
  return Math.min(f, CFG.explosion.fotogramas - 1);
}

function paso(juego, dt) {
  if (juego.fase === "pausa") return;
  avanzarExplosiones(juego, dt);
  if (juego.fase !== "jugando") return;
  const b = juego.bola;
  const r = CFG.bola.r;
  let rebote = false;
  let bloqueRoto = false;
  b.x += b.vx * dt;
  b.y += b.vy * dt;
  if (b.x < r) {
    b.x = r;
    b.vx = Math.abs(b.vx);
    rebote = true;
  }
  if (b.x > CFG.ancho - r) {
    b.x = CFG.ancho - r;
    b.vx = -Math.abs(b.vx);
    rebote = true;
  }
  if (b.y < r) {
    b.y = r;
    b.vy = Math.abs(b.vy);
    rebote = true;
  }
  if (b.vy > 0 && bolaToca(b, juego.paleta)) {
    b.y = juego.paleta.y - r;
    b.vy = -Math.abs(b.vy);
    rebote = true;
  }
  for (const bloque of juego.bloques) {
    if (!bloque.vivo || !bolaToca(b, bloque)) continue;
    bloque.vivo = false;
    juego.explosiones.push({ x: bloque.x, y: bloque.y, w: bloque.w, h: bloque.h, fila: bloque.fila, ms: 0 });
    juego.puntos += CFG.puntosPorBloque;
    if (b.y < bloque.y || b.y > bloque.y + bloque.h) b.vy = -b.vy;
    else b.vx = -b.vx;
    bloqueRoto = true;
    break;
  }
  if (bloqueRoto) juego.eventos.push("bloque");
  else if (rebote) juego.eventos.push("rebote");
  if (juego.bloques.every((bloque) => !bloque.vivo)) {
    if (juego.nivel < LISTA_NIVELES.length) cargarNivel(juego, juego.nivel + 1);
    else juego.fase = "ganaste";
    return;
  }
  if (juego.fase === "jugando" && b.y - r > CFG.alto) perderVida(juego);
}

if (typeof module !== "undefined") {
  module.exports = {
    CFG,
    NIVELES: LISTA_NIVELES,
    nuevoJuego,
    moverPaleta,
    colocarPaleta,
    paso,
    bolaToca,
    crearBloques,
    perderVida,
    avanzarExplosiones,
    fotograma,
    bolaInicial,
    cargarNivel,
    alternarPausa,
    irANivel,
    botonesNivel,
    nivelEnPunto,
  };
}`,
          },
        },
        {
          instruction: "Guarda game.js.",
          file: {
            name: "game.js",
            code: `// Entrada y dibujo. La lógica está en logica.js.
const lienzo = document.getElementById("lienzo");
const ctx = lienzo.getContext("2d");
lienzo.width = CFG.ancho;
lienzo.height = CFG.alto;

let juego = nuevoJuego();
let ultimo = 0;
const teclas = {};
let audio = null;
const TITULOS = { gameover: "GAME OVER", ganaste: "¡GANASTE!", pausa: "PAUSA" };

function iniciarAudio() {
  if (!audio) audio = new (window.AudioContext || window.webkitAudioContext)();
  if (audio.state === "suspended") audio.resume();
}

function tono(frecuencia, duracion, tipo) {
  if (!audio) return;
  const oscilador = audio.createOscillator();
  const volumen = audio.createGain();
  oscilador.type = tipo;
  oscilador.frequency.value = frecuencia;
  volumen.gain.setValueAtTime(0.15, audio.currentTime);
  volumen.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + duracion);
  oscilador.connect(volumen);
  volumen.connect(audio.destination);
  oscilador.start();
  oscilador.stop(audio.currentTime + duracion);
}

const SONIDOS = {
  rebote: () => tono(220, 0.08, "square"),
  bloque: () => tono(660, 0.15, "triangle"),
};

addEventListener("keydown", (e) => {
  iniciarAudio();
  teclas[e.key] = true;
  if (e.key === "p" || e.key === "P" || e.key === "Escape") alternarPausa(juego);
  if (juego.fase === "pausa" && e.key >= "1" && e.key <= String(LISTA_NIVELES.length)) irANivel(juego, Number(e.key));
  if (e.key === "Enter" && (juego.fase === "gameover" || juego.fase === "ganaste")) juego = nuevoJuego();
});

addEventListener("keyup", (e) => {
  teclas[e.key] = false;
});

addEventListener("pointerdown", iniciarAudio);

lienzo.addEventListener("mousemove", (e) => {
  const caja = lienzo.getBoundingClientRect();
  colocarPaleta(juego, ((e.clientX - caja.left) * CFG.ancho) / caja.width);
});

lienzo.addEventListener("pointerdown", (e) => {
  if (juego.fase !== "pausa") return;
  const caja = lienzo.getBoundingClientRect();
  const x = ((e.clientX - caja.left) * CFG.ancho) / caja.width;
  const y = ((e.clientY - caja.top) * CFG.alto) / caja.height;
  const nivel = nivelEnPunto(x, y);
  if (nivel) irANivel(juego, nivel);
});

function dibujar() {
  ctx.clearRect(0, 0, CFG.ancho, CFG.alto);
  const colores = ["#ef476f", "#f78c6b", "#ffd166", "#06d6a0", "#118ab2", "#9b5de5"];
  for (const bloque of juego.bloques) {
    if (!bloque.vivo) continue;
    ctx.fillStyle = colores[bloque.fila];
    ctx.fillRect(bloque.x, bloque.y, bloque.w, bloque.h);
  }
  for (const e of juego.explosiones) {
    const f = fotograma(e);
    const crece = 1 + 0.15 * (f + 1);
    ctx.globalAlpha = 1 - 0.22 * (f + 1);
    ctx.fillStyle = colores[e.fila];
    ctx.fillRect(e.x - (e.w * (crece - 1)) / 2, e.y - (e.h * (crece - 1)) / 2, e.w * crece, e.h * crece);
  }
  ctx.globalAlpha = 1;
  const p = juego.paleta;
  ctx.fillStyle = "#e8e8e8";
  ctx.fillRect(p.x, p.y, p.w, p.h);
  ctx.fillStyle = "#ffd166";
  ctx.beginPath();
  ctx.arc(juego.bola.x, juego.bola.y, CFG.bola.r, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.font = "16px sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("Puntos: " + juego.puntos, 12, 24);
  ctx.textAlign = "center";
  ctx.fillText("Nivel " + juego.nivel, CFG.ancho / 2, 24);
  ctx.fillStyle = "#ffd166";
  for (let i = 0; i < juego.vidas; i++) {
    ctx.beginPath();
    ctx.arc(CFG.ancho - 20 - i * 24, 18, CFG.bola.r - 1, 0, Math.PI * 2);
    ctx.fill();
  }
  if (juego.fase !== "jugando") {
    ctx.fillStyle = "rgba(0, 0, 0, 0.65)";
    ctx.fillRect(0, 0, CFG.ancho, CFG.alto);
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.font = "48px sans-serif";
    ctx.fillText(TITULOS[juego.fase], CFG.ancho / 2, juego.fase === "pausa" ? 230 : CFG.alto / 2);
    ctx.font = "18px sans-serif";
    if (juego.fase !== "pausa") ctx.fillText("Pulsa Enter para jugar otra vez", CFG.ancho / 2, CFG.alto / 2 + 40);
    else ctx.fillText("Elige un nivel o pulsa P para seguir", CFG.ancho / 2, 270);
    if (juego.fase === "pausa") {
      ctx.font = "28px sans-serif";
      for (const boton of botonesNivel()) {
        ctx.strokeStyle = boton.nivel === juego.nivel ? "#ffd166" : "#ffffff";
        ctx.lineWidth = 2;
        ctx.strokeRect(boton.x, boton.y, boton.w, boton.h);
        ctx.fillText(String(boton.nivel), boton.x + boton.w / 2, boton.y + boton.h / 2 + 10);
      }
    }
  }
}

function bucle(t) {
  const dt = Math.min((t - ultimo) / 1000, 0.05);
  ultimo = t;
  if (teclas.ArrowLeft) moverPaleta(juego, -CFG.paleta.vel * dt);
  if (teclas.ArrowRight) moverPaleta(juego, CFG.paleta.vel * dt);
  paso(juego, dt);
  for (const evento of juego.eventos) SONIDOS[evento]();
  juego.eventos.length = 0;
  dibujar();
  requestAnimationFrame(bucle);
}

requestAnimationFrame(bucle);`,
          },
        },
        {
          instruction: "Guarda los tres scripts de criterios. Los dos primeros son los de los specs anteriores, ya actualizados.",
          file: {
            name: "scripts/probar-criterios.js",
            code: `// Comprueba los criterios del spec 001 que se pueden verificar sin navegador.
const fs = require("fs");
const { execFileSync } = require("child_process");
const { CFG, NIVELES, nuevoJuego, cargarNivel, moverPaleta, colocarPaleta, paso } = require("../logica.js");

let fallos = 0;
function criterio(nombre, cumple) {
  if (!cumple) fallos++;
  console.log((cumple ? "OK    " : "FALLA ") + nombre);
}

const html = fs.readFileSync("index.html", "utf8");
criterio("El lienzo mide 800 por 600 píxeles", /<canvas[^>]*width="800"[^>]*height="600"/.test(html));

let j = nuevoJuego();
criterio("Al empezar hay 60 bloques, 3 vidas y 0 puntos", j.bloques.length === 60 && j.vidas === 3 && j.puntos === 0);

moverPaleta(j, -5000);
const izquierda = j.paleta.x;
moverPaleta(j, 5000);
const derecha = j.paleta.x + j.paleta.w;
colocarPaleta(j, -300);
const conRaton = j.paleta.x;
criterio("La paleta nunca sale del lienzo", izquierda === 0 && derecha === CFG.ancho && conRaton === 0);

j = nuevoJuego();
const bloque = j.bloques[0];
j.bola.x = bloque.x + bloque.w / 2;
j.bola.y = bloque.y + bloque.h + CFG.bola.r - 1;
j.bola.vx = 0;
j.bola.vy = -100;
paso(j, 0.001);
criterio("Romper un bloque suma 10 puntos y lo hace desaparecer", j.puntos === 10 && bloque.vivo === false);

j = nuevoJuego();
j.bola.x = 400;
j.bola.y = CFG.alto + 50;
j.bola.vx = 0;
j.bola.vy = 100;
paso(j, 0.01);
criterio("Si la pelota cae, se pierde una vida y vuelve a empezar", j.vidas === 2 && j.bola.y < CFG.paleta.y);

j = nuevoJuego();
j.vidas = 1;
j.bola.y = CFG.alto + 50;
j.bola.vy = 100;
paso(j, 0.01);
const antes = j.bola.x + "," + j.bola.y;
paso(j, 0.5);
criterio("Con 0 vidas la fase es gameover y la pelota deja de moverse", j.fase === "gameover" && antes === j.bola.x + "," + j.bola.y);

j = nuevoJuego();
cargarNivel(j, NIVELES.length);
j.bloques.forEach((b) => (b.vivo = false));
paso(j, 0.001);
criterio("Con 0 bloques en el último nivel la fase es ganaste", j.fase === "ganaste");

let sintaxis = true;
try {
  execFileSync("node", ["--check", "logica.js"]);
  execFileSync("node", ["--check", "game.js"]);
} catch (e) {
  sintaxis = false;
}
criterio("node --check no da errores en logica.js ni en game.js", sintaxis);

const codigo = fs.readFileSync("logica.js", "utf8") + fs.readFileSync("game.js", "utf8");
criterio("El código no carga archivos de audio ni de imagen", !/new Audio\\(|new Image\\(|\\.(png|jpe?g|gif|mp3|wav|ogg)\\b/i.test(codigo));

console.log(fallos === 0 ? "RESULTADO: todos los criterios se cumplen" : "RESULTADO: " + fallos + " criterio(s) fallan");
process.exit(fallos === 0 ? 0 : 1);`,
          },
        },
        {
          instruction: "Guarda el script del spec 002, actualizado.",
          file: {
            name: "scripts/probar-explosiones.js",
            code: `// Comprueba los criterios del spec 002 que se pueden verificar sin navegador.
const fs = require("fs");
const { execFileSync } = require("child_process");
const { CFG, NIVELES, nuevoJuego, cargarNivel, paso, avanzarExplosiones, fotograma } = require("../logica.js");

let fallos = 0;
function criterio(nombre, cumple) {
  if (!cumple) fallos++;
  console.log((cumple ? "OK    " : "FALLA ") + nombre);
}

// Coloca la pelota justo debajo de un bloque, subiendo, y da un paso: lo rompe.
function romper(juego, bloque) {
  juego.bola.x = bloque.x + bloque.w / 2;
  juego.bola.y = bloque.y + bloque.h + CFG.bola.r - 1;
  juego.bola.vx = 0;
  juego.bola.vy = -100;
  paso(juego, 0.001);
}

// Igual, pero la pelota baja desde arriba: así no toca el bloque de la fila de debajo.
function tocarDesdeArriba(juego, bloque) {
  juego.bola.x = bloque.x + bloque.w / 2;
  juego.bola.y = bloque.y - CFG.bola.r + 1;
  juego.bola.vx = 0;
  juego.bola.vy = 100;
  paso(juego, 0.001);
}

let j = nuevoJuego();
let bloque = j.bloques[0];
romper(j, bloque);
const e = j.explosiones[0];
criterio("Al romper un bloque aparece una explosión en su posición", j.explosiones.length === 1 && e.x === bloque.x && e.y === bloque.y);

const marcas = [0, 59, 60, 119, 120, 179, 180, 239].map((ms) => fotograma({ ms }));
criterio(
  "La explosión tiene 4 fotogramas de 60 ms cada uno",
  CFG.explosion.fotogramas === 4 && CFG.explosion.duracionMs / CFG.explosion.fotogramas === 60 && marcas.join(",") === "0,0,1,1,2,2,3,3"
);

j = nuevoJuego();
romper(j, j.bloques[0]);
avanzarExplosiones(j, 0.2399);
const antes = j.explosiones.length;
avanzarExplosiones(j, 0.0003);
criterio("La explosión se elimina a los 240 ms", antes === 1 && j.explosiones.length === 0);

j = nuevoJuego();
bloque = j.bloques[0];
tocarDesdeArriba(j, bloque);
tocarDesdeArriba(j, bloque);
criterio("El bloque deja de existir para las colisiones desde el primer instante", bloque.vivo === false && j.puntos === 10);

j = nuevoJuego();
romper(j, j.bloques[0]);
romper(j, j.bloques[1]);
criterio("Si se rompen dos bloques seguidos, hay dos explosiones a la vez", j.explosiones.length === 2);

j = nuevoJuego();
cargarNivel(j, NIVELES.length);
j.bloques.slice(1).forEach((b) => (b.vivo = false));
romper(j, j.bloques[0]);
const alGanar = j.fase === "ganaste" && j.explosiones.length === 1;
paso(j, 0.3);
criterio("La última explosión termina aunque la fase ya sea ganaste", alGanar && j.explosiones.length === 0);

let previos = true;
try {
  execFileSync("node", ["scripts/probar-criterios.js"], { stdio: "pipe" });
} catch (err) {
  previos = false;
}
criterio("Los criterios del spec 001 siguen cumpliéndose", previos);

const codigo = fs.readFileSync("logica.js", "utf8") + fs.readFileSync("game.js", "utf8");
criterio("El código no carga archivos de audio ni de imagen", !/new Audio\\(|new Image\\(|\\.(png|jpe?g|gif|mp3|wav|ogg)\\b/i.test(codigo));

console.log("Pendiente de mirar en el navegador: la explosión usa el color del bloque roto.");
console.log(fallos === 0 ? "RESULTADO: todos los criterios automáticos se cumplen" : "RESULTADO: " + fallos + " criterio(s) fallan");
process.exit(fallos === 0 ? 0 : 1);`,
          },
        },
        {
          instruction: "Guarda el script nuevo.",
          file: {
            name: "scripts/probar-niveles.js",
            code: `// Comprueba los criterios del spec 003 que se pueden verificar sin navegador.
const fs = require("fs");
const { execFileSync } = require("child_process");
const {
  CFG, NIVELES, nuevoJuego, crearBloques, bolaInicial, cargarNivel, irANivel,
  alternarPausa, nivelEnPunto, botonesNivel, paso,
} = require("../logica.js");

let fallos = 0;
function criterio(nombre, cumple) {
  if (!cumple) fallos++;
  console.log((cumple ? "OK    " : "FALLA ") + nombre);
}

// Rompe un bloque con la pelota, que baja desde arriba y no toca otros.
function tocarDesdeArriba(juego, bloque) {
  juego.bola.x = bloque.x + bloque.w / 2;
  juego.bola.y = bloque.y - CFG.bola.r + 1;
  juego.bola.vx = 0;
  juego.bola.vy = 100;
  paso(juego, 0.001);
}

let dentro = NIVELES.length === 5;
for (let n = 1; n <= NIVELES.length; n++) {
  const bloques = crearBloques(n);
  dentro = dentro && bloques.length >= 20 && bloques.every((b) => b.x >= 0 && b.x + b.w <= CFG.ancho);
}
criterio("Hay cinco niveles, y cada uno tiene al menos 20 bloques dentro del lienzo", dentro);

criterio("El nivel 1 es la parrilla de 60 bloques", crearBloques(1).length === 60);

let velocidades = true;
for (let n = 2; n <= NIVELES.length; n++) {
  const antes = Math.hypot(bolaInicial(n - 1).vx, bolaInicial(n - 1).vy);
  const ahora = Math.hypot(bolaInicial(n).vx, bolaInicial(n).vy);
  velocidades = velocidades && Math.abs(ahora / antes - 1.1) < 1e-9;
}
criterio("La pelota de cada nivel es un 10 % más veloz que la del anterior", velocidades);

let j = nuevoJuego();
j.puntos = 120;
j.vidas = 2;
j.bloques.slice(1).forEach((b) => (b.vivo = false));
tocarDesdeArriba(j, j.bloques[0]);
criterio(
  "Al romper el último bloque de un nivel que no es el 5, se pasa al siguiente con los mismos puntos y vidas",
  j.nivel === 2 && j.puntos === 130 && j.vidas === 2 && j.bloques.length === crearBloques(2).length && j.fase === "jugando"
);

j = nuevoJuego();
cargarNivel(j, 5);
j.bloques.slice(1).forEach((b) => (b.vivo = false));
tocarDesdeArriba(j, j.bloques[0]);
criterio("Al romper el último bloque del nivel 5, la fase es ganaste", j.fase === "ganaste" && j.nivel === 5);

j = nuevoJuego();
alternarPausa(j);
const enPausa = j.fase === "pausa";
const antes = j.bola.x + "," + j.bola.y;
paso(j, 0.5);
const quieta = antes === j.bola.x + "," + j.bola.y;
alternarPausa(j);
const teclasEnJuego = fs.readFileSync("game.js", "utf8");
criterio(
  "Con la fase pausa nada se mueve, y alternarla vuelve a jugando",
  enPausa && quieta && j.fase === "jugando" && /"Escape"/.test(teclasEnJuego) && /"p"/.test(teclasEnJuego)
);

const botones = botonesNivel();
const centrosBien = botones.every((b) => nivelEnPunto(b.x + b.w / 2, b.y + b.h / 2) === b.nivel);
const fuera = nivelEnPunto(5, 5) === 0;
j = nuevoJuego();
alternarPausa(j);
irANivel(j, 3);
criterio("El clic en un botón numerado, o su tecla, lleva a ese nivel", botones.length === 5 && centrosBien && fuera && j.nivel === 3 && j.fase === "jugando");

j = nuevoJuego();
j.bola.x = CFG.bola.r - 1;
j.bola.y = 300;
j.bola.vx = -100;
j.bola.vy = 0;
paso(j, 0.001);
const pared = j.eventos.join(",");
j = nuevoJuego();
j.bola.x = 400;
j.bola.y = j.paleta.y - 2;
j.bola.vx = 0;
j.bola.vy = 100;
paso(j, 0.001);
const paleta = j.eventos.join(",");
criterio("El rebote en una pared, el techo o la paleta anota un evento rebote", pared === "rebote" && paleta === "rebote");

j = nuevoJuego();
const primero = j.bloques[0];
primero.x = 0; // el bloque pegado a la pared, para que el paso toque las dos cosas
primero.y = 100;
j.bola.x = CFG.bola.r - 1;
j.bola.y = primero.y - CFG.bola.r + 1;
j.bola.vx = -10;
j.bola.vy = 100;
paso(j, 0.001);
criterio("Al romper un bloque se anota solo el evento bloque, aunque ese paso toque también una pared", j.eventos.join(",") === "bloque" && primero.vivo === false);

j = nuevoJuego();
tocarDesdeArriba(j, j.bloques[0]);
tocarDesdeArriba(j, j.bloques[3]);
criterio("Dos bloques rotos seguidos anotan dos eventos bloque", j.eventos.join(",") === "bloque,bloque");

const codigo = ["logica.js", "game.js", "levels.js"].map((f) => fs.readFileSync(f, "utf8")).join("\\n");
criterio("El código no carga archivos de audio ni de imagen", !/new Audio\\(|new Image\\(|\\.(png|jpe?g|gif|mp3|wav|ogg)\\b/i.test(codigo));

let previos = true;
try {
  execFileSync("node", ["scripts/probar-criterios.js"], { stdio: "pipe" });
  execFileSync("node", ["scripts/probar-explosiones.js"], { stdio: "pipe" });
} catch (err) {
  previos = false;
}
criterio("Los criterios de los specs 001 y 002 siguen cumpliéndose", previos);

console.log("Pendiente de oír en el navegador: se oyen los dos sonidos y, al romper un bloque, no se oye el rebote.");
console.log(fallos === 0 ? "RESULTADO: todos los criterios automáticos se cumplen" : "RESULTADO: " + fallos + " criterio(s) fallan");
process.exit(fallos === 0 ? 0 : 1);`,
          },
        },
        {
          instruction: "Comprueba la sintaxis y guarda.",
          command: "node --check logica.js && node --check game.js && node --check levels.js && git add -A && git commit -q -m \"código de referencia de sonidos y niveles\" && git status --porcelain && echo limpio",
          expected: "limpio",
        },
      ],
      verify: "Los tres scripts de criterios están en scripts/ y no quedan cambios sin guardar.",
    },
    {
      type: "exercise",
      title: "Ejercicio 6: los criterios viejos contra el código nuevo",
      description: "Mira qué falla si no actualizas los scripts de los specs anteriores.",
      steps: [
        {
          instruction: "Recupera el script antiguo de main, antes del spec 003, y pásalo contra el código nuevo. Mira solo lo que falla.",
          command: "git show main:scripts/probar-criterios.js > scripts/antiguo.js && node scripts/antiguo.js | grep -v '^OK'; rm scripts/antiguo.js",
          expected: "FALLA Con 0 bloques la fase es ganaste\nRESULTADO: 1 criterio(s) fallan",
        },
        {
          instruction: "Ahora el script actualizado, que sí cuenta con los niveles.",
          command: "node scripts/probar-criterios.js | tail -1",
          expected: "RESULTADO: todos los criterios se cumplen",
        },
      ],
      verify: "El script antiguo falla porque al romper todos los bloques del nivel 1 el juego pasa al nivel 2. Es una regresión que avisa de que una decisión del spec 001 ya no es cierta.",
    },
    {
      type: "exercise",
      title: "Ejercicio 7: los tres scripts, y oír el juego",
      description: "La regresión completa y la comprobación manual.",
      steps: [
        {
          instruction: "Ejecuta el script del spec 003.",
          command: "node scripts/probar-niveles.js",
          expected: "OK    Hay cinco niveles, y cada uno tiene al menos 20 bloques dentro del lienzo\nOK    El nivel 1 es la parrilla de 60 bloques\nOK    La pelota de cada nivel es un 10 % más veloz que la del anterior\nOK    Al romper el último bloque de un nivel que no es el 5, se pasa al siguiente con los mismos puntos y vidas\nOK    Al romper el último bloque del nivel 5, la fase es ganaste\nOK    Con la fase pausa nada se mueve, y alternarla vuelve a jugando\nOK    El clic en un botón numerado, o su tecla, lleva a ese nivel\nOK    El rebote en una pared, el techo o la paleta anota un evento rebote\nOK    Al romper un bloque se anota solo el evento bloque, aunque ese paso toque también una pared\nOK    Dos bloques rotos seguidos anotan dos eventos bloque\nOK    El código no carga archivos de audio ni de imagen\nOK    Los criterios de los specs 001 y 002 siguen cumpliéndose\nPendiente de oír en el navegador: se oyen los dos sonidos y, al romper un bloque, no se oye el rebote.\nRESULTADO: todos los criterios automáticos se cumplen",
        },
        {
          instruction: "Abre el juego, pulsa una tecla o haz un clic, y juega. Comprueba a oído que el rebote suena en las paredes y en la paleta, que al romper un bloque solo suena el del bloque, que P pausa, que el selector cambia de nivel y que el nivel 5 termina en ¡GANASTE!.",
          command: "open index.html",
          expected: "Se oyen dos sonidos distintos, uno grave de rebote y uno más agudo al romper un bloque. En pausa se ven los botones del 1 al 5.",
        },
      ],
      verify: "Los criterios automáticos están en OK. Cuando lo hayas oído, marca el último criterio del spec con [x].",
    },
    {
      type: "exercise",
      title: "Ejercicio 8: integrar el spec 003",
      description: "Estado implementado, merge y borrado de la rama.",
      steps: [
        {
          instruction: "Si spec-impl no lo hizo, cambia el estado a implementado. Guarda lo que quede y pasa a main.",
          command: "git add -A && git commit -q -m \"spec 003 implementado\"; git switch main",
          expected: "Switched to branch 'main'",
        },
        {
          instruction: "Integra la rama.",
          command: "git merge --no-ff spec/003-sonidos-y-niveles -m \"merge: spec 003 sonidos y niveles\"",
          expected: "Merge made by the 'ort' strategy.\n game.js                           |  60 ++++-\n index.html                        |   1 +\n levels.js                         |  28 +++\n logica.js                         |  76 +++++-\n scripts/probar-criterios.js       |   7 +-\n scripts/probar-explosiones.js     |   5 +-\n scripts/probar-niveles.js         | 124 ++++++++++\n specs/001-mvp-arkanoid.md         |   6 +-\n ...animacion-explosion-bloques.md |   3 +-\n specs/003-sonidos-y-niveles.md    |   2 +-\n 10 files changed, 291 insertions(+), 21 deletions(-)\n create mode 100644 levels.js\n create mode 100644 scripts/probar-niveles.js",
        },
        {
          instruction: "Borra la rama y comprueba que solo queda main.",
          command: "git branch -d spec/003-sonidos-y-niveles > /dev/null && git branch",
          expected: "* main",
        },
      ],
      verify: "main tiene los niveles y los sonidos. Las cifras y el ancho de las barras del merge pueden variar en tu proyecto y en tu terminal.",
    },
    {
      type: "exercise",
      title: "Ejercicio 9: un prompt rápido en una rama",
      description: "La paleta a la mitad y los bloques un poco más grandes.",
      steps: [
        {
          instruction: "Crea la rama antes de pedir nada.",
          command: "git switch -c ajustes-visuales",
          expected: "Switched to a new branch 'ajustes-visuales'",
        },
        {
          instruction: "Limpia el contexto y pide el cambio. Si quieres, adjunta una captura del juego.",
          command: "claude\n/clear\nLa paleta tiene que medir la mitad de lo que mide ahora y los bloques tienen que ser un poco más grandes.",
          expected: "Claude cambia el tamaño de la paleta y de los bloques en logica.js.",
        },
        {
          instruction: "Revisa el diff.",
          command: "git diff --stat",
          expected: " logica.js | 4 ++--\n 1 file changed, 2 insertions(+), 2 deletions(-)",
        },
        {
          instruction: "Pasa la regresión completa y mira solo la última línea de cada script.",
          command: "for f in probar-criterios probar-explosiones probar-niveles; do node scripts/$f.js | tail -1; done",
          expected: "RESULTADO: todos los criterios se cumplen\nRESULTADO: todos los criterios automáticos se cumplen\nRESULTADO: todos los criterios automáticos se cumplen",
        },
        {
          instruction: "Guarda, integra y borra la rama.",
          command: "git commit -q -am \"ajuste: paleta a la mitad y bloques un poco más grandes\" && git switch -q main && git merge --no-ff ajustes-visuales -m \"merge: ajustes visuales\" && git branch -d ajustes-visuales > /dev/null && git branch",
          expected: "Merge made by the 'ort' strategy.\n logica.js | 4 ++--\n 1 file changed, 2 insertions(+), 2 deletions(-)\n* main",
        },
      ],
      verify: "Los tres scripts pasaron sin tocarlos, porque los criterios usan los datos de CFG y no cifras fijas. Si el resultado no te gusta, borra la rama con git branch -D antes de integrarla.",
    },
    {
      type: "exercise",
      title: "Ejercicio 10: CLAUDE.md y README al día",
      description: "Pídele a Claude que los actualice, y revisa el diff.",
      steps: [
        {
          instruction: "Limpia el contexto y pide la actualización a partir de la estructura y del flujo del proyecto.",
          command: "claude\n/clear\nActualiza el CLAUDE.md según la estructura y el flujo de trabajo del proyecto, con specs. Después, actualiza el README.md con la información actual: cómo jugar, las reglas y cómo probarlo.",
          expected: "Claude lee el código y los specs y propone cambios en los dos archivos. Léelos antes de aceptar.",
        },
        {
          instruction: "Si prefieres el de referencia, guarda CLAUDE.md.",
          file: {
            name: "CLAUDE.md",
            code: `# Arkanoid

Juego de Arkanoid en HTML, CSS y JavaScript sin dependencias. Se juega abriendo index.html en el navegador.

## Estructura
- logica.js: las reglas del juego. No toca el DOM y se prueba con Node.
- levels.js: los cinco niveles, como datos.
- game.js: dibujo, sonidos y entradas.
- scripts/: validar-spec.js y un script probar-*.js por cada spec.

## Cómo trabajamos
- Los cambios con decisiones se hacen con specs en specs/: /spec para escribirlos y /spec-impl para implementarlos.
- Un spec pasa de borrador a aprobado, que cambia una persona, y a implementado. El estado está en la cabecera de cada archivo.
- Antes de dar un cambio por bueno, ejecuta los tres scripts: probar-criterios.js, probar-explosiones.js y probar-niveles.js.
- Los ajustes visuales pequeños se piden con un prompt directo, en una rama.

## Reglas
- Responde siempre en español.
- No uses archivos de audio ni de imagen: los sonidos se generan con código.`,
          },
        },
        {
          instruction: "Guarda README.md.",
          file: {
            name: "README.md",
            code: `# Arkanoid

Un Arkanoid hecho con HTML, CSS y JavaScript, sin dependencias ni compilación. Una pelota rebota en una paleta y rompe bloques a lo largo de cinco niveles.

## Cómo jugar
Abre index.html en el navegador.
- Ratón o flechas: mover la paleta.
- P o Escape: pausa. En la pausa se elige un nivel con el ratón o con las teclas del 1 al 5.
- Enter: otra partida, tras GAME OVER o ¡GANASTE!.

## Reglas
- Tres vidas. Cada bloque da 10 puntos.
- Cada nivel sube un 10 % la velocidad de la pelota.
- La pelota suena al rebotar, y al romper un bloque suena otro sonido.

## Desarrollo
Las reglas están en logica.js y se prueban con Node:

    node scripts/probar-criterios.js
    node scripts/probar-explosiones.js
    node scripts/probar-niveles.js

Los cambios se describen en specs/ con /spec y se implementan con /spec-impl.

## Specs
- 001 MVP jugable: implementado.
- 002 Animación de explosión: implementado.
- 003 Sonidos y cinco niveles con pausa: implementado.`,
          },
        },
        {
          instruction: "Comprueba el tamaño de CLAUDE.md y guarda.",
          command: "wc -l CLAUDE.md && git add -A && git commit -q -m \"docs: CLAUDE.md y README al día\" && git status --porcelain && git log --format=%s -1",
          expected: "      19 CLAUDE.md\ndocs: CLAUDE.md y README al día",
        },
      ],
      verify: "CLAUDE.md es corto y habla de estructura, flujo y reglas. El README explica cómo jugar sin mencionar que está sin implementar.",
    },
    {
      type: "playground",
      title: "Experimento 11: los cinco niveles y su velocidad",
      description: "Cuenta los bloques de cada nivel y calcula la velocidad con un aumento del 10 %. Cambia los dibujos, la velocidad base o el porcentaje.",
      code: `const NIVELES = [
  { nombre: "Parrilla", filas: ["##########", "##########", "##########", "##########", "##########", "##########"] },
  { nombre: "Pirámide", filas: ["....##....", "...####...", "..######..", ".########.", "##########", "##########"] },
  { nombre: "Tablero", filas: ["#.#.#.#.#.", ".#.#.#.#.#", "#.#.#.#.#.", ".#.#.#.#.#", "#.#.#.#.#.", ".#.#.#.#.#"] },
  { nombre: "Franjas", filas: ["##########", "..........", "##########", "..........", "##########", ".........."] },
  { nombre: "Marco", filas: ["##########", "#........#", "#.######.#", "#.######.#", "#........#", "##########"] },
];
const BASE = 320;
const SUBIDA = 0.1;
NIVELES.forEach((nivel, i) => {
  const bloques = nivel.filas.join("").split("#").length - 1;
  const velocidad = BASE * Math.pow(1 + SUBIDA, i);
  console.log("Nivel " + (i + 1) + " " + nivel.nombre + ": " + bloques + " bloques, " + Math.round(velocidad) + " px/s");
});`,
      expected: "Nivel 1 Parrilla: 60 bloques, 320 px/s\nNivel 2 Pirámide: 40 bloques, 352 px/s\nNivel 3 Tablero: 30 bloques, 387 px/s\nNivel 4 Franjas: 30 bloques, 426 px/s\nNivel 5 Marco: 40 bloques, 469 px/s",
    },
    {
      type: "playground",
      title: "Experimento 12: qué sonido se anota",
      description: "La decisión al final de cada paso: el bloque gana al rebote. Prueba las cuatro combinaciones y cambia la prioridad.",
      code: `function anotar(rebote, bloqueRoto) {
  if (bloqueRoto) return "bloque";
  if (rebote) return "rebote";
  return "ninguno";
}
const casos = [
  [false, false, "la pelota vuela libre"],
  [true, false, "toca una pared o la paleta"],
  [false, true, "rompe un bloque"],
  [true, true, "toca la pared y rompe un bloque"],
];
casos.forEach(([rebote, bloque, texto]) => {
  console.log(texto + " -> " + anotar(rebote, bloque));
});`,
      expected: "la pelota vuela libre -> ninguno\ntoca una pared o la paleta -> rebote\nrompe un bloque -> bloque\ntoca la pared y rompe un bloque -> bloque",
    },
    {
      type: "playground",
      title: "Experimento 13: los botones del selector",
      description: "Posición de cada botón y qué nivel hay en un punto. Cambia el hueco entre botones o añade un sexto nivel y mira cómo se recolocan.",
      code: `const ANCHO = 800;
const BOTON = { w: 60, h: 60, hueco: 20, y: 300 };
function botones(n) {
  const total = n * BOTON.w + (n - 1) * BOTON.hueco;
  const x0 = (ANCHO - total) / 2;
  return Array.from({ length: n }, (_, i) => ({ nivel: i + 1, x: x0 + i * (BOTON.w + BOTON.hueco) }));
}
function nivelEnPunto(x, y, lista) {
  const b = lista.find((b) => x >= b.x && x <= b.x + BOTON.w && y >= BOTON.y && y <= BOTON.y + BOTON.h);
  return b ? b.nivel : 0;
}
const lista = botones(5);
lista.forEach((b) => console.log("Botón " + b.nivel + ": de x=" + b.x + " a x=" + (b.x + BOTON.w)));
[[400, 330], [215, 310], [292, 330], [100, 100], [400, 380]].forEach(([x, y]) => {
  console.log("clic en (" + x + ", " + y + ") -> " + (nivelEnPunto(x, y, lista) || "ningún nivel"));
});`,
      expected: "Botón 1: de x=210 a x=270\nBotón 2: de x=290 a x=350\nBotón 3: de x=370 a x=430\nBotón 4: de x=450 a x=510\nBotón 5: de x=530 a x=590\nclic en (400, 330) -> 3\nclic en (215, 310) -> 1\nclic en (292, 330) -> 2\nclic en (100, 100) -> ningún nivel\nclic en (400, 380) -> ningún nivel",
    },
    {
      type: "playground",
      title: "Experimento 14: diseña tu propio nivel",
      description: "Una pequeña función revisa si un diseño es válido: 10 columnas y al menos 20 bloques. Escribe tu nivel y mira qué dice.",
      code: `const ANCHO = 800;
const ANCHO_BLOQUE = 70;
const HUECO = 6;
const COLUMNAS = 10;
function revisar(nombre, filas) {
  const problemas = [];
  const bloques = filas.join("").split("#").length - 1;
  if (bloques < 20) problemas.push("solo " + bloques + " bloques, hacen falta 20");
  if (filas.some((f) => f.length !== COLUMNAS)) problemas.push("una fila no tiene " + COLUMNAS + " columnas");
  const ancho = COLUMNAS * ANCHO_BLOQUE + (COLUMNAS - 1) * HUECO;
  if (ancho > ANCHO) problemas.push("no cabe en el lienzo");
  return nombre + ": " + (problemas.length ? problemas.join("; ") : "válido, " + bloques + " bloques");
}
console.log(revisar("Diamante", ["....##....", "...####...", "..######..", "..######..", "...####...", "....##...."]));
console.log(revisar("Pocos", ["#.........", "..........", "..#.......", "..........", "....#.....", ".........."]));
console.log(revisar("Ancho", ["############", "############", "############"]));`,
      expected: "Diamante: válido, 24 bloques\nPocos: solo 3 bloques, hacen falta 20\nAncho: una fila no tiene 10 columnas",
    },
    { type: "heading", level: 2, text: "¿Qué usar en cada caso?" },
    {
      type: "table",
      headers: ["Si necesitas...", "Usa...", "Nota"],
      rows: [
        ["Una tarea con varias partes", "Un spec combinado, o varios separados", "Separados cuando una parte es trivial y la otra no."],
        ["Sonido sin archivos", "La API Web Audio, con un oscilador por sonido", "Los sonidos se solapan sin pisarse."],
        ["Que suene solo el bloque", "Una decisión al final del paso", "El bloque gana al rebote."],
        ["Probar un sonido sin altavoces", "Anotar eventos en la lógica", "Y sustituir tono en la consola para ver las frecuencias."],
        ["Que Claude no se salga del plan", "Pararlo, actualizar el spec y seguir", "El spec y el código deben decir lo mismo."],
        ["Un spec nuevo que contradice uno viejo", "Actualizar el criterio, el script y una línea de decisiones", "En el mismo paso que cambia el código."],
        ["Un ajuste visual con cifras", "Un prompt rápido en una rama", "Con la regresión como red de seguridad."],
        ["Un archivo grande que Claude consulta a veces", "La ruta en texto normal", "Con @ se carga siempre en el contexto."],
        ["Que Claude conozca la estructura del proyecto", "Un CLAUDE.md corto y al día", "Menos de unas 200 líneas."],
      ],
    },
    { type: "heading", level: 2, text: "Datos que suelen aparecer desactualizados" },
    {
      type: "table",
      headers: ["Suele decirse", "Información verificada (noviembre 2026)"],
      rows: [
        ["Hace falta un archivo de audio por sonido.", "No. La API Web Audio genera tonos con código, sin recursos, y cada sonido crea su propio oscilador."],
        ["Para solapar sonidos hay que clonar el elemento de audio.", "Es cierto con un elemento de audio de un archivo. Con Web Audio, cada tono es un nodo nuevo."],
        ["El audio suena en cuanto se carga la página.", "Los navegadores lo bloquean hasta un gesto de la persona, como un clic o una tecla. Mover el ratón no cuenta."],
        ["Una referencia a un archivo desde CLAUDE.md nunca lo carga.", "Si es una ruta en texto, se lee cuando hace falta. Si es @ruta fuera de un bloque de código, se importa y se carga al empezar."],
        ["CLAUDE.md puede crecer sin límite.", "Conviene que tenga menos de unas 200 líneas: los archivos largos consumen contexto y se siguen peor."],
        ["Los specs antiguos no se tocan.", "Se actualizan cuando una decisión nueva los contradice, y se deja una línea que lo explique."],
        ["Si el script pasa, el criterio es cierto.", "Puede pasar por casualidad. El texto del criterio y lo que comprueba el script deben coincidir."],
        ["git checkout -b es la forma de crear una rama.", "Funciona, pero git switch -c hace lo mismo con un nombre más claro, y git switch cambia de rama."],
        ["Todo cambio estético necesita un spec.", "No. Con cifras concretas basta un prompt rápido en una rama, con la regresión pasada."],
        ["Se implementan sonidos y niveles en dos specs siempre.", "Es lo recomendado cuando una parte es trivial. Juntos es una opción válida, con un plan más largo."],
      ],
    },
    { type: "heading", level: 2, text: "Si algo no funciona" },
    {
      type: "table",
      headers: ["Síntoma", "Causa probable", "Qué hacer"],
      rows: [
        ["No suena nada", "El contexto de audio no se ha iniciado", "Pulsa una tecla o haz clic una vez. Mover el ratón no basta."],
        ["Suena el rebote al romper un bloque", "El paso anota los dos eventos", "Al final del paso, si hay bloque roto, anota solo bloque."],
        ["Los niveles quedan fuera del lienzo", "Una fila tiene más de 10 columnas", "Revisa el diseño: cada fila tiene exactamente 10 caracteres."],
        ["Ganas al terminar el nivel 1", "El avance de nivel no está aplicado", "Al romper el último bloque, si no es el último nivel, carga el siguiente."],
        ["Un script viejo falla tras el spec 003", "Una decisión del spec antiguo ya no es cierta", "Actualiza el criterio, el script y las decisiones del spec viejo."],
        ["Un script pasa pero el criterio dice otra cosa", "La comprobación no mide lo que dice el texto", "Reescribe la comprobación para que busque lo que afirma el criterio."],
        ["La pausa no congela las explosiones", "avanzarExplosiones se llama antes del retorno de pausa", "En paso, comprueba la pausa en la primera línea."],
        ["El clic en un botón no hace nada", "Las coordenadas no se convierten al lienzo", "Multiplica por el ancho del lienzo y divide por el ancho que ocupa en la página."],
      ],
    },
    { type: "heading", level: 2, text: "Preguntas frecuentes" },
    {
      type: "accordion",
      items: [
        {
          title: "¿Debo hacer siempre un spec por cada cosa?",
          text: "No. Un spec por cada objetivo con decisiones. Una tarea con dos partes independientes se puede hacer con dos specs. Un arreglo de tamaño, con un prompt. Lo importante es poder explicar por qué escogiste cada camino.",
        },
        {
          title: "¿Y si Claude añade algo que me gusta pero no estaba en el spec?",
          text: "Decídelo. Si lo quieres, actualiza el spec antes de seguir. Si no, díselo. Lo que no conviene es aceptarlo en silencio, porque el spec dejaría de describir el juego.",
        },
        {
          title: "¿Cuándo borro un spec antiguo?",
          text: "Casi nunca. Marca como rechazado o actualizado lo que ya no vale, y conserva el archivo: explica por qué el proyecto es como es. Si el spec no aporta nada, puedes quitarlo de las dependencias del nuevo.",
        },
        {
          title: "¿Y si prefiero los niveles en JSON?",
          text: "Es una decisión válida. Un JSON se carga con fetch, que no funciona abriendo index.html desde el disco. Para este ejercicio se prefiere un archivo de JavaScript con datos, que no necesita servidor.",
        },
        {
          title: "¿Es mala idea que Claude actualice CLAUDE.md?",
          text: "No, es una buena tarea para delegar. Lee siempre el diff: el archivo se carga en cada sesión, y un error ahí se repite en todas.",
        },
        {
          title: "¿Cuándo hago un pull request en vez de un merge local?",
          text: "En cuanto trabaje más gente, o el código importe de verdad. Para un proyecto de práctica personal basta con el merge local, siempre desde una rama.",
        },
      ],
    },
    { type: "heading", level: 2, text: "Qué sigue" },
    {
      type: "paragraph",
      text: "Con esto termina la sección de Spec Driven Design. Tienes un juego de cinco niveles con sonido, tres specs implementados, tres scripts de regresión y un CLAUDE.md al día. En el Día 20 empieza un proyecto nuevo, desde su inicialización y su repositorio, para trabajar con skills y con un servidor MCP que controla el navegador. Antes de seguir, prueba una de las ideas para seguir con un spec propio.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 20, verifica que puedes explicar...",
      items: [
        "Cuándo conviene un spec con varias partes y cuándo dos separados.",
        "Cómo se genera un sonido con la API Web Audio y por qué hace falta un gesto de la persona.",
        "Por qué la lógica solo anota el evento y game.js decide cómo suena.",
        "Qué hacer cuando Claude se sale del plan.",
        "Por qué un spec nuevo obliga a actualizar criterios, scripts y decisiones anteriores.",
        "Por qué un script que pasa por casualidad es una mala señal.",
        "El ciclo de un prompt rápido: rama, contexto, prompt, revisión, regresión y merge.",
        "La diferencia entre una ruta en texto y un import con @ en CLAUDE.md.",
      ],
    },
    { type: "heading", level: 2, text: "Fuentes consultadas (noviembre 2026)" },
    {
      type: "list",
      items: [
        "[Cómo Claude recuerda tu proyecto: CLAUDE.md, tamaño e imports con @](https://code.claude.com/docs/en/memory)",
        "[Buenas prácticas para Claude Code: limpiar el contexto y adjuntar imágenes](https://code.claude.com/docs/en/best-practices)",
        "[Referencia de comandos: /clear](https://code.claude.com/docs/en/commands)",
        "[MDN: API Web Audio](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)",
        "[MDN: AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext)",
        "[MDN: OscillatorNode](https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode)",
        "[MDN: guía de reproducción automática](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay)",
        "[Git: git switch](https://git-scm.com/docs/git-switch)",
        "[Git: git merge](https://git-scm.com/docs/git-merge)",
        "[Git: git branch](https://git-scm.com/docs/git-branch)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "Una tarea tiene dos partes casi independientes, una trivial y otra compleja. ¿Qué suele recomendar el skill?",
      options: [
        "Un solo spec siempre",
        "Dos specs separados, aunque juntos sea una opción válida",
        "Ningún spec",
        "Hacerlo sin rama",
      ],
      correctIndex: 1,
      explanation: "Separar mantiene cada plan corto y cada parte integrable por su cuenta. Juntos es válido, con un plan más largo.",
    },
    {
      question: "La pelota rebota en una pared y rompe un bloque en el mismo paso. ¿Qué sonido se anota?",
      options: [
        "Los dos",
        "Solo el del bloque",
        "Solo el del rebote",
        "Ninguno",
      ],
      correctIndex: 1,
      explanation: "El requisito dice que, al tocar un bloque, solo suena el bloque. La lógica lo decide al final del paso.",
    },
    {
      question: "¿Por qué la lógica anota eventos en lugar de reproducir sonidos?",
      options: [
        "Porque Node no tiene sonido",
        "Para que sea pura y se pueda probar sin altavoces ni navegador, y game.js decida cómo suena",
        "Porque es más lento",
        "Por costumbre",
      ],
      correctIndex: 1,
      explanation: "Separar qué sonido toca de cómo suena permite comprobar el primero con un script de Node.",
    },
    {
      question: "El sonido no se oye hasta que pulsas una tecla. ¿Por qué?",
      options: [
        "Un error del código",
        "Los navegadores bloquean el audio hasta un gesto de la persona, y mover el ratón no cuenta",
        "El altavoz está apagado",
        "Falta un archivo",
      ],
      correctIndex: 1,
      explanation: "Es la política de reproducción automática. El código reanuda el contexto de audio en el primer clic o tecla.",
    },
    {
      question: "A mitad de /spec-impl, Claude pone los niveles dentro de game.js y el spec decía levels.js. ¿Qué haces?",
      options: [
        "Lo dejas pasar",
        "Lo paras, actualizas el spec con la decisión y sigues, para que spec y código digan lo mismo",
        "Borras el proyecto",
        "Cambias de modelo",
      ],
      correctIndex: 1,
      explanation: "Un spec que no refleja lo construido deja de servir. Se corrige el rumbo o se actualiza el spec, nunca se ignora.",
    },
    {
      question: "El spec 003 cambia una decisión del spec 001. ¿Qué haces con el spec 001?",
      options: [
        "Nada: los specs no se tocan",
        "Actualizas el criterio afectado, su script y dejas una línea Actualizada en las decisiones",
        "Lo borras",
        "Lo renombras",
      ],
      correctIndex: 1,
      explanation: "Si no se actualiza, la regresión falla o, peor, pasa con un criterio que ya no es cierto.",
    },
    {
      question: "Un criterio dice que no se usa audio, el script sigue pasando, y ahora el juego tiene sonido. ¿Qué indica?",
      options: [
        "Que todo está bien",
        "Que el script pasa por casualidad y el criterio ya no dice la verdad: hay que reescribir las dos cosas",
        "Que Node falla",
        "Que sobra el criterio",
      ],
      correctIndex: 1,
      explanation: "El texto del criterio y lo que comprueba el script deben coincidir. Pasar por casualidad es una mala señal.",
    },
    {
      question: "Pides un ajuste de tamaño con un prompt rápido. ¿Por qué hacerlo en una rama?",
      options: [
        "Porque Git lo exige",
        "Porque, si el resultado no gusta o toca archivos que no debía, se descarta la rama y main queda intacta",
        "Para ganar velocidad",
        "No hace falta rama",
      ],
      correctIndex: 1,
      explanation: "La rama es la red de seguridad: borrarla con -D descarta el cambio sin tocar main.",
    },
    {
      question: "Quieres que Claude consulte una guía de estilo grande solo cuando haga falta. ¿Cómo la referencias en CLAUDE.md?",
      options: [
        "Con @ruta, para que se cargue",
        "Con la ruta en texto normal, para que la lea cuando la necesite",
        "Copiando todo su contenido",
        "No se puede referenciar",
      ],
      correctIndex: 1,
      explanation: "Con @ruta se importa y se carga siempre al empezar. Una ruta en texto se lee solo cuando hace falta.",
    },
    {
      question: "Los tres scripts siguieron en verde tras cambiar el tamaño de la paleta y de los bloques. ¿Por qué?",
      options: [
        "Por suerte",
        "Porque los criterios usan los datos de CFG y no cifras fijas",
        "Porque no comprueban nada",
        "Porque se saltaron",
      ],
      correctIndex: 1,
      explanation: "Un criterio escrito sobre la configuración sobrevive a los cambios de tamaño.",
    },
  ],
};
