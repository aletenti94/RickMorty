const http = require('http');
const app = require('./app');

const port = 3000;

const server = http.createServer(app);

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
    const url = `http://127.0.0.1:${addr.port}`;
    console.log(`Listening on ${url}`);
}

server.listen(port);
server.on('error', onError)
server.on('listening', onListening)
