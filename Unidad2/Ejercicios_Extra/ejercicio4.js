function ejercicio4(nums) {
  const resultado = [];
  const vistos = new Set();

  for (let i = 0; i < nums.length - 2; i++) {
    for (let j = i + 1; j < nums.length - 1; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        if (nums[i] + nums[j] + nums[k] === 0) {
          const trio = [nums[i], nums[j], nums[k]].sort((a, b) => a - b);
          const clave = trio.join(",");

          if (!vistos.has(clave)) {
            resultado.push(trio);
            vistos.add(clave);
          }
        }
      }
    }
  }

  return resultado;
}

console.log(ejercicio4([-1, 0, 2, -1, -4, 3 , 1]));
