import { defineConfig } from 'vitepress'
import { withSidebar } from 'vitepress-sidebar'

// 部署到 https://<user>.github.io/<repo>/ 时改成 '/<repo>/'
// 部署到 https://<user>.github.io/ 或自定义域名时保持 '/'
// 也可以在 CI 里通过环境变量覆盖，不必改这里
const base = process.env.VITEPRESS_BASE || '/'

const siteConfig = {
  lang: 'zh-CN',
  title: '知识速查',
  description: '按主题组织的知识点索引，可直接搜索',

  base,

  cleanUrls: true, // 去掉 URL 里的 .html；开启后 md 内禁止手写 .html 链接
  lastUpdated: true,
  ignoreDeadLinks: false, // 死链直接让构建失败，别放过

  // 草稿与片段不参与构建：不进产物、不进搜索索引、不进 sitemap
  srcExclude: ['drafts/**', '**/_*.md'],

  markdown: {
    math: true,
    lineNumbers: true,
    image: { lazyLoading: true },
    toc: { level: [2, 3] },
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息',
    },
  },

  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}logo.svg` }]],

  themeConfig: {
    outline: { level: [2, 3], label: '本页目录' },

    nav: [
      { text: '语言基础', link: '/quick/' },
      { text: '数据结构', link: '/ds/' },
      { text: '算法', link: '/algo/' },
      { text: '工具', link: '/ops/' },
    ],

    // sidebar 交给 vitepress-sidebar 自动生成，这里不要手写

    search: {
      provider: 'local',
      options: {
        detailedView: true,
        miniSearch: {
          searchOptions: {
            boost: { title: 4, text: 2, titles: 1 },
            fuzzy: 0.2,
            prefix: true,
          },
        },
        // 中文必须自定义分词，否则整句会被当成一个 token。
        // 此函数会被序列化进客户端，必须自包含，不能引用外部变量。
        tokenize: (text: string) =>
          [...new Intl.Segmenter('zh-CN', { granularity: 'word' }).segment(text)].map(
            (s) => s.segment
          ),
        translations: {
          button: { buttonText: '搜索', buttonAriaLabel: '搜索' },
          modal: {
            displayDetails: '显示详情',
            resetButtonTitle: '清除',
            noResultsText: '没有找到结果',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },

    // 确定仓库地址后取消注释并替换 USER/REPO
    // editLink: {
    //   pattern: 'https://github.com/USER/REPO/edit/main/docs/:path',
    //   text: '在 GitHub 上编辑此页',
    // },

    docFooter: { prev: '上一篇', next: '下一篇' },
    lastUpdated: { text: '最后更新于' },
    darkModeSwitchLabel: '主题',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '回到顶部',
  },
}

export default defineConfig(
  withSidebar(siteConfig, {
    documentRootPath: '/docs',
    useTitleFromFileHeading: true, // 菜单名 = 页面的 # 标题
    useFolderTitleFromIndexFile: true, // 分组名 = 目录的 index.md 标题
    removePrefixAfterOrdering: true, // 去掉 "1." 前缀再显示
    excludeFilesByFrontmatterFieldName: 'draft',
    // 分组顺序与顶部导航保持一致，未列出的按名称排在后面
    manualSortFileNameByPriority: ['quick', 'ds', 'algo', 'ops'],
  })
)
