const express = require('express')
const adminRouter = express.Router()
const adminController = require('../controllers/Admin/AdminController')

adminRouter.post('/verifyAdmin', adminController.verifyAdminLogin)
            .get('/getUsers', adminController.getUsers)
            .post('/blockUser', adminController.blockUser)
            .get('/getPlans', adminController.getPlans)
            .post('/blockPlan', adminController.blockPlan)
            .post('/addPlan', adminController.addPlan)
            .post('/editPlan', adminController.editPlan)


module.exports = adminRouter