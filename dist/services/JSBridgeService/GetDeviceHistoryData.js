"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Log4js = require("log4js");
const JSBridgeServiceBase_1 = require("./JSBridgeServiceBase");
const logger = Log4js.getLogger('GetDeviceHistoryData.ts');
logger.level = 'info';
class GetDeviceHistoryData extends JSBridgeServiceBase_1.default {
    constructor(jsBridgeParams) {
        super(jsBridgeParams);
        this.params = null;
        this.URL = null;
        this.URL = this.jsBridgeParams.url;
        const params = this.jsBridgeParams.data;
        this.params =
            typeof params === 'string'
                ? JSON.parse(jsBridgeParams.data)
                : jsBridgeParams.data;
    }
    async send() {
        const url = `${this.baseUrl}${this.URL}`;
        return await this.post(url, this.params);
    }
}
exports.default = GetDeviceHistoryData;
//# sourceMappingURL=GetDeviceHistoryData.js.map