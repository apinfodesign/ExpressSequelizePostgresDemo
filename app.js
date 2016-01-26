//sequelize postgres

var express 	= require('express');
var fs 		    = require('fs');
var router 		= express.Router();
var path 		= require("path");
var app         = express();
var bodyParser  = require('body-parser');
var Sequelize = require( 'sequelize' );

//    postgres://user:password@host:port/database
const methodOverride = require( 'method-override' );
const sequelize = new Sequelize('postgres://sam:123@localhost:5432/foobar');


var user = sequelize.define('user', {
    name: {
        type: Sequelize.STRING
    },
    hobby: {
        type: Sequelize.STRING
    },
    cost: {
        type: Sequelize.DECIMAL(10, 2)
    }
});

app.use(bodyParser.json() );


//top level response
app.get('/', function(req, res) {
    res.send('hello postgres!');
});


// Pet.sync( /* { force: true } */ )
// 	.then(function () {
// 		// Table created
// 		return Pet.create({
// 			name: 'tweeety',
// 			type: 'bird',
// 			cost: 102.55
// 		});
// 	})
// 	.then( pet => {
// 		console.log( 'pet created', pet.toJSON() );
// 	})
// 	.catch( err => {
// 		console.log( 'error :(', err );
// 	});


// Pet.findAll({ where: { type: 'bird' } }).then( pets => {
// 	console.log( pets.map( p => p.toJSON() ) );
// });

// sequelize.query( 'select type, max(cost) from pets group by type' ).spread( results => {
// 	console.log( results );
// });






//
////GET - returns list of all objects
////query parameters define page size and zero based page number
//
//app.get('/users', function(req,res,next){
//
//    var page = req.query.page;  //zero based
//    var pageSize = req.query.pageSize;
//
//    User.find()
//        .sort({created: 'descending'})
//        .limit(pageSize)
//        .skip(pageSize * page)
//        .exec(function (err, users) {
//            if (err) {
//                return next(err)
//            }
//            else {
//                res.status(201).json(users);
//            }
//        })
//});
//
//
//
////GET/:id - returns the object specified by that id
//app.get('/users/:name', function(req,res,next){
//    res.type('json');
//    var name = req.params.name;
//    User.
//    findOne({
//        name: name
//    }).
//    select ('name').select('hobby').select('interests').
//    exec(function(err, user){
//        console.log('you got back : ', user);
//        if (err)
//            {return next(err)}
//            else{
//                res.status(201).json( user );
//             }
//        })
//});
//
//
////POST create a new object (should return newly created object that has db id to client)
//
//app.post('/upload', function(req, res) {
//    console.log(req.params.body);
//    if (req.body.name !== null) {
//        console.log('req.body is: ', req.body);
//
//        var user = new User({
//            name        : req.body.name,
//            hobby       : req.body.name,
//            interests   : req.body.interests
//        });
//
//        user.save(function(err){
//            if (err){
//                next(err);
//            } else {
//                res.status(201).json( user );
//            }
//        });
//    }
//});
//
//
////PUT/:id updates whole object with all provided data providers
//app.put('/update/:id', function (req, res) {
//    if ( req.params.id !== null ){
//        User.
//        findById( req.params.id, function(err,user) {
//            if (err) {res.send(err);}
//            else {
//                user.name        = req.body.name;
//                user.hobby       = req.body.name;
//                user.interests   = req.body.interests;
//
//                user.save(req.params.id, function(err){
//                    if (err) {
//                        res.send(err);
//                    }
//                    else {
//                        res.json(user);
//                    }
//                });
//            }
//        });
//    };
//});
//
////PATCH does not work
//app.patch('/update/:id', function(req,res){
//    if (req.params.id !== null ){
//        User.
//        findByID (req.params.id , function (err, user){
//            if (err){res.send(err);
//            }
//            else {
//                res.json({message: " patch update completed "});
//            }
//        });
//    };
//});
//
//
////DELETE/:id delete the object specified by that id
//app.delete('/delete/:id', function (req, res) {
//    if (req.params.id !== null){
//        console.log('OOO>>>', req.params.id);
//
//        User.
//        findByIdAndRemove( req.params.id, function(err,user) {
//            if (err){
//                res.send(err);
//            } else {
//                res.json({ message: 'Record has been deleted.' });
//            }
//        });
//    }
//});


module.exports = app;