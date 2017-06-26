const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const handlebars = require('express-handlebars')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')
    // const BasicStrategy = require('passport-http').BasicStrategy

const items = require('./routes/items')
const groups = require('./routes/groups')
const users = require('./routes/users')
const auth = require('./routes/auth')

const User = require('./models/user')
    // passport.use(new BasicStrategy(function(username, password, callback) {
    //     User.find({ username: username }, function(erro, user) {
    //         if (error) {
    //             return callback(error)
    //         }
    //         if (!user) {
    //             return callback(null, false)
    //         }
    //         if (user.password != password) {
    //             return callback(null, false)
    //         }
    //         return callback(null, user)
    //     })
    // }))

const passportSetup = require('./config/passport')
passportSetup(passport)


// My local database:  run mongod
mongoose.connect('mongodb://localhost/MicahWaddoups')
    // Kaden's Database
    //mongoose.connect('mongodb://144.38.175.196/MicahWaddoups')
    // DJ's Database
    //mongoose.connect('mongodb://mongodb.cs.dixie.edu/MicahWaddoups')



app.engine('.hbs', handlebars({ defaultLayout: 'single', extname: '.hbs' }))
app.set('view engine', '.hbs')

app.get('/', function(req, res) {
    res.render('hello', {
        name: 'Micah',
        list: ['NodeJS', 'ReactJS', 'Mongo', 'Mongoose']
    }, (error, html) => {

    })
})


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cookieParser())

app.use(session({ secret: 'mysupersecretsesionkey' }))

app.use(passport.initialize())

app.use(passport.session())

app.use(auth)

// app.all('*', passport.authenticate('basic', { session: false }))


app.use('/', items)

app.use('/', groups)

app.use('/', users)




app.listen(3000, function() {
    console.log('BlunderList API listening on port 3000!');
})


// Code School: W4 D5 second half of day
// + Render login page
// + Create Google App
//   + client ID
//   + client secret
//   + callback URL
// + Passport Google
// + Add Fields to User model
// + Create:
//   + login routes
//   + callback URL