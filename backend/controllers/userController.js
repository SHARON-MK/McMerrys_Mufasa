const express = require('express');
const dotenv = require('dotenv');
const Event = require('../models/eventModel');
const Booking = require('../models/bookingModel');
dotenv.config();

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

module.exports = {
    getEvents,
    getEventById,
    createBooking
};