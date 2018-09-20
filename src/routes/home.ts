import * as Router from 'koa-router';
import HomeController from '../controllers/home';

const router = new Router();

const controller = new HomeController();

/**
 * 由于不能通过 Object.keys() 来获取 controller 的属性名称，
 * 因此只能先通过 Object.getPrototypeOf() 获取原型对象，
 * 在通过 Object.getOwnPropertyNames() 获取到原型上的属性（获取的属性包含不可枚举属性）。
 */
const prototype = Object.getPrototypeOf(controller);

const keys = Object.getOwnPropertyNames(prototype);

/**
 * controller 实例原型上的方法并强制绑定上下文到 controller。
 */
keys.forEach((key, index) => {
  if (typeof controller[key] === 'function' && key !== 'constructor') {
    controller[key] = controller[key].bind(controller);
  }
});

router.get('/home', controller.index);

router.post('/home/getCurTokenKey', controller.getCurTokenKey);

router.post('/home/getLocalVersion', controller.getLocalVersion);

router.post('/home/setToken', controller.setToken);

export default router;
