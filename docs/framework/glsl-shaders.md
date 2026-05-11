# GLSL Shaders 技术知识点文档

## 1. 技术介绍

### 1.1 什么是 GLSL Shaders

GLSL（OpenGL Shading Language）是一种专门用于在 GPU（图形处理器）上编写着色器程序的高级编程语言。着色器是 WebGL 和 OpenGL 渲染管线的核心部分，用于控制图形渲染的各个阶段。

在现代 3D 图形编程中，着色器负责：
- 将 3D 顶点转换到屏幕空间（顶点着色器）
- 计算每个像素的颜色和光照（片段着色器）
- 执行其他高级图形效果（几何着色器、细分着色器等）

### 1.2 核心特性

- **高性能**：在 GPU 上并行执行，比 CPU 快得多
- **灵活性**：可以自定义渲染流程和视觉效果
- **跨平台**：支持 WebGL、OpenGL、Vulkan 等图形 API
- **数学库**：内置丰富的数学函数和数据类型
- **可组合**：可以与 3D 引擎和图形库配合使用

### 1.3 适用场景

- **3D 模型渲染**：物体表面材质、光照、纹理映射
- **实时特效**：火焰、水、烟雾、粒子系统
- **后处理效果**：模糊、发光、色差、像素化、Vignette
- **程序化生成**：程序化纹理、地形、几何形状
- **数据可视化**：在 GPU 上处理和显示大数据
- **游戏开发**：高级渲染效果和视觉优化
- **创意编程**：生成艺术、交互式视觉效果

### 1.4 不适用场景

- **通用计算**：虽然可以用于 GPU 计算，但 CUDA 或 OpenCL 更适合
- **需要精确控制的时序逻辑**：GPU 是并行执行的，不适合串行逻辑
- **处理非常小的数据量**：在这种情况下，CPU 反而更高效

## 2. 快速入门

### 2.1 基础概念

在学习 GLSL 之前，需要了解几个基本概念：

1. **着色器阶段**：顶点着色器 → 片段着色器
2. **数据传递**：使用 attributes、varying、uniforms 传递数据
3. **渲染管线**：了解图形渲染的基本流程

### 2.2 第一个着色器程序

让我们从最简单的纯色着色器开始，这个着色器会将物体渲染为红色。

```glsl
// 顶点着色器 (vertex shader)
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
```

```glsl
// 片段着色器 (fragment shader)
varying vec2 vUv;

void main() {
  // 简单的红色
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
```

### 2.3 在 React Three Fiber 中使用

现在让我们在 React Three Fiber 中使用这个着色器。

```jsx
import React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// 着色器材质
const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;

void main() {
  // 使用 UV 坐标创建渐变色
  gl_FragColor = vec4(vUv.x, vUv.y, 0.5, 1.0);
}
`;

function ShaderBox() {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

function App() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <ShaderBox />
      <OrbitControls />
    </Canvas>
  );
}

export default App;
```

### 2.4 添加动画

让我们在着色器中添加一些动态效果。

```glsl
// 片段着色器
varying vec2 vUv;
uniform float uTime;

void main() {
  // 随时间变化的色彩
  float red = sin(uTime * 2.0) * 0.5 + 0.5;
  float green = cos(uTime * 3.0) * 0.5 + 0.5;
  float blue = sin(uTime * 4.0 + vUv.x * 3.14159) * 0.5 + 0.5;
  
  gl_FragColor = vec4(red, green, blue, 1.0);
}
```

```jsx
// 更新 ShaderBox 组件
import { useRef } from 'react';

function ShaderBox() {
  const meshRef = useRef();
  
  useFrame((state) => {
    meshRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
  });
  
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 }
        }}
      />
    </mesh>
  );
}
```

## 3. 基础使用

### 3.1 数据类型

GLSL 中有很多内置的数据类型，下面是最常用的几种：

```glsl
// 基础类型
float f = 3.14;       // 浮点数
int i = 5;           // 整数
bool b = true;       // 布尔值

