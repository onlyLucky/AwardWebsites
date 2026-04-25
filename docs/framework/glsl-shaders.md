# GLSL Shaders 技术知识点文档

## 1. 技术介绍

GLSL (OpenGL Shading Language) 是一种专门用于编写着色器程序的高级语言，主要用于 GPU 渲染。在 Web 开发中，GLSL ES (OpenGL ES Shading Language) 被用于 WebGL 应用。

核心特性：
- **并行计算** - 在 GPU 上高效执行
- **图形渲染** - 处理顶点和像素
- **着色器类型** - 顶点着色器和片段着色器
- **向量和矩阵运算** - 内置丰富的数学函数
- **纹理操作** - 支持复杂的纹理处理
- **跨平台** - 可在不同设备上运行

## 2. 使用场景

### 适用场景
- **WebGL 应用** - 3D 场景渲染
- **数据可视化** - 复杂的数据展示
- **游戏开发** - 游戏图形效果
- **图像处理** - 实时图像处理
- **UI 效果** - 复杂的视觉效果
- **AR/VR** - 增强现实和虚拟现实

### 不适用场景
- **非图形计算** - 通用计算（可考虑 WebGPU 或 WebAssembly）
- **简单 2D 渲染** - 可能使用 Canvas 2D API 更简单
- **文本处理** - 不适合文本密集型应用

## 3. 快速入门

### 基本结构

**顶点着色器**

```glsl
// 顶点着色器
attribute vec4 a_position;
attribute vec2 a_texCoord;

uniform mat4 u_modelViewMatrix;
uniform mat4 u_projectionMatrix;

varying vec2 v_texCoord;

void main() {
  gl_Position = u_projectionMatrix * u_modelViewMatrix * a_position;
  v_texCoord = a_texCoord;
}
```

**片段着色器**

```glsl
// 片段着色器
precision mediump float;

varying vec2 v_texCoord;

uniform sampler2D u_texture;

void main() {
  gl_FragColor = texture2D(u_texture, v_texCoord);
}
```

### WebGL 中使用

```javascript
// 创建着色器
function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  
  return shader;
}

// 创建着色器程序
function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program linking error:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  
  return program;
}

// 使用着色器程序
function useProgram(gl, program) {
  gl.useProgram(program);
  // 获取 uniform 和 attribute 位置
  const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  const texCoordAttributeLocation = gl.getAttribLocation(program, "a_texCoord");
  const matrixUniformLocation = gl.getUniformLocation(program, "u_matrix");
  // ...
}
```

## 4. 核心知识点

### 4.1 数据类型

**基本类型**

| 类型 | 描述 | 示例 |
|------|------|------|
| float | 单精度浮点数 | `float x = 1.0;` |
| int | 整数 | `int i = 5;` |
| bool | 布尔值 | `bool b = true;` |

**向量类型**

| 类型 | 描述 | 示例 |
|------|------|------|
| vec2 | 2D 向量 | `vec2 v = vec2(1.0, 2.0);` |
| vec3 | 3D 向量 | `vec3 v = vec3(1.0, 2.0, 3.0);` |
| vec4 | 4D 向量 | `vec4 v = vec4(1.0, 2.0, 3.0, 1.0);` |
| ivec2/3/4 | 整数向量 | `ivec2 i = ivec2(1, 2);` |
| bvec2/3/4 | 布尔向量 | `bvec2 b = bvec2(true, false);` |

**矩阵类型**

| 类型 | 描述 | 示例 |
|------|------|------|
| mat2 | 2x2 矩阵 | `mat2 m = mat2(1.0, 0.0, 0.0, 1.0);` |
| mat3 | 3x3 矩阵 | `mat3 m = mat3(1.0);` |
| mat4 | 4x4 矩阵 | `mat4 m = mat4(1.0);` |

### 4.2 变量类型

**Attribute** - 每个顶点的数据

```glsl
attribute vec4 a_position;  // 顶点位置
attribute vec2 a_texCoord;  // 纹理坐标
attribute vec3 a_normal;    // 法向量
```

**Uniform** - 所有顶点共享的数据

```glsl
uniform mat4 u_modelViewMatrix;  // 模型视图矩阵
uniform mat4 u_projectionMatrix; // 投影矩阵
uniform float u_time;            // 时间
uniform vec2 u_resolution;       // 分辨率
```

**Varying** - 顶点着色器传递给片段着色器的数据

```glsl
// 顶点着色器
varying vec2 v_texCoord;
varying vec3 v_normal;

// 片段着色器
varying vec2 v_texCoord;
varying vec3 v_normal;
```

