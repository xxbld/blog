const { scanFolder, dateFormat } = require('./util')
const path = require('path')
const fs = require('fs')

const postPath = path.resolve('./docs/views')
function getAllFolders() {
    const folders = scanFolder(postPath, 2, 1)
    return folders
        .map(v => v.replace(/\\/g, '/'))
        .map(v => {
            const needPath = v.split('docs/views/')[1]
            const exclude = ['z-other']
            const isExclude = exclude.some(v => needPath.includes(v))
            if (!isExclude) {
                return {
                    name: needPath,
                    value: v
                }
            }
        })
        .filter(Boolean)
}

const dict = {
    backend: '后端',
    db: '数据库',
    frontend: '前端',
    vcs: '版本控制',
}
function matchDict(dictName) {
    return dict[dictName] ? dict[dictName] : dictName
}
function getCategoriesTags(path) {
    // gis/cesium/a  category : gis ; tag:cesium,a
    const needPath = path.split('docs/views/')[1]
    const [category, ...tags] = needPath.split('/')
    // console.log('category', category)
    // console.log('tags', tags)
    return {
        categories: [matchDict(category)],
        tags: tags.map(tag => (matchDict(tag)))
    }
}
const folders = getAllFolders()
module.exports = {
    description: '新建文章',
    prompts: [
        {
            type: 'input',
            name: 'fileName',
            message: '输入文件名',
            validate: function (v) {
                if (!v || v.trim === "") {
                    return '文件名不能为空'
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'title',
            message: '输入文章标题',
            default: (data) => {
                return data.fileName || 'title'
            }
        },
        {
            type: 'list',
            name: 'path',
            message: '选择目录',
            choices: folders
        },
    ],
    actions: (data) => {
        const { tags, categories } = getCategoriesTags(data.path)
        data = Object.assign(data, {
            title: data.title || data.fileName,
            date: dateFormat('YYYY-MM-DD', new Date()),
            tags: tags.toString(),
            categories: categories.toString(),
            keys: '',
            sticky: '',
            isShowComments: true,
            publish: true,
        })
        console.log('data', data)
        return [{
            type: 'add',
            path: '{{path}}/{{fileName}}.md',
            templateFile: 'scripts/templates/post.hbs'
        }]
    }
}


// ---
// title: 文章标题
// date: 2020-02-02
// tags:
//  - 标签
// categories:
//  - 分类
// keys:
//  - '123456' //文章加密密码
// sticky: 1   //文章置顶 1, 2, 3, ...
// isShowComments: false //是否开启评论
// publish: true //文章是否发布
// ---