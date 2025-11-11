import { Pokemon } from "./pokemon.js";

let pokemons = [];
let nextId = 1;

const form = document.getElementById("pokemonForm");
const tableBody = document.getElementById("pokemonTableBody");
const nombreInput = document.getElementById("nombre");
const tipoInput = document.getElementById("tipo");
const nivelInput = document.getElementById("nivel");
const hpInput = document.getElementById("hp");
const idInput = document.getElementById("pokemonId");
const botonGuardar = document.getElementById("guardarLocal")
const botonCargar = document.getElementById("cargarLocal")

function crearPokemon(nombre, tipo, nivel, hp) {
  const nuevoPokemon = new Pokemon(nextId++, nombre, tipo, nivel, hp);
  pokemons.push(nuevoPokemon);
  renderTable();
}

function actualizarPokemon(id, nombre, tipo, nivel, hp) {
  const pokemon = pokemons.find(p => p.id === id);
  if (pokemon) {
    pokemon.nombre = nombre;
    pokemon.tipo = tipo;
    pokemon.nivel = nivel;
    pokemon.hp = hp;
    renderTable();
  }
}

function eliminarPokemon(id) {
  pokemons = pokemons.filter(p => p.id !== id);
  renderTable();
}

function renderTable() {
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }

  pokemons.forEach(pokemon => {
    const tr = document.createElement("tr");

    const tdId = document.createElement("td");
    tdId.textContent = pokemon.id;

    const tdNombre = document.createElement("td");
    tdNombre.textContent = pokemon.nombre;

    const tdTipo = document.createElement("td");
    tdTipo.textContent = pokemon.tipo;

    const tdNivel = document.createElement("td");
    tdNivel.textContent = pokemon.nivel;

    const tdHp = document.createElement("td");
    tdHp.textContent = pokemon.hp;

    const tdAcciones = document.createElement("td");

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.classList.add("edit");
    btnEditar.addEventListener("click", () => editarPokemon(pokemon.id));

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.classList.add("delete");
    btnEliminar.addEventListener("click", () => eliminarPokemon(pokemon.id));

    tdAcciones.appendChild(btnEditar);
    tdAcciones.appendChild(btnEliminar);

    tr.appendChild(tdId);
    tr.appendChild(tdNombre);
    tr.appendChild(tdTipo);
    tr.appendChild(tdNivel);
    tr.appendChild(tdHp);
    tr.appendChild(tdAcciones);

    tableBody.appendChild(tr);
  });
}

form.addEventListener("submit", e => {
  e.preventDefault();

  const id = Number(idInput.value);
  const nombre = nombreInput.value.trim();
  const tipo = tipoInput.value.trim();
  const nivel = Number(nivelInput.value);
  const hp = Number(hpInput.value);

  if (!nombre || !tipo || nivel <= 0 || hp <= 0) {
    alert("Completa todos los campos correctamente.");
    return;
  }

  if (id) {
    actualizarPokemon(id, nombre, tipo, nivel, hp);
  } else {
    crearPokemon(nombre, tipo, nivel, hp);
  }

  form.reset();
  idInput.value = "";
});

function editarPokemon(id) {
  const pokemon = pokemons.find(p => p.id === id);
  if (pokemon) {
    idInput.value = pokemon.id;
    nombreInput.value = pokemon.nombre;
    tipoInput.value = pokemon.tipo;
    nivelInput.value = pokemon.nivel;
    hpInput.value = pokemon.hp;
  }
}

botonGuardar.addEventListener("click", () => {
  localStorage.setItem("pokemonsGuardados", JSON.stringify(pokemons));
  alert("Guardado");
});

botonCargar.addEventListener("click", () => {
  const pokemonsLocal = localStorage.getItem("pokemonsGuardados");
  if (!pokemonsLocal) {
    alert("No hay datos guardados");
    return;
  }
  const pokemonsParsed = JSON.parse(pokemonsLocal);
  pokemons = pokemonsParsed;
  renderTable();
});