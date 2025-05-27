import React, { useState, useEffect } from 'react';

const McMerrysLoader = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentText, setCurrentText] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const loadingTexts = [
    "Setting up your event...",
    "Finding perfect venues...",
    "Coordinating with vendors...",
    "Finalizing event details...",
    "Your event is ready to book!"
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          setIsComplete(true);
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    const textInterval = setInterval(() => {
      setCurrentText(prev => (prev + 1) % loadingTexts.length);
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <section className="relative min-h-screen bg-[#fff700] flex items-center justify-center overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 bg-red-600 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        {/* Floating Burger Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-8 h-8 bg-orange-400 rounded-full animate-float opacity-30"></div>
          <div className="absolute top-40 right-20 w-6 h-6 bg-red-500 rounded-full animate-bounce opacity-40" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-32 left-1/4 w-10 h-10 bg-green-500 rounded-full animate-float opacity-20" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 right-1/3 w-7 h-7 bg-yellow-600 rounded-full animate-bounce opacity-35" style={{animationDelay: '0.5s'}}></div>
        </div>
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto px-4">
        {/* Main Logo/Title */}
        <div className="mb-12">
          <h1 className="text-6xl md:text-8xl font-black text-red-600 mb-4 animate-pulse">
            Mc<span className="text-yellow-600">Merry's</span>
          </h1>
          <div className="flex justify-center items-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center animate-spin">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              </div>
            </div>
            <div className="text-2xl font-bold text-red-600">™</div>
          </div>
          <p className="text-lg font-semibold text-gray-800">Make Every Event Memorable</p>
        </div>

        {/* Animated Event Planning Icons */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            {/* Event Planning Elements */}
            <div className="flex flex-col items-center space-y-3">
              {/* Calendar Icon */}
              <div 
                className="w-16 h-16 bg-white rounded-lg shadow-lg border-2 border-red-600 flex flex-col items-center justify-center transition-all duration-500 transform"
                style={{
                  transform: `translateY(${isComplete ? '0px' : '-20px'}) scale(${loadingProgress > 20 ? 1 : 0})`,
                  opacity: loadingProgress > 20 ? 1 : 0
                }}
              >
                <div className="w-full h-3 bg-red-600 rounded-t"></div>
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-xl font-bold text-red-600">15</div>
                </div>
                <div className="absolute -top-1 left-3 w-1 h-4 bg-red-600 rounded"></div>
                <div className="absolute -top-1 right-3 w-1 h-4 bg-red-600 rounded"></div>
              </div>
              
              {/* Venue/Location Pin */}
              <div 
                className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center transition-all duration-500 relative"
                style={{
                  transform: `scale(${loadingProgress > 40 ? 1 : 0})`,
                  opacity: loadingProgress > 40 ? 1 : 0
                }}
              >
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-6 border-t-red-600"></div>
              </div>
              
              {/* Party Hat */}
              <div 
                className="relative transition-all duration-500"
                style={{
                  transform: `scale(${loadingProgress > 60 ? 1 : 0})`,
                  opacity: loadingProgress > 60 ? 1 : 0
                }}
              >
                <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-12 border-b-yellow-500"></div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-600 rounded-full -mt-1"></div>
                <div className="absolute top-2 left-1 w-1 h-1 bg-red-600 rounded-full"></div>
                <div className="absolute top-3 right-1 w-1 h-1 bg-blue-500 rounded-full"></div>
              </div>
              
              {/* Music Note */}
              <div 
                className="relative transition-all duration-500"
                style={{
                  transform: `scale(${loadingProgress > 80 ? 1 : 0})`,
                  opacity: loadingProgress > 80 ? 1 : 0
                }}
              >
                <div className="w-3 h-8 bg-gray-800 rounded-full"></div>
                <div className="absolute top-0 right-0 w-6 h-6 bg-gray-800 rounded-full"></div>
                <div className="absolute bottom-2 right-0 w-4 h-3 bg-gray-800 rounded-r-full"></div>
              </div>
              
              {/* Confetti */}
              <div 
                className="flex space-x-2 transition-all duration-500"
                style={{
                  transform: `scale(${loadingProgress > 90 ? 1 : 0})`,
                  opacity: loadingProgress > 90 ? 1 : 0
                }}
              >
                <div className="w-2 h-2 bg-red-500 rotate-45"></div>
                <div className="w-2 h-2 bg-yellow-500 rotate-12"></div>
                <div className="w-2 h-2 bg-blue-500 -rotate-12"></div>
                <div className="w-2 h-2 bg-green-500 rotate-45"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="mb-8">
          <p className="text-xl font-semibold text-gray-800 h-8 flex items-center justify-center transition-all duration-500">
            {loadingTexts[currentText]}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full max-w-md mx-auto bg-red-200 rounded-full h-4 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-red-600 to-yellow-500 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${loadingProgress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
            </div>
          </div>
          <p className="text-lg font-bold text-red-600 mt-2">{loadingProgress}%</p>
        </div>

        {/* Floating Event Elements */}
        <div className="absolute top-1/4 left-10 hidden md:block">
          <div className="relative animate-float">
            {/* Balloon Cluster */}
            <div className="flex space-x-1">
              <div className="w-6 h-8 bg-red-500 rounded-full"></div>
              <div className="w-6 h-8 bg-blue-500 rounded-full"></div>
              <div className="w-6 h-8 bg-yellow-500 rounded-full"></div>
            </div>
            <div className="flex justify-center space-x-1 mt-1">
              <div className="w-px h-8 bg-gray-600"></div>
              <div className="w-px h-8 bg-gray-600"></div>
              <div className="w-px h-8 bg-gray-600"></div>
            </div>
          </div>
        </div>

        {/* Floating Gift Box */}
        <div className="absolute top-1/3 right-10 hidden md:block">
          <div className="relative animate-bounce">
            <div className="w-8 h-8 bg-red-600 border-4 border-yellow-400"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-yellow-400"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-2 h-10 bg-yellow-400"></div>
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-l-transparent border-r-2 border-r-transparent border-b-4 border-b-yellow-400"></div>
          </div>
        </div>

        {/* Completion Message */}
        {isComplete && (
          <div className="animate-fadeIn">
            <div className="bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg mb-4 animate-bounce">
              🎉 Event Setup Complete! Let's Get Planning! 🎊
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </section>
  );
};

export default McMerrysLoader;