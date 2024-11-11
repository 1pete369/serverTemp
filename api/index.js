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
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

// Use CORS middleware globally for all routes
app.use(cors(corsOptions));

// Explicitly set CORS headers for preflight (OPTIONS) requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://empirev2.vercel.app'); // Allow requests from your frontend URL
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');  // Allow these methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');  // Allow these headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');  // Allow credentials (cookies, etc.)
  next();
});

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
