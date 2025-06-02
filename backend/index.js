require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');

// ✅ Import Routes (Ensure these filenames exist exactly as written)
const adminRoutes = require('./routes/adminRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoute'); // ✅ Fixed: plural 'Routes'

const app = express();
const PORT = process.env.PORT || 5000;

// 🧠 Connect to MongoDB
connectDB();

// 🔒 Security Middleware
app.use(helmet());

// 📦 JSON Parser
app.use(express.json());

// 📝 Logger
app.use(morgan('dev'));

// 🌍 CORS (Basic or custom if needed)
app.use(cors());

// ✅ Basic route check
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to McMerrys API' });
});

// 🚏 Routes
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', authRoutes);

// ❌ 404 Not Found
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// 🚨 Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation Error',
      errors: Object.values(err.errors).map(e => e.message)
    });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ message: 'Invalid token' });
  }

  res.status(500).json({
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!'
  });
});

// 🚀 Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