### 4.3 内置函数

**数学函数**

```glsl
float sin(float angle);      // 正弦
float cos(float angle);      // 余弦
float tan(float angle);      // 正切
float sqrt(float x);         // 平方根
float pow(float x, float y); // 幂
float exp(float x);          // 指数
float log(float x);          // 自然对数
float abs(float x);          // 绝对值
float sign(float x);         // 符号
float floor(float x);        // 向下取整
float ceil(float x);         // 向上取整
float fract(float x);        // 小数部分
float mod(float x, float y); // 取模
float min(float x, float y); // 最小值
float max(float x, float y); // 最大值
float clamp(float x, float minVal, float maxVal); // 限制范围
float mix(float x, float y, float a); // 线性混合
```

**向量函数**

```glsl
float length(vec2 v);        // 向量长度
float length(vec3 v);
float length(vec4 v);
vec2 normalize(vec2 v);      // 归一化
vec3 normalize(vec3 v);
vec4 normalize(vec4 v);
float dot(vec2 a, vec2 b);   // 点积
float dot(vec3 a, vec3 b);
float dot(vec4 a, vec4 b);
vec3 cross(vec3 a, vec3 b);  // 叉积
vec2 reflect(vec2 i, vec2 n); // 反射
vec3 reflect(vec3 i, vec3 n);
vec2 refract(vec2 i, vec2 n, float eta); // 折射
vec3 refract(vec3 i, vec3 n, float eta);
```

**纹理函数**

```glsl
vec4 texture2D(sampler2D sampler, vec2 coord); // 2D 纹理采样
vec4 texture2DProj(sampler2D sampler, vec3 coord); // 投影纹理采样
vec4 textureCube(samplerCube sampler, vec3 coord); // 立方体纹理采样
```

### 4.4 控制流

**条件语句**

```glsl
if (condition) {
  // 代码
} else if (otherCondition) {
  // 代码
} else {
  // 代码
}
```

**循环**

```glsl
for (int i = 0; i < 10; i++) {
  // 代码
}

while (condition) {
  // 代码
}

do {
  // 代码
} while (condition);
```

**分支**

```glsl
float value = condition ? trueValue : falseValue;
```

## 5. 使用技巧

### 5.1 基本效果

**渐变背景**

```glsl
// 片段着色器
precision mediump float;

uniform vec2 u_resolution;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec3 color = mix(vec3(0.1, 0.2, 0.3), vec3(0.6, 0.7, 0.8), uv.y);
  gl_FragColor = vec4(color, 1.0);
}
```

**噪声**

```glsl
// 简单噪声函数
float noise(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

// 片段着色器
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float n = noise(uv * 10.0);
  gl_FragColor = vec4(vec3(n), 1.0);
}
```

**圆形**

```glsl
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 center = uv - 0.5;
  float distance = length(center);
  float radius = 0.3;
  float alpha = step(distance, radius);
  gl_FragColor = vec4(vec3(1.0, 0.0, 0.0) * alpha, alpha);
}
```

### 5.2 高级效果

**菲涅尔效应**

```glsl
// 片段着色器
uniform vec3 u_cameraPosition;
uniform vec3 u_lightPosition;

varying vec3 v_position;
varying vec3 v_normal;

void main() {
  vec3 viewDirection = normalize(u_cameraPosition - v_position);
  vec3 normal = normalize(v_normal);
  float fresnel = 1.0 - dot(viewDirection, normal);
  fresnel = pow(fresnel, 2.0);
  
  vec3 color = mix(vec3(0.1, 0.1, 0.3), vec3(0.8, 0.8, 1.0), fresnel);
  gl_FragColor = vec4(color, 1.0);
}
```

**环境映射**

```glsl
// 片段着色器
uniform samplerCube u_environmentMap;
uniform vec3 u_cameraPosition;

varying vec3 v_position;
varying vec3 v_normal;

void main() {
  vec3 viewDirection = normalize(v_position - u_cameraPosition);
  vec3 normal = normalize(v_normal);
  vec3 reflectDirection = reflect(viewDirection, normal);
  
  vec3 color = textureCube(u_environmentMap, reflectDirection).rgb;
  gl_FragColor = vec4(color, 1.0);
}
```

** bloom 效果**

