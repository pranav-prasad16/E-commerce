const Review = require('../models/reviewModel');

const getReview = async (req, res) => {
  try {
    const reviews = await Review.find();
    if (!reviews) {
      res.status(404).json({ msg: 'No reviews found' });
    }
    res.status(201).json(reviews);
  } catch (error) {
    console.log('Error : ', error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

const postReview = async (req, res) => {
  const reviewData = req.body;
  try {
    const newReview = await Review.create(reviewData);
    res.status(201).json(newReview);
  } catch (error) {
    console.log('Error : ', error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

const updateReview = async (req, res) => {
  const reviewId = req.params.reviewId;
  const updatedData = req.body;
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      updatedData,
      { new: true }
    );
    if (!updatedReview) {
      res.status(404).json({ msg: 'Review not found' });
    }
    res.status(201).json(updatedReview);
  } catch (error) {
    console.log('Error : ', error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

const deleteReview = async (req, res) => {
  const reviewId = req.params.reviewId;
  try {
    const deletedReview = await Review.findByIdAndDelete(reviewId);
    if (!deletedReview) {
      res.status(404).json({ msg: 'Review not found' });
    }
    res.status(201).json({ mag: 'Review deleted successfully' });
  } catch (error) {
    console.log('Error : ', error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

module.exports = { getReview, postReview, updateReview, deleteReview };
