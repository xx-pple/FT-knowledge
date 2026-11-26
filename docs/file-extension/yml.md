---
title: YAML 与 YML
tags: [配置, 格式]
---

# YAML 与 YML

YML 文件是一种使用 YAML（YAML Ain't Markup Language）格式的**配置文件**，以可读性强的方式表示数据结构，常见于 **Docker**、Kubernetes、CI/CD 等工具的配置场景。

## 核心特点

1. **可读性强**：靠缩进表示层级，像写大纲，比 JSON、XML 更清爽。
2. **缩进敏感**：用**空格**缩进，**不能用 Tab**，通常 2 个空格一级。
3. **支持注释**：用 `#` 开头。
4. **键值对 + 列表**：基本结构就是映射（map）和序列（list）。
5. **大小写敏感**：`Name` 和 `name` 是两个不同的键。

一句话概括：YAML 是一种给人看的、用缩进表示层级的配置数据格式。

## 容易踩的坑

1. **Tab 缩进会报错**，必须用空格。
2. **冒号后要有空格**：`name: 张三` 对，`name:张三` 错。
3. **列表项 `-` 后要有空格**。
4. **字符串含特殊字符时加引号**，比如 `password: "123:456"`。
5. **布尔值写法**：`true/false`、`yes/no`、`on/off` 都可能被解析成布尔，不确定时加引号。

## docker-compose.yml 示例

```yaml
services:
  mysql:
    image: mysql:8.0
    container_name: mysql
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: root_pass
      MYSQL_DATABASE: example
      MYSQL_USER: example
      MYSQL_PASSWORD: example_pass
      TZ: Asia/Shanghai
    ports:
      - "3306:3306"
    volumes:
      - mysql-data:/var/lib/mysql
      - ./initdb:/docker-entrypoint-initdb.d:ro
    command:
      - --character-set-server=utf8mb4
      - --collation-server=utf8mb4_unicode_ci
    healthcheck:
      test: ["CMD-SHELL", "mysqladmin ping -h 127.0.0.1 -uroot -p$$MYSQL_ROOT_PASSWORD --silent"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s
    networks:
      - mysql-net

volumes:
  mysql-data:

networks:
  mysql-net:
    driver: bridge
```

## 相关

- [Docker Compose 写法](../docker/docker-compose.md)：上面这段配置的逐项解释
- [JSON](./json.md)：另一种配置格式，语法更严格但没注释
