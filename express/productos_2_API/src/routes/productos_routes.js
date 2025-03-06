import { Router } from 'express';
import productos from './../productos.json' with {type:'json'};
import { validateProducto, validatePartialProducto } from './../schemas/producto_schema.js';

export const productosRouter = Router()

productosRouter.get('/', (req, res) => {

    const { min } = req.query

    if(min){
        const productosFiltrados = productos.filter(x => x.precio >= Number(min));
        return res.json(productosFiltrados);
    }

    return res.json(productos);
});

productosRouter.get('/:id', (req, res) => {

    const { id } = req.params;

    const producto = productos.find(x => x.id === Number(id));

    if(!producto) {
        return res.status(404).json({mensaje: "Producto no encontrado"});
    }
        
    return res.json(producto);

});

productosRouter.post('/', (req, res) => {

    const result = validateProducto(req.body)

    if(!result.success) {
        return res.status(400).json({error: JSON.parse(result.error.message)});
    }

    const nuevoProducto = {
        id: Date.now(),
        ...result.data
    };

    productos.push(nuevoProducto);
    console.log(`Creado el producto ${nuevoProducto.id}`)
    res.status(201).json(nuevoProducto);
});

productosRouter.delete('/:id', (req, res) => {
    
    const { id } = req.params;

    const productoIndex = productos.findIndex(x => x.id === Number(id));

    if(productoIndex === -1){
        return res.status(404).json({message: 'Producto no encontrado'});
    }

    productos.splice(productoIndex, 1);

    return res.sendStatus(204); // Cómo hacer para que no haya JSON!!!

});

productosRouter.patch('/:id', (req, res) => {

    const result = validatePartialProducto(req.body);

    if(!result.success) {
        return res.status(400).json({error: JSON.parse(result.error.message)});
    }

    const { id } = req.params;
    const productoIndex = productos.findIndex(x => x.id === Number(id));

    if(productoIndex === -1) {
        return res.status(404).json({message: "Producto no encontrado"});
    }

    delete result.data.id;

    const productoActualizado = {
        ...productos[productoIndex],
        ...result.data
    }

    productos[productoIndex] = productoActualizado;

    return res.sendStatus(204); // Cómo hacer para que no haya JSON!!!

});

