const rm = require('rimraf');
const path = require('path');
const fs = require('mz/fs');
const shell = require('shelljs');
const basePath = path.resolve(__dirname);
// 读取文件
const readFile = async (fpath) => {
    if (!await fs.exists(fpath)) {
        return;
    }
    return await fs.readFile(fpath);
}
// 写入文件
const wirteFile = async (fpath, message) => {
    const pathDir = path.dirname(fpath);
    // console.log(await fs.exists(fpath));
    // if(!await fs.exists(fpath)){
    //     fs.mkdir(fpath);
    // }
    await fs.writeFile(fpath, message);
}
// 拷贝文件夹
// const copydir = async (path,dirlist) => {
//     const pathbase = path;
//     const files = await fs.readdir(pathbase);
//     files.forEach(async (item, index) => {
//         const stat = await fs.stat(`${pathbase}/${item}`)
//         if (stat.isDirectory()) {
//             copydir(`${pathbase}/${item}`,`${dirlist}/${item}`);
//             return;
//         }
//         const msg = await readFile(`${pathbase}/${item}`);
//         await wirteFile(`${dirlist}/${item}`, msg);
//     });
//     console.log();
// }

// copydir('/Users/tianmeng/test','/Users/tianmeng/test1');

rm(path.resolve(__dirname, '../dist'), async (error) => {
    if (error) throw error;
    await fs.mkdir(process.cwd() + '/dist');
    await fs.mkdir(process.cwd() + '/dist/libs');
    // const fileName = 'welinkconfig.json';
    // const message = await readFile(`${basePath}/../${fileName}`);
    // await wirteFile(`${basePath}/../dist/${fileName}`, message);

    // const package = 'package.json';
    // 拷贝文件
    const fileList = [
        // 'package.json',
        'welinkconfig.json',
    ];
    fileList.forEach(async (item, index)=>{
        const message = await readFile(`${basePath}/../${item}`);
        await wirteFile(`${basePath}/../dist/${item}`, message);
    })

    // shell.cp('-R', `${basePath}/../welinkdevtoolsdk.js`, `${basePath}/../dist/libs/welinkdevtoolsdk.js`);
    // 拷贝views文件夹
    shell.cp('-R', `${basePath}/../views`, `${basePath}/../dist/`);
    // 拷贝bin文件夹
    // shell.cp('-R', `${basePath}/../bin`, `${basePath}/../dist/`);
    //
})
