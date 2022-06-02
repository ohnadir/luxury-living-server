const express = require('express')
const cors = require('cors')
require('dotenv').config()
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@cluster0.wqn9d.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({message: 'UnAuthorization Access'})
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, access.env.ACCESS_TOKEN, function (err, decoded) {
        if (err) {
            return res.status(403).send({message: 'Forbidden Access'})
        }
        req.decoded = decoded;
        next();
    })
}


async function run() {
    try {
        await client.connect();
        const serviceCollection = client.db("luxury-living").collection("service");

        app.get('/services', async (req, res)=>{
            const services = await serviceCollection.find().toArray();
            res.send(services);
        })
    }
    finally {
        
    }
}
run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('Luxury Living')
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})