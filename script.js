const cartas = [
  { nombre: "are maki", tipo: "defensa" },
  { nombre: "upchagui", tipo: "ataque" },
  { nombre: "happy", tipo: "semi-dios" },
  { nombre: "nisaxter", tipo: "god" },
  { nombre: "likio", tipo: "best adc euw" },
  { nombre: "xavi", tipo: "domadito" },
  // Añadir 4 cartas más aquí
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
  contenido.textContent = elemento.tipo === "defensa" ? elemento.nombre : elemento.tipo;
  carta.appendChild(contenido);

  carta.addEventListener("click", () => {
    if (carta.classList.contains("revelada") || bloqueoTablero) {
      return;
    }

    carta.classList.add("revelada");

    if (
