# andstats

基于Web的在线统计学工具，让数据分析变得简单高效。

## 项目简介

andstats是一个功能强大的在线统计学工具，旨在为用户提供直观、易用的数据分析和可视化功能。无论是数据科学家、研究人员还是学生，都可以通过andstats轻松进行统计分析、数据可视化和报告生成。

## 技术栈

- **前端框架**: Nuxt 4
- **UI组件库**: TDesign Vue Next
- **状态管理**: Pinia
- **样式方案**: UnoCSS
- **身份验证**: nuxt-auth-utils
- **构建工具**: Vite
- **开发语言**: TypeScript

## 核心功能

### 统计分析
- 描述性统计
- 推断统计
- 回归分析
- 相关性分析
- 假设检验

### 数据可视化
- 柱状图
- 折线图
- 散点图
- 饼图
- 箱线图
- 热力图

### 数据管理
- 数据导入导出
- 数据清洗
- 数据转换
- 数据筛选

### 报告生成
- 自动生成分析报告
- 支持导出多种格式
- 自定义报告模板

## 快速开始

### 安装依赖

使用pnpm安装项目依赖：

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

开发服务器将在 http://localhost:3000 启动。

### 构建生产版本

```bash
pnpm build
```

### 本地预览生产构建

```bash
pnpm preview
```

## 项目结构

```
andstats/
├── app/                  # 应用源码
│   ├── components/       # Vue组件
│   ├── composables/      # 组合式函数
│   ├── pages/            # 页面路由
│   ├── stores/           # Pinia状态管理
│   └── ...
├── server/               # 服务器端代码
│   ├── api/              # API路由
│   └── ...
├── public/               # 静态资源
├── nuxt.config.ts        # Nuxt配置
├── package.json          # 项目依赖
└── README.md             # 项目说明
```

## 开发说明

### 主题切换

项目支持浅色和深色主题切换，主题设置会保存在本地存储中。

### 身份验证

使用nuxt-auth-utils实现身份验证功能，支持登录、注册和退出登录。

### 响应式设计

项目采用响应式设计，适配不同屏幕尺寸，包括桌面端和移动端。

## 部署

### Vercel部署

1. 登录Vercel账号
2. 点击"New Project"
3. 选择项目仓库
4. 配置部署设置
5. 点击"Deploy"

### 其他部署方式

参考 [Nuxt部署文档](https://nuxt.com/docs/getting-started/deployment) 获取更多部署选项。

## 许可证

AGPL v3.0 License

## 贡献

欢迎提交Issue和Pull Request！

## 联系方式

- 项目地址: [https://github.com/yourusername/andstats](https://github.com/yourusername/andstats)