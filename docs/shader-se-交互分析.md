# Shader.se 页面交互技术深度分析

> 网站地址：https://www.shader.se/
> 分析日期：2026-04-25
> 分析范围：页面交互方式、技术栈、实现原理、复刻指南

---

## 一、技术栈总览

通过源码分析、控制台日志、网络请求等多维度取证，确认 Shader.se 使用了以下核心技术栈：

| 类别 | 技术 | 版本/说明 |
|------|------|-----------|
| **前端框架** | Next.js (App Router) | 从 `_next/static/chunks` 路径确认 |
| **UI 框架** | React | 基于 Next.js 构建 |
| **3D 渲染** | Three.js | 控制台警告 `THREE.Clock` 确认，使用 WebGPU 渲染器 |
| **3D 集成** | React Three Fiber (R3F) | 声明式 Three.js React 封装 |
| **CSS 框架** | Tailwind CSS | `fixed inset-0 w-screen overflow-y-auto` 等 utility class |
| **平滑滚动** | Lenis | `class="lenis"` 出现在 scroll-container 上 |
| **鼠标追踪** | SpringMouseProvider | 自定义鼠标弹簧物理追踪组件 |
| **视频流** | Mux + HLS.js | `.m3u8` 流媒体 + `mux.com` CDN 分发（从网络请求确认） |
| **字体** | Stix Two Text (自托管) | 自定义 woff2 字体 + SDF 纹理 JSON（用于 WebGL 文字渲染） |
| **分析** | 自托管分析服务 | `analytics.shader.build`（从网络请求确认） |
| **3D 模型** | GLTF/GLB 格式 | 加载多个 3D 模型文件：deskbox.glb、shredder.glb、tie.glb、phones.glb、trophy2.glb、bank.glb（从网络请求确认） |
| **后处理** | 自定义 GLSL Shaders | 色差、扫描线、CRT 弯曲、暗角等效果 |

---

## 二、页面结构分析

### 2.1 整体架构

```
┌─────────────────────────────────────────────┐
│  <html lang="en">                           │
│  ┌─────────────────────────────────────────┐ │
│  │ #scroll-container (Lenis 平滑滚动)       │ │
│  │  ┌───────────────────────────────────┐  │ │
│  │  │ A11y Overlay (无障碍隐藏层)        │  │ │
│  │  │  - 导航 / Hero / Work / About    │  │ │
│  │  │  - Contact 等语义化 HTML          │  │ │
│  │  └───────────────────────────────────┘  │ │
│  └─────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────┐ │
│  │ WebGL Canvas (fixed, z-40)              │ │
│  │  - Three.js WebGPU 渲染器               │ │
│  │  - 全屏 3D 场景                         │ │
│  └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

**关键设计模式：**
- **HTML 层（z-50）** 与 **WebGL 层（z-40）** 分离，HTML 在上层负责无障碍和 SEO，WebGL 在下层负责视觉渲染
- 两个层通过 `pointer-events-none` 和精确的事件代理实现交互穿透
- 滚动容器使用 `overscroll-none` 防止页面级滚动干扰

### 2.2 页面区域

| 区域 | 内容 | 交互类型 |
|------|------|----------|
| **Loading/Boot** | 复古 CRT 启动画面 + 进度条 | 自动播放加载动画 |
| **Hero** | 3D 复古电脑 + 标题 "A Creative Development Studio, Plugged into the Future" + 滚动提示 | 鼠标视差 + 滚动驱动动画 |
| **Selected Work** | 项目轮播（11个项目） + 标题 "Selected Work" + 描述 "Browse our project carousel to explore our selected work." | 左右切换 + 视频预览 + Mux 流媒体播放 |
| **About Us** | 公司介绍 + 3D 产品展示 + 标题 "Making Digital Storytelling More Playful, Powerful, and Alive" | 滚动驱动 3D 场景切换 |
| **Contact** | 联系信息 + 社交链接（LinkedIn、Instagram、X/Twitter） + 标题 "Contact" + 描述 "Contact us about your digital project idea or general enquires. Let's interface, call us today!" | 静态内容 + 链接交互 |

---

## 三、交互方式详解（共 7 种核心交互）

### 交互 1：复古 CRT 启动加载动画

**效果描述：**
页面打开后首先展示一个模拟 80 年代 CRT 电脑启动的画面，包含：
- 像素化 Logo + 扫描线效果
- 色差（Chromatic Aberration）文字
- 分段式进度条动画
- 版本号和版权信息

**实现原理：**

```
技术链路：
1. CSS 扫描线 → repeating-linear-gradient 叠加层
2. CSS 色差 → text-shadow 多层偏移 (红/青通道分离)
3. 进度条 → CSS animation + JS 进度控制
4. CRT 弯曲 → CSS border-radius + perspective 变换
5. 暗角效果 → radial-gradient 遮罩
```

**核心代码示例：**

```css
/* CRT 扫描线效果 */
.crt-scanlines::after {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.15) 0px,
    rgba(0, 0, 0, 0.15) 1px,
    transparent 1px,
    transparent 2px
  );
  pointer-events: none;
  z-index: 10;
}

