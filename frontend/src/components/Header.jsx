import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-[#fff700] transition-shadow duration-300 ${
      isScrolled ? 'shadow-lg' : ''
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-start h-14 sm:h-16 md:h-20">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black tracking-wider flex items-center">
            MC MERRYS
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header; 