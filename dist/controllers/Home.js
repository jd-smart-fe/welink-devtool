"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Log4js = require("log4js");
const Caches_1 = require("../cache/Caches");
const caches = Caches_1.default.getInstance();
const logger = Log4js.getLogger('HomeController');
logger.level = 'info';
class HomeController {
    async index(ctx, next) {
        logger.info('home/index');
        await ctx.render('home/index');
    }
    async setToken(ctx, next) {
        logger.info('home/setToken');
        const params = ctx.request.body;
        const token = params.token;
        const webConfig = caches.getWebConfig();
        webConfig['authenticationTokenKey'] = token;
        caches.setWebConfig(webConfig);
        await next();
        ctx.body = { authenticationTokenKey: token };
    }
    async getCurTokenKey(ctx, next) {
        logger.info('getCurTokenKey');
        const token = caches.getWebConfig()['authenticationTokenKey'];
        ctx.body = {
            authenticationTokenKey: token,
        };
    }
    async getLocalVersion(ctx, next) {
        const { version } = process;
        const versionFirst = version.replace('v', '').split('.')[0];
        ctx.body = {
            version: Number.parseInt(versionFirst, 10),
        };
    }
}
exports.default = HomeController;
//# sourceMappingURL=Home.js.map