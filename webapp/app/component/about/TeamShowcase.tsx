import Image from 'next/image';
import React from 'react';

interface TeamMember {
  name: string;
  role: string;
  speciality: string;
  image: string;
  experience: string;
  description: string;
  socialLinks?: {
    instagram?: string;
    linkedin?: string;
  };
}

interface TeamShowcaseProps {
  teamMembers?: TeamMember[];
  showOwner?: boolean;
}

const TeamShowcase: React.FC<TeamShowcaseProps> = ({
  teamMembers = [
    {
      name: "Emma Rodriguez",
      role: "Senior Nail Technician",
      speciality: "Nail Art & Design",
      experience: "6 years",
      image: "/api/placeholder/300/400",
      description: "Emma's artistic flair and attention to detail create stunning nail masterpieces that reflect each client's personality."
    },
    {
      name: "Lily Chen",
      role: "Aesthetician",
      speciality: "Skincare & Facials",
      experience: "4 years",
      image: "/api/placeholder/300/400",
      description: "Specializing in advanced skincare treatments, Lily helps clients achieve their healthiest, most radiant complexion."
    },
    {
      name: "Maya Patel",
      role: "Beauty Specialist",
      speciality: "Lash Extensions & Brows",
      experience: "5 years",
      image: "/api/placeholder/300/400",
      description: "Maya's expertise in enhancing natural features creates looks that are both dramatic and beautifully balanced."
    },
    {
      name: "Sofia Williams",
      role: "Wellness Therapist",
      speciality: "Massage & Relaxation",
      experience: "7 years",
      image: "/api/placeholder/300/400",
      description: "Sofia brings a holistic approach to beauty, focusing on relaxation and wellness alongside aesthetic treatments."
    }
  ],
  showOwner = false
}) => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-pink-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              Meet Our <span className="text-pink-600">Expert Team</span>
            </h2>
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-px bg-pink-400"></div>
              <div className="w-3 h-3 bg-pink-400 rounded-full mx-4"></div>
              <div className="w-16 h-px bg-pink-400"></div>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our talented team of professionals brings years of experience and genuine passion 
              for beauty to create exceptional experiences for every client.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="group relative"
                style={{
                  animation: `slideInUp 0.8s ease-out ${index * 0.2}s both`
                }}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  {/* Image Container */}
                  <div className="relative overflow-hidden">
                    <Image 
                      src={member.image}
                      alt={member.name}
                      height={400}
                      width={300}
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-pink-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Experience Badge */}
                    <div className="absolute top-4 right-4 bg-pink-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {member.experience}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {member.name}
                      </h3>
                      <p className="text-pink-600 font-medium text-sm mb-1">
                        {member.role}
                      </p>
                      <div className="inline-block bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs font-medium">
                        {member.speciality}
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed text-center mb-4">
                      {member.description}
                    </p>

                    {/* Skills or highlights */}
                    <div className="flex justify-center space-x-2">
                      {[...Array(5)].map((_, i) => (
                        <div 
                          key={i}
                          className="w-2 h-2 bg-pink-300 rounded-full opacity-60"
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Team Stats */}
          <div className="bg-gradient-to-r from-pink-100 via-white to-pink-100 rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600 mb-2">500+</div>
                <div className="text-gray-600 text-sm font-medium">Happy Clients</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600 mb-2">25+</div>
                <div className="text-gray-600 text-sm font-medium">Years Combined Experience</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600 mb-2">15+</div>
                <div className="text-gray-600 text-sm font-medium">Beauty Services</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600 mb-2">98%</div>
                <div className="text-gray-600 text-sm font-medium">Satisfaction Rate</div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-pink-100 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Ready to Meet Our Team?
              </h3>
              <p className="text-gray-600 mb-6">
                Book your appointment today and experience the difference our expert team can make.
              </p>
              <button className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-8 py-3 rounded-full font-medium hover:from-pink-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                Book Consultation
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(60px);
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

export default TeamShowcase;