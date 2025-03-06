import EventEmitter from 'node:events'
import { clearInterval } from 'node:timers';

class Reloj {

    intervalId = undefined;
    sentido = 1;
    totalSegundos = 0;
    estado = "STOPPED";

    constructor(nombre){
        this.nombre = nombre;
        this.eventEmitter = new EventEmitter();
    }

    resume(){

        clearInterval(this.intervalId);

        this.estado = "RUNNING";

        this.intervalId = setInterval(() => {
            this.totalSegundos += this.sentido;

            if(this.totalSegundos === 0 && this.sentido === -1){
                this.reset();
            } else {
                this.emitirEvento();
            }

        }, 1000);

    }

    start(){
        this.totalSegundos = 0;
        this.resume();
    }

    pause(){
        clearInterval(this.intervalId);
        this.estado = "PAUSED";
        this.emitirEvento();

    }

    invert(){
        this.sentido *= -1;
        this.emitirEvento();
    }

    reset(){
        clearInterval(this.intervalId);
        this.totalSegundos = 0;
        this.sentido = 1;
        this.estado = "STOPPED";
        this.emitirEvento();
    }

    emitirEvento(){

        this.eventEmitter.emit('timeGoesBy', {
            nombre: this.nombre,
            totalSegundos: this.totalSegundos,
            horas: ("0" + Math.floor(this.totalSegundos / 3600)).slice(-2),
            minutos: ("0" + Math.floor(this.totalSegundos / 60 % 60)).slice(-2),
            segundos: ("0" + Math.floor(this.totalSegundos % 60)).slice(-2),
            sentido: this.sentido,
            estado: this.estado
        });

    }

}

export default Reloj;