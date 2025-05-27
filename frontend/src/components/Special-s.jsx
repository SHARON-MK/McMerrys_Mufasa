import { Users, Calendar, MapPin } from "lucide-react";

export default function SocialEventsBooking() {
  return (
    <div className="min-h-screen bg-[#fff700] flex items-center justify-center p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        {/* The header section has been removed as per user request. */}

        {/* The service icons section has been removed as per user request. */}

        <div className="flex flex-col lg:flex-row items-center justify-center gap-20">
          
          {/* Recycling Symbol Only */}
          <div className="relative w-96 h-96 flex-shrink-0 hover:scale-110 transition-transform duration-500 cursor-pointer">
            <svg viewBox="0 0 300 300" className="w-full h-full">
              {/* Recycling Symbol - 3 curved arrows */}
              <g className="drop-shadow-xl">
                {/* Top arrow */}
                <path 
                  d="M130 40 L170 40 L150 20 L180 50 L160 60 C180 60 195 75 195 95 L175 85 C175 80 170 75 165 75 L135 75 Z" 
                  fill="rgba(132, 204, 22, 0.95)"
                />
                
                {/* Bottom right arrow */}
                <path 
                  d="M130 40 L170 40 L150 20 L180 50 L160 60 C180 60 195 75 195 95 L175 85 C175 80 170 75 165 75 L135 75 Z" 
                  fill="rgba(101, 163, 13, 0.95)"
                  transform="rotate(120 150 150)"
                />
                
                {/* Bottom left arrow */}
                <path 
                  d="M130 40 L170 40 L150 20 L180 50 L160 60 C180 60 195 75 195 95 L175 85 C175 80 170 75 165 75 L135 75 Z" 
                  fill="rgba(163, 230, 53, 0.95)"
                  transform="rotate(240 150 150)"
                />
              </g>

              {/* People Icons in Yellow Circles */}
              {/* Top person */}
              <circle cx="150" cy="70" r="30" fill="#FEF08A" className="drop-shadow-lg" />
              <g transform="translate(150, 70)">
                <circle cx="0" cy="-6" r="8" fill="#78350F" />
                <path d="M-10 3 C-10 10 -5 15 0 15 C5 15 10 10 10 3 Z" fill="#78350F" />
              </g>
              
              {/* Bottom right person */}
              <circle cx="220" cy="200" r="30" fill="#FEF08A" className="drop-shadow-lg" />
              <g transform="translate(220, 200)">
                <circle cx="0" cy="-6" r="8" fill="#78350F" />
                <path d="M-10 3 C-10 10 -5 15 0 15 C5 15 10 10 10 3 Z" fill="#78350F" />
              </g>
              
              {/* Bottom left person */}
              <circle cx="80" cy="200" r="30" fill="#FEF08A" className="drop-shadow-lg" />
              <g transform="translate(80, 200)">
                <circle cx="0" cy="-6" r="8" fill="#78350F" />
                <path d="M-10 3 C-10 10 -5 15 0 15 C5 15 10 10 10 3 Z" fill="#78350F" />
              </g>
            </svg>
          </div>

          {/* The section with 3 Service Icons has been removed as per user request. */}

        </div>
      </div>
    </div>
  );
}