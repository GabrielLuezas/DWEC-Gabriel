/*Se te da un arreglo de enteros nums y un entero target. Debes encontrar
dos números distintos en nums cuya suma sea igual a target. Devuelve sus
índices como un arreglo [i, j]. Se asume que existe exactamente una
solución.
Objetivo:
Encontrar los índices i y j donde nums[i] + nums[j] === target. */




function ejercicio1(array, target){
    let resultado = ""
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            if (i === j) continue;
            
            if(array[i] + array[j] === target){
                resultado = array.findIndex(num => num === array[i]) + " " + array.findIndex(num => num === array[j]) 
                return resultado
            }
        }
    }
}



let arrayPrueba = [7,2,8,9];

let target = 9

console.log(ejercicio1(arrayPrueba, target))