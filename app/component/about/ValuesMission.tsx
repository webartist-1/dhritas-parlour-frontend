import React from 'react';

interface Value {
  icon: string;
  title: string;
  description: string;
  color: string;
}

interface ValuesMissionProps {
  mission?: string;
  vision?: string;
  values?: Value[];
}

const ValuesMission: React.FC<ValuesMissionProps> = ({
  mission = "To provide exceptional beauty services that enhance natural beauty while creating a luxurious, welcoming experience that leaves every client feeling confident, pampered, and absolutely radiant.",
  vision = "To be the premier destination for beauty and wellness, setting the standard for excellence in aesthetic care while building lasting relationships with our clients through trust, expertise, and personalized service.",
  values = [
    {
      icon: "✨",
      title: "Excellence",
      description: "We strive for perfection in every service, using only the finest products and latest techniques to deliver outstanding results.",
      color: "pink"
    },
    {
      icon: "💖",
      title: "Personalized Care",
      description: "Every client is unique, and we tailor our services to meet individual needs, preferences, and lifestyle.",
      color: "rose"
    },
    {
      icon: "🌸",
      title: "Luxury Experience",
      description: "From the moment you step in, we create an atmosphere of elegance, comfort, and indulgence.",
      color: "pink"
    },
    {
      icon: "🤝",
      title: "Trust & Integrity",
      description: "We build relationships based on honesty, transparency, and genuine care for our clients' wellbeing.",
      color: "rose"
    },
    {
      icon: "🎯",
      title: "Innovation",
      description: "We continuously evolve, embracing new technologies and techniques to stay at the forefront of beauty.",
      color: "pink"
    },
    {
      icon: "🌿",
      title: "Wellness Focus",
      description: "Beauty comes from within, and we promote holistic wellness alongside our aesthetic services.",
      color: "rose"
    }
  ]
}) => {
  const getColorClasses = (color: string) => {
    return color === 'pink' 
      ? 'from-pink-100 to-pink-50 border-pink-200 text-pink-700'
      : 'from-rose-100 to-rose-50 border-rose-200 text-rose-700';
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Mission & Vision */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            {/* Mission */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-pink-100 to-transparent rounded-3xl opacity-50"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-lg border border-pink-100">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
                  <div className="w-16 h-1 bg-pink-400 mx-auto rounded-full"></div>
                </div>
                <p className="text-gray-600 leading-relaxed text-center">
                  {mission}
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-rose-100 to-transparent rounded-3xl opacity-50"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-lg border border-rose-100">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">🌟</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
                  <div className="w-16 h-1 bg-rose-400 mx-auto rounded-full"></div>
                </div>
                <p className="text-gray-600 leading-relaxed text-center">
                  {vision}
                </p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              Our <span className="text-pink-600">Values</span>
            </h2>
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-px bg-pink-400"></div>
              <div className="w-4 h-4 bg-pink-400 rounded-full mx-4 animate-pulse"></div>
              <div className="w-20 h-px bg-pink-400"></div>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do and shape the experience we create for our clients.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="group relative"
                style={{
                  animation: `fadeInUp 0.8s ease-out ${index * 0.1}s both`
                }}
              >
                <div className={`bg-gradient-to-br ${getColorClasses(value.color)} p-8 rounded-2xl border-2 h-full transform group-hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}>
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {value.icon}
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 mb-2">
                      {value.title}
                    </h4>
                    <div className={`w-12 h-1 ${value.color === 'pink' ? 'bg-pink-400' : 'bg-rose-400'} mx-auto rounded-full`}></div>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-center text-sm">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Quote */}
          <div className="text-center mt-20">
            <div className="max-w-3xl mx-auto">
              <blockquote className="text-2xl lg:text-3xl text-gray-700 italic font-light mb-6">
                Beauty begins the moment you decide to be yourself
              </blockquote>
              <div className="flex items-center justify-center">
                <div className="w-12 h-px bg-pink-400"></div>
                <div className="text-pink-600 font-medium px-4">Our Philosophy</div>
                <div className="w-12 h-px bg-pink-400"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default ValuesMission;