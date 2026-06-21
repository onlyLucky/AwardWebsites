import { useState, useEffect, useRef } from 'react'
import styles from './style.module.css'

interface LoadingScreenProps {
  onComplete: () => void
}

function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const glRef = useRef<WebGL2RenderingContext | null>(null)
  const programRef = useRef<WebGLProgram | null>(null)
  const uniformLocsRef = useRef<{ [key: string]: WebGLUniformLocation | null }>({})
  const animFrameRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const gl = canvas.getContext('webgl2', { preserveDrawingBuffer: true })
    if (!gl) {
      console.error('[LoadingScreen] no webgl2')
      return
    }
    glRef.current = gl

    // ===== Vertex Shader =====
    const vsSource = `
      attribute vec2 a_position;
      varying vec2 vUv;
      void main() {
        vUv = vec2(a_position.x * 0.5 + 0.5, 1.0 - (a_position.y * 0.5 + 0.5));
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `

    // ===== Fragment Shader: CRT 电脑屏幕效果 =====
    const fsSource = `
      precision highp float;

      uniform sampler2D tDiffuse;
      uniform sampler2D tNoise;
      uniform float time;
      uniform float loadingProgress;
      uniform vec2 dimensions;

      varying vec2 vUv;

      // 桶形畸变：模拟 CRT 显示器屏幕内容的弯曲效果
      // distortion 参数控制畸变强度，值越大弯曲越明显
      vec2 barrelDistortion(vec2 uv, float distortion) {
        vec2 centered = uv - 0.5;
        float r2 = centered.x * centered.x + centered.y * centered.y;
        float dist = 1.0 + r2 * distortion;
        return centered * dist + 0.5;
      }

      // 圆角矩形 SDF：计算点到圆角矩形的有符号距离
      // p: 当前点，b: 矩形半尺寸，r: 圆角半径
      float roundedBoxSDF(vec2 p, vec2 b, float r) {
        vec2 q = abs(p) - b + r;
        return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
      }

      // 暗角：模拟 CRT 显示器边缘变暗效果
      float vignette(vec2 uv, float radius, float smoothness) {
        float dist = length(uv - 0.5);
        return smoothstep(-smoothness, smoothness, radius - dist);
      }

      void main() {
        // ===== 步骤 1: 定义屏幕区域 =====
        // 屏幕不占满整个页面，四周留有 1px 黑色边距
        float marginPx = 2.0;       // 固定边距 1px
        float cornerRadiusPx = 50.0; // 圆角半径 50px

        // 将像素边距转换为 UV 单位
        vec2 marginUV = vec2(marginPx / dimensions.x, marginPx / dimensions.y);

        // 屏幕区域边界
        vec2 screenMin = marginUV;
        vec2 screenMax = vec2(1.0 - marginUV.x, 1.0 - marginUV.y);
        vec2 screenCenter = (screenMin + screenMax) * 0.5;
        vec2 screenSize = screenMax - screenMin;
        vec2 screenHalfSize = screenSize * 0.5;

        // 将圆角半径从像素转换为 UV 单位（取宽高中较小值为基准）
        float cornerRadius = cornerRadiusPx / min(dimensions.x, dimensions.y);

        // 计算当前点是否在屏幕区域内（带圆角 + 桶形畸变）
        vec2 screenLocal = vUv - screenCenter;

        // 对屏幕边界坐标应用桶形畸变，使圆角矩形边缘弯曲
        vec2 distortedLocal = screenLocal;
        float r2 = screenLocal.x * screenLocal.x + screenLocal.y * screenLocal.y;
        float distortion = 0.2; // 畸变强度
        float dist = 1.0 + r2 * distortion;
        distortedLocal = screenLocal * dist;

        float distToScreen = roundedBoxSDF(distortedLocal, screenHalfSize, cornerRadius);

        // 如果在屏幕外，直接返回黑色
        if (distToScreen > 0.0) {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
          return;
        }

        // ===== 步骤 2: 屏幕边框和内容区域 =====
        // 边框 2px + 内边距 2px，内容区域缩小 4px
        float borderWidthPx = 2.0;  // 边框宽度（像素）
        float contentPaddingPx = 2.0; // 内容与边框间距（像素）

        // 计算内容区域边界（向内收缩 边框+内边距）
        float totalOffsetPx = borderWidthPx + contentPaddingPx;
        vec2 contentMin = screenMin + vec2(totalOffsetPx / dimensions.x, totalOffsetPx / dimensions.y);
        vec2 contentMax = screenMax - vec2(totalOffsetPx / dimensions.x, totalOffsetPx / dimensions.y);
        vec2 contentSize = contentMax - contentMin;

        // 判断是否在边框区域内（屏幕内，内容区外）
        float distToContent = roundedBoxSDF(
          (vUv - (contentMin + contentMax) * 0.5) * vec2(dimensions.x, dimensions.y),
          contentSize * vec2(dimensions.x, dimensions.y) * 0.5,
          cornerRadiusPx - totalOffsetPx
        );

        // ===== 步骤 3: 将 UV 映射到内容区域内 =====
        vec2 screenUV = (vUv - contentMin) / contentSize;

        // ===== 步骤 4: 纯色背景 =====
        vec3 bgColor = vec3(0.247, 0.227, 0.604);  // #3f3a9a

        // ===== 步骤 4: 矩形噪点效果（参考 shader.se 源码实现） =====
        // 使用逐像素哈希函数生成矩形噪点块
        // 哈希函数：fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453 + time * velocity)
        // smoothstep 阈值 0.49 使约 50% 像素显示噪点，形成矩形块状效果
        // 白色噪点透明（不影响原色），黑色噪点偏向背景渐变色
        float noiseVelocity = 0.25;
        float noiseScale = 6.0;     // UV 缩放，值越大噪点颗粒越小（增加密度）
        float noiseIntensity = 0.5;

        // 逐像素哈希噪点
        vec2 noiseUV = screenUV * noiseScale;
        float noiseHash = fract(sin(dot(noiseUV, vec2(12.9898, 78.233))) * 43758.5453 + time * noiseVelocity);
        float noiseThreshold = smoothstep(0.0, 0.49, noiseHash);
        // 噪点颜色偏向背景渐变色，白色透明，黑色显示背景色
        vec3 noiseTarget = bgColor * 0.65; // 背景渐变色作为噪点基色（调亮）
        vec3 color = mix(noiseTarget, bgColor, mix(1.0, noiseThreshold, noiseIntensity));

        // ===== 步骤 5: 应用桶形畸变 =====
        // 对屏幕圆角矩形应用畸变，模拟 CRT 屏幕的弧度
        // distortion = 0.4: 适中的桶形畸变
        vec2 distortedUV = barrelDistortion(screenUV, 0.3);

        // 将畸变后的 UV 钳制到 0-1 范围
        distortedUV = clamp(distortedUV, 0.0, 1.0);

        // ===== 步骤 6: 采样 boot_screen 纹理（在噪点之上） =====
        // 纹理在噪点之上渲染，使用亮度作为遮罩
        vec3 texColor = texture2D(tDiffuse, distortedUV).rgb;
        float luminance = dot(texColor, vec3(0.299, 0.587, 0.114)); // 计算亮度
        color = mix(color, texColor, luminance); // 用亮度混合：黑色显示噪点背景，白色显示纹理

        // ===== 步骤 7: 暗角效果（在屏幕区域内） =====
        // 在噪点之后应用暗角，效果更明显
        // radius = 0.5: 暗角范围（从中心到边缘的距离）
        // smoothness = 0.5: 过渡平滑度
        float vignetteIntensity = 0.5; // 暗角强度（1.0=全暗角，0.0=无暗角）
        float aspect = screenSize.x / screenSize.y;
        vec2 vignetteUV = vec2(screenUV.x, screenUV.y * aspect);
        float vignetteFactor = vignette(vignetteUV, 0.5, 0.5);
        color *= mix(1.0, vignetteFactor, vignetteIntensity);

        // ===== 步骤 8: CRT 屏幕边框反射效果 =====
        // 顶部蓝色高光（天空光/环境光反射）- 紧贴上边缘
        // 底部暖色暗部（内部反射/老化）- 紧贴下边缘
        // 使用 screenUV（线性 0-1）精确计算像素宽度

        float edgeWidthPx = 10.0; // 边框光效宽度（像素）
        float screenHeightPx = dimensions.y - 2.0 * marginPx; // 屏幕实际像素高度
        float edgeWidthUV = edgeWidthPx / screenHeightPx; // 像素转换为屏幕 UV 单位

        // 顶部蓝色高光：紧贴屏幕上边缘
        // step(edge, x): x < edge 返回 0，x >= edge 返回 1
        // screenUV.y=0 是顶部，=1 是底部
        float topEdge = 1.0 - step(edgeWidthUV, screenUV.y); // screenUV.y < edgeWidthUV 时为 1
        vec3 topBlueTint = vec3(0.3, 0.45, 0.85); // 蓝色反射
        color = mix(color, color + topBlueTint * 0.5, topEdge * 0.7);

        // 底部暖色暗部：紧贴屏幕下边缘
        float bottomEdge = step(1.0 - edgeWidthUV, screenUV.y); // screenUV.y >= 1-edgeWidthUV 时为 1
        vec3 bottomWarmTint = vec3(0.6, 0.45, 0.25); // 暖黄色调
        color = mix(color, bottomWarmTint * 0.8, bottomEdge * 0.7); // 直接混合暖色

        // ===== 步骤 8: 绘制进度条（基于 shader.se 源码精确复刻） =====
        // 结构：2px 白色外边框 → 4px 内边距 → 21 段加载条（10px 体 + 4px 间隙）→ 按进度填充
        // shader.se 使用虚拟像素坐标系统，基于畸变后的 UV 坐标计算

        // 加载条参数（基于 shader.se 源码）
        float barWidthPx = 298.0;    // 加载条宽度（虚拟像素）
        float barHeightPx = 20.0;    // 加载条高度（虚拟像素）
        float barOuterBorderPx = 2.0; // 外部边框宽度（shader.se 源码：2px）
        float barPaddingPx = 4.0;     // 内边距（shader.se 源码：4px）
        float segBodyWidth = 10.0;    // 段落宽度（shader.se 源码：10px）
        float segGapWidth = 4.0;      // 段落间隙（shader.se 源码：4px）
        float segTotalWidth = segBodyWidth + segGapWidth; // 每段总宽：14px
        float segCount = 21.0;        // 段落数量（shader.se 源码：21）

        // 虚拟分辨率（shader.se 源码）
        // 桌面端：720x400，移动端：360x260
        vec2 virtualRes = vec2(720.0, 400.0);
        if (dimensions.x < 1024.0) {
          virtualRes = vec2(520.0, 320.0);
        }

        // 计算加载条位置（shader.se 源码逻辑）
        // 源码使用畸变后的 UV 坐标（screenUV 畸变后）
        // C = floor(virtualRes * 0.5); C.y -= virtualRes.y * 0.18
        vec2 barCenter = floor(virtualRes * 0.5);
        barCenter.y -= virtualRes.y * (-0.20);  // 向下偏移 20%

        // 加载条边界（虚拟像素坐标）
        vec2 barMin = barCenter - vec2(barWidthPx, barHeightPx) * 0.5;
        vec2 barMax = barCenter + vec2(barWidthPx, barHeightPx) * 0.5;

        // 将畸变后的 UV 坐标转换为虚拟像素坐标
        // 源码：v = floor(s * virtualRes)，其中 s 是畸变后的 UV
        vec2 pixelCoord = floor(distortedUV * virtualRes);

        // 判断当前像素是否在加载条区域内
        if (pixelCoord.x >= barMin.x && pixelCoord.x < barMax.x &&
            pixelCoord.y >= barMin.y && pixelCoord.y < barMax.y) {
          // 计算在加载条内的相对坐标（虚拟像素）
          vec2 barLocal = pixelCoord - barMin;

          // 外边框区域（2px 白色）
          if (barLocal.x < barOuterBorderPx || barLocal.x >= barWidthPx - barOuterBorderPx ||
              barLocal.y < barOuterBorderPx || barLocal.y >= barHeightPx - barOuterBorderPx) {
            color = vec3(1.0); // 白色外边框
          }
          // 内边距区域（4px 黑色）
          else if (barLocal.x < barPaddingPx || barLocal.x >= barWidthPx - barPaddingPx ||
                   barLocal.y < barPaddingPx || barLocal.y >= barHeightPx - barPaddingPx) {
            // color = vec3(0.0); // 黑色内边距
          }
          // 段落区域
          else {
            // 段落区域内的 X 坐标（相对内边距后）
            float innerX = barLocal.x - barPaddingPx;

            // 计算当前像素属于哪个段落
            // 源码：d = floor(n / o), c = fract(n / o) * o
            // 其中 o = segBodyWidth + segGapWidth = 14
            float segIndex = floor(innerX / segTotalWidth);
            float segPosition = innerX - segIndex * segTotalWidth;

            // 计算已填充的段落数量
            // shader.se 源码：u = floor((t + 0.1) / 100 * 21)
            // t 是 loadingProgress (0-100)
            float filledSegments = floor((loadingProgress + 0.1) / 100.0 * segCount);

            // 判断段落状态
            // 源码：if d < u AND c < a then filled
            // 其中 a = segBodyWidth = 10
            if (segIndex < filledSegments && segPosition < segBodyWidth) {
              // 已填充段落：白色
              color = vec3(1.0);
            } else {
              // 未填充段落或间隙：黑色
              // color = vec3(0.0);
            }
          }
        }

        // ===== 步骤 9: 绘制边框 =====
        // 在内容区域外、屏幕区域内绘制白色边框
        if (distToContent > 0.0) {
          color = vec3(1.0); // 白色边框
        }

        gl_FragColor = vec4(color, 1.0);
      }
    `

    // ===== 编译 Shader =====
    function createShader(type: number, source: string): WebGLShader | null {
      const shader = gl.createShader(type)
      if (!shader) return null
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('[LoadingScreen] shader compile error:', gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const vs = createShader(gl.VERTEX_SHADER, vsSource)
    const fs = createShader(gl.FRAGMENT_SHADER, fsSource)
    if (!vs || !fs) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('[LoadingScreen] program link error:', gl.getProgramInfoLog(program))
      return
    }

    gl.useProgram(program)
    programRef.current = program

    // 缓存 uniform 位置
    uniformLocsRef.current = {
      tDiffuse: gl.getUniformLocation(program, 'tDiffuse'),
      tNoise: gl.getUniformLocation(program, 'tNoise'),
      time: gl.getUniformLocation(program, 'time'),
      loadingProgress: gl.getUniformLocation(program, 'loadingProgress'),
      dimensions: gl.getUniformLocation(program, 'dimensions'),
    }

    // ===== 全屏四边形 =====
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1, 1, -1, -1, 1,
      -1, 1, 1, -1, 1, 1
    ]), gl.STATIC_DRAW)

    const posLoc = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    // ===== 加载纹理 =====
    function loadTexture(url: string, wrapRepeat: boolean = false): Promise<WebGLTexture | null> {
      return new Promise((resolve) => {
        const tex = gl.createTexture()
        if (!tex) { resolve(null); return }

        // 占位黑色
        gl.bindTexture(gl.TEXTURE_2D, tex)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]))

        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.onload = () => {
          gl.bindTexture(gl.TEXTURE_2D, tex)
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapRepeat ? gl.REPEAT : gl.CLAMP_TO_EDGE)
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapRepeat ? gl.REPEAT : gl.CLAMP_TO_EDGE)
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
          console.log('[LoadingScreen] texture loaded:', url, img.width, img.height)
          resolve(tex)
        }
        img.onerror = () => {
          console.error('[LoadingScreen] texture failed:', url)
          resolve(null)
        }
        img.src = url
      })
    }

    // 加载桌面/移动端纹理和噪点纹理
    const isMobile = window.innerWidth < 1024
    const bootScreenPath = isMobile
      ? '/assets/images/shader-se/boot_screen_mobile.png'
      : '/assets/images/shader-se/boot_screen.png'

    Promise.all([
      loadTexture(bootScreenPath),
      loadTexture('/assets/images/shader-se/rgba_noise.png', true)
    ]).then(([bootTex, noiseTex]) => {
      if (!bootTex || !noiseTex) return

      const locs = uniformLocsRef.current

      // 设置纹理单元
      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, bootTex)
      gl.uniform1i(locs.tDiffuse, 0)

      gl.activeTexture(gl.TEXTURE1)
      gl.bindTexture(gl.TEXTURE_2D, noiseTex)
      gl.uniform1i(locs.tNoise, 1)

      startTimeRef.current = performance.now()

      // 渲染循环
      const animate = () => {
        animFrameRef.current = requestAnimationFrame(animate)

        const time = (performance.now() - startTimeRef.current) * 0.001
        gl.uniform1f(locs.time, time)
        gl.uniform2f(locs.dimensions, canvas.width, canvas.height)

        gl.viewport(0, 0, canvas.width, canvas.height)
        gl.clearColor(0.0, 0.0, 0.0, 1.0)
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.drawArrays(gl.TRIANGLES, 0, 6)
      }
      animate()
      console.log('[LoadingScreen] animation started')
    })

    // 窗口大小调整
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('resize', handleResize)
      if (program) gl.deleteProgram(program)
      if (vs) gl.deleteShader(vs)
      if (fs) gl.deleteShader(fs)
      if (buffer) gl.deleteBuffer(buffer)
    }
  }, [])

  // 更新 loadingProgress uniform
  useEffect(() => {
    const gl = glRef.current
    const program = programRef.current
    if (!gl || !program) return

    gl.useProgram(program)
    const loc = uniformLocsRef.current.loadingProgress
    if (loc) {
      gl.uniform1f(loc, progress)
    }
  }, [progress])

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 30)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={styles.loadingScreen}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  )
}

export default LoadingScreen
