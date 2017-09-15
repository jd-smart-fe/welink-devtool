/**
 * websocket server
 */
import * as ws from 'ws';

import * as Log4js from 'koa-log4';

const logger = Log4js.getLogger('wss');

const WebSocketServer = ws.Server;


export function createWebSocketServer(serve, onConnection, onMessage, onClose, onError) {
    let wss = new WebSocketServer({
        server: serve,
    });
    wss.broadcast = function broadcast(data) {
        logger.info('broadcast');
        wss.clients.forEach(function each(client) {
            client.send(data);
        });
    };
    // onConnection = onConnection || function () {
    //     logger.info('[WebSocket] connected.');
    // };
    // onMessage = onMessage || function (msg) {
    //     logger.info('[WebSocket] message received: ' + msg);
    // };
    // onClose = onClose || function (code, message) {
    //     logger.info(`[WebSocket] closed: ${code} - ${message}`);
    // };
    // onError = onError || function (err) {
    //     logger.info('[WebSocket] error: ' + err);
    // };
    wss.on('connection', function (ws, req) {
        let location = req.url;
        if (req.url !== '/websocket') {
            // close ws:
            ws.close(4000, 'Invalid URL');
        }
        //   // check user:
        //   let user = parseUser(ws.upgradeReq);
        //   if (!user) {
        //     ws.close(4001, 'Invalid user');
        //   }
        //   ws.user = user;
        //   ws.wss = wss;
        //   onConnection.apply(ws);
    });
    console.log('WebSocketServer was attached.');
    return wss;
}


//   var messageIndex = 0;

//   function createMessage(type, user, data) {
//     messageIndex++;
//     return JSON.stringify({
//       id: messageIndex,
//       type: type,
//       user: user,
//       data: data
//     });
//   }

//   function onConnect() {
//     let user = this.user;
//     let msg = createMessage('join', user, `${user.name} joined.`);
//     this.wss.broadcast(msg);
//     // build user list:
//     let users = this.wss.clients.map(function (client) {
//       return client.user;
//     });
//     this.send(createMessage('list', user, users));
//   }

//   function onMessage(message) {
//     console.log(message);
//     if (message && message.trim()) {
//       let msg = createMessage('chat', this.user, message.trim());
//       this.wss.broadcast(msg);
//     }
//   }

//   function onClose() {
//     let user = this.user;
//     let msg = createMessage('left', user, `${user.name} is left.`);
//     this.wss.broadcast(msg);
//   }
