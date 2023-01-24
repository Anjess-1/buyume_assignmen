let mongoose = require('mongoose')

mongoose.connect("mongodb+srv://tuffy123:tuffy@cluster0.ic7bsvl.mongodb.net/product")

mongoose.connection.on('error', error => {
    console.log('Mongo connection error : ', error)
})

mongoose.connection.on('connected', ()=>{
    console.log('Connected with mongodb')
})