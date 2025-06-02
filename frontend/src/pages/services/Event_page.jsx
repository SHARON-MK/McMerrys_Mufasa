import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { fetchEvents } from '../../store/slices/eventsSlice';


const EventPage = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('name');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {items:events,loading,error} = useSelector((state)=>state.events);
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  

  useEffect(()=>{
    dispatch(fetchEvents())
  },[dispatch])



  const filteredEvents = events.filter(event => 
    event.category?.name?.toLowerCase().trim() === categoryParam?.toLowerCase().trim()
  );

  return (
    <div className="min-h-screen bg-[#fff700] py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 text-black font-bold hover:underline flex items-center text-sm sm:text-base"
        >
          ← Back to Home
        </button>
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 capitalize">
            {categoryParam} Events
          </h1>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Curated {categoryParam?.toLowerCase()} event experiences.
          </p>
        </div>

        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {filteredEvents.map((event, idx) => (
              <Link to={`/event-details/${event._id}`} key={idx}>
                <div className="bg-white rounded-xl shadow hover:shadow-lg transition-transform hover:-translate-y-1 h-full">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-40 sm:h-48 md:h-56 object-cover rounded-t-xl"
                  />
                  <div className="p-4 sm:p-5">
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-1">{event.title}</h2>
                      <span className="text-xs sm:text-sm bg-yellow-300 text-gray-900 px-2 py-1 rounded-full whitespace-nowrap">
                        {event.category.name}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 line-clamp-2 mb-3">{event.description}</p>
                    <button className="w-full text-sm sm:text-base bg-yellow-400 text-gray-900 font-medium py-2 rounded hover:bg-yellow-300 transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16">
            <p className="text-gray-500 text-base sm:text-lg md:text-xl">No events found for "{categoryParam}".</p>
            <a
              href="/events"
              className="mt-4 inline-block bg-yellow-400 text-gray-900 font-medium py-2 px-6 rounded hover:bg-yellow-300 transition text-sm sm:text-base"
            >
              View All Events
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventPage;
