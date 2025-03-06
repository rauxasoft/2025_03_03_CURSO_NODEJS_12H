import cors from 'cors';

export const corsMiddleware = () => cors({

    origin: (origin, callback) => {

        console.log(`Nos llega una petición desde ${origin}`)

        const ACCEPTED_ORIGINS = [
            'http://localhost:3000',
            'http://localhost:1234',
            'https://pgrsoft.com'
        ]

        if(ACCEPTED_ORIGINS.includes(origin)){
            return callback(null, true); 
        }

        if(!origin){
            return callback(null, true)
        }

        return callback(new Error('Not allower'), false);

    }

});