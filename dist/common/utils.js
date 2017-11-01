"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const fs = require("mz/fs");
const Log4js = require("log4js");
const requestHeader_1 = require("../common/requestHeader");
const Path = require("path");
const logger = Log4js.getLogger('utils');
class utils {
    static MD5(str) {
        return crypto.createHash('md5').update(str).digest('hex');
    }
    static readWebconfig(path) {
        let currentConfig = null;
        let workConfig = null;
        const pathName = Path.basename(path);
        const workDirPath = `${process.cwd()}/${pathName}`;
        const currentDirPath = path;
        if (fs.existsSync(currentDirPath)) {
            const configStr = fs.readFileSync(currentDirPath);
            currentConfig = JSON.parse(configStr);
        }
        if (fs.existsSync(workDirPath)) {
            const configStr = fs.readFileSync(workDirPath);
            workConfig = JSON.parse(configStr);
        }
        const config = Object.assign({}, currentConfig, workConfig);
        return utils.convertToken(config);
    }
    static convertToken(config) {
        const authenticationTokenKey = config["authenticationTokenKey"];
        const auth_token_key = authenticationTokenKey.split('_');
        if (!utils.checkAuthenticationTokenKey(auth_token_key)) {
            logger.error('authenticationTokenKey格式错误');
        }
        const feedId = auth_token_key[2];
        const productId = auth_token_key[1];
        const uid = auth_token_key[0];
        requestHeader_1.default.feedId = feedId;
        requestHeader_1.default.productId = productId;
        requestHeader_1.default.uid = uid;
        return Object.assign({}, config, { feedId, productId, uid });
    }
    static checkAuthenticationTokenKey(token) {
        if (token.length !== 4) {
            return false;
        }
        return true;
    }
}
exports.default = utils;
