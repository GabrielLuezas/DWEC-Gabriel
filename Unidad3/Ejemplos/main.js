const form = document.getElementById("formulario");
const historial = document.getElementById("historial");
const botonAlerta = document.getElementById("mostrar-alerta");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const numero = document.getElementById("numero").valueAsNumber;
  const texto = document.getElementById("texto").value;
  const correo = document.getElementById("correo").value;
  const password = document.getElementById("password").value;
  const checkbox = document.getElementById("checkbox").checked;
  const radio = document.querySelector('input[name="opcion"]:checked').value;
  const fecha = document.getElementById("fecha").value;
  const color = document.getElementById("color").value;
  const rango = document.getElementById("rango").valueAsNumber;
  const archivo = document.getElementById("archivo").files[0];

  const p = document.createElement("p");
  p.innerHTML = `
    Número: ${numero} <br>
    Texto: ${texto} <br>
    Correo: ${correo} <br>
    Contraseña: ${password} <br>
    Checkbox: ${checkbox} <br>
    Radio: ${radio} <br>
    Fecha: ${fecha} <br>
    Color: ${color} <br>
    Rango: ${rango} <br>
    Archivo: ${archivo ? archivo.name : "Ninguno"}
  `;
  historial.prepend(p);

  form.reset();
});

// Nuevo botón: muestra un alert con un mensaje
botonAlerta.addEventListener("click", () => {
  const texto = document.getElementById("texto").value;
  alert(`El texto actual del input es: "${texto}"`);
});
