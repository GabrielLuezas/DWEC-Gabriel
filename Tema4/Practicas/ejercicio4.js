function ejercicio4(array) {
  let numeroDeVeces = 0;
  let claveMin, valorMin;
  let arrayNumero = array.length;
  const mapaNumeros = new Map();
  const mapaNumeroReturn = new Map();

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
    if (valor % 2 !== 0) {
      claveMin = clave;
      valorMin = valor;
      mapaNumeroReturn.set(claveMin, valorMin);
    }
  }

  return mapaNumeroReturn;
}
let arrayPrueba = [1, 1, 1, 2, 2, 3, 4, 5, 5, 4, 5, 2, 3];

console.log(ejercicio4(arrayPrueba));
