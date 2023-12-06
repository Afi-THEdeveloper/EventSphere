const express = require('express')
const userRouter = express.Router()

const userController = require('../controllers/User/userController')

userRouter.post('/register', userController.register)
userRouter.post('/VerifyOtp', userController.VerifyOtp)
userRouter.post('/Login', userController.loginUser)
userRouter.post('/ResendOtp', userController.ResendOtp)


module.exports = userRouter