///**
// * Created by Ranjeev on 12/10/2016.
// */
"use strict";
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app/server');
var should = chai.should();
const MongoClient = require('mongodb').MongoClient;

chai.use(chaiHttp);

const CONNECTION = process.env.DB_HOST+process.env.COLLECTION;
let db;
let getHighBikeId;

//Connect to a DB instance to ge the highest bikeId value, to perform the " Delete a bike object from collection ==> DELETE" test.
MongoClient.connect(CONNECTION, (err, database) => {
    if(err) return console.warn(err);
    db = database;
    chai.use(chaiHttp);
    db.collection('bike').find({},{bikeId:1}).sort({"bikeId":-1}).limit(1).toArray()
        .then(totalNumber => {
            getHighBikeId = totalNumber[0].bikeId;
        })
        .catch(
        function(reason) {
            console.warn('Promise rejected: (' + reason + ')');
        });
});

describe('RESTful APIs', ()=> {

    it('"/" should return an object of instruction when no REST endpoint handle provided ==> GET', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                should.equal(err, null);
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

    it('List all items in the bike collection on allbikes ==> GET', (done) => {
       chai.request(server)
           .get('/allbikes')
           .end((err, res) => {
               should.equal(err, null);
               res.should.have.status(200);
               res.body.should.be.a('array');
               res.body[0].should.be.a('object');
               done();
           });
   });

    it('List a single bike with /allbikes/:id ==> GET', (done) => {
        chai.request(server)
            .get('/allbikes/4')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('_id');
                res.body.should.have.property('name');
                res.body.should.have.property('description');
                res.body.should.have.property('price');
                res.body.should.have.property('bikeId');
                res.body.bikeId.should.equal(parseInt('4'));
                done();
            });
    });

    it('Post a new bike object into collection ==> POST', (done) => {
        chai.request(server)
            .post('/addbike')
            .send({'name': 'BMX', 'description': 'Old school favourite', 'price':'9999'})
            .end((err, res) => {
                should.equal(err, null);
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property("success");
                res.body.success.should.be.a('string');
                done();
            });
    });

    it('Post a new bike object into collection with incomplete fields ==> POST (FAIL)', (done) => {
        chai.request(server)
            .post('/addbike')
            .send({'name': '', 'description': '', 'price':'9999'})
            .end((err, res) => {
                should.equal(err, null);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property("error");
                done();
            });
    });

    it('Delete a bike object from collection ==> DELETE', (done) => {
        chai.request(server)
            .delete('/deletebike/' + getHighBikeId)
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property("deleted");
                done();
            });
    });

    it('Delete a non-existent bike object from collection ==> DELETE (FAIL)', (done) => {
        chai.request(server)
            .delete('/deletebike/9999999999999')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property("fail");
                done();
            });
    });
});
