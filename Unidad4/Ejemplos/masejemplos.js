class Pokemon {
  constructor(nombre, tipo, nivel = 1) {
    this.nombre = nombre;
    this.tipo = tipo;
    this.nivel = nivel;
  }

  atacar() {
    return `${this.nombre} ataca con un movimiento básico`;
  }
}

class PokemonLegendario extends Pokemon {
  constructor(nombre, tipo, nivel = 70, region) {
    super(nombre, tipo, nivel);
    this.region = region;
  }

  atacar() {
    return `${this.nombre} lanza un ataque legendario!!!`;
  }
}

class PokemonSingular extends Pokemon {
  constructor(nombre, tipo, nivel = 50, evento) {
    super(nombre, tipo, nivel);
    this.evento = evento;
  }

  habilidadEspecial() {
    return `${this.nombre} usa su habilidad especial del evento ${this.evento}`;
  }
}

class CentroPokemon {
  constructor() {
    if (CentroPokemon.instance) {
      return CentroPokemon.instance;
    }

    this.pokemons = [];
    CentroPokemon.instance = this;
  }

  registrar(pokemon) {
    this.pokemons.push(pokemon);
  }

  listar() {
    return this.pokemons;
  }
}

// Uso:
const centro1 = new CentroPokemon();
const centro2 = new CentroPokemon(); // misma instancia

centro1.registrar(new Pokemon("Pikachu", "Eléctrico", 10));

console.log(centro1.listar());
console.log(centro1 === centro2); // true


class PokemonFactory {
  static crear(tipo, nombre) {
    switch (tipo) {
      case "normal":
        return new Pokemon(nombre, "Normal", 5);

      case "legendario":
        return new PokemonLegendario(nombre, "Psíquico", 70, "Kanto");

      case "singular":
        return new PokemonSingular(nombre, "Fantasma", 50, "Halloween");

      default:
        throw "Tipo de Pokémon desconocido";
    }
  }
}

// Uso:
const p1 = PokemonFactory.crear("normal", "Eevee");
const p2 = PokemonFactory.crear("legendario", "Mewtwo");
const p3 = PokemonFactory.crear("singular", "Marshadow");

console.log(p1, p2, p3);


class PokemonBuilder {
  constructor() {
    this.nombre = "";
    this.tipo = "";
    this.nivel = 1;
  }

  setNombre(n) {
    this.nombre = n;
    return this;
  }
  setTipo(t) {
    this.tipo = t;
    return this;
  }
  setNivel(n) {
    this.nivel = n;
    return this;
  }

  build() {
    return new Pokemon(this.nombre, this.tipo, this.nivel);
  }
}

// Uso:
/*const pikachu = new PokemonBuilder()
                  .setNombre("Pikachu")
                  .setTipo("Eléctrico")
                  .setNivel(20)
                  .build();

console.log(pikachu);*/


// API antigua
const pokemonViejo = {
  nombre: "Charmander",
  tipo: "Fuego",
  nivel: 12
};

// Adaptador ➝ convierte a clase moderna
class PokemonAdapter {
  constructor(pokeViejo) {
    this.poke = pokeViejo;
  }

  convertir() {
    return new Pokemon(this.poke.nombre, this.poke.tipo, this.poke.nivel);
  }
}

// Uso:
const adaptado = new PokemonAdapter(pokemonViejo).convertir();
console.log(adaptado.atacar());



class Pokeball {
  lanzar() { return "Pokéball lanzada"; }
}
class Detector {
  encontrar(nombre) { return `${nombre} localizado`; }
}
class Batalla {
  debilitar(nombre) { return `${nombre} debilitado`; }
}

class CapturaFacade {
  capturar(pokemon) {
    const detector = new Detector();
    const batalla = new Batalla();
    const pokeball = new Pokeball();

    return [
      detector.encontrar(pokemon.nombre),
      batalla.debilitar(pokemon.nombre),
      pokeball.lanzar(),
      `${pokemon.nombre} capturado`
    ];
  }
}

// Uso:
const facade = new CapturaFacade();
console.log(facade.capturar(new Pokemon("Squirtle", "Agua")));


function conArmadura(pokemon) {
  pokemon.defensaExtra = 40;
  pokemon.atacar = () => `${pokemon.nombre} ataca protegido con armadura!`;
  return pokemon;
}

// Uso:
let bulbasaur = new Pokemon("Bulbasaur", "Planta", 10);
bulbasaur = conArmadura(bulbasaur);

console.log(bulbasaur.atacar());
console.log(bulbasaur.defensaExtra);


class AtaqueFuerte {
  ejecutar(pokemon) {
    return `${pokemon.nombre} usa un ataque FUERTE`;
  }
}

class AtaqueRapido {
  ejecutar(pokemon) {
    return `${pokemon.nombre} usa un ataque RÁPIDO`;
  }
}

class ControlAtaque {
  setEstrategia(e) { this.e = e; }
  atacar(pokemon) { return this.e.ejecutar(pokemon); }
}

// Uso:
const pikachu = new Pokemon("Pikachu", "Eléctrico", 10);
//const control = new ControlAtaque();

control.setEstrategia(new AtaqueRapido());
console.log(control.atacar(pikachu));

control.setEstrategia(new AtaqueFuerte());
console.log(control.atacar(pikachu));


class AtacarCommand {
  constructor(pokemon) {
    this.pokemon = pokemon;
  }
  ejecutar() {
    console.log(this.pokemon.atacar());
  }
}

class ControlBatalla {
  ejecutar(comando) { comando.ejecutar(); }
}

// Uso:
const mew = new PokemonLegendario("Mew", "Psíquico");
const comando = new AtacarCommand(mew);

const control = new ControlBatalla();
control.ejecutar(comando);



class EstadoSaludable {
  actuar(pokemon) { return `${pokemon.nombre} lucha con fuerza`; }
}

class EstadoDebilitado {
  actuar(pokemon) { return `${pokemon.nombre} está muy débil`; }
}

class ControlEstadoPokemon {
  constructor(pokemon) {
    this.pokemon = pokemon;
    this.estado = new EstadoSaludable();
  }

  cambiarEstado(estado) {
    this.estado = estado;
  }

  actuar() {
    return this.estado.actuar(this.pokemon);
  }
}

// Uso:
const charizard = new Pokemon("Charizard", "Fuego", 50);
const controlEstado = new ControlEstadoPokemon(charizard);

console.log(controlEstado.actuar());
controlEstado.cambiarEstado(new EstadoDebilitado());
console.log(controlEstado.actuar());
