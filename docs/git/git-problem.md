---
title: Git problem
tags: [git, 工具 , problem]
---

# Git 常见问题



Q:主分支master 和main的区别？

A:`master` 和 `main` 的困扰，本质上是 **Git 的传统默认值**与 **GitHub 2020年后推行的新规范**之间的一次磨合，直接用main即可

```

最彻底的解决方式是将本地的 master 分支重命名为 main，与 GitHub 的新规范保持一致。
步骤 1：在本地重命名分支
git branch -m master main
步骤 2：推送新分支并设置跟踪
git push -u origin main
步骤 3：在 GitHub 上切换默认分支
前往你的仓库 Settings → Branches，在 Default branch 模块中，将默认分支从 master 切换为 main。
步骤 4：（可选）删除远程旧的 master 分支
如果远程的 master 分支不再需要，可以安全删除：
git push origin --delete master
```



