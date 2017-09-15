"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Path = require("path");
const mime = require("mime");
const fs = require("mz/fs");
function staticFiles(url) {
    return async (ctx, next) => {
        let rpath = ctx.request.path;
        const workDir = process.cwd();
        const workDirPath = `${workDir}/${url}`;
        if (rpath.startsWith(url)) {
            let wfp = Path.join(workDirPath, rpath.substring(url.length));
            if (await fs.exists(wfp)) {
                ctx.response.type = mime.lookup(rpath);
                ctx.response.body = await fs.readFile(wfp);
            }
            else {
                ctx.response.status = 404;
            }
        }
        else {
            await next();
        }
    };
}
exports.default = staticFiles;
//# sourceMappingURL=static-files.js.map