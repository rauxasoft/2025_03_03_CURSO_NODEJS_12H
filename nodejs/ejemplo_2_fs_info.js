const fs = require('node:fs')

const info = fs.statSync('./archivo1.txt');

console.log(
    info.isFile(),
    info.isDirectory(),
    info.isSymbolicLink(),
    info.size
)