//sequelize postgres

"use strict";

var express 	= require('express');
var fs 		    = require('fs');
var router 		= express.Router();
var path 		= require("path");
var app         = express();
var bodyParser  = require('body-parser');
app.use(bodyParser.json() );

//var data   = require( 'sequelizeFunctions.js' );  //does not work
//var sequelizeFunctions = require( 'sequelizeFunctions');


try {var uristring = require("./env/postgres.js").loginstring;
}
catch(err){
}

var data = data || {};

const Sequelize = require('sequelize');
//PATTERN    postgres://user:password@host:port/database
const methodOverride = require( 'method-override' );
const sequelize = new Sequelize(uristring);


//Model - offload to model file
const Employee = sequelize.define('Employee', {
    //_id: {
    //    type: Sequelize.STRING,
    //    primaryKey: true,
    //    autoIncrement: true
    //},
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    position: {
        type: Sequelize.STRING,
        allowNull: false
    }
});


sequelize.sync();

//should be offloaded to sequelizeFunctions.js
data.createAndSave = function(res, newEmployee) {
    if (!Object.keys(newEmployee).length) return res.sendStatus(400);
    console.log('createAndSave');
    Employee
        .create({
            // _id     : newEmployee._id,
            name    : newEmployee.name,
            position: newEmployee.position
        })
        .then(
            function(employee){
                res.json(employee);    ///send json object called employee
            })
        .catch(
            err => {
        res.sendStatus(400);
    console.log(err);
    });
};

//find all elements 2
data.findAllReturn = function(res){
    Employee.findAll({})
        .then(
            employees => {
            employees = employees.map(employee => employee.toJSON() ) //TODO: recode
            res.send(employees);
            })
        .catch(err => { res.sendStatus(400); console.log(err);});
};

//find named element 3
data.findOneReturn = function(res, requestID){
    console.log(requestID, ' is requestID');
    Employee.findOne({  where: { id : requestID} })
        .then( employee => {
            res.json(employee);
        })
        .catch(
            err => {
            res.send('Requested record not found.');
        });
};

//find and update named element 4
data.findPutReturn = function(res, requestID, modifiedEmployee){
    Employee.update(modifiedEmployee, { where: { id : requestID } })
        .then(
            () => data.findOneReturn(res, requestID)
        )
        .catch(
            err => {
            res.sendStatus(400);
        console.log(err);
        })
};

//data.findDeleteReturn 5
data.deleteAndReturn = function(res, requestID) {
    Employee.destroy({where: {id: requestID}})
        .then(
            numDeleted => res.sendStatus(200)
        )
        .catch(
            err => {
            res.sendStatus(400);
            console.log(err);
    });
};




//ROUTES
app.post('/api/', function(req, res, next){
    let newEmployee = req.body;
    console.log(newEmployee, ' >>>>>>>  is new ');
    data.createAndSave(res, newEmployee);
});

app.get('/api/', function(req, res){
    console.log('get all request');
    data.findAllReturn(res);
});

app.get('/api/:id', function(req, res){
    var requestID = req.params.id;
    console.log('getting one by ID: ', requestID);
    data.findOneReturn(res, requestID);
});

app.put('/api/:id', function (req, res){
    var requestID = req.params.id;
    var modifiedEmployee = req.body;
    console.log ('modifiedEmployee is ', modifiedEmployee);
    data.findPutReturn(res, requestID, modifiedEmployee);
});

app.delete('/api/:id', function(req,res){
    var requestID = req.params.id;
    data.deleteAndReturn(res, requestID);
});


module.exports = app;