module.exports = app => {
    const product = require('./product.controller')

    app.post("/updateProductQuantity", product.updateProductQuantity)
}