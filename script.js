const cartas = [
  { nombre: "are maki", tipo: "defensa baja" },
  { nombre: "montong maki", tipo: "defensa media" },
  { nombre: "happy", tipo: "semi-dios" },
  { nombre: "montong an maki", tipo: "defensa media cambiada" },
  { nombre: "likio", tipo: "best adc euw" },
  { nombre: "olgul maki", tipo: "defensa alta" },
  { nombre: "montong b jurugui", tipo: "puño" },
  { nombre: "olgul b jirugui", tipo: "puño cara" },
  { nombre: "checho jirugui", tipo: "puño barriga" },
  { nombre: "montong baro", tipo: "puño distinto" },
];

const tablero = document.getElementById("tablero");
let primeraCarta = null;
let bloqueoTablero = false;

function barajar(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function crearCarta(elemento, index) {
  const carta = document.createElement("div");
  carta.classList.add("carta");
  carta.dataset.index = index;

  const contenido = document.createElement("div");
  contenido.classList.add("contenido");
  contenido.textContent = elemento.texto;
  carta.appendChild(contenido);

  carta.addEventListener("click", () => {
      if (carta.classList.contains("revelada") || bloqueoTablero) {
        return;
      }
  
      carta.classList.add("revelada");
  
      if (primeraCarta === null) {
        primeraCarta = carta;
      } else {
        bloqueoTablero = true;
        setTimeout(() => {
          const carta1 = cartas[primeraCarta.dataset.index];
          const carta2 = cartas[carta.dataset.index];
          if (
            (carta1.nombre === carta2.nombre && carta1.tipo !== carta2.tipo) ||
            (carta1.tipo === carta2.tipo && carta1.nombre !== carta2.nombre)
          ) {
            console.log("¡Encontraste una pareja!");
            primeraCarta.classList.add("encontrada");
            carta.classList.add("encontrada");
          } else {
            console.log("No son pareja. Las cartas se ocultarán nuevamente.");
            primeraCarta.classList.remove("revelada");
            carta.classList.remove("revelada");
          }
          primeraCarta = null;
          setTimeout(() => {
            bloqueoTablero = false;
          }, 500);
        }, 3000);
      }
    });


  return carta;
}

// Duplicamos las cartas para tener pares de concepto-definición
const cartasDuplicadas = cartas.reduce((acc, carta) => {
  acc.push({ ...carta, texto: carta.nombre });
  acc.push({ ...carta, texto: carta.tipo });
  return acc;
}, []);
barajar(cartasDuplicadas);

cartasDuplicadas.forEach((elemento, index) => {
  const carta = crearCarta(elemento, index);
  tablero.appendChild(carta);
});
