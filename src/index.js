import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import jwt from 'express-jwt'

import router from './routes.js'
import {
  unauthorized,
  notFound,
  serverError
} from './responses.js'

dotenv.config()

const app = express()

app.use(cors(
  {
    origin: '*',
    optionsSuccessStatus: 200
  }
))

app.use(bodyParser.json({}));

app.use(jwt({ secret: process.env.API_SECRET, algorithms: ['HS256'] }).unless({ path: ['/', '/token'] }))

app.use('/', router)


// 404 - Not found
app.use(function (req, res) {
  if (!res.headersSent) notFound(req, res)
});

// 500 - Global Error Handler
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') return unauthorized(req, res)
  if (!res.headersSent) serverError(err, req, res)
})

const server = app.listen(process.env.PORT, () => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`Listening at port ${process.env.PORT}`)
    console.log(`Environment ${process.env.NODE_ENV}`)
  }
})

export { app, server }