"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const BodyParser = require("koa-bodyparser");
const Path = require("path");
const Log4js = require("koa-log4");
const koa_static_1 = require("koa-static");
const Nunjucks = require("koa-nunjucks-promise");
const HomeController_1 = require("./controllers/HomeController");
const WSServer = require("./common/wss");
exports.WSServer = WSServer;
const utils_1 = require("./common/utils");
const JSBridgeController_1 = require("./controllers/JSBridgeController");
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
app.use(koa_static_1.default(`/${webConfig.staticPath}`));
app.use(HomeController_1.default.routes()).use(JSBridgeController_1.default.routes());
const logger = Log4js.getLogger('app');
app.webConfig = webConfig;
exports.default = app;
