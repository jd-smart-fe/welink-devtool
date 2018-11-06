import * as Log4js from 'log4js';
import Base, { JSBridgeParams } from './RequestTypeBase';

const logger = Log4js.getLogger('Post.ts');

class ControlDevice extends Base {
  protected params: any = null;
  private URL: string = null;
  constructor(jsBridgeParams: JSBridgeParams) {
    super(jsBridgeParams);
    this.URL = this.jsBridgeParams.url;
    const params = this.jsBridgeParams.data;
    this.params =
      typeof params === 'string'
        ? JSON.parse(jsBridgeParams.data)
        : jsBridgeParams.data;
  }
  async send(): Promise<any> {
    const url = `${this.baseUrl}${this.URL}`;
    const params = {
      feed_id: this.requestHeader.feedId,
      command: this.params,
    };
    return await this.post(url, params);
  }
}

export default ControlDevice;