/* 色差文字效果 */
.chromatic-text {
  text-shadow:
    -2px 0 rgba(255, 0, 0, 0.7),
    2px 0 rgba(0, 255, 255, 0.7);
  animation: textGlitch 3s infinite alternate;
}

@keyframes textGlitch {
  0% { text-shadow: -2px 0 rgba(255, 0, 0, 0.7), 2px 0 rgba(0, 255, 255, 0.7); }
  25% { text-shadow: -1px 0 rgba(255, 0, 0, 0.5), 1px 0 rgba(0, 255, 255, 0.5); }
  50% { text-shadow: -3px 0 rgba(255, 0, 0, 0.9), 3px 0 rgba(0, 255, 255, 0.9); }
  100% { text-shadow: -2px 0 rgba(255, 0, 0, 0.7), 2px 0 rgba(0, 255, 255, 0.7); }
}

/* 分段进度条 */
.progress-bar {
  display: flex;
  gap: 4px;
}
.progress-segment {
  width: 20px;
  height: 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
.progress-segment.active {
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
}
```

```javascript
// 加载进度控制
async function playBootSequence() {
  const segments = document.querySelectorAll('.progress-segment');
  const totalAssets = await preloadAssets(); // 预加载 3D 模型、纹理、视频

  for (let i = 0; i < segments.length; i++) {
    await delay(100 + Math.random() * 200); // 模拟真实加载的不均匀感
    segments[i].classList.add('active');
  }

  // 加载完成，淡出启动画面
  await fadeOutBootScreen();
  initMainScene(); // 初始化主 3D 场景
}
```

---

### 交互 2：3D 场景鼠标视差（SpringMouseProvider）

**效果描述：**
鼠标在页面上移动时，3D 场景中的物体会跟随鼠标产生微妙的位移和旋转，营造空间深度感。使用弹簧物理（Spring Physics）使运动自然、有惯性。

**实现原理：**

```
技术链路：
1. 监听 mousemove 事件 → 获取归一化坐标 (-1 ~ 1)
2. SpringMouseProvider → 弹簧物理插值（阻尼 + 刚度）
3. 传递给 R3F useFrame → 每帧更新相机/物体 transform
4. Three.js 渲染 → 实时反映鼠标位置
```

**核心代码示例：**

```tsx
// SpringMouseProvider - 弹簧鼠标追踪
import { useRef, createContext, useContext, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const MouseContext = createContext({ x: 0, y: 0 });

// 弹簧物理参数
const SPRING_CONFIG = {
  stiffness: 100,  // 刚度 - 回弹力度
  damping: 20,     // 阻尼 - 运动衰减
  mass: 1,         // 质量
};

function SpringMouseProvider({ children }) {
  const mouse = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    // 归一化鼠标坐标到 -1 ~ 1
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }, []);

  useFrame((_, delta) => {
    // 弹簧物理计算
    const { stiffness, damping, mass } = SPRING_CONFIG;

    ['x', 'y'].forEach(axis => {
      const force = (mouse.current[axis] - current.current[axis]) * stiffness;
      const dampingForce = -velocity.current[axis] * damping;
      const acceleration = (force + dampingForce) / mass;

      velocity.current[axis] += acceleration * delta;
      current.current[axis] += velocity.current[axis] * delta;
    });
  });

  // 在 document 上监听鼠标事件
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <MouseContext.Provider value={current.current}>
      {children}
    </MouseContext.Provider>
  );
}

