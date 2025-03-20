const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usersRouter = require('express').Router();
const User = require('../models/user');
const Contact = require('../models/contact');

// create a new user
usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
        username,
        name,
        passwordHash,
    });

    const savedUser = await user.save();
    response.status(201).json(savedUser);
});

// get all users and their contacts
usersRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('contacts', { name: 1, number: 1, id: 1 });
    res.json(users);
});



module.exports = usersRouter;
