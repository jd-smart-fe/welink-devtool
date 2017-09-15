"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const BodyParser = require("koa-bodyparser");
const Path = require("path");
const HomeController_1 = require("./controllers/HomeController");
const Log4js = require("koa-log4");
const Nunjucks = require("koa-nunjucks-promise");
const static_files_1 = require("./libs/static-files");
const env_config_1 = require("./config/env.config");
const WSServer = require("./common/wss");
const utils_1 = require("./common/utils");
const isProdEnv = process.env.NODE_ENV === 'production';
const webConfigFileName = 'welinkconfig.json';
const webConfig = utils_1.default.readWebconfig(`${Path.resolve(__dirname)}/${webConfigFileName}`);
const app = new Koa();
app.use(Nunjucks(`${Path.resolve(__dirname)}/views`, {
    ext: 'html',
    noCache: !isProdEnv,
    filter: {
        json: (str) => {
            return JSON.stringify(str, null, 2);
        }
    },
    globals: {
        STATIC_URL: '/static'
    }
}));
app.use(Log4js.koaLogger(Log4js.getLogger('http'), { level: 'auto' }));
app.use(BodyParser());
app.use(static_files_1.default(webConfig.staticPath));
const JSBridgeController_1 = require("./controllers/JSBridgeController");
app.use(HomeController_1.default.routes()).use(JSBridgeController_1.default.routes());
const logger = Log4js.getLogger('app');
const serve = app.listen(env_config_1.default.listenPort, () => {
    logger.info('[worker:%s] web server start listen on %s.\naddress: %s', process.pid, env_config_1.default.listenPort, `http://localhost:${env_config_1.default.listenPort}`);
});
app.wss = WSServer.createWebSocketServer(serve, null, null, null, () => { });
app.webConfig = webConfig;
//# sourceMappingURL=app.js.map