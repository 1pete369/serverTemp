const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');
require('dotenv').config();

const users_router = require('../routes/users');
const todo_router = require('../routes/todos');
const day_router = require('../routes/days');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://empirev2.vercel.app'); // Replace with your actual origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow specific HTTP methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
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
