'use client';
import { useState } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  color: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'eHealth Arena – 3D Showroom',
    description: 'developed in collaboration with Markus Reklambyrå',
    color: 'from-blue-600 to-purple-800'
  },
  {
    id: 2,
    title: 'Interactive Product',
    description: 'Interactive 3D product visualization',
    color: 'from-green-600 to-cyan-800'
  },
  {
    id: 3,
    title: 'Brand Experience',
    description: 'Immersive brand experience design',
    color: 'from-orange-600 to-red-800'
  },
];

export function WorkCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 项目切换
  const goTo = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next'
      ? (currentIndex + 1) % projects.length
      : (currentIndex - 1 + projects.length) % projects.length;
    setCurrentIndex(newIndex);
  };

  return (
    <section id="work" className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
          Selected Work
        </h2>
        <p className="text-xl text-white/70 mb-12">
          Browse our project carousel to explore our selected work.
        </p>
        
        <div className="carousel relative">
          <button 
            onClick={() => goTo('prev')}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          >
            ←
          </button>
          
          <div className={`aspect-video relative bg-gradient-to-br ${projects[currentIndex].color} rounded-xl shadow-2xl flex items-center justify-center`}>
            <div className="text-white/90 text-center p-8">
              <div className="text-4xl font-bold mb-4">
                {projects[currentIndex].title}
              </div>
              <div className="text-xl opacity-80">
                {projects[currentIndex].description}
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => goTo('next')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          >
            →
          </button>
          
          <div className="mt-4 text-center">
            <h3 className="text-xl font-bold text-white">
              {projects[currentIndex].title}
            </h3>
            <p className="text-white/70">
              {projects[currentIndex].description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}