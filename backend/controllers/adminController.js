const express = require('express');
const Event = require('../models/eventModel');
const Category = require('../models/categoryModel');

const getAdmin = (req, res) => {
    try {
        // Logic to get admin details
        res.status(200).json({ message: 'Admin details fetched successfully' });
    } catch (error) {
        console.error('Error fetching admin:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Category CRUD Operations
const createCategory = async (req, res) => {
    try {
        const { name, description, image, eventTypes } = req.body;
        
        const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
        
        const category = new Category({
            name,
            slug,
            description,
            image,
            eventTypes: eventTypes?.map(et => ({
                ...et,
                slug: et.name.toLowerCase().replace(/[^a-z0-9]/g, '-')
            })) || []
        });

        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, image, eventTypes } = req.body;

        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        if (name) {
            category.name = name;
            category.slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
        }
        if (description) category.description = description;
        if (image) category.image = image;
        if (eventTypes) {
            category.eventTypes = eventTypes.map(et => ({
                ...et,
                slug: et.name.toLowerCase().replace(/[^a-z0-9]/g, '-')
            }));
        }

        await category.save();
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Event CRUD Operations
const createEvent = async (req, res) => {
    try {
        const event = new Event({
            ...req.body,
            createdBy: req.user._id // Assuming you have user info in req.user
        });
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find()
            .populate('category', 'name')
            .populate('createdBy', 'name email');
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
            .populate('category', 'name')
            .populate('createdBy', 'name email');
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Update all fields that are provided in the request
        Object.keys(req.body).forEach(key => {
            event[key] = req.body[key];
        });

        await event.save();
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Toggle active status for both models
const toggleCategoryStatus = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        category.isActive = !category.isActive;
        await category.save();
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const toggleEventStatus = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        event.isActive = !event.isActive;
        await event.save();
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAdmin,
    // Category operations
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
    toggleCategoryStatus,
    
    // Event operations
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    toggleEventStatus
};