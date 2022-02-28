/**
 * external modules import
 */
const http = require('http');
const app = require('./app');

/**
 * port value setting
 */
const port = 3000;

/**
 * server creation
 */
const server = http.createServer(app);

/**
 * catch errors in server creation
 * @param {object} error 
 */
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

/**
 * code executed when server is created and listening
 */
function onListening () {
    const addr = server.address();
    const url = `http://127.0.0.1:${addr.port}`;
    console.log(`Listening on ${url}`);
}

/**
 * server listening
 */
server.listen(port);
server.on('error', onError)
server.on('listening', onListening)
