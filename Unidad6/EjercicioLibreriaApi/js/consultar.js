const contenedor = document.getElementById("contenedorLibros");

let arrayLibros = await fetch("http://127.0.0.1:7777/libros").then(
  async (response) => {
    let libros = await response.json();

    return libros;
  }
);

function mostrarLibros() {
  contenedor.innerHTML = "";

  if (arrayLibros.length === 0) {
    const sinLibros = document.createElement("p");
    sinLibros.classList.add("sin-libros");
    sinLibros.textContent = "No hay libros registrados.";
    contenedor.appendChild(sinLibros);
    return;
  }

  arrayLibros.forEach((libro) => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta");

    const header = document.createElement("div");
    header.classList.add("tarjeta-header");
    header.classList.add(libro.prestado ? "prestado" : "disponible");

    const titulo = document.createElement("h3");
    titulo.textContent = libro.nombre;

    const estado = document.createElement("p");
    estado.textContent = libro.prestado ? "📕 Prestado" : "📗 Disponible";

    header.appendChild(titulo);
    header.appendChild(estado);

    const body = document.createElement("div");
    body.classList.add("tarjeta-body");

    const paginas = document.createElement("p");
    const strongPaginas = document.createElement("strong");
    strongPaginas.textContent = "Páginas: ";
    paginas.appendChild(strongPaginas);
    paginas.appendChild(document.createTextNode(libro.paginas));

    body.appendChild(paginas);
    tarjeta.appendChild(header);
    tarjeta.appendChild(body);

    contenedor.appendChild(tarjeta);
  });
}

mostrarLibros();
