const mongoose = require('mongoose');
const Reviews = require('../models/reviews');
const Employee = require('../models/employee');

exports.reviews_get_all = (req, res, next) => {
    Reviews.find()
        .select('employee review rating')
        .populate('employee', 'first_name last_name')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                reviews: docs.map(doc => {
                    return {
                        _id: doc._id,
                        employee: doc.employee,
                        review: doc.review,
                        rating: doc.rating,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/reviews/' + doc._id
                        }
                    }
                })
            });
        })
        .catch(err => {
            console.error('Error fetching reviews:', err); // Enhanced error logging
            res.status(500).json({
                error: {
                    message: 'Error fetching reviews',
                    details: err.message || err
                }
            });
        });
}

exports.reviews_create_review = (req, res, next) => {
    Employee.findById(req.body.employeeId)
        .then(employee => {
            if (!employee) {
                return res.status(404).json({
                    message: 'Employee not found'
                });
            }
            const reviews = new Reviews({
                _id: new mongoose.Types.ObjectId(),
                employee: req.body.employeeId,
                review: req.body.review,
                rating: req.body.rating
            });
            return reviews
                .save()
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Review saved',
                createdReviews: {
                    _id: result._id,
                    employee: result.employee,
                    review: result.review,
                    rating: result.rating
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/reviews/' + result._id
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.reviews_get_review = (req, res, next) => {
    Reviews.findById(req.params.reviewId)
        .populate('employee')
        .exec()
        .then(review => {
            if (!review) {
                return res.status(404).json({
                    message: "Review not found"
                })
            }
            res.status(200).json({
                review: review,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/reviews'
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.reviews_update_review = (req, res, next) => {
    const id = req.params.reviewId;
    const updateOps = {};

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Reviews.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Review updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/reviews/' + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}


exports.reviews_delete_review = (req, res, next) => {
    Reviews.deleteOne({ _id: req.params.reviewId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Review deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/reviews',
                    body: { employeeId: 'ID', review: 'String', rating: 'String' }
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}
