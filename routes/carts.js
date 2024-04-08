const express = require('express');
const router = express.Router();
const { Cart, validate } = require('../models/cart');

// Get all items in the cart
router.get('/', async (req, res) => {
    try {
        const cartItems = await Cart.find();
        res.send(cartItems);
    } catch (error) {
        res.status(500).send('An error occurred while fetching cart items.');
    }
});

// Add a new item to the cart
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        let cartItem = new Cart(req.body);
        cartItem.totalPrice = cartItem.quantity * cartItem.price;
        await cartItem.save();
        res.send(cartItem);
    } catch (error) {
        res.status(500).send('An error occurred while adding the item to the cart.');
    }
});

// Update a cart item
router.put('/:username', async (req, res) => {
    try {
        const cartItem = await Cart.findByIdAndUpdate(req.params.username, req.body, { new: true });
        if (!cartItem) return res.status(404).send('The cart item with the given ID was not found.');
        
        // Recalculate total price
        cartItem.totalPrice = cartItem.quantity * cartItem.price;
        await cartItem.save();
        
        res.send(cartItem);
    } catch (error) {
        res.status(500).send('An error occurred while updating the cart item.');
    }
});

// Delete a cart item
router.delete('/:username', async (req, res) => {
    try {
        const cartItem = await Cart.findByIdAndDelete(req.params.username);
        if (!cartItem) return res.status(404).send('The cart item with the given ID was not found.');
        
        res.send(cartItem);
    } catch (error) {
        res.status(500).send('An error occurred while deleting the cart item.');
    }
});

// Get the total price of all items in the cart
router.get('/total', async (req, res) => {
    try {
        const total = await Cart.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: "$totalPrice" }
                }
            }
        ]);
        res.send({ total: total.length > 0 ? total[0].total : 0 });
    } catch (error) {
        res.status(500).send('An error occurred while calculating the total price.');
    }
});


module.exports = router;
