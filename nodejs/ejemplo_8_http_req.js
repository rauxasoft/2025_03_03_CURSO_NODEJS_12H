const http = require('node:http');

// podemos realizar cambios "en caliente" si ejecutamos con --watch
// node --watch ejemplo_8_http_re.js

const server = http.createServer((req, res)  => {

    const parsedUrl = new URL(req.url, `http://${req.headers.host}`)

    const queryParams = Object.fromEntries(parsedUrl.searchParams.entries());
    const clientIP = req.socket.remoteAddress;
    const method = req.method;
    const headers = req.headers;

    const respuesta = {
        pathname: parsedUrl.pathname,
        method: method,
        ip: clientIP,
        headers: headers,
        parametrosRequet: queryParams
    }

  //res.setHeader('Content-Type', 'application/json');
    res.writeHead(200, {'Content-Type':'application/json'})
    res.end(JSON.stringify(respuesta))

});

server.listen(3000, () => {
    console.log("Servidor en marcha escuchando el puerto 3000");
})
