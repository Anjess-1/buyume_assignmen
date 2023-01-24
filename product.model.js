const productSchema = require('./product.schema')
const mongoose = require('mongoose')

exports.addProduct = (productData, callback) => {
    const product = new productSchema({
        _id: new mongoose.Types.ObjectId,
        productId: productData.productId,
        quantity: productData.quantity,
        updatedAt: new Date()
    })
    product.save()
        .then(result => {
            callback(null, result)
        })
        .catch(error => {
            callback(error)
        })
}

exports.getProductByProductId = (productId, callback) => {
    productSchema.find({ "productId": productId })
        .then(result => {
            callback(null, result)
        })
        .catch(error => {
            callback(error)
        })
}

exports.updateProduct = (productData, callback) => {
    productSchema.findOneAndUpdate({ _id: productData._id }, {
        $set: {
            quantity: productData.quantity,
            updatedAt: new Date()
        }
    })
        .then(result => {
            callback(null, result)
        })
        .catch(error => {
            callback(error)
        })
}