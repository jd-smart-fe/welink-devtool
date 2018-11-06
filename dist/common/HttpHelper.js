"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const Log4js = require("log4js");
const Caches_1 = require("../cache/Caches");
const Utils_1 = require("./Utils");
const axios = axios_1.default.create();
const logger = Log4js.getLogger('HttpHelper.ts');
logger.level = 'info';
class HttpHelper {
    static async post(url, data) {
        const caches = Caches_1.default.getInstance();
        const webConfig = caches.getWebConfig();
        const tokenKey = webConfig.authenticationTokenKey;
        const dataStr = JSON.stringify(data);
        const requestHeader = caches.getRequestHeader();
        const response = await axios.post(url, dataStr, {
            headers: {
                product_id: requestHeader.productId,
                u_id: requestHeader.uid,
                feed_id: requestHeader.feedId,
                local_token: Utils_1.default.md5(dataStr + tokenKey),
                'Content-Type': requestHeader.contentType,
            },
        });
        return response;
    }
}
exports.default = HttpHelper;
//# sourceMappingURL=HttpHelper.js.map