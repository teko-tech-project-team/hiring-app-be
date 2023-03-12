// Imports
const express = require("express"); // Express Js
const router = express(); // Express Js
const jobseekerController = require("../controllers/jobseeker.controller");
const formUpload = require("../../helper/formUpload");

// Endpoint profile
router.get("/", jobseekerController.getAllJobseeker);
router.get("/:id", jobseekerController.getById);
router.patch(
  "/:id",
  formUpload.single("profile_image"),
  jobseekerController.edit
);

// Endpoint experience
router.get("/experience/all/:id", jobseekerController.getAllExperience);
router.post("/experience", jobseekerController.addExperience);
router.get("/experience/:id", jobseekerController.getExperience);
router.patch("/experience/:id", jobseekerController.editExperience);
router.delete("/experience/:id", jobseekerController.removeExperience);

// Endpoint portfolio
router.get("/portfolio/all/:id", jobseekerController.getAllPortfolio);
router.post(
  "/portfolio",
  formUpload.array("portfolio_image"),
  jobseekerController.addPortfolio
);
router.get("/portfolio/:id", jobseekerController.getPortfolio);
router.patch(
  "/portfolio/:id",
  formUpload.array("portfolio_image"),
  jobseekerController.editPortfolio
);
router.delete("/portfolio/:id", jobseekerController.removePortfolio);

module.exports = router;
