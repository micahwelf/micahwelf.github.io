const express = require('express')
const router = express.Router()
const passport = require('passport')

const isLoggedIn = (req, res, next) => {
    //  if (req.isAuthenticated()) {
    if (req.user) {
        return next()
    } else {
        res.redirect('/login')
    }
}

router.get('/profile', isLoggedIn, (req, res) => {
    res.send('Logged in!!')
})

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/login')
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    })
    //  (req, res) => {
    //     res.send("Google Login")
    // }
)

router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/profile',
        failureRedirect: '/login'
    })
)

module.exports = router