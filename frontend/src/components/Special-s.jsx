import { Link } from 'react-router-dom';

export default function SocialEventsBooking() {
  return (
    <>
    <h2 className="text-3xl font-bold mb-8 text-center  text-black">Our Well known services</h2>
  
    <div className="flex items-center justify-center min-h-fit">
       
  
      <div className="relative w-[750px] lg:h-[600px]  rounded-xl overflow-hidden">
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
        <div className="absolute inset-0 flex items-center justify-center z-10">
          {/* Top - Corporate Events */}
          <div className="absolute -translate-y-52 flex flex-col items-center">
            <Link to="/event?name=Corporate Events" className="flex flex-col items-center hover:scale-105 transition-transform duration-300">
              <div className="bg-white/50 backdrop-blur-sm p-2 rounded-full shadow-lg">
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWXtstFskreGHnzmcbmQodI1PpeKxUSyqJIM6-z-GAe6PbgRSCA45SwyDm4Zb_3gI5XBw&usqp=CAU" 
                  alt="Corporate Events"
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
              <span className="mt-2 text-black font-bold font-netflix text-lg">Corporate Events</span>
            </Link>
          </div>

          {/* Bottom left - Social Events */}
          <div className="absolute translate-y-24 -translate-x-48 flex flex-col items-center">
            <Link to="/event?name=Social Events" className="flex flex-col items-center hover:scale-105 transition-transform duration-300">
              <div className="bg-white/50 backdrop-blur-sm p-2 rounded-full shadow-lg">
                <img 
                  src="https://img.freepik.com/premium-vector/social-media-community-icon_24908-31874.jpg" 
                  alt="Social Events"
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
              <span className="mt-2 text-black font-bold font-netflix text-lg">Social Events</span>
            </Link>
          </div>

          {/* Bottom right - School Events */}
          <div className="absolute translate-y-24 translate-x-48 flex flex-col items-center">
            <Link to="/event?name=School Events" className="flex flex-col items-center hover:scale-105 transition-transform duration-300">
              <div className="bg-white/50 backdrop-blur-sm p-2 rounded-full shadow-lg">
                <img 
                  src="https://static.vecteezy.com/system/resources/thumbnails/044/764/471/small/school-icon-3d-render-concept-of-education-icon-illustration-png.png" 
                  alt="School Events"
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
              <span className="mt-2 text-black font-bold font-netflix text-lg">School Events</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
      </>
  );
}
