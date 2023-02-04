//import eksternal
const express = require('express')
const router = express()

const recruiterRoute = require('./recruiter.route')
const authRecruiterRoute = require('./authRecruiter.route')

// routing landing page
router.get('/', (req, res)=> {
    return res.send("Backend successfully running at landing page")
})

// routing recruiter
router.use('/recruiter', recruiterRoute)

//routing auth recruiter
router.use('/auth/recruiter', authRecruiterRoute)

module.exports = router;