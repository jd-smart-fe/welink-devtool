import * as Koa from 'koa';
// import * as Router from 'koa-router';
import * as Log4js from 'log4js';
import Caches from '../cache/caches';

const caches = Caches.getInstance();

const logger = Log4js.getLogger('HomeController');

logger.level = 'info';

// const router = new Router();

// router.get('/home', async (ctx: Koa.Context) => {
//   logger.info('home/index');
//   await ctx.render('home/index');

// });
// 获取token
// router.post('/home/getCurTokenKey', async (ctx: Koa.Context) => {
//   logger.info('getCurTokenKey');
//   const token: string = caches.getWebConfig()['authenticationTokenKey'];
//   ctx.body = {
//     authenticationTokenKey: token,
//   };
// });
// 版本对象
// interface Iversion {
//   version: number;
// }

// 获取 node 版本号
// router.post('/home/getLocalVersion', async (ctx, next) => {
//   const version:Iversion = {
//     version: Number.parseInt(process.version.substring(1), 10),
//   };
//   ctx.body = version;
// });
// 更新token
// router.post('/home/index', async (ctx, next) => {
//   logger.info('home/index');
//   const token = ctx.body.token;
//   const webConfig = caches.getWebConfig();
//   webConfig['authenticationTokenKey'] = token;
//   // utils.convertToken(Caches.webConfig);
//   caches.setWebConfig(webConfig);
//   console.log(caches.getWebConfig()['authenticationTokenKey']);
//   await next();
//   ctx.body = { authenticationTokenKey: token };
// });

class HomeController {

  async index(ctx: Koa.Context, next: () => Promise<any>) {
    logger.info('home/index');
    await ctx.render('home/index');
  }
  async setToken(ctx: Koa.Context, next: () => Promise<any>) {
    logger.info('home/setToken');
    const token = ctx.body.token;
    const webConfig = caches.getWebConfig();
    webConfig['authenticationTokenKey'] = token;
    // utils.convertToken(Caches.webConfig);
    caches.setWebConfig(webConfig);
    // console.log(caches.getWebConfig()['authenticationTokenKey']);
    await next();
    ctx.body = { authenticationTokenKey: token };
  }

  async getCurTokenKey(ctx: Koa.Context, next: () => Promise<any>) {
    logger.info('getCurTokenKey');
    const token: string = caches.getWebConfig()['authenticationTokenKey'];
    ctx.body = {
      authenticationTokenKey: token,
    };
  }
  async getLocalVersion(ctx: Koa.Context, next: () => Promise<any>)  {
    const { version } = process;

    const versionFirst = version.replace('v', '').split('.')[0];
    ctx.body = {
      version: Number.parseInt(versionFirst, 10),
    };
  }
}

export default HomeController;
