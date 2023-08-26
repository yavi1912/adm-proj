const mongoose = require('mongoose')
//create schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        Rerequired: true
    },
    email: {
        type: String,
        Rerequired: true
    },
    password: {
        type: String,
        Rerequired: true
    },
    image: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    role: {
        type: String,
        default: 'student',
    },

}, { timestamps: true })

const UserModel = mongoose.model('user', UserSchema)

module.exports = UserModel