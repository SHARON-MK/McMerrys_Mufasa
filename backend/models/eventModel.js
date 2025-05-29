const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  eventType: {
    type: String,
    required: true
  },
  price: {
    starting: {
      type: Number,
      required: true
    },
    premium: {
      type: Number,
      required: true
    }
  },
  duration: {
    type: String,
    required: true
  },
  capacity: {
    min: Number,
    max: Number
  },
  features: [String],
  images: [String],
  location: {
    type: String,
    default: 'Flexible'
  },
  rating: {
    average: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);