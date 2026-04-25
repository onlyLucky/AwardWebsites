'use client';

export function Contact() {
  return (
    <section id="contact" className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
          Contact
        </h2>
        <p className="text-xl text-white/70 mb-12">
          Contact us about your digital project idea or general enquires. Let's interface, call us today!
        </p>
        
        <div className="space-y-8">
          <div>
            <p className="text-white/80">
              Reach out today to our CEO for new business enquiries at ceo@shader.se
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <a href="mailto:hello@shader.se" className="text-white hover:text-secondary transition-colors">
              hello@shader.se
            </a>
            <a href="https://cal.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-secondary transition-colors">
              Book a call on Cal.com
            </a>
          </div>
          
          <div className="flex flex-wrap gap-6">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-secondary transition-colors">
              LinkedIn
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-secondary transition-colors">
              Instagram
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-secondary transition-colors">
              X (Twitter)
            </a>
          </div>
          
          <div>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              Accessibility Statement
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}