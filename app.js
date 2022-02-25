import express from 'express';

require('dotenv').config({ path: 'settings.env' });

const app = express();
import { createServer } from 'http';

//carico file di routing
import routes from './routes/index';

const port = process.env.PORT || '3000';
app.set('port', port);

//inizializzo route handling
app.use('/', routes)

const server = createServer(app);

server.listen(port);
server.on('error', onError)
server.on('listening', onListening)

function onError (error) {
    const bind = 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
        default:
            throw error
    }      
}

function onListening () {
    const addr = server.address();
    const url = `http://localhost:${addr.port}`;
    console.log(`Listening on ${url}`);
}