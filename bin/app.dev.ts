import Config from '../src/config/config';
import * as Log4js from 'log4js';
import { app } from '../src/app';

const logger = Log4js.getLogger('bin');
logger.level = 'info';
app.listen(Config.listenPort, () => {
  logger.info(
    '[worker:%s] web server start listen on %s.\naddress: %s',
    process.pid,
    Config.listenPort,
    `http://localhost:${Config.listenPort}`,
  );
});
// app.ws = WSServer.createWebSocketServer(serve, null, null, null, () => {});
