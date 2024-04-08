const Joi = require('joi');
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    cartID: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        required: true
    },
    username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    prodID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 0
    }
});

const Cart = mongoose.model('Cart', cartSchema);

function validateCart(cart) {
    const schema = Joi.object({
        username: Joi.string().required().min(5).max(50),
        prodID: Joi.string().required(),
        quantity: Joi.number().required().min(1),
        price: Joi.number().required().min(0),
        // totalPrice: Joi.number().required().min(0)
    });
    return schema.validate(cart);
}

exports.Cart = Cart;
exports.validate = validateCart;
