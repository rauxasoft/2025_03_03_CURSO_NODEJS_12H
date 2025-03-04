const http = require('node:http');
const equipos = require('./productos.json');

const processRequest = (_req, res) => {

    res.setHeader('Content-Type','application/json');
    return res.end(JSON.stringify(equipos));
}

const server = http.createServer(processRequest);

server.listen(3000, () => {
    console.log("Servidor en marcha escuchando el puerto 3000");
})
