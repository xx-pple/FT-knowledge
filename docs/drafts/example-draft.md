---
title: 草稿示例
draft: true
---

# 草稿示例

这个文件在 `docs/drafts/` 下，被 `srcExclude: ['drafts/**']` 排除，因此：

- 不会生成 HTML
- 不会出现在侧边栏
- 不会进本地搜索索引
- 不会进 sitemap

它是安全的：即使推到公开仓库，读者也访问不到这个页面。

## 为什么不用 frontmatter 的 draft 字段

VitePress **没有内置草稿机制**。在 frontmatter 写 `draft: true` 只会：

- 让 `vitepress-sidebar` 把它从侧边栏藏起来（前提是配了 `excludeFilesByFrontmatterFieldName`）
- 但页面**依然会被构建**，依然能通过 URL 访问，依然进搜索和 sitemap

所以真正的草稿必须靠目录隔离。写完了把文件挪进正式目录即可。
