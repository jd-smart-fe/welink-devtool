import * as Koa from 'koa';
import * as BodyParser from 'koa-bodyparser';
import * as Path from 'path';
import * as Log4js from 'log4js';
import * as serve from 'koa-static';
import * as websockify from 'koa-websocket';
import * as koaViews from 'koa-views';

import homeRouter from './routers/home';

// utils
import utils from './common/utils';

import JSBridge from './routers/jsbridge';
import IWeilinconfig from './interfaces/IWelinkConfig';
import Caches from './cache/caches';

// Web Environment
const isProdEnv: boolean = process.env.NODE_ENV === 'production';

const webConfigFileName = 'welinkconfig.json';
const webConfig: IWeilinconfig = utils.readWebconfig(
  `${Path.resolve(__dirname)}/${webConfigFileName}`,
);

// cache webConfig
Caches.getInstance().init();

const app = websockify(new Koa());

app.use(
  koaViews(`${__dirname}/views`, {
    map: {
      html: 'nunjucks',
    },
  }),
);

const logger = Log4js.getLogger('app');
logger.level = 'info';

app.use(BodyParser());
const staticPath = `${process.cwd()}/${webConfig.staticPath}`;
app.use(serve(staticPath));
app.use(homeRouter.routes());
app.use(JSBridge.routes());

app.ws.use((ctx: websockify.MiddlewareContext) => {
  // global.setInterval(() => {
  //   ctx.websocket.send('Hello World');
  // },                 100);
});
// TODO: 导出的 app，缺少wss
// app.wss = WSServer.createWebSocketServer(serve, null, null, null, () => { });

// export default app;

export { app };
