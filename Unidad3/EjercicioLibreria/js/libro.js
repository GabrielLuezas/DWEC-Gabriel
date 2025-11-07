export class Libro {
  constructor(nombre, paginas, prestado) {
    this.nombre = nombre;
    this.paginas = paginas;
    this.prestado = prestado;
  }

  mostrarInfo() {
    console.log(`${this.nombre} - ${this.paginas} (${this.prestado})`);
  }
}
