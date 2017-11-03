import requestHeader from '../common/requestHeader';

import utils  from "../common/utils";

const request = require('superagent');

class HttpHelper {
  static post(url: string, data: object, tokenKey: string):Promise<any> {
    const dataStr = JSON.stringify(data);
    return request.post(url)
      .set('product_id', requestHeader.productId)
      .set('u_id', requestHeader.uid)
      .set('feed_id', requestHeader.feedId)
      .set('local_token', utils.MD5(dataStr + tokenKey))
      .set('Content-Type', requestHeader.contentType)
      .send(dataStr);
  }
}
export default HttpHelper;