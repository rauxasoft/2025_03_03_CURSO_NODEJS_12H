// podemos recoger argumentos
console.log(process.argv)

console.log(process.cwd());

// podemos salir
console.log("antes de salir");

// podemos ejecutar nuestras "últimas voluntades"
process.on('exit', () => {
    console.log("nos vamos!");
})

process.exit();

console.log("nunca me verás")