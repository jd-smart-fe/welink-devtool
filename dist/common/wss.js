"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws = require("ws");
const Log4js = require("koa-log4");
const logger = Log4js.getLogger('wss');
const WebSocketServer = ws.Server;
function createWebSocketServer(serve, onConnection, onMessage, onClose, onError) {
    let wss = new WebSocketServer({
        server: serve,
    });
    wss.broadcast = function broadcast(data) {
        logger.info('broadcast');
        wss.clients.forEach(function each(client) {
            client.send(data);
        });
    };
    wss.on('connection', function (ws, req) {
        let location = req.url;
        if (req.url !== '/websocket') {
            ws.close(4000, 'Invalid URL');
        }
    });
    console.log('WebSocketServer was attached.');
    return wss;
}
exports.createWebSocketServer = createWebSocketServer;
