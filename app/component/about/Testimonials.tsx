import Image from 'next/image';
import React, { useState } from 'react';

interface Testimonial {
  id: number;
  name: string;
  service: string;
  rating: number;
  comment: string;
  image?: string;
  location?: string;
  date?: string;
}

interface TestimonialsProps {
  testimonials?: Testimonial[];
}

const Testimonials: React.FC<TestimonialsProps> = ({
  testimonials = [
    {
      id: 1,
      name: "Jessica Martinez",
      service: "Nail Art & Manicure",
      rating: 5,
      comment: "Absolutely incredible experience! The attention to detail is unmatched, and my nails have never looked better. The atmosphere is so relaxing and luxurious.",
      image: "/api/placeholder/80/80",
      location: "Downtown",
      date: "2 weeks ago"
    },
    {
      id: 2,
      name: "Amanda Foster",
      service: "Facial Treatment",
      rating: 5,
      comment: "Sarah and her team are amazing! My skin has never felt so smooth and radiant. The personalized treatment plan they created for me has been life-changing.",
      image: "/api/placeholder/80/80",
      location: "Midtown",
      date: "1 month ago"
    },
    {
      id: 3,
      name: "Rachel Thompson",
      service: "Lash Extensions",
      rating: 5,
      comment: "I've been coming here for over a year and every visit exceeds my expectations. The quality of service and the results are consistently outstanding.",
      image: "/api/placeholder/80/80",
      location: "Uptown",
      date: "3 days ago"
    },
    {
      id: 4,
      name: "Maria Rodriguez",
      service: "Full Beauty Package",
      rating: 5,
      comment: "From the moment I walked in, I felt pampered and cared for. The team's expertise and warm hospitality make this place truly special.",
      image: "/api/placeholder/80/80",
      location: "Westside",
      date: "1 week ago"
    },
    {
      id: 5,
      name: "Lauren Davis",
      service: "Wellness Massage",
      rating: 5,
      comment: "The most relaxing and rejuvenating experience! The combination of beauty treatments and wellness services is exactly what I needed.",
      image: "/api/placeholder/80/80",
      location: "Downtown",
      date: "5 days ago"
    },
    {
      id: 6,
      name: "Nicole Wilson",
      service: "Eyebrow Shaping",
      rating: 5,
      comment: "Perfect results every time! The precision and artistry in shaping my brows has completely transformed my look. Highly recommend!",
      image: "/api/placeholder/80/80",
      location: "Eastside",
      date: "2 weeks ago"
    }
  ]
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const testimonialsPerView = 3;
  const totalSlides = Math.ceil(testimonials.length / testimonialsPerView);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <span 
        key={i} 
        className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

  const getCurrentTestimonials = () => {
    const start = currentSlide * testimonialsPerView;
    return testimonials.slice(start, start + testimonialsPerView);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-pink-50 to-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-pink-200 rounded-full opacity-20 animate-float"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-pink-300 rounded-full opacity-30 animate-float-delayed"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              What Our <span className="text-pink-600">Clients Say</span>
            </h2>
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-px bg-pink-400"></div>
              <div className="w-3 h-3 bg-pink-400 rounded-full mx-4 animate-pulse"></div>
              <div className="w-16 h-px bg-pink-400"></div>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Don&#39;t just take our word for it - hear from our amazing clients who&#39;ve experienced 
              the transformative power of our beauty and wellness services.
            </p>
          </div>

          {/* Testimonials Carousel */}
          <div className="relative">
            {/* Navigation Buttons */}
            <button 
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-pink-50 group"
            >
              <svg className="w-6 h-6 text-pink-600 group-hover:text-pink-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>

            <button 
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-pink-50 group"
            >
              <svg className="w-6 h-6 text-pink-600 group-hover:text-pink-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>

            {/* Testimonials Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {getCurrentTestimonials().map((testimonial, index) => (
                <div 
                  key={testimonial.id}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-pink-100"
                  style={{
                    animation: `fadeInScale 0.6s ease-out ${index * 0.2}s both`
                  }}
                >
                  {/* Header */}
                  <div className="flex items-center mb-4">
                    <Image 
                      src={testimonial.image || "/api/placeholder/80/80"}
                      alt={testimonial.name}
                      height={80}
                      width={80}
                      className="rounded-full object-cover mr-4 border-2 border-pink-200"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                      <p className="text-sm text-pink-600">{testimonial.service}</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    {renderStars(testimonial.rating)}
                    <span className="ml-2 text-sm text-gray-500">({testimonial.rating}/5)</span>
                  </div>

                  {/* Comment */}
                  <p className="text-gray-600 leading-relaxed mb-4 italic">
                    {testimonial.comment}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-pink-100">
                    <span>{testimonial.location}</span>
                    <span>{testimonial.date}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-12 space-x-2">
              {[...Array(totalSlides)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index 
                      ? 'bg-pink-500 w-8' 
                      : 'bg-pink-200 hover:bg-pink-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Overall Rating Summary */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-pink-100 via-white to-pink-100 rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-8 mb-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-pink-600 mb-2">4.9</div>
                  <div className="flex justify-center mb-2">
                    {renderStars(5)}
                  </div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </div>
                <div className="w-px h-16 bg-pink-200"></div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-pink-600 mb-2">500+</div>
                  <div className="text-sm text-gray-600">Happy Clients</div>
                </div>
              </div>
              <p className="text-gray-600">
                Based on verified reviews from our valued clients
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-180deg); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;