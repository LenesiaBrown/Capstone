const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}));


function validateUser(user) {
    const schema = Joi.object({
        username: Joi.string().min(5).max(50).required(),
        email: Joi.string().email().min(5).max(255).required(),
        password: Joi.string().min(5).max(255).required(),
        role: Joi.string().valid('user', 'admin').default('user')
    });
    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;


