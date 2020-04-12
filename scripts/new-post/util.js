import fs from 'fs';
import path from 'path';
/**
 * 深度扫描全部文件夹路径
 *
 * @export
 * @param {*} scanPath
 * @param {boolean} [deep=false]
 * @param {boolean} [justLeaflet=false]
 * @returns {Array<string>}
 */
export function scanFolder(scanPath, deep = false, justLeaflet = false) {
    const files = fs.readFileSync(scanPath)
    const folders = []
    for (const file of files) {
        var fileStat = fs.statSync(path.join(scanPath, file))
        if (fileStat.isDirectory()) {
            if (justLeaflet === true || deep === false) {
                folders.push(file)
            }
            if (deep) {
                folders.push(...scanFolder(file))
            }
        }
    }
    return folders
}

/** 扫描某一级目录下面的文件 */
export function scanFiles(scanPath, deep = false) {
    const files = fs.readFileSync(scanPath)
    const fileArr = []
    for (const file of files) {
        var fileStat = fs.statSync(path.join(scanPath, file))
        if (fileStat.isFile()) {
            fileArr.push(file)
        } else if (fileStat.isDirectory()) {
            if (deep) {
                fileArr.push(...scanFiles(file))
            }
        }
    }
    return fileArr
}