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

        // ===== 步骤 2: 将 UV 映射到屏幕区域内 =====
        vec2 screenUV = (vUv - screenMin) / screenSize;

        // ===== 步骤 3: 径向渐变背景 =====
        // 最里面 #49449a，最外面 #242255
        vec3 innerColor = vec3(0.286, 0.267, 0.604);  // #49449a
        vec3 outerColor = vec3(0.141, 0.133, 0.333);  // #242255
        float gradDist = length(screenUV - 0.5) * 1.4; // 距离中心的距离
        vec3 bgColor = mix(innerColor, outerColor, clamp(gradDist, 0.0, 1.0));

        // ===== 步骤 4: 矩形噪点效果（参考 shader.se 源码实现） =====
        // 使用逐像素哈希函数生成矩形噪点块
        // 哈希函数：fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453 + time * velocity)
        // smoothstep 阈值 0.49 使约 50% 像素显示噪点，形成矩形块状效果
        // 白色噪点透明（不影响原色），黑色噪点偏向背景渐变色
        float noiseVelocity = 0.25;
        float noiseScale = 3.0;     // UV 缩放，值越大噪点颗粒越小
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

        // ===== 步骤 8: 绘制进度条（在屏幕区域内） =====
        // 21 段，宽度 25%，高度 4%，居中偏下 65%
        float barCenterY = 0.65;     // 进度条垂直位置（0-1）
        float barHeight = 0.04;      // 进度条高度（UV 单位，约 4%）
        float barWidth = 0.25;       // 进度条宽度（UV 单位，约 25%）
        float borderWidth = 0.003;   // 边框宽度（UV 单位）
        float segments = 21.0;       // 段落数量

        vec2 barCenter = vec2(0.5, barCenterY);
        vec2 barHalfSize = vec2(barWidth * 0.5, barHeight * 0.5);
        vec2 barStart = barCenter - barHalfSize;
        vec2 barEnd = barCenter + barHalfSize;

        // 检查当前点是否在进度条区域内
        if (screenUV.x >= barStart.x && screenUV.x <= barEnd.x &&
            screenUV.y >= barStart.y && screenUV.y <= barEnd.y) {
          // 计算在进度条内的相对位置 (0-1)
          vec2 localUV = (screenUV - barStart) / (barEnd - barStart);

          // 边框区域（白色边框）
          if (localUV.x < borderWidth || localUV.x > 1.0 - borderWidth ||
              localUV.y < borderWidth || localUV.y > 1.0 - borderWidth) {
            color = vec3(1.0);
          } else {
            // 内部区域：计算段落
            float innerWidth = 1.0 - 2.0 * borderWidth;
            float innerX = (localUV.x - borderWidth) / innerWidth;

            // 计算当前像素在哪个段落
            float segX = innerX * segments;
            float seg = floor(segX);
            float segFrac = fract(segX);

            float filledSegments = loadingProgress / 100.0 * segments;

            // 分隔线：每个段落之间有明显的黑色间隙
            // 分隔线宽度约占段落宽度的 15%
            float dividerWidth = 0.15;

            if (segFrac < dividerWidth) {
              // 段落左侧分隔线：黑色
              color = vec3(0.0);
            } else if (seg < filledSegments) {
              // 已填充段落：白色
              color = vec3(1.0);
            } else {
              // 未填充段落：黑色
              color = vec3(0.0);
            }
          }
        }

        // ===== 步骤 9: 屏幕边缘柔化 =====
        // 在屏幕边缘添加轻微的柔化，避免硬边
        // float edgeSoftness = smoothstep(0.0, 0.005, -distToScreen);
        // color *= edgeSoftness;

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
