function dividirPorRestas(dividendo, divisor) {
  if (divisor === 0) {
    return "No se puede dividir entre cero.";
  }

  const negativo = (dividendo < 0) ^ (divisor < 0);

  let a = Math.abs(dividendo);
  const b = Math.abs(divisor);
  let cociente = 0;

  while (a >= b) {
    a -= b;
    cociente++;
  }

  if (negativo) cociente = -cociente;

  return {
    cociente: cociente,
    resto: a
  };
}

console.log(dividirPorRestas(13, 4));
console.log(dividirPorRestas(20, -5));
console.log(dividirPorRestas(-15, 4));
console.log(dividirPorRestas(12, 4));