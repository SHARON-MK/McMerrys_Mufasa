const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  bookingType: {
    type: String,
    enum: ['birthday', 'social', 'corporate', 'school'],
    required: true
  },
  
  // Common fields
  contactInfo: {
    name: String,
    email: String,
    phone: String,
    alternatePhone: String,
    alternatePerson: {
      name: String,
      phone: String
    }
  },
  
  eventDetails: {
    date: Date,
    time: String,
    venue: String,
    venueAddress: String,
    guestCount: Number,
    budget: String
  },

  // Birthday specific fields
  birthdayDetails: {
    birthdayPersonName: String,
    age: Number,
    favoriteThemes: String,
    partyVibe: String,
    decorations: String,
    entertainment: [String],
    foodPreferences: String,
    cakeRequired: Boolean,
    returnGifts: Boolean,
    photography: Boolean,
    specialRequests: String
  },

  // Social event specific fields
  socialDetails: {
    occasion: String,
    theme: String,
    mustHaves: [String],
    foodType: String,
    drinks: String,
    additionalServices: [String],
    specialRequests: String
  },

  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  
  totalAmount: {
    type: Number,
    default: 0
  },
  
  paymentStatus: {
    type: String,
    enum: ['pending', 'partial', 'completed'],
    default: 'pending'
  },
  
  notes: String,
  adminNotes: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);