import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const gridItems = [
  { id: 1, image: "https://source.unsplash.com/random/300x200?nature", title: "Nature" },
  { id: 2, image: "https://source.unsplash.com/random/300x200?city", title: "City" },
  { id: 3, image: "https://source.unsplash.com/random/300x200?technology", title: "Tech" },
  { id: 4, image: "https://source.unsplash.com/random/300x200?food", title: "Food" },
  { id: 5, image: "https://source.unsplash.com/random/300x200?travel", title: "Travel" },
  { id: 6, image: "https://source.unsplash.com/random/300x200?art", title: "Art" },
];

const FeaturedGrid = () => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300; // Adjust this value based on your needs
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const newScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 bg-[#fff700]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-black">Featured Content</h2>
        
        {/* Scroll container with buttons */}
        <div className="relative">
          {/* Scroll buttons - visible on mobile */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 text-[#fff700] p-2 rounded-full shadow-lg md:hidden"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 text-[#fff700] p-2 rounded-full shadow-lg md:hidden"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Scrollable container */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 pb-4"
          >
            {gridItems.map((item) => (
              <div 
                key={item.id} 
                className="flex-none w-[280px] md:w-1/2 lg:w-1/3 snap-start"
              >
                <div className="group relative overflow-hidden rounded-lg bg-white shadow-lg mx-2">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition">
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Gradient overlays for smooth scrolling effect */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#fff700] to-transparent pointer-events-none md:hidden"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#fff700] to-transparent pointer-events-none md:hidden"></div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedGrid; 