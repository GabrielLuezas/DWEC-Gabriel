function ejercicio1(str) {
  let contadorVocales = 0;

  let arr = Array.from(str);

  let arrVocales = ["a", "e", "i", "o", "u"];

  for (let i = 0; i < str.length; i++) {
    for (let d = 0; d < arrVocales.length; d++) {
      if (arr[i] === arrVocales[d]) {
        contadorVocales++;
      }
    }
  }

  return contadorVocales;
}

console.log(ejercicio1("murcielago"));
