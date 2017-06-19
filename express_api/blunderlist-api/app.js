const express = require('express');
const app = express();
const items = require('./routes/items')
const groups = require('./routes/groups')

app.get('/', function (req, res) {
   // res.send ('Hello World');
   res.json ('Hello World');
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

app.listen(3000, function() {
   console.log('BlunderList API listening on port 3000!');
})