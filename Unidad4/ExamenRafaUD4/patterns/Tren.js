export class Tren {
  constructor(nombre, tipo, velocidad_maxima) {
    this.nombre = nombre;
    this.tipo = tipo;
    this.velocidad_maxima = velocidad_maxima;
    this.fecha_alta = Date.now();
  }
}
