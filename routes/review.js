const express = require('express');
const router = express.Router();
const {
  addReviewToRecipe
} = require('../controllers/reviewController');

router.post('/',addReviewToRecipe)

module.exports = router;