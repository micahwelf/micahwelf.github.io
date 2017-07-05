const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const handlebars = require('express-handlebars')

const contacts = require('./routes/contacts')

// Database Connect
mongoose.connect('mongodb://localhost/MyContacts', {
	useMongoClient: true
})

// Handlebars Middleware
app.engine('.hbs', handlebars({ defaultLayout: 'single', extname: '.hbs' }))
app.set('view engine', '.hbs')

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

// console.log Middleware
app.use( function (req,res,next){
	console.log(req.method + ' ' + req.path)
	next()
})


app.use(contacts)



app.get('/', (req,res) => {
	res.send('It works!')
})

app.get('/login', (req,res) => {
})

app.post('/login', (req,res) {
	if (req.body.username || ! req.body.password) {
		res.render('login', {
			message: "both fields are rquired"
		})
	} else {
		res.send('Loggin in...')
	}
})

app.listen(3002, function() {
	console.log('Listening on PORT 3002')
})
