import * as Log4js from 'log4js';
import Base,  { JSBridgeParams }  from './RequestTypeBase';

const logger = Log4js.getLogger('GetDeviceHistoryData.ts');

class GetDeviceHistoryData extends Base{
  protected params: any = null;
  private URL: string = null;
  constructor(jsBridgeParams: JSBridgeParams) {
    super(jsBridgeParams);
    this.URL = this.jsBridgeParams.url;
    this.params === 'string' ? JSON.parse(jsBridgeParams.data) : jsBridgeParams.data;
  }
  async send(): Promise<any> {
    const url = `${this.baseUrl}${this.URL}`;
    return await this.post(url, this.params);
  }
}

export default GetDeviceHistoryData;
