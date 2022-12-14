const express = require('express')
const app = express()
const cors = require('cors');

const port = process.env.PORT || 5000
require('dotenv').config()

// middleware 

app.use(cors())
app.use(express.json())


// CONNECT TO MONGOBD

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ro5atxz.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect()

        const serviceCollection = client.db('sharePal').collection('product');
        const cuponCollection = client.db('sharePal').collection('cupon');
        const moreCategoriesCollection = client.db('sharePal').collection('moreCategories');

        app.get('/products', async (req, res) => {

            const query = {};
            const result = await serviceCollection.find(query).toArray();
            res.send(result)

        })
        app.get('/cupons', async (req, res) => {

            const query = {};
            const result = await cuponCollection.find(query).toArray();
            res.send(result)

        })
        app.get('/moreCategories', async (req, res) => {

            const query = {};
            const result = await moreCategoriesCollection.find(query).toArray();
            res.send(result)

        })
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Welcome to our server')
})

app.listen(port, () => {
    console.log(`Sharepal app listening on port ${port}`)
})








