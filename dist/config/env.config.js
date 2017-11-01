"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isProdEnv = process.env.NODE_ENV === 'production';
let listenPort = 3000;
if (isProdEnv) {
    listenPort = 3000;
}
exports.default = {
    listenPort,
};
