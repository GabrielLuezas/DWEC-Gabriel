class LocalStorageSingleton {
  constructor() {
    if (LocalStorageSingleton.instance) {
      return LocalStorageSingleton.instance;
    }

    this.key = "pokemonData";

    // Si no existe aún, lo creamos vacío
    if (!localStorage.getItem(this.key)) {
      localStorage.setItem(this.key, JSON.stringify([]));
    }

    LocalStorageSingleton.instance = this;
  }

  obtenerTodos() {
    return JSON.parse(localStorage.getItem(this.key));
  }

  guardarTodos(lista) {
    localStorage.setItem(this.key, JSON.stringify(lista));
  }
}

const storage = new LocalStorageSingleton();

class DOMFacade {
  constructor(idContenedor) {
    this.contenedor = document.getElementById(idContenedor);
  }

  limpiar() {
    while (this.contenedor.firstChild) {
      this.contenedor.removeChild(this.contenedor.firstChild);
    }
  }

  mostrarPokemons(lista) {
    this.limpiar();

    lista.forEach((pokemon) => {
      const card = document.createElement("article");
      card.classList.add("card");

      const titulo = document.createElement("h3");
      titulo.textContent = pokemon.nombre;

      const tipo = document.createElement("p");
      tipo.textContent = "Tipo: " + pokemon.tipo;

      card.appendChild(titulo);
      card.appendChild(tipo);

      this.contenedor.appendChild(card);
    });
  }
}

const dom = new DOMFacade("contenedor");

class CrearStrategy {
  ejecutar(data) {
    const lista = storage.obtenerTodos();

    if (lista.some((p) => p.nombre === data.nombre)) {
      alert("El Pokémon ya existe");
      return lista;
    }

    lista.push(data);
    storage.guardarTodos(lista);
    return lista;
  }
}

class ActualizarStrategy {
  ejecutar(data) {
    let lista = storage.obtenerTodos();

    lista = lista.map((p) => (p.nombre === data.nombre ? data : p));

    storage.guardarTodos(lista);
    return lista;
  }
}

class EliminarStrategy {
  ejecutar(data) {
    const lista = storage
      .obtenerTodos()
      .filter((p) => p.nombre !== data.nombre);

    storage.guardarTodos(lista);
    return lista;
  }
}

class LeerStrategy {
  ejecutar() {
    return storage.obtenerTodos();
  }
}

class CrudContext {
  setStrategy(strategy) {
    this.strategy = strategy;
  }

  ejecutar(data) {
    return this.strategy.ejecutar(data);
  }
}

const crud = new CrudContext();

document.getElementById("formPokemon").addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const tipo = document.getElementById("tipo").value.trim();
  const operacion = document.getElementById("operacion").value;

  let data = { nombre, tipo };

  switch (operacion) {
    case "create":
      crud.setStrategy(new CrearStrategy());
      break;
    case "update":
      crud.setStrategy(new ActualizarStrategy());
      break;
    case "delete":
      crud.setStrategy(new EliminarStrategy());
      break;
    case "read":
      crud.setStrategy(new LeerStrategy());
      break;
  }

  const lista = crud.ejecutar(data);
  dom.mostrarPokemons(lista);
});

// Mostrar al inicio
dom.mostrarPokemons(storage.obtenerTodos());
document.getElementById("formPokemon").addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const tipo = document.getElementById("tipo").value.trim();
  const operacion = document.getElementById("operacion").value;

  let data = { nombre, tipo };

  switch (operacion) {
    case "create":
      crud.setStrategy(new CrearStrategy());
      break;
    case "update":
      crud.setStrategy(new ActualizarStrategy());
      break;
    case "delete":
      crud.setStrategy(new EliminarStrategy());
      break;
    case "read":
      crud.setStrategy(new LeerStrategy());
      break;
  }

  const lista = crud.ejecutar(data);
  dom.mostrarPokemons(lista);
});

// Mostrar al inicio
dom.mostrarPokemons(storage.obtenerTodos());
