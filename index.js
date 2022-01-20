// import all needed packages
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 4000;
const { MongoClient } = require('mongodb');


app.use(cors());
app.use(express.json());

// Declare MongoDB database URI and Client
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ha2x2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        // Connect MongoDB and access database and collections
        await client.connect();
        const database = client.db("meddical");
        const doctorsCollection = database.collection("doctors");

        // This is server home path
        app.get('/', (req, res) => {
            res.send("Hello Meddical");
        })

        // Get all doctors from the database
        app.get("/doctors", async (req, res) => {
            const doctors = await doctorsCollection.find({}).toArray();
            res.send(doctors)
        })
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.listen(port, (req, res) => {
    console.log("Server listening on port " + port);
})