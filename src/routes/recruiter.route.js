//import eksternal
const express = require("express");
const router = express();
const formUpload = require("../../helper/formUpload");

//import controller internal
const recruiterController = require("../controllers/recruiter.controller");

// const formUpload = require('../../helper/formUpload')

//route recruiters
router.get("/:id", recruiterController.getById);
router.patch(
  "/:id",
  formUpload.single("profile_image"),
  recruiterController.update
);

//export
module.exports = router;
