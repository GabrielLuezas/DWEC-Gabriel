function ejercicio6(string) {
  let numeroDeVeces = 0;

  let acumulador = 1;

  let numeroComprobador = 11;

  let numeroAuxiliar = 0;

  let arrayNumero = undefined;

  if (parseInt(string) < 10) {
    numeroComprobador = 0;
  } else {
    numeroComprobador = 11;
  }

  while (numeroComprobador >= 10) {
    if (acumulador === 1) {
      arrayNumero = string.split("");
    } else {
      let string = String(acumulador);
      arrayNumero = string.split("");
    }
    acumulador = 1;
    for (let i = 0; i < arrayNumero.length; i++) {
      numeroAuxiliar = arrayNumero[i];
      acumulador = acumulador * numeroAuxiliar;
    }

    numeroComprobador = acumulador;
    numeroDeVeces++;
  }

  return numeroDeVeces;
}

let numero = ejercicio6("39");

console.log(numero);
