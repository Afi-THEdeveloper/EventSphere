const express = require('express')
const eventRouter = express.Router()
const eventController = require('../controllers/Event/EventController')
const eventAuth = require('../middlewares/EventAuthMiddleware')
const {uploadEventProfile,resizeEventProfile,uploadEventPost,resizeEventPost} = require('../middlewares/imgUploads')


eventRouter
    .post('/registerEvent', eventController.registerEvent)
    .post('/verifyEventOtp', eventController.verifyEventOtp)
    .post('/ResendOtp', eventController.ResendOtpEvent)
    .post('/verifyEventLogin', eventController.verifyEventLogin)
    .post('/updateEvent', eventAuth, eventController.updateEvent)
    .post('/updateEventProfile', eventAuth,uploadEventProfile, resizeEventProfile, eventController.updateEventProfile)
    .post('/addPost', eventAuth, uploadEventPost, resizeEventPost, eventController.addPost)
    .post('/deletePost', eventAuth, eventController.deletePost)
module.exports = eventRouter   





