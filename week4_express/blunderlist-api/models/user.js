const mongoose = require('mongoose')
const Schema = mongoose.Schema

userSchema = new Schema({
    firstName: {
        type: String,
        required: false,
        default: null,
    },
    lastName: {
        type: String,
        default: null,
    },
    userName: {
        type: String,
        minlength: [6, 'Username must be 6 characetrs or more.'],
        maxlength: [30, 'Maximum username length is 30 characters.'],
        required: [true, 'Username is required.'],
        unique: true,
        validate: [
            function(username, callback) {
                User.findOne({ userName: username }, function(error, username) {
                    if (error) {
                        console.log(error)
                    }
                    if (!user) {
                        callback(false)
                    } else {
                        callback(true)
                    }
                })
            },
            'Username already exists.',
        ]

    },
    password: {
        type: String,
        minlength: [4, 'A password must be 6 characters or more.'],
        required: [true, 'A password is required.']
    },
    email: {
        type: String,
        default: "",
        required: false,
    },
    createdOn: {
        type: Date,
        default: new Date(),
    },
    updatedOn: {
        type: Date,
        default: new Date(),
    },
    deletedOn: {
        type: Date,
        default: null,
    },
    google: {
        id: String,
        token: String,
        name: String,
        email: String,
    },
})


module.exports = mongoose.model('User', userSchema)