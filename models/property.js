const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PropertySchema = new Schema({
    name: String,
    address: String,
    price: Number,
    img: String
})

const Property = mongoose.model('mock24-property', PropertySchema)

module.exports = Property