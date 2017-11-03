import * as Router from 'koa-router';
import * as Log4js from 'koa-log4';
// import tokenConvert from '../common/tokenConvert';
import  utils from '../common/utils';

const logger = Log4js.getLogger('home');
const router = new Router();

router.get('/', async (ctx) => {
  logger.info('home/');
  await ctx.render('home/index');
});
// 获取token
router.post('/getCurTokenKey', async (ctx) => {
  logger.info('getCurTokenKey');
  // ctx.app.wss.broadcast('doudou');
  const token: string = ctx.app.webConfig['authenticationTokenKey'];
  let obj: object = {
    authenticationTokenKey: token,
  }
  ctx.body = obj;
});
// 更新token
// router.post('/updateTokenKey', async (ctx, next) => {
//   logger.info('updateTokenKey');
//   await next();
//   ctx.body = { authenticationTokenKey: '656565656566565' };
// })

// 版本对象
interface Iversion {
  version:number,
}

// 获取 node 版本号
router.post('/getLocalVersion', async (ctx, next) => {
  const version:Iversion = {
    version: Number.parseInt(process.version.substring(1)),
  }
  ctx.body = version;
});
// 更新token
router.post('/index', async (ctx, next) => {
  logger.info('home/index');
  const token = ctx.request.body.token;
  ctx.app.webConfig["authenticationTokenKey"] = token;
  utils.convertToken(ctx.app.webConfig);
  console.log(ctx.app.webConfig["authenticationTokenKey"]);
  await next();
  ctx.body = { authenticationTokenKey: token };
});

export default router;