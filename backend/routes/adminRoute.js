const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { isAdmin } = require('../middleWare/authMiddleware');
const upload = require('../middleWare/upload');

// Admin routes
router.get('/profile', isAdmin, adminController.getAdmin);

// Category routes
router.post('/categories', isAdmin,upload.single('image'), adminController.createCategory);
router.get('/categories', isAdmin, adminController.getAllCategories);
router.get('/categories/:id', isAdmin, adminController.getCategoryById);
router.put('/categories/:id', isAdmin,upload.single('image'), adminController.updateCategory);
router.delete('/categories/:id', isAdmin, adminController.deleteCategory);
router.patch('/categories/:id/toggle', isAdmin, adminController.toggleCategoryStatus);

// Event routes
router.post('/events',isAdmin,upload.single('image'), adminController.createEvent);
router.get('/events', isAdmin, adminController.getAllEvents);
router.get('/events/:id', isAdmin, adminController.getEventById);
router.put('/events/:id', isAdmin,upload.single('image'), adminController.updateEvent);
router.delete('/events/:id', isAdmin, adminController.deleteEvent);
router.patch('/events/:id/toggle', isAdmin, adminController.toggleEventStatus);

// Booking management routes
router.get('/bookings', isAdmin, adminController.getAllBookings);
router.get('/bookings/:id', isAdmin, adminController.getBookingById);
router.patch('/bookings/:id/confirm', isAdmin, adminController.updateBookingStatus);
router.delete('/bookings/:id', isAdmin, adminController.deleteBookingById);

router.get('/email-data', isAdmin, adminController.fetchEmails);
// router.patch('/bookings/:id/payment', isAdmin, adminController.updatePaymentStatus);

router.post('/create-ad',isAdmin,upload.single('image'),adminController.createAdvertisement)
router.get("/advertisements",isAdmin,adminController.getadvertisements)
router.delete("/advertisements/:id",isAdmin,adminController.deleteAdvertisements)
router.put("/advertisements/:id",isAdmin,upload.single('image'),adminController.updateAdvertisements)



module.exports = router; 