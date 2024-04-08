const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const users = await User.find();
    res.send(users);
});   

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // let user = new User({ username: req.body.username });
    let user = new User({ username, password, email } = req.body);
    user = await user.save();

    res.send(user);
});

router.put('/:username', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
    const user = await User.findByIdAndUpdate(req.params.username, { username: req.body.username }, { new: true });

    if (!user) return res.status(404).send('The user was not found.');

    res.send(user);
    } catch (error) {
        res.status(500).send('An error occurred while updating the user.');
    }
});

router.delete('/:username', async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.username);

    if (!user) return res.status(404).send('The user was not found.');

    res.send(user);
});

router.get('/:username', async (req, res) => {
    const user = await User.findById(req.params.username);

    if (!user) return res.status(404).send('The user was not found.');

    res.send(user);
});

module.exports = router;


