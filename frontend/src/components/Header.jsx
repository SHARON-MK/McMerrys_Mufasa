import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../public/logo/mlogo-min.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scrolled state for background
      if (currentScrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Handle header visibility
      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-60 transition-all duration-300 rounded-b-3xl ${
      isScrolled ? 'shadow-lg bg-black bg-opacity-70 text-white rounded-b-3xl' : 'text-black'
    } ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <Link to="/">
          <div className="flex items-center justify-between h-12 sm:h-14">
            <img 
              src={logo} 
              alt="MC MERRYS Logo" 
               className="h-10 sm:h-12 md:h-15 w-auto"
            />
            <h1 className={`text-lg sm:text-xl md:text-2xl font-bold tracking-wider ${
              isScrolled ? 'text-yellow-300' : 'text-yellow-300'
            }`}>
              MC MERRYS
            </h1>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header; 