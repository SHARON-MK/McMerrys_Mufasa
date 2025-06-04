const { body, validationResult } = require('express-validator');

// Common validation rules for all booking types
const commonValidationRules = [
  // Contact Information
  body('bookingData.name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),

  body('bookingData.email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email address'),

  body('bookingData.phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^[0-9+\-\s()]{10,15}$/)
    .withMessage('Please enter a valid phone number'),

  // Event Details
  body('bookingData.eventDate')
    .notEmpty()
    .withMessage('Event date is required')
    .isDate()
    .withMessage('Please enter a valid date'),

  body('bookingData.guestCount')
    .notEmpty()
    .withMessage('Guest count is required')
    .isInt({ min: 1 })
    .withMessage('Guest count must be at least 1'),

  body('bookingData.venuePreference')
    .notEmpty()
    .withMessage('Venue preference is required'),

  // Event ID
  body('eventId')
    .notEmpty()
    .withMessage('Event ID is required')
    .isMongoId()
    .withMessage('Invalid event ID')
];

// Category-specific validation rules
const categoryValidationRules = {
  'corporate events': [
    body('bookingData.companyName')
      .notEmpty()
      .withMessage('Company name is required'),
    body('bookingData.attendees')
      .notEmpty()
      .withMessage('Number of attendees is required')
      .isInt({ min: 1 })
      .withMessage('Number of attendees must be at least 1'),
    body('bookingData.duration')
      .notEmpty()
      .withMessage('Event duration is required')
  ],
  'birthday events': [
    body('bookingData.birthdayPersonName')
      .notEmpty()
      .withMessage('Birthday person name is required'),
    body('bookingData.age')
      .notEmpty()
      .withMessage('Age is required')
      .isInt({ min: 1 })
      .withMessage('Age must be a positive number'),
    body('bookingData.desiredVibe')
      .notEmpty()
      .withMessage('Desired vibe is required')
      .isIn(['fun', 'elegant', 'adventure', 'relaxed'])
      .withMessage('Invalid desired vibe')
  ],
  'school events': [
    body('bookingData.schoolName')
      .notEmpty()
      .withMessage('School name is required'),
    body('bookingData.gradeLevel')
      .notEmpty()
      .withMessage('Grade level is required'),
    body('bookingData.numberOfStudents')
      .notEmpty()
      .withMessage('Number of students is required')
      .isInt({ min: 1 })
      .withMessage('Number of students must be at least 1'),
    body('bookingData.eventType')
      .notEmpty()
      .withMessage('Event type is required')
  ],
  'social events': [
    body('bookingData.occasion')
      .notEmpty()
      .withMessage('Occasion is required'),
    body('bookingData.eventVibe')
      .notEmpty()
      .withMessage('Event vibe is required'),
    body('bookingData.cateringStyle')
      .notEmpty()
      .withMessage('Catering style is required')
  ]
};

// Validation middleware
const validateBooking = async (req, res, next) => {
  try {
    // Get event category from request
    const event = await Event.findById(req.body.eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    const category = event.category.name.toLowerCase();

    // Combine common and category-specific validation rules
    const validationRules = [
      ...commonValidationRules,
      ...(categoryValidationRules[category] || [])
    ];

    // Run all validations
    await Promise.all(validationRules.map(rule => rule.run(req)));

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map(err => ({
          field: err.path,
          message: err.msg
        }))
      });
    }

    next();
  } catch (error) {
    console.error('Validation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during validation',
      error: error.message
    });
  }
};

module.exports = validateBooking; 