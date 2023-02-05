// Imports
const jobseekerModel = require("../models/jobseeker.model");

const jobseekerController = {
  // Profile
  getById: (req, res) => {
    return jobseekerModel
      .getById(req.params.id)
      .then((result) => {
        return res.status(200).send({
          Message: "Success request to server! fetch successfully!",
          Data: result,
        });
      })
      .catch((error) => {
        return res.status(400).send({
          Message: "Succes request to server! fetch failed!",
          Error: error,
          Data: [],
        });
      });
  },
  edit: (req, res) => {
    const request = {
      ...req.body,
      profile_image: req.file,
      id: req.params.id,
    };
    return jobseekerModel
      .edit(request)
      .then((result) => {
        res.status(200).send({
          Message: "Success request to server! update successfully!",
          Data: result,
        });
      })
      .catch((error) => {
        res.status(400).send({
          Message: "Succes request to server! failed update!",
          Data: error,
        });
      });
  },
  // End Profile

  // Experience
  addExperience: (req, res) => {
    return jobseekerModel
      .addExperience(req.body)
      .then((result) => {
        return res.status(200).send({
          Message: "Success request to server!",
          Data: result,
        });
      })
      .catch((error) => {
        return res.status(400).send({
          Message: "Succes request to server! failed add data!",
          Data: error,
        });
      });
  },
  getAllExperience: (req, res) => {
    return jobseekerModel.getAllExperience(req.params.id).then((result) => {
      return res.status(200).send({
        Message: "Success request to server! fetch successfully!",
        Data: result,
      });
    });
  },
  getExperience: (req, res) => {
    return jobseekerModel
      .getExperience(req.params.id)
      .then((result) => {
        return res.status(200).send({
          Message: "Success request to server! fetch successfully!",
          Data: result,
        });
      })
      .catch((error) => {
        return res.status(400).send({
          Message: "Succes request to server! fetch failed!",
          Error: error,
          Data: [],
        });
      });
  },
  editExperience: (req, res) => {
    const request = {
      ...req.body,
      id: req.params.id,
    };
    return jobseekerModel
      .editExperience(request)
      .then((result) => {
        return res.status(200).send({
          Message: "Success request to server! update successfully!",
          Data: result,
        });
      })
      .catch((error) => {
        res.status(400).send({
          Message: "Succes request to server! failed update!",
          Data: error,
        });
      });
  },
  removeExperience: (req, res) => {
    return jobseekerModel
      .removeExperience(req.params.id)
      .then((result) => {
        res.status(200).send({
          Message: "Success request to server!",
          Data: result,
        });
      })
      .catch((error) => {
        res.status(400).send({
          Message: "Success request to server!",
          Data: error,
        });
      });
  },
  // End Experience

  // Portfolio
  addPortfolio: (req, res) => {
    const request = {
      ...req.body,
      portfolio_image: req.files,
    };
    return jobseekerModel
      .addPortfolio(request)
      .then((result) => {
        res.status(200).send({
          Message: "Success request to server!",
          Data: result,
        });
      })
      .catch((error) => {
        return res.status(400).send({
          Message: "Succes request to server! failed add data!",
          Data: error,
        });
      });
  },
  getAllPortfolio: (req, res) => {
    return jobseekerModel
      .getAllPortfolio(req.params.id)
      .then((result) => {
        return res.status(200).send({
          Message: "Success request to server!",
          Data: result,
        });
      })
      .catch((error) => {
        return res.status(400).send({
          Message: "Succes request to server! fetch failed!",
          Error: error,
          Data: [],
        });
      });
  },
  getPortfolio: (req, res) => {
    return jobseekerModel
      .getPortfolio(req.params.id)
      .then((result) => {
        return res.status(200).send({
          Message: "Success request to server!",
          Data: result,
        });
      })
      .catch((error) => {
        return res.status(400).send({
          Message: "Succes request to server! fetch failed!",
          Error: error,
          Data: [],
        });
      });
  },
  editPortfolio: (req, res) => {
    const request = {
      ...req.body,
      portfolio_image: req.files,
      id: req.params.id,
    };
    return jobseekerModel
      .editPortfolio(request)
      .then((result) => {
        if (typeof result.oldImages != "undefined") {
          for (let i = 0; i < result.oldImages.length; i++) {
            unlink(
              `public/uploads/images/${result.oldImages[i].filename}`,
              (err) => {
                if (err) throw err;
              }
            );
          }
          return res.status(200).send({
            Message: "Success request to server! update successfully!",
            Data: `Success update ${result.app_name}`,
          });
        }
        return res.status(200).send({
          Message: "Success request to server! update successfully!",
          Data: result,
        });
      })
      .catch((error) => {
        return res.status(400).send({
          Message: "Success request to server! failed update!",
          Data: error,
        });
      });
  },
  removePortfolio: (req, res) => {
    return jobseekerModel
      .removePortfolio(req.params.id)
      .then((result) => {
        for (let i = 0; i < result.portfolio_image.length; i++) {
          unlink(
            `public/uploads/images/${result.portfolio_image[i].filename}`,
            (err) => {
              if (err) throw err;
            }
          );
        }
        return res.status(200).send({
          Message: "Success request to server! success to delete!",
          Data: `Success deleted ${result.app_name}`,
        });
      })
      .catch((error) => {
        return res.status(400).send({
          Message: "Success request to server!",
          Data: error,
        });
      });
  },
  // End Portfolio
};

module.exports = jobseekerController;
