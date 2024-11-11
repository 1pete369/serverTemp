const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const users_router = require('../routes/users');
const todo_router = require('../routes/todos');
const day_router = require('../routes/days');

const app = express();

// CORS Configuration
const corsOptions = {
  origin: 'https://empirev2.vercel.app',  // Allow requests from this origin
  credentials: true,  // Allow cookies to be sent
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  preflightContinue: false, // Make sure preflight request doesn't hang
  optionsSuccessStatus: 204  // Handle preflight requests properly (some browsers expect 204)
};

// Use CORS middleware globally for all routes
app.use(cors(corsOptions));

// Handle OPTIONS requests explicitly (for preflight checks)
app.options('*', cors(corsOptions));  // Allow all routes to handle OPTIONS preflight requests

// Express body parser middleware
app.use(express.json());

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

app.get('/', (req, res) => {
  res.json({ "message": "it home bro" });
});

db.on('open', () => {
  console.log("Connected to MongoDB");
});

app.use('/users', users_router);
app.use('/todos', todo_router);
app.use('/days', day_router);

module.exports = app;
