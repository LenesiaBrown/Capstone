const Joi = require('joi');
const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.ObjectId, 
        type: String,
        ref: 'User',
        required: true
    },
    prodID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    ratingValue: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    reviewTitle: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    reviewDes: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1000
    },
    reviewDate: {
        type: Date,
        default: Date.now
    }
});

const Rating = mongoose.model('Rating', ratingSchema);

function validateRating(rating) {
    const schema = Joi.object({
        username: Joi.string().min(5).max(50).required(),
        prodID: Joi.string().required(),
        ratingValue: Joi.number().required().min(1).max(5),
        reviewTitle: Joi.string().required().min(5).max(255),
        reviewDes: Joi.string().required().min(5).max(1000),
        reviewDate: Joi.date().iso()
    });
    return schema.validate(rating);
}

exports.Rating = Rating;
exports.validate = validateRating;
