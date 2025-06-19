import React, { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { PUBLIC_ENDPOINTS } from '../constants/api';
import axios from 'axios';

const Hero = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidEmail = (email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };

    if (!email || !isValidEmail(email)) {
      return alert('Please enter a valid email address');
    }

    try {
      const response = await axios.post(`${PUBLIC_ENDPOINTS.EMAIL_SUBMISSION}`, { email });

      if (response.status === 200) {
        console.log('Email sent successfully');
        setIsSubmitted(true);
        setEmail('');

        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Email submission failed:', error);

      if (error.response && error.response.status === 409) {
        const errMsg = error.response.data?.message || 'Email already registered, we will contact you soon 🙌	.';
        setErrorMessage(errMsg);
        setTimeout(() => setErrorMessage(''), 3000);
      } else {
        let errMsg = 'Failed to send email. Please try again later.';
        if (error.response?.data?.message) {
          errMsg = error.response.data.message;
        } else if (error.message) {
          errMsg = error.message;
        }
        alert(errMsg);
      }
    }
  };

  return (
    <section className="relative py-8 min-h-[95vh] overflow-hidden flex flex-col rounded-b-3xl">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-[120%] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/75 to-black/80"></div>
      </div>

      {/* Animated overlays */}
      <div className="absolute inset-0 z-10 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/10 to-orange-500/10 animate-gradient-x"></div>
        <div
          className="absolute inset-0 animate-pulse-slow"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(0, 0, 0, 0.05) 0%, transparent 50%), 
              radial-gradient(circle at 75% 75%, rgba(0, 0, 0, 0.08) 0%, transparent 50%)`
          }}
        ></div>
        <div className="absolute inset-0 animate-float">
          <div className="absolute top-1/4 left-1/4 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-yellow-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-yellow-500/10 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center flex-1 py-4 sm:py-8">
        <div className="w-full mb-8 lg:mb-0">
          <div className="max-w-full mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="mb-6 sm:mb-8 md:mb-8"
            >
              <h1 className="text-2xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl mt-4 text-white leading-tight">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="block mb-2 sm:mb-3 md:mb-4 font-arcaBold"
                >
                  THE RIGHT MOMENT CALLS
                </motion.span>

                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="block text-white font-arcaBold bg-clip-text text-transparent"
                >
                  FOR THE RIGHT SUPPORT
                </motion.span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-8 sm:mb-1"
            >
              <p className="text-xs sm:text-sm font-arcaBold lg:text-l text-gray-400 max-w-1xl mx-auto leading-relaxed p-4 sm:p-6">
                WE HANDLE EVERY DETAIL TO MAKE YOUR SOCIAL, CORPORATE, OR WEDDING EVENT UNFORGETTABLE
              </p>
            </motion.div>

            {/* Form or Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mb-8 sm:mb-10 md:mb-12"
            >
              {isSubmitted ? (
                // ✅ Success Message
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-xl mx-auto"
                >
                  <div className="bg-green-500/20 border border-green-600/40 rounded-lg px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-center gap-2 sm:gap-3 backdrop-blur-sm">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-700" />
                    <span className="text-green-500 font-medium text-sm sm:text-base">
                      🎉 Thank you! We'll be in touch soon.
                    </span>
                  </div>
                </motion.div>
              ) : errorMessage ? (
                // ❌ Email already exists Message
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-xl mx-auto"
                >
                  <div className="bg-red-500/20 border border-red-600/40 rounded-lg px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-center gap-2 sm:gap-3 backdrop-blur-sm">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-700" />
                    <span className="text-red-500 font-medium text-sm sm:text-base">
                      {errorMessage}
                    </span>
                  </div>
                </motion.div>
              ) : (
                // 📨 Email Input Form
                <div className="max-w-xl mx-auto">
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center">
                    <div className="w-full sm:flex-grow">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full font-arcaBold px-3 sm:px-4 md:px-6 py-3.5 sm:py-3 md:py-4 rounded-lg bg-black/50 backdrop-blur-sm border border-gray-300 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 text-sm sm:text-base shadow-lg"
                        required
                      />
                    </div>
                    <button
                      onClick={handleSubmit}
                      className="w-fit bg-[#fff700] font-arcaBold text-black px-4 sm:px-6 md:px-8 py-3.5 sm:py-3 md:py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap shadow-lg text-sm sm:text-base hover:bg-yellow-800 transform hover:scale-105"
                    >
                      Get Started
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/70 to-transparent z-20"></div>
    </section>
  );
};

export default Hero;
