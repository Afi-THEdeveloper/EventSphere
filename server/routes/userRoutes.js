const express = require('express')
const userRouter = express.Router()
const userController = require('../controllers/User/userController')
const userAuth = require('../middlewares/UserAuthMiddleware')

userRouter.post('/register', userController.register)
    .post('/VerifyOtp', userController.VerifyOtp)
    .post('/Login', userController.loginUser)
    .post('/ResendOtp', userController.ResendOtp)


module.exports = userRouter