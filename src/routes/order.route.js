const express = require("express");
const router = express();

//import controller internal
const orderController = require("../controllers/order.controller");

// const formUpload = require('../../helper/formUpload')

//route recruiters
router.get("/recruiter/:id", orderController.getRecruiter);
router.get("/jobseeker/:id", orderController.getJobseeker);
router.post("/", orderController.addOrder);
router.patch("/:id", orderController.editStatus);

//export
module.exports = router;
