//import eksternal
const express = require('express')
const router = express()


// routing home
router.get('/', (req, res)=> {
    return res.send("Backend successfully running at home")
})

module.exports = router;