const express = require('express');
const router = express.Router();
const { Rating, validate } = require('../models/rating');

// Get all ratings
router.get('/', async (req, res) => {
    try {
        const ratings = await Rating.find();
        res.send(ratings);
    } catch (error) {
        res.status(500).send('An error occurred while fetching ratings.');
    }
});

// router.post('/', async (req, res) => {
//     const { error } = validate(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     // let user = new User({ username: req.body.username });
//     let rating = new Rating({ username, prodID, ratingValue, reviewTitle, reviewDes, reviewDate } = req.body);
//     rating = await rating.save();

//     res.send(rating);
// });

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const rating = new Rating(req.body);
        await rating.save();
        res.send(rating);
    } catch (error) {
        res.status(500).send('An error occurred while creating the rating.');
    }
});

module.exports = router;
