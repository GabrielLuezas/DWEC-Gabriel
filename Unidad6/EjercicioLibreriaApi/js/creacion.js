const form = document.getElementById("crearLibro");
const nombreAutor = document.getElementById("nombre");
const paginasLibro = document.getElementById("paginas");
const prestado = document.getElementById("prestado");

function crearLibro(nombre, paginas, prestado) {
  const libro = new Libro(nombre, paginas, prestado);
  arrayLibros.push(libro);
  guardarLibros();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  crearLibro(nombreAutor.value, paginasLibro.value, prestado.checked);
  form.reset();
});
