---
title: Docker Compose 写法
tags: [docker, 配置]
---

# Docker Compose 写法

一个可以直接跑的 `docker-compose.yml` 模板，下面逐项解释关键配置。

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

## 关键字段 {#fields}

| 字段 | 作用 |
|---|---|
| `image` | 使用的镜像。`mysql:8.0` 锁到小版本，避免 `latest` 某天变成不兼容的大版本 |
| `container_name` | 固定容器名，方便 `docker exec -it mysql bash` |
| `restart: unless-stopped` | 开机自启，手动停止后不再拉起 |
| `ports` | `宿主机端口:容器端口`，只对内网开放时建议绑 `127.0.0.1:3306:3306` |
| `volumes` | 数据卷。没有它，删容器等于删库 |
| `healthcheck` | 健康检查，依赖它的服务可以等它就绪再启动 |
| `networks` | 自定义网络，同网络内的容器可以直接用服务名互访 |

## 三个容易写错的点 {#pitfalls}

**`$$` 是转义**。`healthcheck` 里的 `$$MYSQL_ROOT_PASSWORD` 实际传给 shell 的是 `$MYSQL_ROOT_PASSWORD`。写成单个 `$` 会被 compose 提前替换成空字符串，健康检查永远失败。

**`depends_on` 不等于等待就绪**。它只保证启动顺序，不保证服务真的能连。要等可用必须配 `depends_on` 的 `condition: service_healthy` 并同时写 `healthcheck`。

**命名卷要先声明**。`services` 里用了 `mysql-data`，`volumes` 段就必须有一个同名的空声明，否则 compose 直接报错。

## 常用命令 {#commands}

```bash
docker compose up -d          # 后台启动
docker compose ps             # 看容器状态
docker compose logs -f mysql  # 跟日志
docker compose restart mysql  # 重启单个服务
docker compose down           # 停止并删除容器，保留数据卷
docker compose down -v        # 连数据卷一起删，数据全丢
```

## 相关

- [YAML 与 YML](../file-extension/yml.md)：compose 文件的语法基础
- [MySQL 工作流](../mysql/mysql-workflow.md)：容器起来之后怎么连
