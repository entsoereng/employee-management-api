const express = require('express');
const router = express.Router();



const ReviewsController = require("../../controllers/reviews");

// GET request to get all reviews
router.get('/', ReviewsController.reviews_get_all);

// POST request to make a review
router.post('/', ReviewsController.reviews_create_review);

// PATCH request to update review
router.patch('/:reviewId', ReviewsController.reviews_update_review);

// GET request to get review by ID
router.get('/:reviewId', ReviewsController.reviews_get_review);

// DELETE request to delete review
router.delete('/:reviewId', ReviewsController.reviews_delete_review);

module.exports = router;