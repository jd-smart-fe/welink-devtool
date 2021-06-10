"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const Koa = require("koa");
const BodyParser = require("koa-bodyparser");
const serve = require("koa-static");
const koaViews = require("koa-views");
const websockify = require("koa-websocket");
const Log4js = require("log4js");
const Caches_1 = require("./cache/Caches");
const routes_1 = require("./routes");
const isProdEnv = process.env.NODE_ENV === 'production';
Caches_1.default.getInstance().init();
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
const staticPath = `${process.cwd()}/${Caches_1.default.getInstance().getWebConfig()['staticPath']}`;
app.use(serve(staticPath));
app.use(routes_1.default.routes());
//# sourceMappingURL=app.js.map