const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const users_router = require('../routes/users')
const todo_router = require('../routes/todos')
const day_router = require('../routes/days')

const app= express()

// app.use(cors())


const corsOptions = {
    origin: 'https://empirev2.vercel.app', // specify the front-end origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // include all methods you plan to use
    allowedHeaders: ['Content-Type', 'Authorization'], // include any custom headers if necessary
    credentials: true // if you need to include cookies or authorization headers
};

app.use(cors(corsOptions));



app.use(express.json())

mongoose.connect(process.env.DB_URL)

const db= mongoose.connection

// app.listen(process.env.PORT_NUM,()=>{
//     console.log("server started on port ",process.env.PORT_NUM)
// })

app.get('/',(req,res)=>{
    res.json({ "message" : "it home bro"})
})

db.on('open',()=>{
    console.log("Connected to Mongodb")
})

app.use('/users',users_router)
app.use('/todos',todo_router)
app.use('/days',day_router)

module.exports = app

