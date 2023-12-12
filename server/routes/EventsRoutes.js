const express = require('express')
const eventRouter = express.Router()
const eventController = require('../controllers/Event/EventController')
const eventAuth = require('../middlewares/EventAuthMiddleware')


eventRouter
    .post('/registerEvent', eventController.registerEvent)
    .post('/verifyEventOtp', eventController.verifyEventOtp)
    .post('/ResendOtp', eventController.ResendOtpEvent)
    .post('/verifyEventLogin', eventController.verifyEventLogin)


module.exports = eventRouter   





