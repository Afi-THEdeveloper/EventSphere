const express = require('express')
const adminRouter = express.Router()
const adminController = require('../controllers/Admin/AdminController')

adminRouter.post('/verifyAdmin', adminController.verifyAdminLogin)
            .get('/getUsers', adminController.getUsers)
            .post('/blockUser', adminController.blockUser)


module.exports = adminRouter