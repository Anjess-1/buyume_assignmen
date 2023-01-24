const mongoose = require('mongoose')

let productSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productId: Number,
    quantity: Number,
    updatedAt: Date
})

module.exports = mongoose.model('inventory', productSchema)