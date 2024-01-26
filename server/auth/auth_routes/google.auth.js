const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');

require('dotenv').config();

const config = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
};

const AUTH_OPTIONS = {
    callbackURL: '/auth/google/callback',
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
};

function verifyCallback(accessToken, refreshToken, profile, done) {
    done(null, profile);
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

module.exports = passport;
