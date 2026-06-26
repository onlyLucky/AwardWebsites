/**
 * WebGL 3D 卡片效果组件
 *
 * 复刻 follow.art 首页的 3D 卡片旋转效果。
 *
 * === 渲染架构 ===
 * 源码使用两个独立的 WebGL 渲染器：
 *   1. 阴影渲染器（rendererShadow）：渲染橙色阴影卡片，相机 near=69, far=200
 *   2. 纹理渲染器（rendererTextured）：渲染带贴图的卡片，相机 near=0.1, far=69
 * 两个 canvas 通过 CSS z-index 层叠：阴影在 SVG 标题后面，纹理在标题前面。
 *
 * === 卡片弯曲原理 ===
 * 源码使用 Three.js 的 Flow 类 + onBeforeCompile shader 修改顶点着色器，
 * 将平面几何体（PlaneGeometry）弯曲到圆形路径（CircleCurve）上。
 * 本实现用 CPU 计算近似模拟：根据每个顶点的 x 坐标，计算其在圆形路径上的对应位置，
 * 然后用 Frenet 框架（切线、法线、副法线）构建变换矩阵，弯曲顶点。
 *
 * === 关键源码参数（来自 Nuq5qwIZ.js）===
 * - CircleCurve scale: 15（圆形半径）
 * - PlaneGeometry(9, 12.6, 10, 1)（卡片尺寸 9x12.6，10 个分段）
 * - FOV: 28, position: [0, -14, -70], rotation: [-192, 0, -25] 度
 * - 动画速度: deltaTime * -5e-5
 * - 鼠标跟随: rotation.z += (mouseX - 0.5) * 0.2
 * - 阴影颜色: #B05A2E
 *
 * === 响应式适配 ===
 * - 根据容器宽高比动态调整相机 FOV
 * - 根据屏幕尺寸调整相机位置（z 轴距离）
 * - 小屏幕时增大 FOV 以显示更多内容
 */

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import styles from './style.module.css'

// 卡片贴图资源（9 张艺术家卡片）
import card1 from './images/Card-1.png'
import card2 from './images/Card-2.png'
import card3 from './images/Card-3.png'
import card4 from './images/Card-4.png'
import card5 from './images/Card-5.png'
import card6 from './images/Card-6.png'
import card7 from './images/Card-7.png'
import card8 from './images/Card-8.png'
import card9 from './images/Card-9.png'

const CARD_IMAGES = [card1.src, card2.src, card3.src, card4.src, card5.src, card6.src, card7.src, card8.src, card9.src]

// ============================================================
// 源码精确参数（来自 Nuq5qwIZ.js + DJ9DjCKf.js）
// ============================================================

/** 基础卡片宽度（源码 PlaneGeometry 第一个参数） */
const BASE_CARD_WIDTH = 9

/** 基础卡片高度（源码 PlaneGeometry 第二个参数） */
const BASE_CARD_HEIGHT = 12.6

/** 卡片弯曲分段数（源码 PlaneGeometry 第三个参数，用于 shader 弯曲） */
const CARD_SEGMENTS = 10

/**
 * 基础圆形路径半径（源码 CircleCurve options.scale = 15）
 * 卡片沿此半径的圆形路径排列和弯曲
 */
const BASE_RADIUS = 15

/**
 * 调试模式：显示相机位置标记
 * 调试完成后设置为 false
 */
const DEBUG_CAMERA = false

/**
 * 获取响应式卡片尺寸
 * 根据容器宽度调整卡片大小，确保在不同屏幕下都能正确显示
 */
function getResponsiveCardSize(containerWidth: number) {
  // 基准宽度（桌面端）
  const baseWidth = 1200

  // 计算缩放比例，限制在 0.5 到 1.2 之间
  const scale = Math.max(0.5, Math.min(1.2, containerWidth / baseWidth))

  return {
    cardWidth: BASE_CARD_WIDTH * scale,
    cardHeight: BASE_CARD_HEIGHT * scale,
    radius: BASE_RADIUS * scale,
  }
}

