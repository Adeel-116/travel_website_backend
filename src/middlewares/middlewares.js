const express = require('express');
const cors = require('cors');
const authRoutes = require('../routes/authRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Routes
app.use('/', authRoutes);

module.exports = app;
