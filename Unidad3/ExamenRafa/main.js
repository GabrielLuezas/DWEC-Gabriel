const listaHistorial = document.getElementById("listaHistorial");

function countGoodPairs(nums) {
  let numeroParesBuenos = 0;

  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length; j++) {
      if (i < j && nums[i] === nums[j]) {
        numeroParesBuenos++;
      }
    }
  }

  return numeroParesBuenos;
}

let texto = "";
texto = prompt();

let arrayNumeros = texto.split(",");

for (let i = 0; i < arrayNumeros.length; i++) {
  let numero = parseInt(arrayNumeros[i]);

  if (isNaN(numero)) {
    alert("Hay un error");
  }
}

let paresBuenos = countGoodPairs(arrayNumeros);

const item = document.createElement("li");
item.textContent = `Numero de pares buenos ${paresBuenos}`;
listaHistorial.insertBefore(item, listaHistorial.firstChild);
