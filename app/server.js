/**
 * Created by Ranjeev on 11/10/2016.
 */

'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
}));

let db;

app.get("/allbikes", (req, res) => {
    db.collection('bike').find({}).toArray((err, docs) => {
        (err) ? handleError(res, err.message, "Failed to get bikes info.") : res.json(docs);

    });
});

app.get("/allbikes/:id", (req, res) => {
    db.collection('bike').findOne({bikeId: parseInt(req.params.id)}, (err, docs) => {
        console.log(docs);
        var result = (docs===null) ? res.send('This bikeId does not exist') : res.json(docs);
        (err) ? handleError(res, err.message, "Failed to get bikes info.") : result;
    });
});

app.post("/addbike",(req, res) => {

    let postDB = db.collection('bike');
    let newBike = req.body;

    postDB.find({},{bikeId:1}).sort({"bikeId":-1}).limit(1).toArray()
        .then(totalNumber => {
            newBike.bikeId = totalNumber[0].bikeId + 1;
            //console.log(newBike);
            if ((req.body.name === undefined || req.body.description === undefined || req.body.price === undefined)) {
                res.status(500).json({"error": "Must provide all fields"});
            }
            postDB.insertOne(newBike, (err, doc) => {
                (err) ? res.status(500).json({"error": "Failed to insert document. Error: " + err}): res.status(201).json({"success": "Document inserted into bike collection"});
            })
        })
        .catch(
        function(reason) {
            console.warn('Promise rejected: (' + reason + ')');
        });

    //postDB.count()
    //    .then(totalNumber => {
    //        newBike.bikeId = totalNumber + 1;
    //        //console.log(newBike);
    //        if ((req.body.name === undefined|| req.body.description === undefined || req.body.price === undefined)) {
    //            res.status(500).json({"error": "Must provide all fields"});
    //        }
    //        postDB.insertOne(newBike, function(err, doc) {
    //            if (err) {
    //                res.status(500).json({"error": "Failed to insert document. Error: " + err});
    //            } else {
    //                res.status(201).json({"success": "Document inserted into bike collection - " + doc});
    //            }
    //        })
    //    })
    //    .catch(
    //    function(reason) {
    //        console.warn('Promise rejected: (' + reason + ')');
    //    });

});

app.delete("/deletebike/:id", (req, res) => {
    let postDB = db.collection('bike');

    postDB.findOne({bikeId: parseInt(req.params.id)}, {bikeId: 1})
        .then(x => {
                if (x != null){
                    postDB.deleteOne({bikeId: parseInt(req.params.id)}, (err, result) => {
                        console.log(req.params);
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


    //db.collection('bike').deleteOne({bikeId: parseInt(req.params.id)}, (err, result) => {
    //    console.log(req.params);
    //    (err) ? res.status(500).json({"error": "Failed to delete document. Error: " + err}) : res.status(201).json({"success": "Document deleted from bike collection - " + result});
    //});
});

MongoClient.connect('mongodb://192.168.99.100:27017/test', (err, database) => {
    if(err) return console.warn(err);
    db = database;
    app.listen(9999, () => {
        console.log("Server is alive on port 9999....");
    });
});
