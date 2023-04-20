const cartas = [
  { nombre: "are maki", tipo: "defensa" },
  { nombre: "upchagui", tipo: "ataque" },
  { nombre: "happy", tipo: "semi-dios" },
  { nombre: "nisaxter", tipo: "god" },
  { nombre: "likio", tipo: "best adc euw" },
  { nombre: "xavi", tipo: "domadito" },
];

const tablero = document.getElementById("tablero");
let primeraCarta = null;

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
  contenido.textContent = elemento.tipo === "defensa" ? elemento.nombre : "";
  carta.appendChild(contenido);

  carta.addEventListener("click", () => {
    if (carta.classList.contains("revelada")) {
      return; // Si la carta ya está revelada, no hacemos nada.
    }

    carta.classList.add("revelada");

    if (primeraCarta === null) {
      primeraCarta = carta;
    } else if (primeraCarta !== carta) {
      if (
        cartas[primeraCarta.dataset.index].nombre ===
        cartas[carta.dataset.index].nombre
      ) {
        console.log("¡Encontraste una pareja!");
        primeraCarta = null;
      } else {
        setTimeout(() => {
          primeraCarta.classList.remove("revelada");
          carta.classList.remove("revelada");
          primeraCarta = null;
        }, 1000);
        console.log("No son pareja. Las cartas se ocultarán nuevamente.");
      }
    }
  });

  return carta;
}

barajar(cartas);

cartas.forEach((elemento, index) => {
  const carta = crearCarta(elemento, index);
  tablero.appendChild(carta);
});