// 在 3D 组件中使用鼠标位置
function ComputerModel() {
  const meshRef = useRef();
  const mouse = useContext(MouseContext);

  useFrame(() => {
    if (meshRef.current) {
      // 鼠标影响相机的微小偏移
      meshRef.current.rotation.y = mouse.x * 0.05;
      meshRef.current.rotation.x = mouse.y * 0.03;
    }
  });

  return <group ref={meshRef}>{/* 3D 模型 */}</group>;
}
```

---

### 交互 3：滚动驱动 3D 场景动画（Scroll-Driven Animation）

**效果描述：**
这是该网站最核心的交互。滚动页面时，3D 场景会随着滚动位置产生连续的动画变化：
- Hero 区域：3D 电脑模型随滚动旋转/缩放
- 产品展示区：不同 3D 产品随滚动切换
- 场景过渡：雾气密度、光照强度随滚动变化

**实现原理：**

```
技术链路：
1. Lenis 平滑滚动 → 提供丝滑的滚动体验
2. 滚动位置归一化 → 0~1 的进度值
3. 进度值映射到 3D 动画时间线
4. Three.js useFrame → 根据进度插值更新场景
5. 后处理效果强度也随滚动变化
```

**核心代码示例：**

```tsx
import { Lenis } from 'lenis';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// 初始化 Lenis 平滑滚动
function initSmoothScroll() {
  const lenis = new Lenis({
    duration: 1.2,        // 滚动持续时间
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    touchMultiplier: 2,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  return lenis;
}

// 滚动进度追踪器
function useScrollProgress() {
  const progress = useRef(0);
  const lenisRef = useRef(null);

  useEffect(() => {
    lenisRef.current = initSmoothScroll();

    lenisRef.current.on('scroll', ({ scroll, limit }) => {
      // 归一化滚动进度 0 ~ 1
      progress.current = scroll / limit;
    });
  }, []);

  return progress;
}

// 滚动驱动的 3D 场景
function ScrollDrivenScene() {
  const groupRef = useRef();
  const scrollProgress = useScrollProgress();

  useFrame(() => {
    const t = scrollProgress.current;

    // === Hero 区域 (0 ~ 0.25) ===
    if (t < 0.25) {
      const localT = t / 0.25;
      // 电脑模型随滚动旋转
      groupRef.current.rotation.y = localT * Math.PI * 0.5;
      groupRef.current.position.y = THREE.MathUtils.lerp(0, -2, localT);
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(1, 0.8, localT));
    }
    // === 产品展示区 (0.25 ~ 0.75) ===
    else if (t < 0.75) {
      const localT = (t - 0.25) / 0.5;
      // 切换不同产品展示
      const productIndex = Math.floor(localT * 3);
      showProduct(productIndex, localT % (1/3));
    }
    // === Contact 区域 (0.75 ~ 1.0) ===
    else {
      const localT = (t - 0.75) / 0.25;
      groupRef.current.position.z = THREE.MathUtils.lerp(0, -5, localT);
    }
  });

  return <group ref={groupRef}>{/* 3D 内容 */}</group>;
}
```

```css
/* 滚动容器样式 */
#scroll-container {
  position: fixed;
  inset: 0;
  width: 100vw;
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-none: none;
  z-index: 50;
}

/* 用于撑开滚动高度的占位元素 */
.scroll-spacer {
  height: 500vh; /* 5 倍视口高度，提供足够的滚动空间 */
}
```

---

### 交互 4：项目视频轮播（Mux HLS 流媒体）

**效果描述：**
Selected Work 区域展示 11 个项目，每个项目配有高质量视频预览。用户可以左右切换项目，视频自动播放。

**实现原理：**

```
技术链路：
1. Mux 平台托管视频 → HLS (.m3u8) 自适应码率流
2. HLS.js 解析 m4s 分片 → 在 Canvas/Video 元素上播放
3. 视频作为 Three.js 纹理 → 映射到 3D 平面或屏幕
4. 切换项目时 → 预加载下一个视频 + 交叉淡入淡出
5. 自定义亮度/对比度 → 每个项目可配置 brightness/contrast
```

**核心代码示例：**

```tsx
import Hls from 'hls.js';

