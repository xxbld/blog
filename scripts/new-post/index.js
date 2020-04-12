const path = require('path')
const fs = require('fs')
import { scanFolder, scanFiles } from './util';

// TODO: 创建文章
const template = ({ title, tags, categories }) => {
    const today = new Date()
    return `
    ---
    title: ${title}
    date: ${today.getFullYear()}-${today.getMonth()}-${today.getDay()}
    tags:
    ${tags.map(tag => (`- ${tag}`))}
    categories:
    ${categories.map(category => (`- ${category}`))}
    ---
    
    # ${title}
    `
}
const tagDict = {
    backend: '后端',
    db: '数据库',
    frontend: '前端',
    vcs: '版本控制',
}
const postPath = path.resolve('docs/views')

// gis/cesium  category : cesium ; tag:gis

function getAllTags() {
    const folders = scanFolder(postPath, true, true)
    folders
        .map(v => {
            const needPath = v.split('docs/views')[1]
            const exclude = ['z-other']
            const isExclude = exclude.some(v => needPath.includes(v))
            if (!isExclude) {
                return needPath
            }
        })
        .filter(v => v === undefined)
        .map(v => {
            v.split('/')
        })
}
function createPost({ path, title }) {

}