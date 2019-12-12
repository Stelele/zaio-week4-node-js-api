const Schema = require('mongoose').Schema
const mongoose = require('mongoose')

const UserSchema = new Schema({
    fullName: String,
    googleID: String,
    facebookID: String,
    email: String,
    password: String
})

const User = mongoose.model('mock24-user', UserSchema)

module.exports = User