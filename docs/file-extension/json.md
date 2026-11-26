---
title: JSON
tags: [格式, 配置]
---

# JSON

JavaScript Object Notation，最通用的数据交换格式。语法严格：不允许注释、不允许尾逗号、键必须用双引号。

## 基本结构 {#structure}

```json
{
  "name": "张三",
  "age": 18,
  "tags": ["a", "b"],
  "address": { "city": "上海" },
  "active": true,
  "extra": null
}
```

六种值类型：字符串、数字、布尔、null、数组、对象。嵌套深度没有语法限制。

## 严格语法 {#strict}

| 规则 | 正确 | 错误 |
|---|---|---|
| 键必须用双引号 | `"name": 1` | `name: 1` |
| 不允许注释 | — | `// 说明` |
| 不允许尾逗号 | `{"a": 1}` | `{"a": 1,}` |
| 单引号不合法 | `"a"` | `'a'` |

## 常见错误 {#pitfalls}

**多了一个逗号**。删字段时最容易留下 `{"a": 1,}`，解析器直接报错，而且报错位置经常指向下一行，容易看错。

**把 JSONC 当 JSON**。VS Code 的配置文件支持注释，那是 JSONC 扩展语法，标准 `JSON.parse` 不认。

**大整数丢精度**。JSON 没有整数和浮点之分，超过 `2^53` 的整数会失真。雪花 ID 这类长数字建议用字符串传。

**中文被转义**。某些环境 `JSON.stringify` 会把中文转成 `\uXXXX`，内容没丢但可读性差，展示前转回来即可。

## 格式化 {#format}

命令行快速格式化，不用打开编辑器：

```bash
# 美化
python -m json.tool data.json

# 压成一行
node -e "console.log(JSON.stringify(require('./data.json')))"
```

## 相关

- [YAML 与 YML](./yml.md)：允许注释、可读性更好，适合手写配置
