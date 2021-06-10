"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Log4js = require("log4js");
const JSBridgeServiceBase_1 = require("./JSBridgeServiceBase");
const logger = Log4js.getLogger('GetSnapshot.ts');
logger.level = 'info';
class GetSnapshot extends JSBridgeServiceBase_1.default {
    constructor(jsBridgeParams) {
        super(jsBridgeParams);
        this.params = null;
        this.URL = null;
        this.params = {
            digest: '',
            feed_id: this.requestHeader.feedId,
        };
        this.URL = this.jsBridgeParams.url;
    }
    async send() {
        const url = `${this.baseUrl}${this.URL}`;
        return await this.post(url, this.params);
    }
}
exports.default = GetSnapshot;
//# sourceMappingURL=GetSnapshot.js.map