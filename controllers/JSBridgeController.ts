import * as Router from 'koa-router';
import * as Log4js from 'koa-log4';
import requestHeader from '../common/requestHeader';
// http 请求api
const request = require('superagent');
import utils from '../common/utils';
import httpHelper from '../common/HttpHelper';

const logger = Log4js.getLogger('jsBridgeController');


const apiList: object = {
    initDeviceData: "/f/service/getStreamsAndH5Info",
}
// const feedIdParams: object = {
//     feed_id: requestHeader.feedId,
// };
// const sendData: object = {
//     '/f/service/getStreamsAndH5Info': {
//         digest: '',
//         feed_id: requestHeader.feedId,
//     }
// }

const getSendParams = (domain: string, data: any): object => {
    let sendParams: object = null;
    const feed_id = requestHeader.feedId;
    const type = data.type;
    let sendData = null;
    switch (type) {
        case 'getSnapshot':
        case 'initDeviceData':
            sendParams = {
                api: `${domain}${apiList[type] || data.url}`,
                sendData: {
                    digest: '',
                    feed_id,
                }
            }
            break;
        case 'post':
            sendData = typeof data.data === 'string' ? JSON.parse(data.data) : data.data;
            sendParams = {
                api: `${domain}/s/${data.url}`,
                sendData: {
                    feed_id,
                    ...sendData,
                }
            }
            break;
            case 'controlDevice':
            sendData = typeof data.data === 'string' ? JSON.parse(data.data) : data.data;
            sendParams = {
                api: `${domain}${data.url}`,
                sendData: {
                    feed_id,
                    command:sendData,
                }
            }
            break;
        default:
            break;
    }
    return sendParams;
}
// 获取完整的请求地址
// const perfectApi = (domain:string,api:string):string => {

//     return '';
// }
var consoleJSBridgeLoggerInfo=(title:string,content:string)=>{
    console.log(`\r\n==========${title}==========\r\n`);
    console.log(`\r\n${content}\r\n`);
    console.log(`\r\n==========${title}==========\r\n`);
}

const router = new Router();
router.post('/requestServer', async (ctx, next) => {
    logger.info('requestServer');
    await next();
    const receiveParams = ctx.request.body;
    const tokenKey = ctx.app.webConfig['authenticationTokenKey'];
    let url: string = receiveParams.url;
    const domain = ctx.app.webConfig["jd.nsng.smart.url"];
    const data: any = getSendParams(domain, receiveParams);
    consoleJSBridgeLoggerInfo('请求数据',JSON.stringify(receiveParams));
    try {
        const reslut = await httpHelper.post(data.api, data.sendData, tokenKey);
        if (reslut.status === 200) {
            consoleJSBridgeLoggerInfo('返回数据',reslut.text);
            const data = JSON.parse(reslut.text);
            if (data.status != 0) {
                logger.warn(reslut.text);
                ctx.app.wss.broadcast(reslut.text);
            }
            // ctx.app.wss.broadcast(reslut.text);
            ctx.body = reslut.text;
        } else {
            logger.error('请求的url地址、或服务器异常');
        }
    } catch (error) {
        logger.error('本地网络异常');
    }
})
export default router;