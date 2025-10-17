function ejercicio5(array) {
  const setNumeros = new Set(array);

  return setNumeros;
}

let arrayPrueba = [1, 1, 1, 2, 2, 3, 4, 5, 5, 4, 5, 2, 3, 7];

const mapaFinal = ejercicio5(arrayPrueba);

console.log(mapaFinal);
