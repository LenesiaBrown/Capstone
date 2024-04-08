const Joi = require('joi');
const mongoose = require('mongoose');
const users = require('./routes/users');
const products = require('./routes/products');
const ratings = require('./routes/ratings');
const transactions = require('./routes/transactions');
const interactions = require('./routes/interactions');
const carts = require('./routes/carts');
const wishlists = require('./routes/wishlists');
const express = require('express');
const app =  express();

mongoose.connect('mongodb://localhost/CampusMarketplace')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/users', users);
app.use('/api/products', products);
app.use('/api/ratings', ratings);
app.use('/api/transactions', transactions);
app.use('/api/interactions', interactions);
app.use('/api/carts', carts);
app.use('/api/wishlists', wishlists);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));