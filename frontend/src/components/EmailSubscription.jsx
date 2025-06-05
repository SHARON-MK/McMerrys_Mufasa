import React, { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { PUBLIC_ENDPOINTS } from '../constants/api';

const EmailSubscription = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(PUBLIC_ENDPOINTS.EMAIL_SUBMISSION, { email });

      if (response.status === 200) {
        setIsSubmitted(true);
        setEmail('');
        setError('');

        // Reset success message after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Email submission failed:', error);
      setError(error.response?.data?.message || 'Failed to subscribe. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 bg-[#fff700]">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold font-netflix mb-4 text-black">Stay Updated</h2>
          <p className="text-gray-700 font-netflix mb-8">
            Subscribe to our newsletter for the latest updates and exclusive offers
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 justify-center">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="w-5 h-5 text-gray-500" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={`w-full pl-12 pr-4 py-3 rounded-lg border ${
                  error ? 'border-red-500' : 'border-black/10'
                } focus:outline-none focus:ring-2 focus:ring-black/20 bg-white text-black placeholder-gray-500`}
                disabled={isLoading}
                required
              />
              {error && (
                <p className="absolute -bottom-6 left-0 text-sm text-red-500">{error}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-black text-[#fff700] px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition flex items-center justify-center gap-2 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-[#fff700]"></div>
                  <span>Subscribing...</span>
                </div>
              ) : (
                <>
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {isSubmitted && (
            <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg">
              Thank you for subscribing! We'll keep you updated with our latest news and offers.
            </div>
          )}

          <p className="mt-4 text-sm text-gray-600">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EmailSubscription; 