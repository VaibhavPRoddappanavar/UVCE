import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-orange-100 via-red-50 to-yellow-100 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 text-orange-200 animate-pulse">
        <Sparkles className="h-8 w-8" />
      </div>
      <div className="absolute bottom-32 right-16 text-red-200 animate-pulse delay-700">
        <Sparkles className="h-6 w-6" />
      </div>
      <div className="absolute top-1/3 right-8 text-yellow-200 animate-pulse delay-1000">
        <Sparkles className="h-10 w-10" />
      </div>

      <div className="max-w-4xl mx-auto text-center">
        {/* Main headline */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold header-indian mb-6 leading-tight">
            Reviving
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent block">
              India's Folk Art
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-stone-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover the rich heritage of Indian folk traditions through authentic artworks, 
            connect with talented artisans, and support local communities.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="btn-indian px-8 py-4 font-semibold text-lg flex items-center gap-2">
            Explore Collection
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          
          <button className="btn-indian px-8 py-4 font-semibold text-lg" style={{background:'var(--muted-bg)',color:'var(--deep-maroon)',border:'1px solid var(--gold)'}}>
            Meet Artists
          </button>
        </div>

        {/* Stats or features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="text-3xl font-bold text-orange-500 mb-2">500+</div>
            <div className="text-stone-600">Authentic Artworks</div>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="text-3xl font-bold text-red-500 mb-2">200+</div>
            <div className="text-stone-600">Talented Artists</div>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="text-3xl font-bold text-yellow-600 mb-2">15+</div>
            <div className="text-stone-600">Art Forms</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-stone-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-stone-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;