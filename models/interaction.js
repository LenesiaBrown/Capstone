const Joi = require('joi');
const mongoose = require('mongoose');

const interactionSchema = new mongoose.Schema({
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
    interactionType: {
        type: String,
        required: true,
        enum: ['Click', 'View', 'Purchase', 'Like']
    },
    interactionDate: {
        type: Date,
        default: Date.now
    },
    frequency: {
        type: Number,
        default: 1
    }
});

const Interaction = mongoose.model('Interaction', interactionSchema);

function validateInteraction(interaction) {
    const schema = Joi.object({
        username: Joi.string().required(),
        prodID: Joi.string().required(),
        interactionType: Joi.string().valid('Click', 'View', 'Purchase', 'Like').required(),
        interactionDate: Joi.date().iso(),
        frequency: Joi.number().integer().min(1)
    });
    return schema.validate(interaction);
}

exports.Interaction = Interaction;
exports.validate = validateInteraction;
