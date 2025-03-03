const fs = require('node:fs')

const contenido = fs.readFileSync('./archivo1.txt', 'utf-8');

console.log(contenido);