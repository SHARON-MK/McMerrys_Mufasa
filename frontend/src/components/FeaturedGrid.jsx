import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, Lightbulb, DollarSign, Heart, Clock } from 'lucide-react';

const gridItems = [
  {
    id: 1,
    title: "End-to-End Service",
    description:
      "From concept to clean-up, we handle everything—planning, logistics, vendor coordination, and on-site management—so clients can relax and enjoy their event.",
    icon: CheckCircle,
    gradient: "from-blue-600 to-purple-700",
    iconColor: "text-green-500",
    iconBg: "bg-green-100",
  },
  {
    id: 2,
    title: "Creative and Custom Concepts",
    description:
      "We don't believe in one-size-fits-all. Our team brings fresh, personalized ideas that align with your vision, brand, and audience.",
    icon: Lightbulb,
    gradient: "from-orange-500 to-red-600",
    iconColor: "text-yellow-500",
    iconBg: "bg-yellow-100",
  },
  {
    id: 3,
    title: "Budget-Friendly Planning",
    description:
      "We know how to create incredible experiences without overspending. Smart planning, cost-saving strategies, and transparency are part of our process.",
    icon: DollarSign,
    gradient: "from-green-500 to-emerald-600",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-100",
  },
  {
    id: 4,
    title: "Client-Centric Approach",
    description:
      "We listen. Your goals become our mission. We're flexible, responsive, and dedicated to making your event memorable and meaningful.",
    icon: Heart,
    gradient: "from-pink-500 to-rose-600",
    iconColor: "text-pink-500",
    iconBg: "bg-pink-100",
  },
  {
    id: 5,
    title: "No More Delays",
    description:
      "Since we're organizing the entire event ourselves, there's no stress or delays caused by dealing with third parties — everything is under our control.",
    icon: Clock,
    gradient: "from-indigo-500 to-blue-600",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
  },
];

const NetflixStyleGrid = () => {
  const scrollContainerRef = useRef(null);
  const [isManuallyScrolling, setIsManuallyScrolling] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const manualScrollTimeoutRef = useRef(null);

  // Duplicate items for infinite loop effect
  const duplicatedItems = [...gridItems, ...gridItems, ...gridItems];

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

      const scrollAmount = 320;
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
      }, 3000);
    }
  };

  useEffect(() => {
    let autoScrollInterval;

    const startAutoScroll = () => {
      autoScrollInterval = setInterval(() => {
        if (scrollContainerRef.current && !isManuallyScrolling) {
          const container = scrollContainerRef.current;
          const itemWidth = 300;
          const gap = 24;
          const singlePassWidth = (itemWidth + gap) * gridItems.length;

          if (container.scrollLeft >= singlePassWidth) {
            container.scrollLeft = container.scrollLeft - singlePassWidth;
          } else {
            container.scrollLeft += 0.5;
          }

          updateScrollButtons();
        }
      }, 20);
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
  }, [isManuallyScrolling]);

  useEffect(() => {
    const handleScroll = () => {
      updateScrollButtons();
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      updateScrollButtons();
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <section className="py-16 ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8  text-black">
          Even more reasons to be part of this.
        </h2>

        <div className="relative group">
          {/* Scroll buttons */}
          <button 
            onClick={() => scroll('left')}
            className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-black p-3 rounded-full shadow-xl transition-all duration-300 ${
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
            className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-black p-3 rounded-full shadow-xl transition-all duration-300 ${
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
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            onMouseEnter={() => setIsManuallyScrolling(true)}
            onMouseLeave={() => {
              if (manualScrollTimeoutRef.current) {
                clearTimeout(manualScrollTimeoutRef.current);
              }
              manualScrollTimeoutRef.current = setTimeout(() => {
                setIsManuallyScrolling(false);
              }, 1000);
            }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {duplicatedItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={`${item.id}-${index}`} className="flex-none w-[300px]  group/card">
                  <div className={`relative overflow-hidden rounded-lg bg-gradient-to-br shadow-lg border border-gray-300 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 p-6 h-[280px] flex flex-col justify-between cursor-pointer`}>
                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold  text-black  mb-3 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-sm text-black/90 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    
                    {/* Colorful Icon in bottom right */}
                    <div className="flex justify-end">
                      <div className={`${item.iconBg} backdrop-blur-sm rounded-full p-3 group-hover/card:scale-110 transition-all duration-300 shadow-lg`}>
                        <IconComponent className={`w-6 h-6 ${item.iconColor}`} />
                      </div>
                    </div>
                    
                    {/* Hover overlay effect */}
                    <div className="absolute inset-0 bg-white/0 hover:bg-white/5 transition-all duration-300 rounded-lg pointer-events-none"></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Gradient overlays for smooth edges */}
          {/* <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black via-black/50 to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black via-black/50 to-transparent pointer-events-none z-10"></div> */}
        </div>
      </div>
    </section>
  );
};

export default NetflixStyleGrid;