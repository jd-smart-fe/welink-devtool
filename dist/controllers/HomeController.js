"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const Log4js = require("koa-log4");
const utils_1 = require("../common/utils");
const logger = Log4js.getLogger('home');
const router = new Router();
router.get('/', async (ctx) => {
    logger.info('home/');
    await ctx.render('home/index');
});
router.post('/getCurTokenKey', async (ctx) => {
    logger.info('getCurTokenKey');
    const token = ctx.app.webConfig['authenticationTokenKey'];
    let obj = {
        authenticationTokenKey: token,
    };
    ctx.body = obj;
});
router.post('/getLocalVersion', async (ctx, next) => {
    const version = {
        version: Number.parseInt(process.version.substring(1)),
    };
    ctx.body = version;
});
router.post('/index', async (ctx, next) => {
    logger.info('home/index');
    const token = ctx.request.body.token;
    ctx.app.webConfig["authenticationTokenKey"] = token;
    utils_1.default.convertToken(ctx.app.webConfig);
    console.log(ctx.app.webConfig["authenticationTokenKey"]);
    await next();
    ctx.body = { authenticationTokenKey: token };
});
exports.default = router;
//# sourceMappingURL=HomeController.js.map