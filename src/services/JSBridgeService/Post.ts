import * as Log4js from 'log4js';
import JSBridgeServiceBase, { JSBridgeParams } from './JSBridgeServiceBase';

const logger = Log4js.getLogger('Post.ts');

logger.level = 'info';

class Post extends JSBridgeServiceBase {
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
    if (this.URL.indexOf('/s/') < 1) {
      logger.error(`检测到 post 请求接口url 以 /s/ 开头检查url是否正确！！`);
    }
    const url = `${this.baseUrl}/s/${this.URL}`;

    return await this.post(url, this.params);
  }
}

export default Post;
