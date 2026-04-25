'use client';

import { Navigation } from '../../components/ui/Navigation';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navigation />

      <section className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 text-white text-center max-w-5xl mx-auto leading-tight">
            Making Digital Storytelling More Playful, Powerful, and Alive
          </h1>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-20">
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                Shader is a creative development studio specialized in building interactive 3D and AI solutions for the web. Serious about business, based in Sweden, and working with brands, agencies and designers worldwide.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 md:gap-16">
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white">Plugged into the Future</h2>
                <p className="text-white/70 leading-relaxed">
                  While we are a small team of creative engineers, we have a hand-picked network of collaborators: designers, 3D artists, copywriters, animators, and creative technologists.
                </p>
                <p className="text-white/70 leading-relaxed">
                  This modular approach means we can scale and adapt to each challenge. Whether it is a WebGL experiment, an interactive product visualization, a mobile app, or an AI-driven experience, we help bold brands stand out.
                </p>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white">What We Build</h2>
                <p className="text-white/70 leading-relaxed">
                  We build storytelling platforms that demand attention and reward curiosity. We push digital mediums to places you have not seen before, and have fun doing it.
                </p>
                <p className="text-white/70 leading-relaxed">
                  Beyond code, we offer 3D design and animation services. Whether it is prototyping an idea, launching an augmented reality experience, or bringing high-fidelity visuals to life.
                </p>
              </div>
            </div>

            <div className="mt-20 md:mt-32 py-16 border-y border-white/10">
              <p className="text-lg md:text-xl text-white/80 leading-relaxed text-center max-w-3xl mx-auto">
                Shader bridges the gap between creative ambition and technical execution. Our process is collaborative, transparent, and results-driven.
              </p>
            </div>

            <div className="mt-20 md:mt-32">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">Trusted By</h2>
              <p className="text-white/70 leading-relaxed text-center max-w-3xl mx-auto mb-12">
                We have had the benefit of working with a large pool of great clients throughout the years. Our partnerships range from some of the most recognizable Swedish brands to international innovators.
              </p>

              <div className="grid grid-cols-3 md:grid-cols-5 gap-8 opacity-50">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="aspect-[3/2] bg-white/10 rounded-lg flex items-center justify-center">
                    <span className="text-white/30 text-sm">Logo {i + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-20 md:mt-32 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Build Something Amazing?
              </h2>
              <p className="text-white/70 leading-relaxed max-w-2xl mx-auto mb-10">
                We leverage state-of-the-art technology to give your brand a decisive competitive advantage. Whether disrupting the market with paradigm-shifting 3D experiences or streamlining operations with cutting-edge AI tools, we deliver measurable results.
              </p>
              <a
                href="/contact"
                className="inline-block px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-white font-bold text-xl">SHADER</div>
            <div className="text-white/50 text-sm">
              © 2026 Shader. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-white/70 hover:text-white transition-colors">Twitter</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
