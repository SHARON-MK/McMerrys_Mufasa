const Booking = require('../models/bookingModel');
const Event = require('../models/eventModel');

// Create a new booking
const createBooking = async (req, res) => {
    try {
        const {
            eventId,
            bookingType,
            contactInfo,
            eventDetails,
            birthdayDetails,
            socialDetails,
            notes
        } = req.body;

        // Validate if event exists
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Create booking object based on booking type
        const bookingData = {
            event: eventId,
            bookingType,
            contactInfo,
            eventDetails,
            notes
        };

        // Add type-specific details
        if (bookingType === 'birthday' && birthdayDetails) {
            bookingData.birthdayDetails = birthdayDetails;
        } else if (bookingType === 'social' && socialDetails) {
            bookingData.socialDetails = socialDetails;
        }

        // Calculate total amount based on event price and guest count
        const guestCount = eventDetails.guestCount || 0;
        const totalAmount = guestCount <= 10 ? 
            event.price.starting * guestCount : 
            event.price.premium * guestCount;

        bookingData.totalAmount = totalAmount;

        const booking = new Booking(bookingData);
        await booking.save();

        res.status(201).json({
            message: 'Booking created successfully',
            booking,
            eventDetails: {
                title: event.title,
                description: event.description,
                image: event.image
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get booking by email
const getBookingByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const bookings = await Booking.find({ 'contactInfo.email': email })
            .populate('event', 'title description image')
            .sort({ createdAt: -1 });

        if (!bookings.length) {
            return res.status(404).json({ message: 'No bookings found for this email' });
        }

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get booking by ID
const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('event', 'title description image');

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update booking status
const updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, adminNotes } = req.body;

        const booking = await Booking.findById(id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        if (status) {
            booking.status = status;
        }
        if (adminNotes) {
            booking.adminNotes = adminNotes;
        }

        await booking.save();
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update payment status
const updatePaymentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { paymentStatus } = req.body;

        const booking = await Booking.findById(id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        booking.paymentStatus = paymentStatus;
        await booking.save();
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all bookings (for admin)
const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('event', 'title description image')
            .sort({ createdAt: -1 });
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createBooking,
    getBookingByEmail,
    getBookingById,
    updateBookingStatus,
    updatePaymentStatus,
    getAllBookings
}; 