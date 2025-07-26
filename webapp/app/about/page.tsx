"use client";

import OwnerStory from "../component/about/OwnerStory";
import ValuesMission from "../component/about/ValuesMission";
import HeroSection from "../component/HeroSection";

// Main About Page Component
const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection
        title="About Our Story"
        subtitle="Where Beauty Meets Perfection"
        description="Discover the passion and expertise behind our luxury beauty sanctuary"
      />
      <OwnerStory />
      <ValuesMission />
    </div>
  );
};

export default AboutPage;