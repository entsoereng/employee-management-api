const express = require('express');
const router = express.Router();



const ReviewsController = require("../../controllers/reviews");

router.get('/', ReviewsController.reviews_get_all);


router.post('/', ReviewsController.reviews_create_review);

router.patch('/:reviewId', ReviewsController.reviews_update_review);

router.get('/:reviewId', ReviewsController.reviews_get_review);

router.delete('/:reviewId', ReviewsController.reviews_delete_review);

module.exports = router;