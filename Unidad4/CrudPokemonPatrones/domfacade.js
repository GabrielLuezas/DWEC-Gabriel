class DOMFacade {
  constructor(contenedorId) {
    this.contenedor = document.getElementById(contenedorId);
  }

  mostrarPokemons(lista) {
    this.contenedor.innerHTML = "";

    lista.forEach(p => {
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `
        <h3>${p.nombre}</h3>
        <p>Tipo: ${p.tipo}</p>
      `;
      this.contenedor.appendChild(card);
    });
  }
}
