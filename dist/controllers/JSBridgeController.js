"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const Log4js = require("koa-log4");
const requestHeader_1 = require("../common/requestHeader");
const request = require('superagent');
const HttpHelper_1 = require("../common/HttpHelper");
const logger = Log4js.getLogger('jsBridgeController');
const apiList = {
    initDeviceData: "/f/service/getStreamsAndH5Info",
};
const replaceFeedId = (obj, feedId) => {
    const keys = Object.keys(obj);
    keys.forEach((key, index) => {
        const item = obj[key];
        if (Object.prototype.toString.call(item) === 'object Array') {
            for (let i = 0; i < item.length; i++) {
                return replaceFeedId(item[i], feedId);
            }
        }
        if (Object.prototype.toString.call(item) === '[object Object]') {
            replaceFeedId(item, feedId);
            return;
        }
        if (key === 'feed_ids') {
            obj[key] = [feedId];
        }
        if (key === 'feed_id') {
            const item = obj[key];
            obj[key] = feedId;
        }
    });
};
const getSendParams = (domain, data) => {
    let sendParams = null;
    const feed_id = requestHeader_1.default.feedId;
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
            };
            break;
        case 'post':
            sendData = typeof data.data === 'string' ? JSON.parse(data.data) : data.data;
            replaceFeedId(sendData, feed_id);
            sendParams = {
                api: `${domain}/s/${data.url}`,
                sendData: Object.assign({}, sendData)
            };
            break;
        case 'controlDevice':
            sendData = typeof data.data === 'string' ? JSON.parse(data.data) : data.data;
            sendParams = {
                api: `${domain}${data.url}`,
                sendData: {
                    feed_id,
                    command: sendData,
                }
            };
            break;
        default:
            break;
    }
    return sendParams;
};
var consoleJSBridgeLoggerInfo = (title, content) => {
    console.log(`\r\n==========${title}==========\r\n`);
    console.log(`\r\n${content}\r\n`);
    console.log(`\r\n==========${title}==========\r\n`);
};
const router = new Router();
router.post('/requestServer', async (ctx) => {
    logger.info('requestServer');
    const receiveParams = ctx.request.body;
    const tokenKey = ctx.app.webConfig['authenticationTokenKey'];
    let url = receiveParams.url;
    const domain = ctx.app.webConfig["jd.nsng.smart.url"];
    const data = getSendParams(domain, receiveParams);
    consoleJSBridgeLoggerInfo('请求数据', JSON.stringify(receiveParams));
    try {
        const reslut = await HttpHelper_1.default.post(data.api, data.sendData, tokenKey);
        if (reslut.status === 200) {
            consoleJSBridgeLoggerInfo('返回数据', reslut.text);
            const data = JSON.parse(reslut.text);
            if (data.status != 0) {
                logger.warn(reslut.text);
                if (ctx.app.wss && ctx.app.wss.broadcast) {
                    ctx.app.wss.broadcast(reslut.text);
                }
            }
            ctx.body = reslut.text;
        }
        else {
            logger.error('请求的url地址、或服务器异常');
        }
    }
    catch (error) {
        logger.error('本地网络异常');
    }
});
exports.default = router;
