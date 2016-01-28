var chai        = require('chai');
var chaiHttp    = require('chai-http');
var assert      = chai.assert;
var app         = require('../app');
var expect      = chai.expect;
var should = chai.should();
chai.use(chaiHttp);

describe('basic Express server at root path... ', function() {

    //testing harness
    var testingCreatedID = '';  //to pass a created name to the next test

    it('adds a FIRST document ', function(done) {
        //testing values
        var name        = "John Doe 5555";
        var position    = "Long Range Planning 5555";

        chai.request(app)
            .post("/api/")
            .send({
                    //"_id"       : _id,
                    "name"      : name,
                    "position"  : position })
            .end(function (err, res) {
                expect(err).to.be.null;
                assert.equal(res.body.name, name);
                passCreatedName = res.body.name; // for use in next test
                testingCreatedID = res.body.id;
                done();
            });
    });


    it('adds a SECOND document ', function(done) {

        //testing values
        var name        = "Bill 9999";
        var position    = "President 9999";

        chai.request(app)
            .post("/api/")
            .send({
                //"_id"       : _id,
                "name"      : name,
                "position"  : position })
            .end(function (err, res) {
                expect(err).to.be.null;
                assert.equal(res.body.name, name);
                passCreatedName = res.body.name; // for use in next test
                testingCreatedID = res.body.id;  //passing forward to subsequent test
                done();
            });
    });


    it('returns a list of all user documents in collection at /user', function(done){

        chai.request(app)
            .get('/api/')
            .end(function(err, res){
                if (err){console.log(err, ' is error');
                } else {
                    arraySize = res.body.length;
                    console.log(  'arraySize is ', arraySize);
                    expect(arraySize).to.be.above(1); //at least two added by first tests
                    done();
                }
            });
    });


    it(' gets a specific document by user ID ', function(done){

        chai.request(app)
            .get('/api/'+testingCreatedID)   //passed forward from previous test
            .end(function(err, res){
                if (err){console.log(err, ' is error');
                } else {
                    assert.equal(res.body.id   , testingCreatedID);
                    done();
                }
            });
    });


    it('updates values in document by ID ', function(done) {
        //test values
        var name = "AN UPDATED NAME";
        var position = "A BIG PROMOTION";
        var fullPath = '/api/' + testingCreatedID;   //passed forward from previous test

        chai.request(app)
            .put( fullPath )
            .send( { "name"         : name,
                     "position"     : position
                })
            .end(function (err, res) {
                expect(err).to.be.null;
                assert.equal(res.body.name, name);
                assert.equal(res.body.position, position);
                done();
            });
    });


     it('deletes a document that was added ', function(done) {
         var fullPath = '/api/' + testingCreatedID;  //passed forward from previous test

         chai.request(app)
             .delete(fullPath)
             .end(function (err, res) {
                 if (err) {
                     console.log(err, ' is err ');
                 } else {
                      assert.equal(200, res.status);
                 }
                 done();
             });
     });


});
