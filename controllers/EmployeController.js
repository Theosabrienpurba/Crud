const { response } = require('express')
const Employee = require('../models/Employee')

//Show the list of Employee
const index = (req, res, next) => {
    Employee.find()
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: 'An error Occured!'
            })
        })
}

const show = (req, res, next) => {
    let employeeID = req.body.employeeID
    Employee.findById(employeeID)
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: 'An error Occured!'
            })
        })
}

const store = (req, res, next) => {
    let employee = new Employee({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age,
        avatar: req.body.avatar
    })
    // if( req.file){
    //     let path = ''
    //     req.files.forEach(function(files, index, arr){
    //         path = path + files.path + ','
    //     })
    //     path = path.substring(0, path.lastIndexOf(","))
    //     employee.avatar = path
    // }
    employee.save()
        .then(response => {
            res.json({
                message: 'added Succesfully!'
            })
        })
        .catch(error => {
            res.json({
                message: 'Error Occured',
                error,
            })
        })
}

const update = (req, res, next) => {
    let employeeID = req.body.employeeID

    let updateData = {
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age,
    }


    Employee.findByIdAndUpdate(employeeID, { $set: updateData })
        .then(() => {
            res.json({
                message: 'Update succes!'
            })
        })
        .catch(error => {
            res.json({
                message: 'An error Occured!'
            })
        })
}

// upload an employee
const upload = (req, res, next) => {
    let employeeID = req.body.employeeID
    Employee.upload(employeeID)
        .then(() => {
            res.json({
                message: 'upload succes!'
            })
        })
        .catch(error => {
            res.json({
                message: 'Error Occurud!'
            })
        })
}


// delete an employee
const destroy = (req, res, next) => {
    let employeeID = req.body.employeeID
    Employee.findOneAndRemove(employeeID)
        .then(() => {
            res.json({
                message: 'delete succes!'
            })
        })
        .catch(error => {
            res.json({
                message: 'Error Occurud!',
            })
        })
}

module.exports = {
    index,
    show,
    store, 
    update,
    destroy
}