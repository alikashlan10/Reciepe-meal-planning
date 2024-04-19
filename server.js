require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose') 
const userRoutes = require('./routes/user')


// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// user routes
app.use('/api/user', userRoutes)

// connect to db
mongoose.connect(process.env.MongoURI)
.then(()=>{console.log("connected to database")})
.catch((error)=>{
    console.log(error)
})


// listnening on local host
app.listen(4000,()=>{
    console.log("welcome")
})