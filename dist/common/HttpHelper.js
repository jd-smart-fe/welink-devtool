"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requestHeader_1 = require("../common/requestHeader");
const utils_1 = require("../common/utils");
const request = require('superagent');
class HttpHelper {
    static post(url, data, tokenKey) {
        const dataStr = JSON.stringify(data);
        return request.post(url)
            .set('product_id', requestHeader_1.default.productId)
            .set('u_id', requestHeader_1.default.uid)
            .set('feed_id', requestHeader_1.default.feedId)
            .set('local_token', utils_1.default.MD5(dataStr + tokenKey))
            .set('Content-Type', requestHeader_1.default.contentType)
            .send(dataStr);
    }
}
exports.default = HttpHelper;
//# sourceMappingURL=HttpHelper.js.map