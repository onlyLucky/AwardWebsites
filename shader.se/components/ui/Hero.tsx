'use client';

export function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-white">
          A Creative Development Studio, Plugged into the Future
        </h1>
        <p className="text-xl text-white/70 mb-12">
          Scroll to Inspect Our Closed Deals
        </p>
        <div className="animate-bounce">
          <svg className="w-8 h-8 text-white mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}