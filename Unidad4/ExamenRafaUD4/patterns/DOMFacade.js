export class DOMFacade {
  constructor(idContenedor) {
    this.contenedor = document.getElementById(idContenedor);
  }

  limpiar() {
    while (this.contenedor.firstChild) {
      this.contenedor.removeChild(this.contenedor.firstChild);
    }
  }

  mostrarTrenes(lista) {
    this.limpiar();

    lista.forEach((tren) => {
      const card = document.createElement("article");
      card.classList.add("card");

      const titulo = document.createElement("h3");
      titulo.textContent = tren.nombre;

      const tipo = document.createElement("p");
      tipo.textContent = "Tipo: " + tren.tipo;

      const velocidad = document.createElement("p");
      velocidad.textContent = "Velocidad: " + tren.velocidad_maxima;

      const fecha = document.createElement("p");
      fecha.textContent = "Fecha: " + tren.fecha_alta;

      card.appendChild(titulo);
      card.appendChild(tipo);
      card.appendChild(velocidad);
      card.appendChild(fecha);

      this.contenedor.appendChild(card);
    });
  }
}
