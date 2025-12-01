const formJuego = document.getElementById("formJuego");
const numeroFilas = document.getElementById("numFilas");
const numeroColumnas = document.getElementById("numColumnas");
const divFormulario = document.getElementById("formulario");
const divJuego = document.getElementById("tablero");
const vidasP = document.getElementById("vidas");

class Data {
  constructor(numFilas, numColumnas, numMinas) {
    this.numFilas = numFilas;
    this.numColumnas = numColumnas;
    this.numMinas = numMinas;
  }
}

let numeroMinas = 0;

let minasRestantes = 0;

let vidas = 3;

formJuego.addEventListener("submit", (e) => {
  e.preventDefault();

  let numfilas = numeroFilas.value;
  let numColumnas = numeroColumnas.value;

  let numMinas = calcularNumMinas(numfilas, numColumnas);

  numeroMinas = numMinas;
  minasRestantes = numeroMinas;

  let data = new Data(numfilas, numColumnas, numMinas);

  localStorage.setItem("datos", JSON.stringify(data));

  divFormulario.classList.add("hidden");
  divJuego.classList.remove("hidden");

  crearTablero(numfilas, numColumnas);
});

function calcularNumMinas(numeroFilas, numColumnas) {
  let parte1 = numeroFilas * numColumnas;
  let parte2 = Math.max(numeroFilas, numColumnas);

  let resultado = parte1 / parte2;
  return resultado;
}

function crearTablero(numfilas, numColumnas) {
  for (let i = 0; i < numfilas; i++) {
    let elemento = DOMBuilder.crearElemento("div", "divJuego");
    for (let j = 0; j < numColumnas; j++) {
      let img = DOMBuilder.crearElemento("img", "imagen", "", {
        src: "./img/circle.png",
        alt: "imagen",
      });
      let valorRand = Math.random(1, 2);
      if (valorRand > 0.1 && minasRestantes >= 1) {
        minasRestantes--;
        img.classList.add("EsMina");
      } else {
        img.classList.add("EsAgua");
      }
      img.addEventListener("click", comprobarClick);
      elemento.appendChild(img);
    }

    divJuego.appendChild(elemento);
  }
}

function comprobarClick(e) {
  if (e.target.classList.contains("EsAgua")) {
    e.target.src = "./img/boat.jpg";
  } else {
    e.target.src = "./img/error.png";
    vidas--;
    if (vidas < 1) {
      alert("Has perdido");
      window.location.href = "index.html";
    }
    vidasP.textContent = vidas;
  }
}
