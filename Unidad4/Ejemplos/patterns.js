const output = document.getElementById("output");
const log = (msg) => output.textContent += msg + "\n";

// =====================================================
// 1. Singleton – Centro Pokémon (solo una instancia)
// =====================================================
class PokemonCenter {
  constructor(name) {
    if (PokemonCenter.instance) return PokemonCenter.instance;
    this.name = name;
    this.healedPokemons = [];
    PokemonCenter.instance = this;
  }
  heal(pokemon) {
    this.healedPokemons.push(pokemon);
    log(`💉 ${pokemon} ha sido curado en ${this.name}`);
  }
}

// =====================================================
// 2. Factory Method – Crear Pokémon según tipo
// =====================================================
class Pokemon {
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }
  attack() {
    return `${this.name} usa un ataque de tipo ${this.type}`;
  }
}

class PokemonFactory {
  static createPokemon(name, type) {
    return new Pokemon(name, type);
  }
}

// =====================================================
// 3. Builder – Construir Pokémon paso a paso
// =====================================================
class PokemonBuilder {
  constructor(name) {
    this.name = name;
  }
  setType(type) {
    this.type = type;
    return this;
  }
  setLevel(level) {
    this.level = level;
    return this;
  }
  build() {
    return new Pokemon(this.name, this.type, this.level);
  }
}

// =====================================================
// 4. Prototype – Clonar Pokémon
// =====================================================
class PokemonPrototype {
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }
  clone() {
    return new PokemonPrototype(this.name, this.type);
  }
}

// =====================================================
// 5. Adapter – Adaptar datos de otro formato
// =====================================================
class OldPokemonData {
  constructor(data) {
    this.data = data; // { nombre, elemento }
  }
}

class PokemonAdapter {
  constructor(oldData) {
    this.name = oldData.data.nombre;
    this.type = oldData.data.elemento;
  }
}

// =====================================================
// 6. Decorator – Añadir habilidades extra
// =====================================================
class BasicPokemon {
  attack() {
    return "Ataque básico";
  }
}

class FireDecorator {
  constructor(pokemon) {
    this.pokemon = pokemon;
  }
  attack() {
    return this.pokemon.attack() + " con fuego 🔥";
  }
}

// =====================================================
// 7. Proxy – Controlar acceso a Pokémon legendarios
// =====================================================
class LegendaryPokemon {
  capture() {
    return "Pokémon legendario capturado!";
  }
}

class LegendaryProxy {
  constructor(realPokemon) {
    this.realPokemon = realPokemon;
  }
  capture(hasMasterBall) {
    if (hasMasterBall) return this.realPokemon.capture();
    return "❌ No puedes capturarlo sin una Master Ball";
  }
}

// =====================================================
// 8. Facade – Interfaz simplificada de batalla
// =====================================================
class BattleSystem {
  static fight(pokemonA, pokemonB) {
    log(`⚔️ ${pokemonA.name} vs ${pokemonB.name}`);
    log(`${pokemonA.name} gana la batalla!`);
  }
}

// =====================================================
// 9. Composite – Equipos de Pokémon
// =====================================================
class PokemonComponent {
  show() {}
}

class SinglePokemon extends PokemonComponent {
  constructor(name) {
    super();
    this.name = name;
  }
  show() {
    log(`- ${this.name}`);
  }
}

class TeamComposite extends PokemonComponent {
  constructor(teamName) {
    super();
    this.teamName = teamName;
    this.members = [];
  }
  add(pokemon) {
    this.members.push(pokemon);
  }
  show() {
    log(`👥 Equipo ${this.teamName}:`);
    this.members.forEach(m => m.show());
  }
}

// =====================================================
// 10. Observer – Notificar entrenadores
// =====================================================
class Trainer {
  update(msg) {
    log(`📢 Entrenador notificado: ${msg}`);
  }
}

class PokemonEvent {
  constructor() {
    this.observers = [];
  }
  subscribe(obs) {
    this.observers.push(obs);
  }
  notify(msg) {
    this.observers.forEach(o => o.update(msg));
  }
}

