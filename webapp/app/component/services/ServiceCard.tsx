"use client";

import { Clock, Heart, Star, Sparkles } from "lucide-react";
import React, { useState } from "react";

interface Service {
    image: string;
    name: string;
    description: string;
    duration?: string;
    price: string;
    note?: string;
}

const ServiceCard = ({ service }: { service: Service }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    return (
        <div
            className="group relative bg-gradient-to-br from-white via-pink-50/30 to-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-pink-100/50 hover:border-pink-300/70 transform hover:scale-[1.02] hover:-translate-y-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-pink-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Decorative sparkle */}
            <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                <Sparkles className="h-4 w-4 text-pink-400 animate-pulse" />
            </div>

            <div className="relative overflow-hidden rounded-t-3xl">
                <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                
                {/* Enhanced gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Animated like button */}
                <div className="absolute top-4 right-4">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsLiked(!isLiked);
                        }}
                        className="bg-white/90 backdrop-blur-md rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
                    >
                        <Heart 
                            className={`h-5 w-5 transition-all duration-300 ${
                                isLiked 
                                    ? 'text-pink-500 fill-current scale-110' 
                                    : 'text-pink-400 hover:text-pink-500'
                            }`} 
                        />
                    </button>
                </div>
                
                {/* Enhanced FREE badge */}
                {service.price === 'FREE' && (
                    <div className="absolute top-4 left-4">
                        <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                            <span className="flex items-center">
                                <Sparkles className="h-3 w-3 mr-1" />
                                FREE
                            </span>
                        </div>
                    </div>
                )}

                {/* Floating elements on hover */}
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 transform translate-y-4 group-hover:translate-y-0">
                    <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-pink-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-pink-200 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                </div>
            </div>

            <div className="p-8 relative">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-800 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300 mb-2">
                            {service.name}
                        </h3>
                        
                        {/* Decorative line */}
                        <div className="h-px bg-gradient-to-r from-pink-300 to-transparent w-12 group-hover:w-20 transition-all duration-300"></div>
                    </div>
                    
                    <div className="flex items-center bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl px-3 py-2 shadow-sm border border-amber-100">
                        <Star className="h-4 w-4 text-amber-400 fill-current" />
                        <span className="text-sm font-bold text-amber-700 ml-1">4.8</span>
                    </div>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed line-clamp-2 group-hover:text-gray-700 transition-colors duration-200">
                    {service.description}
                </p>

                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center text-gray-500 bg-gray-50 rounded-xl px-3 py-2">
                        <Clock className="h-4 w-4 mr-2 text-pink-400" />
                        <span className="text-sm font-medium">{service.duration || 'Varies'}</span>
                    </div>
                    <div className="text-right">
                        <span className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                            {service.price}
                        </span>
                        {service.note && (
                            <p className="text-xs text-gray-500 mt-1 italic">{service.note}</p>
                        )}
                    </div>
                </div>

                {/* Enhanced button with multiple effects */}
                <button className="relative w-full bg-gradient-to-r from-pink-500 via-pink-600 to-purple-600 text-white py-4 px-6 rounded-2xl font-bold text-lg overflow-hidden group/btn hover:from-pink-600 hover:via-pink-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl">
                    {/* Button shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                    
                    {/* Button content */}
                    <span className="relative flex items-center justify-center">
                        Book Now
                        <Sparkles className="h-4 w-4 ml-2 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                    </span>
                </button>

                {/* Floating action hint */}
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-300">
                    <div className="text-xs text-pink-400 font-medium flex items-center">
                        <div className="w-1 h-1 bg-pink-400 rounded-full mr-1 animate-pulse"></div>
                        Premium Service
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;