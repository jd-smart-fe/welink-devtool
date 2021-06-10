import * as Log4js from 'log4js';
import Caches from '../../cache/Caches';
import HttpHelper from '../../common/HttpHelper';
import IRequestHeader from '../../interfaces/IRequestHeader';
import IWeilinconfig from '../../interfaces/IWelinkConfig';

const logger = Log4js.getLogger('InitDeviceData.ts');

logger.level = 'info';

export interface JSBridgeParams {
  url: string;
  type: string;
  data: any;
}

abstract class JSBridgeServiceBase {
  protected jsBridgeParams: JSBridgeParams;
  protected caches = Caches.getInstance();
  protected webConfig: IWeilinconfig = null;
  protected requestHeader: IRequestHeader = null;
  protected baseUrl: string = null;
  constructor(jsBridgeParams: JSBridgeParams) {
    this.jsBridgeParams = jsBridgeParams;
    this.requestHeader = this.caches.getRequestHeader();
    this.webConfig = this.caches.getWebConfig();
    this.baseUrl = this.webConfig['jd.nsng.smart.url'];
  }
  abstract send();
  protected async post(url, params) {
    try {
      const response = await HttpHelper.post(url, params);
      if (response.status !== 200) {
        logger.error(`status code error: ${response.status}`);
        return {
          errorInfo: `status code: ${response.status}`,
        };
      }
      const result =
        typeof response.data === 'string'
          ? JSON.parse(response.data)
          : response.data;
      if (result.status !== 0) {
        logger.warn('%s', result);
      }
      return result;
    } catch (e) {
      logger.error('request error: %s', e);
      return {
        status: 101,
        error: {
          errorInfo: '网络异常，请检查网络。',
        },
      };
    }
  }
}
export default JSBridgeServiceBase;
