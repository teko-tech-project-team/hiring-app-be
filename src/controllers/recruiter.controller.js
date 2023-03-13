//import internal
const recruiterModel = require("../models/recruiter.model");
const cloudinary = require("../../helper/cloudinary");

const recruiterController = {
  getById: (req, res) => {
    return recruiterModel.getById(req.params.id).then((result) => {
      return res.status(200).send({ message: "succes", data: result });
    });
  },

  update: async (req, res) => {
    const upload = req.file
      ? await cloudinary.uploader.upload(req.file.path, {
          folder: "hiring_app",
          format: "webp",
          public_id: `profile-${new Date().getTime()}`,
        })
      : undefined;
    const request = {
      ...req.body,
      profile_image: upload,
      id: req.params.id,
    };
    return recruiterModel
      .update(request)
      .then(async (result) => {
        const checkDefault = result.oldImage.includes("default");
        if (result.oldImage && !checkDefault) {
          await cloudinary.uploader.destroy(result.oldImage);
        }
        return res.status(201).send({ message: "succes", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
};

module.exports = recruiterController;
