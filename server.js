require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose') 
const userRoutes = require('./routes/user')
const recipeRoutes = require('./routes/recipe');
require('dotenv').config();

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})
console.log(typeof userRoutes); // Should log 'function'
console.log(typeof recipeRoutes); // Should log 'function'

app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);

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