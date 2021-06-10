"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Log4js = require("log4js");
const JSBridgeServiceBase_1 = require("./JSBridgeServiceBase");
const logger = Log4js.getLogger('Post.ts');
logger.level = 'info';
class Post extends JSBridgeServiceBase_1.default {
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
        if (this.URL.indexOf('/s/') < 1) {
            logger.error(`检测到 post 请求接口url 以 /s/ 开头检查url是否正确！！`);
        }
        const url = `${this.baseUrl}/s/${this.URL}`;
        return await this.post(url, this.params);
    }
}
exports.default = Post;
//# sourceMappingURL=Post.js.map