const express = require('express')
const UserController = require('../controller/UserController')
const FrontendController = require('../controller/FrontendController')
const CourseController = require('../controller/CourseController')
const AdminController = require('../controller/admin/AdminController')
const router = express.Router()
const checkuserauth = require('../middleware/auth')

//route
//FrontendController
router.get('/', FrontendController.login)
router.get('/register', FrontendController.register)
router.get('/dashboard',checkuserauth, FrontendController.dashboard)
router.get('/about',checkuserauth, FrontendController.about)
router.get('/contact',checkuserauth, FrontendController.contact)
router.get('/profile',checkuserauth, FrontendController.profile)
router.get('/logout', FrontendController.logout)
router.post('/userinsert', FrontendController.userinsert)
router.post('/varifylogin', FrontendController.varifylogin)

//coursecontroller
router.post('/courseinsert',checkuserauth, CourseController.courseinsert)
router.get('/course/display',checkuserauth, CourseController.coursedisplay)
router.get('/courseview/:id',checkuserauth, CourseController.courseview)
router.get('/courseedit/:id',checkuserauth, CourseController.courseedit)
router.post('/courseupdate/:id',checkuserauth, CourseController.courseupdate)
router.get('/coursedelete/:id',checkuserauth, CourseController.coursedelete)

//admincontroller
router.get('/admin/dashboard',checkuserauth, AdminController.dashboard)


module.exports = router