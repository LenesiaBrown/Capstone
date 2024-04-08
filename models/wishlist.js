const Joi = require('joi');
const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    prodID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

function validateWishlist(wishlist) {
    const schema = Joi.object({
        username: Joi.string().min(5).max(50).required(),
        prodID: Joi.string().required(),
        quantity: Joi.number().required().min(1)
    });
    return schema.validate(wishlist);
}

exports.Wishlist = Wishlist;
exports.validate = validateWishlist;
