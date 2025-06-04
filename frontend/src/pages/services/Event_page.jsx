import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { fetchEvents } from '../../store/slices/eventsSlice';

const EventPage = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('name');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: events, loading, error } = useSelector((state) => state.events);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 8;

  useEffect(() => {
    window.scrollTo({ top: 10, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const filteredEvents = events.filter(event =>
    event.category?.name?.toLowerCase().trim() === categoryParam?.toLowerCase().trim()
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  const currentEvents = filteredEvents.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Loading skeleton component
  const EventSkeleton = () => (
    <div className="bg-black rounded-xl shadow-lg overflow-hidden animate-pulse border-2 border-yellow-400">
      <div className="h-32 bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
      <div className="p-4">
        <div className="h-3 bg-yellow-300 rounded mb-2"></div>
        <div className="h-2 bg-yellow-200 rounded mb-2"></div>
        <div className="h-6 bg-yellow-400 rounded w-20"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#fff700' }}>
      {/* Animated Background */}
      <div className="fixed inset-0 z-[-1]">
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 bg-black rounded-full opacity-30 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            ></div>
          ))}
        </div>
        
        {/* Hexagonal Pattern Overlay */}
        <div className="absolute inset-0 opacity-20" 
             style={{
               backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 0)`,
               backgroundSize: '30px 30px'
             }}>
        </div>

        {/* Large geometric shapes */}
        <div className="absolute top-20 right-20 w-40 h-40 bg-black opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 left-10 w-32 h-32 bg-black opacity-10 transform rotate-45 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-black opacity-10 rounded-full animate-ping"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header Section */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 text-black font-bold hover:text-gray-800 flex items-center text-sm sm:text-base transition-all duration-300 hover:translate-x-1 group bg-black/10 px-4 py-2 rounded-full"
          >
            <span className="mr-2 transition-transform duration-300 group-hover:-translate-x-1">←</span>
            Back to Home
          </button>
          
          <div className="bg-black/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-black">
            <h1 className="text-4xl sm:text-5xl font-bold text-yellow-400 mb-3 bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              {categoryParam} 
            </h1>
            <p className="text-lg text-yellow-100 mb-6">
              Curated {categoryParam?.toLowerCase()} event experiences tailored for you.
            </p>
            
            {/* Event Statistics */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center bg-yellow-400 px-4 py-2 rounded-full border-2 border-black">
                <div className="w-3 h-3 bg-black rounded-full mr-3 animate-pulse"></div>
                <span className="text-black font-bold">
                  Total Events: {filteredEvents.length}
                </span>
              </div>
              <div className="flex items-center bg-black px-4 py-2 rounded-full border-2 border-yellow-400">
                <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
                <span className="text-yellow-400 font-bold">
                  This Page: {currentEvents.length}
                </span>
              </div>
              <div className="flex items-center bg-yellow-300 px-4 py-2 rounded-full border-2 border-black">
                <div className="w-3 h-3 bg-black rounded-full mr-3"></div>
                <span className="text-black font-bold">
                  Page {currentPage} of {totalPages}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[...Array(8)].map((_, idx) => (
              <EventSkeleton key={idx} />
            ))}
          </div>
        ) : filteredEvents.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {currentEvents.map((event, idx) => (
                <div
                  key={event.id || idx}
                  className="group bg-black rounded-xl shadow-xl hover:shadow-yellow-400/50 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 overflow-hidden border-2 border-yellow-400 hover:border-yellow-300"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  {/* Event Image */}
                  <div className="h-32 relative overflow-hidden">
                    {event.image ? (
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center">
                        <span className="text-3xl">🎭</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-2 left-2">
                      <span className="inline-block bg-black/80 backdrop-blur-sm text-yellow-400 px-2 py-1 rounded-full text-xs font-bold border border-yellow-400">
                        {event.category.name}
                      </span>
                    </div>
                  </div>

                  {/* Event Content */}
                  <div className="p-4 bg-black">
                    <h3 className="text-lg font-bold text-yellow-400 mb-2 group-hover:text-yellow-300 transition-colors duration-300 line-clamp-2">
                      {event.title}
                    </h3>
                    
                    <p className="text-yellow-100 text-sm mb-4 leading-relaxed line-clamp-2 overflow-hidden text-ellipsis">
                      {event.description?.length > 100 ? `${event.description.substring(0, 100)}...` : event.description}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <Link
                        to={`/event-details/${event._id}`}
                        className="inline-flex items-center bg-yellow-400 text-black px-4 py-2 rounded-full font-bold hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 text-sm border border-black"
                      >
                        View
                        <span className="ml-1 text-xs">→</span>
                      </Link>
                      
                      {/* Status Indicator */}
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse mr-1"></div>
                        <span className="text-yellow-400 text-xs font-bold">LIVE</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <div className="bg-black/90 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border-4 border-yellow-400">
                  <div className="flex items-center space-x-2">
                    {/* Previous Button */}
                    <button
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="w-10 h-10 rounded-full bg-yellow-400 text-black hover:bg-yellow-300 hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-bold border-2 border-black"
                    >
                      ←
                    </button>

                    {/* Page Numbers */}
                    {[...Array(totalPages)].map((_, idx) => {
                      const page = idx + 1;
                      const isActive = page === currentPage;
                      
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`w-10 h-10 rounded-full font-bold transition-all duration-300 flex items-center justify-center border-2 ${
                            isActive
                              ? 'bg-yellow-400 text-black border-black shadow-lg transform scale-110'
                              : 'bg-black text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-black hover:border-black'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}

                    {/* Next Button */}
                    <button
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="w-10 h-10 rounded-full bg-yellow-400 text-black hover:bg-yellow-300 hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-bold border-2 border-black"
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="bg-black/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border-4 border-yellow-400 max-w-md mx-auto">
              <div className="text-6xl mb-6">⚡</div>
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">
                No events found
              </h3>
              <p className="text-yellow-100 mb-8">
                No events found for "{categoryParam}". Check back soon for new events!
              </p>
              <Link
                to="/events"
                className="inline-flex items-center bg-yellow-400 text-black px-8 py-4 rounded-full font-bold hover:bg-yellow-300 hover:text-black transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-2 border-black"
              >
                View All Events
                <span className="ml-2">⚡</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(5deg); }
          50% { transform: translateY(0px) rotate(0deg); }
          75% { transform: translateY(20px) rotate(-5deg); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        /* Text truncation */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Custom scrollbar for yellow theme */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #0000;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #fff700;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #ffff00;
        }
      `}</style>
      
    </div>
  );
};

export default EventPage;