//import eksternal
const express = require('express')
const router = express()

//import controller internal
const recruiterController = require('../controllers/recruiter.controller')

// const formUpload = require('../../helper/formUpload')

//route recruiters
router.get('/:id', recruiterController.getById)
router.patch('/:id', recruiterController.update)

//export
module.exports = router;