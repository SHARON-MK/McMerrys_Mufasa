import React, { useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Cake, 
  Music,
  Camera
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const navigate = useNavigate();
  const serviceScrollRef = useRef(null);

  const scrollServices = (offset) => {
    if (serviceScrollRef.current) {
      serviceScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleServiceClick = (serviceName) => {
    navigate(`/event?name=${encodeURIComponent(serviceName)}`);
  };

  // Enhanced service cards data - Birthday only
  const serviceCards = [
    {
      id: 'birthday',
      title: 'Birthday Events',
      description: 'Transform your special day into an unforgettable celebration with custom themes, premium decorations, and magical moments that create memories to last a lifetime.',
      icon: <Cake className="w-8 h-8 text-[#fff700]" />,
      features: ['Custom Themes', 'Premium Decor', 'Live Entertainment', 'Professional Photography'],
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=2070&auto=format&fit=crop',
      gradient: 'from-pink-500/20 to-purple-600/20'
    },
    
    
  
  ];

  return (
    <section className="relative py-20 bg-[#fff700] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating circles */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-black/5 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute bottom-20 left-32 w-12 h-12 bg-white/15 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
        <div className="absolute bottom-40 right-10 w-24 h-24 bg-black/5 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}></div>
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-pink-400/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-indigo-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-28 h-28 bg-gradient-to-r from-green-400/20 to-emerald-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header with enhanced styling */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-black/10 rounded-full">
            <Music className="w-5 h-5 text-black" />
            <span className="text-black font-medium">Benchmark Event Services</span>
          </div>
          <h2 className="text-5xl font-bold mb-4 text-black">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-black">Benchmark</span> Service
          </h2>
          <p className="text-black/80 text-lg max-w-2xl mx-auto">
            Specializing in creating unforgettable birthday celebrations that exceed expectations
          </p>
        </div>

        {/* Service Cards */}
        <div className="relative mb-12">
          <div 
            ref={serviceScrollRef}
            className={`${
              serviceCards.length === 1 
                ? 'flex justify-center' 
                : 'flex overflow-x-auto gap-6 px-4 pb-4 scrollbar-hide'
            }`}
          >
            {serviceCards.map((service, index) => (
              <div
                key={service.id}
                className={`group cursor-pointer ${
                  serviceCards.length === 1 
                    ? 'w-[350px]' 
                    : 'flex-shrink-0 w-[350px]'
                }`}
                onClick={() => handleServiceClick(service.title)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative bg-white/50 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/20 h-full">
                  {/* Card Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent ${service.gradient}`}></div>
                    
                    {/* Icon with animation */}
                    <div className="absolute bottom-4 left-4 p-4 bg-black/30 backdrop-blur-sm rounded-full border border-[#fff700]/30 group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    
                    {/* Premium badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-[#fff700]/90 text-black text-xs font-bold rounded-full backdrop-blur-sm">
                      BENCHMARK
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-black transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
                      {service.description}
                    </p>
                    
                    {/* Features grid */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {service.features.map((feature, featureIndex) => (
                        <div 
                          key={featureIndex} 
                          className="flex items-center text-base text-gray-700 group-hover:text-gray-800 transition-colors"
                        >
                          <div className="w-3 h-3 bg-gradient-to-r from-[#fff700] to-yellow-500 rounded-full mr-3 animate-pulse"></div>
                          <span className="font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* CTA Button */}
                    <button 
                      className="w-full bg-black text-[#fff700] py-2.5 rounded-xl font-bold hover:from-gray-800 hover:to-black transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleServiceClick(service.title);
                      }}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <Camera className="w-5 h-5" />
                        Plan Birthday Event
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats section */}
      
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Services;