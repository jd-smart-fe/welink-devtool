import * as Router from 'koa-router';
import JSBridgeController from '../controllers/jsbridge';

const router = new Router();

const controller = new JSBridgeController();
const requestServer = controller.requestServer.bind(controller);

router.post('/requestServer', requestServer);

export default router;
