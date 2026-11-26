---
title: MySQL 工作流
tags: [mysql]
---

# MySQL 工作流

日常开发里操作数据库的固定流程：连接、建库建表、改数据、备份恢复。

## 连接 {#connect}

```bash
mysql -h 127.0.0.1 -P 3306 -u root -p
```

| 参数 | 作用 |
|---|---|
| `-h` | 主机地址，本机可省略 |
| `-P` | 端口，默认 3306 |
| `-u` | 用户名 |
| `-p` | 提示输入密码（不要在命令里直接写密码，会留在历史记录里） |

## 建库建表 {#schema}

先建库并指定字符集，避免中文乱码：

```sql
CREATE DATABASE demo
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE demo;

CREATE TABLE user (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(64) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
```

用 `utf8mb4` 而不是 `utf8`——后者只支持 3 字节，存不了 emoji。

## 日常增删改查 {#crud}

```sql
INSERT INTO user (name) VALUES ('张三');

SELECT id, name FROM user WHERE name LIKE '张%' ORDER BY id DESC LIMIT 10;

UPDATE user SET name = '李四' WHERE id = 1;

DELETE FROM user WHERE id = 1;
```

改数据前**先用同样的 `WHERE` 跑一次 `SELECT`**，确认影响范围。

## 备份与恢复 {#backup}

```bash
# 备份单库
mysqldump -u root -p demo > demo_20260101.sql

# 恢复
mysql -u root -p demo < demo_20260101.sql
```

备份文件是纯 SQL 文本，可以直接 grep 查某张表的数据。

## 常见问题 {#faq}

**连接被拒 `Access denied`**：用户名密码错，或该用户没有从当前 host 连接的权限（`root@localhost` 与 `root@%` 是两个不同的账号）。

**中文乱码**：库、表、连接三处字符集都要是 `utf8mb4`，任一处是 `utf8` 就会出现问号。

**导入大文件超时**：命令行导入比图形工具稳，`max_allowed_packet` 也要调大。

## 相关

- [MySQL 常用命令](./mysql-command.md)
- [MySQL 基础](./mysql.md)
