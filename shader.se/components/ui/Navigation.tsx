'use client';
import { useState, useEffect } from 'react';
import { Lenis } from 'lenis';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const lenisRef = useState<Lenis | null>(null);

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

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center p-6">
        <button onClick={() => scrollTo('home')} className="logo text-white text-xl font-bold">
          SHADER
        </button>
        <button onClick={() => setIsOpen(!isOpen)} className="hamburger text-white text-2xl">
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