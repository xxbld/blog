const getConfig = require("vuepress-bar");
const { nav, sidebar } = themeConfig = getConfig(`${__dirname}/..`, {
    pinyinNav: true,
    // addReadMeToFirstGroup: false,
})
// docs/readme 不放在sidebar里面
delete sidebar['/']
Object.keys(sidebar).forEach(key => {
    // addReadMeToFirstGroup: false, 无效 移除第一个
    sidebar[key][0] === '' ? sidebar[key].shift() : 0
})
const config = {
    base: '/blog/',
    title: '小小冰绿豆',
    description: 'hello',
    // theme: 'reco',
    themeConfig: {
        repo: 'xxbld/blog',
        repoLabel: 'Github',
        editLinks: true,
        editLinkText: '查看原文|编辑此页',
        lastUpdated: 'Last Updated',
        nav,
        sidebar,
        // sidebarDepth: 3,
    },
    markdown: {
        // 显示代码行号
        lineNumbers: true
    },
    plugins: [require('./plugins/rpurl'), 'mermaidjs'],
    // extraWatchFiles: [
    //     '.vuepress/plugins/**/*.js',
    // ],
    // chainWebpack: (config, isServer) => {
    //     const inlineLimit = 10000
    //     config.module.rule('images')
    //         .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
    //         .use('url-loader')
    //         .loader('url-loader')
    //         .options({
    //             limit: inlineLimit,
    //             name: `assets/img/[name].[hash:8].[ext]`
    //         })
    // }
}

module.exports = config;