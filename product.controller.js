const productModel = require('./product.model')

exports.updateProductQuantity = async (req, res) => {
    const productUpdateStatus = []
    req.body && req.body.payload && req.body.payload.forEach((product) => {
        if (product &&
            product.productId &&
            product.operation &&
            product.quantity) {
            if (product.operation == 'add') {
                productModel.getProductByProductId(product.productId, (error, result) => {
                    if (!error && result) {
                        if (Array.isArray(result) && result.length) {
                            result[0].quantity = result[0].quantity + product.quantity
                            productModel.updateProduct(result[0], (err, data) => {
                                if (!err && data) {
                                    productUpdateStatus.push({
                                        productId: product.productId,
                                        result: "Product updated"
                                    })
                                } else {
                                    productUpdateStatus.push({
                                        productId: product.productId,
                                        error: "Some issue occurred"
                                    })
                                }
                            })
                        } else {
                            productModel.addProduct(product, (err, data) => {
                                if (!err && data) {
                                    productUpdateStatus.push({
                                        productId: product.productId,
                                        result: "Product updated"
                                    })
                                } else {
                                    productUpdateStatus.push({
                                        productId: product.productId,
                                        error: "Some issue occurred"
                                    })
                                }
                            })
                        }
                    } else {
                        productUpdateStatus.push({
                            productId: product.productId,
                            error: "Some issue occurred"
                        })
                    }
                })
            }
            if (product.operation == 'subtract') {
                productModel.getProductByProductId(product.productId, (error, result) => {
                    if (!error && result) {
                        if (Array.isArray(result) && result.length) {
                            if (result[0].quantity >= product.quantity) {
                                result[0].quantity = result[0].quantity - product.quantity
                                productModel.updateProduct(result[0], (err, data) => {
                                    if (!err && data) {
                                        productUpdateStatus.push({
                                            productId: product.productId,
                                            result: "Product updated"
                                        })
                                    } else {
                                        productUpdateStatus.push({
                                            productId: product.productId,
                                            error: "Some issue occurred"
                                        })
                                    }
                                })
                            } else {
                                productUpdateStatus.push({
                                    productId: product.productId,
                                    error: "Please update product quantity"
                                })
                            }
                        } else {
                            productUpdateStatus.push({
                                productId: product.productId,
                                error: "ProductId is not found"
                            })
                        }
                    } else {
                        productUpdateStatus.push({
                            productId: product.productId,
                            result: "Some issue occurred"
                        })
                    }
                })
            }
        }
    })
    res.status(200).send({
        status: true,
        resonse: productUpdateStatus
    })
}