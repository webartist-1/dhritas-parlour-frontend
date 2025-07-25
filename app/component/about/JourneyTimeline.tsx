import React from 'react';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: string;
  isHighlight?: boolean;
}

interface JourneyTimelineProps {
  events?: TimelineEvent[];
}

const JourneyTimeline: React.FC<JourneyTimelineProps> = ({
  events = [
    {
      year: "2012",
      title: "The Beginning",
      description: "Started my journey at the International Academy of Beauty Sciences, discovering my passion for aesthetic beauty and nail artistry.",
      icon: "🎓"
    },
    {
      year: "2014",
      title: "First Steps",
      description: "Joined an upscale salon in the city, learning advanced techniques and building relationships with discerning clients.",
      icon: "💅"
    },
    {
      year: "2016",
      title: "Skill Mastery",
      description: "Became a certified master aesthetician, specializing in advanced skincare treatments and luxury nail services.",
      icon: "✨",
      isHighlight: true
    },
    {
      year: "2018",
      title: "The Dream Realized",
      description: "Opened our beautiful salon, creating a sanctuary where beauty, comfort, and excellence come together.",
      icon: "🏢",
      isHighlight: true
    },
    {
      year: "2020",
      title: "Innovation & Growth",
      description: "Expanded services to include cutting-edge aesthetic treatments and wellness therapies, setting new standards in beauty care.",
      icon: "🚀"
    },
    {
      year: "2024",
      title: "Continued Excellence",
      description: "Today, we continue to evolve, embracing new technologies and techniques while maintaining our commitment to personalized, luxury service.",
      icon: "💎",
      isHighlight: true
    }
  ]
}) => {
  return (
    <section className="py-20 bg-gradient-to-b from-pink-50 to-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              Our <span className="text-pink-600">Journey</span>
            </h2>
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-px bg-pink-400"></div>
              <div className="w-3 h-3 bg-pink-400 rounded-full mx-4"></div>
              <div className="w-16 h-px bg-pink-400"></div>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From humble beginnings to becoming a premier destination for beauty and wellness, 
              every step of our journey has been guided by passion and dedication to excellence.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Central line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-pink-200 via-pink-400 to-pink-200 h-full rounded-full"></div>
            
            {events.map((event, index) => (
              <div 
                key={index} 
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Content Card */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                  <div 
                    className={`bg-white rounded-2xl p-6 shadow-xl border-2 ${
                      event.isHighlight ? 'border-pink-300 bg-gradient-to-br from-pink-50 to-white' : 'border-pink-100'
                    } transform hover:scale-105 transition-all duration-300`}
                  >
                    <div className="flex items-center mb-4">
                      <div className="text-2xl mr-3">{event.icon}</div>
                      <div>
                        <div className="text-2xl font-bold text-pink-600">{event.year}</div>
                        <div className={`text-lg font-semibold ${
                          event.isHighlight ? 'text-pink-700' : 'text-gray-800'
                        }`}>
                          {event.title}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Central Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <div className={`w-6 h-6 rounded-full border-4 ${
                    event.isHighlight 
                      ? 'bg-pink-500 border-pink-600 animate-pulse' 
                      : 'bg-white border-pink-400'
                  } shadow-lg`}></div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="w-5/12"></div>
              </div>
            ))}
          </div>

          {/* Bottom decoration */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i}
                  className="w-2 h-2 bg-pink-400 rounded-full opacity-60 animate-bounce"
                  style={{ animationDelay: `${i * 0.1}s` }}
                ></div>
              ))}
            </div>
            <p className="mt-6 text-gray-500 italic">
              And the journey continues...
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;