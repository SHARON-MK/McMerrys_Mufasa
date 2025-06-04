const dotenv = require('dotenv');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
dotenv.config();

// ✅ Import Routes (Ensure these filenames exist exactly as written)
const adminRoute =require("./routes/adminRoute");
const authRoute = require("./routes/authRoute");
const userRoute= require("./routes/userRoute"); // ✅ Fixed: plural 'Routes'

const app = express();
const PORT = process.env.PORT || 5000;

// 🧠 Connect to MongoDB
connectDB();

// 🔒 Security Middleware
app.use(helmet());
app.use(bodyParser.json())    
// 📦 JSON Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 📝 Logger
app.use(morgan('dev'));



const corsOptions = {
  origin: "https://www.mcmerrys.com", // Allow only this origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

// 🌍 CORS (Basic or custom if needed)

// app.use(cors());

// ✅ Basic route check
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to McMerrys API' });
});

// 🚏 Routes
app.use('/api/admin', adminRoute);
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);


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
