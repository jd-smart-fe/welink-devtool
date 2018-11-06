import * as Log4js from 'log4js';
import Base,  { JSBridgeParams }  from './RequestTypeBase';

interface SendParams {
  digest: string;
  feed_id: string;
}

const logger = Log4js.getLogger('GetSnapshot.ts');

class GetSnapshot extends Base{
  protected params: SendParams = null;
  private URL: string = null;
  constructor(jsBridgeParams: JSBridgeParams) {
    super(jsBridgeParams);
    this.params =  {
      digest: '',
      feed_id: this.requestHeader.feedId,
    };
    this.URL = this.jsBridgeParams.url;
  }
  async send(): Promise<any> {
    const url = `${this.baseUrl}${this.URL}`;
    return await this.post(url, this.params);
  }
}

export default GetSnapshot;
