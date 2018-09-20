"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const BodyParser = require("koa-bodyparser");
const Path = require("path");
const Log4js = require("log4js");
const serve = require("koa-static");
const websockify = require("koa-websocket");
const koaViews = require("koa-views");
const routes_1 = require("./routes");
const utils_1 = require("./common/utils");
const caches_1 = require("./cache/caches");
const isProdEnv = process.env.NODE_ENV === 'production';
const webConfigFileName = 'welinkconfig.json';
const webConfig = utils_1.default.readWebconfig(`${Path.resolve(__dirname)}/${webConfigFileName}`);
caches_1.default.getInstance().init();
const app = websockify(new Koa());
exports.app = app;
app.use(koaViews(`${__dirname}/views`, {
    map: {
        html: 'nunjucks',
    },
}));
const logger = Log4js.getLogger('app');
logger.level = 'info';
app.use(BodyParser());
const staticPath = `${process.cwd()}/${webConfig.staticPath}`;
app.use(serve(staticPath));
app.use(routes_1.default.routes());
app.ws.use((ctx) => {
});
//# sourceMappingURL=app.js.map