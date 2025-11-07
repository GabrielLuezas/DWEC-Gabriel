export const arrayLibros = JSON.parse(sessionStorage.getItem("libros")) || [];

window.arrayLibros = arrayLibros;

export function guardarLibros() {
  sessionStorage.setItem("libros", JSON.stringify(arrayLibros));
}
