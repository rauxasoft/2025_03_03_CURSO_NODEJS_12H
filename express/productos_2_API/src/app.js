import express, { json } from 'express';
import picocolors from 'picocolors';
import { productosRouter } from './routes/productos_routes.js'
import { corsMiddleware } from './middlewares/cors.js';

const app = express();
const PORT = process.env.PORT ?? 3000;
app.disable('x-powered-by');

app.use(json());
app.use(corsMiddleware());
app.use('/productos', productosRouter);

app.listen(PORT, () => {
    console.log(picocolors.blue(`Servidor escuchando el puerto ${PORT}`));
});

