import * as Router from 'koa-router';
import home from './home';
import jsbridge from './jsbridge';

const router = new Router();

router.use(home.routes(), home.allowedMethods());

router.use(jsbridge.routes(), jsbridge.allowedMethods());

export default router;
