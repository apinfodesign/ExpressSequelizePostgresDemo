//DATA MANIPULATION
//create new element 1
//auto-increment true

"use strict";

var data = data || {};


sequelize.sync();



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

module.exports = 'data';