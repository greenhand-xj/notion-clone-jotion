# 全栈 Notion Clone -- Jotion: Next.js 13, React, Convex, Tailwind

![Snipaste_2023-12-21_20-03-33](https://github.com/greenhand-xj/notion-clone-jotion/assets/81698900/c6f6cc73-9e47-4fbc-a74b-cba981c0a5e6)
关键功能点：

- 实时数据库  🔗 
- 概念式编辑器  📝 
- 浅色和深色模式 🌓
- 无限子文档 🌲
- 垃圾桶和软删除 🗑️
- 认证 🔐 
- 文件上传
- 文件删除
- 文件替换
- 每个文档的图标（实时更改） 🌠
- 可扩展侧边栏 ➡️🔀⬅️
- 全面的移动响应能力 📱
- 将笔记发布到 Web 🌐
- 完全可折叠的侧边栏 ↕️
- 登陆页面  🛬
- 每个文档🖼️的封面图片 🖼️
- 恢复已删除的文件 🔄📄

### 需要的条件

**Node version 18.x.x**

### 克隆仓库

```shell
git clone https://github.com/greenhand-xj/notion-clone-jotion.git
```

### Install packages

```shell
npm i
```

### 设置 .env file


```js
# Deployment used by `npx convex dev`
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

EDGE_STORE_ACCESS_KEY=
EDGE_STORE_SECRET_KEY=
```

### 启动 Convex

```shell
npx convex dev

```

### 启动 the app

```shell
npm run dev
```
