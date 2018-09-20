"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const caches_1 = require("../cache/caches");
const utils_1 = require("../common/utils");
const caches = caches_1.default.getInstance();
const request = require('superagent');
class HttpHelper {
    static post(url, data, tokenKey) {
        const dataStr = JSON.stringify(data);
        const requestHeader = caches.getRequestHeader();
        return request.post(url)
            .set('product_id', requestHeader.productId)
            .set('u_id', requestHeader.uid)
            .set('feed_id', requestHeader.feedId)
            .set('local_token', utils_1.default.md5(dataStr + tokenKey))
            .set('Content-Type', requestHeader.contentType)
            .send(dataStr);
    }
}
exports.default = HttpHelper;
//# sourceMappingURL=HttpHelper.js.map