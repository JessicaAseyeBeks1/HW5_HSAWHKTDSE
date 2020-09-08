

//Mongo

const express = require('express')
const app = express()
const port = 4000;
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');



  const url = "mongodb+srv://jessy:jessy@cluster0.u0sf0.mongodb.net/COVID-19";


// DB Name
const dbName = 'COVID-19';

// MongoClient
const client = new MongoClient(url);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {

    // Stating the constants needed
    const db = client.db(dbName);
    const collection = db.collection('gtl-data');



    // Finding all the cases
    collection.find({}).toArray(async function (err, cases_list) {
        assert.equal(err, null);
        let cases = await cases_list;
        res.render('index.ejs', { 'stories': cases })
    });
})



// Connecting to server
client.connect(function (err) {
    assert.equal(null, err);
    console.log('******************************');
    console.log('Connected successfully to DB ');

    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`)
    })
})



