const contactsRouter = require('express').Router();
const Contact = require('../models/contact');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// to extract token from the request
const getTokenFrom = (req) => {
    const authorization = req.headers.authorization;
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '');
    }
    return null;
};

// to verify and decode token
const authenticateUser = async (req, res, next) => {
    try {
        const token = getTokenFrom(req);
        if (!token) {
            return res.status(401).json({ error: 'Token must be provided' });
        }

        const decodedToken = jwt.verify(token, process.env.SECRET);
        if (!decodedToken.id) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        req.user = await User.findById(decodedToken.id);
        if (!req.user) {
            return res.status(401).json({ error: 'User not found' });
        }

        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token', details: error.message });
    }
};

//GET /api/persons - Get all contacts user
contactsRouter.get('/', authenticateUser, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user._id });
        res.json(contacts);
    } catch (error) {
        console.error('GET Error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//POST /api/persons - add a new contact
contactsRouter.post('/', authenticateUser, async (req, res, next) => {
    try {
        const { name, number } = req.body;

        //Check for existing contact 
        const existingContact = await Contact.findOne({ name, user: req.user._id });
        if (existingContact) {
            return res.status(400).json({ error: 'Name must be unique per user' });
        }

        const newContact = new Contact({
            name,
            number,
            user: req.user._id,
        });

        const savedContact = await newContact.save();
        req.user.contacts = req.user.contacts.concat(savedContact._id);
        await req.user.save();
        res.status(201).json(savedContact);
    } 
    catch (error) {
        next(error);
    }
});

//DELETE /api/persons/:id - Delete a contact
contactsRouter.delete('/:id', authenticateUser, async (req, res, next) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        //ensure user owns the contact before deleting
        if (contact.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Unauthorized to delete this contact' });
        }
        await Contact.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } 
    catch (error) {
        next(error);
    }
});

module.exports = contactsRouter;
