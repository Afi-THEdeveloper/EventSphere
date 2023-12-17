const express = require('express')
const eventRouter = express.Router()
const eventController = require('../controllers/Event/EventController')
const eventAuth = require('../middlewares/EventAuthMiddleware')
const {uploadEventProfile,resizeEventProfile} = require('../middlewares/imgUploads')


eventRouter
    .post('/registerEvent', eventController.registerEvent)
    .post('/verifyEventOtp', eventController.verifyEventOtp)
    .post('/ResendOtp', eventController.ResendOtpEvent)
    .post('/verifyEventLogin', eventController.verifyEventLogin)
    .post('/updateEventProfile', eventAuth,uploadEventProfile, resizeEventProfile, eventController.updateEventProfile)


module.exports = eventRouter   





