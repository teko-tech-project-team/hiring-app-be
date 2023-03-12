//import eksternal
const express = require('express')
const router = express()

//import controller and validation internal
const authRecruiterController = require('../controllers/authRecruiter.controller')

//route products
router.post('/login', authRecruiterController.login)
router.post('/register', authRecruiterController.register)

//export
module.exports = router;