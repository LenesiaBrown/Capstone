const Joi = require('joi');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    prodID: {
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
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1000
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        enum: ['Books', 'Services', 'Household Items', 'Electronics', 'Clothing', 'Other']
    },
    itemServ: {
        type: String,
        required: true,
        enum: ['Item', 'Service']
    },
    images: Joi.array().items(Joi.string())
});

const Product = mongoose.model('Product', productSchema);

function validateProduct(product) {
    const schema = Joi.object({
        username: Joi.string().min(5).max(50).required(),
        name: Joi.string().min(5).max(255).required(),
        description: Joi.string().min(5).max(1000).required(),
        price: Joi.number().min(0).required(),
        status: Joi.string().valid('Active', 'Inactive'),
        stock: Joi.number().min(0).required(),
        category: Joi.string().valid('Books', 'Service', 'Household', 'Other').required(),
        itemServ: Joi.string().valid('Item', 'Service').required(),
        images: Joi.array().items(Joi.string())
    });
    return schema.validate(product);
}

exports.Product = Product;
exports.validate = validateProduct;