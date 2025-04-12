const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const url =
    `url`;

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB');
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message);
    })

    const contactSchema = new mongoose.Schema({
        name:{
            type: String,
            minLength: 3,
            required: true,
        },
        number: {
            type: String,
            required: true,
            validate: {
                validator: function (v) {
                    // match the phone number format
                    const phoneRegex = /^\d{2,3}-\d+$/;
                    return phoneRegex.test(v) && v.length >= 8;
                },
                message: props => `${props.value} is not a valid phone number!` 
            }
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    })

    contactSchema.set('toJSON', {
        transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        }
    })

module.exports = mongoose.model('Contact', contactSchema)
