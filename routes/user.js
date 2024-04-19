const express = require('express')

//controller functions
const{getUser,userRegister, getAllUsers,userLogin}= require('../controllers/userController')

const router = express.Router()

//register route
router.post('/register' , userRegister)
//login route
router.post('/login', userLogin)
//get all users route
router.get('/', getAllUsers)
//get a specific user
router.get('/:username',getUser)

module.exports = router