/**
 * 动画速度（源码: deltaTime * -5e-5）
 * 负值表示卡片沿圆形路径反向移动
 */
const ANIMATION_SPEED = -5e-5

// ============================================================
// 圆形路径计算函数
// ============================================================

/**
 * 获取圆形路径上指定位置的几何信息
 *
 * 源码使用 THREE.CircularCurve（继承自 Curve），这里手动计算。
 * 圆形路径：x = cos(t * 2PI) * radius, z = sin(t * 2PI) * radius
 *
 * @param t - 路径上的归一化位置（0-1，0 和 1 是同一点）
 * @param radius - 圆形路径半径
 * @returns 位置、切线、法线、副法线（Frenet 框架）
 */
function getCurvePoint(t: number, radius: number = BASE_RADIUS) {
  const angle = t * Math.PI * 2

  // 圆形路径上的位置
  const pos = new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius)

  // 切线方向（圆的切线，垂直于半径方向）
  const tangent = new THREE.Vector3(-Math.sin(angle), 0, Math.cos(angle)).normalize()

  // 法线方向（世界空间向上）
  const normal = new THREE.Vector3(0, 1, 0)

  // 副法线 = 切线 x 法线（Frenet 框架的第三个基向量）
  const binormal = new THREE.Vector3().crossVectors(tangent, normal).normalize()

  return { pos, tangent, normal, binormal }
}

/**
 * 创建沿圆形路径弯曲的卡片几何体
 *
 * 模拟源码的 Flow 类 + onBeforeCompile shader 效果：
 * 1. 创建平面几何体 PlaneGeometry(width, height, segments, 1)
 * 2. 遍历每个顶点，根据其 x 坐标计算在圆形路径上的对应位置
 * 3. 用 Frenet 框架（tangent, normal, binormal）构建 basis 矩阵
 * 4. 将顶点从局部坐标变换到世界坐标
 *
 * 源码 shader 关键逻辑：
 *   spinePortion = (worldPos.x + spineOffset) / spineLength
 *   mt = (spinePortion * pathSegment + pathOffset) * textureStacks
 *   transformed = basis * vec3(0, y, 0) + spinePos  // xWeight=0，x 不参与
 *
 * @param width - 卡片宽度
 * @param height - 卡片高度
 * @param segments - 宽度方向的分段数（越多弯曲越平滑）
 * @param cardT - 卡片在圆形路径上的起始位置（0-1）
 * @param radius - 圆形路径半径
 * @returns 弯曲后的 BufferGeometry
 */
function createCurvedCardGeometry(
  width: number,
  height: number,
  segments: number,
  cardT: number,
  radius: number = BASE_RADIUS
): THREE.BufferGeometry {
  // 创建基础平面几何体
  const geometry = new THREE.PlaneGeometry(width, height, segments, 1)
  const pos = geometry.attributes.position

  // 圆周长（用于计算 spinePortion）
  const curveLen = Math.PI * 2 * radius
  // 源码 spineOffset = 161，这里用 width/2 近似（卡片中心对齐）
  const spineOffset = width / 2
  // 源码 spineLength = 400，这里用圆周长
  const spineLength = curveLen

  // 遍历每个顶点，应用弯曲变换
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i) // 顶点在平面几何体中的 x 坐标
    const y = pos.getY(i) // 顶点在平面几何体中的 y 坐标

    // 计算该顶点在圆形路径上的位置
    // 源码: spinePortion = (worldPos.x + spineOffset) / spineLength
    const spinePortion = (x + spineOffset) / spineLength
    // 加上卡片的起始偏移，取模保证在 0-1 范围内
    const curveT = (spinePortion + cardT) % 1

    // 获取该位置的 Frenet 框架
    const { pos: curvePos, tangent, normal, binormal } = getCurvePoint(curveT, radius)

    // 构建 basis 矩阵（源码: mat3 basis = mat3(a, b, c)）
    // 列向量分别为：切线、法线、副法线
    const basis = new THREE.Matrix3()
    basis.set(tangent.x, tangent.y, tangent.z, normal.x, normal.y, normal.z, binormal.x, binormal.y, binormal.z)

    // 变换顶点（源码: transformed = basis * vec3(0, y, 0) + spinePos）
    // xWeight=0 意味着 x 坐标不参与变换，只有 y 坐标被弯曲
    const localPos = new THREE.Vector3(0, y, 0)
    localPos.applyMatrix3(basis)
    localPos.add(curvePos)

    // 设置变换后的顶点位置
    pos.setXYZ(i, localPos.x, localPos.y, localPos.z)
  }

  pos.needsUpdate = true
  geometry.computeVertexNormals()
  return geometry
}

