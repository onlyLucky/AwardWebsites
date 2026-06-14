import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import './style.css'

interface CardData {
  name: string
  role: string
  color: number
}

const cardData: CardData[] = [
  { name: 'Robert Banat', role: 'Artist, US, Brooklyn', color: 0x1a1a1a },
  { name: 'Gelly Gryntaki', role: 'Curator, GB, London', color: 0x2a2a2a },
  { name: 'Martas Valentukonis', role: 'Artist, LT, Vilnius', color: 0x1a1a1a },
  { name: 'Sophie Wratzfeld', role: 'Curator, DE, Berlin', color: 0x2a2a2a },
  { name: 'Danny Van der Elst', role: 'Artist, NL, Amsterdam', color: 0x1a1a1a },
  { name: 'Farouk Alao', role: 'Artist, NG, Lagos', color: 0x2a2a2a },
  { name: 'Keita Melle', role: 'Artist, FR, Paris', color: 0x1a1a1a },
  { name: 'Isabela Galeano', role: 'Curator, CO, Bogota', color: 0x2a2a2a },
  { name: 'Thomas Oosterhof', role: 'Curator, NL, Amsterdam', color: 0x1a1a1a },
]

interface CardUserData {
  initialPosition: { x: number; y: number; z: number }
  initialRotation: { x: number; y: number; z: number }
  index: number
  floatOffset: number
  floatSpeed: number
}

function WebGLCards() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const cardsRef = useRef<THREE.Mesh[]>([])
  const animationRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!containerRef.current || !isVisible) return

    // Initialize scene
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Initialize camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 8
    camera.position.y = 1
    cameraRef.current = camera

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    )
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Create cards
    const cards: THREE.Mesh[] = []
    const cardWidth = 1.8
    const cardHeight = 2.6

    cardData.forEach((data, index) => {
      const geometry = new THREE.PlaneGeometry(cardWidth, cardHeight)
      const material = new THREE.MeshBasicMaterial({
        color: data.color,
        side: THREE.DoubleSide,
      })

      const card = new THREE.Mesh(geometry, material)

      // Initial stacked position
      card.position.x = (Math.random() - 0.5) * 2
      card.position.y = (Math.random() - 0.5) * 1
      card.position.z = -index * 0.3

      // Initial rotation
      card.rotation.x = (Math.random() - 0.5) * 0.3
      card.rotation.y = (Math.random() - 0.5) * 0.5
      card.rotation.z = (Math.random() - 0.5) * 0.2

      // Store initial state
      const userData: CardUserData = {
        initialPosition: { ...card.position },
        initialRotation: { ...card.rotation },
        index,
        floatOffset: Math.random() * Math.PI * 2,
        floatSpeed: 0.5 + Math.random() * 0.5,
      }
      card.userData = userData

      scene.add(card)
      cards.push(card)
    })

    cardsRef.current = cards

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1)
    scene.add(ambientLight)

    // Animation loop
    let time = 0
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate)
      time += 0.016

      // Card floating animation
      cards.forEach((card) => {
        const { initialPosition, floatOffset, floatSpeed } =
          card.userData as CardUserData
        card.position.y =
          initialPosition.y + Math.sin(time * floatSpeed + floatOffset) * 0.1
      })

      // Mouse parallax
      const targetRotationX = mouseRef.current.y * 0.1
      const targetRotationY = mouseRef.current.x * 0.1
      scene.rotation.x += (targetRotationX - scene.rotation.x) * 0.05
      scene.rotation.y += (targetRotationY - scene.rotation.y) * 0.05

      renderer.render(scene, camera)
    }

    animate()

    // Handle mouse move
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    }

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return
      camera.aspect =
        containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      )
    }

    containerRef.current.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove)
      }
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (rendererRef.current) {
        rendererRef.current.dispose()
      }
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement)
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
