# Shader.se 项目复刻

基于 [shader-se-交互分析.md](https://github.com/.../shader-se-交互分析.md) 的网站复刻项目。

## 当前状态

✅ 项目已成功运行在 http://localhost:3000
✅ 基本 UI 已实现
✅ 使用 Tailwind CSS 样式
✅ 响应式设计

## 已实现功能

1. **启动加载画面** - 复古 CRT 风格动画
2. **Hero 区域** - 标题和滚动提示
3. **项目轮播** - 可切换的项目展示
4. **About 区域** - 公司介绍
5. **Contact 区域** - 联系信息和社交媒体链接
6. **导航** - 固定导航和全屏菜单
7. **占位 3D 场景** - 简化的 3D 层替代

## 当前简化

为了确保项目能够顺利运行，我们暂时简化了以下功能：

1. **移除 Three.js 相关依赖** - 暂时使用 CSS 实现 3D 场景占位
2. **移除 Lenis 平滑滚动** - 使用原生滚动
3. **移除视频播放** - 使用 CSS 渐变替代视频
4. **移除 HLS.js 和 Mux** - 简化了项目轮播

## 如何添加完整功能

### 1. 添加 Three.js 和 3D 功能

在 `package.json` 中添加依赖：
```json
"dependencies": {
  "@react-three/drei": "^9.114.6",
  "@react-three/fiber": "^8.17.10",
  "@react-three/postprocessing": "^2.16.3",
  "@types/three": "^0.169.0",
  "three": "^0.169.0"
}
```

然后恢复原始的 `page.tsx` 和 `Scene.tsx` 组件。

### 2. 添加 Lenis 平滑滚动

在 `package.json` 中添加依赖：
```json
"dependencies": {
  "lenis": "^1.1.13"
}
```

然后恢复原始的 `LenisProvider.tsx`。

### 3. 添加视频播放功能

在 `package.json` 中添加依赖：
```json
"dependencies": {
  "hls.js": "^1.5.15"
}
```

然后恢复原始的 `WorkCarousel.tsx`。

## 运行项目

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 生产构建
npm run build

# 生产运行
npm start
```

## 项目结构

```
shader.se/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── providers/
│   │   └── LenisProvider.tsx (简化版)
│   ├── three/
│   │   ├── ComputerModel.tsx (待使用)
│   │   ├── Scene.tsx (简化版)
│   │   └── SpringMouse.tsx (待使用)
│   └── ui/
│       ├── About.tsx
│       ├── BootScreen.tsx
│       ├── Contact.tsx
│       ├── Hero.tsx
│       ├── Navigation.tsx
│       └── WorkCarousel.tsx (简化版)
├── shaders/
│   ├── chromatic.glsl
│   ├── scanline.glsl
│   └── vignette.glsl
├── public/
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

## 学习参考

原始分析文档：[shader-se-交互分析.md](../docs/shader-se-交互分析.md)