/** 判断是否为移动设备 */
function isMobile(): boolean {
  return window.innerWidth <= 667
}

/**
 * 根据容器尺寸计算响应式相机参数
 * @param width - 容器宽度
 * @param height - 容器高度
 * @returns 相机参数：FOV、位置、旋转
 */
function getResponsiveCameraParams(width: number, height: number) {
  const aspect = width / height
  const mobile = width <= 667

  // 基础 FOV
  let fov = 28

  // 根据宽高比调整 FOV
  // 窄屏幕（手机竖屏）需要更大的 FOV 来显示更多内容
  if (aspect < 0.6) {
    fov = 22 // 非常窄的屏幕，增大 FOV 让卡片更大
  } else if (aspect < 0.8) {
    fov = 24 // 手机竖屏，增大 FOV 让卡片更大
  } else if (aspect < 1) {
    fov = 28 // 接近正方形
  } else if (aspect > 2) {
    fov = 32 // 超宽屏幕，减小 FOV 避免卡片太小
  } else if (aspect > 1.6) {
    fov = 30 // 宽屏
  }

  // 相机位置（z 轴距离根据屏幕尺寸调整）
  const camZ = mobile ? -74 : -77

  // 相机位置
  const camX = mobile ? 2 : 0
  const camY = mobile ? -24 : -14

  // 相机旋转（度）
  const rotX = mobile ? -200 : -192
  const rotZ = mobile ? -40 : -25

  return { fov, camX, camY, camZ, rotX, rotZ }
}

// ============================================================
// 主组件
// ============================================================

