"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const home_1 = require("./home");
const jsbridge_1 = require("./jsbridge");
const router = new Router();
router.use(home_1.default.routes(), home_1.default.allowedMethods());
router.use(jsbridge_1.default.routes(), jsbridge_1.default.allowedMethods());
exports.default = router;
//# sourceMappingURL=index.js.map