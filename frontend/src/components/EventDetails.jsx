import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventById, createBooking, clearError, clearBookingSuccess } from '../store/slices/eventsSlice';
import StandardBookingForm from './forms/StandardBookingForm';
import WorkshopBookingForm from './forms/WorkshopBookingForm';
import ConcertBookingForm from './forms/ConcertBookingForm';
import BirthdayPartyForm from './forms/BirthdayPartyForm';
import SocialEventForm from './forms/SocialEventForm';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedEvent: event, loading, error, bookingSuccess } = useSelector((state) => state.events);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const modalRef = useRef(null);
  
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    numberOfTickets: 1,
    // Additional fields for specific forms
    experienceLevel: '',
    participants: 1,
    seatingPreference: '',
    isBirthdayPerson: '',
    birthdayPersonName: '',
    age: '',
    favoriteColors: '',
    desiredVibe: '',
    guestCount: '',
    venuePreference: '',
    entertainment: [],
    foodPreference: '',
    budgetRange: '',
    occasion: '',
    eventVibe: '',
    features: [],
    foodType: '',
    additionalServices: []
  });

  useEffect(() => {
    dispatch(fetchEventById(id));
    return () => {
      dispatch(clearError());
      dispatch(clearBookingSuccess());
    };
  }, [dispatch, id]);

    useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
    

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      const currentValues = bookingData[name] || [];
      if (checked) {
        setBookingData(prev => ({
          ...prev,
          [name]: [...currentValues, value]
        }));
      } else {
        setBookingData(prev => ({
          ...prev,
          [name]: currentValues.filter(v => v !== value)
        }));
      }
    } else {
      setBookingData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createBooking({ eventId: id, bookingData }));
  };

  const handleCloseModal = () => {
    if (bookingData.name || bookingData.email || bookingData.phone) {
      if (window.confirm('Are you sure you want to close? Your form data will be lost.')) {
        setShowBookingForm(false);
        setBookingData({
          name: '',
          email: '',
          phone: '',
          numberOfTickets: 1,
          experienceLevel: '',
          participants: 1,
          seatingPreference: '',
          isBirthdayPerson: '',
          birthdayPersonName: '',
          age: '',
          favoriteColors: '',
          desiredVibe: '',
          guestCount: '',
          venuePreference: '',
          entertainment: [],
          foodPreference: '',
          budgetRange: '',
          occasion: '',
          eventVibe: '',
          features: [],
          foodType: '',
          additionalServices: []
        });
      }
    } else {
      setShowBookingForm(false);
    }
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    if (showBookingForm) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showBookingForm]);

  const renderBookingForm = () => {
    if (!event) return null;
  
    const category = event.category?.name?.toLowerCase();
    console.log(category,"category");
    
    switch (category) {
      case 'Corporate Events':
        return (
          <WorkshopBookingForm
            event={event}
            bookingData={bookingData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        );
      case 'concert':
        return (
          <ConcertBookingForm
            event={event}
            bookingData={bookingData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        );
      case 'birthday events':
        return (
          <BirthdayPartyForm
            event={event}
            bookingData={bookingData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        );
      case 'social':
        return (
          <SocialEventForm
            event={event}
            bookingData={bookingData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return (
          <StandardBookingForm
            event={event}
            bookingData={bookingData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fff700] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#fff700] flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-[#fff700] flex items-center justify-center">
        <div className="text-black">Event not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff700] py-24 ">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 text-black font-bold hover:underline flex items-center"
        >
          ← Back to Events
        </button>

        <div className="space-y-6">
          {/* Event Details Section */}
          <div className="bg-black/50 rounded-lg p-4 text-white">
            <h1 className="text-2xl font-bold mb-3 text-[#fff700]">{event.title}</h1>
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-72 object-cover rounded-lg mb-4"
            />
            
            {/* Event Information Grid */}
          

            {/* Event Description */}
            <div className="mb-4">
              <h2 className="text-lg font-bold mb-2 text-[#fff700]">About This Event</h2>
              <p className="text-gray-200 text-sm leading-relaxed">{event.description}</p>
            </div>

            {/* Event Features */}
            {event.features && event.features.length > 0 && (
              <div>
                <h2 className="text-lg font-bold mb-2 text-[#fff700]">Features & Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {event.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 bg-black/30 p-2 rounded-lg">
                      <svg className="w-4 h-4 text-[#fff700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Book Now Button */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setShowBookingForm(true)}
                className="bg-black text-[#fff700] px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors shadow-lg"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div 
            ref={modalRef}
            className="bg-black/90 rounded-lg p-6 text-white w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#fff700]">Book Now</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>
            {bookingSuccess ? (
              <div className="text-green-500 mb-4 text-sm">
                Booking successful! We'll send you a confirmation email shortly.
              </div>
            ) : (
              <div>
                {renderBookingForm()}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails; 