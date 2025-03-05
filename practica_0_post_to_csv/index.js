const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const pc = require('picocolors');

const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'datos.csv');

const initCSV = () => {
    if(!fs.existsSync(DATA_FILE)){
        fs.writeFileSync(DATA_FILE, 'ID;NOMBRE;PRECIO;DESCATALOGADO\n', 'utf8');
    }
}

const server = http.createServer((req, res) => {

    res.setHeader('Content-Type', 'application/json');

    if(req.method === 'POST' && req.url === '/productos'){

        let body = '';

        req.on('data', chunk => {
            body += chunk;
        })

        req.on('end', () => {

            try{

                const { id, nombre, precio, descatalogado } = JSON.parse(body);

                if (typeof id !== 'number' || 
                    typeof nombre !== 'string' ||
                    typeof precio !== 'number' ||
                    typeof descatalogado !== 'boolean') {

                    res.statusCode = 400;
                    return res.end(JSON.stringify({error: 'Datos invalidos'}));
                }

                // Pasamos pantalla...

                const newProduct = `${id};${nombre};${precio};${descatalogado}\n`;

                fs.appendFile(DATA_FILE, newProduct, err => {
                    if (err) {

                        res.statusCode = 500;
                        return res.end(JSON.stringify({error: 'Error al guardar el producto'}));
                        
                        /*
                        res.writeHead(500, {'Content-Type': 'application/json'});
                        return res.end(JSON.stringify({error: 'Error al guardar el producto'}));
                        */
                    }

                    // Pasamos pantalla

                    res.statusCode = 201;
                    return res.end(JSON.stringify({mensaje: 'Producto guardado con exito'}));
                })

            } catch(error){
                res.statusCode = 400;
                return res.end(JSON.stringify({error: 'Error al procesar la solicitud'}));
            }
        })

    } else {
        res.statusCode = 404;
        return res.end(JSON.stringify({error: 'Ruta no encontrada'}));  
    }

});

server.listen(PORT, () => {
    initCSV();
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})
