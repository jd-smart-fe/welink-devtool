import * as Router from 'koa-router';
import HomeController from '../controllers/home';

const router = new Router();

const controller = new HomeController();

router.get('/home', controller.index);

router.post('/home/getCurTokenKey', controller.getCurTokenKey);

router.post('/home/getLocalVersion', controller.getLocalVersion);

router.post('/home/setToken', controller.setToken);

export default router;
