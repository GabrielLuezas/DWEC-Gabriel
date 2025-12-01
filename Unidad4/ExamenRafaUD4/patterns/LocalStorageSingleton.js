export class LocalStorageSingleton {
  constructor() {
    if (LocalStorageSingleton.instance) {
      return LocalStorageSingleton.instance;
    }

    this.key = "trenesData";

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
