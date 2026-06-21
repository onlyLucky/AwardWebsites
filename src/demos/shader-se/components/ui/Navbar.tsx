import { useState, useEffect } from 'react'
import { usePagesStore, SECTIONS, type SectionId } from '../../store/usePagesStore'
import { useScrollStore } from '../../store/useScrollStore'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const currentSection = usePagesStore((state) => state.currentSection)
  const scrollToSection = usePagesStore((state) => state.scrollToSection)
  const scrollTo = useScrollStore((state) => state.scrollTo)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (sectionId: SectionId) => {
    scrollToSection(sectionId)

    // 计算目标滚动位置
    const sectionIndex = SECTIONS.findIndex((s) => s.id === sectionId)
    const targetScroll = sectionIndex * window.innerHeight

    scrollTo(targetScroll, {
      duration: 1.5,
      offset: 0,
    })
  }

  return (
    <nav className={`shader-se-navbar ${isScrolled ? 'shader-se-navbar--scrolled' : ''}`}>
      <a href="/" className="shader-se-navbar__logo">
        SHADER
      </a>
      <ul className="shader-se-navbar__links">
        {SECTIONS.map((section) => (
          <li key={section.id}>
            <a
              className={`shader-se-navbar__link ${
                currentSection === section.id ? 'shader-se-navbar__link--active' : ''
              }`}
              onClick={() => handleNavClick(section.id)}
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
