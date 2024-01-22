const express = require('express')
const {AdminSignUp, AdminLogin} = require('../Controller/AdminController')
const AdminrRouter = express.Router()


AdminrRouter.post('/adminsignup', AdminSignUp)
AdminrRouter.post('/adminlogin', AdminLogin)

module.exports = AdminrRouter
