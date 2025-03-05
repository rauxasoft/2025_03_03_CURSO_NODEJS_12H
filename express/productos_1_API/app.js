const express = require('express');
const productos = require('./productos.json');
const pc = require('picocolors');
const { validateProducto, validatePartialProducto } = require('./schemas/producto_schema')

const app = express();

// CONFIGURACIÓN DEL SERVIDOR

app.disable('x-powered-by');

// MIDDLEWARE

app.use(express.json()); 

// RUTAS

app.get('/productos', (req, res) => {

    const { min } = req.query

    if(min){
        const productosFiltrados = productos.filter(x => x.precio >= Number(min));
        return res.json(productosFiltrados);
    }

    return res.json(productos);
});

app.get('/productos/:id', (req, res) => {

    const { id } = req.params;

    const producto = productos.find(x => x.id === Number(id));

    if(!producto) {
        return res.status(404).json({mensaje: "Producto no encontrado"});
    }
        
    return res.json(producto);

});

app.post('/productos', (req, res) => {

    const result = validateProducto(req.body)

    if(!result.success) {
        return res.status(400).json({error: JSON.parse(result.error.message)});
    }

    const nuevoProducto = {
        id: Date.now(),
        ...result.data
    };

    productos.push(nuevoProducto);
    console.log(pc.yellow(`Creado el producto ${nuevoProducto.id}`))
    res.status(201).json(nuevoProducto);
});

app.delete('/productos/:id', (req, res) => {
    
    const { id } = req.params;

    const productoIndex = productos.findIndex(x => x.id === Number(id));

    if(productoIndex === -1){
        return res.status(404).json({message: 'Producto no encontrado'});
    }

    productos.splice(productoIndex, 1);

    return res.status(204);

});

app.patch('/productos/:id', (req, res) => {

    const result = validatePartialProducto(req.body);

    if(!result.success) {
        return res.status(400).json({error: JSON.parse(result.error.message)});
    }

    const { id } = req.params;
    const productoIndex = productos.findIndex(x => x.id === Number(id));

    if(productoIndex === -1) {
        return res.status(404).json({message: "Producto no encontrado"});
    }

    const productoActualizado = {
        ...productos[productoIndex],
        ...result.data
    }

    productos[productoIndex] = productoActualizado;

    return res.status(204);

});

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log(pc.red(`Servidor escuchando el puerto ${PORT}`));
});

