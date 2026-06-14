import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import './style.css'

import card1 from './images/Card-1.png'
import card2 from './images/Card-2.png'
import card3 from './images/Card-3.png'
import card4 from './images/Card-4.png'
import card5 from './images/Card-5.png'
import card6 from './images/Card-6.png'
import card7 from './images/Card-7.png'
import card8 from './images/Card-8.png'
import card9 from './images/Card-9.png'

const CARD_IMAGES = [card1, card2, card3, card4, card5, card6, card7, card8, card9]

// 源码参数
const CARD_WIDTH = 9
const CARD_HEIGHT = 12.6
const RADIUS = 15
const ANIMATION_SPEED = -5e-5

// 圆形路径上的点、切线、法线、副法线
function getCurvePoint(t: number) {
  const angle = t * Math.PI * 2
  const pos = new THREE.Vector3(Math.cos(angle) * RADIUS, 0, Math.sin(angle) * RADIUS)
  const tangent = new THREE.Vector3(-Math.sin(angle), 0, Math.cos(angle)).normalize()
  const normal = new THREE.Vector3(0, 1, 0)
  const binormal = new THREE.Vector3().crossVectors(tangent, normal).normalize()
  return { pos, tangent, normal, binormal }
}

// 为每张卡片创建沿圆形弯曲的几何体
function createCurvedCardGeometry(
  width: number,
  height: number,
  segments: number,
  cardT: number
): THREE.BufferGeometry {
  const geometry = new THREE.PlaneGeometry(width, height, segments, 1)
  const pos = geometry.attributes.position
  const curveLen = Math.PI * 2 * RADIUS // 圆周长
  const spineOffset = width / 2 // 源码 spineOffset: 161 (卡片中心对齐)
  const spineLength = curveLen // 源码 spineLength: 400

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i)
    const y = pos.getY(i)

    // 根据顶点 x 坐标计算在曲线上的位置 (源码: spinePortion = (worldPos.x + spineOffset) / spineLength)
    const spinePortion = (x + spineOffset) / spineLength
    const curveT = (spinePortion + cardT) % 1
    const { pos: curvePos, tangent, normal, binormal } = getCurvePoint(curveT)

    // 源码 shader: transformed = basis * vec3(x * xWeight, y, z) + spinePos
    // xWeight = 0 (bend mode), 所以 x 不参与
    const basis = new THREE.Matrix3()
    basis.set(
      tangent.x, tangent.y, tangent.z,
      normal.x, normal.y, normal.z,
      binormal.x, binormal.y, binormal.z
    )

    const localPos = new THREE.Vector3(0, y, 0) // xWeight=0, x 不参与
    localPos.applyMatrix3(basis)
    localPos.add(curvePos)

    pos.setXYZ(i, localPos.x, localPos.y, localPos.z)
  }

  pos.needsUpdate = true
  geometry.computeVertexNormals()
  return geometry
}

// 卡片在圆形上的位置
function getCardPosition(t: number): THREE.Vector3 {
  const { pos } = getCurvePoint(t)
  return pos.clone()
}

function isMobile(): boolean {
  return window.innerWidth <= 667
}

