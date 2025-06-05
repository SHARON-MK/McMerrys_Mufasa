const emailModel = require("../models/emailModel")
const Event = require('../models/eventModel');
const Category = require('../models/categoryModel');
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');
const Booking = require('../models/bookingModel');
const advertisement = require('../models/advertisement');



const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'categories', resource_type: 'image' },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

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
    const { name, description, isActive } = req.body;

    if (!req.file) return res.status(400).json({ message: 'Image is required' });

    // Upload image to Cloudinary (fast, streamed)
    const result = await uploadToCloudinary(req.file.buffer);

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const category = await Category.create({
      name,
      slug,
      description,
      image: result.secure_url,
      isActive: isActive === 'true'
    });

    // Respond with minimal data
    res.status(201).json({
      id: category._id,
      name: category.name,
      slug: category.slug,
      image: category.image
    });
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
    const { name, description, eventTypes, isActive } = req.body;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    if (name) {
      category.name = name;
      category.slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }
    if (description) category.description = description;
    if (typeof isActive !== 'undefined') category.isActive = isActive === 'true' || isActive === true;

    if (req.file) {
      // Upload new image to Cloudinary
      const result = await uploadToCloudinary(req.file.buffer);
      category.image = result.secure_url;
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
    const { title, description, category, price, duration, capacity, features } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    // Upload image to Cloudinary
    const result = await uploadToCloudinary(req.file.buffer); // Assuming this utility exists

    const event = new Event({
      title,
      description,
      category,
      // Same for capacity
      features: JSON.parse(features), // Same for features if sent as stringified array
      image: result.secure_url,
      createdBy: req.user._id
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


const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Failed to fetch bookings", error: error.message });
  }
};

const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ message: 'Failed to fetch booking', error: error.message });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status: 'confirmed' },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ message: 'Booking confirmed successfully', booking });
  } catch (error) {
    console.error('Error confirming booking:', error);
    res.status(500).json({ message: 'Failed to confirm booking', error: error.message });
  }
};


const deleteBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ message: 'Failed to delete booking', error: error.message });
  }
};



const fetchEmails = async (req, res) => {
  try {
    const emails = await emailModel.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json(emails);
  } catch (error) {
    console.error('Error fetching emails:', error);
    res.status(500).json({ message: 'Failed to fetch emails', error: error.message });
  }
};


 const getadvertisements=async (req, res) => {
     const advertisements = await advertisement.find({}).sort({ createdAt: -1 });
     res.json(advertisements);
 }


const createAdvertisement = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Validate required text fields
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    // Validate image file
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    // Upload image to Cloudinary
    const result = await uploadToCloudinary(req.file.buffer); // result.secure_url
const advertisements = await new advertisement({
  title,
  description,
  image: result.secure_url,
});

advertisements.save(); 

    // Respond with created advertisement
    res.status(201).json({
      message: 'Advertisement created successfully',
      advertisement,
    });
  } catch (error) {
    console.error('Error creating advertisement:', error);
    res.status(500).json({ message: 'Server error. Could not create advertisement.' });
  }
};



 const deleteAdvertisements = async (req, res) => {
     const advertisements = await advertisement.findById(req.params.id);
 
     if (!advertisements) {
         res.status(404);
         throw new Error('Advertisement not found');
     }
 
     // Delete image from cloudinary if it exists
     if (advertisements.image) {
         const publicId = advertisements.image.split('/').pop().split('.')[0];
         await cloudinary.uploader.destroy(publicId);
     }
 
     await advertisements.deleteOne();
     res.json({ message: 'Advertisement removed' });
 }


 const updateAdvertisements = async (req, res) => {
  // console.log(req.params.id);
  
  try {
    const  id  = req.params.id;
    const { title, description } = req.body;

    const updated = await advertisement.findByIdAndUpdate(
      id,
      { title, description },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Advertisement not found' });
    }

    res.status(200).json({ message: 'Advertisement updated successfully', updated });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Server error while updating advertisement' });
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
    toggleEventStatus,

    getAllBookings,
    getBookingById,
    updateBookingStatus,
    deleteBookingById,

    fetchEmails,
    
    createAdvertisement,
    getadvertisements,
    deleteAdvertisements,
    updateAdvertisements

};