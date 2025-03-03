const fs = require('node:fs')

console.log("ANTES");

fs.readFile('./archivo1.txt', 'utf-8', (_error, contenido) => {
    console.log(contenido);
});

console.log("DESPUES");