function VideoCarousel({ projects }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);
  const hlsRef = useRef(null);

  // 加载并播放 Mux 视频
  useEffect(() => {
    const project = projects[currentIndex];
    const videoUrl = `https://stream.mux.com/${project.mux_playback_id}.m3u8`;

    if (Hls.isSupported()) {
      if (hlsRef.current) hlsRef.current.destroy();

      const hls = new Hls({
        maxBufferLength: 2,
        maxMaxBufferLength: 5,
      });
      hls.loadSource(videoUrl);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current.play();
      });
      hlsRef.current = hls;
    }
    // Safari 原生 HLS 支持
    else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = videoUrl;
      videoRef.current.play();
    }

    return () => {
      if (hlsRef.current) hlsRef.current.destroy();
    };
  }, [currentIndex]);

  // 项目切换
  const goTo = (direction) => {
    const newIndex = direction === 'next'
      ? (currentIndex + 1) % projects.length
      : (currentIndex - 1 + projects.length) % projects.length;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="carousel">
      <button onClick={() => goTo('prev')}>← Previous</button>
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        style={{
          filter: `brightness(${projects[currentIndex].brightness ?? 1}) contrast(${projects[currentIndex].contrast ?? 1})`,
        }}
      />
      <button onClick={() => goTo('next')}>Next →</button>
    </div>
  );
}
```

---

### 交互 5：WebGL 后处理特效（Post-Processing Shaders）

**效果描述：**
整个 3D 场景叠加了多种后处理效果，营造出复古电影质感：
- **色差（Chromatic Aberration）**：RGB 通道偏移
- **扫描线（Scanlines）**：CRT 显示器水平线条
- **暗角（Vignette）**：边缘渐暗效果
- **胶片颗粒（Film Grain）**：随机噪点纹理
- **Bloom 发光**：亮部区域光晕扩散

**实现原理：**

```
技术链路：
1. Three.js EffectComposer → 后处理管线
2. RenderPass → 渲染基础场景
3. 自定义 ShaderPass → 应用各种后处理效果
4. UnrealBloomPass → Bloom 发光效果
5. 最终输出到 Canvas
```

**核心代码示例：**

```glsl
// 色差 + 扫描线 + 暗角 组合后处理 Fragment Shader
uniform sampler2D tDiffuse;
uniform float uTime;
uniform float uChromaticAberration; // 色差强度
uniform float uScanlineIntensity;   // 扫描线强度
uniform float uVignetteIntensity;   // 暗角强度
uniform vec2 uResolution;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec2 center = uv - 0.5;

  // === 1. 色差效果 ===
  float dist = length(center);
  float caStrength = uChromaticAberration * dist;
  vec2 caOffset = normalize(center) * caStrength;

  float r = texture2D(tDiffuse, uv + caOffset).r;
  float g = texture2D(tDiffuse, uv).g;
  float b = texture2D(tDiffuse, uv - caOffset).b;
  vec3 color = vec3(r, g, b);

  // === 2. 扫描线效果 ===
  float scanline = sin(uv.y * uResolution.y * 3.14159) * 0.5 + 0.5;
  scanline = pow(scanline, uScanlineIntensity);
  color *= mix(1.0, scanline, 0.3);

  // === 3. 暗角效果 ===
  float vignette = 1.0 - smoothstep(0.3, 0.9, dist);
  color *= mix(1.0, vignette, uVignetteIntensity);

  // === 4. 胶片颗粒 ===
  float grain = fract(sin(dot(uv * uTime, vec2(12.9898, 78.233))) * 43758.5453);
  color += (grain - 0.5) * 0.05;

  gl_FragColor = vec4(color, 1.0);
}
```

```tsx
// Three.js 后处理管线设置
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

