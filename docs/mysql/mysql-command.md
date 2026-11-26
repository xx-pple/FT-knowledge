---
title: MySQL 常用命令
tags: [mysql, 命令]
---

# MySQL 常用命令

按用途分类的 SQL 语句速查。一行一件事，方便复制。

## 库操作 {#database}

```sql
SHOW DATABASES;                          -- 列出所有库
CREATE DATABASE demo;                    -- 建库
DROP DATABASE demo;                      -- 删库（不可恢复）
USE demo;                                -- 切换当前库
SELECT DATABASE();                       -- 看当前在哪个库
```

## 表操作 {#table}

```sql
SHOW TABLES;                             -- 列出当前库的表
DESC user;                               -- 看表结构
SHOW CREATE TABLE user;                  -- 看建表语句
SHOW TABLE STATUS LIKE 'user';           -- 看表的引擎、行数、大小
TRUNCATE TABLE user;                     -- 清空表，自增 ID 归零
```

## 查数据 {#select}

```sql
SELECT * FROM user LIMIT 10;
SELECT COUNT(*) FROM user;
SELECT name, COUNT(*) AS cnt FROM user GROUP BY name HAVING cnt > 1;
SELECT * FROM user WHERE created_at >= '2026-01-01' AND status = 1;
```

排查慢查询先看 `EXPLAIN`：

```sql
EXPLAIN SELECT * FROM user WHERE name = '张三';
```

重点看 `type`（是否 `ALL` 全表扫）和 `rows`（预估扫描行数）。

## 改数据 {#modify}

```sql
INSERT INTO user (name) VALUES ('张三');
UPDATE user SET name = '李四' WHERE id = 1;
DELETE FROM user WHERE id = 1;
```

三个提醒：`UPDATE` 和 `DELETE` 一定带 `WHERE`；执行前先用同样的条件 `SELECT` 一遍；大批量操作分批提交，避免长事务锁表。

## 用户与权限 {#user}

```sql
CREATE USER 'app'@'%' IDENTIFIED BY 'password';
GRANT SELECT, INSERT, UPDATE ON demo.* TO 'app'@'%';
FLUSH PRIVILEGES;
SHOW GRANTS FOR 'app'@'%';
```

`'app'@'%'` 允许任意主机连接，`'app'@'localhost'` 只允许本机。生产环境通常给具体网段，不要用 `%`。

## 相关

- [MySQL 工作流](./mysql-workflow.md)：这些命令在什么流程里用
- [MySQL 基础](./mysql.md)：关系模型与事务
