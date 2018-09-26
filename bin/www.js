#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const debug = require("debug");
const env = require("dotenv");
const http_1 = require("http");
env.load();
let port = normalizePort(process.env.PORT || 5678);
let app = server_1.default.bootstrap().app;
let connection_attempts = 0;
let max_connection_attempts = 5;
app.set('port', port);
let server = http_1.createServer(app);
server.listen(port);
process.on('uncaughtException', error => {
    console.log('uncaughtException', error);
    process.exit(1);
});
process.on('SIGTERM', error => {
    console.log('SIGTERM', error);
    process.exit(1);
});
server.on('error', (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    let bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            console.log(error.code);
            process.exit(1);
    }
});
server.on('listening', () => {
    let address = server.address();
    let bind = typeof port === 'string'
        ? `pipe ${address}`
        : `port ${address.port}`;
    debug(`Listening on ${bind}`);
});
function normalizePort(port) {
    let val = parseInt(port, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}
