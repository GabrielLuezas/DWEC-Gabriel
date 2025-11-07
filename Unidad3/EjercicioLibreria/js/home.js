import { arrayLibros, guardarLibros } from "./datos.js";

const btnGuardar = document.getElementById("guardarLocal");
const btnCargar = document.getElementById("cargarLocal");

btnGuardar.addEventListener("click", () => {
  const librosSesion = sessionStorage.getItem("libros");

  if (librosSesion) {
    localStorage.setItem("librosGuardados", librosSesion);
  }

});

btnCargar.addEventListener("click", () => {
  const librosLocal = localStorage.getItem("librosGuardados");

  if (librosLocal) {
    sessionStorage.setItem("libros", librosLocal);

    const librosParsed = JSON.parse(librosLocal);
    arrayLibros.length = 0;
    arrayLibros.push(...librosParsed);

    guardarLibros();
  }
});
