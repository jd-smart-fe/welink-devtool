import * as Koa from 'koa';
import * as Log4js from 'log4js';
// import Caches from '../cache/caches';
import Utils from '../common/Utils';

// const caches = Caches.getInstance();

const logger = Log4js.getLogger('jsBridgeController');

logger.level = 'info';
class JSBridgeController {
  // private apiList;
  private logger;
  constructor() {
    // this.apiList = {
    //   initDeviceData: '/f/service/getStreamsAndH5Info',
    // };
    this.logger = logger;
  }
  private consoleJSBridgeLoggerInfo(title: string, content: string) {
    // console.log(`\r\n==========${title}==========\r\n`);
    this.logger.info('==========start %s==========', title);
    this.logger.info(content);
    this.logger.info('==========end %s============', title);
  }
  // private getSendParams(domain: string, data: any) {
  //   let sendParams: object = null;
  //   const requestHeader = caches.getRequestHeader();
  //   const feedId = requestHeader.feedId;
  //   const type = data.type;
  //   let sendData = null;
  //   switch (type) {
  //     case 'getSnapshot':
  //     case 'initDeviceData':
  //       sendParams = {
  //         api: `${domain}${this.apiList[type] || data.url}`,
  //         sendData: {
  //           digest: '',
  //           feed_id: feedId,
  //         },
  //       };
  //       break;
  //     case 'post':
  //       sendData =
  //         typeof data.data === 'string' ? JSON.parse(data.data) : data.data;
  //       // replaceFeedId(sendData, feed_id);
  //       sendParams = {
  //         api: `${domain}/s/${data.url}`,
  //         sendData: {
  //           ...sendData,
  //         },
  //       };
  //       break;
  //     case 'controlDevice':
  //       sendData =
  //         typeof data.data === 'string' ? JSON.parse(data.data) : data.data;
  //       sendParams = {
  //         api: `${domain}${data.url}`,
  //         sendData: {
  //           feed_id: feedId,
  //           command: sendData,
  //         },
  //       };
  //       break;
  //     case 'getDeviceHistoryData':
  //       sendData =
  //         typeof data.data === 'string' ? JSON.parse(data.data) : data.data;
  //       sendParams = {
  //         sendData,
  //         api: `${domain}${data.url}`,
  //       };
  //       break;
  //     default:
  //       break;
  //   }
  //   return sendParams;
  // }
  async requestServer(ctx: Koa.Context, next) {
    logger.info('requestServer');
    const receiveParams = ctx.request.body;
    // const tokenKey = caches.getWebConfig()['authenticationTokenKey'];
    // const domain = caches.getWebConfig()['jd.nsng.smart.url'];
    const reqType = Utils.createRequestType(receiveParams);
    if (reqType == null) {
      logger.warn('没有找到要请求的接口类型');
      ctx.body = {
        errorInfo: '没有找到要请求的接口类型',
      };
      return;
    }
    this.consoleJSBridgeLoggerInfo('请求数据', JSON.stringify(receiveParams));
    const result = await reqType.send();
    this.consoleJSBridgeLoggerInfo('返回数据', result);
    ctx.body = result;
    // this.consoleJSBridgeLoggerInfo('请求数据', JSON.stringify(receiveParams));
    // try {
    //   const reslut = await HttpHelper.post(data.api, data.sendData);
    //   if (reslut.status === 200) {
    //     this.consoleJSBridgeLoggerInfo('返回数据', reslut.text);
    //     const data = JSON.parse(reslut.text);
    //     if (data.status !== 0) {
    //       logger.warn(reslut.text);
    //     }
    //     ctx.body = reslut.text;
    //   } else {
    //     logger.error('请求的url地址、或服务器异常');
    //   }
    // } catch (error) {
    //   logger.error('本地网络异常');
    // }
  }
}
export default JSBridgeController;
