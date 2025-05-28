import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';



// Ads images array
const adsImages = [
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
  'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
  'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
];

const Hero = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
 
  const [currentAdsIndex, setCurrentAdsIndex] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    setIsSubmitted(true);
    setEmail('');
    
    // Reset success message after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };


  useEffect(() => {
    const adsTimer = setInterval(() => {
      setCurrentAdsIndex((prevIndex) => (prevIndex + 1) % adsImages.length);
    }, 3000); // Change ads image every 3 seconds

    return () => clearInterval(adsTimer);
  }, []);

  return (
    <section className="relative py-8 overflow-hidden flex flex-col">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://wallpaperaccess.com/full/11122239.jpg')`
          }}
        />
        {/* <div className="absolute inset-0 bg-gradient-to-br from-[#fff700]/30 via-[#fffa33]/25 to-[#e6de00]/60"></div> */}

         <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/75 to-black/80"></div>

           {/* <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/85 to-black/90"></div> */}
      </div>

      {/* Animated Background Pattern Overlay */}
      <div className="absolute inset-0 z-10 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/10 to-orange-500/10 animate-gradient-x"></div>
        <div className="absolute inset-0 animate-pulse-slow" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(0, 0, 0, 0.05) 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, rgba(0, 0, 0, 0.08) 0%, transparent 50%)`
        }}></div>
        <div className="absolute inset-0 animate-float">
          <div className="absolute top-1/4 left-1/4 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-yellow-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-yellow-500/10 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Ads Banner Section - Top */}
      <div className="relative z-20 w-full h-24 sm:h-32 md:h-40 mb-6 sm:mb-8">
        <div className="container mx-auto px-8 sm:px-6 lg:px-10  h-full">
          <div className="relative w-full h-full rounded-xl overflow-hidden mt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentAdsIndex}
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <img
                  src={adsImages[currentAdsIndex]}
                  alt={`Advertisement ${currentAdsIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-start pl-6 sm:pl-8 md:pl-12">
                  <div className="text-white">
                    <motion.h3 
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 sm:mb-8"
                    >
                      Premium Event Services
                    </motion.h3>
                    <motion.p 
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      className="text-sm sm:text-base md:text-lg opacity-90"
                    >
                      Experience luxury like never before
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Ads indicators */}
            <div className="absolute bottom-3 sm:bottom-4 right-4 sm:right-6 flex space-x-2">
              {adsImages.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentAdsIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main content container */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center flex-1 py-4 sm:py-8">
        
      
        
        {/* Text Content Section */}
        <div className="w-full mb-8 lg:mb-0 ">
          <div className="max-w-full mx-auto text-center"> 
            {/* Main Heading */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-6 sm:mb-8 md:mb-8" 
            >
              <h1 className="text-4xl sm:text-4xl md:text-4xl lg:text-6xl xl:text-6xl font-bold mt-4 text-white leading-tight">
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="block mb-2 sm:mb-3 md:mb-4"
                >
                 "The right moment calls
                </motion.span>

                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="block  text-white bg-clip-text text-transparent"
                >
                 for the right support."
                </motion.span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }} 
              className="mb-8 sm:mb-1" 
            >
              <p className="text-lg sm:text-xl  lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed  p-4 sm:p-6"> 
                We handle every detail to make your social, corporate, or wedding event unforgettable.
              </p>
            </motion.div>

            {/* Email Subscription Form */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mb-8 sm:mb-10 md:mb-12" 
            >
              {!isSubmitted ? (
                <div className="max-w-xl mx-auto">
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <div className="flex-grow">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 rounded-lg bg-white/90 backdrop-blur-sm border border-gray-300 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 text-sm sm:text-base shadow-lg"
                        required
                      />
                    </div>
                    <button
                      onClick={handleSubmit}
                      className="bg-black text-[#fff700] px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap shadow-lg text-sm sm:text-base hover:bg-gray-800 transform hover:scale-105"
                    >
                      Get Started
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-xl mx-auto"
                >
                  <div className="bg-green-500/20 border border-green-600/40 rounded-lg px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-center gap-2 sm:gap-3 backdrop-blur-sm">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-700" />
                    <span className="text-green-500 font-medium text-sm sm:text-base">Thank you! We'll be in touch soon.</span>
                  </div>
                </motion.div>
              )}
              
              <p className="mt-3 sm:mt-4 md:mt-6 text-xs sm:text-sm text-gray-500 max-w-lg mx-auto"> 
                By clicking "Get Started", you agree to our{' '}
                <a href="#" className="text-blue-500 hover:text-blue-800 underline transition-colors font-medium">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-500 hover:text-blue-800 underline transition-colors font-medium">
                  Privacy Policy
                </a>
                .
              </p>
            </motion.div>

           
          </div>
        </div>

      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-[#e6de00]/10 to-transparent z-10"></div>
    </section>
  );
};

export default Hero;