"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Path = require("path");
const Utils_1 = require("../common/Utils");
class Caches {
    constructor() {
        this.webConfig = null;
        this.RequestHeader = null;
        this.webConfigFileName = 'welinkconfig.json';
        this.init();
    }
    static getInstance() {
        if (this.instance == null) {
            this.instance = new Caches();
        }
        return this.instance;
    }
    init() {
        this.webConfig = Utils_1.default.readWebconfig(`${Path.normalize(`${__dirname}/../`)}${Path.sep}${this.webConfigFileName}`);
        this.RequestHeader = Utils_1.default.convertToken(this.webConfig);
    }
    getWebConfig() {
        return this.webConfig;
    }
    setWebConfig(webconfig) {
        this.webConfig = webconfig;
        this.RequestHeader = Utils_1.default.convertToken(this.webConfig);
    }
    getRequestHeader() {
        return this.RequestHeader;
    }
}
Caches.instance = null;
exports.default = Caches;
//# sourceMappingURL=Caches.js.map