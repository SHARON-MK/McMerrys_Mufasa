const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  // Event Reference
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },

  // Basic Information (Common for all forms)
  name: {
    type: String,

  },
  email: {
    type: String,

  },
  phone: {
    type: String,

  },
  whatsapp: String,
  alternativePhone: String,
  alternativeContact: String,

  // Event Details (Common for all forms)
  eventType: {
    type: String,


  },
  eventDate: {
    type: Date,

  },
  eventTime: {
    type: String,

  },
  venue: {
    type: String,

  },
  guestCount: {
    type: Number,

    min: 1
  },

  // Birthday Event Specific Fields
  birthdayPersonName: String,
  age: Number,
  favoriteColors: String,
  desiredVibe: {
    type: String,
    enum: ['fun', 'elegant', 'adventure', 'relaxed']
  },
  // entertainment: [{
  //   type: String,
  //   enum: ['games', 'music', 'magic', 'facePainting',]
  // }],
  foodPreference: {
    type: String,
    enum: ['snacks', 'buffet', 'plated', 'custom']
  },

  // Corporate Event Specific Fields
  companyName: {
    type: String,

  },
  jobTitle: String,
  eventPurpose: String,
  attendees: {
    type: Number,
    min: 1,
    max: 1000
  },
  duration: {
    type: String,
    
  },
  equipment: [{
    type: String,

  }],
  catering: {
    type: String,
  
  },
  eventGoals: String,
relationship:String,
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
  },
  eventVibe: {
    type: String,
    // enum: ['casual', 'classy', 'fun', 'elegant', 'tropical']
  },
  eventTheme: String,
  entertainment: [{
    type: String,

  }],
  specialAccommodations: String,
  decorations: {
    type: String,
    // enum: ['none', 'minimal', 'standard', 'elaborate', 'custom']
  },

  // School Event Specific Fields
  schoolName: {
    type: String,

  },
  role: {
    type: String,
    enum: [
      'teacher',
      'principal',
      'administrator',
      'counselor',
      'parent',
      'student',
      'pta-member',
      'coordinator',
      'other'
    ]
  },
  gradeLevel: [{
    type: String,
    enum: [
      'pre-k',
      'kindergarten',
      '1st-grade',
      '2nd-grade',
      '3rd-grade',
      '4th-grade',
      '5th-grade',
      '6th-grade',
      '7th-grade',
      '8th-grade',
      '9th-grade',
      '10th-grade',
      '11th-grade',
      '12th-grade',
      'all-grades'
    ]
  }],

  subjectAreas: [{
    type: String,
    enum: [
      'mathematics',
      'science',
      'english-language-arts',
      'social-studies',
      'history',
      'geography',
      'art',
      'music',
      'physical-education',
      'technology',
      'foreign-language',
      'life-skills'
    ]
  }],
  learningOutcomes: String,
  equipment: [{
    type: String,
   
  }],

  // Additional Services (Common for all forms)
  additionalServices: [{
    type: String,
    enum: ['invites', 'decor', 'entertainment', 'coordination']
  }],

  // Budget and Payment
  budgetRange: {
    type: String,

  },
  totalPrice: {
    type: Number,

  },
  ageGroups: {
  type: [String],},

  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
  paymentMethod: String,
  transactionId: String,

  // Booking Status
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },

  // Additional Information
  specialRequirements: String,
  comments: String,
  referralSource: {
    type: String,
  
  },

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
bookingSchema.index({ eventType: 1 });

// Pre-save middleware to update the updatedAt timestamp
bookingSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

// Virtual for calculating booking age
bookingSchema.virtual('bookingAge').get(function () {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

// Method to check if booking can be cancelled
bookingSchema.methods.canBeCancelled = function () {
  const eventDate = new Date(this.eventDate);
  const now = new Date();
  const hoursUntilEvent = (eventDate - now) / (1000 * 60 * 60);
  return hoursUntilEvent > 24 && this.status === 'confirmed';
};

// Method to get booking summary
bookingSchema.methods.getSummary = function () {
  return {
    id: this._id,
    eventType: this.eventType,
    customerName: this.name,
    eventDate: this.eventDate,
    status: this.status,
    totalPrice: this.totalPrice,
    createdAt: this.createdAt
  };
};

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;