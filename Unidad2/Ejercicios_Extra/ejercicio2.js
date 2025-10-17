/*Descripción:
Dada una cadena s, encuentra la longitud de la subcadena más larga que
no tenga caracteres repetidos.
Objetivo:
Devolver la longitud máxima de una subcadena con todos los caracteres
únicos. */




function ejercicio2(str) {
    let arrayFinal = []
    let array = Array.from(str);
    let cadenaAux= ""

    for (let i = 0; i < array.length; i++) {
       if (!cadenaAux.includes(array[i])) {
            cadenaAux += array[i];
        } else {
            if (cadenaAux.length > 0) {
                arrayFinal.push(cadenaAux);
            }
            const index = cadenaAux.indexOf(array[i]);
            cadenaAux = cadenaAux.slice(index + 1) + array[i];
        }
        
    }

    if (cadenaAux.length > 0) {
        arrayFinal.push(cadenaAux);
    }

    return arrayFinal
}

console.log(ejercicio2("aabcdeajjjj"));