/**
 * 工具类
 */
import * as crypto from 'crypto';
import * as fs from 'mz/fs';
import * as Log4js from 'log4js';
import requestHeader from '../common/requestHeader';
import * as Path from 'path';
// http 请求api
const logger = Log4js.getLogger('utils');

class utils {

    public static MD5(str): string {
        return crypto.createHash('md5').update(str).digest('hex');
    }
    public static readWebconfig(path: string) {
        // if (await fs.exists(pathName)) {
        //     const token_key_string: string = await fs.readFile(pathName);
        //     const token_key: object = JSON.parse(token_key_string);
        //     return utils.convertToken(token_key);
        // } else {
        //     // 配置文件不存在:
        //     logger.error('本地测试服务器配置错误。');
        // }
        let currentConfig: object = null;
        let workConfig: object = null;
        const pathName = Path.basename(path);
        const workDirPath = `${process.cwd()}/${pathName}` //获得工作目录
        const currentDirPath = path;
        // 先读取本地配置文件
        if (fs.existsSync(currentDirPath)) {
            const configStr: string = fs.readFileSync(currentDirPath);
            currentConfig = JSON.parse(configStr);
        }
        // 判断工作文件目录有没有配置文件
        if (fs.existsSync(workDirPath)) {
            const configStr: string = fs.readFileSync(workDirPath);
            workConfig = JSON.parse(configStr);
        }
        // 合并配置文件
        const config: object = Object.assign({}, currentConfig, workConfig);
        return utils.convertToken(config);
    }
    public static convertToken(config: object): object {
        const authenticationTokenKey = config["authenticationTokenKey"];
        const auth_token_key: Array<string> = authenticationTokenKey.split('_');
        if (!utils.checkAuthenticationTokenKey(auth_token_key)) {
            logger.error('authenticationTokenKey格式错误');
        }
        const feedId: string = auth_token_key[2];
        const productId: string = auth_token_key[1];
        const uid: string = auth_token_key[0];
        requestHeader.feedId = feedId;
        requestHeader.productId = productId;
        requestHeader.uid = uid;
        return Object.assign({}, config, { feedId, productId, uid });
    }
    /**
     * token校验
     * @param token 要校验的数组
     */
    public static checkAuthenticationTokenKey(token: Array<string>): boolean {
        if (token.length !== 4) {
            return false;
        }
        return true
    }
    // static logger(title:string,content):void{
    //     const loggerPower = false;
    //     if(loggerPower){
    //         const logger = Log4js.getLogger(title);
    //         logger.info(content);
    //     }
    // }

}
export default utils;