function WebGLCards() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const animRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })

  // 延迟显示（入场动画触发）
  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 1000)
    return () => clearTimeout(t)
  }, [])

  // WebGL 初始化和动画循环
  useEffect(() => {
    if (!containerRef.current || !isVisible) return
    const container = containerRef.current

    // --------------------------------------------------------
    // 1. 创建两个场景（源码使用两个独立的 scene）
    // --------------------------------------------------------
    const sceneShadow = new THREE.Scene() // 阴影场景
    const sceneTextured = new THREE.Scene() // 纹理场景

    // --------------------------------------------------------
    // 2. 创建两个相机（源码使用不同的 near/far 裁剪平面）
    // --------------------------------------------------------

    // 获取响应式相机参数
    const initialParams = getResponsiveCameraParams(container.clientWidth, container.clientHeight)

    /**
     * 阴影相机：near=69, far=200
     * 源码中阴影卡片距离相机约 70 单位，刚好在 near=69 的裁剪边缘
     * 这样阴影卡片只在特定距离范围内可见
     */
    const cameraShadow = new THREE.PerspectiveCamera(
      initialParams.fov,
      container.clientWidth / container.clientHeight,
      69, // near（源码精确值）
      200 // far（源码精确值）
    )
    cameraShadow.position.set(initialParams.camX, initialParams.camY, initialParams.camZ)
    cameraShadow.rotation.set(
      (Math.PI / 180) * initialParams.rotX,
      0,
      (Math.PI / 180) * initialParams.rotZ
    )

    /**
     * 纹理相机：near=0.1, far=75
     * 纹理卡片距离相机约 70 单位，在 far=75 的裁剪范围内
     * 这样纹理卡片可见，同时保持与阴影相机的分离
     */
    const cameraTextured = new THREE.PerspectiveCamera(
      initialParams.fov,
      container.clientWidth / container.clientHeight,
      0.1,
      75 // 略大于卡片距离，确保纹理卡片可见
    )
    cameraTextured.position.set(initialParams.camX, initialParams.camY, initialParams.camZ)
    cameraTextured.rotation.set(
      (Math.PI / 180) * initialParams.rotX,
      0,
      (Math.PI / 180) * initialParams.rotZ
    )

    // --------------------------------------------------------
    // 3. 创建两个渲染器（每个对应一个 canvas）
    // --------------------------------------------------------

    /**
     * 阴影渲染器：渲染橙色阴影卡片
     * 通过 CSS z-index 控制在 SVG 标题后面
     */
    const rendererShadow = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    rendererShadow.setSize(container.clientWidth, container.clientHeight)
    rendererShadow.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    rendererShadow.setClearColor(0x000000, 0) // 透明背景
    rendererShadow.domElement.style.position = 'absolute'
    rendererShadow.domElement.style.inset = '0'
    container.appendChild(rendererShadow.domElement)

    /**
     * 纹理渲染器：渲染带贴图的卡片
     * 通过 CSS z-index 控制在 SVG 标题前面
     */
    const rendererTextured = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    rendererTextured.setSize(container.clientWidth, container.clientHeight)
    rendererTextured.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    rendererTextured.setClearColor(0x000000, 0) // 透明背景
    rendererTextured.domElement.style.position = 'absolute'
    rendererTextured.domElement.style.inset = '0'
    container.appendChild(rendererTextured.domElement)

    // --------------------------------------------------------
    // 3.5 调试：相机位置标记
    // --------------------------------------------------------
    let cameraHelpers: THREE.Object3D[] = []
    if (DEBUG_CAMERA) {
      // 相机位置标记（小球体）
      const markerGeometry = new THREE.SphereGeometry(0.5, 16, 16)

      // 阴影相机标记（红色）
      const shadowMarkerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })
      const shadowMarker = new THREE.Mesh(markerGeometry, shadowMarkerMaterial)
      shadowMarker.position.copy(cameraShadow.position)
      sceneShadow.add(shadowMarker)
      cameraHelpers.push(shadowMarker)

      // 纹理相机标记（蓝色）
      const texturedMarkerMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff })
      const texturedMarker = new THREE.Mesh(markerGeometry, texturedMarkerMaterial)
      texturedMarker.position.copy(cameraTextured.position)
      sceneTextured.add(texturedMarker)
      cameraHelpers.push(texturedMarker)

      // 相机方向线（从相机位置沿视线方向）
      const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, -10),
      ])

      // 阴影相机方向线（红色虚线）
      const shadowLineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 })
      const shadowLine = new THREE.Line(lineGeometry.clone(), shadowLineMaterial)
      shadowLine.position.copy(cameraShadow.position)
      shadowLine.rotation.copy(cameraShadow.rotation)
      sceneShadow.add(shadowLine)
      cameraHelpers.push(shadowLine)

      // 纹理相机方向线（蓝色虚线）
      const texturedLineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff })
      const texturedLine = new THREE.Line(lineGeometry.clone(), texturedLineMaterial)
      texturedLine.position.copy(cameraTextured.position)
      texturedLine.rotation.copy(cameraTextured.rotation)
      sceneTextured.add(texturedLine)
      cameraHelpers.push(texturedLine)

      // 添加坐标轴辅助
      const axesShadow = new THREE.AxesHelper(3)
      axesShadow.position.copy(cameraShadow.position)
      sceneShadow.add(axesShadow)
      cameraHelpers.push(axesShadow)

      const axesTextured = new THREE.AxesHelper(3)
      axesTextured.position.copy(cameraTextured.position)
      sceneTextured.add(axesTextured)
      cameraHelpers.push(axesTextured)

      console.log('Camera Debug:', {
        shadow: { pos: cameraShadow.position, rot: cameraShadow.rotation },
        textured: { pos: cameraTextured.position, rot: cameraTextured.rotation },
      })
    }

    // --------------------------------------------------------
    // 4. 创建卡片网格
    // --------------------------------------------------------
    const texturedCards: THREE.Mesh[] = [] // 带贴图的卡片
    const shadowCards: THREE.Mesh[] = [] // 橙色阴影卡片

    /**
     * 阴影材质（源码: new THREE.MeshBasicMaterial({ color: "#B05A2E", side: DoubleSide })）
     * 橙色半透明阴影，与背景橙色形成层次感
     */
    const shadowMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#B05A2E'),
      side: THREE.DoubleSide,
    })

    // 注意：每张卡片需要独立的弯曲几何体（cardT 不同），在加载贴图后创建

    // --------------------------------------------------------
    // 5. 加载贴图并创建卡片
    // --------------------------------------------------------
    const loadPromises = CARD_IMAGES.map(
      (src) =>
        new Promise<HTMLImageElement>((resolve) => {
          const img = new Image()
          img.crossOrigin = 'anonymous'
          img.onload = () => resolve(img)
          // 贴图加载失败时用灰色占位
          img.onerror = () => {
            const c = document.createElement('canvas')
            c.width = 512
            c.height = 717
            const ctx = c.getContext('2d')!
            ctx.fillStyle = '#333'
            ctx.fillRect(0, 0, 512, 717)
            const fallbackImg = new Image()
            fallbackImg.src = c.toDataURL()
            fallbackImg.onload = () => resolve(fallbackImg)
          }
          img.src = src
        })
    )

    Promise.all(loadPromises).then((images) => {
      // 获取响应式卡片尺寸
      const cardSize = getResponsiveCardSize(container.clientWidth)

      // 为每张卡片创建纹理版本和阴影版本
      images.forEach((img, idx) => {
        const cardT = idx / CARD_IMAGES.length

        // 纹理卡片
        const texture = new THREE.Texture(img)
        texture.colorSpace = THREE.SRGBColorSpace // 正确的颜色空间
        texture.minFilter = THREE.LinearFilter // 线性过滤，避免锯齿
        texture.magFilter = THREE.LinearFilter
        texture.flipY = false // 不翻转 Y 轴
        texture.needsUpdate = true

        // 每张卡片创建独立的弯曲几何体（cardT 决定在圆形路径上的位置）
        const texturedGeometry = createCurvedCardGeometry(
          cardSize.cardWidth,
          cardSize.cardHeight,
          CARD_SEGMENTS,
          cardT,
          cardSize.radius
        )
        const texturedMaterial = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.DoubleSide, // 双面可见（卡片会旋转到背面）
          transparent: true, // 透明背景，露出下方的阴影和标题
        })

        const texturedMesh = new THREE.Mesh(texturedGeometry, texturedMaterial)
        sceneTextured.add(texturedMesh)
        texturedCards.push(texturedMesh)

        // 阴影卡片（每张卡片独立的弯曲几何体，不同材质）
        const shadowGeometry = createCurvedCardGeometry(
          cardSize.cardWidth,
          cardSize.cardHeight,
          CARD_SEGMENTS,
          cardT,
          cardSize.radius
        )
        const shadowMesh = new THREE.Mesh(shadowGeometry, shadowMaterial)
        sceneShadow.add(shadowMesh)
        shadowCards.push(shadowMesh)
      })

      // --------------------------------------------------------
      // 6. 动画循环
      // --------------------------------------------------------
      let lastTime = performance.now()
      let currentOffset = 0

      const animate = () => {
        animRef.current = requestAnimationFrame(animate)
        const now = performance.now()
        const dt = now - lastTime
        lastTime = now

        // 更新卡片在圆形路径上的偏移（源码: deltaTime * -5e-5）
        currentOffset += dt * ANIMATION_SPEED

        // 获取当前响应式卡片尺寸
        const currentCardSize = getResponsiveCardSize(container.clientWidth)

        // 每帧重新生成弯曲几何体（模拟 shader 的动态弯曲效果）
        // 源码中卡片沿圆形路径移动，弯曲形状随位置变化
        const regenerateCards = (cards: THREE.Mesh[]) => {
          cards.forEach((mesh, idx) => {
            const cardT = (((idx / CARD_IMAGES.length + currentOffset) % 1) + 1) % 1
            const newGeom = createCurvedCardGeometry(
              currentCardSize.cardWidth,
              currentCardSize.cardHeight,
              CARD_SEGMENTS,
              cardT,
              currentCardSize.radius
            )
            mesh.geometry.dispose()
            mesh.geometry = newGeom
          })
        }

        regenerateCards(texturedCards)
        regenerateCards(shadowCards)

        // --------------------------------------------------------
        // 7. 相机动画（响应式参数）
        // --------------------------------------------------------

        // 获取当前容器尺寸的响应式参数
        const currentParams = getResponsiveCameraParams(container.clientWidth, container.clientHeight)

        /**
         * 相机旋转跟随鼠标
         * 源码: rotation.z = Math.PI/180 * rotZ + (mouseX - 0.5) * 0.2
         * 鼠标在左侧时卡片组向右倾斜，右侧时向左倾斜
         */
        const rotZ = (Math.PI / 180) * currentParams.rotZ
        const rotX = (Math.PI / 180) * currentParams.rotX
        cameraShadow.rotation.z = cameraTextured.rotation.z = rotZ + (mouseRef.current.x - 0.5) * 0.2
        cameraShadow.rotation.x = cameraTextured.rotation.x = rotX

        /**
         * 相机位置（响应式调整）
         */
        cameraShadow.position.x = cameraTextured.position.x = currentParams.camX
        cameraShadow.position.y = cameraTextured.position.y = currentParams.camY

        // 调试：更新相机标记位置
        if (DEBUG_CAMERA && cameraHelpers.length > 0) {
          // 更新阴影相机标记（前4个：球体、球体、线、线）
          cameraHelpers[0].position.copy(cameraShadow.position) // 红色球体
          cameraHelpers[2].position.copy(cameraShadow.position) // 红色方向线
          cameraHelpers[2].rotation.copy(cameraShadow.rotation)
          cameraHelpers[4].position.copy(cameraShadow.position) // 红色坐标轴

          // 更新纹理相机标记
          cameraHelpers[1].position.copy(cameraTextured.position) // 蓝色球体
          cameraHelpers[3].position.copy(cameraTextured.position) // 蓝色方向线
          cameraHelpers[3].rotation.copy(cameraTextured.rotation)
          cameraHelpers[5].position.copy(cameraTextured.position) // 蓝色坐标轴
        }

        // --------------------------------------------------------
        // 8. 渲染（先阴影后纹理，保证层叠正确）
        // --------------------------------------------------------
        rendererShadow.render(sceneShadow, cameraShadow)
        rendererTextured.render(sceneTextured, cameraTextured)
      }

      animate()
    })

    // --------------------------------------------------------
    // 9. 事件处理
    // --------------------------------------------------------

    /** 鼠标移动：更新鼠标位置，用于相机旋转 */
    const onMouseMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect()
      mouseRef.current.x = (e.clientX - r.left) / r.width
      mouseRef.current.y = (e.clientY - r.top) / r.height
    }

    /** 窗口大小变化：更新相机和渲染器尺寸 */
    const onResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight

      // 更新渲染器尺寸
      rendererShadow.setSize(w, h)
      rendererTextured.setSize(w, h)

      // 获取响应式相机参数
      const params = getResponsiveCameraParams(w, h)

      // 更新相机参数
      cameraShadow.aspect = cameraTextured.aspect = w / h
      cameraShadow.fov = cameraTextured.fov = params.fov
      cameraShadow.updateProjectionMatrix()
      cameraTextured.updateProjectionMatrix()
    }

    container.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', onResize)

    // --------------------------------------------------------
    // 10. 清理（组件卸载时）
    // --------------------------------------------------------
    return () => {
      container.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(animRef.current)
      rendererShadow.dispose()
      rendererTextured.dispose()
      if (container.contains(rendererShadow.domElement)) {
        container.removeChild(rendererShadow.domElement)
      }
      if (container.contains(rendererTextured.domElement)) {
        container.removeChild(rendererTextured.domElement)
      }
    }
  }, [isVisible])

  return <div className={`${styles.webglCardsContainer} ${isVisible ? styles.visible : ''}`} ref={containerRef} />
}

export default WebGLCards
