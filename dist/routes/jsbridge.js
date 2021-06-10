"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const JSBridge_1 = require("../controllers/JSBridge");
const router = new Router();
const controller = new JSBridge_1.default();
const requestServer = controller.requestServer.bind(controller);
router.post('/requestServer', requestServer);
exports.default = router;
//# sourceMappingURL=jsbridge.js.map