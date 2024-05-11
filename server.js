require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Include the cors library
const userRoutes = require('./routes/user');
const recipeRoutes = require('./routes/recipe');
const reviewRoutes = require('./routes/review');

// express app
const app = express();

// Middleware to enable CORS
app.use(cors({
    origin: 'http://localhost:3000' // Allow only requests from this origin
}));

// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware to log requests
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/reviews', reviewRoutes);

// connect to db
mongoose.connect(process.env.MongoURI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log(error);
  });

// Listening on localhost:4000
app.listen(4000, () => {
    console.log("Server running on port 4000");
});
