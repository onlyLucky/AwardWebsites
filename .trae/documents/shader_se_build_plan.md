# Shader.se 项目构建计划

## 项目概述

根据 [shader-se-交互分析.md](file:///Users/feynman/Documents/code/2026/AwardWebsites/docs/shader-se-交互分析.md) 文档，我们将在 `/Users/feynman/Documents/code/2026/AwardWebsites/shader.se` 目录中构建一个复刻版的 Shader.se 网站。

## 技术栈

| 类别 | 技术 | 版本/说明 |
|------|------|-----------|
| **前端框架** | Next.js (App Router) | React Server Components |
| **UI 框架** | React | 基于 Next.js 构建 |
| **3D 渲染** | Three.js | WebGPU 渲染器 |
| **3D 集成** | React Three Fiber (R3F) | 声明式 Three.js React 封装 |
| **CSS 框架** | Tailwind CSS | Utility-first CSS |
| **平滑滚动** | Lenis | 丝滑滚动效果 |
| **视频流** | Mux + HLS.js | 自适应码率流媒体 |
| **分析** | 自托管分析服务 | `analytics.shader.build` |

## 项目结构

```
shader.se/
├── app/
│   ├── layout.tsx          # 根布局
│   ├── page.tsx            # 首页
│   └── globals.css         # 全局样式
├── components/
│   ├── three/
│   │   ├── Scene.tsx       # R3F 主场景
│   │   ├── ComputerModel.tsx  # 3D 电脑模型
│   │   ├── ProductShowcase.tsx # 产品展示
│   │   ├── PostProcessing.tsx  # 后处理效果
│   │   └── SpringMouse.tsx     # 鼠标弹簧追踪
│   ├── ui/
│   │   ├── BootScreen.tsx  # 启动加载画面
│   │   ├── Navigation.tsx  # 导航
│   │   ├── Hero.tsx        # Hero 区域
│   │   ├── WorkCarousel.tsx # 项目轮播
│   │   ├── About.tsx       # 关于我们
│   │   └── Contact.tsx     # 联系方式
│   └── providers/
│       └── LenisProvider.tsx # 平滑滚动 Provider
├── shaders/
│   ├── chromatic.glsl      # 色差效果
│   ├── scanline.glsl       # 扫描线效果
│   └── vignette.glsl       # 暗角效果
├── public/
│   ├── models/             # 3D 模型 (.glb)
│   │   ├── deskbox.glb     # 桌面盒子模型
│   │   ├── shredder.glb    # 碎纸机模型
│   │   ├── tie.glb         # 领带模型
│   │   ├── phones.glb      # 电话模型
│   │   ├── trophy2.glb     # 奖杯模型
│   │   └── bank.glb        # 银行模型
│   ├── textures/           # 纹理贴图
│   │   └── rgba_noise.png  # 噪声纹理
│   └── fonts/              # 字体文件
└── package.json
```

## 构建步骤

### 1. 项目初始化

```bash
# 创建 Next.js 项目
npx create-next-app@latest shader.se --typescript --tailwind --app

# 进入项目目录
cd shader.se
```

### 2. 安装核心依赖

```bash
# 安装 3D 相关依赖
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing

# 安装滚动和动画依赖
npm install lenis gsap

# 安装视频播放
npm install hls.js

# 安装其他依赖
npm install @types/three
```

### 3. 创建目录结构

```bash
# 创建组件目录
mkdir -p components/three components/ui components/providers

# 创建着色器目录
mkdir -p shaders

# 创建 public 子目录
mkdir -p public/models public/textures public/fonts
```

### 4. 核心文件实现

#### 4.1 根布局 (app/layout.tsx)
- 配置 Lenis 平滑滚动
- 设置全局样式

#### 4.2 首页 (app/page.tsx)
- 集成 BootScreen、Navigation、Hero、WorkCarousel、About、Contact 组件
- 配置 Three.js Canvas

#### 4.3 3D 相关组件
- Scene.tsx: 主 3D 场景
- ComputerModel.tsx: 3D 电脑模型
- PostProcessing.tsx: 后处理效果
- SpringMouse.tsx: 鼠标弹簧追踪

#### 4.4 UI 组件
- BootScreen.tsx: 启动加载画面
- Navigation.tsx: 导航栏
- Hero.tsx: Hero 区域
- WorkCarousel.tsx: 项目轮播
- About.tsx: 关于我们
- Contact.tsx: 联系方式

#### 4.5 提供者组件
- LenisProvider.tsx: 平滑滚动提供者

### 5. 资源准备

#### 5.1 3D 模型
- 下载或创建 GLB 格式的 3D 模型
- 放置到 public/models/ 目录

#### 5.2 纹理
- 创建或下载 rgba_noise.png 噪声纹理
- 放置到 public/textures/ 目录

#### 5.3 着色器
- 创建 chromatic.glsl、scanline.glsl、vignette.glsl 着色器文件
- 放置到 shaders/ 目录

### 6. 构建和测试

```bash
# 开发模式运行
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

## 技术实现要点

### 1. Three.js WebGPU 渲染
- 使用 WebGPU 渲染器提高性能
- 配置合适的相机和灯光

### 2. 滚动驱动动画
- 使用 Lenis 实现平滑滚动
- 映射滚动进度到 3D 场景动画

### 3. 视频流集成
- 使用 Mux + HLS.js 实现自适应码率视频
- 优化视频加载和切换

### 4. 后处理效果
- 实现色差、扫描线、暗角等复古效果
- 使用 React Three Postprocessing

### 5. 性能优化
- 3D 模型压缩
- 纹理优化
- 代码分割
- 按需渲染

## 风险评估

1. **3D 模型资源**：需要获取或创建高质量的 3D 模型
2. **视频内容**：需要准备示例视频或使用 Mux 平台
3. **性能挑战**：复杂的 3D 场景可能在低端设备上运行缓慢
4. **WebGPU 兼容性**：部分浏览器可能不支持 WebGPU

## 解决方案

1. **3D 模型**：使用免费的 3D 模型资源或简化模型
2. **视频内容**：使用 Mux 提供的示例视频或创建简短的演示视频
3. **性能优化**：实现 LOD、降低 DPR、按需渲染
4. **兼容性**：提供 WebGL 回退方案

## 预期成果

- 完整的 Shader.se 复刻网站
- 响应式设计，适配不同设备
- 流畅的 3D 交互体验
- 复古 CRT 视觉效果
- 平滑的滚动驱动动画
