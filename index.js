const express = require('express')
const bodyParser = require('body-parser')
const mongodb = require("./db")

const app = express();

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json({ message: "Test Success" })
})

require("./product.route")(app)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is working on port : ${PORT}`)
})


