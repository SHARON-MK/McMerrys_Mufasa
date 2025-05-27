import React, { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';

const EmailSubscription = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle email subscription logic here
    console.log('Email submitted:', email);
    setEmail('');
  };

  return (
    <section className="py-16 bg-[#fff700]">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-black">Stay Updated</h2>
          <p className="text-gray-700 mb-8">Subscribe to our newsletter for the latest updates and exclusive offers</p>
          
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
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-black/20 bg-white text-black placeholder-gray-500"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-black text-[#fff700] px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition flex items-center justify-center gap-2"
            >
              Subscribe
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-600">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EmailSubscription; 