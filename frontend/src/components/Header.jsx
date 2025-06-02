import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../public/logo/logo.png';

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
    <header className={`fixed top-0 left-0 right-0 z-50  transition-shadow duration-300 ${
      isScrolled ? 'shadow-lg bg-black bg-opacity-50 text-white' : ' text-black'
    }`}>
      <div className="container mx-auto px-4">
        <Link to="/">
          <div className="flex items-center h-16 sm:h-20">
            <img 
              src={logo} 
              alt="MC MERRYS Logo" 
              className="h-6 sm:h-10 md:h-12 w-auto "
            />
            {/* <h1 className={`text-lg sm:text-xl md:text-2xl font-bold tracking-wider ${
              isScrolled ? 'text-yellow-300' : 'text-yellow-300'
            }`}>
              MC MERRYS
            </h1> */}
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header; 