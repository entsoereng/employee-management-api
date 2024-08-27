const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    review: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review_date: { type: Date, default: Date.now }
})

const Reviews = mongoose.model('Reviews', reviewSchema);
module.exports = Reviews;
