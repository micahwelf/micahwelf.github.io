const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('./../models/user')

// Index
router.get('/users', function(req, res) {
    User.find({ deletedOn: null })
        .select('-password')
        .exec(function(error, users) {
            res.json(users)
        })
})

//Show
router.get('/users/:username', function(req, res) {
    User.find({ username: req.params.username }, function(error, user) {
        res.json(user)
    }).select("-password")
})

// Create
router.post('/users', function(req, res) {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
    })

    user.save(function(error, user) {
        if (error) {
            res.json(error)
        } else {
            res.status(201)
            res.json(user)
        }
    })
})

//Update
router.put('/users/:username', function(req, res) {
    User.findByIdAndUpdate(
        req.params.id, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: req.body.password,
            updatedOn: new Date(),
        }, { new: true, runValidators: true, },
        function(error, user) {
            res.json(user)
        })

})

//Destroy
router.delete('/users/:id', function(req, res) {
    User.findByIdAndUpdate(
        req.params.id, { deletedOn: new Date(), }, { new: true, runValidators: true },
        function(error, user) {
            res.json(user)
        })
})

module.exports = router