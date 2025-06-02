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
    <div className="min-h-screen bg-[#fff700] py-28 px-4">
      <div className="max-w-7xl mx-auto">
      <button
          onClick={() => navigate(-1)}
          className="mb-8 text-black font-bold hover:underline flex items-center"
        >
          ← Back to Home
        </button>
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 capitalize">
            {categoryParam} Events
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Curated {categoryParam?.toLowerCase()} event experiences.
          </p>
        </div>

        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredEvents.map((event, idx) => (
              <Link to = {`/event-details/${event._id}`}>
              <div
                key={idx}
                className="bg-white rounded-xl shadow hover:shadow-lg transition-transform hover:-translate-y-1"
              >
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-32 object-cover rounded-t-xl"
                />
                <div className="p-3">
                  <div className="flex justify-between items-center mb-1">
                    <h2 className="text-base font-semibold text-gray-800">{event.title}</h2>
                    <span className="text-xs bg-yellow-300 text-gray-900 px-2 py-0.5 rounded-full">
                      {event.category.name}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
                  <button className="mt-3 w-full text-sm bg-yellow-400 text-gray-900 font-medium py-1.5 rounded hover:bg-yellow-300 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>

              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No events found for "{categoryParam}".</p>
            <a
              href="/events"
              className="mt-4 inline-block bg-yellow-400 text-gray-900 font-medium py-2 px-6 rounded hover:bg-yellow-300 transition"
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
