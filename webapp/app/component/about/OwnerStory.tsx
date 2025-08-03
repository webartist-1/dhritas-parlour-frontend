import Image from 'next/image';
import React from 'react';
import basicInfo from "../../constants/BasicInfo";

interface OwnerStoryProps {
  ownerName?: string;
  ownerTitle?: string;
  ownerImage?: string;
  story?: string[];
  yearsExperience?: number;
}

const OwnerStory: React.FC<OwnerStoryProps> = ({
  ownerName = basicInfo.ownerName,
  ownerTitle = basicInfo.ownerTitle,
  ownerImage = "/api/placeholder/400/500",
  story = [
    `
I’m Drita, founder of Drita’s Aesthetics & SPMU Brows, based in London. With years of advanced aesthetics experience and VTCT qualifications (Levels 3–7 in Beauty Therapy, SPMU, Skin Peels & Microneedling, and Aesthetic Practice), I offer expert treatments tailored to you.

I specialise in IPL skin rejuvenation, targeted boosters, and advanced thread lifts (Mono, Screw, Cog) for natural tightening, added volume, and lifted contours.

At my London salon, you’ll experience a welcoming, regulated environment equipped with modern technology, where personalised care and proven results come first—so you can enjoy clearer skin, defined brows, and lasting confidence.
`
  ],
  yearsExperience = 12
}) => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Owner Image */}
            <div className="relative order-2 lg:order-1">
              <div className="relative">
                {/* Decorative frame */}
                <div className="absolute -inset-4 bg-gradient-to-br from-pink-200 to-pink-100 rounded-2xl transform rotate-3"></div>
                <div className="relative bg-white p-2 rounded-2xl shadow-2xl">
                  <Image 
                    src={ownerImage}
                    alt={ownerName}
                    height={500}
                    width={400}
                    className="w-full h-96 lg:h-[500px] object-cover rounded-xl"
                  />
                  
                  {/* Floating stats card */}
                  <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-6 border border-pink-100">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-pink-600 mb-1">{yearsExperience}+</div>
                      <div className="text-sm text-gray-600 font-medium">Years Experience</div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-8 -left-8 w-16 h-16 bg-pink-200 rounded-full opacity-60"></div>
                <div className="absolute -bottom-4 -left-6 w-12 h-12 bg-pink-300 rounded-full opacity-40"></div>
              </div>
            </div>
            
            {/* Story Content */}
            <div className="order-1 lg:order-2">
              <div className="mb-8">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                  Meet <span className="text-pink-600">{ownerName.split(' ')[0]}</span>
                </h2>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-px bg-pink-400 mr-4"></div>
                  <p className="text-pink-600 font-medium italic">{ownerTitle}</p>
                </div>
              </div>
              
              <div className="space-y-6">
                {story.map((paragraph, index) => (
                  <p 
                    key={index}
                    className="text-gray-600 leading-relaxed text-lg"
                    style={{
                      opacity: 0,
                      animation: `fadeInUp 0.8s ease-out ${index * 0.2}s forwards`
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              
              {/* Signature or quote */}
              <div className="mt-8 pt-6 border-t border-pink-100">
                <blockquote className="text-pink-600 italic text-lg font-medium">
                  Life is not perfect, but your nails can be
                </blockquote>
                <div className="mt-4 flex items-center">
                  <div className="text-gray-800 font-semibold whitespace-nowrap">{ownerName}</div>
                  <div className="w-8 h-px bg-pink-400 mx-4"></div>
                  <div className="text-gray-500 text-sm">{ownerTitle}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
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

export default OwnerStory;