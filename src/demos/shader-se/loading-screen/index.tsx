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

    // ===== Fragment Shader: CRT 效果 =====
    const fsSource = `
      precision highp float;

      uniform sampler2D tDiffuse;
      uniform sampler2D tNoise;
      uniform float time;
      uniform float loadingProgress;
      uniform vec2 dimensions;

      varying vec2 vUv;

      // 桶形畸变：模拟 CRT 显示器边缘弯曲效果
      vec2 barrelDistortion(vec2 uv, float distortion) {
        vec2 centered = uv - 0.5;
        float r2 = centered.x * centered.x + centered.y * centered.y;
        float dist = 1.0 + r2 * distortion;
        return centered * dist + 0.5;
      }

      // 暗角：模拟 CRT 显示器边缘变暗效果
      float vignette(vec2 uv, float radius, float smoothness) {
        float dist = length(uv - 0.5);
        return smoothstep(-smoothness, smoothness, radius - dist);
      }

      void main() {
        // 步骤 1: 应用桶形畸变（仅桌面端）
        // distortion = 0.35: 产生明显的桶形畸变
        vec2 uv = vUv;
        if (dimensions.x > 1024.0) {
          uv = barrelDistortion(vUv, 0.35);
        }

        // 步骤 2: 采样 boot_screen 纹理
        vec3 color = vec3(0.0);
        if (uv.x >= 0.0 && uv.x <= 1.0 && uv.y >= 0.0 && uv.y <= 1.0) {
          color = texture2D(tDiffuse, uv).rgb;
        }

        // 步骤 3: 暗角效果（应用到纹理上）
        // radius = 0.7: 暗角范围
        // smoothness = 0.4: 过渡平滑度
        // 宽高比校正：使用椭圆形暗角
        float aspect = dimensions.x / dimensions.y;
        vec2 vignetteUV = vec2(vUv.x, vUv.y * aspect);
        color *= vignette(vignetteUV, 0.7, 0.4);

        // 步骤 4: 噪点纹理（应用到纹理上）
        // noiseScale = 50.0: 噪点缩放
        // noiseStrength = 0.15: 噪点强度
        vec2 noiseUV = vUv * 50.0 + time * 0.1;
        float noise = texture2D(tNoise, noiseUV).r;
        color += noise * 0.15;

        // 步骤 5: 绘制进度条（在暗角和噪点之后，保持白色）
        // 21 段，298x30 像素，居中偏下 68%
        vec2 barSize = vec2(298.0, 30.0);
        vec2 barCenter = vec2(0.5, 0.68);
        float borderWidth = 2.0;
        float padding = 4.0;
        float segments = 21.0;

        vec2 barHalfSize = barSize / dimensions * 0.5;
        vec2 barStart = barCenter - barHalfSize;
        vec2 barEnd = barCenter + barHalfSize;

        if (vUv.x >= barStart.x && vUv.x <= barEnd.x &&
            vUv.y >= barStart.y && vUv.y <= barEnd.y) {
          vec2 localUV = (vUv - barStart) / (barEnd - barStart);
          vec2 pixelPos = localUV * barSize;

          if (pixelPos.x < borderWidth ||
              pixelPos.x > barSize.x - borderWidth ||
              pixelPos.y < borderWidth ||
              pixelPos.y > barSize.y - borderWidth) {
            // 边框区域显示白色
            color = vec3(1.0);
          } else {
            vec2 paddedUV = (pixelPos - padding) / (barSize - 2.0 * padding);
            if (paddedUV.x >= 0.0 && paddedUV.x <= 1.0 &&
                paddedUV.y >= 0.0 && paddedUV.y <= 1.0) {
              float segX = paddedUV.x * segments;
              float seg = floor(segX);
              float filledSegments = loadingProgress / 100.0 * segments;

              // 段落分隔线：每个段落边缘有 1px 的间隙
              float segFrac = fract(segX);
              float dividerWidth = 1.0 / barSize.x * 3.0;
              bool isDivider = segFrac < dividerWidth || segFrac > (1.0 - dividerWidth);

              if (isDivider) {
                // 分隔线显示黑色
                color = vec3(0.0);
              } else if (seg < filledSegments) {
                // 已填充段落显示白色
                color = vec3(1.0);
              } else {
                // 未填充段落显示黑色
                color = vec3(0.0);
              }
            }
          }
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
