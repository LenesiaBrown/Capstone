const express = require('express');
const router = express.Router();
const { Transaction, validate } = require('../models/transaction');

// Get all transactions
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.send(transactions);
    } catch (error) {
        res.status(500).send('An error occurred while fetching transactions.');
    }
});

// Create a new transaction
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const transaction = new Transaction(req.body);
        await transaction.save();
        res.send(transaction);
    } catch (error) {
        res.status(500).send('An error occurred while creating the transaction.');
    }
});

module.exports = router;
