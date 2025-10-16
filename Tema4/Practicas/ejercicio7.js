/*Escribe una función que tenga como parámetro un array de números
enteros. Tu trabajo es tomar esa array y encontrar un índice N en el
que la suma de los enteros a la izquierda de N sea igual a la suma de
los enteros a la derecha de N. Si no hay ningún índice que haga que
esto ocurra, devuelve -1. Si se le da un array con múltiples
respuestas, devuelve el menor índice correcto.

*/ 


 function ejercicio7(array) {
  for (let i = 0; i < array.length; i++) {
    let izquierda = array.slice(0, i).reduce((a, b) => a + b, 0);
    let derecha = array.slice(i + 1).reduce((a, b) => a + b, 0);

    if (izquierda === derecha) {
      return i;
    }
  }

  return -1;
}


console.log(ejercicio7([1, 2, 3, 4, 3, 2, 1]));
console.log(ejercicio7([1, 100, 50, -51, 1, 1]));
console.log(ejercicio7([20, 10, -80, 10, 10, 15, 35]));
console.log(ejercicio7([1, 2, 3, 4, 5]));