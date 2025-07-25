"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, MapPin, Phone, Mail, Clock, Sparkles, Heart, Crown, Users, ArrowRight, Quote, Calendar, Award, Shield, Zap } from "lucide-react";

const HomePage = () => {
    // Hero Carousel State
    const [currentSlide, setCurrentSlide] = useState(0);

    const heroSlides = [
        {
            id: 1,
            title: "Transform Your Beauty",
            subtitle: "Professional Beauty Treatments",
            description: "Experience the ultimate in luxury beauty treatments with our expert team and state-of-the-art facilities.",
            image: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=1200&h=600&fit=crop",
            cta: "Book Consultation",
            accent: "from-rose-600 to-pink-600"
        },
        {
            id: 2,
            title: "Anti-Aging Excellence",
            subtitle: "Turn Back Time Naturally",
            description: "Discover our revolutionary anti-wrinkle treatments and dermal fillers for a more youthful appearance.",
            image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1200&h=600&fit=crop",
            cta: "Explore Treatments",
            accent: "from-purple-600 to-indigo-600"
        },
        {
            id: 3,
            title: "Skin Perfection",
            subtitle: "Advanced Skincare Solutions",
            description: "Professional facials, skin boosters, and advanced treatments for radiant, healthy skin.",
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=600&fit=crop",
            cta: "View Services",
            accent: "from-emerald-600 to-teal-600"
        }
    ];

    // Auto-advance carousel
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [heroSlides.length]);

    // Featured Services
    const featuredServices = [
        {
            name: "Anti-Wrinkle Treatment",
            category: "Anti-Wrinkle",
            price: "£150",
            duration: "45min",
            description: "Professional botulinum toxin treatment for smoother, younger-looking skin",
            image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&h=300&fit=crop",
            icon: Zap,
            popular: true
        },
        {
            name: "Dermal Fillers",
            category: "Enhancement",
            price: "£220",
            duration: "45min",
            description: "Natural-looking lip and facial enhancement with premium fillers",
            image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
            icon: Sparkles,
            popular: false
        },
        {
            name: "HydraFacial",
            category: "Skincare",
            price: "£80",
            duration: "60min",
            description: "Multi-step treatment for instant glow and deep skin cleansing",
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
            icon: Heart,
            popular: true
        },
        {
            name: "Microblading",
            category: "Semi-Permanent",
            price: "£350",
            duration: "2hrs",
            description: "Natural-looking eyebrow enhancement with hair-stroke technique",
            image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop",
            icon: Crown,
            popular: false
        }
    ];

    // Testimonials
    const testimonials = [
        {
            id: 1,
            name: "Sarah Johnson",
            service: "Anti-Wrinkle Treatment",
            rating: 5,
            text: "Absolutely amazing experience! The results exceeded my expectations. The team is so professional and made me feel completely comfortable throughout the treatment.",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b776?w=100&h=100&fit=crop&crop=face",
            date: "2 weeks ago"
        },
        {
            id: 2,
            name: "Emma Wilson",
            service: "HydraFacial & Dermal Fillers",
            rating: 5,
            text: "I've been coming here for over a year now and I'm always impressed. The clinic is immaculate and the staff are incredibly knowledgeable. My skin has never looked better!",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
            date: "1 month ago"
        },
        {
            id: 3,
            name: "Lisa Thompson",
            service: "Microblading",
            rating: 5,
            text: "The microblading results are phenomenal! It looks so natural and has saved me so much time in my morning routine. Highly recommend this clinic to everyone.",
            image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face",
            date: "3 weeks ago"
        },
        {
            id: 4,
            name: "Rachel Green",
            service: "Complete Beauty Package",
            rating: 5,
            text: "From consultation to aftercare, everything was perfect. The attention to detail and personalized approach really sets this clinic apart. I feel like a new person!",
            image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=100&h=100&fit=crop&crop=face",
            date: "1 week ago"
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Carousel Section */}
            <div className="relative h-screen overflow-hidden">
                {heroSlides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ${
                            index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        />
                        <div className="absolute inset-0 bg-black/40" />
                        <div className={`absolute inset-0 bg-gradient-to-r ${slide.accent}/20`} />
                        
                        <div className="relative h-full flex items-center justify-center text-center text-white px-6">
                            <div className="max-w-4xl mx-auto">
                                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                                    {slide.title}
                                </h1>
                                <h2 className="text-2xl md:text-3xl mb-6 text-pink-200 font-light">
                                    {slide.subtitle}
                                </h2>
                                <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed text-gray-100">
                                    {slide.description}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <button className={`px-8 py-4 bg-gradient-to-r ${slide.accent} text-white font-semibold rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-300`}>
                                        {slide.cta}
                                    </button>
                                    <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-gray-800 transition-all duration-300">
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                
                {/* Carousel Controls */}
                <button
                    onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
                    className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
                >
                    <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                    onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
                    className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
                >
                    <ChevronRight className="h-6 w-6" />
                </button>
                
                {/* Carousel Indicators */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* Featured Services Section */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                            Our Featured Services
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Discover our most popular treatments designed to enhance your natural beauty and boost your confidence
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        {featuredServices.map((service, index) => {
                            const IconComponent = service.icon;
                            return (
                                <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
                                    <div className="relative">
                                        <img
                                            src={service.image}
                                            alt={service.name}
                                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        {service.popular && (
                                            <div className="absolute top-4 left-4 bg-rose-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                                Popular
                                            </div>
                                        )}
                                        <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full">
                                            <IconComponent className="h-5 w-5 text-rose-600" />
                                        </div>
                                    </div>
                                    
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-rose-600 transition-colors">
                                            {service.name}
                                        </h3>
                                        <div className="text-sm text-rose-500 font-medium mb-3">{service.category}</div>
                                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{service.description}</p>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="text-2xl font-bold text-rose-600">{service.price}</div>
                                            <div className="text-sm text-gray-500">{service.duration}</div>
                                        </div>
                                        <button className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-rose-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200">
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    
                    <div className="text-center">
                        <button className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-rose-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300">
                            View All Services
                            <ArrowRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                            Why Choose Our Clinic
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Experience the difference with our commitment to excellence and personalized care
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center group">
                            <div className="bg-gradient-to-br from-rose-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Award className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Expert Professionals</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Our certified practitioners bring years of experience and continuous training in the latest techniques
                            </p>
                        </div>
                        
                        <div className="text-center group">
                            <div className="bg-gradient-to-br from-purple-500 to-indigo-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Shield className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Safety First</h3>
                            <p className="text-gray-600 leading-relaxed">
                                We maintain the highest safety standards with sterile equipment and premium medical-grade products
                            </p>
                        </div>
                        
                        <div className="text-center group">
                            <div className="bg-gradient-to-br from-emerald-500 to-teal-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Sparkles className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Natural Results</h3>
                            <p className="text-gray-600 leading-relaxed">
                                We specialize in enhancing your natural beauty with subtle, sophisticated results that look authentic
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-gradient-to-br from-rose-50 to-pink-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                            What Our Clients Say
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Read authentic reviews from our satisfied clients who&#39;ve experienced our exceptional treatments
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {testimonials.map((testimonial) => (
                            <div key={testimonial.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 relative">
                                <div className="absolute top-4 right-4 text-rose-200">
                                    <Quote className="h-8 w-8" />
                                </div>
                                
                                <div className="flex items-center mb-6">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-16 h-16 rounded-full object-cover mr-4"
                                    />
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-800">{testimonial.name}</h4>
                                        <p className="text-rose-600 font-medium text-sm">{testimonial.service}</p>
                                        <p className="text-gray-500 text-xs">{testimonial.date}</p>
                                    </div>
                                </div>
                                
                                <div className="flex mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                
                                <p className="text-gray-700 leading-relaxed italic">
                                    {testimonial.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact & Location Section */}
            <section className="py-20 bg-gradient-to-br from-gray-800 to-gray-900 text-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Visit Our Clinic
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Located in the heart of the city, our modern clinic offers a luxurious and comfortable environment
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                    <MapPin className="h-6 w-6 text-rose-400" />
                                    Contact Information
                                </h3>
                                
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <MapPin className="h-6 w-6 text-rose-400 mt-1" />
                                        <div>
                                            <h4 className="font-semibold mb-1">Address</h4>
                                            <p className="text-gray-300">
                                                123 Beauty Lane<br />
                                                London, SW1A 1AA<br />
                                                United Kingdom
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-4">
                                        <Phone className="h-6 w-6 text-rose-400 mt-1" />
                                        <div>
                                            <h4 className="font-semibold mb-1">Phone</h4>
                                            <p className="text-gray-300">+44 20 7123 4567</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-4">
                                        <Mail className="h-6 w-6 text-rose-400 mt-1" />
                                        <div>
                                            <h4 className="font-semibold mb-1">Email</h4>
                                            <p className="text-gray-300">info@beautyclinic.com</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-4">
                                        <Clock className="h-6 w-6 text-rose-400 mt-1" />
                                        <div>
                                            <h4 className="font-semibold mb-1">Opening Hours</h4>
                                            <div className="text-gray-300 space-y-1">
                                                <p>Monday - Friday: 9:00 AM - 7:00 PM</p>
                                                <p>Saturday: 9:00 AM - 5:00 PM</p>
                                                <p>Sunday: 10:00 AM - 4:00 PM</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                    <button className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:from-rose-600 hover:to-pink-600 transition-all duration-300">
                                        <Calendar className="h-5 w-5" />
                                        Book Appointment
                                    </button>
                                    <button className="flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition-all duration-300">
                                        <Phone className="h-5 w-5" />
                                        Call Now
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        {/* Map */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <MapPin className="h-6 w-6 text-rose-400" />
                                Find Us
                            </h3>
                            <div className="bg-gray-200 rounded-xl h-80 flex items-center justify-center relative overflow-hidden">
                                {/* Embedded Google Map */}
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.540943655425!2d-0.1427632845932892!3d51.50330827963395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604c38c8cd1d9%3A0xb78f2474b9a45aa9!2sBuckingham%20Palace!5e0!3m2!1sen!2suk!4v1642089123456!5m2!1sen!2suk"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, borderRadius: '12px' }}
                                    allowFullScreen={true}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="absolute inset-0"
                                />
                            </div>
                            <div className="mt-4 text-center">
                                <p className="text-gray-300 text-sm">
                                    Easily accessible by public transport • Free parking available • Wheelchair accessible
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;