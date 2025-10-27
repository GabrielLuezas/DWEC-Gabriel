document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('formFactorial');
  const inputNumero = document.getElementById('numero');
  const resultadoDiv = document.getElementById('resultado');
  const listaHistorial = document.getElementById('listaHistorial');

  // Función para calcular el factorial
  function calcularFactorial(n) {
    if (n === 0 || n === 1) return 1;
    let resultado = 1;
    for (let i = 2; i <= n; i++) {
      resultado *= i;
    }
    return resultado;
  }

  // Manejador del formulario
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const numero = parseInt(inputNumero.value);
    if (isNaN(numero) || numero < 0) {
      resultadoDiv.textContent = "⚠️ Por favor, introduce un número válido (mayor o igual a 0).";
      return;
    }

    const factorial = calcularFactorial(numero);
    resultadoDiv.textContent = `El factorial de ${numero} es: ${factorial}`;

    // Crear y agregar el elemento al historial
    const item = document.createElement('li');
    item.textContent = `Factorial de ${numero} = ${factorial}`;
    listaHistorial.insertBefore(item, listaHistorial.firstChild); // asegura que se agregue arriba

    // Limpiar el campo de entrada
    inputNumero.value = '';
    inputNumero.focus();
  });
});
