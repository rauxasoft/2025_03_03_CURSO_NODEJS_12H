import Reloj from './reloj.js'
import express from 'express'
import fs from 'node:fs'
import path from 'node:path'
import picocolors from 'picocolors'

const nombreReloj = process.argv[2] ?? "RELOJ";
const reloj = new Reloj(nombreReloj);
const DATA_FILE = path.join(process.cwd(), 'logs_reloj.csv');
const PORT = process.env.PORT ?? 3000;
const ACTIONS = ['START','PAUSE','RESUME','INVERT','RESET'];

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
         "nombre": reloj.nombre,
         "action": ACTION,
         "estado": reloj.estado,
         "totalSegundos": reloj.totalSegundos,
         "sentido": reloj.sentido
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

const initCSV = () => {
    if(!fs.existsSync(DATA_FILE)){
        fs.writeFileSync(DATA_FILE, 'TIMESTAMP;NOMBRE_RELOJ;ESTADO;TOTAL_SEGUNDOS;SENTIDO\n', 'utf8');
    }
}

app.listen(PORT, () => {
   initCSV();
   console.log(picocolors.blue(`Servidor escuchando el puerto ${PORT}`));
});

const auditar = (logReloj) => {

   const lineaLog = `${Date.now()};${logReloj.nombre};${logReloj.estado};${logReloj.totalSegundos};${logReloj.sentido}\n`;

   fs.appendFile(DATA_FILE, lineaLog, err => {
      //TODO      
   });
   
}
