import React, { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../store/slices/eventsSlice';
import { Link } from 'react-router-dom';

const Services = () => {
  const dispatch = useDispatch();
  const { items: events, loading, error } = useSelector((state) => state.events);
  const scrollRef = useRef(null);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const scroll = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-[#fff700]">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-[#fff700]">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-600">
            {error}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-[#fff700]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8  text-center text-black">Our Services</h2>

        {/* Responsive container for cards */}
        <div className="relative">
          {/* Left Arrow - Hidden on mobile */}
          <button
            onClick={() => scroll(-300)}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black text-[#fff700] p-2 rounded-full shadow-lg hover:bg-[#333] hidden lg:block"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Cards Container - Stacked on mobile, horizontal on large screens */}
          <div
            ref={scrollRef}
            className="flex flex-col items-center lg:flex-row lg:overflow-x-auto lg:gap-6 gap-6 lg:px-12 scrollbar-hide"
          >
            {events.map((event, index) => (
              <Link
                to={`/event-details/${event._id}`}
                key={event._id || index}
                className="w-[90%] sm:w-[400px] md:w-[350px] lg:w-[300px] h-[400px] bg-black/50 rounded-lg border border-[#fff700]/20 overflow-hidden flex-shrink-0 flex flex-col hover:transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-[200px] object-cover"
                />
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold text-[#fff700]">{event.title}</h3>
                  <p className="text-gray-300 text-sm mt-1 line-clamp-3">{event.description}</p>
                  <div className="mt-auto pt-2">
                    <span className="text-[#fff700] text-sm font-medium">View Details →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Right Arrow - Hidden on mobile */}
          <button
            onClick={() => scroll(300)}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black text-[#fff700] p-2 rounded-full shadow-lg hover:bg-[#333] hidden lg:block"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
