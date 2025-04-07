# Vercel 自动部署

本项目使用 GitHub Actions 结合 Vercel 实现自动部署。每当推送到主分支或创建 Pull Request 时，系统会自动部署最新代码到 Vercel 平台。

## 部署配置

### 前置条件

在使用自动部署功能之前，您需要完成以下准备工作：

1. 在 Vercel 上创建项目并获取以下信息：
   - Vercel Token
   - Vercel Organization ID
   - Vercel Project ID

> **如何获取 Vercel Token、Organization ID 和 Project ID：**
>
> **获取 Vercel Token：**
>
> 1. 登录 [Vercel 控制台](https://vercel.com/dashboard)
> 2. 点击右上角头像，选择 "Settings"
> 3. 在左侧菜单中选择 "Tokens"
> 4. 点击 "Create" 创建新的 Token
> 5. 为 Token 指定名称（如 "GitHub Actions"）和过期时间
> 6. 点击 "Create" 并复制生成的 Token 值
>
> **获取 Organization ID 和 Project ID：**
>
> 1. 使用 Vercel CLI 连接项目：
>
>    ```bash
>    # 安装 Vercel CLI（如果尚未安装）
>    npm i -g vercel
>
>    # 如果出现 "'vercel' 不是内部或外部命令，也不是可运行的程序或批处理文件" 错误：
>    # 1. 确保 Node.js 已正确安装
>    # 2. 尝试以管理员身份运行命令提示符或终端
>    # 3. 或使用 npx 运行命令：npx vercel login
>    # 4. 检查 npm 的全局安装路径是否在系统 PATH 环境变量中
>    # 5. 安装后可能需要重启终端或命令提示符
>
>    # 登录 Vercel
>    vercel login
>
>    # 在项目目录中关联现有项目或创建新项目
>    vercel link
>    ```
>
> 2. 关联后，Vercel CLI 将在项目目录中创建 `.vercel/project.json` 文件
> 3. 这个文件包含 `orgId`（Organization ID）和 `projectId`（Project ID）
>    ```json
>    { "orgId": "your_org_id", "projectId": "your_project_id" }
>    ```

2. 在 GitHub 仓库中设置以下 Secrets：
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`

### 工作流配置

本项目的 Vercel 部署流程由 GitHub Actions 工作流 `.github/workflows/vercel-deploy.yml` 定义，包含以下步骤：

1. 检出代码
2. 设置 Node.js 环境
3. 安装依赖
4. 构建项目
5. 部署到 Vercel

```yaml
name: Vercel部署

on:
  push:
    branches: [main, master]
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: 设置Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: 安装依赖
        run: npm ci

      - name: 构建
        run: npm run build

      - name: 部署到Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          github-token: ${{ secrets.GITHUB_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./
          alias-domains: |
            chat-ai-nav.vercel.app
            {{BRANCH}}.chat-ai-nav.vercel.app
            pr-{{PR_NUMBER}}.chat-ai-nav.vercel.app
          github-comment: true
```

### Vercel 配置

项目根目录下的 `vercel.json` 文件包含 Vercel 的配置信息：

```json
{
  "version": 2,
  "public": false,
  "github": {
    "enabled": false
  },
  "builds": [{ "src": ".next", "use": "@vercel/static" }],
  "rewrites": [{ "source": "/(.*)", "destination": "/$1" }]
}
```

该配置禁用了 Vercel 的 GitHub 集成，因为我们使用 GitHub Actions 来控制部署流程。

## 部署预览

每当创建 Pull Request 时，GitHub Actions 会自动部署预览版本，并在 PR 中添加评论，其中包含预览链接。每个分支和 PR 都有专属的预览URL：

- 主分支: `chat-ai-nav.vercel.app`
- 其他分支: `[分支名].chat-ai-nav.vercel.app`
- PR预览: `pr-[PR编号].chat-ai-nav.vercel.app`

## 故障排除

如果部署过程失败，请检查：

1. GitHub Secrets 是否正确设置
2. Vercel 项目配置是否正确
3. 构建过程是否有错误
4. GitHub Actions 日志以获取详细错误信息
