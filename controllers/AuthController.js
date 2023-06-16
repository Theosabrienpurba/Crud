const User = require('../models/user')
const bcyrpt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = (req, res, next) => {
    bcyrpt.hash(req.body.password, 10, function(err, hashedPass){
        if (err) {
            res.json({
                error: err
            })
        }

        let user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPass
        })
        user.save()
            .then(user => {
                res.json({
                    message: 'User Added Succes!'
                })
            })
            .catch(erorr => {
                res.json({
                    message: 'An error occured!'
                })
            })
    })
}

const login = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password

    User.findOne({$or: [{email:username},{password:username}]})
    .then(user => {
        if(user){
            bcrypt.compare(password, user.password, function(err, result) {
                if(err) {
                    res.json({
                        error: err
                    })
                    if(result){
                        let token = jwt.sign({name: user.name}, 'SecretValue', {expiresIn: '1h'})
                        res.json({
                            message: 'Login Success!',
                            token
                        })
                    }else{
                        res.json({
                            message: 'Password does not matched!'
                        })
                    }
                }
            })
        }else{
            res.json({
                message: 'User not found!'
            })
        }
    })
}
module.exports = {
    register, login
}
