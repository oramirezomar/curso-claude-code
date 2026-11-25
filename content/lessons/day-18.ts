import type { Lesson } from "@/lib/types";

// Día 18 · Clases 64, 65 y 66 de la transcripción.
// Contenido verificado en noviembre de 2026.
export const day18: Lesson = {
  day: 18,
  slug: "cuando-no-usar-specs-y-segundo-spec",
  title: "Cuándo no usar specs y un segundo spec",
  section: "Spec Driven Design",
  estimatedMinutes: 75,
  icon: "🧭",
  objectives: [
    "Decidir con tres preguntas si un cambio pide un spec o un prompt directo, y aplicar ajustes pequeños sin spec.",
    "Revisar el diff de cada ajuste, ejecutar la regresión de los criterios anteriores y guardar un commit por cambio.",
    "Escribir un segundo spec con /spec: animación al romper un bloque, con decisiones sobre colisiones y explosiones simultáneas.",
    "Implementarlo con /spec-impl y comprobar que un criterio detecta el error de una animación que se congela al ganar.",
    "Cerrar la rama: merge manual, borrar la rama, y qué cambia cuando se trabaja en equipo.",
  ],
  blocks: [
    {
      type: "paragraph",
      text: "El MVP ya se juega. Ahora hay dos tentaciones opuestas: hacer un spec de cada cosa o no hacer nunca ninguno. Esta lección enseña a distinguir. Primero, dos ajustes pequeños con un prompt directo. Después, una funcionalidad que sí merece spec: la animación al romper un bloque, con sus decisiones, su rama y sus criterios.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "3", label: "Preguntas para decidir entre spec y prompt directo" },
        { value: "2", label: "Ajustes hechos con prompt directo" },
        { value: "5", label: "Pasos del plan del spec 002" },
        { value: "4", label: "Fotogramas de cada explosión" },
        { value: "240 ms", label: "Duración total de la animación" },
        { value: "9", label: "Criterios del spec 002, 8 con script y 1 mirando" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text: "Contenido verificado en noviembre de 2026. El spec 002, el código, el script de criterios y los comandos de Git los ejecuté de verdad, incluido el fallo provocado a propósito. También probé el juego en un navegador: el fondo, las vidas como pelotitas, las explosiones en cinco bloques y su duración real dentro del bucle del juego. Lo que responde Claude en los ejercicios 2, 3, 5 y 7 es orientativo, porque depende del modelo y su código será distinto del de referencia.",
    },
    { type: "heading", level: 2, text: "Cerrar bien el primer spec" },
    {
      type: "paragraph",
      text: "Al terminar, spec-impl cambia el estado del spec 001 a implementado. Si lo hace bien, el spec cuenta toda la historia: de borrador a aprobado y de aprobado a implementado. Hay criterios que ningún script ve, como que el color de fondo se distinga o que la paleta se vea proporcionada. Esos los marcas tú tras jugar, cambiando la casilla de [ ] a [x]. El validador acepta las dos formas.",
    },
    {
      type: "table",
      headers: ["Estado", "Quién lo pone", "Qué significa"],
      rows: [
        ["borrador", "Claude, al guardar el spec", "Se está discutiendo. Todavía no se puede implementar."],
        ["aprobado", "Tú, a mano", "Lo leíste entero y estás de acuerdo. Es la puerta para /spec-impl."],
        ["implementado", "spec-impl, o tú", "Los criterios se cumplen y se ha comprobado."],
        ["rechazado", "Tú", "Se descartó. Se conserva por el motivo, que evita repetir la discusión."],
      ],
    },
    {
      type: "paragraph",
      text: "Después, la rama. Cuando estás conforme, vuelves a main, haces el merge y borras la rama del spec. Con `git branch -d` Git solo borra una rama que ya esté integrada, así que es seguro: si la rama aún tiene trabajo sin fusionar, se niega a borrarla. Usar `-D`, en mayúscula, lo fuerza y puede perder trabajo.",
    },
    { type: "heading", level: 2, text: "Cuándo no hace falta un spec" },
    {
      type: "image",
      src: "/img/dia-18/spec-o-prompt-arkanoid.svg",
      alt: "Tres preguntas en recuadros: si cambia una regla, un dato o un criterio, si hay algo sin decidir que Claude tendría que inventar y si se puede revisar el cambio de un vistazo. Debajo, a la izquierda, prompt directo para el color del fondo, las vidas con pelotitas y un texto. A la derecha, spec para explosiones, varias pelotas, niveles y pelota pegada.",
      caption: "Tres preguntas, con ejemplos de este mismo juego.",
    },
    {
      type: "paragraph",
      text: "En el Día 15 viste reglas generales. Estas tres preguntas las aplican a un caso concreto. Si el cambio altera lo que el juego hace, o lo que un criterio de un spec comprueba, necesitas un spec. Si Claude tendría que inventar comportamiento para hacerlo, también. Si el diff es tan corto que lo entiendes entero de un vistazo, un prompt directo basta. Con un cambio puramente visual casi nunca hace falta spec. Con uno que añade un estado, una regla o datos, casi siempre.",
    },
    {
      type: "paragraph",
      text: "Hay una regla previa, que no depende de la inteligencia artificial: entiende tu código. Cambiar un color de fondo en una línea de CSS lo puedes hacer tú en diez segundos. Si caes en pedir a Claude hasta lo trivial, pierdes el hábito de leer lo que tienes. El prompt directo es para lo que es más rápido de describir que de teclear, no para lo que no sabes hacer.",
    },
    { type: "heading", level: 2, text: "Dos ajustes con prompts directos" },
    {
      type: "paragraph",
      text: "Con el MVP a la vista, hay dos cosas que mejorar. El fondo de la página y el del lienzo son casi iguales, así que no se distingue el borde. Y las vidas son un número, y quedan mejor como pelotitas. Ninguna toca reglas ni criterios. Haz un `/clear` antes de cada una: son tareas distintas, y la guía oficial recomienda limpiar el contexto entre tareas que no se relacionan.",
    },
    {
      type: "code",
      lang: "text",
      title: "Prompt 1, en Claude Code",
      code: `Necesito que el fondo de la página sea gris oscuro y que el lienzo del juego sea negro, con un borde claro para ver dónde termina.`,
    },
    {
      type: "paragraph",
      text: "Fíjate en que el prompt nombra las dos cosas, la página y el lienzo. Si solo dices que el fondo sea gris oscuro, Claude puede cambiar un color y dejar el lienzo igual, y el contraste que buscabas no aparece. Es lo que pasó en la clase: la primera respuesta devolvió el lienzo al color de la página, y hubo que aclararlo. Un prompt directo exige la misma precisión que una decisión de spec, aunque más corta.",
    },
    {
      type: "comparison",
      lang: "css",
      before: {
        title: "index.html antes",
        code: `body { margin: 0; background: #0d1224; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
canvas { background: #1b2540; border: 2px solid #4a557a; }`,
      },
      after: {
        title: "index.html después",
        code: `body { margin: 0; background: #2b2b2b; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
canvas { background: #000000; border: 2px solid #9a9a9a; }`,
      },
    },
    {
      type: "code",
      lang: "text",
      title: "Prompt 2, tras otro /clear",
      code: `En lugar del texto "Vidas: 3" arriba a la derecha, quiero que se dibuje una pelotita por cada vida que queda, del mismo color que la pelota del juego.`,
    },
    {
      type: "paragraph",
      text: "Si el cambio es visual, adjunta una captura. La guía oficial de buenas prácticas lo dice así: si ya tienes lo que Claude necesita, entrégalo en lugar de describirlo, y una imagen se pega en el prompt. Una captura de la zona afectada ahorra palabras y evita malentendidos.",
    },
    {
      type: "comparison",
      lang: "js",
      before: {
        title: "game.js antes",
        code: `  ctx.textAlign = "right";
  ctx.fillText("Vidas: " + juego.vidas, CFG.ancho - 12, 24);`,
      },
      after: {
        title: "game.js después",
        code: `  ctx.fillStyle = "#ffd166";
  for (let i = 0; i < juego.vidas; i++) {
    ctx.beginPath();
    ctx.arc(CFG.ancho - 20 - i * 24, 18, CFG.bola.r - 1, 0, Math.PI * 2);
    ctx.fill();
  }`,
      },
    },
    {
      type: "paragraph",
      text: "Tras cada ajuste haces lo de siempre: lees el diff, abres el juego, y lanzas la regresión, que son los criterios del spec 001. Aquí no cambió ninguna regla y el script sigue en verde. Guarda un commit cada vez que algo funcione. Un mensaje que diga el ajuste, y no un genérico arreglos, te permite volver atrás con precisión.",
    },
    {
      type: "paragraph",
      text: "Queda una cosa que el spec 001 no decía y que verás al jugar: tras perder una vida, la pelota vuelve a salir sola, al instante. ¿Es un ajuste o es un spec? Cambiaría un estado del juego, esperar a que el jugador lance, y afectaría al criterio de la pelota que vuelve a empezar. Según las tres preguntas, es un spec. Apúntalo para la tarea del Día 19.",
    },
    { type: "heading", level: 2, text: "Un segundo spec: la animación de los bloques" },
    {
      type: "paragraph",
      text: "La animación al romper un bloque es otro nivel. Hay datos nuevos, el estado de cada explosión, decisiones que alguien tiene que tomar, y varios archivos. Es un spec. Antes, limpia el contexto con `/clear` y guarda el trabajo anterior. Y piensa en el modelo: el spec es la parte que más razonamiento pide, y la implementación en pasos pequeños es la que menos. La documentación de modelos tiene un alias, `opusplan`, que usa Opus en modo plan y cambia a Sonnet al ejecutar. Para aprovecharlo, haz la entrevista del spec en modo plan, con Shift+Tab.",
    },
    {
      type: "code",
      lang: "text",
      title: "En Claude Code",
      code: `/clear
/spec Necesito que al romper un bloque se vea una animación de destrucción`,
    },
    {
      type: "paragraph",
      text: "Como siempre, solo el problema, no cómo resolverlo. El skill lee el spec anterior y el código y empieza a preguntar. Lo bueno de una buena entrevista es que descubre decisiones en las que no habías pensado. Estas son las cuatro de este spec, y la segunda y la tercera son las que muchas personas no ven venir.",
    },
    {
      type: "table",
      headers: ["Claude pregunta", "Tu decisión", "Por qué importa"],
      rows: [
        ["¿Entra el sonido?", "No. Solo la animación.", "El sonido fue descartado en el spec 001 y se hará en otro spec."],
        ["¿El bloque cuenta para las colisiones durante la animación?", "No. Deja de existir en el instante en que se rompe.", "Si dos pelotas lo tocaran a la vez, no se rompería dos veces. Sin esta decisión, es un error por resolver."],
        ["¿Las explosiones pueden solaparse?", "Sí, en paralelo y sin límite.", "Dos bloques seguidos pueden romperse en menos de 240 ms."],
        ["¿Con qué se dibuja?", "Con el color del bloque, sin imágenes.", "Mantiene el proyecto sin archivos y fácil de probar."],
      ],
    },
    {
      type: "paragraph",
      text: "Una cuarta decisión la aporta quien lee el diseño: ¿qué pasa si se rompe el último bloque y gana la partida? Si el reloj de las explosiones solo avanza mientras la fase es jugando, esa última explosión se queda congelada en pantalla. Está en el spec como criterio y como decisión, y lo vas a ver fallar a propósito más abajo.",
    },
    {
      type: "image",
      src: "/img/dia-18/fotogramas-explosion.svg",
      alt: "Cuatro fotogramas sobre fondo negro. Cada uno muestra un bloque rojo más grande y más transparente que el anterior: escala 1,15 y opacidad 0,78, escala 1,30 y 0,56, escala 1,45 y 0,34, y escala 1,60 y 0,12. Debajo, las fórmulas de escala y opacidad y la del número de fotograma.",
      caption: "Cada fotograma dura 60 ms. El bloque crece y se desvanece.",
    },
    {
      type: "code",
      lang: "markdown",
      title: "specs/002-animacion-explosion-bloques.md",
      code: `---
estado: borrador
---
# 002 Animación de explosión al romper un bloque
## Objetivo
Que cada bloque roto muestre una breve animación de destrucción, sin cambiar las reglas del juego.
## Alcance
Entra:
- Una explosión de 4 fotogramas, de 60 ms cada uno, 240 ms en total, en la posición del bloque.
- Cada fotograma es el bloque, del mismo color, un poco más grande y más transparente.
- Varias explosiones a la vez, sin límite, cuando se rompen bloques seguidos.
- Que la animación termine aunque la partida ya haya acabado.

No entra:
- Sonidos, imágenes, partículas ni efectos en la paleta.
- Un límite de explosiones simultáneas.
- Cambios en los puntos, las vidas o las fases.
## Modelo de datos
- juego.explosiones: lista de explosiones activas, vacía al empezar.
- explosión: x, y, w, h, fila y ms, los milisegundos desde que empezó.
- CFG.explosion: fotogramas (4) y duracionMs (240).
## Plan de implementación
1. Datos: añadir CFG.explosion y juego.explosiones al estado inicial.
2. Lanzar: crear una explosión cuando se rompe un bloque.
3. Avanzar: sumar tiempo a cada explosión y quitarla a los 240 ms, también cuando la fase ya no es jugando.
4. Dibujar: pintar el fotograma que toca de cada explosión, con el color del bloque.
5. Verificar con scripts/probar-explosiones.js, comprobar que el spec 001 sigue pasando y pasar el estado a implementado.
## Criterios de aceptación
- [ ] Al romper un bloque aparece una explosión en su posición.
- [ ] La explosión tiene 4 fotogramas de 60 ms cada uno.
- [ ] La explosión se elimina a los 240 ms.
- [ ] El bloque deja de existir para las colisiones desde el primer instante.
- [ ] Si se rompen dos bloques seguidos, hay dos explosiones a la vez.
- [ ] La última explosión termina aunque la fase ya sea ganaste.
- [ ] Los criterios del spec 001 siguen cumpliéndose.
- [ ] El código no usa audio ni archivos de imagen.
- [ ] La explosión usa el color del bloque roto, y se comprueba mirando el juego.
## Decisiones
- Tomada: el bloque deja de existir para las colisiones al romperse, porque dos pelotas podrían tocarlo a la vez.
- Tomada: las explosiones corren en paralelo y sin límite, porque el coste es mínimo.
- Tomada: la animación se dibuja con el color del bloque, sin imágenes.
- Tomada: la animación continúa tras ganar, para que la última no se quede congelada.
- Descartada: sonido, porque se hará en otro spec.
- Descartada: partículas, porque no hacen falta para un efecto claro.`,
    },
    {
      type: "paragraph",
      text: "Pasa el validador y fíjate en una cosa que no es obvia: el último criterio dice que se comprueba mirando el juego. No pasa nada por que no se pueda automatizar. Es mejor escribir un criterio manual honesto que uno automático que no comprueba lo que dice.",
    },
    {
      type: "image",
      src: "/img/dia-18/ciclo-de-un-spec-nuevo.svg",
      alt: "Siete pasos en dos filas. Arriba: contexto limpio con /clear y /spec, la entrevista que deja un borrador, la aprobación manual con commit en main, y otro /clear con /spec-impl 002. Abajo: cinco pasos con un commit cada uno, criterios y regresión, e integrar a mano con git merge y git branch -d. Una nota dice que tú decides en los pasos 3, 6 y 7.",
      caption: "El ciclo completo de un spec. Tú decides tres veces.",
    },
    { type: "heading", level: 2, text: "Aprobar e implementar con /spec-impl" },
    {
      type: "paragraph",
      text: "Con el spec escrito, haz un commit del borrador: es un requisito nuevo, y conviene que quede anotado. Léelo entero. Mientras no se toque código puedes cambiar lo que quieras, añadir un paso o un criterio. Cuando estés de acuerdo, cambia el estado a aprobado y haz otro commit, porque spec-impl no arranca con cambios sin guardar. Después, otra vez `/clear`, y a implementar.",
    },
    {
      type: "code",
      lang: "text",
      title: "En Claude Code",
      code: `/clear
/spec-impl 002`,
    },
    {
      type: "table",
      headers: ["Paso", "Qué añade", "Cómo lo compruebas"],
      rows: [
        ["1. Datos", "CFG.explosion y la lista juego.explosiones, vacía al empezar.", "node --check sin errores y el juego sigue igual."],
        ["2. Lanzar", "Al romper un bloque se crea una explosión con su posición y su fila.", "Tras romper uno, juego.explosiones tiene un elemento."],
        ["3. Avanzar", "Sumar tiempo, quitar a los 240 ms y calcular el fotograma. Se llama al principio de paso.", "La lista vuelve a quedar vacía tras 240 ms."],
        ["4. Dibujar", "Pintar el fotograma que toca, con el color del bloque, más grande y más transparente.", "En el navegador se ve la animación."],
        ["5. Criterios", "scripts/probar-explosiones.js, regresión del spec 001 y estado implementado.", "El script termina con todo en OK."],
      ],
    },
    {
      type: "paragraph",
      text: "El cambio completo en código es pequeño, y por eso se puede revisar de principio a fin. Este es el diff real entre main y la rama, sin el script de criterios. Mira dónde se llama a avanzarExplosiones: en la primera línea de paso, antes de salir si la fase no es jugando.",
    },
    {
      type: "code",
      lang: "text",
      title: "git diff main..spec/002-animacion-explosion-bloques",
      code: `diff --git a/game.js b/game.js
--- a/game.js
+++ b/game.js
@@ -30,6 +30,14 @@ function dibujar() {
     ctx.fillStyle = colores[bloque.fila];
     ctx.fillRect(bloque.x, bloque.y, bloque.w, bloque.h);
   }
+  for (const e of juego.explosiones) {
+    const f = fotograma(e);
+    const crece = 1 + 0.15 * (f + 1);
+    ctx.globalAlpha = 1 - 0.22 * (f + 1);
+    ctx.fillStyle = colores[e.fila];
+    ctx.fillRect(e.x - (e.w * (crece - 1)) / 2, e.y - (e.h * (crece - 1)) / 2, e.w * crece, e.h * crece);
+  }
+  ctx.globalAlpha = 1;
   const p = juego.paleta;
   ctx.fillStyle = "#e8e8e8";
   ctx.fillRect(p.x, p.y, p.w, p.h);
diff --git a/logica.js b/logica.js
--- a/logica.js
+++ b/logica.js
@@ -7,6 +7,7 @@ const CFG = {
   paleta: { w: 100, h: 14, y: 560, vel: 520 },
   bola: { r: 8, vel: 320 },
   bloques: { cols: 10, filas: 6, w: 70, h: 24, hueco: 6, arriba: 60 },
+  explosion: { fotogramas: 4, duracionMs: 240 },
 };
 
 function limitar(valor, min, max) {
@@ -49,6 +50,7 @@ function nuevoJuego() {
     paleta: { x: (CFG.ancho - CFG.paleta.w) / 2, y: CFG.paleta.y, w: CFG.paleta.w, h: CFG.paleta.h },
     bola: bolaInicial(),
     bloques: crearBloques(),
+    explosiones: [],
   };
 }
 
@@ -77,7 +79,18 @@ function perderVida(juego) {
   }
 }
 
+function avanzarExplosiones(juego, dt) {
+  for (const e of juego.explosiones) e.ms += dt * 1000;
+  juego.explosiones = juego.explosiones.filter((e) => e.ms < CFG.explosion.duracionMs);
+}
+
+function fotograma(explosion) {
+  const f = Math.floor((explosion.ms / CFG.explosion.duracionMs) * CFG.explosion.fotogramas);
+  return Math.min(f, CFG.explosion.fotogramas - 1);
+}
+
 function paso(juego, dt) {
+  avanzarExplosiones(juego, dt);
   if (juego.fase !== "jugando") return;
   const b = juego.bola;
   const r = CFG.bola.r;
@@ -102,6 +115,7 @@ function paso(juego, dt) {
   for (const bloque of juego.bloques) {
     if (!bloque.vivo || !bolaToca(b, bloque)) continue;
     bloque.vivo = false;
+    juego.explosiones.push({ x: bloque.x, y: bloque.y, w: bloque.w, h: bloque.h, fila: bloque.fila, ms: 0 });
     juego.puntos += CFG.puntosPorBloque;
     if (b.y < bloque.y || b.y > bloque.y + bloque.h) b.vy = -b.vy;
     else b.vx = -b.vx;
@@ -121,5 +135,7 @@ if (typeof module !== "undefined") {
     bolaToca,
     crearBloques,
     perderVida,
+    avanzarExplosiones,
+    fotograma,
   };
 }`,
    },
    {
      type: "image",
      src: "/img/dia-18/explosiones-en-paralelo.svg",
      alt: "Tres barras de colores superpuestas en una línea de tiempo: una explosión que empieza en 0 ms, otra en 100 ms y otra en 180 ms, cada una de 240 ms. Una línea roja en 180 ms marca el momento en que se rompe el último bloque y la fase pasa a ganaste. Debajo, el recuento de explosiones activas, de 1 a 3 y vuelta a 0. Una nota explica que el reloj de las explosiones no se detiene al cambiar la fase.",
      caption: "Tres explosiones solapadas, y la tercera sigue tras ganar.",
    },
    { type: "heading", level: 2, text: "Un criterio que atrapa un error real" },
    {
      type: "paragraph",
      text: "Este script comprueba los criterios del spec 002 que se pueden verificar sin navegador. Dos de ellos merecen atención. El criterio de la última explosión es el que falla si alguien mueve avanzarExplosiones por debajo del retorno de paso. Y el de la regresión ejecuta el script del spec 001: tocar paso, la función central, pide demostrar que lo anterior sigue vivo.",
    },
    {
      type: "code",
      lang: "js",
      title: "scripts/probar-explosiones.js",
      code: `// Comprueba los criterios del spec 002 que se pueden verificar sin navegador.
const fs = require("fs");
const { execFileSync } = require("child_process");
const { CFG, nuevoJuego, paso, avanzarExplosiones, fotograma } = require("../logica.js");

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
criterio("El código no usa audio ni archivos de imagen", !/new Audio|new Image|\\.(png|jpe?g|gif|mp3|wav)\\b/i.test(codigo));

console.log("Pendiente de mirar en el navegador: la explosión usa el color del bloque roto.");
console.log(fallos === 0 ? "RESULTADO: todos los criterios automáticos se cumplen" : "RESULTADO: " + fallos + " criterio(s) fallan");
process.exit(fallos === 0 ? 0 : 1);`,
    },
    {
      type: "callout",
      variant: "info",
      text: "Mientras preparaba esta lección, mi primera versión del criterio de las colisiones falló aunque el juego estaba bien: la pelota de la prueba, colocada debajo del bloque, también tocaba el de la fila de abajo y rompía dos. Era la prueba la que estaba mal puesta, y se arregló haciendo que la pelota baje desde arriba. Cuando un criterio falla, antes de tocar el código pregúntate si lo que está mal es la prueba.",
    },
    {
      type: "paragraph",
      text: "Sobre lo que se ve en el navegador, comprobé en cinco bloques rotos a la vez que cada explosión usa el color de su fila, que crece y se desvanece, y que dos explosiones en fotogramas distintos coexisten. En el bucle real del juego, una explosión desapareció entre los 250 y los 300 ms. Con muestras cada 40 ms, es coherente con los 240 ms del spec.",
    },
    { type: "heading", level: 2, text: "Integrar y limpiar" },
    {
      type: "paragraph",
      text: "Con los criterios en verde y el juego probado a mano, vuelve a main, integra y borra la rama. Es un puñado de comandos, y hacerlos tú ahorra tokens y te obliga a saber qué pasa. Claude también puede hacerlos si se lo pides, pero spec-impl no los hace por sí mismo.",
    },
    {
      type: "paragraph",
      text: "En un equipo, el flujo cambia. Lo normal es subir la rama, abrir un pull request y que otra persona lo revise y lo integre, y muchos repositorios protegen main para que no admita pushes directos. Para un proyecto personal de práctica basta con el merge local. En un proyecto serio, no hagas push directo a main.",
    },
    { type: "heading", level: 2, text: "Ejercicios guiados y experimentos" },
    {
      type: "paragraph",
      text: "Los ejercicios 1, 4, 6, 8, 9 y 10 se ejecutan con Git y Node y sus salidas son reales. Los ejercicios 2, 3, 5 y 7 usan Claude Code, y lo que responde es orientativo. Los experimentos del final se ejecutan en el navegador.",
    },
    {
      type: "exercise",
      title: "Ejercicio 1: partir de un main limpio",
      description: "Comprueba que el spec 001 está integrado y la rama borrada.",
      steps: [
        {
          instruction: "Ve al proyecto y mira ramas y cambios sin guardar. Si te queda la rama del spec 001 de la lección anterior, bórrala: Git solo lo permite si ya está integrada.",
          command: "cd ~/ClaudeCode/05-arkanoid && git switch main && git branch -d spec/001-mvp-arkanoid > /dev/null 2>&1; git status --porcelain && git branch",
          expected: "* main",
        },
      ],
      verify: "Estás en main, no hay cambios sin guardar y no queda ninguna otra rama. Si la rama del spec 001 sigue en la lista, es que no estaba integrada: haz antes el merge.",
    },
    {
      type: "exercise",
      title: "Ejercicio 2: ajuste 1, el fondo",
      description: "Un prompt directo, y un commit.",
      steps: [
        {
          instruction: "Abre Claude Code y limpia el contexto. Pide el cambio nombrando la página y el lienzo.",
          command: "claude\n/clear\nNecesito que el fondo de la página sea gris oscuro y que el lienzo del juego sea negro, con un borde claro para ver dónde termina.",
          expected: "Claude edita index.html: el estilo del body y del canvas. No toca la lógica.",
        },
        {
          instruction: "Revisa el cambio. Con el código de referencia, el resultado es este.",
          command: "git diff --stat",
          expected: " index.html | 4 ++--\n 1 file changed, 2 insertions(+), 2 deletions(-)",
        },
        {
          instruction: "Abre index.html en el navegador. Si te gusta, guarda el ajuste.",
          command: "git commit -q -am \"ajuste: fondo de página gris oscuro y lienzo negro\" && git log --format=%s -1",
          expected: "ajuste: fondo de página gris oscuro y lienzo negro",
        },
      ],
      verify: "Se distinguen el fondo de la página, el borde y el lienzo. Solo cambió index.html.",
    },
    {
      type: "exercise",
      title: "Ejercicio 3: ajuste 2, las vidas",
      description: "Otro prompt directo, y la regresión.",
      steps: [
        {
          instruction: "Limpia el contexto y pide las pelotitas. Si quieres, adjunta una captura de la zona.",
          command: "/clear\nEn lugar del texto \"Vidas: 3\" arriba a la derecha, quiero que se dibuje una pelotita por cada vida que queda, del mismo color que la pelota del juego.",
          expected: "Claude cambia el dibujo de las vidas en game.js. No toca logica.js.",
        },
        {
          instruction: "Revisa el diff.",
          command: "git diff --stat",
          expected: " game.js | 8 ++++++--\n 1 file changed, 6 insertions(+), 2 deletions(-)",
        },
        {
          instruction: "Comprueba que la regresión del spec 001 sigue pasando, y guarda el ajuste.",
          command: "node scripts/probar-criterios.js | tail -1 && git commit -q -am \"ajuste: las vidas se muestran como pelotitas\" && git log --format=%s -1",
          expected: "RESULTADO: todos los criterios se cumplen\najuste: las vidas se muestran como pelotitas",
        },
      ],
      verify: "Al perder una vida, desaparece una pelotita de la esquina. La regresión pasa porque la lógica no cambió.",
    },
    {
      type: "exercise",
      title: "Ejercicio 4: ¿spec o prompt directo?",
      description: "Clasifica seis ideas con las tres preguntas.",
      steps: [
        {
          instruction: "Decide para cada idea, y escribe tu respuesta antes de seguir.",
          command: "1) Cambiar el texto de GAME OVER. 2) Que la pelota salga pegada a la paleta hasta pulsar. 3) Poner la paleta de otro color. 4) Varias pelotas a la vez. 5) Un contador de bloques que quedan. 6) Niveles con distintos diseños de bloques.",
          expected: "1) Prompt directo: un texto, cabe de un vistazo.\n2) Spec: cambia una regla y añade un estado.\n3) Prompt directo: es solo visual.\n4) Spec: cambia reglas y tiene decisiones.\n5) Prompt directo, si solo muestra un número: pero si hay que decidir dónde y cuándo, spec.\n6) Spec: datos nuevos, decisiones y varios archivos.",
        },
      ],
      verify: "Puedes justificar cada respuesta con una de las tres preguntas. El quinto caso depende de lo que decidas.",
    },
    {
      type: "exercise",
      title: "Ejercicio 5: el spec de la animación",
      description: "Una frase de problema y cuatro decisiones.",
      steps: [
        {
          instruction: "Limpia el contexto, entra en modo plan con Shift+Tab y lanza el skill.",
          command: "/clear\n/spec Necesito que al romper un bloque se vea una animación de destrucción",
          expected: "Claude lee el spec anterior y el código, y empieza a preguntar: alcance, estado del bloque durante la animación, explosiones simultáneas, con qué se dibuja.",
        },
        {
          instruction: "Responde con decisiones.",
          command: "Solo la animación, sin sonido. El bloque deja de existir para las colisiones al romperse. Las explosiones corren en paralelo y sin límite. Se dibuja con el color del bloque, sin imágenes. Y la animación debe terminar aunque se gane la partida.",
          expected: "Claude confirma y propone el spec por secciones. Al final te pide permiso para guardarlo como specs/002-animacion-explosion-bloques.md en estado borrador.",
        },
      ],
      verify: "El spec tiene los criterios de la tabla de decisiones y en No entra están el sonido y las partículas.",
    },
    {
      type: "exercise",
      title: "Ejercicio 6: validar, aprobar y guardar",
      description: "Si prefieres el spec de referencia, guárdalo y valídalo.",
      steps: [
        {
          instruction: "Guarda el spec de referencia, o compáralo con el tuyo.",
          file: {
            name: "specs/002-animacion-explosion-bloques.md",
            code: `---
estado: borrador
---
# 002 Animación de explosión al romper un bloque
## Objetivo
Que cada bloque roto muestre una breve animación de destrucción, sin cambiar las reglas del juego.
## Alcance
Entra:
- Una explosión de 4 fotogramas, de 60 ms cada uno, 240 ms en total, en la posición del bloque.
- Cada fotograma es el bloque, del mismo color, un poco más grande y más transparente.
- Varias explosiones a la vez, sin límite, cuando se rompen bloques seguidos.
- Que la animación termine aunque la partida ya haya acabado.

No entra:
- Sonidos, imágenes, partículas ni efectos en la paleta.
- Un límite de explosiones simultáneas.
- Cambios en los puntos, las vidas o las fases.
## Modelo de datos
- juego.explosiones: lista de explosiones activas, vacía al empezar.
- explosión: x, y, w, h, fila y ms, los milisegundos desde que empezó.
- CFG.explosion: fotogramas (4) y duracionMs (240).
## Plan de implementación
1. Datos: añadir CFG.explosion y juego.explosiones al estado inicial.
2. Lanzar: crear una explosión cuando se rompe un bloque.
3. Avanzar: sumar tiempo a cada explosión y quitarla a los 240 ms, también cuando la fase ya no es jugando.
4. Dibujar: pintar el fotograma que toca de cada explosión, con el color del bloque.
5. Verificar con scripts/probar-explosiones.js, comprobar que el spec 001 sigue pasando y pasar el estado a implementado.
## Criterios de aceptación
- [ ] Al romper un bloque aparece una explosión en su posición.
- [ ] La explosión tiene 4 fotogramas de 60 ms cada uno.
- [ ] La explosión se elimina a los 240 ms.
- [ ] El bloque deja de existir para las colisiones desde el primer instante.
- [ ] Si se rompen dos bloques seguidos, hay dos explosiones a la vez.
- [ ] La última explosión termina aunque la fase ya sea ganaste.
- [ ] Los criterios del spec 001 siguen cumpliéndose.
- [ ] El código no usa audio ni archivos de imagen.
- [ ] La explosión usa el color del bloque roto, y se comprueba mirando el juego.
## Decisiones
- Tomada: el bloque deja de existir para las colisiones al romperse, porque dos pelotas podrían tocarlo a la vez.
- Tomada: las explosiones corren en paralelo y sin límite, porque el coste es mínimo.
- Tomada: la animación se dibuja con el color del bloque, sin imágenes.
- Tomada: la animación continúa tras ganar, para que la última no se quede congelada.
- Descartada: sonido, porque se hará en otro spec.
- Descartada: partículas, porque no hacen falta para un efecto claro.`,
          },
        },
        {
          instruction: "Valídalo.",
          command: "node scripts/validar-spec.js specs/002-animacion-explosion-bloques.md",
          expected: "OK sección: Objetivo\nOK sección: Alcance\nOK sección: Modelo de datos\nOK sección: Plan de implementación\nOK sección: Criterios de aceptación\nOK sección: Decisiones\nRESULTADO: spec válido",
        },
        {
          instruction: "Guarda el spec como borrador, y comprueba su cabecera.",
          command: "git add specs && git commit -q -m \"spec 002 en borrador\" && head -3 specs/002-animacion-explosion-bloques.md",
          expected: "---\nestado: borrador\n---",
        },
        {
          instruction: "Lee el spec. Cuando estés de acuerdo, edita el archivo y cambia estado: borrador por estado: aprobado. Comprueba la cabecera y guarda el spec aprobado.",
          command: "head -3 specs/002-animacion-explosion-bloques.md && git commit -q -am \"spec 002 aprobado\" && git status --porcelain && git log --format=%s -1",
          expected: "---\nestado: aprobado\n---\nspec 002 aprobado",
        },
      ],
      verify: "El estado cambió de borrador a aprobado en dos commits distintos y no quedan cambios sin guardar.",
    },
    {
      type: "exercise",
      title: "Ejercicio 7: /spec-impl 002",
      description: "En una sesión limpia, y paso a paso.",
      steps: [
        {
          instruction: "Limpia el contexto y lanza la implementación.",
          command: "claude\n/clear\n/spec-impl 002",
          expected: "Claude lee el spec, comprueba que está aprobado, ejecuta git status y crea la rama spec/002-animacion-explosion-bloques. Te pregunta si empieza.",
        },
        {
          instruction: "Tras cada paso, mira el commit que acaba de hacer antes de aceptar el siguiente.",
          command: "git show --stat --format=%s",
          expected: "El mensaje del commit y los archivos que cambió ese paso. En el paso 3, logica.js.",
        },
        {
          instruction: "Comprueba la rama.",
          command: "git branch --show-current",
          expected: "spec/002-animacion-explosion-bloques",
        },
      ],
      verify: "Estás en la rama del spec y cada paso termina en un commit.",
    },
    {
      type: "exercise",
      title: "Ejercicio 8: el código de referencia y los criterios",
      description: "Para seguir la lección al pie de la letra, usa el código de referencia.",
      steps: [
        {
          instruction: "Guarda logica.js, con la lógica de las explosiones.",
          file: {
            name: "logica.js",
            code: `// Lógica pura del juego. No toca el DOM, así se puede probar con Node.
const CFG = {
  ancho: 800,
  alto: 600,
  vidas: 3,
  puntosPorBloque: 10,
  paleta: { w: 100, h: 14, y: 560, vel: 520 },
  bola: { r: 8, vel: 320 },
  bloques: { cols: 10, filas: 6, w: 70, h: 24, hueco: 6, arriba: 60 },
  explosion: { fotogramas: 4, duracionMs: 240 },
};

function limitar(valor, min, max) {
  return Math.max(min, Math.min(max, valor));
}

function bolaInicial() {
  return {
    x: CFG.ancho / 2,
    y: CFG.paleta.y - CFG.bola.r - 1,
    vx: CFG.bola.vel * 0.6,
    vy: -CFG.bola.vel * 0.8,
  };
}

function crearBloques() {
  const c = CFG.bloques;
  const margen = (CFG.ancho - (c.cols * c.w + (c.cols - 1) * c.hueco)) / 2;
  const lista = [];
  for (let fila = 0; fila < c.filas; fila++) {
    for (let col = 0; col < c.cols; col++) {
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
    paleta: { x: (CFG.ancho - CFG.paleta.w) / 2, y: CFG.paleta.y, w: CFG.paleta.w, h: CFG.paleta.h },
    bola: bolaInicial(),
    bloques: crearBloques(),
    explosiones: [],
  };
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
    juego.bola = bolaInicial();
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
  avanzarExplosiones(juego, dt);
  if (juego.fase !== "jugando") return;
  const b = juego.bola;
  const r = CFG.bola.r;
  b.x += b.vx * dt;
  b.y += b.vy * dt;
  if (b.x < r) {
    b.x = r;
    b.vx = Math.abs(b.vx);
  }
  if (b.x > CFG.ancho - r) {
    b.x = CFG.ancho - r;
    b.vx = -Math.abs(b.vx);
  }
  if (b.y < r) {
    b.y = r;
    b.vy = Math.abs(b.vy);
  }
  if (b.vy > 0 && bolaToca(b, juego.paleta)) {
    b.y = juego.paleta.y - r;
    b.vy = -Math.abs(b.vy);
  }
  for (const bloque of juego.bloques) {
    if (!bloque.vivo || !bolaToca(b, bloque)) continue;
    bloque.vivo = false;
    juego.explosiones.push({ x: bloque.x, y: bloque.y, w: bloque.w, h: bloque.h, fila: bloque.fila, ms: 0 });
    juego.puntos += CFG.puntosPorBloque;
    if (b.y < bloque.y || b.y > bloque.y + bloque.h) b.vy = -b.vy;
    else b.vx = -b.vx;
    break;
  }
  if (juego.bloques.every((bloque) => !bloque.vivo)) juego.fase = "ganaste";
  if (juego.fase === "jugando" && b.y - r > CFG.alto) perderVida(juego);
}

if (typeof module !== "undefined") {
  module.exports = {
    CFG,
    nuevoJuego,
    moverPaleta,
    colocarPaleta,
    paso,
    bolaToca,
    crearBloques,
    perderVida,
    avanzarExplosiones,
    fotograma,
  };
}`,
          },
        },
        {
          instruction: "Guarda game.js, con el dibujo de las explosiones y las vidas con pelotitas.",
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

addEventListener("keydown", (e) => {
  teclas[e.key] = true;
  if (e.key === "Enter" && juego.fase !== "jugando") juego = nuevoJuego();
});

addEventListener("keyup", (e) => {
  teclas[e.key] = false;
});

lienzo.addEventListener("mousemove", (e) => {
  const caja = lienzo.getBoundingClientRect();
  colocarPaleta(juego, ((e.clientX - caja.left) * CFG.ancho) / caja.width);
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
    ctx.fillText(juego.fase === "ganaste" ? "¡GANASTE!" : "GAME OVER", CFG.ancho / 2, CFG.alto / 2);
    ctx.font = "18px sans-serif";
    ctx.fillText("Pulsa Enter para jugar otra vez", CFG.ancho / 2, CFG.alto / 2 + 40);
  }
}

function bucle(t) {
  const dt = Math.min((t - ultimo) / 1000, 0.05);
  ultimo = t;
  if (teclas.ArrowLeft) moverPaleta(juego, -CFG.paleta.vel * dt);
  if (teclas.ArrowRight) moverPaleta(juego, CFG.paleta.vel * dt);
  paso(juego, dt);
  dibujar();
  requestAnimationFrame(bucle);
}

requestAnimationFrame(bucle);`,
          },
        },
        {
          instruction: "Guarda el script de criterios.",
          file: {
            name: "scripts/probar-explosiones.js",
            code: `// Comprueba los criterios del spec 002 que se pueden verificar sin navegador.
const fs = require("fs");
const { execFileSync } = require("child_process");
const { CFG, nuevoJuego, paso, avanzarExplosiones, fotograma } = require("../logica.js");

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
criterio("El código no usa audio ni archivos de imagen", !/new Audio|new Image|\\.(png|jpe?g|gif|mp3|wav)\\b/i.test(codigo));

console.log("Pendiente de mirar en el navegador: la explosión usa el color del bloque roto.");
console.log(fallos === 0 ? "RESULTADO: todos los criterios automáticos se cumplen" : "RESULTADO: " + fallos + " criterio(s) fallan");
process.exit(fallos === 0 ? 0 : 1);`,
          },
        },
        {
          instruction: "Ejecútalo.",
          command: "node scripts/probar-explosiones.js",
          expected: "OK    Al romper un bloque aparece una explosión en su posición\nOK    La explosión tiene 4 fotogramas de 60 ms cada uno\nOK    La explosión se elimina a los 240 ms\nOK    El bloque deja de existir para las colisiones desde el primer instante\nOK    Si se rompen dos bloques seguidos, hay dos explosiones a la vez\nOK    La última explosión termina aunque la fase ya sea ganaste\nOK    Los criterios del spec 001 siguen cumpliéndose\nOK    El código no usa audio ni archivos de imagen\nPendiente de mirar en el navegador: la explosión usa el color del bloque roto.\nRESULTADO: todos los criterios automáticos se cumplen",
        },
        {
          instruction: "Guarda los cambios.",
          command: "git add -A && git commit -q -m \"código de referencia de las explosiones\" && git status --porcelain && echo limpio",
          expected: "limpio",
        },
      ],
      verify: "Ocho criterios en OK y uno pendiente de mirar. Abre el juego y rompe un bloque: debes ver la explosión.",
    },
    {
      type: "exercise",
      title: "Ejercicio 9: romper la animación a propósito",
      description: "Mueve la llamada y mira qué criterio lo detecta.",
      steps: [
        {
          instruction: "En logica.js, dentro de paso, cambia el orden de las dos primeras líneas: primero el if que sale si la fase no es jugando, y después avanzarExplosiones. Ejecuta el script y mira solo lo que falla.",
          command: "node scripts/probar-explosiones.js | grep -v '^OK'",
          expected: "FALLA La última explosión termina aunque la fase ya sea ganaste\nPendiente de mirar en el navegador: la explosión usa el color del bloque roto.\nRESULTADO: 1 criterio(s) fallan",
        },
        {
          instruction: "Deshaz el cambio con Git y comprueba que todo vuelve a pasar.",
          command: "git restore logica.js && node scripts/probar-explosiones.js | tail -1",
          expected: "RESULTADO: todos los criterios automáticos se cumplen",
        },
      ],
      verify: "El criterio dio la alarma por una razón concreta: con la fase en ganaste, la última explosión se habría quedado congelada para siempre.",
    },
    {
      type: "exercise",
      title: "Ejercicio 10: jugar, integrar y limpiar",
      description: "Mira la animación en el navegador y cierra la rama.",
      steps: [
        {
          instruction: "Abre index.html y rompe bloques. Comprueba que la explosión usa el color del bloque, que se ven dos a la vez si rompes dos seguidos y que desaparecen sin quedarse en pantalla. Pasa al spec: marca [x] en el criterio del color y cambia el estado a implementado, si no lo hizo spec-impl.",
          command: "open index.html",
          expected: "Cada bloque roto deja una explosión corta del mismo color, que crece y se desvanece en unos 240 ms.",
        },
        {
          instruction: "Guarda lo que quede y pasa a main. Si no había nada que guardar, git commit lo avisa y el comando sigue.",
          command: "git add -A && git commit -q -m \"spec 002 implementado\"; git switch main",
          expected: "Switched to branch 'main'",
        },
        {
          instruction: "Integra la rama.",
          command: "git merge --no-ff spec/002-animacion-explosion-bloques -m \"merge: spec 002 animación de explosión\"",
          expected: "Merge made by the 'ort' strategy.\n game.js                                  |  8 +++\n logica.js                                | 16 +++++\n scripts/probar-explosiones.js            | 80 +++++++++++++++++++++++\n specs/002-animacion-explosion-bloques.md |  2 +-\n 4 files changed, 105 insertions(+), 1 deletion(-)\n create mode 100644 scripts/probar-explosiones.js",
        },
        {
          instruction: "Borra la rama, que ya está integrada, y comprueba que solo queda main.",
          command: "git branch -d spec/002-animacion-explosion-bloques > /dev/null && git branch",
          expected: "* main",
        },
      ],
      verify: "main contiene las explosiones y el spec 002 en estado implementado. Las cifras de líneas del merge pueden variar en tu proyecto.",
    },
    {
      type: "playground",
      title: "Experimento 11: ¿spec o prompt directo?",
      description: "Las tres preguntas como una función. Cambia los valores de una idea, o añade una tuya, y mira cómo cambia el veredicto.",
      code: `const ideas = [
  { idea: "Fondo de la página en gris oscuro", reglas: false, decisiones: false, grande: false },
  { idea: "Vidas como pelotitas en vez de un número", reglas: false, decisiones: false, grande: false },
  { idea: "Cambiar el texto de GAME OVER", reglas: false, decisiones: false, grande: false },
  { idea: "Animación al romper un bloque", reglas: false, decisiones: true, grande: true },
  { idea: "La pelota sale pegada a la paleta hasta pulsar", reglas: true, decisiones: true, grande: false },
  { idea: "Varias pelotas a la vez", reglas: true, decisiones: true, grande: true },
];
function veredicto(i) {
  const motivos = [];
  if (i.reglas) motivos.push("cambia reglas");
  if (i.decisiones) motivos.push("hay decisiones");
  if (i.grande) motivos.push("no cabe de un vistazo");
  return (motivos.length ? "spec" : "prompt directo") + (motivos.length ? " (" + motivos.join(", ") + ")" : "");
}
ideas.forEach((i) => console.log(i.idea + " -> " + veredicto(i)));`,
      expected: "Fondo de la página en gris oscuro -> prompt directo\nVidas como pelotitas en vez de un número -> prompt directo\nCambiar el texto de GAME OVER -> prompt directo\nAnimación al romper un bloque -> spec (hay decisiones, no cabe de un vistazo)\nLa pelota sale pegada a la paleta hasta pulsar -> spec (cambia reglas, hay decisiones)\nVarias pelotas a la vez -> spec (cambia reglas, hay decisiones, no cabe de un vistazo)",
    },
    {
      type: "playground",
      title: "Experimento 12: los fotogramas de la explosión",
      description: "Calcula el fotograma, la escala y la opacidad para varios instantes. Cambia la duración o el número de fotogramas.",
      code: `const FOTOGRAMAS = 4;
const DURACION = 240;
function describir(ms) {
  if (ms >= DURACION) return ms + " ms -> se elimina";
  const n = Math.min(Math.floor((ms / DURACION) * FOTOGRAMAS), FOTOGRAMAS - 1);
  const escala = 1 + 0.15 * (n + 1);
  const opacidad = 1 - 0.22 * (n + 1);
  return ms + " ms -> fotograma " + n + ", escala " + escala.toFixed(2) + ", opacidad " + opacidad.toFixed(2);
}
[0, 59, 60, 119, 120, 179, 180, 239, 240].forEach((ms) => console.log(describir(ms)));`,
      expected: "0 ms -> fotograma 0, escala 1.15, opacidad 0.78\n59 ms -> fotograma 0, escala 1.15, opacidad 0.78\n60 ms -> fotograma 1, escala 1.30, opacidad 0.56\n119 ms -> fotograma 1, escala 1.30, opacidad 0.56\n120 ms -> fotograma 2, escala 1.45, opacidad 0.34\n179 ms -> fotograma 2, escala 1.45, opacidad 0.34\n180 ms -> fotograma 3, escala 1.60, opacidad 0.12\n239 ms -> fotograma 3, escala 1.60, opacidad 0.12\n240 ms -> se elimina",
    },
    {
      type: "playground",
      title: "Experimento 13: explosiones solapadas",
      description: "Tres bloques se rompen en 0, 100 y 180 ms. Cuenta las explosiones activas en cada instante. Añade otra rotura y mira cuántas llegan a coincidir.",
      code: `const DURACION = 240;
const roturas = [0, 100, 180];
function activas(t) {
  return roturas.filter((r) => r <= t && t < r + DURACION).length;
}
[0, 99, 100, 179, 180, 239, 240, 339, 340, 419, 420].forEach((t) => console.log("t=" + t + " ms: " + activas(t) + " activas"));`,
      expected: "t=0 ms: 1 activas\nt=99 ms: 1 activas\nt=100 ms: 2 activas\nt=179 ms: 2 activas\nt=180 ms: 3 activas\nt=239 ms: 3 activas\nt=240 ms: 2 activas\nt=339 ms: 2 activas\nt=340 ms: 1 activas\nt=419 ms: 1 activas\nt=420 ms: 0 activas",
    },
    {
      type: "playground",
      title: "Experimento 14: dónde van las pelotitas",
      description: "Posición de cada pelotita de vida, de derecha a izquierda. Cambia la separación o el margen.",
      code: `const ANCHO = 800;
function posiciones(vidas) {
  const xs = [];
  for (let i = 0; i < vidas; i++) xs.push(ANCHO - 20 - i * 24);
  return xs;
}
[3, 2, 1, 0].forEach((v) => console.log("vidas " + v + " -> x: " + (posiciones(v).join(", ") || "ninguna")));`,
      expected: "vidas 3 -> x: 780, 756, 732\nvidas 2 -> x: 780, 756\nvidas 1 -> x: 780\nvidas 0 -> x: ninguna",
    },
    { type: "heading", level: 2, text: "¿Qué usar en cada caso?" },
    {
      type: "table",
      headers: ["Si necesitas...", "Usa...", "Nota"],
      rows: [
        ["Un cambio visual pequeño", "Un prompt directo, tras /clear", "Describe la página y el lienzo, y revisa el diff."],
        ["Un cambio que añade estado o reglas", "Un spec nuevo", "Con su rama, sus pasos y sus criterios."],
        ["Mostrar a Claude algo visual", "Pegar una captura en el prompt", "Ahorra palabras y evita malentendidos."],
        ["Saber si lo anterior sigue vivo", "La regresión: el script del spec anterior", "Se ejecuta cuando tocas código compartido."],
        ["Un criterio que no se puede automatizar", "Un criterio manual, escrito con honestidad", "Se marca tú tras jugar."],
        ["Un cambio no integrado todavía", "Seguir en la rama del spec", "main solo recibe lo que ya pasó."],
        ["Cerrar un spec", "git merge, y git branch -d", "-d solo borra si ya se integró."],
        ["Trabajar en equipo", "Pull request y main protegida", "El merge local es solo para práctica."],
        ["Gastar menos al implementar", "opusplan, o un modelo ligero", "El spec pide razonar, y la implementación en pasos pequeños, menos."],
      ],
    },
    { type: "heading", level: 2, text: "Datos que suelen aparecer desactualizados" },
    {
      type: "table",
      headers: ["Suele decirse", "Información verificada (noviembre 2026)"],
      rows: [
        ["opusplan es lo mismo que un modelo Sonnet concreto.", "Es un alias: usa Opus en modo plan y cambia a Sonnet al ejecutar. Para que cuente, la entrevista debe hacerse en modo plan."],
        ["Todo cambio, por pequeño que sea, merece un spec.", "No. Un cambio visual que cabe en un diff corto se hace con un prompt directo."],
        ["Un prompt directo no necesita precisión.", "Necesita la misma que una decisión de spec: nombrar la página y el lienzo evita un cambio a medias."],
        ["Un spec debe automatizarse por completo.", "No. Puede haber criterios manuales, siempre que estén escritos con honestidad."],
        ["Si el script pasa, el juego está bien.", "El script comprueba reglas. Lo visual, como el color de una explosión, se mira jugando."],
        ["Git branch -d y -D son lo mismo.", "-d solo borra ramas ya integradas. -D fuerza el borrado y puede perder trabajo."],
        ["Hay que hacer push directo a main al terminar.", "En un proyecto serio se abre un pull request, y muchos repositorios protegen main."],
        ["La animación puede dejarse para cuando la fase sea jugando.", "Si el reloj de las explosiones se detiene al ganar, la última queda congelada. Es un criterio del spec."],
        ["Un criterio que falla significa que el código está mal.", "A veces la prueba está mal puesta. Revisa la prueba antes de tocar el código."],
        ["El spec en estado borrador no necesita commit.", "Conviene guardarlo: es un requisito nuevo, y spec-impl exige un directorio sin cambios sin guardar."],
      ],
    },
    { type: "heading", level: 2, text: "Si algo no funciona" },
    {
      type: "table",
      headers: ["Síntoma", "Causa probable", "Qué hacer"],
      rows: [
        ["Tras el ajuste del fondo, el lienzo sigue igual", "Claude cambió el color de la página, pero no el del lienzo", "Nombra los dos en el prompt: página gris oscuro y lienzo negro."],
        ["git branch -d se niega a borrar la rama", "La rama no está integrada en main", "Haz primero el merge. Si de verdad la descartas, usa -D."],
        ["/spec-impl dice que hay cambios sin guardar", "El spec, aprobado o no, no está guardado", "Haz git status y guarda el commit del spec."],
        ["La última explosión se queda en pantalla al ganar", "avanzarExplosiones está después del retorno de paso", "Muévela a la primera línea de paso."],
        ["Ves la explosión en un color distinto", "El índice de color usa la fila equivocada", "El spec dice color del bloque roto: comprueba e.fila."],
        ["El script de criterios falla y el juego parece bien", "La prueba está mal puesta", "Revisa la colocación de la pelota y los datos de la prueba antes de cambiar el código."],
        ["La regresión del spec 001 falla tras tocar paso", "Se cambió una regla sin querer", "Mira el diff de paso y vuelve a lo anterior."],
        ["Las explosiones se ven muy tenues", "Es esperado en el último fotograma", "La opacidad baja a 0,12. Cambia la fórmula en un spec nuevo."],
      ],
    },
    { type: "heading", level: 2, text: "Preguntas frecuentes" },
    {
      type: "accordion",
      items: [
        {
          title: "¿Y si un ajuste pequeño se complica?",
          text: "Para y reconsidera. Si el prompt directo empieza a tocar varios archivos o a pedirte decisiones, es señal de que era un spec. Descarta el cambio con git restore y empieza por el spec.",
        },
        {
          title: "¿Por qué hacer commit del spec en borrador?",
          text: "Deja constancia del requisito nuevo, y spec-impl exige un directorio sin cambios. También te permite volver al borrador si cambias de idea.",
        },
        {
          title: "¿Por qué ejecutar la regresión si solo cambié las explosiones?",
          text: "Porque tocaste paso, que sostiene todas las reglas. Un cambio en un punto central puede romper lo que ya funcionaba, y el script del spec anterior lo comprueba en segundos.",
        },
        {
          title: "¿Se puede cambiar el spec mientras se implementa?",
          text: "Sí, si descubres algo. Pausa, edita el spec, y vuelve al estado aprobado tras leerlo. Un spec que no refleja lo que se construyó no sirve a quien lo lea después.",
        },
        {
          title: "¿Puedo pedirle a Claude que haga el merge?",
          text: "Sí, es posible, y ahorra teclear. Pero hacerlo tú te obliga a saber qué pasa, y gastas menos tokens. En un equipo, lo normal es un pull request.",
        },
        {
          title: "¿Cuántos specs debe tener un proyecto?",
          text: "Los que hagan falta: uno por funcionalidad con decisiones. Numerarlos y dejar su estado hace que el proyecto cuente su propia historia.",
        },
      ],
    },
    { type: "heading", level: 2, text: "Qué sigue" },
    {
      type: "paragraph",
      text: "El Día 19 es una tarea guiada. Con lo que ya tienes, y con las ideas que apuntaste, como la pelota que sale pegada a la paleta, escribirás un spec por tu cuenta, lo implementarás y lo revisarás. También verás cómo acelerar el trabajo con prompts rápidos y con referencias a archivos. Antes de empezar, deja main limpia y con el spec 002 integrado.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 19, verifica que puedes explicar...",
      items: [
        "Las tres preguntas para decidir entre un spec y un prompt directo.",
        "Por qué un prompt directo necesita tanta precisión como una decisión de spec.",
        "Por qué hay que ejecutar la regresión tras tocar la función central.",
        "Qué decisiones aparecieron en la entrevista del spec 002 y por qué importan.",
        "Por qué avanzarExplosiones va al principio de paso.",
        "Qué detecta el criterio de la última explosión.",
        "Por qué un criterio puede fallar por culpa de la prueba y no del código.",
        "La diferencia entre git branch -d y -D, y por qué en equipo se usa un pull request.",
      ],
    },
    { type: "heading", level: 2, text: "Fuentes consultadas (noviembre 2026)" },
    {
      type: "list",
      items: [
        "[Buenas prácticas para Claude Code: limpiar el contexto, adjuntar imágenes y pedir evidencia](https://code.claude.com/docs/en/best-practices)",
        "[Configuración de modelos: el alias opusplan](https://code.claude.com/docs/en/model-config)",
        "[Flujos de trabajo habituales: referencias e imágenes](https://code.claude.com/docs/en/common-workflows)",
        "[Extender Claude con skills](https://code.claude.com/docs/en/skills)",
        "[Git: git branch](https://git-scm.com/docs/git-branch)",
        "[Git: git switch](https://git-scm.com/docs/git-switch)",
        "[Git: git merge](https://git-scm.com/docs/git-merge)",
        "[GitHub: ramas protegidas](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)",
        "[MDN: globalAlpha del lienzo](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalAlpha)",
        "[MDN: arc del lienzo](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "Quieres cambiar el color de fondo de la página. ¿Qué haces?",
      options: [
        "Un spec completo con seis secciones",
        "Un prompt directo, o lo cambias tú en una línea de CSS",
        "Un proyecto nuevo",
        "Nada: no se puede cambiar",
      ],
      correctIndex: 1,
      explanation: "Un cambio visual que cabe en un diff corto no necesita spec. Si es una línea que sabes escribir, hazla tú.",
    },
    {
      question: "Pides «que el fondo sea gris oscuro» y el lienzo queda igual. ¿Por qué?",
      options: [
        "Porque Claude está roto",
        "Porque el lienzo tiene su propio color de fondo, y el prompt no lo nombraba",
        "Porque el navegador lo impide",
        "Porque faltaba un spec",
      ],
      correctIndex: 1,
      explanation: "La página y el lienzo tienen estilos separados. Un prompt directo debe nombrar lo que quieres cambiar.",
    },
    {
      question: "Cambiaste cómo se dibujan las vidas. ¿Por qué ejecutar la regresión del spec 001?",
      options: [
        "Por costumbre y no sirve para nada",
        "Para comprobar que lo anterior sigue funcionando; aquí no cambió una regla y debe pasar",
        "Para borrar el spec",
        "Para cambiar el estado",
      ],
      correctIndex: 1,
      explanation: "La regresión es barata y confirma que un ajuste no rompió nada. En un cambio visual, lo normal es que pase.",
    },
    {
      question: "En la entrevista, Claude pregunta si el bloque cuenta para las colisiones durante la animación. ¿Por qué es una buena pregunta?",
      options: [
        "No lo es",
        "Porque si dos pelotas tocan el bloque a la vez, sin decidirlo se podría romper dos veces",
        "Porque decide el color",
        "Porque cambia el sonido",
      ],
      correctIndex: 1,
      explanation: "Es una decisión que no se ve venir. El spec la fija: el bloque deja de existir al romperse.",
    },
    {
      question: "¿Por qué avanzarExplosiones se llama antes de salir de paso cuando la fase no es jugando?",
      options: [
        "Por estética",
        "Para que la última explosión termine aunque se haya ganado la partida",
        "Para ganar velocidad",
        "No importa dónde",
      ],
      correctIndex: 1,
      explanation: "Si el reloj de las explosiones se detiene al cambiar la fase, la última queda congelada en pantalla.",
    },
    {
      question: "Un criterio del spec dice que se comprueba mirando el juego. ¿Es un problema?",
      options: [
        "Sí, todos deben ser automáticos",
        "No: es preferible un criterio manual honesto a uno automático que no comprueba lo que dice",
        "Sí, porque el validador lo rechaza",
        "Depende del día",
      ],
      correctIndex: 1,
      explanation: "Lo visual se mira jugando. Lo importante es que el criterio sea de sí o no y esté escrito con claridad.",
    },
    {
      question: "Tu script de criterios falla, pero el juego se ve bien. ¿Qué haces primero?",
      options: [
        "Cambias el código del juego",
        "Revisas si la prueba está bien puesta: la posición de la pelota, los datos",
        "Borras el script",
        "Ignoras el fallo",
      ],
      correctIndex: 1,
      explanation: "A veces la prueba tiene el error, como una pelota que toca dos bloques. Se revisa antes de tocar el código.",
    },
    {
      question: "¿Qué hace git branch -d spec/002-...?",
      options: [
        "Borra la rama aunque no esté integrada",
        "La borra solo si ya está integrada en main; si no, se niega",
        "La integra",
        "La duplica",
      ],
      correctIndex: 1,
      explanation: "-d es la opción segura. Con -D el borrado se fuerza y se puede perder trabajo.",
    },
    {
      question: "Trabajas en un equipo. ¿Cómo cierras el spec 002?",
      options: [
        "Con un push directo a main",
        "Subes la rama y abres un pull request para que otra persona lo revise e integre",
        "Borrando el repositorio",
        "No se cierra",
      ],
      correctIndex: 1,
      explanation: "En un equipo se revisa antes de integrar, y muchas veces main está protegida. El merge local es para práctica.",
    },
    {
      question: "¿Qué hace el alias opusplan?",
      options: [
        "Usa siempre Opus",
        "Usa Opus en modo plan y cambia a Sonnet al ejecutar",
        "Usa siempre Sonnet",
        "Desactiva el modo plan",
      ],
      correctIndex: 1,
      explanation: "Reparte el trabajo: razonamiento fuerte para planear y un modelo más eficiente para escribir código.",
    },
  ],
};
