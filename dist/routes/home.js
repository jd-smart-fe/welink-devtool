"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const Home_1 = require("../controllers/Home");
const router = new Router();
const controller = new Home_1.default();
const prototype = Object.getPrototypeOf(controller);
const keys = Object.getOwnPropertyNames(prototype);
keys.forEach((key, index) => {
    if (typeof controller[key] === 'function' && key !== 'constructor') {
        controller[key] = controller[key].bind(controller);
    }
});
router.get('/home', controller.index);
router.post('/home/getCurTokenKey', controller.getCurTokenKey);
router.post('/home/getLocalVersion', controller.getLocalVersion);
router.post('/home/setToken', controller.setToken);
exports.default = router;
//# sourceMappingURL=home.js.map