const express = require('express');
const passport = require('./google.auth'); // Use the google.auth.js module

const googleRouter = express.Router();

googleRouter.get('/', passport.authenticate('google', {
    scope: ['email'],
}));

googleRouter.get('/callback', passport.authenticate('google', {
    failureRedirect: '/failure',
    successRedirect: '/auth',
}), (req, res) => {
});

module.exports = googleRouter;
