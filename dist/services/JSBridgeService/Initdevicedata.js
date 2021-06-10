"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Log4js = require("log4js");
const JSBridgeServiceBase_1 = require("./JSBridgeServiceBase");
const logger = Log4js.getLogger('InitDeviceData.ts');
logger.level = 'info';
class InitDeviceData extends JSBridgeServiceBase_1.default {
    constructor(jsBridgeParams) {
        super(jsBridgeParams);
        this.params = null;
        this.URL = '/f/service/getStreamsAndH5Info';
        this.params = {
            digest: '',
            feed_id: this.requestHeader.feedId,
        };
    }
    async send() {
        const url = `${this.baseUrl}${this.URL}`;
        return await this.post(url, this.params);
    }
}
exports.default = InitDeviceData;
//# sourceMappingURL=Initdevicedata.js.map