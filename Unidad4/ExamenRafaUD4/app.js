import { Tren } from "./patterns/Tren.js";
import { LocalStorageSingleton } from "./patterns/LocalStorageSingleton.js";
import { DOMFacade } from "./patterns/DOMFacade.js";

class FiltradoConext {
  setStrategy(strategy) {
    this.strategy = strategy;
  }

  ejecutar(data) {
    return this.strategy.ejecutar(data);
  }
}

class NombreStrategy {
  ejecutar(data) {
    const tren = storage.obtenerTodos();
    let filtrada = [];

    tren.forEach((t) => {
      if (t.nombre.toLowerCase() === data) {
        filtrada.push(t);
        domListarTrenes.mostrarTrenes(filtrada);
      }
    });
  }
}

class TipoStrategy {
  ejecutar(data) {
    const tren = storage.obtenerTodos();
    let filtrada = [];

    tren.forEach((t) => {
      if (t.tipo.toLowerCase() === data) {
        filtrada.push(t);
        domListarTrenes.mostrarTrenes(filtrada);
      }
    });
  }
}

const crud = new FiltradoConext();

const storage = new LocalStorageSingleton();

let trenes = storage.obtenerTodos();

const domListarTrenes = new DOMFacade("contenedorTrenes");
const domSimuladorViajes = new DOMFacade("contendorSimulador");

domListarTrenes.mostrarTrenes(trenes);

const formTrenes = document.getElementById("formTrenes");
const formSimulador = document.getElementById("formSimulador");
const nombreInput = document.getElementById("nombre");
const tipoInput = document.getElementById("tipo");
const velocidadInput = document.getElementById("velocidad");
const btnBorrarTrenes = document.getElementById("borrarTrenes");
const selectTrenes = document.getElementById("trenesDisponibles");

const btnFiltrar = document.getElementById("btnFiltrar");
const filtrarInput = document.getElementById("filtrado");

formTrenes.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = nombreInput.value.trim();
  const tipo = tipoInput.value;
  const velocidad = velocidadInput.value.trim();

  crearTren(nombre, tipo, velocidad);

  formTrenes.reset();
  domListarTrenes.mostrarTrenes(trenes);
});

function crearTren(nombre, tipo, velocidad) {
  const nuevoTren = new Tren(nombre, tipo, velocidad);
  trenes.push(nuevoTren);
  storage.guardarTodos(trenes);
  añadirTrenesLista(nuevoTren);
}

function añadirTrenesLista(tren) {
  /*trenes.forEach((tren) => {
    const trenAñadido = document.createElement("option");
    trenAñadido.textContent = tren.nombre;
    trenAñadido.value = tren.nombre;
    selectTrenes.appendChild(trenAñadido);
  });*/

  const trenAñadido = document.createElement("option");
  trenAñadido.textContent = tren.nombre;
  trenAñadido.value = tren.nombre;
  selectTrenes.appendChild(trenAñadido);
}

btnBorrarTrenes.addEventListener("click", () => {
  trenes = [];
  localStorage.clear();
  domListarTrenes.mostrarTrenes(trenes);
});

btnFiltrar.addEventListener("click", () => {
  if (
    filtrarInput.value.toLowerCase() === "vapor" ||
    filtrarInput.value.toLowerCase() === "diésel" ||
    filtrarInput.value.toLowerCase() === "eléctrico" ||
    filtrarInput.value.toLowerCase() === "maglev"
  ) {
    crud.setStrategy(new TipoStrategy());
    crud.ejecutar(filtrarInput.value.toLowerCase());
  } else {
    crud.setStrategy(new NombreStrategy());
    crud.ejecutar(filtrarInput.value.toLowerCase());
  }
});
