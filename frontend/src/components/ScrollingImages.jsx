import React, { useEffect, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';


const scrollingImages = [
  { id: 1, image: "https://source.unsplash.com/random/400x300?concert", title: "Live Concerts" },
  { id: 2, image: "https://source.unsplash.com/random/400x300?conference", title: "Conferences" },
  { id: 3, image: "https://source.unsplash.com/random/400x300?workshop", title: "Workshops" },
  { id: 4, image: "https://source.unsplash.com/random/400x300?festival", title: "Festivals" },
  { id: 5, image: "https://source.unsplash.com/random/400x300?standup", title: "Stand-up Comedy" },
  { id: 6, image: "https://source.unsplash.com/random/400x300?sports", title: "Sports Events" },
  { id: 7, image: "https://source.unsplash.com/random/400x300?theatre", title: "Theatre & Drama" },
  { id: 8, image: "https://source.unsplash.com/random/400x300?expo", title: "Exhibitions & Expos" },
];
const ScrollingImages = () => {
  const scrollRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const scrollSpeed = 1; // pixels per frame
    const itemWidth = 272; // 256px width + 16px margin
    const totalWidth = itemWidth * scrollingImages.length;

    const animate = () => {
      scrollPosition += scrollSpeed;
      
      // Reset position when we've scrolled through all original items
      if (scrollPosition >= totalWidth) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    // Pause on hover
    const handleMouseEnter = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };

    const handleMouseLeave = () => {
      animationRef.current = requestAnimationFrame(animate);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Create doubled array for seamless looping
  const doubledImages = [...scrollingImages, ...scrollingImages];

  return (
    <section className="py-8 bg-[#fff700] overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-black">Trending Now</h2>
        <div className="relative">
          <div 
            ref={scrollRef}
            className="flex space-x-4 overflow-x-hidden pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {doubledImages.map((item, index) => (
              <div 
                key={`${item.id}-${index}`}
                className="flex-none w-64 group cursor-pointer"
              >
                <div className="relative rounded-lg overflow-hidden shadow-lg bg-white">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-40 object-cover transform group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition">
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Gradient overlays for smooth scrolling effect */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#fff700] to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#fff700] to-transparent pointer-events-none z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default ScrollingImages;