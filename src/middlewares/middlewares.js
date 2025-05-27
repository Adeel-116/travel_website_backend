const express = require('express');
const session = require("express-session")
const cors = require('cors');
const authRoutes = require('../routes/authRoutes');

const app = express();
app.use(express.json())

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Routes



// Session MiddleWare
app.use(session({
  secret: 'Adeelkareem122',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 5 * 60 * 1000 // example: 5 minutes
  }
}))

app.use('/', authRoutes);

module.exports = app;
