// require('babel-core/register');

import * as Http from 'http';
import * as url from 'url';
import * as Koa from 'koa';
import * as BodyParser from 'koa-bodyparser';
import * as Path from 'path';
import * as Log4js from 'koa-log4';
import * as serve from 'koa-static';
import * as Nunjucks from 'koa-nunjucks-promise'

import Home from './controllers/HomeController';

//web socket server
import * as WSServer from './common/wss';

// utils
// import Webconfig from './common/webconfig'
import utils from './common/utils'

import JSBridge from './controllers/JSBridgeController';

//Web Environment
const isProdEnv: boolean = process.env.NODE_ENV === 'production';

const webConfigFileName = 'welinkconfig.json';
const webConfig:any = utils.readWebconfig(`${Path.resolve(__dirname)}/${webConfigFileName}`);

const app = new Koa();
app.use(Nunjucks(`${Path.resolve(__dirname)}/views`, {
  ext: 'html',  //target file is html
  noCache: !isProdEnv,  //noCache in devlopment environment
  filter: {
    json: (str: string): string => {
      return JSON.stringify(str, null, 2)
    }
  },

  globals: {  // global variable in Template
    STATIC_URL: '/static'
  }
}))

//http logs
app.use(Log4js.koaLogger(Log4js.getLogger('http'), { level: 'auto' }));
app.use(BodyParser());
const staticPath = `${process.cwd()}/${webConfig.staticPath}`;
app.use(serve(staticPath));
// app.use(serve(`/${webConfig.staticPath}`));
app.use(Home.routes()).use(JSBridge.routes());
const logger = Log4js.getLogger('app');

// const serve = app.listen(Config.listenPort, () => {
//   logger.info('[worker:%s] web server start listen on %s.\naddress: %s', process.pid, Config.listenPort, `http://localhost:${Config.listenPort}`);
// });

// TODO: 导出的 app，缺少wss
// app.wss = WSServer.createWebSocketServer(serve, null, null, null, () => { });

// 读取配置文件并挂在到app实例下
app.webConfig = webConfig;

export default app;
export {WSServer};

