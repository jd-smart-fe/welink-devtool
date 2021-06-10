"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Log4js = require("log4js");
const Caches_1 = require("../../cache/Caches");
const HttpHelper_1 = require("../../common/HttpHelper");
const logger = Log4js.getLogger('InitDeviceData.ts');
logger.level = 'info';
class JSBridgeServiceBase {
    constructor(jsBridgeParams) {
        this.caches = Caches_1.default.getInstance();
        this.webConfig = null;
        this.requestHeader = null;
        this.baseUrl = null;
        this.jsBridgeParams = jsBridgeParams;
        this.requestHeader = this.caches.getRequestHeader();
        this.webConfig = this.caches.getWebConfig();
        this.baseUrl = this.webConfig['jd.nsng.smart.url'];
    }
    async post(url, params) {
        try {
            const response = await HttpHelper_1.default.post(url, params);
            if (response.status !== 200) {
                logger.error(`status code error: ${response.status}`);
                return {
                    errorInfo: `status code: ${response.status}`,
                };
            }
            const result = typeof response.data === 'string'
                ? JSON.parse(response.data)
                : response.data;
            if (result.status !== 0) {
                logger.warn('%s', result);
            }
            return result;
        }
        catch (e) {
            logger.error('request error: %s', e);
            return {
                status: 101,
                error: {
                    errorInfo: '网络异常，请检查网络。',
                },
            };
        }
    }
}
exports.default = JSBridgeServiceBase;
//# sourceMappingURL=JSBridgeServiceBase.js.map