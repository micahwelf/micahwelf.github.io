const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const items = require('./routes/items')
const groups = require('./routes/groups')


// My local database:  run mongod
mongoose.connect('mongodb://localhost/MicahWaddoups')
// Kaden's Database
//mongoose.connect('mongodb://144.38.175.196/MicahWaddoups')
// DJ's Database
//mongoose.connect('mongodb://mongodb.cs.dixie.edu/MicahWaddoups')





app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const myLogger(req, res, next){
	console.log('Logged a Request')
	console.log(req, res)
	// next()
	if (isUserAuthenticated) {
		next()
	} else {
		res.status(401)
		res.json("Unauthorized")
	}
}
app.use(myLogger)

// app.get('/', function (req, res) {
//    // res.send ('Hello World');
//    // res.json ('Hello World');
//    res.json (req.body);
// });
app.post('/', function (req, res) {
	// res.send ('Hello World');
	// res.json ('Hello World');
	res.json(req.body);
});

app.get('/hello/:id', function (req, res) {
	res.json('Hello, ' + req.params['id']);
})

// Example only: 
app.get('/groups/:id/items', function (req, res) {
	res.json('Items: ' + req.params['id']);
})

//  nesting:  requests made to everything in items.js are
//            made like:  suchandsuch.com/v1/items/:id  ...etc.
// app.use('/v1', items)

app.use('/', items)

app.use('/', groups)

app.listen(3000, function () {
	console.log('BlunderList API listening on port 3000!');
})