function setupPostProcessing(renderer, scene, camera) {
  const composer = new EffectComposer(renderer);

  // 基础渲染
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  // Bloom 发光
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.5,   // 强度
    0.4,   // 半径
    0.85   // 阈值
  );
  composer.addPass(bloomPass);

  // 自定义后处理 Shader（色差+扫描线+暗角+颗粒）
  const customShader = {
    uniforms: {
      tDiffuse: { value: null },
      uTime: { value: 0 },
      uChromaticAberration: { value: 0.003 },
      uScanlineIntensity: { value: 1.5 },
      uVignetteIntensity: { value: 0.6 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    },
    vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: /* 上面的 GLSL 代码 */,
  };
  const customPass = new ShaderPass(customShader);
  composer.addPass(customPass);

  return { composer, customPass };
}
```

---

### 交互 6：3D 模型展示与场景切换

**效果描述：**
页面中展示了多个 3D 模型（复古电脑、电话等），这些模型会随滚动位置进行切换和变换，配合体积雾和动态光照营造氛围感。

**实现原理：**

```
技术链路：
1. GLTF/GLB 模型加载 → Three.js GLTFLoader
2. WebP 纹理贴图 → 预烘焙的纹理（computer.webp, group_1x1.webp 等）
3. 场景切换 → 滚动进度驱动的模型淡入淡出
4. 体积雾 → Three.js FogExp2 + 自定义 Shader
5. 动态光照 → 点光源 + 环境光随滚动变化
```

**核心代码示例：**

```tsx
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function SceneModel({ url, scrollProgress }) {
  const { scene } = useGLTF(url);
  const groupRef = useRef();

  // 设置模型材质
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.envMapIntensity = 0.5;
        child.material.needsUpdate = true;
      }
    });
  }, [scene]);

  useFrame(() => {
    const t = scrollProgress.current;

    // 模型入场动画
    groupRef.current.position.x = THREE.MathUtils.lerp(-3, 0, Math.min(t * 4, 1));
    groupRef.current.rotation.y = THREE.MathUtils.lerp(-0.3, 0, Math.min(t * 4, 1));

    // 模型悬浮微动
    groupRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.05;
  });

  return <primitive ref={groupRef} object={scene} />;
}

// 体积雾效果
function VolumetricFog({ density }) {
  const fogRef = useRef();

  useFrame(() => {
    fogRef.current.density = density;
  });

  return <fogExp2 ref={fogRef} attach="fog" color="#000000" />;
}
```

---

### 交互 7：导航与页面过渡

**效果描述：**
- 顶部固定导航栏，Logo 在左，汉堡菜单在右
- 点击汉堡菜单展开全屏导航
- 导航项点击后平滑滚动到对应区域
- 页面区域切换时有淡入淡出过渡效果

**实现原理：**

```
技术链路：
1. 固定定位导航栏 → z-index 最高层
2. 汉堡菜单 → CSS transform 全屏展开
3. Lenis.scrollTo() → 平滑滚动到目标区域
4. IntersectionObserver → 检测当前可见区域更新导航状态
```

**核心代码示例：**

```tsx
function Navigation({ lenis }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // 监听滚动位置更新活跃导航项
  useEffect(() => {
    const sections = ['home', 'work', 'about', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el && lenis) {
      lenis.scrollTo(el, { offset: 0, duration: 1.5 });
    }
    setIsOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center p-6">
        <button onClick={() => scrollTo('home')} className="logo">
          SHADER
        </button>
        <button onClick={() => setIsOpen(!isOpen)} className="hamburger">
          {isOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* 全屏导航菜单 */}
      <div className={`fullscreen-menu ${isOpen ? 'open' : ''}`}>
        {['home', 'work', 'about', 'contact'].map(section => (
          <button
            key={section}
            onClick={() => scrollTo(section)}
            className={activeSection === section ? 'active' : ''}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>
    </>
  );
}
```

```css
/* 全屏菜单动画 */
.fullscreen-menu {
  position: fixed;
  inset: 0;
  z-index: 90;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.5s ease;
}
.fullscreen-menu.open {
  opacity: 1;
  pointer-events: auto;
}
.fullscreen-menu button {
  font-size: 3rem;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.4s ease;
}
.fullscreen-menu.open button {
  transform: translateY(0);
  opacity: 1;
}
/* 逐项延迟入场 */
.fullscreen-menu.open button:nth-child(1) { transition-delay: 0.1s; }
.fullscreen-menu.open button:nth-child(2) { transition-delay: 0.2s; }
.fullscreen-menu.open button:nth-child(3) { transition-delay: 0.3s; }
.fullscreen-menu.open button:nth-child(4) { transition-delay: 0.4s; }
```

---

## 四、从零搭建复刻指南

### 4.1 项目初始化

```bash
# 创建 Next.js 项目
npx create-next-app@latest shader-clone --typescript --tailwind --app

# 安装 3D 相关依赖
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing

# 安装滚动和动画依赖
npm install lenis gsap

# 安装视频播放
npm install hls.js @mux/mux-player

# 安装字体（可选，使用 Google Fonts 或自托管）
```

### 4.2 项目结构

```
shader-clone/
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
│   ├── textures/           # 纹理贴图 (.webp)
│   │   └── rgba_noise.png  # 噪声纹理
│   └── fonts/              # 字体文件
└── package.json
```

### 4.3 核心实现步骤

#### Step 1：搭建 Lenis 平滑滚动 + R3F Canvas

```tsx
// app/layout.tsx
import { LenisProvider } from '@/components/providers/LenisProvider';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body className="bg-black overflow-hidden">
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
```

```tsx
// app/page.tsx
'use client';
import { Canvas } from '@react-three/fiber';
import { Scene } from '@/components/three/Scene';
import { BootScreen } from '@/components/ui/BootScreen';
import { Navigation } from '@/components/ui/Navigation';
import { Hero } from '@/components/ui/Hero';
import { WorkCarousel } from '@/components/ui/WorkCarousel';
import { About } from '@/components/ui/About';
import { Contact } from '@/components/ui/Contact';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {/* 启动加载画面 */}
      <BootScreen onComplete={() => setIsLoaded(true)} />

      {/* 滚动内容层 */}
      <div id="scroll-container" className="fixed inset-0 z-50 overflow-y-auto">
        <Navigation />
        <Hero />
        <WorkCarousel />
        <About />
        <Contact />
        {/* 撑开滚动高度 */}
        <div className="h-[400vh]" />
      </div>

      {/* WebGL 3D 层 */}
      <div className="fixed inset-0 z-40 pointer-events-none">
        <Canvas
          gl={{ antialias: true, alpha: true }}
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 2]}
        >
          <Scene isLoaded={isLoaded} />
        </Canvas>
      </div>
    </>
  );
}
```

#### Step 2：实现启动加载画面

```tsx
// components/ui/BootScreen.tsx
'use client';
import { useState, useEffect } from 'react';

