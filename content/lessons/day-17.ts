import type { Lesson } from "@/lib/types";

// Día 17 · Clases 62 y 63 de la transcripción.
// Contenido verificado en noviembre de 2026.
export const day17: Lesson = {
  day: 17,
  slug: "spec-mvp-e-implementacion",
  title: "Spec MVP e implementación con /spec y /spec-impl",
  section: "Spec Driven Design",
  estimatedMinutes: 70,
  icon: "🎮",
  objectives: [
    "Partir de una frase con el problema, y responder la entrevista de /spec con decisiones concretas, no con probablemente.",
    "Revisar, validar y aprobar el spec de un MVP, y guardar un primer commit antes de implementar.",
    "Lanzar /spec-impl en una sesión limpia y seguir sus ocho pasos en una rama, con un commit por paso.",
    "Verificar los criterios de aceptación con un script y con una partida real, y ver qué pasa cuando uno falla.",
    "Integrar la rama a mano y reconocer qué decisiones el spec no cubrió.",
  ],
  blocks: [
    {
      type: "paragraph",
      text: "Es el día en que se usa todo lo anterior. Con el flujo del Día 15 y los skills spec y spec-impl del Día 16, vas a construir un juego de Arkanoid de principio a fin: una frase de problema, una entrevista, un spec aprobado y una implementación en ocho pasos que puedes revisar uno a uno. Es un MVP, lo mínimo para poder jugar y probar.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "1 frase", label: "Todo el problema que le das a /spec" },
        { value: "800 por 600", label: "Tamaño del lienzo del juego" },
        { value: "60", label: "Bloques: 10 columnas por 6 filas" },
        { value: "8", label: "Pasos del plan, con un commit por paso" },
        { value: "9", label: "Criterios de aceptación que se comprueban" },
        { value: "0", label: "Dependencias, imágenes y sonidos" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text: "Contenido verificado en noviembre de 2026. El spec, el código del juego, el script de criterios y los comandos de Git los ejecuté de verdad: el historial de ocho commits y el merge son reales. También probé el juego en un navegador: movimiento con el ratón y con las flechas, puntos, vidas, GAME OVER, ¡GANASTE! y reinicio con Enter. Lo que responde Claude en los ejercicios 2, 3 y 6 es orientativo, porque depende del modelo y su código será distinto del de referencia.",
    },
    { type: "heading", level: 2, text: "Preparar el proyecto" },
    {
      type: "paragraph",
      text: "Parte del proyecto 05-arkanoid del día anterior, con su README y los tres skills. Falta un CLAUDE.md pequeño. Claude Code puede generar uno con `/init`, pero para este ejercicio es mejor escribirlo tú: cuatro líneas con lo que Claude no puede deducir mirando el código. La guía oficial recomienda mantener cada CLAUDE.md por debajo de unas 200 líneas, porque los archivos largos consumen contexto y reducen el seguimiento. Cuanto más concreto y breve, mejor.",
    },
    {
      type: "code",
      lang: "markdown",
      title: "CLAUDE.md",
      code: `# Arkanoid

- HTML, CSS y JavaScript sin dependencias. Se juega abriendo index.html en el navegador.
- La lógica pura vive en logica.js y no toca el DOM. game.js dibuja y lee las entradas.
- Los specs viven en specs/. Se escriben con /spec y se implementan con /spec-impl.
- Responde siempre en español.`,
    },
    {
      type: "paragraph",
      text: "Una aclaración sobre estos archivos: son contexto, no configuración que se imponga. Claude los lee y suele seguirlos, pero si necesitas que algo ocurra siempre, sin excepción, eso va en un hook. La última línea, que responda en español, evita que a mitad de sesión cambie al inglés.",
    },
    {
      type: "paragraph",
      text: "El juego de esta lección se dibuja con figuras en el lienzo, sin imágenes ni sonidos. Así el spec es más corto y todo el comportamiento se puede comprobar con un script. Las imágenes y el audio son perfectos para otro spec.",
    },
    { type: "heading", level: 2, text: "Parte 1: del problema al spec con /spec" },
    {
      type: "paragraph",
      text: "Abre Claude Code en la carpeta y escribe /spec seguido de una sola frase que describa el problema. Es lo único que necesitas: el skill se encarga de entrevistarte.",
    },
    {
      type: "code",
      lang: "text",
      title: "En Claude Code",
      code: `/spec Quiero un Arkanoid mínimo que se pueda jugar en el navegador`,
    },
    {
      type: "paragraph",
      text: "La palabra clave es mínimo. Un MVP es lo mínimo necesario para probar algo, y sobre él se construye después. Claude te hará preguntas cortas, de tres en tres, con opciones y una recomendación. Puede sugerir más de lo que necesitas: sonidos, explosiones, varios niveles. Tú decides, y lo que no quieres, lo dices.",
    },
    {
      type: "image",
      src: "/img/dia-17/decisiones-concretas.svg",
      alt: "Tabla con tres columnas: lo que pregunta Claude, una respuesta vaga y una decisión concreta. Niveles: quizá varios frente a un único nivel. Tamaño: algo grande frente a 800 por 600 con 10 columnas y 6 filas. Sonido: sería bueno añadirlo frente a no en este spec. Física: lo más realista posible frente a rebote simple.",
      caption: "Si respondes con quizás, Claude decide por ti. Escríbelo concreto.",
    },
    {
      type: "paragraph",
      text: "Estas son las decisiones que se toman en la entrevista del ejemplo. Respóndelas con tus propias palabras, pero con esa precisión.",
    },
    {
      type: "table",
      headers: ["Tema", "Lo que decides", "Por qué conviene"],
      rows: [
        ["Pantallas", "Sin pantalla de inicio. Una capa al terminar, con GAME OVER o ¡GANASTE!.", "Menos pantallas, menos código que revisar."],
        ["Vidas y puntos", "Tres vidas. Diez puntos por bloque, nada más.", "Es el mínimo que hace que haya partida."],
        ["Control", "Ratón y teclado a la vez.", "Se puede jugar con cualquiera de los dos."],
        ["Niveles", "Un único nivel.", "Se prueba el juego completo cuanto antes."],
        ["Tablero", "800 por 600, con 10 columnas y 6 filas de bloques.", "Son cifras que se comprueban."],
        ["Física", "Rebote simple, que invierte la velocidad.", "Predecible y fácil de revisar."],
        ["Explosiones y sonidos", "No entran. Los bloques solo desaparecen.", "Se añadirán en otro spec."],
        ["Plan", "Pasos pequeños y probables. Si Claude añade audio, lo quitas.", "Cada paso es un punto de control."],
      ],
    },
    {
      type: "paragraph",
      text: "Al final, Claude te propondrá un nombre de archivo, como 001-mvp-arkanoid, y te pedirá permiso para crear la carpeta specs y el documento. Como el skill solo pre-aprueba la lectura, normalmente te pedirá permiso para escribir: es el momento de decir sí. Este es el resultado de referencia. El tuyo variará en las palabras, pero debe tener las mismas seis secciones.",
    },
    {
      type: "code",
      lang: "markdown",
      title: "specs/001-mvp-arkanoid.md",
      code: `---
estado: borrador
---
# 001 MVP jugable de Arkanoid
## Objetivo
Que se pueda jugar una partida completa de Arkanoid en el navegador: mover la paleta, romper bloques con la pelota y ganar o perder.
## Alcance
Entra:
- Un lienzo de 800 por 600 píxeles, con HTML, CSS y JavaScript sin dependencias.
- Un único nivel con 60 bloques, en 10 columnas y 6 filas.
- Tres vidas y 10 puntos por bloque.
- Control de la paleta con el ratón y con las flechas del teclado a la vez.
- Rebote simple de la pelota contra las paredes, la paleta y los bloques.
- Pantalla final con GAME OVER si se pierden las tres vidas, o ¡GANASTE! si se rompen todos los bloques.

No entra:
- Sonidos, imágenes, animaciones de explosión ni power-ups.
- Varios niveles, puntuaciones máximas ni guardado.
- Una pantalla de inicio aparte.
- Un ángulo de rebote que dependa de la zona de la paleta.
## Modelo de datos
- juego: fase (jugando, gameover o ganaste), vidas, puntos, paleta, bola y bloques.
- paleta: x, y, w, h.
- bola: x, y, vx, vy.
- bloque: x, y, w, h, fila y vivo.
## Plan de implementación
1. Estructura base: index.html con el lienzo de 800 por 600, logica.js y game.js.
2. Estado y bucle: crear el juego y dibujarlo en un bucle con requestAnimationFrame.
3. Paleta: moverla con el ratón y con las flechas sin que salga del lienzo.
4. Pelota: moverla, y que rebote en las paredes y en la paleta.
5. Bloques: dibujar 60 bloques y romperlos al tocarlos, sumando 10 puntos.
6. Vidas: restar una vida al caer la pelota y reiniciarla, y terminar con GAME OVER al llegar a 0.
7. Victoria y reinicio: mostrar ¡GANASTE! sin bloques, y reiniciar con Enter.
8. Verificar los criterios con scripts/probar-criterios.js y pasar el estado a implementado.
## Criterios de aceptación
- [ ] El lienzo mide 800 por 600 píxeles.
- [ ] Al empezar hay 60 bloques, 3 vidas y 0 puntos.
- [ ] La paleta nunca sale del lienzo, ni por la izquierda ni por la derecha.
- [ ] Romper un bloque suma 10 puntos y lo hace desaparecer.
- [ ] Si la pelota cae, se pierde una vida y la pelota vuelve a empezar.
- [ ] Con 0 vidas la fase es gameover y la pelota deja de moverse.
- [ ] Con 0 bloques la fase es ganaste.
- [ ] node --check no da errores en logica.js ni en game.js.
- [ ] El código no usa audio ni archivos de imagen.
## Decisiones
- Tomada: un único nivel, para probar el juego completo cuanto antes.
- Tomada: rebote simple que invierte la velocidad, porque la física es predecible.
- Tomada: ratón y teclado a la vez, para que se pueda jugar con cualquiera.
- Tomada: separar la lógica en logica.js, para poder probarla con Node.
- Descartada: sonidos y explosiones, porque se añadirán en otro spec.
- Descartada: ángulo de rebote por zona de la paleta, porque complica el MVP.`,
    },
    { type: "heading", level: 2, text: "Revisar y aprobar" },
    {
      type: "paragraph",
      text: "Lee el spec entero antes de seguir. Mira que lo que no quieres esté en No entra, que el plan tenga pasos pequeños y que cada criterio se responda con sí o no. Pasa el validador del Día 15: comprueba la forma, no el sentido. Después, aprueba tú mismo cambiando la línea del estado. El skill spec-impl se detiene si no encuentra exactamente la palabra aprobado, y es mejor tener una sola convención que aceptar sinónimos, que cada persona escribiría distinto.",
    },
    {
      type: "paragraph",
      text: "Luego, guarda un primer commit en main. No es un detalle: spec-impl revisa que no haya cambios sin guardar y crea su rama desde ese punto. Si el repositorio no existe, no puede hacerlo.",
    },
    { type: "heading", level: 2, text: "Parte 2: implementarlo con /spec-impl" },
    {
      type: "paragraph",
      text: "Haz un `/clear` antes de empezar. Toda la conversación anterior ya está resumida en el spec, y un contexto limpio rinde mejor, algo que la guía oficial de buenas prácticas recomienda para construir desde un spec. Luego, el spec número 001 se implementa con un comando.",
    },
    {
      type: "code",
      lang: "text",
      title: "En Claude Code",
      code: `/clear
/spec-impl 001`,
    },
    {
      type: "paragraph",
      text: "El skill lee `specs/001-*.md` y comprueba que el estado sea aprobado. Después revisa con git status que no haya cambios sin guardar, crea la rama spec/001-mvp-arkanoid y te pregunta si empieza. A partir de ahí, avanza paso a paso: hace un cambio pequeño, lo muestra, hace un commit y espera tu confirmación.",
    },
    {
      type: "image",
      src: "/img/dia-17/ramas-y-pasos.svg",
      alt: "Dos líneas. Arriba, la rama main con el primer commit del spec aprobado a la izquierda y el merge manual a la derecha. Abajo, la rama spec/001 con ocho commits numerados: lienzo, bucle, paleta, pelota, bloques, vidas, victoria y criterios. Debajo, dos notas: qué ocurre en cada paso y qué se gana con la rama.",
      caption: "El trabajo vive en una rama. El merge, al final, es una decisión tuya.",
    },
    {
      type: "paragraph",
      text: "Aquí está el valor del método. En lugar de un bloque enorme de código imposible de leer, recibes ocho cambios pequeños que puedes entender. Entre paso y paso abre `git show`, o la vista de cambios de tu editor, y pregúntate si lo que ves es lo que dice el spec. Si algo se tuerce, lo corriges en ese momento y no cuando ya hay mil líneas.",
    },
    {
      type: "table",
      headers: ["Paso", "Qué añade", "Cómo lo compruebas"],
      rows: [
        ["1. Estructura base", "index.html con el lienzo de 800 por 600, y logica.js y game.js casi vacíos.", "Abres index.html: ves un rectángulo oscuro."],
        ["2. Estado y bucle", "nuevoJuego, el bucle con requestAnimationFrame y los textos de puntos y vidas.", "Aparecen Puntos: 0 y Vidas: 3."],
        ["3. Paleta", "moverPaleta y colocarPaleta, ratón y flechas, y un límite en los bordes.", "La paleta sigue al ratón y no sale del lienzo."],
        ["4. Pelota", "bolaInicial, paso y los rebotes en paredes y paleta.", "La pelota rebota y, si cae, desaparece por abajo."],
        ["5. Bloques", "crearBloques, el dibujo por colores y la colisión con 10 puntos.", "Hay 60 bloques y se rompen al tocarlos."],
        ["6. Vidas", "perderVida y la capa de GAME OVER.", "Tras tres caídas, todo se detiene."],
        ["7. Victoria y reinicio", "La fase ganaste, el texto ¡GANASTE! y la tecla Enter.", "Enter empieza una partida nueva."],
        ["8. Criterios", "scripts/probar-criterios.js y el estado del spec en implementado.", "El script termina con todos los criterios en OK."],
      ],
    },
    {
      type: "callout",
      variant: "info",
      text: "Si quieres saltarte un paso porque ya lo ves bien, díselo a Claude. Pero con cada paso omitido pierdes un punto de control y un commit, y el valor del método está justo ahí. Acuérdate de hacer los commits: es fácil dejar uno para después, y entonces el cambio queda mezclado con el siguiente.",
    },
    { type: "heading", level: 2, text: "El código de referencia" },
    {
      type: "paragraph",
      text: "El resultado de Claude será distinto del tuyo en nombres y detalles, y es normal. Pero esta es la estructura que debería quedar, y es la que se usa para las comprobaciones de la lección. Un detalle de diseño: la lógica vive en logica.js y no toca el DOM, y game.js solo dibuja y lee las entradas. Gracias a eso, un script de Node puede probar las reglas del juego sin abrir un navegador.",
    },
    {
      type: "image",
      src: "/img/dia-17/archivos-del-juego.svg",
      alt: "index.html carga dos archivos. logica.js contiene las reglas del juego y no toca el DOM. game.js dibuja en el lienzo y lee el ratón y el teclado, usando las funciones de logica.js. Debajo de logica.js, el script probar-criterios.js que la comprueba con Node. Debajo de game.js, el navegador donde de verdad se juega.",
      caption: "Separar reglas y dibujo es lo que permite probar sin navegador.",
    },
    {
      type: "code",
      lang: "html",
      title: "index.html",
      code: `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Arkanoid</title>
  <style>
    body { margin: 0; background: #0d1224; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
    canvas { background: #1b2540; border: 2px solid #4a557a; }
  </style>
</head>
<body>
  <canvas id="lienzo" width="800" height="600"></canvas>
  <script src="logica.js"></script>
  <script src="game.js"></script>
</body>
</html>`,
    },
    {
      type: "code",
      lang: "js",
      title: "logica.js",
      code: `// Lógica pura del juego. No toca el DOM, así se puede probar con Node.
const CFG = {
  ancho: 800,
  alto: 600,
  vidas: 3,
  puntosPorBloque: 10,
  paleta: { w: 100, h: 14, y: 560, vel: 520 },
  bola: { r: 8, vel: 320 },
  bloques: { cols: 10, filas: 6, w: 70, h: 24, hueco: 6, arriba: 60 },
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

function paso(juego, dt) {
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
  };
}`,
    },
    {
      type: "code",
      lang: "js",
      title: "game.js",
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
  ctx.textAlign = "right";
  ctx.fillText("Vidas: " + juego.vidas, CFG.ancho - 12, 24);
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
    {
      type: "image",
      src: "/img/dia-17/fases-del-juego.svg",
      alt: "Tres estados: jugando en el centro, gameover a la izquierda y ganaste a la derecha. De jugando se va a gameover con cero vidas y a ganaste con cero bloques. Si la pelota cae y quedan vidas, resta una y reinicia la pelota sin salir de jugando. De los otros dos estados se vuelve a jugando con Enter, con tres vidas y sesenta bloques.",
      caption: "Fuera de la fase jugando, nada se mueve. Por eso el GAME OVER es estable.",
    },
    {
      type: "paragraph",
      text: "La pieza que explica el comportamiento es la función `paso`. Si la fase no es jugando, devuelve de inmediato. Por eso, con 0 vidas o con 0 bloques, la pelota se queda quieta. Es también un criterio del spec, y por eso se prueba.",
    },
    { type: "heading", level: 2, text: "Verificar los criterios" },
    {
      type: "paragraph",
      text: "El último paso del plan es comprobar cada criterio con evidencia, y no un simple todo pasa. Este script ejecuta los que se pueden verificar sin navegador. Cada línea se corresponde con una casilla del spec, y el código de salida es 1 si alguna falla, por lo que sirve en una integración continua.",
    },
    {
      type: "code",
      lang: "js",
      title: "scripts/probar-criterios.js",
      code: `// Comprueba los criterios del spec 001 que se pueden verificar sin navegador.
const fs = require("fs");
const { execFileSync } = require("child_process");
const { CFG, nuevoJuego, moverPaleta, colocarPaleta, paso } = require("../logica.js");

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
j.bloques.forEach((b) => (b.vivo = false));
paso(j, 0.001);
criterio("Con 0 bloques la fase es ganaste", j.fase === "ganaste");

let sintaxis = true;
try {
  execFileSync("node", ["--check", "logica.js"]);
  execFileSync("node", ["--check", "game.js"]);
} catch (e) {
  sintaxis = false;
}
criterio("node --check no da errores en logica.js ni en game.js", sintaxis);

const codigo = fs.readFileSync("logica.js", "utf8") + fs.readFileSync("game.js", "utf8");
criterio("El código no usa audio ni archivos de imagen", !/new Audio|new Image|\\.(png|jpe?g|gif|mp3|wav)\\b/i.test(codigo));

console.log(fallos === 0 ? "RESULTADO: todos los criterios se cumplen" : "RESULTADO: " + fallos + " criterio(s) fallan");
process.exit(fallos === 0 ? 0 : 1);`,
    },
    {
      type: "paragraph",
      text: "El script no sustituye a jugar. Comprueba reglas, no sensaciones. Cosas como que la pelota rebota donde se espera, que la paleta sigue al ratón o que el texto se lee bien se miran en el navegador. En las lecciones de Playwright verás cómo automatizar también esa parte.",
    },
    {
      type: "paragraph",
      text: "En la prueba que hice con el código de referencia, un jugador automático que mueve la paleta bajo la pelota rompió 24 bloques en 40 segundos, con 14 rebotes en la paleta y sin perder ninguna vida. Sin nadie moviendo la paleta, la pelota se perdió tres veces y apareció GAME OVER. Las dos situaciones están en los criterios.",
    },
    { type: "heading", level: 2, text: "Lo que el spec no cubrió" },
    {
      type: "paragraph",
      text: "Al jugar aparecen cosas que no estaban en el spec. En esta versión, la pelota vuelve a salir sola, de inmediato, cuando pierdes una vida, y no hay forma de prepararte. Ninguna cumple ni incumple un criterio, porque el spec no decía nada. Tampoco el color de fondo ni la velocidad. Son ajustes de gusto.",
    },
    {
      type: "paragraph",
      text: "La regla es sencilla. Si un ajuste es pequeño y claro, se pide con un prompt directo. Si es una decisión nueva con consecuencias, se escribe otro spec. Qué lado de esa línea es cada cosa se discute en el Día 18. Por ahora, apunta lo que te molesta y no añadas funciones nuevas a este MVP.",
    },
    { type: "heading", level: 2, text: "Ejercicios guiados y experimentos" },
    {
      type: "paragraph",
      text: "Los ejercicios 1, 4, 5, 7, 8 y 9 se ejecutan con Git y Node y sus salidas son reales. Los ejercicios 2, 3 y 6 usan Claude Code, y lo que responde es orientativo. Los experimentos del final se ejecutan en el navegador.",
    },
    {
      type: "exercise",
      title: "Ejercicio 1: preparar el proyecto",
      description: "Entra en el proyecto del Día 16 y añade CLAUDE.md.",
      steps: [
        {
          instruction: "Ve a la carpeta del proyecto y comprueba que están los tres skills.",
          command: "cd ~/ClaudeCode/05-arkanoid && node scripts/listar-skills.js",
          expected: "/breve | tú y Claude | Responde de forma muy breve. Úsalo cuando la per\n/spec | solo tú | Escribe un spec en specs/ con seis secciones, de\n/spec-impl | solo tú | Implementa un spec aprobado por pasos, en una ra",
        },
        {
          instruction: "Guarda el CLAUDE.md.",
          file: {
            name: "CLAUDE.md",
            code: `# Arkanoid

- HTML, CSS y JavaScript sin dependencias. Se juega abriendo index.html en el navegador.
- La lógica pura vive en logica.js y no toca el DOM. game.js dibuja y lee las entradas.
- Los specs viven en specs/. Se escriben con /spec y se implementan con /spec-impl.
- Responde siempre en español.`,
          },
        },
        {
          instruction: "Comprueba cuántas líneas tiene. Debe ser muy corto.",
          command: "wc -l CLAUDE.md",
          expected: "       6 CLAUDE.md",
        },
      ],
      verify: "Hay tres skills y un CLAUDE.md de seis líneas.",
    },
    {
      type: "exercise",
      title: "Ejercicio 2: lanzar /spec con una frase",
      description: "Describe el problema, no la solución.",
      steps: [
        {
          instruction: "Abre Claude Code y lanza el skill con una sola frase.",
          command: "claude\n/spec Quiero un Arkanoid mínimo que se pueda jugar en el navegador",
          expected: "Claude lee el README y el CLAUDE.md, lista specs/ y empieza a hacerte preguntas cortas, de tres en tres, con opciones: pantallas, vidas, controles, puntos.",
        },
      ],
      verify: "Claude no escribe código ni archivos todavía. Solo pregunta.",
    },
    {
      type: "exercise",
      title: "Ejercicio 3: responder con decisiones",
      description: "Responde con la tabla de la lección. Sin quizás.",
      steps: [
        {
          instruction: "Contesta al primer bloque de preguntas con decisiones concretas.",
          command: "Sin pantalla de inicio: una capa al terminar con GAME OVER o ¡GANASTE!. Tres vidas, 10 puntos por bloque. Control con ratón y teclado a la vez.",
          expected: "Claude confirma las decisiones y pasa a las siguientes: niveles, tamaño del tablero, física.",
        },
        {
          instruction: "Contesta al siguiente bloque, y dile que no a lo que propone de más.",
          command: "Un único nivel, lienzo de 800 por 600 con 10 columnas y 6 filas de bloques, rebote simple. No quiero sonidos ni explosiones ni imágenes: los bloques solo desaparecen.",
          expected: "Claude presenta el plan de implementación, los criterios y las decisiones, sección por sección, y te pide confirmar cada una.",
        },
        {
          instruction: "Cuando te proponga el nombre y la ruta, confírmalos. Te pedirá permiso para escribir el archivo.",
          command: "Sí, guárdalo como specs/001-mvp-arkanoid.md",
          expected: "Se crea specs/001-mvp-arkanoid.md con estado: borrador.",
        },
      ],
      verify: "El spec tiene seis secciones y en No entra están los sonidos y las explosiones.",
    },
    {
      type: "exercise",
      title: "Ejercicio 4: revisar y validar el spec",
      description: "Si prefieres el spec de referencia, guárdalo y valídalo.",
      steps: [
        {
          instruction: "Guarda el spec de referencia, o compáralo con el tuyo.",
          file: {
            name: "specs/001-mvp-arkanoid.md",
            code: `---
estado: borrador
---
# 001 MVP jugable de Arkanoid
## Objetivo
Que se pueda jugar una partida completa de Arkanoid en el navegador: mover la paleta, romper bloques con la pelota y ganar o perder.
## Alcance
Entra:
- Un lienzo de 800 por 600 píxeles, con HTML, CSS y JavaScript sin dependencias.
- Un único nivel con 60 bloques, en 10 columnas y 6 filas.
- Tres vidas y 10 puntos por bloque.
- Control de la paleta con el ratón y con las flechas del teclado a la vez.
- Rebote simple de la pelota contra las paredes, la paleta y los bloques.
- Pantalla final con GAME OVER si se pierden las tres vidas, o ¡GANASTE! si se rompen todos los bloques.

No entra:
- Sonidos, imágenes, animaciones de explosión ni power-ups.
- Varios niveles, puntuaciones máximas ni guardado.
- Una pantalla de inicio aparte.
- Un ángulo de rebote que dependa de la zona de la paleta.
## Modelo de datos
- juego: fase (jugando, gameover o ganaste), vidas, puntos, paleta, bola y bloques.
- paleta: x, y, w, h.
- bola: x, y, vx, vy.
- bloque: x, y, w, h, fila y vivo.
## Plan de implementación
1. Estructura base: index.html con el lienzo de 800 por 600, logica.js y game.js.
2. Estado y bucle: crear el juego y dibujarlo en un bucle con requestAnimationFrame.
3. Paleta: moverla con el ratón y con las flechas sin que salga del lienzo.
4. Pelota: moverla, y que rebote en las paredes y en la paleta.
5. Bloques: dibujar 60 bloques y romperlos al tocarlos, sumando 10 puntos.
6. Vidas: restar una vida al caer la pelota y reiniciarla, y terminar con GAME OVER al llegar a 0.
7. Victoria y reinicio: mostrar ¡GANASTE! sin bloques, y reiniciar con Enter.
8. Verificar los criterios con scripts/probar-criterios.js y pasar el estado a implementado.
## Criterios de aceptación
- [ ] El lienzo mide 800 por 600 píxeles.
- [ ] Al empezar hay 60 bloques, 3 vidas y 0 puntos.
- [ ] La paleta nunca sale del lienzo, ni por la izquierda ni por la derecha.
- [ ] Romper un bloque suma 10 puntos y lo hace desaparecer.
- [ ] Si la pelota cae, se pierde una vida y la pelota vuelve a empezar.
- [ ] Con 0 vidas la fase es gameover y la pelota deja de moverse.
- [ ] Con 0 bloques la fase es ganaste.
- [ ] node --check no da errores en logica.js ni en game.js.
- [ ] El código no usa audio ni archivos de imagen.
## Decisiones
- Tomada: un único nivel, para probar el juego completo cuanto antes.
- Tomada: rebote simple que invierte la velocidad, porque la física es predecible.
- Tomada: ratón y teclado a la vez, para que se pueda jugar con cualquiera.
- Tomada: separar la lógica en logica.js, para poder probarla con Node.
- Descartada: sonidos y explosiones, porque se añadirán en otro spec.
- Descartada: ángulo de rebote por zona de la paleta, porque complica el MVP.`,
          },
        },
        {
          instruction: "Pásale el validador del Día 15.",
          command: "node scripts/validar-spec.js specs/001-mvp-arkanoid.md",
          expected: "OK sección: Objetivo\nOK sección: Alcance\nOK sección: Modelo de datos\nOK sección: Plan de implementación\nOK sección: Criterios de aceptación\nOK sección: Decisiones\nRESULTADO: spec válido",
        },
      ],
      verify: "El validador da spec válido. Eso comprueba la forma: que el contenido sea lo que quieres lo decides tú.",
    },
    {
      type: "exercise",
      title: "Ejercicio 5: aprobar y hacer el primer commit",
      description: "La aprobación es manual, y el primer commit deja main lista.",
      steps: [
        {
          instruction: "Abre el spec y cambia la línea estado: borrador por estado: aprobado. Comprueba la cabecera.",
          command: "head -3 specs/001-mvp-arkanoid.md",
          expected: "---\nestado: aprobado\n---",
        },
        {
          instruction: "Inicializa el repositorio y guarda todo.",
          command: "git init -q -b main && git add -A && git commit -q -m \"primer commit\" && git status --porcelain && git branch --show-current",
          expected: "main",
        },
      ],
      verify: "git status no mostró nada: no hay cambios sin guardar, que es lo que spec-impl comprueba.",
    },
    {
      type: "exercise",
      title: "Ejercicio 6: lanzar /spec-impl en una sesión limpia",
      description: "Deja que Claude avance por pasos, y revisa cada uno.",
      steps: [
        {
          instruction: "Abre Claude Code y limpia el contexto. Luego lanza la implementación.",
          command: "claude\n/clear\n/spec-impl 001",
          expected: "Claude lee el spec, comprueba el estado, ejecuta git status y crea la rama spec/001-mvp-arkanoid. Te pregunta si empieza.",
        },
        {
          instruction: "Confirma y, tras cada paso, mira el commit que acaba de hacer en otra terminal antes de aceptar el siguiente.",
          command: "git show --stat --format=%s",
          expected: "El mensaje del commit y los archivos que cambió ese paso. En el paso 1: index.html, logica.js y game.js.",
        },
        {
          instruction: "Comprueba la rama en la que estás.",
          command: "git branch --show-current",
          expected: "spec/001-mvp-arkanoid",
        },
      ],
      verify: "Estás en una rama spec/001-... y no en main. Cada paso termina con un commit.",
    },
    {
      type: "exercise",
      title: "Ejercicio 7: el código de referencia",
      description: "Si tu código no te convence, o quieres seguir la lección al pie de la letra, usa el de referencia.",
      steps: [
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
    body { margin: 0; background: #0d1224; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
    canvas { background: #1b2540; border: 2px solid #4a557a; }
  </style>
</head>
<body>
  <canvas id="lienzo" width="800" height="600"></canvas>
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
const CFG = {
  ancho: 800,
  alto: 600,
  vidas: 3,
  puntosPorBloque: 10,
  paleta: { w: 100, h: 14, y: 560, vel: 520 },
  bola: { r: 8, vel: 320 },
  bloques: { cols: 10, filas: 6, w: 70, h: 24, hueco: 6, arriba: 60 },
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

function paso(juego, dt) {
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
  ctx.textAlign = "right";
  ctx.fillText("Vidas: " + juego.vidas, CFG.ancho - 12, 24);
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
          instruction: "Comprueba la sintaxis de los dos scripts. Sin errores, no escribe nada.",
          command: "node --check logica.js && node --check game.js && echo sintaxis correcta",
          expected: "sintaxis correcta",
        },
        {
          instruction: "Guarda los cambios, para poder volver atrás en el siguiente ejercicio.",
          command: "git add -A && git commit -q -m \"juego de referencia\" && git status --porcelain && echo limpio",
          expected: "limpio",
        },
      ],
      verify: "Los dos archivos pasan node --check y no quedan cambios sin guardar.",
    },
    {
      type: "exercise",
      title: "Ejercicio 8: verificar los criterios, y romperlos",
      description: "Pasa el script y comprueba que detecta un fallo.",
      steps: [
        {
          instruction: "Guarda el script de criterios.",
          file: {
            name: "scripts/probar-criterios.js",
            code: `// Comprueba los criterios del spec 001 que se pueden verificar sin navegador.
const fs = require("fs");
const { execFileSync } = require("child_process");
const { CFG, nuevoJuego, moverPaleta, colocarPaleta, paso } = require("../logica.js");

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
j.bloques.forEach((b) => (b.vivo = false));
paso(j, 0.001);
criterio("Con 0 bloques la fase es ganaste", j.fase === "ganaste");

let sintaxis = true;
try {
  execFileSync("node", ["--check", "logica.js"]);
  execFileSync("node", ["--check", "game.js"]);
} catch (e) {
  sintaxis = false;
}
criterio("node --check no da errores en logica.js ni en game.js", sintaxis);

const codigo = fs.readFileSync("logica.js", "utf8") + fs.readFileSync("game.js", "utf8");
criterio("El código no usa audio ni archivos de imagen", !/new Audio|new Image|\\.(png|jpe?g|gif|mp3|wav)\\b/i.test(codigo));

console.log(fallos === 0 ? "RESULTADO: todos los criterios se cumplen" : "RESULTADO: " + fallos + " criterio(s) fallan");
process.exit(fallos === 0 ? 0 : 1);`,
          },
        },
        {
          instruction: "Ejecútalo.",
          command: "node scripts/probar-criterios.js",
          expected: "OK    El lienzo mide 800 por 600 píxeles\nOK    Al empezar hay 60 bloques, 3 vidas y 0 puntos\nOK    La paleta nunca sale del lienzo\nOK    Romper un bloque suma 10 puntos y lo hace desaparecer\nOK    Si la pelota cae, se pierde una vida y vuelve a empezar\nOK    Con 0 vidas la fase es gameover y la pelota deja de moverse\nOK    Con 0 bloques la fase es ganaste\nOK    node --check no da errores en logica.js ni en game.js\nOK    El código no usa audio ni archivos de imagen\nRESULTADO: todos los criterios se cumplen",
        },
        {
          instruction: "En logica.js, cambia puntosPorBloque: 10 por puntosPorBloque: 5 y vuelve a ejecutarlo. Mira solo la línea que falla.",
          command: "node scripts/probar-criterios.js | grep -v '^OK'",
          expected: "FALLA Romper un bloque suma 10 puntos y lo hace desaparecer\nRESULTADO: 1 criterio(s) fallan",
        },
        {
          instruction: "Deshaz el cambio con Git.",
          command: "git restore logica.js && node scripts/probar-criterios.js | tail -1",
          expected: "RESULTADO: todos los criterios se cumplen",
        },
      ],
      verify: "El script detectó el cambio, y tras git restore vuelve a pasar. Un criterio que no puede fallar no sirve para nada.",
    },
    {
      type: "exercise",
      title: "Ejercicio 9: jugar e integrar a mano",
      description: "Prueba el juego en el navegador y, si estás conforme, haz el merge tú.",
      steps: [
        {
          instruction: "Abre index.html en el navegador y comprueba: la paleta sigue al ratón y a las flechas, la pelota rebota, los bloques se rompen y suman 10 puntos, tres caídas dan GAME OVER, y con Enter empieza otra partida.",
          command: "open index.html",
          expected: "Un lienzo de 800 por 600 con 60 bloques de seis colores, una paleta abajo y una pelota que se mueve. Arriba, Puntos y Vidas.",
        },
        {
          instruction: "Guarda lo que quede y pasa a main. El merge es tuyo: spec-impl no lo hace.",
          command: "git add -A && git commit -q -m \"scripts de criterios\"; git switch main",
          expected: "Switched to branch 'main'",
        },
        {
          instruction: "Integra la rama con un commit de merge.",
          command: "git merge --no-ff spec/001-mvp-arkanoid -m \"merge: spec 001 MVP de Arkanoid\"",
          expected: "Merge made by the 'ort' strategy.\n game.js                     |  68 +++++++++++++++++++\n index.html                  |  16 +++++\n logica.js                   | 125 ++++++++++++++++++++++++++++++++++++++++++++\n scripts/probar-criterios.js |  70 ++++++++++++++++++++\n specs/001-mvp-arkanoid.md   |   2 +-\n 5 files changed, 280 insertions(+), 1 deletion(-)\n create mode 100644 game.js\n create mode 100644 index.html\n create mode 100644 logica.js\n create mode 100644 scripts/probar-criterios.js",
        },
      ],
      verify: "main contiene el juego y el spec en estado implementado. Las cifras de líneas pueden variar en tu proyecto. Si no había nada que guardar, git commit lo avisa y el comando sigue.",
    },
    {
      type: "playground",
      title: "Experimento 10: el rebote simple",
      description: "Simula la pelota con la velocidad del juego y cuenta sus rebotes en las paredes. Cambia la velocidad inicial y mira cuándo toca cada pared.",
      code: `const ANCHO = 800;
const R = 8;
let x = 400, y = 559, vx = 192, vy = -256;
const dt = 0.05;
let t = 0;
const eventos = [];
while (t < 8 && eventos.length < 6) {
  x += vx * dt;
  y += vy * dt;
  t += dt;
  if (x < R) { x = R; vx = Math.abs(vx); eventos.push("t=" + t.toFixed(2) + " s: pared izquierda"); }
  if (x > ANCHO - R) { x = ANCHO - R; vx = -Math.abs(vx); eventos.push("t=" + t.toFixed(2) + " s: pared derecha"); }
  if (y < R) { y = R; vy = Math.abs(vy); eventos.push("t=" + t.toFixed(2) + " s: techo"); }
}
eventos.forEach((e) => console.log(e));
console.log("velocidad total: " + Math.round(Math.hypot(vx, vy)) + " px/s");`,
      expected: "t=2.05 s: pared derecha\nt=2.20 s: techo\nt=6.15 s: pared izquierda\nvelocidad total: 320 px/s",
    },
    {
      type: "playground",
      title: "Experimento 11: la rejilla de bloques",
      description: "Calcula dónde cae cada bloque y el margen a cada lado, con las medidas del juego. Cambia las columnas y comprueba que sigan cabiendo en 800 píxeles.",
      code: `const c = { ancho: 800, cols: 10, filas: 6, w: 70, h: 24, hueco: 6, arriba: 60 };
const anchoTotal = c.cols * c.w + (c.cols - 1) * c.hueco;
const margen = (c.ancho - anchoTotal) / 2;
function bloque(fila, col) {
  return { x: margen + col * (c.w + c.hueco), y: c.arriba + fila * (c.h + c.hueco) };
}
const primero = bloque(0, 0);
const ultimo = bloque(c.filas - 1, c.cols - 1);
console.log("Bloques: " + c.cols * c.filas);
console.log("Ancho del bloque de bloques: " + anchoTotal + " px");
console.log("Margen a cada lado: " + margen + " px");
console.log("Primero: x=" + primero.x + ", y=" + primero.y);
console.log("Último: x=" + ultimo.x + ", y=" + ultimo.y + ", termina en x=" + (ultimo.x + c.w));`,
      expected: "Bloques: 60\nAncho del bloque de bloques: 754 px\nMargen a cada lado: 23 px\nPrimero: x=23, y=60\nÚltimo: x=707, y=210, termina en x=777",
    },
    {
      type: "playground",
      title: "Experimento 12: puntos, vidas y fase",
      description: "Una partida es una secuencia de eventos. Aplica romper y caer y comprueba la fase final. Prueba otras secuencias: fíjate en qué pasa con lo que llega después de GAME OVER.",
      code: `function nuevo() {
  return { fase: "jugando", vidas: 3, puntos: 0, bloques: 60 };
}
function aplicar(j, evento) {
  if (j.fase !== "jugando") return j;
  if (evento === "romper") {
    j.bloques -= 1;
    j.puntos += 10;
    if (j.bloques === 0) j.fase = "ganaste";
  }
  if (evento === "caer") {
    j.vidas -= 1;
    if (j.vidas === 0) j.fase = "gameover";
  }
  return j;
}
function jugar(eventos) {
  const j = nuevo();
  eventos.forEach((e) => aplicar(j, e));
  return j.fase + " | vidas " + j.vidas + " | puntos " + j.puntos + " | bloques " + j.bloques;
}
console.log(jugar(["romper", "romper", "caer"]));
console.log(jugar(["caer", "caer", "caer", "romper"]));
console.log(jugar(Array(60).fill("romper")));
console.log(jugar(["romper", "caer", "caer", "romper", "caer", "romper"]));`,
      expected: "jugando | vidas 2 | puntos 20 | bloques 58\ngameover | vidas 0 | puntos 0 | bloques 60\nganaste | vidas 3 | puntos 600 | bloques 0\ngameover | vidas 0 | puntos 20 | bloques 58",
    },
    {
      type: "playground",
      title: "Experimento 13: criterios que pueden fallar",
      description: "Los criterios del spec como una lista de comprobaciones. Cambia las cifras de CFG, por ejemplo cols: 12 o puntosPorBloque: 5, y mira cuáles fallan.",
      code: `const CFG = { vidas: 3, puntosPorBloque: 10, filas: 6, cols: 10 };
const criterios = [
  ["Al empezar hay 60 bloques", () => CFG.filas * CFG.cols === 60],
  ["Al empezar hay 3 vidas", () => CFG.vidas === 3],
  ["Romper un bloque suma 10 puntos", () => CFG.puntosPorBloque === 10],
  ["Romper los 60 bloques da 600 puntos", () => CFG.filas * CFG.cols * CFG.puntosPorBloque === 600],
  ["Los bloques caben en 800 px", () => CFG.cols * 70 + (CFG.cols - 1) * 6 <= 800],
];
let fallos = 0;
criterios.forEach(([nombre, comprobar]) => {
  const ok = comprobar();
  if (!ok) fallos++;
  console.log((ok ? "OK    " : "FALLA ") + nombre);
});
console.log(fallos === 0 ? "RESULTADO: todos los criterios se cumplen" : "RESULTADO: " + fallos + " criterio(s) fallan");`,
      expected: "OK    Al empezar hay 60 bloques\nOK    Al empezar hay 3 vidas\nOK    Romper un bloque suma 10 puntos\nOK    Romper los 60 bloques da 600 puntos\nOK    Los bloques caben en 800 px\nRESULTADO: todos los criterios se cumplen",
    },
    { type: "heading", level: 2, text: "¿Qué usar en cada caso?" },
    {
      type: "table",
      headers: ["Si necesitas...", "Usa...", "Nota"],
      rows: [
        ["Empezar algo nuevo que ocupa varios archivos", "/spec con una frase", "Solo el problema, no la solución."],
        ["Que Claude deje de proponer extras", "Decirle que no, y escribirlo en No entra", "Lo que no entra evita que lo improvise."],
        ["Saber si el spec está bien escrito", "El validador del Día 15", "Mira la forma, no el contenido."],
        ["Aprobar", "Cambiar estado a aprobado a mano", "Una sola palabra, sin sinónimos."],
        ["Construir con control", "/spec-impl en una sesión limpia", "Rama propia, un commit por paso."],
        ["Ver qué cambió en un paso", "git show --stat, o git show para el detalle", "Antes de aceptar el siguiente."],
        ["Probar un criterio sin navegador", "Un script de Node sobre la lógica pura", "Por eso logica.js no toca el DOM."],
        ["Probar el comportamiento visible", "Jugar, y más adelante Playwright", "El script no ve ni oye."],
        ["Integrar el trabajo", "git merge a mano", "Lo decides tú al terminar."],
      ],
    },
    { type: "heading", level: 2, text: "Datos que suelen aparecer desactualizados" },
    {
      type: "table",
      headers: ["Suele decirse", "Información verificada (noviembre 2026)"],
      rows: [
        ["Basta con escribir aprobado, approved o cualquier sinónimo.", "Para un skill que lee el estado, una sola palabra es más segura. Con sinónimos, cada persona escribe distinto y el skill se confunde."],
        ["Hay que hacer /init para tener un CLAUDE.md.", "/init lo genera, pero puedes escribirlo tú. La guía oficial pide archivos concretos y de menos de unas 200 líneas."],
        ["El CLAUDE.md obliga a Claude a obedecer.", "Es contexto, no configuración impuesta. Lo que debe cumplirse siempre va en un hook o en los permisos."],
        ["Mientras más spec, mejor.", "Un MVP se define con lo mínimo para jugar y probar. Sonidos, niveles y adornos van en otros specs."],
        ["El código lo escribe todo Claude de golpe.", "Con spec-impl llega en pasos pequeños y con un commit en cada uno, que puedes revisar y corregir."],
        ["Se puede seguir trabajando en la misma sesión de la entrevista.", "Se recomienda una sesión limpia con /clear: el spec ya contiene lo que importa."],
        ["Si todos los pasos terminan, el juego está bien.", "El script comprueba reglas. El comportamiento visible se mira jugando. Hace falta lo uno y lo otro."],
        ["Los pasos del plan son siempre ocho.", "Es una convención de este ejemplo. Puede haber más o menos, mientras cada uno sea pequeño y probable."],
        ["El merge lo hace el skill al terminar.", "En esta lección no: spec-impl no hace merge ni push. Es un paso manual."],
        ["Un juego necesita imágenes y sonidos para ser un MVP.", "No. Con figuras en el lienzo se comprueba toda la jugabilidad. Los recursos son otro spec."],
      ],
    },
    { type: "heading", level: 2, text: "Si algo no funciona" },
    {
      type: "table",
      headers: ["Síntoma", "Causa probable", "Qué hacer"],
      rows: [
        ["/spec-impl dice que el spec no está aprobado", "El estado no es exactamente aprobado", "Edita la línea estado y comprueba con head -3."],
        ["/spec-impl dice que hay cambios sin guardar", "No hiciste el primer commit o hay archivos sueltos", "Haz git status, guarda o descarta, y vuelve a lanzarlo."],
        ["No existe la rama spec/001-...", "El repositorio no está inicializado", "Ejecuta git init y el primer commit en main."],
        ["Claude incluye sonidos en el plan", "Se lo propuso y no lo descartaste", "Dile que no quieres audio y pide que lo quite del plan y de los criterios."],
        ["El juego no arranca y la consola muestra ReferenceError", "game.js se carga antes que logica.js", "En index.html, logica.js va primero."],
        ["Las flechas desplazan la página", "La ventana es más pequeña que el lienzo", "Agranda la ventana o pasa el ratón por el lienzo."],
        ["La paleta no sigue al ratón", "El lienzo se escala en la página", "El cálculo usa getBoundingClientRect para compensarlo."],
        ["El script de criterios falla en node --check", "Un error de sintaxis en logica.js o game.js", "Lee el mensaje: dice la línea. Corrígelo y repite."],
      ],
    },
    { type: "heading", level: 2, text: "Preguntas frecuentes" },
    {
      type: "accordion",
      items: [
        {
          title: "¿Puedo editar el spec después de aprobarlo?",
          text: "Sí, y debes hacerlo cuando cambie algo importante. Si lo cambias, vuelve el estado a borrador, léelo de nuevo y apruébalo otra vez. Un spec desactualizado es peor que no tener spec.",
        },
        {
          title: "¿Y si el plan tiene más pasos o menos que ocho?",
          text: "No pasa nada. Lo importante es que cada paso sea pequeño, que se pueda probar y que termine en un commit. Si un paso te parece enorme, pide que lo divida antes de aprobar.",
        },
        {
          title: "¿Qué hago si un paso sale mal?",
          text: "Corrígelo en ese momento, o descarta el commit con git restore o git reset en tu rama. Como trabajas en una rama, main no se ve afectada. Esa es la razón de la rama.",
        },
        {
          title: "¿Por qué una rama por spec?",
          text: "Aísla el trabajo y hace trivial deshacerlo: se descarta la rama. Obliga también a ser ordenado: un spec, una rama, una integración.",
        },
        {
          title: "¿Qué pasa si salto la pausa entre pasos?",
          text: "Pierdes el punto de control. Puedes pedir que avance sin pausas, pero el valor del método es revisar cada cambio mientras es pequeño.",
        },
        {
          title: "¿Esto sirve con mi proyecto real?",
          text: "Sí. La diferencia es que el proyecto ya existirá y el spec dirá qué cambia. El flujo es el mismo: frase, entrevista, spec aprobado, rama, pasos y criterios con evidencia.",
        },
      ],
    },
    { type: "heading", level: 2, text: "Qué sigue" },
    {
      type: "paragraph",
      text: "El Día 18 trata lo contrario: cuándo no hace falta un spec. Verás qué ajustes pequeños, como la pelota que sale sola tras perder una vida, se piden con un prompt directo, y cómo se añade una funcionalidad nueva a un proyecto que ya tiene specs. Antes, juega unas partidas y apunta tres cosas que cambiarías.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 18, verifica que puedes explicar...",
      items: [
        "Por qué /spec recibe solo una frase y qué hace con ella.",
        "Qué diferencia hay entre una respuesta vaga y una decisión concreta, con un ejemplo.",
        "Por qué se aprueba a mano y por qué una sola palabra.",
        "Por qué hace falta un primer commit antes de /spec-impl.",
        "Para qué sirven /clear y la rama del spec.",
        "Qué ve cada commit y qué haces entre un paso y el siguiente.",
        "Por qué logica.js no toca el DOM.",
        "Qué comprueba probar-criterios.js y qué no puede comprobar.",
      ],
    },
    { type: "heading", level: 2, text: "Fuentes consultadas (noviembre 2026)" },
    {
      type: "list",
      items: [
        "[Buenas prácticas para Claude Code: entrevistarse con Claude, sesiones limpias y revisar contra un spec](https://code.claude.com/docs/en/best-practices)",
        "[Cómo Claude recuerda tu proyecto: CLAUDE.md y su tamaño](https://code.claude.com/docs/en/memory)",
        "[Referencia de comandos: /init y /clear](https://code.claude.com/docs/en/commands)",
        "[Extender Claude con skills](https://code.claude.com/docs/en/skills)",
        "[Git: git show](https://git-scm.com/docs/git-show)",
        "[Git: git merge](https://git-scm.com/docs/git-merge)",
        "[Node.js: opción --check](https://nodejs.org/api/cli.html)",
        "[MDN: API Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)",
        "[MDN: requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "¿Qué le das a /spec para empezar?",
      options: [
        "Un documento de diez páginas",
        "Una sola frase que describa el problema",
        "El código ya escrito",
        "Nada: no admite texto",
      ],
      correctIndex: 1,
      explanation: "El skill entrevista a la persona a partir de una frase de problema. Una frase corta basta para empezar.",
    },
    {
      question: "Claude te propone añadir sonidos y explosiones y no los quieres en el MVP. ¿Qué haces?",
      options: [
        "Los aceptas, no cuestan nada",
        "Dices que no, y lo dejas en No entra y fuera del plan",
        "Cierras la sesión",
        "Esperas a ver si los quita",
      ],
      correctIndex: 1,
      explanation: "Lo que no entra debe quedar escrito para que Claude no lo improvise. Cada extra es más código por revisar.",
    },
    {
      question: "¿Cuál de estas es una decisión concreta?",
      options: [
        "Quizá varios niveles",
        "Un único nivel y un lienzo de 800 por 600",
        "Algo grande y bonito",
        "Ya veremos",
      ],
      correctIndex: 1,
      explanation: "Una decisión concreta se puede comprobar con una cifra o con un sí o un no. Lo vago lo resuelve Claude a su manera.",
    },
    {
      question: "¿Por qué el estado del spec debe ser una sola palabra, aprobado?",
      options: [
        "Por estética",
        "Porque spec-impl la busca exactamente, y con sinónimos cada persona escribiría distinto",
        "Porque Git lo exige",
        "No importa cuál se use",
      ],
      correctIndex: 1,
      explanation: "El skill se detiene si no encuentra la palabra acordada. Una convención única evita confusiones.",
    },
    {
      question: "¿Para qué sirve el primer commit en main antes de /spec-impl?",
      options: [
        "Para que el spec se cuente como código",
        "Para que spec-impl pueda comprobar que no hay cambios sin guardar y crear su rama desde un punto limpio",
        "Para publicar el juego",
        "No sirve para nada",
      ],
      correctIndex: 1,
      explanation: "El skill ejecuta git status y se detiene si hay cambios sin guardar. Sin repositorio, no puede crear la rama.",
    },
    {
      question: "¿Por qué se hace un /clear antes de /spec-impl?",
      options: [
        "Para borrar el spec",
        "Porque el spec ya contiene lo importante y un contexto limpio rinde mejor",
        "Para desactivar los skills",
        "Porque Git lo pide",
      ],
      correctIndex: 1,
      explanation: "La conversación de la entrevista ya está resumida en el archivo. Empezar sin ese historial deja espacio para el trabajo.",
    },
    {
      question: "¿Qué haces entre un paso y el siguiente de /spec-impl?",
      options: [
        "Nada, y confías ciegamente",
        "Revisas el cambio con git show y, si es correcto, confirmas. Si no, lo corriges",
        "Borras la rama",
        "Reescribes el spec",
      ],
      correctIndex: 1,
      explanation: "Los pasos pequeños permiten entender cada cambio y corregir pronto. Ahí está el valor del método.",
    },
    {
      question: "¿Por qué logica.js no toca el DOM?",
      options: [
        "Porque es más corta",
        "Para poder probar las reglas del juego con Node, sin abrir un navegador",
        "Porque el DOM no existe",
        "Porque lo prohíbe JavaScript",
      ],
      correctIndex: 1,
      explanation: "Con la lógica separada del dibujo, un script de Node ejecuta las reglas y comprueba los criterios.",
    },
    {
      question: "Cambias los puntos por bloque a 5 y el script de criterios muestra una línea FALLA. ¿Qué significa?",
      options: [
        "Que el script está roto",
        "Que el script detectó que un criterio del spec ya no se cumple",
        "Que Node está mal instalado",
        "Que el juego se borró",
      ],
      correctIndex: 1,
      explanation: "Cada línea corresponde a una casilla del spec. Si un criterio no puede fallar, no demuestra nada.",
    },
    {
      question: "Al jugar, la pelota sale sola nada más perder una vida. El spec no decía nada. ¿Qué es?",
      options: [
        "Un criterio incumplido",
        "Una decisión que el spec no cubrió, que se arregla con un ajuste o con otro spec según su tamaño",
        "Un error de Git",
        "Un fallo de Node",
      ],
      correctIndex: 1,
      explanation: "No hay criterio que cumpla o incumpla. Un ajuste pequeño se pide con un prompt directo, y una decisión con consecuencias merece otro spec.",
    },
  ],
};
