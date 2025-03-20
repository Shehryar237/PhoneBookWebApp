// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, 
        minlength: 3,
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    contacts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Contact',
        },
    ],
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
