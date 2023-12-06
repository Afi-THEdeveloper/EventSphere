const express = require('express')
const adminRouter = express.Router()
const adminController = require('../controllers/Admin/AdminController')

adminRouter.post('/verifyAdmin', adminController.verifyAdminLogin)


module.exports = adminRouter