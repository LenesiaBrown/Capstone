const express = require('express');
const router = express.Router();
const { Interaction, validate } = require('../models/interaction');

// Get all interactions
router.get('/', async (req, res) => {
    try {
        const interactions = await Interaction.find();
        res.send(interactions);
    } catch (error) {
        res.status(500).send('An error occurred while fetching interactions.');
    }
});

// Create a new interaction
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const interaction = new Interaction(req.body);
        await interaction.save();
        res.send(interaction);
    } catch (error) {
        res.status(500).send('An error occurred while creating the interaction.');
    }
});

module.exports = router;
