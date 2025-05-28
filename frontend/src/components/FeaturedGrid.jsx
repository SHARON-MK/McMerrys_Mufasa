import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const gridItems = [
  {
    id: 1,
    title: "End-to-End Service",
    description:
      "From concept to clean-up, we handle everything—planning, logistics, vendor coordination, and on-site management—so clients can relax and enjoy their event.",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNjMGbhzv7usKnXMTk6lvCvLvpduKDebJqg1A0Scxz33fNiEsg4WobFySEMzbDBzSD5LY&usqp=CAU",
  },
  {
    id: 2,
    title: "Creative and Custom Concepts",
    description:
      "We don't believe in one-size-fits-all. Our team brings fresh, personalized ideas that align with your vision, brand, and audience.",
    icon: "https://ideas.ted.com/wp-content/uploads/sites/3/2013/10/creativeconfidence1.png",
  },
  {
    id: 3,
    title: "Budget-Friendly Planning",
    description:
      "We know how to create incredible experiences without overspending. Smart planning, cost-saving strategies, and transparency are part of our process.",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjZeturh08kVOthysM6n1N1uISziern5kW8w&s",
  },
  {
    id: 4,
    title: "Client-Centric Approach",
    description:
      "We listen. Your goals become our mission. We're flexible, responsive, and dedicated to making your event memorable and meaningful.",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRboEM57p_bZazlcpRU4nCDrj7v3RuNG0GgDw&s",
  },
  {
    id: 5,
    title: "No More Delays",
    description:
      "Since we're organizing the entire event ourselves, there's no stress or delays caused by dealing with third parties — everything is under our control.",
    icon: "https://img.freepik.com/premium-photo/caucasian-businessman-showing-clock-time-management_220873-7701.jpg",
  },
];

const FeaturedGrid = () => {
  const scrollContainerRef = useRef(null);
  const [isManuallyScrolling, setIsManuallyScrolling] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const manualScrollTimeoutRef = useRef(null);

  // Duplicate items for infinite loop effect
  const duplicatedItems = [...gridItems, ...gridItems, ...gridItems]; // Duplicate multiple times for better effect

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 1
      );
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      setIsManuallyScrolling(true);

      if (manualScrollTimeoutRef.current) {
        clearTimeout(manualScrollTimeoutRef.current);
      }

      const scrollAmount = 320; // Adjust this value based on your needs
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const newScroll =
        direction === 'left'
          ? Math.max(0, currentScroll - scrollAmount)
          : currentScroll + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth',
      });

      manualScrollTimeoutRef.current = setTimeout(() => {
        setIsManuallyScrolling(false);
      }, 3000); // Resume after 3 seconds of inactivity
    }
  };

  useEffect(() => {
    let autoScrollInterval;

    const startAutoScroll = () => {
      autoScrollInterval = setInterval(() => {
        if (scrollContainerRef.current && !isManuallyScrolling) {
          const container = scrollContainerRef.current;
          const itemWidth = 300; // Match the item width in CSS
          const gap = 24; // Match the gap in CSS (gap-6 = 24px)
          const singlePassWidth = (itemWidth + gap) * gridItems.length;

          // Check if we are near the end of the original items (in the first duplicated set)
          if (container.scrollLeft >= singlePassWidth) {
             // Jump back to the start of the second set of items instantly
            container.scrollLeft = container.scrollLeft - singlePassWidth;
          } else {
            container.scrollLeft += 0.5; // Adjust scroll speed here (smaller value = slower scroll)
          }

          updateScrollButtons();
        }
      }, 20); // Adjust interval for smoother/faster scroll
    };

    if (!isManuallyScrolling) {
       startAutoScroll();
    }

    return () => {
      clearInterval(autoScrollInterval);
      if (manualScrollTimeoutRef.current) {
         clearTimeout(manualScrollTimeoutRef.current);
      }
    };
  }, [isManuallyScrolling]); // Re-run effect when manual scrolling state changes

  useEffect(() => {
    const handleScroll = () => {
      updateScrollButtons();
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      // Initial check for button state
      updateScrollButtons();
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <section className="py-16 bg-[#fff700]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-black">
         Even more reasons to be part of this.
        </h2>

        {/* Scroll container with buttons */}
        <div className="relative group">
          {/* Scroll buttons - visible on mobile */}
          <button 
            onClick={() => scroll('left')}
            className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/90 hover:bg-black text-[#fff700] p-3 rounded-full shadow-xl transition-all duration-300 ${
              canScrollLeft
                ? 'opacity-0 group-hover:opacity-100 hover:scale-110'
                : 'opacity-30 cursor-not-allowed'
            }`}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={() => scroll('right')}
            className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/90 hover:bg-black text-[#fff700] p-3 rounded-full shadow-xl transition-all duration-300 ${
              canScrollRight
                ? 'opacity-0 group-hover:opacity-100 hover:scale-110'
                : 'opacity-30 cursor-not-allowed'
            }`}
            disabled={!canScrollRight}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-4 scroll-smooth"
            style={{
              scrollbarWidth: 'none', // For Firefox
              msOverflowStyle: 'none', // For Internet Explorer and Edge
            }}
            onMouseEnter={() => setIsManuallyScrolling(true)}
            onMouseLeave={() => {
              if (manualScrollTimeoutRef.current) {
                clearTimeout(manualScrollTimeoutRef.current);
              }
              manualScrollTimeoutRef.current = setTimeout(() => {
                setIsManuallyScrolling(false);
              }, 1000); // Adjust delay as needed
            }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>

           {duplicatedItems.map((item, index) => (
  <div key={`${item.id}-${index}`} className="flex-none w-[300px] group/card">
    <div className="relative overflow-hidden rounded-xl bg-black/50 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-4 flex flex-col items-start justify-between h-full">
      <img
        src={item.icon}
        alt={item.title}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
      <p className="text-sm text-gray-300">{item.description}</p>
    </div>
  </div>
))}

          </div>

          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#fff700] via-[#fff700]/50 to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#fff700] via-[#fff700]/50 to-transparent pointer-events-none z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedGrid;
