const express = require('express')
const helmet = require('helmet')

const auth = require('./auth/main.auth')

const app = express()

app.use(helmet())

app.use('/auth', auth)

module.exports = app