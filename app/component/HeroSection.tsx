import React from 'react';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title = "Our Services",
  subtitle = "Experience the Art of Beauty",
  description = "Discover our comprehensive range of premium beauty treatments designed to enhance your natural beauty"
}) => {
  return (
    <section className="relative bg-gradient-to-br from-pink-50 via-white to-pink-100 py-20 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-pink-200 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-pink-300 rounded-full opacity-20 animate-bounce"></div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Animated Title */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent">
              {title}
            </span>
          </h1>

          {/* Subtitle with decorative line */}
          <div className="flex items-center justify-center mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent flex-1 max-w-xs"></div>
            <h2 className="text-xl md:text-2xl text-gray-600 italic px-6 font-light">
              {subtitle}
            </h2>
            <div className="h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent flex-1 max-w-xs"></div>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>

          {/* Decorative flower elements */}
          <div className="flex justify-center mt-12 space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-pink-400 rounded-full opacity-60"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animation: 'pulse 2s infinite'
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-pink-400 rounded-full opacity-50 animate-ping"></div>
      <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-pink-300 rounded-full opacity-40 animate-pulse"></div>
    </section>
  );
};

export default HeroSection;