// 向量类型
vec2 v2 = vec2(1.0, 2.0);              // 2分量向量
vec3 v3 = vec3(1.0, 2.0, 3.0);        // 3分量向量
vec4 v4 = vec4(1.0, 2.0, 3.0, 4.0);   // 4分量向量

// 构造向量的快捷方式
vec3 v3_a = vec3(v2, 3.0);     // vec2 加一个值
vec4 v4_a = vec4(v3, 4.0);     // vec3 加一个值

// 矩阵类型
mat2 m2 = mat2(1.0, 2.0, 3.0, 4.0);    // 2x2矩阵
mat3 m3 = mat3(1.0);                   // 3x3单位矩阵
mat4 m4 = mat4(1.0);                   // 4x4单位矩阵
```

### 3.2 向量操作

```glsl
vec3 a = vec3(1.0, 2.0, 3.0);
vec3 b = vec3(4.0, 5.0, 6.0);

// 基本运算
vec3 sum = a + b;               // 分量相加
vec3 diff = a - b;              // 分量相减
vec3 product = a * b;           // 分量相乘
vec3 divided = a / b;           // 分量相除

// 标量运算
vec3 scaled = a * 2.0;         // 每个分量都乘2

// 向量运算
float dotProduct = dot(a, b);  // 点积
vec3 crossProduct = cross(a, b); // 叉积
float length = length(a);      // 向量长度
vec3 normalized = normalize(a); // 归一化

// 访问分量
float x = a.x;   // a.r 或 a.s 也可以
float y = a.y;   // a.g 或 a.t 也可以
float z = a.z;   // a.b 或 a.p 也可以

// 混合分量
vec3 mixed = vec3(a.x, b.y, a.z);

// 分量排序
vec3 reordered = a.zyx;
```

### 3.3 内置函数

```glsl
// 数学函数
float a = sin(2.0);     // 正弦
float b = cos(3.0);     // 余弦
float c = tan(1.0);     // 正切
float d = atan(2.0, 3.0); // 反正切
float e = sqrt(4.0);    // 平方根
float f = pow(2.0, 3.0); // 幂运算
float g = abs(-5.0);    // 绝对值
float h = fract(3.14);  // 取小数部分 (0.14)
float i = floor(3.14);  // 向下取整 (3.0)
float j = ceil(3.14);   // 向上取整 (4.0)
float k = mod(7.0, 3.0); // 取余 (1.0)

// 插值函数
float x = mix(0.0, 10.0, 0.5);  // 线性插值 (5.0)
float y = smoothstep(0.0, 1.0, 0.5);  // 平滑插值

// 比较和范围限制
float p = min(5.0, 3.0); // 最小值 (3.0)
float q = max(5.0, 3.0); // 最大值 (5.0)
float r = clamp(2.0, 0.0, 1.0); // 限制范围 (1.0)

// 几何函数
vec3 v1 = normalize(vec3(1.0, 2.0, 3.0)); // 归一化
float dist = distance(vec3(0.0), vec3(1.0, 1.0, 1.0)); // 距离
```

### 3.4 UV 坐标

UV 坐标用于在 2D 纹理上查找像素，是纹理映射的核心概念。

```glsl
varying vec2 vUv;

void main() {
  // 水平渐变
  vec3 color = vec3(vUv.x, 0.0, 0.0);
  
  // 垂直渐变
  // vec3 color = vec3(0.0, vUv.y, 0.0);
  
  // 对角渐变
  // vec3 color = vec3(vUv.x, vUv.y, 0.0);
  
  gl_FragColor = vec4(color, 1.0);
}
```

### 3.5 使用纹理

```glsl
varying vec2 vUv;
uniform sampler2D uTexture;

