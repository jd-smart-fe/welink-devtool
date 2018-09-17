

import Config from '../src/config/env.config';
import * as Log4js from 'log4js';
import { app, WSServer } from '../src/app';



const logger = Log4js.getLogger('bin');
logger.level = 'info';
const serve = app.listen(Config.listenPort, () => {
  logger.info('[worker:%s] web server start listen on %s.\naddress: %s', process.pid, Config.listenPort, `http://localhost:${Config.listenPort}`);
});
app.wss = WSServer.createWebSocketServer(serve, null, null, null, () => { });