```glsl
// 片段着色器 - 高斯模糊
precision mediump float;

uniform sampler2D u_texture;
uniform vec2 u_resolution;
uniform vec2 u_direction;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec3 color = vec3(0.0);
  
  float weight[5];
  weight[0] = 0.227027;
  weight[1] = 0.1945946;
  weight[2] = 0.1216216;
  weight[3] = 0.054054;
  weight[4] = 0.016216;
  
  for (int i = -4; i <= 4; i++) {
    vec2 offset = vec2(float(i)) * 1.0 / u_resolution.xy * u_direction;
    color += texture2D(u_texture, uv + offset).rgb * weight[abs(i)];
  }
  
  gl_FragColor = vec4(color, 1.0);
}
```

### 5.3 性能优化

**减少分支**

```glsl
// 避免
if (condition) {
  color = vec3(1.0, 0.0, 0.0);
} else {
  color = vec3(0.0, 1.0, 0.0);
}

// 优化
color = mix(vec3(0.0, 1.0, 0.0), vec3(1.0, 0.0, 0.0), float(condition));
```

**避免循环**

```glsl
// 避免
for (int i = 0; i < 10; i++) {
  // 复杂计算
}

// 优化 - 展开循环或使用数学公式
```

**使用纹理而不是计算**

```glsl
// 避免
float noise = complexNoiseFunction(uv);

// 优化
float noise = texture2D(u_noiseTexture, uv).r;
```

## 6. 常见问题

### 6.1 编译错误

**问题**：着色器编译失败
**解决方案**：
- 检查语法错误
- 确保使用正确的 GLSL 版本
- 检查变量类型匹配
- 使用 `gl.getShaderInfoLog()` 获取详细错误信息

**问题**：uniform 变量未找到
**解决方案**：
- 确保变量名大小写一致
- 检查变量是否在着色器中使用
- 确保程序链接成功

### 6.2 渲染问题

**问题**：黑色屏幕
**解决方案**：
- 检查顶点数据是否正确
- 确保着色器程序正确链接
- 检查 uniforms 是否正确设置
- 检查深度测试和混合设置

**问题**：纹理不显示
**解决方案**：
- 检查纹理是否正确加载
- 确保纹理坐标在有效范围内
- 检查纹理采样器是否正确设置

### 6.3 性能问题

**问题**：渲染速度慢
**解决方案**：
- 减少着色器复杂度
- 使用更简单的算法
- 减少纹理采样次数
- 使用适当的精度（lowp/mediump/highp）

**问题**：内存使用高
**解决方案**：
- 减少纹理大小
- 使用压缩纹理格式
- 优化顶点数据

## 7. 性能优化

### 7.1 着色器优化

**精度选择**

```glsl
// 选择适当的精度
precision lowp float;     // 低精度 - 适用于简单计算
precision mediump float;   // 中等精度 - 默认
precision highp float;     // 高精度 - 适用于复杂计算
```

**避免数学陷阱**

- 避免除以零
- 避免开方负数
- 避免对数负数

**使用内建函数**

- 内建函数通常经过优化
- 避免重复计算
- 使用向量运算代替标量运算

### 7.2 渲染优化

**批处理**

- 合并绘制调用
- 使用实例化渲染
- 减少状态切换

**纹理优化**

- 使用适当的纹理格式
- 压缩纹理
- 使用 mipmap

**几何体优化**

- 减少顶点数量
- 使用索引缓冲
- 优化三角形布局

## 8. 应用场景示例

### 8.1 2D 效果

**波纹效果**

```glsl
// 片段着色器
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 center = uv - 0.5;
  float distance = length(center);
  float wave = sin(distance * 20.0 - u_time * 5.0) * 0.1;
  float intensity = 1.0 / (distance + wave + 0.1);
  vec3 color = vec3(intensity * 0.5, intensity * 0.3, intensity * 0.8);
  gl_FragColor = vec4(color, 1.0);
}
```

**火焰效果**

```glsl
// 片段着色器
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

float noise(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 4; i++) {
    value += amplitude * noise(p);
    p *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv.y = 1.0 - uv.y;
  
  float noise = fbm(uv * 2.0 + vec2(0.0, -u_time * 0.5));
  float gradient = uv.y;
  float fire = noise * gradient;
  
  vec3 color = mix(vec3(0.1, 0.0, 0.0), vec3(1.0, 0.5, 0.0), fire);
  color = mix(color, vec3(1.0, 1.0, 0.5), fire * fire);
  
  gl_FragColor = vec4(color, 1.0);
}
```

### 8.2 3D 效果

** phong 光照**

