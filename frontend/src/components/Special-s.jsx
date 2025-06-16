// import { Briefcase, PercentSquareIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
// import { IoPersonOutline } from "react-icons/io5";
// import { BsPersonFill } from "react-icons/bs";

export default function SocialEventsBooking() {
  return (
    <div className="py-12 px-4 relative overflow-hidden">
      {/* Minimal Background Animations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Small floating particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gray-400 rounded-full opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 3}s`
            }}
          />
        ))}

        {/* Subtle background shapes */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-gray-200 rounded-full opacity-20 animate-pulse" />
        <div className="absolute bottom-20 left-10 w-16 h-16 bg-gray-300 rounded-full opacity-20 animate-bounce" style={{ animationDuration: '3s' }} />
      </div>

      <h2 className="text-3xl font-bold mb-8 text-center text-black">Our Well known services</h2>

      <div className="flex items-center justify-center">
        <div className="relative w-full max-w-[600px] min-h-[550px] rounded-xl overflow-hidden">
          {/* Background image with grayscale and opacity */}
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: "url('./bg/rec-symbol3-1.png')",
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',

            }}
          ></div>

          {/* Foreground Content */}
          <div className="absolute inset-0 flex items-center justify-center p-4 z-10">
            <div className="relative w-full max-w-[600px] h-[450px] md:h-[550px]">
              {/* Corporate Events - Top */}

              <div className="absolute top-3 left-1/2 -translate-x-1/2">
                <Link to="/event?name=Corporate Events" className="flex flex-col items-center hover:scale-105 transition-transform duration-300">
                  <div
                    className="bg-white/50 backdrop-blur-sm p-2 rounded-full shadow-lg w-16 h-16 md:w-20 md:h-20 flex items-center justify-center animate-float-icon"
                    style={{ animationDelay: "1s" }}
                  >
                    <img
                      src="https://img.freepik.com/free-photo/yes_53876-47102.jpg?semt=ais_hybrid&w=740"
                      alt="Corporate"
                      className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover object-center"
                    />
                  </div>
                  <span className="mt-2 text-black font-bold text-base md:text-lg">Corporate Events</span>
                </Link>
              </div>

              {/* Social Events - Bottom Left */}
              <div className="absolute bottom-20 md:bottom-20 left-0 md:left-20">
                <Link to="/event?name=Social Events" className="flex flex-col items-center hover:scale-105 transition-transform duration-300">
                  <div
                    className="bg-white/50 backdrop-blur-sm p-2 rounded-full shadow-lg w-16 h-16 md:w-20 md:h-20 flex items-center justify-center animate-float-icon"
                    style={{ animationDelay: "1s" }}
                  >
                    <img
                      src="https://img.freepik.com/free-photo/medium-shot-family-celebrating-4th-july_23-2149383077.jpg?ga=GA1.1.361569955.1750094838&semt=ais_hybrid&w=740"
                      alt="Social Events"
                      className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover object-center"
                    />
                  </div>

                  <span className="mt-2 text-black font-bold  text-base md:text-lg">Social Events</span>
                </Link>
              </div>

              {/* School Events - Bottom Right */}
              <div className="absolute bottom-20 md:bottom-20 right-0 md:right-20">
                <Link to="/event?name=School Events" className="flex flex-col items-center hover:scale-105 transition-transform duration-300">
                <div
                    className="bg-white/50 backdrop-blur-sm p-2 rounded-full shadow-lg w-16 h-16 md:w-20 md:h-20 flex items-center justify-center animate-float-icon"
                    style={{ animationDelay: "1s" }}
                  >
                    <img
                      src="https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_1280.jpg"
                      alt="School"
                       className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover object-center"
                    />
                  </div>
                  <span className="mt-2 text-black font-bold  text-base md:text-lg">School Events</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Minimal Animation Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px); 
            opacity: 0.3;
          }
          50% { 
            transform: translateY(-15px); 
            opacity: 0.6;
          }
        }

        @keyframes float-icon {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          50% { 
            transform: translateY(-8px) rotate(2deg); 
          }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-float-icon {
          animation: float-icon 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}