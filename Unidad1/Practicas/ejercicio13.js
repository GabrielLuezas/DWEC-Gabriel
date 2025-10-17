/*

Ejercicio colorear triángulo
Un triángulo de color se crea a partir de una fila de colores, cada uno de los
cuales es rojo, verde o azul. Las filas sucesivas, cada una con un color
menos que la anterior, se generan considerando los dos colores que se
tocan en la fila anterior.
Si estos colores son idénticos, se utiliza el mismo color en la nueva fila. Si
son diferentes, se utiliza el color que falta en la nueva fila. Así se continúa
hasta que se genera la última fila, con un solo color.


*/

function ejercicio13(string) {
  let array = string.split("");

  const arraySiguiente = [];

  for (let i = 0; i < array.length; i++) {
    let letraAux1 = array[i];
    let letraAux2 = array[i + 1];
    if (letraAux1 === "R" && letraAux2 === "R") {
      arraySiguiente.push("R");
    } else if (letraAux1 === "R" && letraAux2 === "G") {
      arraySiguiente.push("B");
    } else if (letraAux1 === "R" && letraAux2 === "B") {
      arraySiguiente.push("G");
    } else if (letraAux1 === "G" && letraAux2 === "R") {
      arraySiguiente.push("B");
    } else if (letraAux1 === "G" && letraAux2 === "G") {
      arraySiguiente.push("G");
    } else if (letraAux1 === "G" && letraAux2 === "B") {
      arraySiguiente.push("R");
    } else if (letraAux1 === "B" && letraAux2 === "R") {
      arraySiguiente.push("G");
    } else if (letraAux1 === "B" && letraAux2 === "G") {
      arraySiguiente.push("R");
    } else if (letraAux1 === "B" && letraAux2 === "B") {
      arraySiguiente.push("B");
    }
  }

  if (arraySiguiente.length > 1) {
    console.log(arraySiguiente);
    return ejercicio13(arraySiguiente.join(""));
  } else {
    return arraySiguiente.join("");
  }
}

console.log(ejercicio13("RRGBRGBB"));
