# 知识速查

按主题组织的知识点索引，纯静态站点，托管在 GitHub Pages。

- 仓库：https://github.com/xx-pple/FT-knowledge
- 站点：https://xx-pple.github.io/FT-knowledge/

基于 **VitePress 1.6** + **vitepress-sidebar**（侧边栏按目录自动生成）。

## 本地开发

```bash
npm install
npm run docs:dev       # http://localhost:5173/FT-knowledge/
npm run docs:build     # 构建，产物在 docs/.vitepress/dist
npm run docs:preview   # 预览构建产物
```

因为 `base` 是 `/FT-knowledge/`（与线上一致），本地地址也要带这个前缀。这样能避免「本地正常、线上 404」这类只在部署后才暴露的问题。

## 目录结构

```
docs/
├─ .vitepress/config.mts     唯一配置入口
├─ public/                   原样拷贝：logo、favicon、robots.txt
├─ drafts/                   草稿，不参与构建
├─ quick/                    分类：语言基础
│  ├─ index.md              分类首页，同时提供侧边栏分组名
│  ├─ 1.types.md
│  ├─ 2.closure.md
│  └─ assets/               文章配图，就近存放
├─ ds/  algo/  ops/          其余分类，结构相同
└─ index.md                  首页
```

## 写一篇新文章

1. 在对应分类目录下新建 `.md` 文件，文件名用**英文小写**，前缀数字控制顺序：

   ```
   docs/quick/3.async.md
   ```

2. 文件开头写 frontmatter 和一级标题：

   ```md
   ---
   title: 异步
   tags: [js]
   ---

   # 异步

   一句话定义放这里，这句话会出现在搜索摘要里。

   ## 是什么 {#what}
   ```

3. 配图放在同目录 `assets/` 下，用相对路径引用：

   ```md
   ![示意](./assets/async.svg)
   ```

4. `git push`，侧边栏和搜索索引会自动更新。

**不需要改 `config.mts`。**

## 命名与写作约定

| 约定 | 说明 |
|---|---|
| 文件名 | 英文小写 + 中划线，数字前缀控制排序（`1.`、`2.`），显示时前缀会被去掉 |
| 一级标题 | 每篇只能有一个 `#`，用中文，它会成为侧边栏名称 |
| 锚点 | 需要长期引用的标题加 `{#id}`，否则改标题会断外链 |
| 站内链接 | 写 `./xxx.md` 或 `../ds/1.linked-list.md`，构建时会校验死链 |
| 图片 | 相对路径，就近放 `assets/`，**不要**用 `public/` 绝对路径 |
| 草稿 | 放 `docs/drafts/`，不参与构建 |

## 部署

推送到 `main` 分支后，GitHub Actions 自动构建并发布。

`base` 已在 `config.mts` 里设为 `/FT-knowledge/`，与仓库名对应。首次部署前只需在仓库里做一件事：

**Settings → Pages → Source** 选择 **GitHub Actions**（选「Deploy from a branch」会一直 404）。

以后如果换成自定义域名，把 `base` 改成 `'/'` 即可。

## 已知约束

- **`cleanUrls: true`**：md 里的站内链接只能写 `.md` 或不带后缀，写 `.html` 会 404
- **图片体积**：单文件上限 100 MiB，Pages 站点总大小上限 1 GB。截图建议压成 WebP、宽度不超过 1600px
- **`git rm` 不会减小仓库体积**，图片要在入库前就压缩
- **本地文件大小写**：Windows 不敏感、Linux 敏感，文件名统一小写

## 相关文档

详细的技术选型、配置说明和踩坑清单见仓库外的《知识库站点技术选型与实施大纲》。
