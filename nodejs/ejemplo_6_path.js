const path = require('node:path');

// Para conocer la barra separadora
console.log(path.sep);

// Para unir rutas
const filePath = path.join('content', 'subcarpeta', 'experimento.txt');
console.log(filePath)

// Extrae el nombre del archivo
const fileName = path.basename("/tmp/subcarpoeta/documentos.ort");
console.log(fileName)

// Extrae el nombre del archivo (sin extensión)
const fileNameNoExt = path.basename("/tmp/subcarpoeta/documentos.ort", ".ort");
console.log(fileNameNoExt)

// Extrae la extensión del archivo
const extension = path.extname("/tmp/subcarpoeta/documentos.ort");
console.log(extension)
