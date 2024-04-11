const express = require('express');
const authMiddlware = require('../middleware/auth');
const {
  getReview,
  postReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');
const router = express.Router();

router.use(authMiddlware);

router
  .get('/', getReview)
  .post('/', postReview)
  .patch('/:reviewId', updateReview)
  .delete('/:reviewId', deleteReview);

module.exports = router;
