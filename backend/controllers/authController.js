const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find admin user
        const admin = await User.findOne({ email, isAdmin: true });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check if admin is active
        if (!admin.isActive) {
            return res.status(401).json({ message: 'Account is deactivated' });
        }

        // Verify password
        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign(
            { id: admin._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createFirstAdmin = async (req, res) => {
    try {
        // Check if any admin exists
        const adminExists = await User.findOne({ isAdmin: true });
        if (adminExists) {
            return res.status(403).json({ message: 'First admin already exists' });
        }

        const { name, email, password } = req.body;

        // Create first admin
        const admin = new User({
            name,
            email,
            password,
            isAdmin: true
        });

        await admin.save();

        res.status(201).json({
            message: 'First admin created successfully',
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    adminLogin,
    createFirstAdmin
}; 