// =====================================================
// 11. Strategy – Estrategias de ataque
// =====================================================
class FireStrategy {
  attack() { return "Ataque de fuego 🔥"; }
}
class WaterStrategy {
  attack() { return "Ataque de agua 💧"; }
}
class PokemonFighter {
  setStrategy(strategy) {
    this.strategy = strategy;
  }
  fight() {
    log(this.strategy.attack());
  }
}

// =====================================================
// 12. Command – Ejecutar acciones Pokémon
// =====================================================
class AttackCommand {
  constructor(pokemon) {
    this.pokemon = pokemon;
  }
  execute() {
    log(`${this.pokemon} ataca!`);
  }
}

class TrainerInvoker {
  constructor() {
    this.commands = [];
  }
  addCommand(cmd) {
    this.commands.push(cmd);
  }
  executeAll() {
    this.commands.forEach(c => c.execute());
  }
}

// =====================================================
// 13. Mediator – Coordinar batalla
// =====================================================
class BattleMediator {
  register(pokemon) {
    this.pokemon = pokemon;
  }
  send(msg, sender) {
    log(`${sender} dice: ${msg}`);
  }
}

// =====================================================
// 14. State – Estados de un Pokémon
// =====================================================
class NormalState {
  handle() { log("😊 Pokémon está tranquilo"); }
}
class AngryState {
  handle() { log("😡 Pokémon está enfadado!"); }
}
class SleepingState {
  handle() { log("💤 Pokémon está dormido"); }
}
class PokemonContext {
  setState(state) {
    this.state = state;
  }
  request() {
    this.state.handle();
  }
}

// =====================================================
// Ejecutar todos los patrones
// =====================================================
document.getElementById("runAll").addEventListener("click", () => {
  output.textContent = ""; // limpiar

  // Singleton
  const center1 = new PokemonCenter("Centro de Kanto");
  const center2 = new PokemonCenter("Centro de Johto");
  center1.heal("Pikachu");
  log(center1 === center2 ? "✅ Singleton funciona" : "❌ Singleton falla");

  // Factory
  const charmander = PokemonFactory.createPokemon("Charmander", "Fuego");
  log(charmander.attack());

  // Builder
  const built = new PokemonBuilder("Bulbasaur").setType("Planta").setLevel(5).build();
  log(`Construido: ${built.name} tipo ${built.type}`);

  // Prototype
  const original = new PokemonPrototype("Squirtle", "Agua");
  const clone = original.clone();
  log(`Clonado: ${clone.name} (${clone.type})`);

  // Adapter
  const oldData = new OldPokemonData({ nombre: "Eevee", elemento: "Normal" });
  const adapted = new PokemonAdapter(oldData);
  log(`Adaptado: ${adapted.name} tipo ${adapted.type}`);

  // Decorator
  const decorated = new FireDecorator(new BasicPokemon());
  log(decorated.attack());

  // Proxy
  const proxy = new LegendaryProxy(new LegendaryPokemon());
  log(proxy.capture(false));
  log(proxy.capture(true));

  // Facade
  BattleSystem.fight({ name: "Pikachu" }, { name: "Charmander" });

  // Composite
  const team = new TeamComposite("Ash");
  team.add(new SinglePokemon("Pikachu"));
  team.add(new SinglePokemon("Charizard"));
  team.show();

  // Observer
  const event = new PokemonEvent();
  event.subscribe(new Trainer());
  event.notify("Un nuevo Pokémon salvaje apareció!");

  // Strategy
  const fighter = new PokemonFighter();
  fighter.setStrategy(new FireStrategy());
  fighter.fight();

  // Command
  const invoker = new TrainerInvoker();
  invoker.addCommand(new AttackCommand("Pikachu"));
  invoker.addCommand(new AttackCommand("Charizard"));
  invoker.executeAll();

  // Mediator
  const mediator = new BattleMediator();
  mediator.register("Pikachu");
  mediator.send("¡Usa impacto trueno!", "Pikachu");

  // State
  const pokeState = new PokemonContext();
  pokeState.setState(new AngryState());
  pokeState.request();
  pokeState.setState(new SleepingState());
  pokeState.request();
});
