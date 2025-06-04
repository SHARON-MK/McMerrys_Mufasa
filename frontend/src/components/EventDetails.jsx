import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventById, createBooking, clearError, clearBookingSuccess } from '../store/slices/eventsSlice';
import StandardBookingForm from './forms/StandardBookingForm';
import BirthdayPartyForm from './forms/BirthdayPartyForm';
import SocialEventForm from './forms/SocialEventForm';
import CorporateEventsBookingForm from './forms/CorporateEventsBookingForm';
import SchoolEventsBookingForm from './forms/SchoolEventForm';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedEvent: event, loading, error, bookingSuccess } = useSelector((state) => state.events);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const modalRef = useRef(null);
  
  const [bookingData, setBookingData] = useState({
    // Common fields for all event types
    name: '',
    email: '',
    phone: '',
    numberOfTickets: 1,
    eventDate: '',
    guestCount: '',
    venuePreference: '',
    budgetRange: '',
    specialRequests: '',

    // Corporate Event specific fields
    companyName: '',
    jobTitle: '',
    duration: '',
    catering: '',
    equipment: [],
    specialRequirements: '',
    referralSource: '',
    eventGoals: '',
    comments: '',

    // Birthday Event specific fields
    isBirthdayPerson: '',
    birthdayPersonName: '',
    age: '',
    favoriteColors: '',
    desiredVibe: '',
    entertainment: [],
    foodPreference: '',

    // School Event specific fields
    schoolName: '',
    gradeLevel: '',
    numberOfStudents: '',
    eventType: '',
    duration: '',
    equipment: [],
    specialRequirements: '',
    dietaryRestrictions: '',
    chaperoneCount: '',

    // Social Event specific fields
    // occasion: '',
    // eventVibe: '',
    cateringStyle: '',
    decorations: '',
    entertainment: [],
    dietaryRequirements: '',
    ageGroups: [],
    specialAccommodations: '',
    referralSource: ''
  });

  console.log(bookingData);
  
 
  
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
      // Handle checkbox inputs (for arrays like equipment, entertainment, ageGroups)
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
    } else if (type === 'date') {
      // Handle date inputs
      setBookingData(prev => ({
        ...prev,
        [name]: value // Store the date in YYYY-MM-DD format
      }));
    } else if (type === 'number') {
      // Handle number inputs
      setBookingData(prev => ({
        ...prev,
        [name]: value === '' ? '' : Number(value)
      }));
    } else if (type === 'textarea') {
      // Handle textarea inputs
      setBookingData(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      // Handle all other inputs (text, email, tel, select)
      setBookingData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get the event category
    const category = event.category?.name?.toLowerCase();
    
    // Common required fields for all forms
    const commonRequiredFields = {
      name: 'Name',
      email: 'Email',
      phone: 'Phone Number',
      eventDate: 'Event Date',
      guestCount: 'Guest Count',
      venuePreference: 'Venue Preference'
    };

    // Category-specific required fields
    const categoryRequiredFields = {
      'corporate events': {
        companyName: 'Company Name',
        jobTitle: 'Job Title',
        duration: 'Event Duration'
      },
      'birthday events': {
        birthdayPersonName: 'Birthday Person Name',
        age: 'Age',
        desiredVibe: 'Desired Vibe'
      },
      'school events': {
        schoolName: 'School Name',
        gradeLevel: 'Grade Level',
        numberOfStudents: 'Number of Students',
        eventType: 'Event Type'
      },
      'social events': {
        // occasion: 'Occasion',
        // eventVibe: 'Event Vibe',
        cateringStyle: 'Catering Style'
      }
    };

    // Check common required fields
    const missingCommonFields = Object.entries(commonRequiredFields)
      .filter(([field]) => !bookingData[field])
      .map(([_, label]) => label);

    // Check category-specific required fields
    const missingCategoryFields = Object.entries(categoryRequiredFields[category] || {})
      .filter(([field]) => !bookingData[field])
      .map(([_, label]) => label);

    // Combine all missing fields
    const allMissingFields = [...missingCommonFields, ...missingCategoryFields];

    if (allMissingFields.length > 0) {
      // Show error message with missing fields
      alert(`Please fill in all required fields:\n${allMissingFields.join('\n')}`);
      return;
    }

    // If all required fields are filled, proceed with submission
    dispatch(createBooking({ eventId: id, bookingData }));
  };

  const handleCloseModal = () => {
    if (bookingData.name || bookingData.email || bookingData.phone) {
      if (window.confirm('Are you sure you want to close? Your form data will be lost.')) {
        setShowBookingForm(false);
        setBookingData({
          // Common fields
          name: '',
          email: '',
          phone: '',
          numberOfTickets: 1,
          eventDate: '',
          guestCount: '',
          venuePreference: '',
          budgetRange: '',
          specialRequests: '',

          // Corporate Event fields
          companyName: '',
          jobTitle: '',
         
          duration: '',
          catering: '',
          equipment: [],
          specialRequirements: '',
          referralSource: '',
          eventGoals: '',
          comments: '',

          // Birthday Event fields
          isBirthdayPerson: '',
          birthdayPersonName: '',
          age: '',
          favoriteColors: '',
          desiredVibe: '',
          entertainment: [],
          foodPreference: '',

          // School Event fields
          schoolName: '',
          gradeLevel: '',
          numberOfStudents: '',
          eventType: '',
          duration: '',
          equipment: [],
          specialRequirements: '',
          dietaryRestrictions: '',
          chaperoneCount: '',

          // Social Event fields
          occasion: '',
          eventVibe: '',
          cateringStyle: '',
          decorations: '',
          entertainment: [],
          dietaryRequirements: '',
          ageGroups: [],
          specialAccommodations: '',
          referralSource: ''
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
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [showBookingForm]);

  const renderBookingForm = () => {
    if (!event) return null;
  
    const category = event.category?.name?.toLowerCase();
    
    
    switch (category) {
      case 'corporate events':
        return (
          <CorporateEventsBookingForm
            event={event}
            bookingData={bookingData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        );
      case 'social events':
        return (
          <SocialEventForm
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
      case 'school events':
        return (
          <SchoolEventsBookingForm
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

  // Loading Component
  if (loading) {
    return (
      <div className="min-h-screen bg-[#fff700] flex items-center justify-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 bg-black rounded-full opacity-10 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            ></div>
          ))}
        </div>
        
        <div className="relative z-10 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-black border-t-transparent mx-auto mb-4"></div>
          <div className="bg-black/80 px-6 py-3 rounded-full">
            <span className="text-yellow-400 font-bold">Loading Event Details...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#fff700] flex items-center justify-center">
        <div className="bg-black/90 rounded-3xl p-8 text-center border-4 border-red-500">
          <div className="text-6xl mb-4">⚠️</div>
          <div className="text-red-400 font-bold text-xl mb-2">Error Loading Event</div>
          <div className="text-yellow-100 mb-6">{error}</div>
          <button
            onClick={() => navigate(-1)}
            className="bg-yellow-400 text-black px-6 py-3 rounded-full font-bold hover:bg-yellow-300 transition-all duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-[#fff700] flex items-center justify-center">
        <div className="bg-black/90 rounded-3xl p-8 text-center border-4 border-yellow-400">
          <div className="text-6xl mb-4">🔍</div>
          <div className="text-yellow-400 font-bold text-xl mb-2">Event Not Found</div>
          <div className="text-yellow-100 mb-6">The event you're looking for doesn't exist.</div>
          <button
            onClick={() => navigate(-1)}
            className="bg-yellow-400 text-black px-6 py-3 rounded-full font-bold hover:bg-yellow-300 transition-all duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff700] py-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0">
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-black rounded-full opacity-15 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 4}s`
              }}
            ></div>
          ))}
        </div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-black opacity-5 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 left-16 w-24 h-24 bg-black opacity-5 transform rotate-45 animate-bounce"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-black opacity-5 rounded-full animate-ping"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
            className="mb-6 text-black font-bold hover:text-gray-800 flex items-center text-sm sm:text-base transition-all duration-300 hover:translate-x-1 group bg-black/10 px-4 py-2 rounded-full"
        >
          <span className="mr-2 transition-transform duration-300 group-hover:-translate-x-1">←</span>
          Back to Events
        </button>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Event Image */}
          <div className="lg:col-span-2">
            <div className="bg-black/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border-4 border-black">
              {/* Event Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-bold border-2 border-black">
                    {event.category?.name}
                  </span>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse mr-2"></div>
                    <span className="text-yellow-400 text-sm font-bold">AVAILABLE NOW</span>
                  </div>
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-yellow-400 mb-3 bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                  {event.title}
                </h1>
              </div>

              {/* Event Image */}
              <div className="relative mb-6 overflow-hidden rounded-2xl border-4 border-yellow-400">
                <div className={`transition-all duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-72 sm:h-80 lg:h-96 object-cover transform hover:scale-105 transition-transform duration-500"
                    onLoad={() => setImageLoaded(true)}
                  />
                </div>
                
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent"></div>
                  </div>
                )}
                
                {/* Image Overlay Effects */}
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-2 rounded-full">
                  <span className="text-yellow-400 text-sm font-bold">📸 HD</span>
                </div>
              </div>

              {/* About Section */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4 text-yellow-400 flex items-center">
                  <span className="mr-3">📖</span>
                  About This Event
                </h2>
                <div className="bg-black/50 rounded-2xl p-6 border-2 border-yellow-400/30">
                  <p className="text-yellow-100 text-base leading-relaxed">{event.description}</p>
                </div>
              </div>

              {/* Features Section */}
              {event.features && event.features.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-yellow-400 flex items-center">
                    <span className="mr-3">✨</span>
                    Features & Highlights
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {event.features.map((feature, index) => (
                      <div 
                        key={index} 
                        className="flex items-center space-x-3 bg-black/50 p-4 rounded-xl border-2 border-yellow-400/30 hover:border-yellow-400 transition-all duration-300 transform hover:scale-105"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex-shrink-0">
                          <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-yellow-100 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-black/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border-4 border-yellow-400 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">🎫</div>
                <h3 className="text-2xl font-bold text-yellow-400 mb-2">Ready to Join?</h3>
                <p className="text-yellow-100 text-sm">Secure your spot at this amazing event!</p>
              </div>

              {/* Quick Info */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center bg-black/50 p-3 rounded-xl">
                  <span className="text-yellow-100 font-medium">Category:</span>
                  <span className="text-yellow-400 font-bold">{event.category?.name}</span>
                </div>
                
                <div className="flex justify-between items-center bg-black/50 p-3 rounded-xl">
                  <span className="text-yellow-100 font-medium">Status:</span>
                  <span className="text-green-400 font-bold flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                    Available
                  </span>
                </div>
              </div>

              {/* Book Now Button */}
              <button
                onClick={() => setShowBookingForm(true)}
                className="w-full bg-yellow-400 text-black px-8 py-4 rounded-2xl font-bold hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl border-4 border-black group"
              >
                <span className="flex items-center justify-center">
                  <span className="mr-2 text-xl">🚀</span>
                  Book Now
                  <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </button>

              {/* Guarantee Badge */}
              <div className="mt-6 text-center">
                <div className="inline-flex items-center bg-green-500/20 border-2 border-green-400 px-4 py-2 rounded-full">
                  <span className="mr-2">🛡️</span>
                  <span className="text-green-400 text-sm font-bold">100% Secure Booking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div 
            ref={modalRef}
            className="bg-black/95 backdrop-blur-sm rounded-3xl p-6 text-white w-full max-w-2xl max-h-[90vh] overflow-y-auto border-4 border-yellow-400 shadow-2xl transform animate-slideUp"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-yellow-400 flex items-center">
                  <span className="mr-3">🎫</span>
                  Book Your Spot
                </h2>
                <p className="text-yellow-100 text-sm mt-1">Fill in your details to secure your booking</p>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-yellow-400 transition-colors text-3xl font-bold w-10 h-10 flex items-center justify-center rounded-full hover:bg-yellow-400/20"
              >
                ×
              </button>
            </div>
            
            {bookingSuccess ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🎉</div>
                <div className="text-green-400 font-bold text-xl mb-2">Booking Successful!</div>
                <div className="text-yellow-100 mb-6">
                  We'll send you a confirmation email shortly with all the details.
                </div>
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="bg-yellow-400 text-black px-6 py-3 rounded-full font-bold hover:bg-yellow-300 transition-all duration-300"
                >
                  Close
                </button>
              </div>
            ) : (
              <div>
                {renderBookingForm()}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #000;
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

export default EventDetails;