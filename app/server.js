/**
 * Created by Ranjeev on 11/10/2016.
 */

'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

//Connection to specific to specific hosted collection - change.
const CONNECTION = 'mongodb://192.168.99.100:27017/test';

//Use these to receive POSTs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//GETS all documents from collection
app.get("/allbikes", (req, res) => {
    db.collection('bike').find({}).toArray((err, docs) => {
        (err) ? res.json({"Error": "Failed to get bikes info - " + err}) : res.json(docs);
    });
});

//GETS specific document from collection defined by the bikeId
app.get("/allbikes/:id", (req, res) => {
    db.collection('bike').findOne({bikeId: parseInt(req.params.id)}, (err, docs) => {
        var result = (docs === null) ? res.json({'Error':'This bikeId does not exist'}) : res.json(docs);
        (err) ? res.json({"Error": "Failed to get bikes info - " + err}) : result;
    });
});

//POSTS new documents to collection
app.post("/addbike",(req, res) => {
    let postDB = db.collection('bike');
    let newBike = req.body;

    //new bikeId is assigned by finding the existing highest bikeId and incrementing value by 1.
    postDB.find({},{bikeId:1}).sort({"bikeId":-1}).limit(1).toArray()
        .then(totalNumber => {
            newBike.bikeId = totalNumber[0].bikeId + 1;
            //Checks model received from POST request is not an empty field or undefined
            if(req.body.name === undefined || req.body.description === undefined || req.body.price === undefined || req.body.name === '' || req.body.description === '' || req.body.price === '') {
                res.json({"error": "Must provide all fields"});
            }else{
                postDB.insertOne(newBike, (err) => {
                    (err) ? res.status(500).json({"error": "Failed to insert document. Error: " + err}) : res.status(201).json({"success": "Document inserted into bike collection"});
                })
            }
        })
        .catch(
        function(reason) {
            console.warn('Promise rejected: (' + reason + ')');
        });
});

//DELETE specific document from collection by received bikeId
app.delete("/deletebike/:id", (req, res) => {
    let postDB = db.collection('bike');

    //Only deletes if received bikeId currently exists in the collection
    postDB.findOne({bikeId: parseInt(req.params.id)}, {bikeId: 1})
        .then(x => {
                if (x != null){
                    postDB.deleteOne({bikeId: parseInt(req.params.id)}, (err, result) => {
                        (err) ? res.status(500).json({"error": "Failed to delete document. Error: " + err}) : res.status(201).json({"success": "Document deleted from bike collection - " + result});
                    });
                }else{
                    res.json({"Fail": "Document id " + req.params.id + " does not exist"});
                }
            })
        .catch(
        function(reason) {
            console.warn('Promise rejected: (' + reason + ')');
        });
});

let db;
MongoClient.connect(CONNECTION, (err, database) => {
    if(err) return console.warn(err);
    db = database;
    app.listen(9999, () => {
        console.log("Server is alive on port 9999....");
    });
});
