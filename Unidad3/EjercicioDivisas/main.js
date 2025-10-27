import { cambioDivisa } from "./divisaExchange.js";

const btnCabmbiar = document.getElementById("botonCambiar");

btnCabmbiar.addEventListener("click", function (e) {
  const importe = parseInt(document.getElementById("numero").value);
  const valor1 = document.getElementById("valor1");
  const valor2 = document.getElementById("valor2");
  const fromValor1 = valor1[valor1.selectedIndex].value;
  const fromValor2 = valor2[valor2.selectedIndex].value;

  cambioDivisa(importe, valor1, valor2);
});

function addToHistoric(importeOrigen, importeCambiado, valor1, valor2) {
  const fecha = new Date(Date.now());
  const para = document.createElement("p");
  //const node = document.createTextNode('${})
  para.appendChild(node);
  const element = document.getElementById("idHistorico");
}
