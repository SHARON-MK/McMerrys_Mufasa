const Booking = require('../models/bookingModel');
const Event = require('../models/eventModel');

// Create a new booking
const createBooking = async (req, res) => {
    try {
        const {
            eventId,
            bookingData
        } = req.body;

        // Validate event exists
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        // Prepare booking data based on event category
        const category = event.category.name.toLowerCase();
        let bookingPayload = {
            event: eventId,
            eventType: category,
            // Common fields
            name: bookingData.name,
            email: bookingData.email,
            phone: bookingData.phone,
            eventDate: bookingData.eventDate,
            guestCount: bookingData.guestCount,
            venuePreference: bookingData.venuePreference,
            budgetRange: bookingData.budgetRange,
            specialRequests: bookingData.specialRequests,
            status: 'pending', // Initial status
            createdAt: new Date()
        };

        // Add category-specific fields
        switch (category) {
            case 'corporate events':
                bookingPayload = {
                    ...bookingPayload,
                    companyName: bookingData.companyName,
                    jobTitle: bookingData.jobTitle,
                    attendees: bookingData.attendees,
                    duration: bookingData.duration,
                    catering: bookingData.catering,
                    equipment: bookingData.equipment || [],
                    specialRequirements: bookingData.specialRequirements,
                    referralSource: bookingData.referralSource,
                    eventGoals: bookingData.eventGoals,
                    comments: bookingData.comments
                };
                break;

            case 'birthday events':
                bookingPayload = {
                    ...bookingPayload,
                    isBirthdayPerson: bookingData.isBirthdayPerson,
                    birthdayPersonName: bookingData.birthdayPersonName,
                    age: bookingData.age,
                    favoriteColors: bookingData.favoriteColors,
                    desiredVibe: bookingData.desiredVibe,
                    entertainment: bookingData.entertainment || [],
                    foodPreference: bookingData.foodPreference
                };
                break;

            case 'school events':
                bookingPayload = {
                    ...bookingPayload,
                    schoolName: bookingData.schoolName,
                    gradeLevel: bookingData.gradeLevel,
                    numberOfStudents: bookingData.numberOfStudents,
                    eventType: bookingData.eventType,
                    duration: bookingData.duration,
                    equipment: bookingData.equipment || [],
                    specialRequirements: bookingData.specialRequirements,
                    dietaryRestrictions: bookingData.dietaryRestrictions,
                    chaperoneCount: bookingData.chaperoneCount
                };
                break;

            case 'social events':
                bookingPayload = {
                    ...bookingPayload,
                    occasion: bookingData.occasion,
                    eventVibe: bookingData.eventVibe,
                    cateringStyle: bookingData.cateringStyle,
                    decorations: bookingData.decorations,
                    entertainment: bookingData.entertainment || [],
                    dietaryRequirements: bookingData.dietaryRequirements,
                    ageGroups: bookingData.ageGroups || [],
                    specialAccommodations: bookingData.specialAccommodations,
                    referralSource: bookingData.referralSource
                };
                break;
        }

        // Create the booking
        const booking = await Booking.create(bookingPayload);

        // Send success response
        res.status(201).json({
            success: true,
            message: 'Booking created successfully',
            data: {
                booking,
                eventDetails: {
                    title: event.title,
                    category: event.category.name,
                    image: event.image
                }
            }
        });
    } catch (error) {
        console.error('Booking creation error:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating booking',
            error: error.message
        });
    }
};

module.exports = {
    createBooking
}; 