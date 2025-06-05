import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {  confirmBooking, deleteBooking, fetchBookingById } from '../../store/slices/bookingsSlice';
import { 
    ArrowLeft, Calendar, Mail, Phone, MapPin, Clock, CheckCircle2, XCircle,
    Users, Building, Briefcase, Cake, GraduationCap, Gift, DollarSign,
    MessageSquare, Info, Star, Music, Utensils, Palette,
    Icon,
    PersonStanding,
    TowerControl,
    VibrateIcon,
    FunnelX
} from 'lucide-react';

const BookingView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { items: bookings, loading } = useSelector((state) => state.bookings);
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        dispatch(fetchBookingById(id));
    }, [dispatch]);

    useEffect(() => {
        if (bookings.length > 0) {
            const foundBooking = bookings.find(b => b._id === id);
            if (foundBooking) {
                setBooking(foundBooking);
            }
        }
    }, [bookings, id]);

    const handleConfirm = async () => {
        if (window.confirm('Are you sure you want to confirm this booking?')) {
            await dispatch(confirmBooking(id));
            navigate('/admin/bookings');
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this booking?')) {
            await dispatch(deleteBooking(id));
            navigate('/admin/bookings');
        }
    };

    const renderEventSpecificFields = () => {
        if (!booking) return null;

        switch (booking.eventType.toLowerCase()) {
            case 'corporate events':
                return (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Corporate Event Details</h2>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <Building className="w-5 h-5 text-gray-400 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-500">Company Name</p>
                                    <p className="text-gray-900">{booking.companyName || 'Not provided'}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Briefcase className="w-5 h-5 text-gray-400 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-500">Job Title</p>
                                    <p className="text-gray-900">{booking.jobTitle || 'Not provided'}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Users className="w-5 h-5 text-gray-400 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-500">Number of Attendees</p>
                                    <p className="text-gray-900">{booking.attendees || 'Not provided'}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Clock className="w-5 h-5 text-gray-400 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-500">Duration</p>
                                    <p className="text-gray-900">{booking.duration || 'Not provided'}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Utensils className="w-5 h-5 text-gray-400 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-500">Catering</p>
                                    <p className="text-gray-900">{booking.catering || 'Not provided'}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Info className="w-5 h-5 text-gray-400 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-500">Event Goals</p>
                                    <p className="text-gray-900">{booking.eventGoals || 'Not provided'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'birthday events':
                return (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Birthday Event Details</h2>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <Cake className="w-5 h-5 text-gray-400 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-500">Birthday Person</p>
                                    <p className="text-gray-900">{booking.birthdayPersonName || 'Not provided'}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Star className="w-5 h-5 text-gray-400 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-500">Age</p>
                                    <p className="text-gray-900">{booking.age || 'Not provided'}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Palette className="w-5 h-5 text-gray-400 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-500">Favorite Colors</p>
                                    <p className="text-gray-900">{booking.favoriteColors || 'Not provided'}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <FunnelX className="w-5 h-5 text-gray-400 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-500">Desired Vibe</p>
                                    <p className="text-gray-900">{booking.desiredVibe || 'Not provided'}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Music className="w-5 h-5 text-gray-400 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-500">Entertainment</p>
                                    <p className="text-gray-900">
                                        {booking.entertainment?.join(', ') || 'Not provided'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Utensils className="w-5 h-5 text-gray-400 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-500">Food Preference</p>
                                    <p className="text-gray-900">{booking.foodPreference || 'Not provided'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'school events':
                return (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">School Event Details</h2>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <Building className="w-5 h-5 text-gray-400 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-500">School Name</p>
                                    <p className="text-gray-900">{booking.schoolName || 'Not provided'}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <GraduationCap className="w-5 h-5 text-gray-400 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-500">Grade Level</p>
                                    <p className="text-gray-900">
                                        {Array.isArray(booking.gradeLevel) 
                                            ? booking.gradeLevel.join(', ') 
                                            : booking.gradeLevel || 'Not provided'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Users className="w-5 h-5 text-gray-400 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-500">Number of Students</p>
                                    <p className="text-gray-900">{booking.guestCount || 'Not provided'}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Info className="w-5 h-5 text-gray-400 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-500">Learning Outcomes</p>
                                    <p className="text-gray-900">{booking.learningOutcomes || 'Not provided'}</p>
                                </div>
                            </div>
                             <div className="flex items-center">
                                <Info className="w-5 h-5 text-gray-400 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-500">Event Goal</p>
                                    <p className="text-gray-900">{booking.eventGoals || 'Not provided'}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <MessageSquare className="w-5 h-5 text-gray-400 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-500">Role</p>
                                    <p className="text-gray-900">{booking.role || 'Not provided'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'social events':
                return (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Social Event Details</h2>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <Gift className="w-5 h-5 text-gray-400 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-500">Occasion</p>
                                    <p className="text-gray-900">{booking.occasion || 'Not provided'}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Palette className="w-5 h-5 text-gray-400 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-500">Event Theme</p>
                                    <p className="text-gray-900">{booking.eventTheme || 'Not provided'}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Music className="w-5 h-5 text-gray-400 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-500">Entertainment</p>
                                    <p className="text-gray-900">
                                        {Array.isArray(booking.entertainment) 
                                            ? booking.entertainment.join(', ') 
                                            : booking.entertainment || 'Not provided'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Users className="w-5 h-5 text-gray-400 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-500">Age Groups</p>
                                    <p className="text-gray-900">
                                        {Array.isArray(booking.ageGroups) 
                                            ? booking.ageGroups.join(', ') 
                                            : booking.ageGroups || 'Not provided'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    if (loading || !booking) {
        return (
            <div className="p-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
                    <div className="space-y-4">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <button
                    onClick={() => navigate('/admin/bookings')}
                    className="flex items-center text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Bookings
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">{booking.eventType}</h1>
                            <div className="flex items-center">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    booking.status === 'confirmed'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                    {booking.status}
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            {booking.status !== 'confirmed' && (
                                <button
                                    onClick={handleConfirm}
                                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2"
                                >
                                    <CheckCircle2 className="w-4 h-4" />
                                    Confirm Booking
                                </button>
                            )}
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center gap-2"
                            >
                                <XCircle className="w-4 h-4" />
                                Delete Booking
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h2>
                                <div className="space-y-4">
                                      <div className="flex items-center">
                                        <PersonStanding className="w-5 h-5 text-gray-400 mr-3" />
                                        <div>
                                            <p className="text-sm text-gray-500">Name</p>
                                            <p className="text-gray-900">{booking.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <Mail className="w-5 h-5 text-gray-400 mr-3" />
                                        <div>
                                            <p className="text-sm text-gray-500">Email</p>
                                            <p className="text-gray-900">{booking.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <Phone className="w-5 h-5 text-gray-400 mr-3" />
                                        <div>
                                            <p className="text-sm text-gray-500">Phone</p>
                                            <p className="text-gray-900">{booking.phone || 'Not provided'}</p>
                                        </div>
                                    </div>
                                    {booking.whatsapp && (
                                        <div className="flex items-center">
                                            <Phone className="w-5 h-5 text-gray-400 mr-3" />
                                            <div>
                                                <p className="text-sm text-gray-500">WhatsApp</p>
                                                <p className="text-gray-900">{booking.phone}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Event Details</h2>
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                                        <div>
                                            <p className="text-sm text-gray-500">Event Date</p>
                                            <p className="text-gray-900">
                                                {new Date(booking.eventDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="w-5 h-5 text-gray-400 mr-3" />
                                        <div>
                                            <p className="text-sm text-gray-500">Event Time</p>
                                            <p className="text-gray-900">{booking.duration ||booking.evenTime|| 'Not specified'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                                        <div>
                                            <p className="text-sm text-gray-500">Venue</p>
                                            <p className="text-gray-900">{booking.venuePreference || 'Not specified'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <Users className="w-5 h-5 text-gray-400 mr-3" />
                                        <div>
                                            <p className="text-sm text-gray-500">Guest Count</p>
                                            <p className="text-gray-900">{booking.guestCount || 'Not specified'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {renderEventSpecificFields()}
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h2>
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <DollarSign className="w-5 h-5 text-gray-400 mr-3" />
                                        <div>
                                            <p className="text-sm text-gray-500">Budget Range</p>
                                            <p className="text-gray-900">{booking.budgetRange || 'Not specified'}</p>
                                        </div>
                                    </div>
                                    {/* <div className="flex items-center">
                                        <DollarSign className="w-5 h-5 text-gray-400 mr-3" />
                                        <div>
                                            <p className="text-sm text-gray-500">Total Price</p>
                                            <p className="text-gray-900">
                                                {booking.totalPrice ? `$${booking.totalPrice}` : 'Not specified'}
                                            </p>
                                        </div>
                                    </div> */}
                                    <div className="flex items-center">
                                        <Info className="w-5 h-5 text-gray-400 mr-3" />
                                        <div>
                                            <p className="text-sm text-gray-500">Payment Status</p>
                                            <p className="text-gray-900">{booking.paymentStatus || 'Not specified'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h2>
                                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-2">Special Requirements</p>
                                        <p className="text-gray-900 whitespace-pre-wrap">
                                            {booking.specialRequirements || 'No special requirements provided.'}
                                        </p>
                                    </div>
                                     <div>
                                        <p className="text-sm text-gray-500 mb-2">Special Accomodation</p>
                                        <p className="text-gray-900 whitespace-pre-wrap">
                                            {booking.specialAccommodations || 'No special Accomodation Needed.'}
                                        </p>
                                    </div>

                                     <div className="flex items-center">
                                <TowerControl className="w-5 h-5 text-gray-400 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-500">Equipment</p>
                                    <p className="text-gray-900">
                                        {Array.isArray(booking.equipment) 
                                            ? booking.equipment.join(', ') 
                                            : booking.equipment || 'Not provided'}
                                    </p>
                                </div>
                            </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-2">Comments</p>
                                        <p className="text-gray-900 whitespace-pre-wrap">
                                            {booking.comments || 'No comments provided.'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-2">Referral Source</p>
                                        <p className="text-gray-900">
                                            {booking.referralSource || 'Not specified'}
                                        </p>
                                    </div>
                                     <div>
                                        <p className="text-sm text-gray-500 mb-2">Permission(school/parents)</p>
                                        <p className="text-gray-900">
                                            {booking.permission==true? "Needed": "Not-Needed" || 'Not specified'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingView; 