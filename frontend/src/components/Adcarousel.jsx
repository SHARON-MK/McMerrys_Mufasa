import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const adsImages = [
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
  'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
  'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
];

const AdsCarousel = () => {
  const [currentAdsIndex, setCurrentAdsIndex] = useState(0);

  useEffect(() => {
    const adsTimer = setInterval(() => {
      setCurrentAdsIndex((prevIndex) => (prevIndex + 1) % adsImages.length);
    }, 3000);

    return () => clearInterval(adsTimer);
  }, []);

  return (
    <div className="relative z-20 w-full h-32 sm:h-48 md:h-64 mb-6 sm:mb-8">
      <div className="container mx-auto px-8 sm:px-6 lg:px-10 h-full">
        <div className="relative w-full h-full rounded-xl overflow-hidden mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentAdsIndex}
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
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
                    className="text-lg sm:text-xl md:text-2xl  lg:text-3xl font-bold mb-1 sm:mb-8"
                  >
                    Premium Event Services
                  </motion.h3>
                  <motion.p
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="text-sm sm:text-base md:text-lg  opacity-90"
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
  );
};

export default AdsCarousel;
