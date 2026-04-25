'use client';
import { useState } from 'react';
import { BootScreen } from '../components/ui/BootScreen';
import { Navigation } from '../components/ui/Navigation';
import { Hero } from '../components/ui/Hero';
import { WorkCarousel } from '../components/ui/WorkCarousel';
import { About } from '../components/ui/About';
import { Contact } from '../components/ui/Contact';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <div>hello nextjs</div>
    </>
  )

  // return (
  //   <>
  //     {/* 启动加载画面 */}
  //     <BootScreen onComplete={() => setIsLoaded(true)} />

  //     {/* 滚动内容层 */}
  //     <div id="scroll-container" className="fixed inset-0 z-50 overflow-y-auto">
  //       <Navigation />
  //       <Hero />
  //       <WorkCarousel />
  //       <About />
  //       <Contact />
  //       {/* 撑开滚动高度 */}
  //       <div className="h-[400vh]" />
  //     </div>

  //     {/* 简化的 3D 层 */}
  //     {isLoaded && (
  //       <div className="fixed inset-0 z-40 pointer-events-none flex items-center justify-center">
  //         <div className="w-64 h-48 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700 shadow-2xl flex items-center justify-center">
  //           <div className="text-white/80 text-center">
  //             <div className="text-2xl font-bold mb-2">SHADER</div>
  //             <div className="text-sm opacity-70">3D Scene Placeholder</div>
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //   </>
  // );
}