const Moto = require("../models/moto");

class MotosServices {
  static motos = [];

  static get() {
    return MotosServices.motos;
  }
  static post(marca, modelo, precio) {
    const Mimoto = new Moto(marca, modelo, precio);
    MotosServices.motos.push(Mimoto);
    return Mimoto;
  }
}

module.exports = MotosServices;
