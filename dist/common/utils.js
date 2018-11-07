"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const fs = require("mz/fs");
const Log4js = require("log4js");
const Path = require("path");
const Initdevicedata_1 = require("../services/JSBridgeRequestType/Initdevicedata");
const GetSnapshot_1 = require("../services/JSBridgeRequestType/GetSnapshot");
const Post_1 = require("../services/JSBridgeRequestType/Post");
const ControlDevice_1 = require("../services/JSBridgeRequestType/ControlDevice");
const GetDeviceHistoryData_1 = require("../services/JSBridgeRequestType/GetDeviceHistoryData");
const Debug = require("debug");
const logger = Log4js.getLogger('utils');
const debug = Debug('utils');
class Utils {
    static md5(str) {
        return crypto
            .createHash('md5')
            .update(str)
            .digest('hex');
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
        return config;
    }
    static convertToken(config) {
        const authenticationTokenKey = config['authenticationTokenKey'];
        const authTokenKey = authenticationTokenKey.split('_');
        if (!Utils.checkAuthenticationTokenKey(authTokenKey)) {
            logger.error('authenticationTokenKey 格式错误');
        }
        const feedId = authTokenKey[2];
        const productId = authTokenKey[1];
        const uid = authTokenKey[0];
        const requestHeader = {
            feedId,
            productId,
            uid,
            contentType: 'application/json',
        };
        return requestHeader;
    }
    static checkAuthenticationTokenKey(token) {
        if (token.length !== 4) {
            return false;
        }
        return true;
    }
    static createRequestType(reqData) {
        debug('O%', reqData);
        let requestType = null;
        const type = reqData.type;
        switch (type) {
            case 'getSnapshot':
                requestType = new GetSnapshot_1.default(reqData);
                break;
            case 'initDeviceData':
                requestType = new Initdevicedata_1.default(reqData);
                break;
            case 'post':
                requestType = new Post_1.default(reqData);
                break;
            case 'controlDevice':
                requestType = new ControlDevice_1.default(reqData);
                break;
            case 'getDeviceHistoryData':
                requestType = new GetDeviceHistoryData_1.default(reqData);
                break;
            default:
                requestType = null;
                break;
        }
        return requestType;
    }
}
exports.default = Utils;
//# sourceMappingURL=Utils.js.map