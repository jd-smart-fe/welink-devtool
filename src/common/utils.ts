
import * as crypto from 'crypto';
import * as fs from 'mz/fs';
import * as Log4js from 'log4js';
import IWeilinconfig from '../interfaces/IWelinkConfig';
import * as Path from 'path';
import IRequestHeader from '../interfaces/IRequestHeader';
// http 请求api
const logger = Log4js.getLogger('utils');

/**
 * 工具类
 */
class Utils {
  public static md5(str: string): string {
    return crypto
      .createHash('md5')
      .update(str)
      .digest('hex');
  }
  public static readWebconfig(path: string): IWeilinconfig {
    let currentConfig: IWeilinconfig = null;
    let workConfig: IWeilinconfig = null;
    const pathName = Path.basename(path);
    const workDirPath = `${process.cwd()}/${pathName}`; // 获得工作目录
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
    const config: IWeilinconfig = Object.assign({}, currentConfig, workConfig);
    return config;
  }
  public static convertToken(config: IWeilinconfig): IRequestHeader {
    const authenticationTokenKey = config['authenticationTokenKey'];
    const authTokenKey: string[] = authenticationTokenKey.split('_');
    if (!Utils.checkAuthenticationTokenKey(authTokenKey)) {
      logger.error('authenticationTokenKey 格式错误');
    }
    const feedId: string = authTokenKey[2];
    const productId: string = authTokenKey[1];
    const uid: string = authTokenKey[0];
    // requestHeader.feedId = feedId;
    // requestHeader.productId = productId;
    // requestHeader.uid = uid;
    const requestHeader: IRequestHeader = {
      feedId,
      productId,
      uid,
      contentType: 'application/json',
    };
    return requestHeader;
  }
  /**
   * token校验
   * @param token 要校验的数组
   */
  public static checkAuthenticationTokenKey(token: string[]): boolean {
    if (token.length !== 4) {
      return false;
    }
    return true;
  }
}
export default Utils;
