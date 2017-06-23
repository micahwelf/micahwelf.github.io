// const passport = require('passport')
const BasicStrategy = require('passport-http').BasicStrategy
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

const User = require('./../models/user')
const configAuth = require('./auth')

module.exports = function(passport) {

    passport.serializeUser(function(id, done) {
        done(null, user.id);
    })

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(error, user) {
            done(error, user)
        })
    })

    passport.use(new BasicStrategy(function(username, password, callback) {
        User.find({ username: username }, function(erro, user) {
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

    passport.use(new GoogleStrategy({
            clientID: configAuth.googleAuth.clientID,
            clientSecret: configAuth.googleAuth.clientSecret,
            callbackURL: configAuth.googleAuth.callbackURL,
        },
        function(token, refreshToken, profile, done) {
            User.findOne({
                    'google.id': profile.id
                },
                function(error, user) {
                    if (error) { return done(error) }
                    if (user) {
                        return done(null, user)
                    } else {
                        //   TODO:finish
                        const newUser = new User()

                        newUser.username = google.id + ''
                        newUser.password = token
                        newUser.google.id = profile.id
                        newUser.google.token = token
                        newUser.google.name = profile.displayName
                        newUser.google.email = profile.emails[0].value

                        newUser.save(function(error) {
                            if (error) {
                                throw error
                            }
                            return done(null, newUser)
                        })
                    }
                },
            )
        }))

}