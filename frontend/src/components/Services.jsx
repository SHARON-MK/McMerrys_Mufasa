import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const allServices = [
  {
    title: "Birthday Events",
    description: "Kids, teens, adults and milestone birthdays.",
    image: "https://source.unsplash.com/random/400x300?birthday-party"
  },
  {
    title: "Social Events",
    description: "Anniversaries, housewarmings, baby showers, and reunions.",
    image: "https://source.unsplash.com/random/400x300?social-event"
  },
  {
    title: "Corporate Events",
    description: "Product launches, conferences, team-building activities.",
    image: "https://source.unsplash.com/random/400x300?corporate-event"
  },
  {
    title: "School Events",
    description: "Annual days, youth festivals, IV tours, and decorations.",
    image: "https://source.unsplash.com/random/400x300?school-event"
  },
  {
    title: "Children's Birthday",
    description: "Fun-filled themed parties for kids.",
    image: "https://source.unsplash.com/random/400x300?kids-birthday"
  },
  {
    title: "Teens' Birthday",
    description: "Trendy celebrations for teenagers.",
    image: "https://source.unsplash.com/random/400x300?teen-party"
  },
  {
    title: "Adult Birthday",
    description: "Elegant birthday celebrations for adults.",
    image: "https://source.unsplash.com/random/400x300?adult-party"
  },
  {
    title: "Milestone Birthday",
    description: "Celebrate big moments like 18th, 25th, 50th birthdays.",
    image: "https://source.unsplash.com/random/400x300?milestone-party"
  },
  {
    title: "Engagements & Haldi",
    description: "Pre-wedding events with traditional vibes.",
    image: "https://source.unsplash.com/random/400x300?engagement"
  },
  {
    title: "Naming & Baby Showers",
    description: "Heartwarming ceremonies for newborns.",
    image: "https://source.unsplash.com/random/400x300?baby-shower"
  },
  {
    title: "Religious Events",
    description: "Spiritual setups for sacred occasions.",
    image: "https://source.unsplash.com/random/400x300?religious"
  }
];

const Services = () => {
  const scrollRef = useRef(null);

  const scroll = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-[#fff700]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-black">Our Services</h2>

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
            className="flex flex-col items-center lg:flex-row lg:overflow-x-auto lg:space-x-4 space-y-4 lg:space-y-0 lg:px-12 scrollbar-hide"
          >
            {allServices.map((service, index) => (
              <div
                key={index}
                className="w-full lg:min-w-[280px] lg:max-w-[300px] bg-black/50 rounded-lg border border-[#fff700]/20 overflow-hidden flex-shrink-0"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#fff700]">{service.title}</h3>
                  <p className="text-gray-300 text-sm">{service.description}</p>
                </div>
              </div>
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