void main() {
  // 从纹理采样颜色
  vec4 texColor = texture2D(uTexture, vUv);
  
  // 使用纹理颜色
  gl_FragColor = texColor;
}
```

```jsx
// 在 React Three Fiber 中使用纹理
import { useTexture } from '@react-three/drei';

function TexturedBox() {
  const texture = useTexture('/path/to/texture.jpg');
  
  const fragmentShader = `
    varying vec2 vUv;
    uniform sampler2D uTexture;
    
    void main() {
      vec4 texColor = texture2D(uTexture, vUv);
      gl_FragColor = texColor;
    }
  `;
  
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTexture: { value: texture }
        }}
      />
    </mesh>
  );
}
```

### 3.6 时间与动画

```glsl
varying vec2 vUv;
uniform float uTime;

void main() {
  // 波浪效果
  float wave = sin(vUv.x * 10.0 + uTime) * 0.1;
  vec3 color = vec3(0.0, 0.5, 0.5 + wave);
  
  gl_FragColor = vec4(color, 1.0);
}
```

### 3.7 颜色空间

```glsl
void main() {
  // RGB 颜色
  vec3 red = vec3(1.0, 0.0, 0.0);
  vec3 green = vec3(0.0, 1.0, 0.0);
  vec3 blue = vec3(0.0, 0.0, 1.0);
  
  // 混合颜色
  vec3 purple = mix(red, blue, 0.5);
  
  // 亮度调整
  vec3 brightRed = red * 1.5;
  vec3 darkRed = red * 0.5;
  
  gl_FragColor = vec4(red, 1.0);
}
```

## 4. 进阶使用

### 4.1 噪声函数

噪声函数是生成自然、有机效果的关键。让我们实现一个简单的噪声函数。

```glsl
// 伪随机函数
float random(vec2 st) {
  return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453123);
}

// 简单的噪点
varying vec2 vUv;
uniform float uTime;

void main() {
  // 随机值
  float rnd = random(vUv);
  
  // 动画噪点
  // float rnd = random(vUv + uTime * 0.1);
  
  gl_FragColor = vec4(vec3(rnd), 1.0);
}
```

### 4.2 平滑噪声

```glsl
// 二维随机函数
vec2 random2(vec2 st) {
  st = vec2(
    dot(st, vec2(127.1, 311.7)),
    dot(st, vec2(269.5, 183.3))
  );
  return -1.0 + 2.0 * fract(sin(st) * 43758.5453123);
}

