const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  // Contact Information (Common for all bookings)
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  whatsapp: String,
  alternativePhone: String,
  alternativeContact: String,

  // Standard Booking Fields
  numberOfTickets: {
    type: Number,
    min: 1
  },
  totalPrice: {
    type: Number,
    required: true
  },

  // Workshop Specific Fields
  experienceLevel: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced']
  },
  participants: {
    type: Number,
    min: 1,
    max: 10
  },

  // Concert Specific Fields
  seatingPreference: {
    type: String,
    enum: ['vip', 'premium', 'standard']
  },
  ticketCount: {
    type: Number,
    min: 1,
    max: 6
  },

  // Birthday Party Specific Fields
  isBirthdayPerson: {
    type: String,
    enum: ['yes', 'no']
  },
  birthdayPersonName: String,
  age: Number,
  favoriteColors: String,
  desiredVibe: {
    type: String,
    enum: ['fun', 'elegant', 'adventure', 'relaxed']
  },
  guestCount: Number,
  entertainment: [{
    type: String,
    enum: ['games', 'music', 'magic', 'facePainting']
  }],
  foodPreference: {
    type: String,
    enum: ['snacks', 'buffet', 'plated', 'custom']
  },

  // Social Event Specific Fields
  occasion: {
    type: String,
    enum: [
      'naming',
      'anniversary',
      'babyShower',
      'getTogether',
      'reunion',
      'housewarming',
      'preWedding',
      'haldi',
      'religious'
    ]
  },
  venuePreference: {
    type: String,
    enum: ['indoor', 'outdoor', 'both']
  },
  eventVibe: {
    type: String,
    enum: ['casual', 'classy', 'fun', 'elegant', 'tropical']
  },
  features: [{
    type: String,
    enum: ['dj', 'games', 'photoBooth', 'foodStations']
  }],
  foodType: {
    type: String,
    enum: ['plated', 'buffet', 'snacks', 'cocktails']
  },
  additionalServices: [{
    type: String,
    enum: ['invites', 'decor', 'entertainment', 'coordination']
  }],

  // Common Additional Fields
  specialRequirements: String,
  comments: String,
  referralSource: {
    type: String,
    enum: ['social', 'friend', 'search', 'other']
  },
  budgetRange: {
    type: String,
    enum: ['budget', 'moderate', 'premium', 'luxury']
  },

  // Booking Status
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },

  // Payment Information
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
  paymentMethod: String,
  transactionId: String,

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Add indexes for better query performance
bookingSchema.index({ event: 1, status: 1 });
bookingSchema.index({ email: 1 });
bookingSchema.index({ phone: 1 });
bookingSchema.index({ createdAt: -1 });

// Pre-save middleware to update the updatedAt timestamp
bookingSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Virtual for calculating booking age
bookingSchema.virtual('bookingAge').get(function() {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

// Method to check if booking can be cancelled
bookingSchema.methods.canBeCancelled = function() {
  const eventDate = new Date(this.event.date);
  const now = new Date();
  const hoursUntilEvent = (eventDate - now) / (1000 * 60 * 60);
  return hoursUntilEvent > 24 && this.status === 'confirmed';
};

// Method to get booking summary
bookingSchema.methods.getSummary = function() {
  return {
    id: this._id,
    eventTitle: this.event.title,
    customerName: this.name,
    status: this.status,
    totalPrice: this.totalPrice,
    createdAt: this.createdAt
  };
};

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;