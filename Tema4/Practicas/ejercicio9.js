/*

Haz una función que pueda tomar cualquier número entero no
negativo como argumento y devolverlo con sus dígitos en orden
descendente. Esencialmente, reordenar los dígitos para crear el
mayor número posible.
Entrada: 42145 Salida: 54421
Entrada: 145263 Salida: 654321
Entrada: 123456789 Salida: 987654321


*/


function ejercicio9(numeros) {

    let arrayNumero = String(numeros).split("");

    const arrayFinal = []

    for (let i = arrayNumero.length -1 ; i >= 0; i--) {
        
        arrayFinal.push(arrayNumero[i])
    }

    return arrayFinal

}



console.log(ejercicio9(244215))


