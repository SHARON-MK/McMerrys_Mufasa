import React from 'react';

const ScrollingTextSection = () => {
  const scrollingTexts = [
    "CORPORATE EVENTS",
    "WEDDING CELEBRATIONS", 
    "BIRTHDAY PARTIES",
    "PRODUCT LAUNCHES",
    "CONFERENCE MANAGEMENT",
    "SOCIAL GATHERINGS",
    "BRAND ACTIVATIONS",
    "ANNIVERSARY CELEBRATIONS",
    "CHARITY GALAS",
    "TEAM BUILDING EVENTS",
    "HOLIDAY PARTIES",
    "GRADUATION CEREMONIES"
  ];

  const duplicatedTexts = [...scrollingTexts, ...scrollingTexts];

  return (
    <section className="bg-transparent py-3 overflow-hidden relative">
      
      {/* Top scrolling row - Left to Right */}
      <div className="relative mb-1">
        <div className="flex animate-scroll-left whitespace-nowrap">
          {duplicatedTexts.map((text, index) => (
            <div
              key={`top-${index}`}
              className="inline-flex items-center px-4 py-1 mx-2 hover:scale-110 transition-transform duration-300 cursor-pointer group"
            >
              <span className="text-base md:text-lg font-medium text-black tracking-wide group-hover:text-purple-600 transition-colors duration-300">
                {text}
              </span>
              <div className="w-1 h-1 bg-gray-400 rounded-full mx-3 flex-shrink-0 group-hover:bg-purple-500 transition-colors duration-300"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom scrolling row - Right to Left */}
      <div className="relative">
        <div className="flex animate-scroll-right whitespace-nowrap">
          {duplicatedTexts.reverse().map((text, index) => (
            <div
              key={`bottom-${index}`}
              className="inline-flex items-center px-4 py-1 mx-2 hover:scale-110 transition-transform duration-300 cursor-pointer group"
            >
              <div className="w-1 h-1 bg-gray-400 rounded-full mx-3 flex-shrink-0 group-hover:bg-purple-500 transition-colors duration-300"></div>
              <span className="text-base md:text-lg font-medium text-black tracking-wide group-hover:text-purple-600 transition-colors duration-300">
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Gradient overlays for smooth fade effect */}
    
      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 60s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 60s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default ScrollingTextSection;