function ejercicio3(array) {
  let numeroDeVeces = 0;
  let claveMin, valorMin;
  let arrayNumero = array.length;
  const mapaNumeros = new Map();

  for (let i = 0; i < arrayNumero; i++) {
    for (let d = 0; d < arrayNumero; d++) {
      if (array[i] === array[d]) {
        numeroDeVeces++;
      }
    }
    if (!mapaNumeros.has(array[i])) {
      mapaNumeros.set(array[i], numeroDeVeces);
    }
    numeroDeVeces = 0;
  }

  for (const [clave, valor] of mapaNumeros) {
    if (valorMin === undefined || valor < valorMin) {
      claveMin = clave;
      valorMin = valor;
    }
  }

  return (
    "El numero " +
    claveMin +
    " es el numero con menor numero de repeticiones :" +
    valorMin
  );
}
let arrayPrueba = [1, 1, 1, 2, 2, 3, 4, 5, 5, 4, 5, 2, 3];

console.log(ejercicio3(arrayPrueba));
