const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const BasicStrategy = require('passport-http').BasicStrategy

const items = require('./routes/items')
const groups = require('./routes/groups')
const users = require('./routes/users')

const User = require('./models/user')
passport.use(new BasicStrategy(function (username, password, callback) {
	User.find({ username: username }, function (erro, user) {
		if (error) {
			return callback(error)
		}
		if (!user) {
			return callback(null, false)
		}
		if (user.password != password) {
			return callback(null, false)
		}
		return callback(null, user)
	})
}))

// My local database:  run mongod
mongoose.connect('mongodb://localhost/MicahWaddoups')
// Kaden's Database
//mongoose.connect('mongodb://144.38.175.196/MicahWaddoups')
// DJ's Database
//mongoose.connect('mongodb://mongodb.cs.dixie.edu/MicahWaddoups')






app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(passport.initialize())
app.all('*', passport.authenticate('basic', { session: false }))


app.use('/', items)

app.use('/', groups)

app.use('/', users)




app.listen(3000, function () {
	console.log('BlunderList API listening on port 3000!');
})