```glsl
// 片段着色器
precision mediump float;

uniform vec3 u_lightPosition;
uniform vec3 u_cameraPosition;

varying vec3 v_position;
varying vec3 v_normal;
varying vec2 v_texCoord;

void main() {
  vec3 normal = normalize(v_normal);
  vec3 lightDirection = normalize(u_lightPosition - v_position);
  vec3 viewDirection = normalize(u_cameraPosition - v_position);
  vec3 reflectDirection = reflect(-lightDirection, normal);
  
  float ambient = 0.1;
  float diffuse = max(dot(normal, lightDirection), 0.0);
  float specular = pow(max(dot(viewDirection, reflectDirection), 0.0), 32.0);
  
  vec3 color = vec3(0.8, 0.6, 0.4);
  color = color * (ambient + diffuse) + specular * vec3(1.0);
  
  gl_FragColor = vec4(color, 1.0);
}
```

**卡通着色**

```glsl
// 片段着色器
precision mediump float;

uniform vec3 u_lightPosition;

varying vec3 v_position;
varying vec3 v_normal;

void main() {
  vec3 normal = normalize(v_normal);
  vec3 lightDirection = normalize(u_lightPosition - v_position);
  
  float dotProduct = dot(normal, lightDirection);
  float shading = step(0.5, dotProduct);
  
  vec3 color = vec3(0.8, 0.2, 0.2) * shading;
  
  gl_FragColor = vec4(color, 1.0);
}
```

### 8.3 后处理效果

**灰度效果**

```glsl
// 片段着色器
precision mediump float;

uniform sampler2D u_texture;

varying vec2 v_texCoord;

void main() {
  vec4 color = texture2D(u_texture, v_texCoord);
  float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
  gl_FragColor = vec4(vec3(gray), color.a);
}
```

**模糊效果**

```glsl
// 片段着色器
precision mediump float;

uniform sampler2D u_texture;
uniform vec2 u_resolution;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec3 color = vec3(0.0);
  
  for (int x = -1; x <= 1; x++) {
    for (int y = -1; y <= 1; y++) {
      vec2 offset = vec2(float(x), float(y)) / u_resolution.xy;
      color += texture2D(u_texture, uv + offset).rgb;
    }
  }
  
  color /= 9.0;
  gl_FragColor = vec4(color, 1.0);
}
```

### 8.4 数据可视化

**热力图**

```glsl
// 片段着色器
precision mediump float;

uniform sampler2D u_data;
uniform vec2 u_resolution;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float value = texture2D(u_data, uv).r;
  
  vec3 color;
  if (value < 0.33) {
    color = mix(vec3(0.0, 0.0, 1.0), vec3(0.0, 1.0, 0.0), value * 3.0);
  } else if (value < 0.66) {
    color = mix(vec3(0.0, 1.0, 0.0), vec3(1.0, 1.0, 0.0), (value - 0.33) * 3.0);
  } else {
    color = mix(vec3(1.0, 1.0, 0.0), vec3(1.0, 0.0, 0.0), (value - 0.66) * 3.0);
  }
  
  gl_FragColor = vec4(color, 1.0);
}
```

## 9. 学习资源

- [The Book of Shaders](https://thebookofshaders.com/)
- [ShaderToy](https://www.shadertoy.com/)
- [GLSL Sandbox](http://glslsandbox.com/)
- [WebGL Fundamentals](https://webglfundamentals.org/)
- [OpenGL ES Shading Language Specification](https://www.khronos.org/registry/OpenGL/specs/es/3.0/GLSL_ES_Specification_3.00.pdf)

## 10. 最佳实践

### 10.1 代码组织

- **模块化** - 将复杂着色器拆分为多个部分
- **注释** - 添加清晰的注释
- **命名规范** - 使用一致的命名约定
- **代码风格** - 保持一致的代码风格

### 10.2 性能

- **精度** - 使用适当的精度
- **计算** - 减少复杂计算
- **纹理** - 优化纹理使用
- **内存** - 减少内存使用

### 10.3 可维护性

- **可读性** - 编写清晰可读的代码
- **可重用性** - 创建可重用的函数
- **文档** - 为复杂效果添加文档
- **测试** - 测试不同设备和浏览器

### 10.4 调试

- **调试技巧** - 使用颜色编码调试
- **工具** - 使用专业的着色器调试工具
- **性能分析** - 分析性能瓶颈
- **错误处理** - 适当处理错误情况

## 总结

GLSL Shaders 是一种强大的工具，用于创建复杂的视觉效果和图形渲染。通过掌握其核心概念和最佳实践，可以创建从简单的 2D 效果到复杂的 3D 渲染等各种视觉体验。关键是要理解 GPU 并行计算的特性，优化着色器代码，以及根据具体应用场景选择合适的技术方案。