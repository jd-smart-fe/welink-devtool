/**
 * 静态资源中间件
 */

import * as Path from 'path';
import * as mime from 'mime';
import * as fs from 'mz/fs';

// url: 类似 '/static/'
// dir: 类似 __dirname + '/static'
export default function staticFiles(url:string){
    return async (ctx, next) => {
        let rpath = ctx.request.path;

        const workDir = process.cwd();
        const workDirPath = `${workDir}/${url}`;
        console.log(workDirPath);
        // 判断是否以指定的url开头:
        if (rpath.startsWith(url)) {
            // 获取文件完整路径:
            let wfp = Path.join(workDirPath, rpath.substring(url.length));
            // let fp = Path.join(dir, rpath.substring(url.length));
            // // 判断文件是否存在:
            if (await fs.exists(wfp)) {
                // 查找文件的mime:
                ctx.response.type = mime.lookup(rpath);
                // 读取文件内容并赋值给response.body:
                ctx.response.body = await fs.readFile(wfp);
            } else {
                // 文件不存在:
                ctx.response.status = 404;
            }
        } else {
            // 不是指定前缀的URL，继续处理下一个middleware:
            await next();
        }
    };
}