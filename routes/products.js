const express = require('express');
const router = express.Router();
const { Product, validate } = require('../models/product');

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.send(products);
    } catch (error) {
        res.status(500).send('An error occurred while fetching products.');
    }
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // let user = new User({ username: req.body.username });
    let product = new Product({ description, price, stock, category, itemServ } = req.body);
    product = await product.save();

    res.send(product);
});

// router.post('/', async (req, res) => {
//     const { error } = validateProduct(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     try {
//         const product = new Product(req.body);
//         await product.save();
//         res.send(product);
//     } catch (error) {
//         res.status(500).send('An error occurred while creating the product.');
//     }
// });

module.exports = router;
