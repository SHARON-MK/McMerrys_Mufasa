import { Users, Calendar, MapPin } from "lucide-react";

export default function SocialEventsBooking() {
  return (
    <div className="flex items-center justify-center min-h-fit">
 <div
            className="relative w-[750px] h-[400px] bg-fit bg-no-repeat bg-center rounded-xl transition-transform duration-500"
            style={{ backgroundImage: "url('./bg/rec-symbol3-1.webp')" }}
          >
            {/* Triangle arrangement of event icons */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Top icon - Users */}
              <div className="absolute -translate-y-20">
                <div className="bg-white/90 backdrop-blur-sm p-6 rounded-full shadow-lg hover:scale-110 transition-transform duration-300">
                  <Users size={48} className="text-blue-600" />
                </div>
              </div>
              
              {/* Bottom left icon - Calendar */}
              <div className="absolute translate-y-16 -translate-x-24">
                <div className="bg-white/90 backdrop-blur-sm p-6 rounded-full shadow-lg hover:scale-110 transition-transform duration-300">
                  <Calendar size={48} className="text-green-600" />
                </div>
              </div>
              
              {/* Bottom right icon - MapPin */}
              <div className="absolute translate-y-16 translate-x-24">
                <div className="bg-white/90 backdrop-blur-sm p-6 rounded-full shadow-lg hover:scale-110 transition-transform duration-300">
                  <MapPin size={48} className="text-red-600" />
                </div>
              </div>
            </div>
          </div>
              </div>
  );
}
