const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const users_router = require('../routes/users');
const todo_router = require('../routes/todos');
const day_router = require('../routes/days');

const app = express();

const corsOptions = {
    origin: 'https://empirev2.vercel.app', // Your frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

// Apply CORS options and handle preflight requests
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Custom headers middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://empirev2.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials (e.g., cookies)
    next();
});

app.use(express.json());

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

app.get('/', (req, res) => {
    res.json({ "message" : "it's home bro" });
});

db.on('open', () => {
    console.log("Connected to MongoDB");
});

app.use('/users', users_router);
app.use('/todos', todo_router);
app.use('/days', day_router);

module.exports = app;
