import { Facebook, Heart, Instagram, MapPin, Phone, Sparkles, Twitter } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const Footer: React.FC = () => {
    const socialLinks = [
        { icon: Facebook, href: 'https://facebook.com/beautysalon', label: 'Facebook' },
        { icon: Instagram, href: 'https://instagram.com/beautysalon', label: 'Instagram' },
        { icon: Twitter, href: 'https://twitter.com/beautysalon', label: 'Twitter' }
    ];

    const quickLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About Us', href: '#about' },
        { name: 'Services', href: '#services' },
        { name: 'Products', href: '#products' },
        { name: 'Contact', href: '#contact' }
    ];

    const services = [
        'Facial Treatments',
        'Hair Styling',
        'Nail Care',
        'Massage Therapy',
        'Makeup Services'
    ];

    return (
        <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-10 left-10 w-32 h-32 bg-pink-500 rounded-full opacity-10 animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-24 h-24 bg-purple-500 rounded-full opacity-10 animate-bounce"></div>
            <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-pink-400 rounded-full opacity-30 animate-ping"></div>
            <div className="absolute top-1/4 right-1/3 w-2 h-2 bg-purple-400 rounded-full opacity-40 animate-pulse"></div>

            {/* Main Footer Content */}
            <div className="relative z-10 container mx-auto px-6 py-16">
                <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">

                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                                <Sparkles className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                                    Drita&#39;s Aesthetics
                                </h3>
                                <p className="text-pink-300 text-sm font-medium">And Spmu Brows</p>
                            </div>
                        </div>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            Experience luxury beauty treatments in our state-of-the-art salon. We&#39;re dedicated to making you look and feel your absolute best.
                        </p>

                        {/* Social Media Links */}
                        <div className="flex space-x-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center text-white hover:from-pink-600 hover:to-purple-700 transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xl font-bold text-white mb-6 relative">
                            Quick Links
                            <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"></div>
                        </h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-gray-300 hover:text-pink-400 transition-colors duration-300 flex items-center group"
                                    >
                                        <div className="w-2 h-2 bg-pink-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <span className="group-hover:translate-x-2 transition-transform duration-300">{link.name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-xl font-bold text-white mb-6 relative">
                            Our Services
                            <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"></div>
                        </h4>
                        <ul className="space-y-3">
                            {services.map((service, index) => (
                                <li key={index} className="text-gray-300 hover:text-pink-400 transition-colors duration-300 flex items-center group">
                                    <Heart className="w-4 h-4 mr-3 text-pink-400 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">{service}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-xl font-bold text-white mb-6 relative">
                            Contact Us
                            <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"></div>
                        </h4>
                        <div className="space-y-4">
                            <div className="flex items-center text-gray-300 group">
                                <div className="w-10 h-10 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-lg flex items-center justify-center mr-4 group-hover:from-pink-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                                    <Phone className="w-5 h-5 text-pink-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Call Now</p>
                                    <a href="tel:07480233841" className="text-white font-semibold hover:text-pink-400 transition-colors duration-300">
                                        07480233841
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center text-gray-300 group">
                                <div className="w-10 h-10 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-lg flex items-center justify-center mr-4 group-hover:from-pink-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                                    <MapPin className="w-5 h-5 text-pink-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Visit Us</p>
                                    <p className="text-white">123 Beauty Street<br />City, UK</p>
                                </div>
                            </div>

                            {/* Call to Action */}
                            <a
                                href="tel:07480233841"
                                className="inline-block w-full mt-6 bg-gradient-to-r from-pink-500 via-pink-600 to-purple-600 text-white py-4 px-6 rounded-2xl font-bold text-center shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                <span className="relative flex items-center justify-center">
                                    <Phone className="w-5 h-5 mr-2" />
                                    Book Appointment
                                </span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Decorative Divider */}
                <div className="my-12 relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-pink-400/50 to-transparent"></div>
                    </div>
                    <div className="relative flex justify-center">
                        <div className="flex space-x-2">
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-2 h-2 bg-pink-400 rounded-full opacity-60"
                                    style={{
                                        animationDelay: `${i * 0.2}s`,
                                        animation: 'pulse 3s infinite'
                                    }}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center">
                    <p className="text-gray-300 mb-2">
                        © 2024 Beauty Salon. All rights reserved.
                    </p>
                    <p className="text-pink-300 text-sm flex items-center justify-center">
                        Made with <Heart className="w-4 h-4 mx-1 text-pink-400 fill-current animate-pulse" /> in the UK
                    </p>
                </div>
            </div>

            {/* Bottom gradient accent */}
            <div className="h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400"></div>
        </footer>
    );
};

export default Footer;