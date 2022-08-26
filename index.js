const express = require('express')
const app = express()
const cors = require('cors');

const port = process.env.PORT || 5000
require('dotenv').config()
// middleware 

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to our server')
})

app.listen(port, () => {
    console.log(`Sharepal app listening on port ${port}`)
})