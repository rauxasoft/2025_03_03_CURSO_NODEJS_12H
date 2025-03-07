import Reloj from './reloj.js'
import express from 'express'
import fs from 'node:fs'
import path from 'node:path'
import picocolors from 'picocolors'

const nombreReloj = process.argv[2] ?? "RELOJ";
const reloj = new Reloj(nombreReloj);

const PORT = process.env.PORT ?? 3000;
const ACTIONS = ['START','PAUSE','RESUME','INVERT','RESET']

const app = express();
app.disable('x-powered-by');

app.use((req, res, _next) => {

   const ACTION = (req.originalUrl.slice(1)).toUpperCase();

   if (req.method === "GET" && ACTIONS.includes(ACTION)){
      
      switch(ACTION){
         case 'START': reloj.start(); break;
         case 'PAUSE': reloj.pause(); break;
         case 'RESUME': reloj.resume(); break;
         case 'INVERT': reloj.invert(); break;
         case 'RESET': reloj.reset(); break;
      }

      const logReloj = {
         "nombre": `Reloj ${reloj.nombre}`,
         "action": ACTION,
         "estado": reloj.estado,
         "totalSegundos": reloj.totalSegundos,
         "entido": reloj.sentido
      }

      auditar(logReloj);
      return res.status(200).json(logReloj);
   }

   return res.status(400).json({ mensaje: "Se debe utiizar el verbo GET y la acción permitida" });
})

reloj.eventEmitter.on('timeGoesBy', (reloj) => {
   const display = picocolors.blue(`${reloj.horas}:${reloj.minutos}:${reloj.segundos}`)
   const sentido = reloj.sentido === 1 ? picocolors.cyan("UP") : picocolors.red("DOWN")
   const estado = picocolors.yellow(reloj.estado)

   console.log(`${reloj.nombre}: ${display} ${sentido} [${estado}]`)
});

app.listen(PORT, () => {
    console.log(picocolors.blue(`Servidor escuchando el puerto ${PORT}`));
});

function auditar(logReloj){
   // TODO Auditar en el fichero de logs...
}
