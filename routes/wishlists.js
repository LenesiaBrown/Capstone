const express = require('express');
const router = express.Router();
const { Wishlist, validate } = require('../models/wishlist');

// Get all wishlist items
router.get('/', async (req, res) => {
    try {
        const wishlist = await Wishlist.find();
        res.send(wishlist);
    } catch (error) {
        res.status(500).send('An error occurred while fetching wishlist items.');
    }
});

// Add an item to the wishlist
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const wishlist = new Wishlist(req.body);
        await wishlist.save();
        res.send(wishlist);
    } catch (error) {
        res.status(500).send('An error occurred while adding item to wishlist.');
    }
});

// Delete an item from the wishlist
router.delete('/:username', async (req, res) => {
    try {
        const wishlistItem = await Wishlist.findByIdAndDelete(req.params.username);
        if (!wishlistItem) return res.status(404).send('The wishlist item with the given ID was not found.');
        
        res.send(wishlistItem);
    } catch (error) {
        res.status(500).send('An error occurred while deleting the wishlist item.');
    }
});


module.exports = router;
