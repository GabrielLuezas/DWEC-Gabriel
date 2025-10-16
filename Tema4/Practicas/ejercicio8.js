/*  
Implementa una función de diferencia, que devuelva un array que
tenga todos los valores de la lista pasada como primer parámetro
que no están presentes en la lista b manteniendo su orden. Si un
valor está presente en b, todas sus apariciones deben ser eliminadas
de la otra:
arrayDiff([1,2],[1]) == [2]
arrayDiff([1,2,2,2,3],[2]) == [1,3]
La representación binaria de 1234 es 10011010010, por lo que la función
debería devolver 5 en este caso
*/


function ejercicio8(arrayA, arrayB) {
  const resultado = [];

  for (let i = 0; i < arrayA.length; i++) {
    let estaEnB = false;

    for (let j = 0; j < arrayB.length; j++) {
      if (arrayA[i] === arrayB[j]) {
        estaEnB = true;
        break;
      }
    }

    if (!estaEnB) {
      resultado.push(arrayA[i]);
    }
  }

  return resultado;
}



console.log(ejercicio8([1,2],[1]))
console.log(ejercicio8([1,2,2,2,3],[2]));