export function BootScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(onComplete, 800);
          }, 300);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[200] flex flex-col items-center justify-center
      bg-[#1a1040] transition-opacity duration-700 ${isFading ? 'opacity-0' : 'opacity-100'}`}>

      {/* CRT 扫描线叠加 */}
      <div className="absolute inset-0 pointer-events-none crt-scanlines" />

      {/* Logo */}
      <div className="mb-8 chromatic-text text-6xl font-bold tracking-wider text-white">
        SHADER
      </div>

      {/* 版本信息 */}
      <div className="text-white/60 text-sm mb-12 font-mono">
        Shader Development Studio / Version 1.02
      </div>

      {/* 进度条 */}
      <div className="flex gap-1">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={`w-5 h-3 border border-white/30 transition-all duration-200
              ${i / 20 * 100 <= progress ? 'bg-white/90 shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'bg-white/10'}`}
          />
        ))}
      </div>

      {/* 版权信息 */}
      <div className="absolute bottom-8 text-white/40 text-xs font-mono">
        Copyright (c) Shader Sweden AB, 2026. / All Rights Reserved.
      </div>
    </div>
  );
}
```

#### Step 3：实现 3D 场景 + 后处理

```tsx
// components/three/Scene.tsx
'use client';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { ComputerModel } from './ComputerModel';
import { SpringMouseProvider } from './SpringMouse';

export function Scene({ isLoaded }) {
  return (
    <>
      <SpringMouseProvider>
      {/* 环境光 */}
      <ambientLight intensity={0.2} />
      {/* 主光源（从屏幕发出） */}
      <pointLight position={[0, 0, 2]} intensity={2} color="#fffbe6" distance={10} />

      {/* 3D 模型 */}
      {isLoaded && <ComputerModel />}

      {/* 体积雾 */}
      <fogExp2 attach="fog" args={['#000000', 0.08]} />
      </SpringMouseProvider>

      {/* 后处理 */}
      <EffectComposer>
        <Bloom
          intensity={0.5}
          luminanceThreshold={0.6}
          luminanceSmoothing={0.9}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.002, 0.002]}
        />
      </EffectComposer>
    </>
  );
}
```

#### Step 4：实现滚动驱动动画

```tsx
// components/three/ComputerModel.tsx
'use client';
import { useRef, useContext } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { ScrollContext } from './SpringMouse';

