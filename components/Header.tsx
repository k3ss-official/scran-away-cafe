"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Check if cafe is open (7am-2pm Mon-Sat, 8am-2pm Sun)
  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
      const hour = now.getHours();
      
      if (day === 0) { // Sunday
        setIsOpen(hour >= 8 && hour < 14);
      } else if (day >= 1 && day <= 6) { // Monday-Saturday
        setIsOpen(hour >= 7 && hour < 14);
      } else {
        setIsOpen(false);
      }
    };

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-6 transition-all duration-700 ease-out ${isScrolled ? 'py-2 md:py-2 bg-white/85 backdrop-blur-xl shadow-xl border-b border-white/40' : 'py-2 md:py-3 bg-white/95 backdrop-blur-sm border-b border-gray-200/50'}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Name - Precise Height Matching */}
        <div className="flex items-center gap-3 w-2/5">
          <img 
            src="/assets/black-trans-logo.png" 
            alt="Scran Away Cafe logo" 
            className={`transition-all duration-700 ease-out ${isScrolled ? 'w-10 h-10 md:w-12 md:h-12' : 'w-16 h-16 md:w-20 md:h-20'}`}
          />
          <div className="flex flex-col justify-center">
            <h1 className={`font-bold text-gray-900 leading-none transition-all duration-700 ease-out flex items-center ${isScrolled ? 'text-base md:text-lg h-10 md:h-12' : 'text-xl md:text-2xl h-16 md:h-20'}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
              SCRAN AWAY CAFE
            </h1>
            {isOpen && (
              <span className="text-xs text-green-600 font-medium animate-pulse">
                • Open Now
              </span>
            )}
          </div>
        </div>

        {/* Navigation and Call Button - Elegant Animations */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Section Navigation with Subtle Halos */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection('menu')}
              className="text-sm font-medium text-gray-700 transition-all duration-500 ease-out px-4 py-2 rounded-[6pt] relative overflow-hidden group hover:text-green-600 hover:shadow-lg hover:shadow-green-500/20"
            >
              <span className="relative z-10">Menu</span>
              <div className="absolute inset-0 bg-green-50/0 group-hover:bg-green-50/80 transition-all duration-500 ease-out rounded-[6pt]"></div>
            </button>
            <button
              onClick={() => scrollToSection('reviews')}
              className="text-sm font-medium text-gray-700 transition-all duration-500 ease-out px-4 py-2 rounded-[6pt] relative overflow-hidden group hover:text-green-600 hover:shadow-lg hover:shadow-green-500/20"
            >
              <span className="relative z-10">Reviews</span>
              <div className="absolute inset-0 bg-green-50/0 group-hover:bg-green-50/80 transition-all duration-500 ease-out rounded-[6pt]"></div>
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-sm font-medium text-gray-700 transition-all duration-500 ease-out px-4 py-2 rounded-[6pt] relative overflow-hidden group hover:text-green-600 hover:shadow-lg hover:shadow-green-500/20"
            >
              <span className="relative z-10">Contact</span>
              <div className="absolute inset-0 bg-green-50/0 group-hover:bg-green-50/80 transition-all duration-500 ease-out rounded-[6pt]"></div>
            </button>
          </nav>

          <button
            className="flex items-center gap-2 px-4 py-2 border-2 border-red-800 rounded-[6pt] text-red-800 hover:text-orange-600 transition-all duration-500 ease-out text-sm font-medium relative overflow-hidden group active:scale-95"
            onClick={() => window.location.href = 'tel:01257241763'}
          >
            <Phone className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Hungry?</span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/0 via-orange-500/0 to-orange-400/0 group-hover:from-orange-400/20 group-hover:via-orange-500/40 group-hover:to-orange-400/20 transition-all duration-700 ease-out backdrop-blur-sm rounded-[6pt]"></div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;