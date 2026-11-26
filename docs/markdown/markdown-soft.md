---
title: Markdown 常用软件
tags: [markdown, 工具]
---

# Markdown 常用软件

## Typora

面向个人的付费软件，界面干净，写的时候是「所见即所得」，不用分屏看预览。长期使用建议购买授权。

### 图片处理

Typora 的图片粘贴体验目前是最好的。设置 **文件 → 偏好设置 → 图像**：

- 「插入图片时」选 **复制图片到 ./${filename}.assets 文件夹**
- 勾选 **优先使用相对路径**

之后 `Ctrl+V` 粘贴截图，Typora 会自动在同目录建一个以文章名命名的文件夹，把图存进去，并在 Markdown 里写好相对路径。导出的 md 拿到任何静态站点生成器上都能直接用。

::: warning 别选不带 .assets 的那个选项
`./${filename}` 会占用和文章同名的目录。这篇文章以后就不能有 `xxx/index.md`——两者会抢同一个路由。
:::

## 免费替代

| 工具 | 特点 |
|---|---|
| VS Code | 加 Markdown 插件即可，预览和代码高亮都在，图片需手动配粘贴路径 |
| Obsidian | 本地知识库，双向链接，纯 Markdown 存储 |
| HackMD | 在线协作，适合多人同时编辑，但导出格式不完全兼容 |

## 相关

- [Markdown 基础语法](./markdown-base.md)
