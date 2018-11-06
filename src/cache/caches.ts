import IWeilinconfig from '../interfaces/IWelinkConfig';
import IRequestHeader from '../interfaces/IRequestHeader';
import * as Path from 'path';
import Utils from '../common/Utils';

class Caches {
  private webConfig: IWeilinconfig = null;
  private RequestHeader: IRequestHeader = null;
  private readonly webConfigFileName: string = 'welinkconfig.json';
  private static instance: Caches = null;

  private constructor() {
    this.init();
  }
  public static getInstance() {
    if (this.instance == null) {
      this.instance = new Caches();
    }
    return this.instance;
  }
  public init(): void {
    // 获取要缓存的信息
    this.webConfig = Utils.readWebconfig(
      `${Path.normalize(`${__dirname}/../`)}${Path.sep}${this.webConfigFileName}`,
    );
    this.RequestHeader = Utils.convertToken(this.webConfig);
  }
  public getWebConfig(): IWeilinconfig {
    return this.webConfig;
  }
  public setWebConfig(webconfig: IWeilinconfig): void {
    this.webConfig = webconfig;
    this.RequestHeader = Utils.convertToken(this.webConfig);
  }
  public getRequestHeader(): IRequestHeader {
    return this.RequestHeader;
  }
}
export default Caches;
