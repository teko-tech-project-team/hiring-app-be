//import eksternal
const express = require("express");
const router = express();

const recruiterRoute = require("./recruiter.route");
const authRecruiterRoute = require("./authRecruiter.route");
const jobseekerRoute = require("./jobseeker.route");
const authJobseekerRoute = require("./authJobseeker.route");
const orderRoute = require("./order.route");

// routing landing page
router.get("/", (req, res) => {
  return res.send("Backend successfully running at landing page");
});

// routing profile
router.use("/jobseeker", jobseekerRoute);

// routinng auth
router.use("/auth", authJobseekerRoute);

// routing recruiter
router.use("/recruiter", recruiterRoute);

router.use("/order", orderRoute);

//routing auth recruiter
router.use("/auth/recruiter", authRecruiterRoute);

module.exports = router;
