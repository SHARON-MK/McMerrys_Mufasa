import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_BASE_URL } from '../constants/api';
import axios from 'axios';

const AdsCarousel = () => {
  const [currentAdsIndex, setCurrentAdsIndex] = useState(0);
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/user/ads`);
        setAds(res.data);
      } catch (err) {
        console.error('Error fetching ads:', err);
      }
    };

    fetchAds();
  }, []);

  useEffect(() => {
    if (ads.length > 0) {
      const adsTimer = setInterval(() => {
        setCurrentAdsIndex((prevIndex) => (prevIndex + 1) % ads.length);
      }, 3000);

      return () => clearInterval(adsTimer);
    }
  }, [ads]);

  if (!ads || ads.length === 0) {
    return null;
  }

  const currentAd = ads[currentAdsIndex];

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
                src={currentAd.image}
                alt={currentAd.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-start pl-6 sm:pl-8 md:pl-12">
                <div className="text-white">
                  <motion.h3
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2"
                  >
                    {currentAd.title}
                  </motion.h3>
                  <motion.p
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="text-sm sm:text-base md:text-lg opacity-90"
                  >
                    {currentAd.description}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Ads indicators */}
          <div className="absolute bottom-3 sm:bottom-4 right-4 sm:right-6 flex space-x-2">
            {ads.map((_, index) => (
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
