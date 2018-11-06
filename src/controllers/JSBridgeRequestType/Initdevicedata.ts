import * as Log4js from 'log4js';
import Base, { JSBridgeParams } from './RequestTypeBase';

const logger = Log4js.getLogger('InitDeviceData.ts');

interface SendParams {
  digest: string;
  feed_id: string;
}
class InitDeviceData extends Base{
  protected params: SendParams = null;
  private URL = '/f/service/getStreamsAndH5Info';
  constructor(jsBridgeParams: JSBridgeParams) {
    super(jsBridgeParams);
    this.params =  {
      digest: '',
      feed_id: this.requestHeader.feedId,
    };
  }
  async send(): Promise<any> {
    const url = `${this.baseUrl}${this.URL}`;

    return await this.post(url, this.params);
  }
}

export default InitDeviceData;
