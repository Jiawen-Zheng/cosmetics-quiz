# 化妆品知识大测试 💄

一个基于 Next.js 的趣味化妆品知识测试应用。

## 项目简介

这是一个互动式的化妆品知识测试网站，用户可以通过回答问题来测试自己对化妆品的了解程度。特别适合情侣之间的趣味互动。

## 技术栈

- **框架**: Next.js 16 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **部署**: Vercel (推荐)

## 项目结构

```
cosmetics-quiz/
├── public/
│   └── images/              # 化妆品图片目录
├── src/
│   ├── app/                 # 页面路由
│   │   ├── layout.tsx       # 根布局
│   │   ├── page.tsx         # 首页
│   │   ├── quiz/            # 答题页
│   │   └── result/          # 结果页
│   ├── components/          # 组件（预留）
│   ├── data/
│   │   └── questions.ts     # 题库数据
│   ├── types/
│   │   └── question.ts      # 类型定义
│   └── utils/
│       └── quiz.ts          # 工具函数
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## 功能特性

- ✨ 随机抽取10道题目
- 🎯 四选一答题模式
- ⏱️ 即时反馈（正确/错误）
- 📊 实时显示答题进度
- 🎉 个性化结果评价
- 📱 响应式设计，支持移动端

## 本地开发

### 1. 安装依赖

```bash
cd cosmetics-quiz
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看应用。

### 3. 构建生产版本

```bash
npm run build
npm start
```

## 题库说明

项目包含50道化妆品相关题目，涵盖：
- 化妆品类型识别
- 使用方法和顺序
- 产品功效和成分
- 适用场合和肤质
- 化妆工具使用

### 更新题库

编辑 [`src/data/questions.ts`](src/data/questions.ts:1) 文件来添加或修改题目。

### 替换图片

当前使用占位图片，您可以：
1. 将真实化妆品图片放入 `public/images/` 目录
2. 命名为 q1.jpg, q2.jpg, ..., q50.jpg
3. 修改 [`questions.ts`](src/data/questions.ts:1) 中的图片路径

## 部署指南

### 🚀 完整部署指南（推荐）

包含从Git安装到自定义域名配置的完整流程：
- **[完整部署指南](./部署文档/完整部署指南.md)** ⭐ - 30-40分钟完成部署，包含域名配置

**最终访问地址：** `https://cosmetics.linggxz.online`

### 📖 标准部署

如果你有一定技术基础，请查看：
- **[DEPLOYMENT.md](./部署文档/DEPLOYMENT.md)** - 标准部署流程

## 自定义配置

### 修改题目数量

在 [`src/app/quiz/page.tsx`](src/app/quiz/page.tsx:259) 中修改：

```typescript
const randomQuestions = getRandomQuestions(questions, 10) // 改为你想要的数量
```

### 修改评分标准

在 [`src/utils/quiz.ts`](src/utils/quiz.ts:23) 中修改 `getScoreComment` 函数。

### 修改广告内容

在 [`src/app/result/page.tsx`](src/app/result/page.tsx:40) 中修改广告区域内容。

## 开发计划

- [ ] 添加题目解析展示
- [ ] 添加分享功能
- [ ] 添加排行榜
- [ ] 支持多种题库切换
- [ ] 添加用户答题历史

## 许可证

MIT License

## 联系方式

如有问题或建议，欢迎联系：
- 小红书：灵光信栈

---

**祝你使用愉快！** 🎉
