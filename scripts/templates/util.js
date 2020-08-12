const path = require('path')
const fs = require('fs')
/**
 * 深度扫描全部文件夹路径
 * @param {*} scanPath 
 * @param {*} deep 
 * @param {*} currentDepth 
 * @param {*} justLeaflet 
 * @returns {Array<string>}
 */
function scanFolder(scanPath, deep = 1, currentDepth = 1, justLeaflet = false) {
    const folders = []
    // 层级检测
    if (deep !== 0 && currentDepth > deep) return folders
    const files = fs.readdirSync(scanPath)
    for (const file of files) {
        const filePath = path.join(scanPath, file)
        var fileStat = fs.statSync(filePath)
        if (fileStat.isDirectory()) {
            folders.push(filePath)
            folders.push(...scanFolder(filePath, deep, currentDepth++))
        }
    }
    return folders
}

/** 扫描某一级目录下面的文件 */
function scanFiles(scanPath, deep = false) {
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
/**
 * YYYY-MM-DD hh:mm
 * @param {*} fmt 
 * @param {*} date 
 */
function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "M+": (date.getMonth() + 1).toString(),     // 月
        "D+": date.getDate().toString(),            // 日
        "h+": date.getHours().toString(),           // 时
        "m+": date.getMinutes().toString(),         // 分
        "s+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}
module.exports = {
    scanFolder,
    scanFiles,
    dateFormat
}