"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Log4js = require("log4js");
const Utils_1 = require("../common/Utils");
const logger = Log4js.getLogger('jsBridgeController');
logger.level = 'info';
class JSBridgeController {
    constructor() {
        this.logger = logger;
    }
    consoleJSBridgeLoggerInfo(title, content) {
        this.logger.info('==========start %s==========', title);
        this.logger.info(content);
        this.logger.info('==========end %s============', title);
    }
    async requestServer(ctx, next) {
        logger.info('requestServer');
        const receiveParams = ctx.request.body;
        const reqType = Utils_1.default.createRequestType(receiveParams);
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
    }
}
exports.default = JSBridgeController;
//# sourceMappingURL=JSBridge.js.map