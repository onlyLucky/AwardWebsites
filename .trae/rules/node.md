---
alwaysApply: false
description: 安装或移除依赖时
---
# Node.js 规则

## 依赖管理

- **必须使用 pnpm 安装依赖**
  
  安装依赖时，始终使用 pnpm 而不是 npm 或 yarn：

  ```bash
  # 安装所有依赖
  pnpm install

  # 安装特定包
  pnpm add <package-name>

  # 安装开发依赖
  pnpm add -D <package-name>

  # 全局安装包
  pnpm add -g <package-name>

  # 移除依赖
  pnpm remove <package-name>

  # 移除开发依赖
  pnpm remove -D <package-name>

  # 清除项目依赖缓存
  pnpm store prune

  # 清除所有缓存
  pnpm store prune --force
  ```

  **原因**：
  - pnpm 使用硬链接和符号链接，节省磁盘空间
  - 安装速度更快
  - 严格的依赖管理，避免幽灵依赖
  - 更好的 monorepo 支持
