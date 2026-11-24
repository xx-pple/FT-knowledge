---
layout: home

hero:
  name: 知识速查
  text: 按主题组织的知识点索引
  tagline: 一页一个概念，搜到即用
  actions:
    - theme: brand
      text: 开始查找
      link: /quick/
    - theme: alt
      text: 工具速查
      link: /ops/

features:
  - title: 语言基础
    details: 类型转换、作用域、闭包、异步
    link: /quick/
  - title: 数据结构
    details: 链表、树、哈希表
    link: /ds/
  - title: 算法
    details: 二分、排序、复杂度
    link: /algo/
  - title: 工具
    details: git、命令行、排错手册
    link: /ops/
---

## 这个站点怎么用

按 `Ctrl+K`（macOS 用 `⌘K`）直接搜关键词，比翻目录快。搜索按标题加权，所以尽量输入概念名而不是整句。

左侧目录按「你会怎么找它」组织，不按教程顺序。每个分类的第一页有该分类的完整条目清单。

## 写作约定

新增文章只需要在对应目录建一个 `.md` 文件，侧边栏会自动更新，不用改配置。文件名用数字前缀控制顺序，如 `3.async.md`；显示名取文章的一级标题。

草稿放在 `docs/drafts/`，不参与构建，也搜不到。
