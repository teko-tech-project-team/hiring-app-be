// Imports
const express = require("express"); // Express Js
const router = express(); // Express Js
const authJobSeekerController = require("../controllers/auth-jobseeker.controller");
const formUpload = require("../../helper/formUpload");

router.post("/register-jobseeker", authJobSeekerController.register);
router.post("/login-jobseeker", authJobSeekerController.login);

module.exports = router;
