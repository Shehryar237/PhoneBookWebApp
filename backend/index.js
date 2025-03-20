// index.js
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const loginRouter = require('./controllers/login')
const { errorHandler, unknownEndpoint } = require('./utils/middleware');
const contactsRouter = require('./controllers/contacts');
const Contact = require('./models/contact'); // Import Contact for /info route
const usersRouter = require('./controllers/users');
const User = require('./models/user')
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny')); // Use morgan for logging
app.use('/api/login', loginRouter)

// Routes
app.use('/api/persons', contactsRouter);
app.use('/api/users', usersRouter)


if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
  }

// GET /info
app.get('/info', (req, res, next) => {
    Contact.countDocuments({})
        .then(count => {
            const currentTime = new Date().toLocaleString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZoneName: 'short',
            });
            res.send(`
                <p>This phone book has info for ${count} people</p>
                <p>${currentTime}</p>
            `);
        })
        .catch(error => next(error));
});

const extractToken = (req, res, next) => {
    const authorization = req.get('Authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        req.token = authorization.substring(7);
    } else {
        req.token = null;
    }
    next();
};

app.use(unknownEndpoint);
app.use(errorHandler);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