function WebGLCards() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const animRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 1000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!containerRef.current || !isVisible) return
    const container = containerRef.current

    // 两个场景
    const sceneShadow = new THREE.Scene()
    const sceneTextured = new THREE.Scene()

    // 相机 - 源码参数: 阴影 near=69 far=200, 纹理 near=0.1 far=69
    const cameraShadow = new THREE.PerspectiveCamera(28, container.clientWidth / container.clientHeight, 69, 200)
    cameraShadow.position.set(0, -14, -70)
    cameraShadow.rotation.set((Math.PI / 180) * -192, 0, (Math.PI / 180) * -25)

    const cameraTextured = new THREE.PerspectiveCamera(28, container.clientWidth / container.clientHeight, 0.1, 69)
    cameraTextured.position.set(0, -14, -70)
    cameraTextured.rotation.set((Math.PI / 180) * -192, 0, (Math.PI / 180) * -25)

    // 渲染器
    const rendererShadow = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    rendererShadow.setSize(container.clientWidth, container.clientHeight)
    rendererShadow.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    rendererShadow.setClearColor(0x000000, 0)
    rendererShadow.domElement.style.position = 'absolute'
    rendererShadow.domElement.style.inset = '0'
    container.appendChild(rendererShadow.domElement)

    const rendererTextured = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    rendererTextured.setSize(container.clientWidth, container.clientHeight)
    rendererTextured.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    rendererTextured.setClearColor(0x000000, 0)
    rendererTextured.domElement.style.position = 'absolute'
    rendererTextured.domElement.style.inset = '0'
    container.appendChild(rendererTextured.domElement)

    const texturedCards: THREE.Mesh[] = []
    const shadowCards: THREE.Mesh[] = []

    // 阴影材质 (源码: color #B05A2E)
    const shadowMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#B05A2E'),
      side: THREE.DoubleSide,
    })

    // 加载图片并创建卡片
    const loadPromises = CARD_IMAGES.map(
      (src) =>
        new Promise<HTMLImageElement>((resolve) => {
          const img = new Image()
          img.crossOrigin = 'anonymous'
          img.onload = () => resolve(img)
          img.onerror = () => {
            const c = document.createElement('canvas')
            c.width = 512; c.height = 717
            const ctx = c.getContext('2d')!
            ctx.fillStyle = '#333'; ctx.fillRect(0, 0, 512, 717)
            const fallbackImg = new Image()
            fallbackImg.src = c.toDataURL()
            fallbackImg.onload = () => resolve(fallbackImg)
          }
          img.src = src
        })
    )

    Promise.all(loadPromises).then((images) => {
      images.forEach((img, idx) => {
        const cardT = idx / CARD_IMAGES.length

        // 纹理卡片
        const texture = new THREE.Texture(img)
        texture.colorSpace = THREE.SRGBColorSpace
        texture.minFilter = THREE.LinearFilter
        texture.magFilter = THREE.LinearFilter
        texture.flipY = false // 不翻转 Y 轴
        texture.needsUpdate = true

        const texturedGeometry = createCurvedCardGeometry(CARD_WIDTH, CARD_HEIGHT, 10, cardT)
        const texturedMaterial = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.DoubleSide,
          transparent: true,
        })
        const texturedMesh = new THREE.Mesh(texturedGeometry, texturedMaterial)
        sceneTextured.add(texturedMesh)
        texturedCards.push(texturedMesh)

        // 阴影卡片
        const shadowGeometry = createCurvedCardGeometry(CARD_WIDTH, CARD_HEIGHT, 10, cardT)
        const shadowMesh = new THREE.Mesh(shadowGeometry, shadowMaterial)
        sceneShadow.add(shadowMesh)
        shadowCards.push(shadowMesh)
      })

      let lastTime = performance.now()
      let currentOffset = 0

      const animate = () => {
        animRef.current = requestAnimationFrame(animate)
        const now = performance.now()
        const dt = now - lastTime
        lastTime = now

        currentOffset += dt * ANIMATION_SPEED

        // 重新生成每帧的弯曲几何体 (模拟 shader 动态弯曲)
        texturedCards.forEach((mesh, idx) => {
          const cardT = ((idx / CARD_IMAGES.length + currentOffset) % 1 + 1) % 1
          const newGeom = createCurvedCardGeometry(CARD_WIDTH, CARD_HEIGHT, 10, cardT)
          mesh.geometry.dispose()
          mesh.geometry = newGeom
        })

        shadowCards.forEach((mesh, idx) => {
          const cardT = ((idx / CARD_IMAGES.length + currentOffset) % 1 + 1) % 1
          const newGeom = createCurvedCardGeometry(CARD_WIDTH, CARD_HEIGHT, 10, cardT)
          mesh.geometry.dispose()
          mesh.geometry = newGeom
        })

        // 相机旋转 (源码参数)
        const mobile = isMobile()
        const rotZ = (Math.PI / 180) * (mobile ? -38 : -25)
        const rotX = (Math.PI / 180) * (mobile ? -200 : -192)
        cameraShadow.rotation.z = cameraTextured.rotation.z = rotZ + (mouseRef.current.x - 0.5) * 0.2
        cameraShadow.rotation.x = cameraTextured.rotation.x = rotX

        const camX = mobile ? 4 : 0
        const camY = mobile ? -17 : -14
        cameraShadow.position.x = cameraTextured.position.x = camX
        cameraShadow.position.y = cameraTextured.position.y = camY

        rendererShadow.render(sceneShadow, cameraShadow)
        rendererTextured.render(sceneTextured, cameraTextured)
      }

      animate()
    })

    const onMouseMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect()
      mouseRef.current.x = (e.clientX - r.left) / r.width
      mouseRef.current.y = (e.clientY - r.top) / r.height
    }

    const onResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      cameraShadow.aspect = cameraTextured.aspect = w / h
      cameraShadow.updateProjectionMatrix()
      cameraTextured.updateProjectionMatrix()
      rendererShadow.setSize(w, h)
      rendererTextured.setSize(w, h)
    }

    container.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', onResize)

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

  return (
    <div
      className={`webgl-cards-container ${isVisible ? 'visible' : ''}`}
      ref={containerRef}
    />
  )
}

export default WebGLCards
