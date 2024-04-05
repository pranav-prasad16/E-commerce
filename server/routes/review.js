const express = require('express');
const {
  getReview,
  postReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');
const router = express.Router();

router
  .get('/', getReview)
  .post('/', postReview)
  .patch('/:reviewId', updateReview)
  .delete('/:reviewId', deleteReview);

module.exports = router;
