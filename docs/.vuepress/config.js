const sidebar = {
    '/Web/': [{
        title: 'Vue',
        children: [
            'Vue/vuepress-blog'
        ]
    }]
}

const nav = [{
    text: '前端',
    items: [{
        text: 'Vue',
        link: '/Web/' + sidebar['/Web/'][0]['children'][0]
    }]
}];
const config = {
    base: '/bolg',
    title: '小小冰绿豆的博客',
    description: 'hello',
    head: [
        ['link', {
            rel: 'icon',
            href: '/favicon.ico'
        }]
    ],
    themeConfig: {
        repo: 'xxbld/blog',
        repoLabel: '代码',
        editLinks: true,
        editLinkText: '查看原文|编辑此页',
        nav,
        sidebar,
    },
    markdown: {
        // 显示代码行号
        lineNumbers: true
    }
}
module.exports = config;