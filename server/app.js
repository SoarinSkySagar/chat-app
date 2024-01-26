const express = require('express')
const helmet = require('helmet')

const auth = require('./auth/google.auth')

const app = express()

app.use(helmet())

app.use('/auth', auth)

module.exports = app