const http = require('node:http');
const productos = require('./productos.json');

// POST /productos (el producto viene en el body)
// GET  /productos

const processRequest = (req, res) => {

   const { method, url } = req;

   switch(method){

    case 'GET' : {

        switch(url) {

            case '/productos': {
                console.log("pasamos...");
                res.writeHead(200, {'Content-Type':'application/json'});
                res.end(JSON.stringify(productos));
                break;
            } 

            default:
        }


    } break;
    case 'POST': {

        switch(url){
            case '/productos': {

                let body = '';

                req.on('data', chunk => {
                    body += chunk
                });

                req.on('end', () => {
                    const producto = JSON.parse(body);
                    producto.id = Date.now()
                    productos.push(producto)

                    res.writeHead(201, {'Content-Type':'application/json'})
                    res.end(JSON.stringify(producto))
                } )

                break;
            }
        }



    } break;

   }
 

} 

const server = http.createServer(processRequest);

server.listen(3000, () => {
    console.log("Servidor en marcha escuchando el puerto 3000");
})
