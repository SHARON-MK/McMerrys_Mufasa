import React, { useState, useEffect } from 'react';

const McMerrysLoader2 = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentText, setCurrentText] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState([]);

  const loadingTexts = [
    "Sprinkling magic dust on your event...",
    "Summoning the perfect venue spirits...",
    "Mixing cocktails of creativity...",
    "Choreographing moments of joy...",
    "Painting your perfect celebration!"
  ];

  const eventTypes = ['🎂', '💒', '🎓', '🎈', '🌟', '🎭', '🎨', '🎪'];

  useEffect(() => {
    // Generate random confetti pieces
    const pieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDelay: Math.random() * 3,
      icon: eventTypes[Math.floor(Math.random() * eventTypes.length)],
      scale: 0.5 + Math.random() * 0.5,
      duration: 3 + Math.random() * 4
    }));
    setConfettiPieces(pieces);

    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          setIsComplete(true);
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1.5;
      });
    }, 80);

    const textInterval = setInterval(() => {
      setCurrentText(prev => (prev + 1) % loadingTexts.length);
    }, 2200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#fff700] via-[#ffeb3b] to-[#ffc107] overflow-hidden">
      {/* Animated Background Confetti Rain */}
      <div className="absolute inset-0 pointer-events-none">
        {confettiPieces.map((piece) => (
          <div
            key={piece.id}
            className="absolute text-2xl animate-float-down opacity-20"
            style={{
              left: `${piece.left}%`,
              animationDelay: `${piece.animationDelay}s`,
              animationDuration: `${piece.duration}s`,
              transform: `scale(${piece.scale})`
            }}
          >
            {piece.icon}
          </div>
        ))}
      </div>

      {/* Geometric Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(45deg, transparent 35%, rgba(255,87,34,0.1) 35%, rgba(255,87,34,0.1) 65%, transparent 65%),
            linear-gradient(-45deg, transparent 35%, rgba(233,30,99,0.1) 35%, rgba(233,30,99,0.1) 65%, transparent 65%)
          `,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Unique Logo Design */}
          <div className="mb-16">
            <div className="relative inline-block">
              {/* Rotating Halo Effect */}
              <div className="absolute -inset-8 opacity-30">
                <div className="w-full h-full border-4 border-dashed border-orange-500 rounded-full animate-spin-slow"></div>
              </div>
              <div className="absolute -inset-12 opacity-20">
                <div className="w-full h-full border-2 border-dotted border-pink-500 rounded-full animate-spin-reverse"></div>
              </div>
              
              {/* Main Logo */}
              <h1 className="text-7xl md:text-9xl font-black relative">
                <span className="bg-gradient-to-r from-red-600 via-orange-500 to-pink-600 bg-clip-text text-transparent animate-gradient-shift">
                  Mc
                </span>
                <span className="bg-gradient-to-r from-yellow-600 via-amber-500 to-orange-600 bg-clip-text text-transparent animate-gradient-shift-reverse">
                  Merry's
                </span>
              </h1>
              
              {/* Floating Sparkles */}
              <div className="absolute -top-4 left-1/4 text-yellow-400 animate-sparkle">✨</div>
              <div className="absolute -top-2 right-1/4 text-pink-400 animate-sparkle-delayed">⭐</div>
              <div className="absolute -bottom-4 left-1/3 text-orange-400 animate-sparkle-slow">💫</div>
            </div>
            
            <div className="mt-6 relative">
              <p className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Where Dreams Become Celebrations
              </p>
              <div className="absolute -right-8 top-0 text-2xl animate-bounce">🎪</div>
            </div>
          </div>

          {/* Creative Event Builder Animation */}
          <div className="mb-12">
            <div className="relative w-80 h-80 mx-auto">
              {/* Central Hub */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full shadow-2xl border-4 border-red-500 flex items-center justify-center z-10">
                <div className="text-3xl animate-pulse">🎯</div>
              </div>
              
              {/* Orbiting Event Elements */}
              {[
                { icon: '🎂', delay: 0, color: 'bg-pink-500' },
                { icon: '🎵', delay: 1, color: 'bg-blue-500' },
                { icon: '📍', delay: 2, color: 'bg-green-500' },
                { icon: '🎨', delay: 3, color: 'bg-purple-500' },
                { icon: '🍾', delay: 4, color: 'bg-yellow-500' },
                { icon: '💌', delay: 5, color: 'bg-red-500' }
              ].map((item, index) => (
                <div
                  key={index}
                  className="absolute top-1/2 left-1/2 w-16 h-16 transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${index * 60}deg) translateY(-120px) rotate(-${index * 60}deg)`,
                    opacity: loadingProgress > (index + 1) * 15 ? 1 : 0.3,
                    transition: 'all 0.8s ease-out'
                  }}
                >
                  <div className={`w-full h-full ${item.color} rounded-full shadow-lg flex items-center justify-center text-2xl animate-orbit-float`}
                       style={{ animationDelay: `${item.delay * 0.5}s` }}>
                    {item.icon}
                  </div>
                </div>
              ))}
              
              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full" style={{ transform: 'scale(0.8)' }}>
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <line
                    key={index}
                    x1="50%"
                    y1="50%"
                    x2={50 + 35 * Math.cos((index * 60 - 90) * Math.PI / 180)}
                    y2={50 + 35 * Math.sin((index * 60 - 90) * Math.PI / 180)}
                    stroke="rgba(255, 87, 34, 0.4)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    className="animate-dash"
                    style={{
                      opacity: loadingProgress > (index + 1) * 15 ? 0.8 : 0.2,
                      transition: 'opacity 0.8s ease-out'
                    }}
                  />
                ))}
              </svg>
            </div>
          </div>

          {/* Dynamic Loading Text with Typewriter Effect */}
          <div className="mb-8 h-12 flex items-center justify-center">
            <div className="relative">
              <p className="text-2xl font-bold text-gray-800 animate-typewriter">
                {loadingTexts[currentText]}
              </p>
              <span className="animate-blink text-2xl text-gray-800">|</span>
            </div>
          </div>

          {/* Unique Progress Visualization */}
          <div className="mb-12">
            {/* Circular Progress Ring */}
            <div className="relative w-32 h-32 mx-auto mb-6">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (loadingProgress / 100) * 251.2}
                  className="transition-all duration-300 ease-out"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF5722" />
                    <stop offset="50%" stopColor="#FF9800" />
                    <stop offset="100%" stopColor="#FFC107" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-black text-gray-800">{Math.round(loadingProgress)}%</span>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="flex justify-center space-x-4">
              {['Planning', 'Venue', 'Vendors', 'Details', 'Ready!'].map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                    loadingProgress > (index + 1) * 20 
                      ? 'bg-green-500 text-white scale-110' 
                      : 'bg-white/50 text-gray-600'
                  }`}>
                    {loadingProgress > (index + 1) * 20 ? '✓' : index + 1}
                  </div>
                  <span className="text-xs mt-1 font-medium text-gray-700">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Completion Celebration */}
          {isComplete && (
            <div className="animate-celebration">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-12 py-6 rounded-3xl font-black text-xl mb-6 shadow-2xl transform animate-bounce-in">
                🎊 Your Event Universe is Ready to Explore! 🚀
              </div>
              <div className="flex justify-center space-x-4 text-4xl animate-wiggle">
                <span className="animate-bounce" style={{animationDelay: '0s'}}>🎉</span>
                <span className="animate-bounce" style={{animationDelay: '0.1s'}}>🎈</span>
                <span className="animate-bounce" style={{animationDelay: '0.2s'}}>🎂</span>
                <span className="animate-bounce" style={{animationDelay: '0.3s'}}>🎪</span>
                <span className="animate-bounce" style={{animationDelay: '0.4s'}}>✨</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes float-down {
          0% { transform: translateY(-100vh) rotate(0deg); }
          100% { transform: translateY(100vh) rotate(360deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes gradient-shift-reverse {
          0%, 100% { background-position: 100% 50%; }
          50% { background-position: 0% 50%; }
        }
        
        @keyframes sparkle {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
          50% { transform: scale(1.5) rotate(180deg); opacity: 0.5; }
        }
        
        @keyframes sparkle-delayed {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.8; }
          50% { transform: scale(1.3) rotate(-180deg); opacity: 0.3; }
        }
        
        @keyframes sparkle-slow {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.6; }
          50% { transform: scale(1.2) rotate(90deg); opacity: 1; }
        }
        
        @keyframes orbit-float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-8px) scale(1.1); }
        }
        
        @keyframes dash {
          0% { stroke-dashoffset: 10; }
          100% { stroke-dashoffset: 0; }
        }
        
        @keyframes typewriter {
          from { width: 0; }
          to { width: 100%; }
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        @keyframes celebration {
          0% { transform: scale(0) rotate(-180deg); opacity: 0; }
          50% { transform: scale(1.2) rotate(0deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        
        @keyframes bounce-in {
          0% { transform: scale(0.3) translateY(100px); }
          50% { transform: scale(1.05) translateY(-10px); }
          70% { transform: scale(0.9) translateY(0px); }
          100% { transform: scale(1) translateY(0px); }
        }
        
        @keyframes wiggle {
          0%, 7% { transform: rotateZ(0); }
          15% { transform: rotateZ(-15deg); }
          20% { transform: rotateZ(10deg); }
          25% { transform: rotateZ(-10deg); }
          30% { transform: rotateZ(6deg); }
          35% { transform: rotateZ(-4deg); }
          40%, 100% { transform: rotateZ(0); }
        }
        
        .animate-float-down {
          animation: float-down linear infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 12s linear infinite;
        }
        
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
        
        .animate-gradient-shift-reverse {
          background-size: 200% 200%;
          animation: gradient-shift-reverse 3s ease infinite;
        }
        
        .animate-sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }
        
        .animate-sparkle-delayed {
          animation: sparkle-delayed 2.5s ease-in-out infinite;
        }
        
        .animate-sparkle-slow {
          animation: sparkle-slow 3s ease-in-out infinite;
        }
        
        .animate-orbit-float {
          animation: orbit-float 2s ease-in-out infinite;
        }
        
        .animate-dash {
          animation: dash 2s linear infinite;
        }
        
        .animate-typewriter {
          overflow: hidden;
          white-space: nowrap;
          animation: typewriter 2s steps(40, end);
        }
        
        .animate-blink {
          animation: blink 1s infinite;
        }
        
        .animate-celebration {
          animation: celebration 1s ease-out;
        }
        
        .animate-bounce-in {
          animation: bounce-in 1s ease-out;
        }
        
        .animate-wiggle {
          animation: wiggle 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default McMerrysLoader2;