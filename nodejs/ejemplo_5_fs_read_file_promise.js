const fs = require('node:fs/promises')

// Existe la posibilidad de trabajar con promesas si el método de forma natural no me la devuelve
//const { promisify } = require('node:util')
//const promesa = promisify(fs.readFile)

console.log("ANTES");

const promesa1 = fs.readFile('./archivo1.txt', 'utf-8');
const promesa2 = fs.readFile('./archivo2.txt', 'utf-8');

Promise.all([promesa1, promesa2])
    .then((datos) => {
        console.log(datos[0]);
        console.log(datos[1]);
    })
    .catch((error) => {
        console.log(error);
    });

/*
promesa1.then((contenido) => {
    console.log(contenido);
});

promesa1.catch((error) => {
    console.log(error);
});
*/

console.log("DESPUES");

