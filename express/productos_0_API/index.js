const express = require('express');
const productos = require('./productos.json');
const pc = require('picocolors');

const PORT = 3000;
const app = express();

app.disable('x-powered-by');

app.use('/api' ,(req, _res, next) => {
    console.log(pc.blue(`Interceptamos el path: ${req.originalUrl}`))
    next()
});

/*
app.use((req, _res, next) => {

    if(req.method !== "POST") return next();
    if(req.headers['content-type'] !== 'application/json') return next();

    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    })

    req.on('end', () => {
        const data = JSON.parse(body);
        console.log(pc.yellow(`Middleware deserializando ${body}`));
        req.body = data;
        next();
    })
})
*/

app.use(express.json()) // Este middleware hace lo mismo que tenemos comentado arriba

app.get('/productos', (_req, res) => {
    res.setHeader('Content-Type','application/json');
    return res.end(JSON.stringify(productos));
});

app.post('/productos', (req, res) => {
    const producto = req.body;
    producto.id = Date.now();
    productos.push(producto);
    console.log(pc.yellow(`Creado el producto ${producto.id}`))
    res.status(201).json(producto);
});

app.listen(PORT, () => {
    console.log(pc.red(`Servidor escuchando el puerto ${PORT}`));
});

