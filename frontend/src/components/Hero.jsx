import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  'https://i0.wp.com/blog.planningpod.com/wp-content/uploads/2020/09/Event-Booking-Tips-Best-Practices.jpg?fit=1200%2C600&ssl=1',
  'https://cdn.dribbble.com/userupload/21100526/file/original-708966c33931a338832ccedc8acbdcc4.png?format=webp&resize=400x300&vertical=center',
  '../ad/ad3.jpg',
  // Add more image paths here
];

const Hero = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    setIsSubmitted(true);
    setEmail('');
    
    // Reset success message after 3 seconds
    setTimeout(() => {
      setIsSubmitted(isSubmitted);
    }, 3000);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-8 min-h-screen bg-gradient-to-br from-[#fff700] via-[#fffa33] to-[#e6de00] overflow-hidden flex items-center">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-20">
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

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center py-8 sm:py-12 md:py-16 lg:py-0">
        
        {/* Image Display Section - Order 1 on mobile, Order 2 on large screens */}
           <div className="w-full lg:w-1/2 relative min-h-[300px] lg:min-h-[600px] flex items-center justify-center rounded-lg overflow-hidden order-1 lg:order-2">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentImageIndex}
          src={images[currentImageIndex]}
          alt={`Hero image ${currentImageIndex + 1}`}
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Optional: Overlay gradient or content */}
      {/* <div className="absolute inset-0 bg-black/30 z-10" /> */}
    </div>
        {/* Text Content Section - Order 2 on mobile, Order 1 on large screens */}
        <div className="w-full lg:w-1/2 lg:pr-8 mb-8 lg:mb-0 order-2 lg:order-1">
          <div className="max-w-full mx-auto lg:mx-0 lg:text-left text-center">
            {/* Main Heading */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-6 sm:mb-8 md:mb-12"
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mt-4 text-black leading-tight">
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="block mb-2 sm:mb-3 md:mb-4"
                >
                 The right moment calls
                </motion.span>

                
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="block bg-gradient-to-r from-gray-800 to-black bg-clip-text text-transparent"
                >
                 for the right support.
                
                </motion.span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }} 
              className="mb-8 sm:mb-12"
            >
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-800 max-w-3xl mx-auto lg:mx-0 leading-relaxed">
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
                        className="w-full px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 rounded-lg bg-white/80 backdrop-blur-sm border border-gray-300 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                        required
                      />
                    </div>
                    <button
                      onClick={handleSubmit}
                      className="bg-black text-[#fff700] px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap shadow-lg text-sm sm:text-base"
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
                  <div className="bg-green-500/20 border border-green-600/40 rounded-lg px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-center gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-700" />
                    <span className="text-green-800 font-medium text-sm sm:text-base">Thank you! We'll be in touch soon.</span>
                  </div>
                </motion.div>
              )}
              
              <p className="mt-3 sm:mt-4 md:mt-6 text-xs sm:text-sm text-gray-700 max-w-lg mx-auto">
                By clicking "Get Started", you agree to our{' '}
                <a href="#" className="text-black hover:text-gray-800 underline transition-colors font-medium">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-black hover:text-gray-800 underline transition-colors font-medium">
                  Privacy Policy
                </a>
                .
              </p>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-3xl mx-auto lg:mx-0"
            >
              <div className="text-center lg:text-left">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-1 sm:mb-2">500+</div>
                <div className="text-gray-700 text-xs sm:text-sm md:text-base">Events Organized</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-1 sm:mb-2">98%</div>
                <div className="text-gray-700 text-xs sm:text-sm md:text-base">Client Satisfaction</div>
              </div>
              <div className="text-center lg:text-left col-span-2 sm:col-span-1">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-1 sm:mb-2">Seamless</div>
                <div className="text-gray-700 text-xs sm:text-sm md:text-base">Execution</div>
              </div>
            </motion.div>
          </div>
        </div>

      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-[#e6de00] to-transparent"></div>
    </section>
  );
};

export default Hero;