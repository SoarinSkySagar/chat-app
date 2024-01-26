const passport = require('./auth_routes/google.auth')
const googleRouter = require('./auth_routes/google.router');
const cookieSession = require('cookie-session')
const path = require('path')
const express = require('express')

const auth = express.Router()

require('dotenv').config()

const config = {
    COOKIE_KEY_1: process.env.COOKIE_KEY_1,
    COOKIE_KEY_2: process.env.COOKIE_KEY_2
}

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((obj, done) => {
    done(null, obj)
})

auth.use(cookieSession({
    name: 'session',
    maxAge: 1000 * 60 * 60 * 24,
    keys: [config.COOKIE_KEY_2, config.COOKIE_KEY_1]
}))

auth.use(passport.initialize())
auth.use(passport.session())

function checkLoggedIn(req, res, next) {
    console.log('current user is: ', req.user)
    const isLoggedIn = req.isAuthenticated() && req.user
    if (!isLoggedIn) {
        res.status(401).send('Not logged in!')
    }
    next()
}

auth.use('/google', googleRouter)
auth.get('/logout', (req, res) => {
    req.logOut()
    return res.redirect('/auth')
})

auth.get('/secret', checkLoggedIn, (req, res) => { 
    res.send('your secret value is: 69')
})

auth.get('/failure', (req, res) => {
    return res.send('Failed to authenticate..')
})

auth.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

module.exports = auth