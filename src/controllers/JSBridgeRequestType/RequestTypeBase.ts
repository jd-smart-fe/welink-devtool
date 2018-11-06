import Caches from '../../cache/Caches';
import IWeilinconfig from '../../interfaces/IWelinkConfig';
import HttpHelper from '../../common/HttpHelper';
import * as Log4js from 'log4js';

const logger = Log4js.getLogger('InitDeviceData.ts');

export interface JSBridgeParams {
  url: string;
  type: string;
  data: any;
}

abstract class RequestTypeBase {
  protected jsBridgeParams : JSBridgeParams;
  protected caches = Caches.getInstance();
  protected webConfig: IWeilinconfig = null;
  protected requestHeader = null;
  protected baseUrl: string = null;
  constructor (jsBridgeParams: JSBridgeParams) {
    this.jsBridgeParams = jsBridgeParams;
    this.requestHeader = this.caches.getRequestHeader();
    this.webConfig = this.caches.getWebConfig();
    this.baseUrl = this.webConfig['jd.nsng.smart.url'];
  }
  abstract async send();
  protected async post(url, params) {
    try {
      const response = await HttpHelper.post(url, params);
      if (response.status !== 200) {
        logger.error(`status code error: ${response.status}`);
        return {
          errorInfo: `status code: ${response.status}`,
        };
      }
      const result = JSON.parse(response.data);
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
export default RequestTypeBase;