const express = require('express');
const dotenv = require('dotenv');
const Event = require('../models/eventModel');
const Booking = require('../models/bookingModel');
dotenv.config();
const sendEmails = require('../utils/sendEmail');
const emailModel = require('../models/emailModel');
const advertisement = require('../models/advertisement');


const getEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({ date: 1 }).populate('category', 'name description').exec();;
        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('category', 'name description').exec();
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(event);
    } catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Create a new booking
const createBooking = async (req, res) => {
  
    try {
        const bookingData = req.body;
        const id = req.params.id;

        if (!id || !bookingData) {
            return res.status(400).json({
                success: false,
                message: 'Event ID and booking data are required'
            });
        }

        // Validate event exists
        const event = await Event.findById({_id: id}).populate('category', 'name description').exec();
      
        
        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        // Prepare booking data based on event category
        const category = event.category.name.toLowerCase();
        let bookingPayload = {
            event: event._id,
            eventType: category,
            // Common fields
            name: bookingData.name || "",
            email: bookingData.email || "",
            phone: bookingData.phone || "",
            eventDate: bookingData.eventDate || "",
            guestCount: bookingData.guestCount || 0,
            venuePreference: bookingData.venuePreference || "",
            budgetRange: bookingData.budgetRange || "",
            specialRequests: bookingData.specialRequests || "",
            status: 'pending', // Initial status
            createdAt: new Date()
        };

        // Add category-specific fields
        switch (category) {
            case 'corporate events':
                bookingPayload = {
                    ...bookingPayload,
                    companyName: bookingData.companyName || "",
                    jobTitle: bookingData.jobTitle || "",
                    duration: bookingData.duration || "",
                    catering: bookingData.catering || "",
                    equipment: bookingData.equipment || [],
                    specialRequirements: bookingData.specialRequirements || "",
                    referralSource: bookingData.referralSource || "",
                    eventGoals: bookingData.eventGoals || "",
                    comments: bookingData.comments || ""
                };
                break;

            case 'birthday events':
                bookingPayload = {
                    ...bookingPayload,
                    isBirthdayPerson: bookingData.isBirthdayPerson || "",
                    birthdayPersonName: bookingData.birthdayPersonName || "",
                    age: bookingData.age || 0,
                    favoriteColors: bookingData.favoriteColors || "",
                    desiredVibe: bookingData.desiredVibe || "",
                    entertainment: bookingData.entertainment || [],
                    foodPreference: bookingData.foodPreference || "",
                    specialRequirements: bookingData.specialRequests || "",
                };
                break;

            case 'school events':
                bookingPayload = {
                    ...bookingPayload,
                    schoolName: bookingData.schoolName || "",
                    gradeLevel: bookingData.gradeLevel || "",
                    numberOfStudents: bookingData.numberOfStudents || 0,
                    // eventType: bookingData.eventType || "",
                    duration: bookingData.duration || "",
                    equipment: bookingData.equipment || [],
                    specialRequirements: bookingData.specialRequirements || "",
                    dietaryRestrictions: bookingData.dietaryRestrictions || "",
                    chaperoneCount: bookingData.chaperoneCount || 0,
                    subjectarea: bookingData.subjectArea || "",
                     eventGoals: bookingData.educationalGoal || "",
                     role: bookingData.role || "",
                     learningOutcomes: bookingData.learningOutcomes || "",
                     catering: bookingData.refreshments || "",
                     permission: bookingData.parentPermission==="yes"? true : false,
                };
                break;

            case 'social events':
                bookingPayload = {
                    ...bookingPayload,
                    // occasion: bookingData.occasion || "",
                    // eventVibe: bookingData.eventVibe || "",
                    catering: bookingData.cateringStyle || "",
                    decorations: bookingData.decorations || "",
                    entertainment: bookingData.entertainment || [],
                    specialRequirements: bookingData.dietaryRequirements || "",
                    ageGroups: bookingData.ageGroups || [],
                    specialAccommodations: bookingData.specialAccommodations || "",
                    referralSource: bookingData.referralSource || "",
                    eventTheme: bookingData.eventTheme || "",
                    evetTime: bookingData.eventTime || "",
                    duration: bookingData.eventTime || "",
                    realationship: bookingData.relationship || ""

                  
                  
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



const sendEmail = async (req, res) => {
    console.log('Received email submission:', req.body);
    
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    // Check if email already exists
    const existingEmail = await emailModel.findOne({ email });

    if (existingEmail) {
      return res.status(409).json({ message: 'Already exist We will contact You Soon!' });
    }

    // Save to DB
    const newEmail = new emailModel({ email });
    await newEmail.save();

    // HTML email content
    const htmlContent = `
   <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; background-color: #f9f9f9; color: #333; border-radius: 10px; max-width: 600px; margin: auto; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
  <h2 style="color: #d1da25; margin-bottom: 10px;">Welcome to <span style="color: #4CAF50;">Mc Merrys</span> 🎉</h2>
  
  <p style="font-size: 16px;">Hi there 👋,</p>
  
  <p style="font-size: 16px;">Thanks for signing up with <strong style="color: #4CAF50;">${email}</strong>.</p>
  
  <p style="font-size: 16px;">We’re excited to have you on board! 🍔🎈 Get ready for delicious updates, exclusive treats, and some sweet surprises coming your way.</p>
  
  <p style="font-size: 16px;">We’ll get in touch with you shortly. Until then, stay awesome!</p>
  
  <br/>
  <p style="font-size: 14px; color: #777;">– The Mc Merrys Team</p>
</div>

    `;

    // Send welcome email
    await sendEmails(email, '🎉 Welcome to Mc Merrys!', htmlContent);

    res.status(200).json({ message: 'Email saved and welcome mail sent!' });
  } catch (error) {
    console.error('Error in sendEmail:', error);
    res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
};


const getLatestThreeAdvertisements = async (req, res) => {
  try {
    const ads = await advertisement.find()
      .sort({ createdAt: -1 }) // newest first
    //   .limit(3); // only 3 items

    res.status(200).json(ads);
  } catch (error) {
    console.error('Error fetching advertisements:', error);
    res.status(500).json({ message: 'Failed to fetch advertisements' });
  }
};

module.exports = {
    getEvents,
    getEventById,
    createBooking,
    sendEmail,
    getLatestThreeAdvertisements
};