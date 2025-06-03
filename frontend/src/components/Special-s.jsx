import { Link } from 'react-router-dom';

export default function SocialEventsBooking() {
  return (
    <div className="py-12 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-black">Our Well known services</h2>
  
      <div className="flex items-center justify-center">
        <div className="relative w-full max-w-[750px] min-h-[600px] rounded-xl overflow-hidden">
          {/* Background image with grayscale and opacity */}
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: "url('./bg/rec-symbol3-1.webp')",
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              filter: 'grayscale(100%) opacity(0.3)',
            }}
          ></div>

          {/* Foreground Content */}
          <div className="absolute inset-0 flex items-center justify-center p-4 z-10">
            <div className="relative w-full max-w-[600px] h-[500px] md:h-[600px]">
              {/* Corporate Events - Top */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2">
                <Link to="/event?name=Corporate Events" className="flex flex-col items-center hover:scale-105 transition-transform duration-300">
                  <div className="bg-white/50 backdrop-blur-sm p-2 rounded-full shadow-lg w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                    <img 
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWXtstFskreGHnzmcbmQodI1PpeKxUSyqJIM6-z-GAe6PbgRSCA45SwyDm4Zb_3gI5XBw&usqp=CAU" 
                      alt="Corporate Events"
                      className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover object-center"
                    />
                  </div>
                  <span className="mt-2 text-black font-bold  text-base md:text-lg">Corporate Events</span>
                </Link>
              </div>

              {/* Social Events - Bottom Left */}
              <div className="absolute bottom-20 md:bottom-20 left-0 md:left-20">
                <Link to="/event?name=Social Events" className="flex flex-col items-center hover:scale-105 transition-transform duration-300">
                  <div className="bg-white/50 backdrop-blur-sm p-2 rounded-full shadow-lg w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                    <img 
                      src="https://img.freepik.com/premium-vector/social-media-community-icon_24908-31874.jpg" 
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
                  <div className="bg-white/50 backdrop-blur-sm p-2 rounded-full shadow-lg w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                    <img 
                      src="https://static.vecteezy.com/system/resources/thumbnails/044/764/471/small/school-icon-3d-render-concept-of-education-icon-illustration-png.png" 
                      alt="School Events"
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
    </div>
  );
}