// 2D 平滑噪声 (Perlin 噪声)
float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  
  vec2 u = f * f * (3.0 - 2.0 * f);
  
  return mix(
    mix(dot(random2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
        dot(random2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
    mix(dot(random2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
        dot(random2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
    u.y);
}

// 使用噪声
varying vec2 vUv;
uniform float uTime;

void main() {
  vec2 st = vUv * 10.0; // 缩放噪声
  
  // 噪声值
  float n = noise(st + uTime * 0.2);
  
  // 可视化噪声
  vec3 color = vec3(n);
  
  gl_FragColor = vec4(color, 1.0);
}
```

### 4.3 分形噪声 (FBM)

```glsl
// 分形布朗运动噪声
float fbm(vec2 st) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  
  for(int i = 0; i < 6; i++) {
    value += amplitude * noise(st * frequency);
    frequency *= 2.0;
    amplitude *= 0.5;
  }
  
  return value;
}

// 使用 FBM 创建云状效果
varying vec2 vUv;
uniform float uTime;

void main() {
  vec2 st = vUv * 8.0;
  
  // FBM 噪声
  float n = fbm(st + uTime * 0.1);
  
  // 彩色噪声
  vec3 color = vec3(n);
  color.r = fbm(st + vec2(0.0, 0.0));
  color.g = fbm(st + vec2(1.0, 0.0));
  color.b = fbm(st + vec2(0.0, 1.0));
  
  gl_FragColor = vec4(color, 1.0);
}
```

### 4.4 Voronoi 图

```glsl
// Voronoi 图算法
vec2 voronoi(vec2 st) {
  vec2 i_st = floor(st);
  vec2 f_st = fract(st);
  
  float minDist = 1.0;
  vec2 res = vec2(0.0);
  
  for(int j = -1; j <= 1; j++) {
    for(int i = -1; i <= 1; i++) {
      vec2 neighbor = vec2(float(i), float(j));
      vec2 point = random2(i_st + neighbor);
      point = 0.5 + 0.5 * sin(uTime + 6.2831 * point);
      
      vec2 diff = neighbor + point - f_st;
      float dist = length(diff);
      
      if(dist < minDist) {
        minDist = dist;
        res = point;
      }
    }
  }
  
  return vec2(minDist, 0.0);
}

// 使用 Voronoi 图
varying vec2 vUv;
uniform float uTime;

void main() {
  vec2 st = vUv * 10.0;
  vec2 vor = voronoi(st);
  
  // 使用距离作为颜色
  vec3 color = vec3(vor.x);
  
  gl_FragColor = vec4(color, 1.0);
}
```

### 4.5 后处理效果

让我们实现一个简单的模糊和发光效果。

```glsl
// 片段着色器 - 模糊效果
varying vec2 vUv;
uniform sampler2D uTexture;
uniform vec2 uResolution;

void main() {
  vec2 texelSize = 1.0 / uResolution;
  vec4 color = vec4(0.0);
  
  // 3x3 卷积核模糊
  float kernel[9];
  kernel[6] = 1.0; kernel[7] = 2.0; kernel[8] = 1.0;
  kernel[3] = 2.0; kernel[4] = 4.0; kernel[5] = 2.0;
  kernel[0] = 1.0; kernel[1] = 2.0; kernel[2] = 1.0;
  
  float kernelSum = 16.0;
  
  for(int i = -1; i <= 1; i++) {
    for(int j = -1; j <= 1; j++) {
      vec2 offset = vec2(float(i), float(j)) * texelSize;
      int idx = (i + 1) * 3 + (j + 1);
      color += texture2D(uTexture, vUv + offset) * kernel[idx] / kernelSum;
    }
  }
  
  gl_FragColor = color;
}
```

### 4.6 高级变换

```glsl
// 旋转矩阵
mat2 rotate2D(float angle) {
  return mat2(
    cos(angle), -sin(angle),
    sin(angle), cos(angle)
  );
}

// 缩放矩阵
mat2 scale2D(float scale) {
  return mat2(
    scale, 0.0,
    0.0, scale
  );
}

// 使用变换
varying vec2 vUv;
uniform float uTime;

void main() {
  vec2 st = vUv;
  
  // 中心化坐标
  st = st * 2.0 - 1.0;
  
  // 旋转
  st = rotate2D(uTime) * st;
  
  // 缩放
  st = st * (1.0 + 0.5 * sin(uTime * 3.0));
  
  // 使用变换后的坐标绘制图形
  float d = length(st);
  vec3 color = vec3(smoothstep(0.4, 0.41, d) - smoothstep(0.5, 0.51, d));
  
  gl_FragColor = vec4(color, 1.0);
}
```

## 5. 实际应用

### 5.1 程序化火焰效果

```glsl
varying vec2 vUv;
uniform float uTime;

void main() {
  vec2 st = vUv;
  
  // 垂直拉伸和翻转
  st.y = 1.0 - st.y;
  st.y *= 2.0;
  
  // 添加噪声
  float n = fbm(st * 2.0 + vec2(0.0, uTime * -0.3));
  n = fbm(st * 4.0 + n + vec2(0.0, uTime * -0.2));
  
  // 火焰形状
  float flame = 1.0 - smoothstep(0.0, 0.6, st.y - n * 0.5);
  flame *= smoothstep(0.4, 0.0, distance(st.x, 0.5));
  
  // 火焰颜色
  vec3 fireColor = mix(
    vec3(1.0, 0.3, 0.0),  // 红色核心
    vec3(1.0, 0.8, 0.0),  // 橙色边缘
    st.y
  );
  
  fireColor = mix(
    fireColor,
    vec3(1.0),
    smoothstep(0.8, 1.0, flame)
  );
  
  gl_FragColor = vec4(fireColor * flame, flame);
}
```

### 5.2 水波纹效果

```glsl
varying vec2 vUv;
uniform float uTime;
uniform vec2 uResolution;

void main() {
  vec2 st = vUv;
  
  // 多个波纹
  float wave = 0.0;
  for(int i = 0; i < 3; i++) {
    float freq = 3.0 + float(i) * 2.0;
    float phase = uTime * (0.5 + float(i) * 0.2);
    vec2 center = vec2(0.3 + float(i) * 0.2, 0.7 - float(i) * 0.1);
    
    float dist = distance(st, center);
    wave += sin(dist * freq + phase) * 0.1 / (1.0 + dist * 2.0);
  }
  
  // 扰动 UV
  vec2 uv = st + vec2(wave, wave * 0.7);
  
  // 水的颜色
  vec3 waterColor = mix(
    vec3(0.0, 0.2, 0.4),  // 深水
    vec3(0.1, 0.5, 0.8),  // 浅水
    uv.y
  );
  
  // 高光
  float highlight = pow(sin(uv.x * 20.0 + uTime * 2.0) * 0.5 + 0.5, 20.0);
  waterColor += vec3(highlight * 0.5);
  
  gl_FragColor = vec4(waterColor, 1.0);
}
```

### 5.3 粒子系统

```glsl
varying vec2 vUv;
uniform float uTime;
uniform vec2 uResolution;

// 随机函数
float random(float n) {
  return fract(sin(n) * 43758.5453123);
}

// 粒子绘制
float circle(vec2 st, vec2 center, float radius) {
  float d = distance(st, center);
  return smoothstep(radius, radius * 0.9, d);
}

void main() {
  vec2 st = vUv;
  vec3 color = vec3(0.0);
  
  // 绘制多个粒子
  for(int i = 0; i < 30; i++) {
    // 粒子位置（随时间变化）
    float angle = random(float(i)) * 6.28318;
    float speed = 0.5 + random(float(i) * 100.0) * 1.0;
    float life = mod(uTime * speed + random(float(i) * 200.0), 3.0);
    float x = 0.5 + sin(angle + uTime * 0.3 * (random(float(i) * 300.0) - 0.5)) * life * 0.4;
    float y = 0.5 + life * 0.4;
    
    // 粒子大小（随生命周期变化）
    float radius = 0.02 * (1.0 - life / 3.0);
    
    // 粒子颜色（随生命周期变化）
    vec3 particleColor = vec3(
      0.5 + sin(uTime * 2.0 + float(i)) * 0.5,
      0.3 + cos(uTime * 3.0 + float(i) * 0.5) * 0.3,
      1.0
    );
    
    // 绘制粒子
    float particle = circle(st, vec2(x, y), radius);
    color += particleColor * particle;
  }
  
  gl_FragColor = vec4(color, 1.0);
}
```

### 5.4 3D 体积云

```glsl
varying vec2 vUv;
uniform float uTime;
uniform vec3 uCameraPos;
uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;

// 体积云噪声
float cloudDensity(vec3 p) {
  p.y *= 0.5; // 压缩高度
  p += fbm(p * 0.1 + uTime * 0.02) * 2.0;
  return fbm(p * 0.2);
}

void main() {
  vec2 st = vUv;
  
  // 简单的云层效果
  vec2 clouds = st * 3.0 + vec2(uTime * 0.1, uTime * 0.05);
  float cloudsNoise = fbm(clouds);
  cloudsNoise = pow(cloudsNoise, 3.0);
  
  // 天空颜色
  vec3 skyColor = mix(
    vec3(0.4, 0.6, 0.8),  // 天空蓝
    vec3(0.8, 0.8, 0.6),  // 日落黄
    smoothstep(0.5, 0.0, st.y)
  );
  
  // 云颜色
  vec3 cloudColor = vec3(1.0, 1.0, 1.0);
  
  // 混合天空和云
  vec3 color = mix(skyColor, cloudColor, cloudsNoise);
  
  gl_FragColor = vec4(color, 1.0);
}
```

## 6. 常见问题

### 6.1 性能问题

**问题：着色器运行太慢，导致 FPS 下降**

解决方案：
1. 减少循环次数
2. 简化数学计算
3. 使用低精度数据类型
4. 减少噪声迭代
5. 使用 mipmap 纹理

```glsl
// 优化前
float fbm(vec2 st) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  
  for(int i = 0; i < 6; i++) {
    value += amplitude * noise(st * frequency);
    frequency *= 2.0;
    amplitude *= 0.5;
  }
  
  return value;
}

// 优化后
float fbm(vec2 st) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  
  // 减少迭代次数
  for(int i = 0; i < 4; i++) {
    value += amplitude * noise(st * frequency);
    frequency *= 2.0;
    amplitude *= 0.5;
  }
  
  return value;
}
```

### 6.2 调试问题

**问题：如何调试着色器？**

解决方案：
1. 使用简单的颜色输出变量值
2. 分阶段测试复杂效果
3. 使用浏览器开发者工具（WebGL Inspector）
4. 检查是否有编译错误

```glsl
// 调试示例 - 显示变量值
varying vec2 vUv;

void main() {
  // 直接用颜色显示某个值
  float value = length(vUv - 0.5); // 中心距离
  vec3 color = vec3(value);
  
  // 如果值太小，放大看看
  // color *= 10.0;
  
  // 如果值太大，缩小看看
  // color *= 0.1;
  
  gl_FragColor = vec4(color, 1.0);
}
```

### 6.3 精度问题

**问题：在不同设备上效果不一致**

解决方案：
1. 显式声明精度
2. 避免特别大或特别小的数值
3. 在关键计算前归一化值

```glsl
precision highp float; // 高精度
precision mediump float; // 中等精度
precision lowp float; // 低精度

// 推荐
precision mediump float;
```

### 6.4 兼容性问题

**问题：代码在某些浏览器或设备上不工作**

解决方案：
1. 检查 WebGL 支持
2. 提供降级方案
3. 避免使用高级特性（除非必要）

## 7. 性能优化

### 7.1 代码优化

```glsl
// 1. 使用内置函数而不是自定义实现
// 不好
float fastInvSqrt(float x) {
  float y = x;
  float x2 = y * 0.5;
  int i = int(floatBitsToInt(y));
  i = 0x5f3759df - (i >> 1);
  y = intBitsToFloat(i);
  return y;
}

// 好
float invSqrt = inversesqrt(x);

// 2. 合并计算
// 不好
vec3 a = vec3(1.0);
vec3 b = vec3(2.0);
vec3 c = a + b;
vec3 d = c * 2.0;

// 好
vec3 a = vec3(1.0);
vec3 b = vec3(2.0);
vec3 d = (a + b) * 2.0;

// 3. 预计算
// 不好
for(int i = 0; i < 100; i++) {
  float angle = float(i) * 2.0 * 3.14159;
  // ...
}

// 好
float twoPi = 2.0 * 3.14159;
for(int i = 0; i < 100; i++) {
  float angle = float(i) * twoPi;
  // ...
}
```

### 7.2 循环优化

```glsl
// 1. 减少循环迭代次数
// 2. 将计算移动到循环外

// 优化前
void main() {
  float total = 0.0;
  for(int i = 0; i < 100; i++) {
    float x = vUv.x * 2.0;
    float y = vUv.y * 3.0;
    total += sin(float(i) * x + cos(float(i) * y));
  }
  // ...
}

// 优化后
void main() {
  float total = 0.0;
  float x = vUv.x * 2.0; // 移到循环外
  float y = vUv.y * 3.0; // 移到循环外
  for(int i = 0; i < 50; i++) { // 减少迭代
    float fi = float(i);
    total += sin(fi * x + cos(fi * y));
  }
  // ...
}
```

### 7.3 渲染优化

1. 使用 LOD（Level of Detail）
2. 减少渲染的三角形数量
3. 使用纹理代替复杂的着色器计算
4. 使用 Early-Z 优化
5. 渲染到纹理然后复用

## 8. 学习资源

### 8.1 官方资源

- **OpenGL 官方参考**：[https://www.khronos.org/registry/OpenGL-Refpages/](https://www.khronos.org/registry/OpenGL-Refpages/)
- **WebGL 规范**：[https://www.khronos.org/webgl/](https://www.khronos.org/webgl/)
- **GLSL 语言规范**：[https://www.khronos.org/registry/OpenGL/specs/gl/](https://www.khronos.org/registry/OpenGL/specs/gl/)

### 8.2 在线教程

- **The Book of Shaders**：[https://thebookofshaders.com/](https://thebookofshaders.com/) - 最好的 GLSL 入门教程
- **Shadertoy**：[https://www.shadertoy.com/](https://www.shadertoy.com/) - 大量着色器示例
- **GLSL Sandbox**：[http://glslsandbox.com/](http://glslsandbox.com/) - 在线实时渲染
- **Learn OpenGL**：[https://learnopengl.com/](https://learnopengl.com/) - 完整的 OpenGL 教程

### 8.3 推荐书籍

- 《OpenGL Shading Language》
- 《Real-Time Rendering》
- 《GPU Gems》系列

### 8.4 视频教程

- YouTube 上的 The Art of Code 频道
- Udemy 上的完整 GLSL 课程
- Coursera 上的交互式计算机图形学

## 9. 最佳实践

### 9.1 代码风格

- 使用有意义的变量名
- 添加清晰的注释
- 适当使用空行分隔代码段
- 保持一致的缩进

```glsl
// 好的代码风格
varying vec2 vUv;
uniform float uTime;

void main() {
  vec2 st = vUv * 2.0 - 1.0; // 中心化坐标
  
  // 计算距离
  float dist = length(st);
  
  // 颜色随距离变化
  vec3 color = vec3(0.0);
  color.r = sin(dist * 10.0 + uTime) * 0.5 + 0.5;
  color.g = cos(dist * 8.0 - uTime) * 0.5 + 0.5;
  color.b = sin(dist * 6.0 + uTime * 0.5) * 0.5 + 0.5;
  
  gl_FragColor = vec4(color, 1.0);
}
```

### 9.2 性能优先

- 先确保效果正确，再优化性能
- 测试不同设备的性能
- 提供不同质量的选项

### 9.3 调试和测试

- 分步构建效果，而不是一次性完成
- 使用简单的测试用例
- 在多个浏览器和设备上测试

### 9.4 学习策略

1. 从简单的颜色和形状开始
2. 学习噪声和随机函数
3. 理解程序化纹理
4. 尝试复制现有效果
5. 然后开始创新自己的效果

## 10. 总结

GLSL 着色器是现代 3D 图形编程的核心，为我们提供了强大的视觉效果创作能力。虽然学习曲线较陡，但掌握了基础知识后，你就能创建出各种令人惊叹的视觉效果。

关键要点：
1. **从基础开始**：理解顶点着色器和片段着色器的基本作用
2. **数学很重要**：向量、矩阵、噪声函数都是必备知识
3. **多练习**：尝试复现现有效果，然后进行创新
4. **性能意识**：始终关注性能，优化循环和计算
5. **学习现有资源**：Shadertoy、The Book of Shaders 等都是极好的学习材料

希望这份文档能够帮助你快速入门和掌握 GLSL 着色器编程，开始你的 GPU 编程之旅！

