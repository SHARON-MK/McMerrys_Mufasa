const express = require('express');
const dotenv = require('dotenv');
const Event = require('../models/eventModel');
const Booking = require('../models/bookingModel');
dotenv.config();
const sendEmails = require('../utils/sendEmail');

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

const createBooking = async (req, res) => {
    try {
        const { eventId } = req.params;
        const { name, email, phone, numberOfTickets } = req.body;

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (!event.isActive) {
            return res.status(400).json({ message: 'This event is not available for booking' });
        }

        const booking = new Booking({
            event: eventId,
            name,
            email,
            phone,
            numberOfTickets,
            totalAmount: event.price * numberOfTickets,
            status: 'pending'
        });

        await booking.save();

        // TODO: Send confirmation email to user
        // TODO: Update event capacity if needed

        res.status(201).json({
            message: 'Booking created successfully',
            booking
        });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const sendEmail = async (req, res) => {
    console.log(req.body);
    
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2 style="color: #d63384;">Welcome to <span style="color:#4CAF50">Mc Merrys</span> </h2>
      <p>Hi there 👋,</p>
      <p>Thanks for signing up with <strong>${email}</strong>.</p>
      <p>We’re thrilled to have you! Get ready for delicious updates and exclusive treats!</p>
      <br/>
      <p style="font-size: 14px; color: #555;">– The Mc Merrys Team</p>
    </div>
  `;

  try {
    await sendEmails(email, '🎉 Welcome to Mc Merrys!', htmlContent);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send email.' });
  }
}

module.exports = {
    getEvents,
    getEventById,
    createBooking,
    sendEmail
};