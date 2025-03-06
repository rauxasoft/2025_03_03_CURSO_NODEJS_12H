import Reloj from './reloj.js'
import picocolors from 'picocolors'

const r1 = new Reloj("CASIO");

r1.start();

r1.eventEmitter.on('timeGoesBy', (reloj) => {

   const display = picocolors.blue(`${reloj.horas}:${reloj.minutos}:${reloj.segundos}`)
   const sentido = reloj.sentido === 1 ? picocolors.cyan("UP") : picocolors.red("DOWN")
   const estado = picocolors.yellow(reloj.estado)

   console.log(`${reloj.nombre}: ${display} ${sentido} [${estado}]`)
});

console.log("entramos")


