const Libros = require("../models/libro");

class LibrosServices {
  static libros = [];

  static get() {
    return LibrosServices.libros;
  }
  static post(nombre, paginas, prestado) {
    const newLibro = new Libros(nombre, paginas, prestado);
    LibrosServices.libros.push(newLibro);
    return newLibro;
  }
}

module.exports = LibrosServices;