export function ComputerModel() {
  const ref = useRef();
  const { scrollProgress } = useContext(ScrollContext);

  useFrame(() => {
    const t = scrollProgress;

    // 随滚动旋转和位移
    ref.current.rotation.y = t * Math.PI * 0.3;
    ref.current.position.y = -t * 2;
    ref.current.scale.setScalar(1 - t * 0.2);

    // 微小悬浮动画
    ref.current.position.y += Math.sin(Date.now() * 0.001) * 0.02;
  });

  return (
    <group ref={ref}>
      {/* 替换为实际的 GLTF 模型 */}
      <mesh>
        <boxGeometry args={[2, 1.5, 1.5]} />
        <meshStandardMaterial color="#c4b5a0" />
      </mesh>
      {/* 屏幕发光 */}
      <mesh position={[0, 0.3, 0.76]}>
        <planeGeometry args={[1.6, 1]} />
        <meshBasicMaterial color="#fffbe6" />
      </mesh>
    </group>
  );
}
```

### 4.4 性能优化建议

| 优化项 | 方法 |
|--------|------|
| **3D 模型压缩** | 使用 `gltf-transform` 压缩 GLB，Draco 压缩几何体 |
| **纹理优化** | WebP 格式 + 合并纹理图集 + 噪声纹理复用 |
| **代码分割** | Next.js dynamic import 延迟加载 Three.js 组件 |
| **按需渲染** | 使用 `frameloop="demand"` 在不可见时暂停渲染 |
| **LOD** | 远处模型使用低精度版本 |
| **移动端适配** | 降低 DPR、减少后处理效果、简化几何体 |
| **prefers-reduced-motion** | 检测用户偏好，减少动画 |
| **视频优化** | Mux 自适应码率 + 预加载策略 |
| **分析服务** | 自托管分析服务减少第三方依赖 |

```tsx
// 性能优化示例
const Scene = lazy(() => import('@/components/three/Scene'));

// 检测用户动画偏好
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Canvas 配置
<Canvas
  dpr={[1, prefersReducedMotion ? 1 : 2]}
  frameloop="demand"
  gl={{ powerPreference: 'high-performance', antialias: !prefersReducedMotion }}
>
```

---

## 五、交互总结矩阵

| # | 交互方式 | 核心技术 | 复刻难度 | 性能影响 |
|---|----------|----------|----------|----------|
| 1 | CRT 启动加载 | CSS 动画 + JS 进度控制 | ⭐⭐ 低 | 低 |
| 2 | 鼠标视差追踪 | Spring Physics + R3F useFrame | ⭐⭐⭐ 中 | 低 |
| 3 | 滚动驱动 3D 动画 | Lenis + 滚动进度映射 | ⭐⭐⭐⭐ 高 | 中 |
| 4 | 视频轮播 | Mux HLS + HLS.js | ⭐⭐⭐ 中 | 高 |
| 5 | 后处理特效 | GLSL Shader + EffectComposer | ⭐⭐⭐⭐ 高 | 高 |
| 6 | 3D 模型展示切换 | GLTFLoader + 滚动驱动 | ⭐⭐⭐⭐ 高 | 高 |
| 7 | 导航过渡 | CSS Transition + Lenis scrollTo | ⭐⭐ 低 | 低 |

---

## 六、关键学习资源

| 资源 | 链接 |
|------|------|
| Three.js 官方文档 | https://threejs.org/docs/ |
| React Three Fiber | https://docs.pmnd.rs/react-three-fiber |
| R3F Drei 工具库 | https://docs.pmnd.rs/react-three-drei |
| R3F Postprocessing | https://docs.pmnd.rs/react-three-postprocessing |
| Lenis 平滑滚动 | https://lenis.darkroom.engineering/ |
| Mux 视频平台 | https://www.mux.com/ |
| HLS.js | https://github.com/video-dev/hls.js/ |
| GLSL Shader 教程 | https://thebookofshaders.com/ |

---

> **总结**：Shader.se 是一个技术含量极高的创意工作室网站，其核心交互围绕 **Three.js WebGPU 3D 渲染** 和 **滚动驱动动画** 展开。最值得学习的是其将 HTML 无障碍层与 WebGL 视觉层分离的架构设计，以及通过 Lenis 平滑滚动 + 弹簧物理鼠标追踪实现的丝滑交互体验。复刻该网站需要扎实的 Three.js/R3F 基础和 GLSL Shader 编写能力。
