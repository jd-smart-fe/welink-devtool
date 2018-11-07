import * as Log4js from 'log4js';
import Base, { JSBridgeParams } from './RequestTypeBase';

const logger = Log4js.getLogger('Post.ts');

logger.level = 'info';

class Post extends Base {
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
    const url = `${this.baseUrl}/s/${this.URL}`;
    return await this.post(url, this.params);
  }
}

export default Post;
