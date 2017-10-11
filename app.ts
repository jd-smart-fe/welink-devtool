// require('babel-core/register');

import * as Http from 'http';
import * as url from 'url';
import * as Koa from 'koa';
import * as BodyParser from 'koa-bodyparser';
import * as Path from 'path';
import Home from './controllers/HomeController';
// log Middleware
import * as Log4js from 'koa-log4';
// 模板引擎 Middleware
import * as Nunjucks from 'koa-nunjucks-promise'
// 静态资源 Middleware
import StaticFiles from './libs/static-files';
// web config
import Config from './config/env.config'
//web socket server
import * as WSServer from './common/wss';

// utils
// import Webconfig from './common/webconfig'
import utils from './common/utils'


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
// app.use(StaticFiles(webConfig.staticPath, `${__dirname}${webConfig.staticPath}`));
app.use(StaticFiles(`/${webConfig.staticPath}`));
import JSBridge from './controllers/JSBridgeController';
app.use(Home.routes()).use(JSBridge.routes());
const logger = Log4js.getLogger('app');
const serve = app.listen(Config.listenPort, () => {
  logger.info('[worker:%s] web server start listen on %s.\naddress: %s', process.pid, Config.listenPort, `http://localhost:${Config.listenPort}`);
});
app.wss = WSServer.createWebSocketServer(serve, null, null, null, () => { });
// 读取配置文件并挂在到app实例下

app.webConfig = webConfig;

