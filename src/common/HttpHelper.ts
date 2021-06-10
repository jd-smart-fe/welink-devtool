import Axios, { AxiosResponse } from 'axios';
import * as Log4js from 'log4js';
import Caches from '../cache/Caches';
import utils from './Utils';

const axios = Axios.create();

const logger = Log4js.getLogger('HttpHelper.ts');

logger.level = 'info';

class HttpHelper {
  static async post(url: string, data: object): Promise<AxiosResponse> {
    const caches = Caches.getInstance();
    const webConfig = caches.getWebConfig();
    const tokenKey = webConfig.authenticationTokenKey;
    const dataStr = JSON.stringify(data);
    const requestHeader = caches.getRequestHeader();
    const response = await axios.post(url, dataStr, {
      headers: {
        productId: requestHeader.productId,
        uid: requestHeader.uid,
        feedId: requestHeader.feedId,
        localToken: utils.md5(dataStr + tokenKey),
        'Content-Type': requestHeader.contentType,
      },
    });
    return response;
    // return request.post(url)
    //   .set('product_id', requestHeader.productId)
    //   .set('u_id', requestHeader.uid)
    //   .set('feed_id', requestHeader.feedId)
    //   .set('local_token', utils.md5(dataStr + tokenKey))
    //   .set('Content-Type', requestHeader.contentType)
    //   .send(dataStr);
  }
}
export default HttpHelper;
