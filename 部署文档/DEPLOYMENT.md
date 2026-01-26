# 部署指南

本文档详细说明如何将化妆品测试项目部署到 Vercel。

## 前置准备

1. **GitHub 账号**
   - 访问 https://github.com 注册账号（如果还没有）

2. **Vercel 账号**
   - 访问 https://vercel.com 注册账号
   - 推荐使用 GitHub 账号登录

## 部署步骤

### 方法一：通过 GitHub + Vercel（推荐）

#### 1. 创建 GitHub 仓库

```bash
# 在项目目录下初始化 Git（如果还没有）
cd cosmetics-quiz
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: 化妆品知识测试项目"

# 在 GitHub 上创建新仓库后，关联远程仓库
git remote add origin https://github.com/你的用户名/cosmetics-quiz.git

# 推送代码
git branch -M main
git push -u origin main
```

#### 2. 在 Vercel 中导入项目

1. 登录 Vercel (https://vercel.com)
2. 点击 "Add New..." → "Project"
3. 选择 "Import Git Repository"
4. 选择你的 GitHub 仓库 `cosmetics-quiz`
5. 配置项目：
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
6. 点击 "Deploy"

#### 3. 等待部署完成

- 首次部署大约需要 2-3 分钟
- 部署成功后会获得一个 `.vercel.app` 域名
- 例如：`cosmetics-quiz.vercel.app`

### 方法二：通过 Vercel CLI

#### 1. 安装 Vercel CLI

```bash
npm install -g vercel
```

#### 2. 登录 Vercel

```bash
vercel login
```

#### 3. 部署项目

```bash
cd cosmetics-quiz
vercel
```

按照提示操作：
- Set up and deploy? → Yes
- Which scope? → 选择你的账号
- Link to existing project? → No
- What's your project's name? → cosmetics-quiz
- In which directory is your code located? → ./
- Want to override the settings? → No

#### 4. 生产环境部署

```bash
vercel --prod
```

## 绑定自定义域名

### 1. 在 Vercel 中添加域名

1. 进入项目设置
2. 点击 "Domains"
3. 输入你的域名（例如：cosmetics.yourdomain.com）
4. 点击 "Add"

### 2. 配置 DNS

在你的域名服务商处添加 DNS 记录：

**方式一：使用 CNAME（推荐）**
```
类型: CNAME
名称: cosmetics (或 @)
值: cname.vercel-dns.com
```

**方式二：使用 A 记录**
```
类型: A
名称: cosmetics (或 @)
值: 76.76.21.21
```

### 3. 等待 DNS 生效

- 通常需要 5-30 分钟
- Vercel 会自动配置 SSL 证书

## 环境变量配置

如果项目需要环境变量：

1. 在 Vercel 项目设置中
2. 点击 "Environment Variables"
3. 添加变量：
   - Name: 变量名
   - Value: 变量值
   - Environment: Production / Preview / Development

## 自动部署

配置完成后，每次推送代码到 GitHub：

```bash
git add .
git commit -m "更新内容"
git push
```

Vercel 会自动检测并重新部署。

## 部署优化

### 1. 图片优化

使用 Next.js Image 组件：

```typescript
import Image from 'next/image'

<Image
  src={currentQuestion.image}
  alt="化妆品"
  width={800}
  height={800}
  className="rounded-lg"
/>
```

### 2. 配置 next.config.ts

```typescript
const nextConfig = {
  images: {
    domains: ['picsum.photos', 'images.unsplash.com'],
  },
}

export default nextConfig
```

### 3. 启用压缩

Vercel 默认启用 Gzip 压缩，无需额外配置。

## 监控和分析

### 1. Vercel Analytics

在项目设置中启用 Analytics：
- 访问量统计
- 性能监控
- 用户行为分析

### 2. 查看部署日志

在 Vercel 项目页面：
- 点击 "Deployments"
- 选择具体部署
- 查看 "Build Logs" 和 "Function Logs"

## 常见问题

### 1. 部署失败

**检查构建日志**：
```bash
# 本地测试构建
npm run build
```

**常见错误**：
- TypeScript 类型错误
- 缺少依赖包
- 环境变量未配置

### 2. 图片无法显示

**解决方案**：
- 检查图片路径是否正确
- 确认 `next.config.ts` 中配置了外部图片域名
- 使用相对路径或 CDN

### 3. 页面 404

**解决方案**：
- 检查路由配置
- 确认文件名和目录结构正确
- 清除 Vercel 缓存重新部署

### 4. 性能优化

**建议**：
- 使用 Next.js Image 组件
- 启用静态生成（SSG）
- 减少客户端 JavaScript 大小
- 使用 CDN 加速图片加载

## 回滚部署

如果新版本有问题：

1. 在 Vercel 项目页面
2. 点击 "Deployments"
3. 找到之前的稳定版本
4. 点击 "..." → "Promote to Production"

## 删除项目

如果需要删除项目：

1. 在 Vercel 项目设置
2. 滚动到底部
3. 点击 "Delete Project"
4. 输入项目名称确认

## 成本说明

**Vercel 免费计划包括**：
- 无限部署
- 100GB 带宽/月
- 自动 SSL 证书
- 全球 CDN
- 适合个人项目和小型应用

**升级到 Pro 计划**（如果需要）：
- 更多带宽
- 更快构建速度
- 团队协作功能
- 优先技术支持

## 下一步

部署完成后：
1. ✅ 测试所有功能
2. ✅ 分享链接给朋友
3. ✅ 收集用户反馈
4. ✅ 持续优化和更新

---

**祝部署顺利！** 🚀
