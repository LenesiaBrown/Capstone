const Joi = require('joi');
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    username: {
        type: String,
        ref: 'User', // Reference to the User model
        required: true
    },
    prodID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    transactionDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Received', 'Processing', 'Failed'],
        default: 'Received'
    },
    paymentMethod: {
        type: String,
        enum: ['Cash', 'Credit Card', 'Debit Card', 'PayPal'],
        required: true
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

function validateTransaction(transaction) {
    const schema = Joi.object({
        username: Joi.string().required(),
        prodID: Joi.string().required(),
        amount: Joi.number().required().min(0),
        transactionDate: Joi.date().iso(),
        status: Joi.string().valid('Received', 'Processing', 'Failed'),
        paymentMethod: Joi.string().required().valid('Cash', 'Credit Card', 'Debit Card', 'PayPal')
    });
    return schema.validate(transaction);
}

exports.Transaction = Transaction;
exports.validate = validateTransaction;
