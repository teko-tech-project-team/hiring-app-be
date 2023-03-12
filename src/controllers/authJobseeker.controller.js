const authJobseekerModel = require("../models/authJobseeker.model");
const bcrypt = require("bcrypt");
const { SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");
// const { Result } = require("express-validator");

const authJobSeekerController = {
  login: (req, res) => {
    // console.log(req.body);
    return authJobseekerModel
      .login(req.body)
      .then((result) => {
        jwt.sign(
          { id: result.id },
          SECRET_KEY,
          { expiresIn: "1d" },
          (err, token) => {
            return res.send({
              Message: "Successfully login!",
              data: {
                token,
                id: result.id,
                fullname: result.fullname,
                email: result.email,
                phone_number: result.phone_number,
                profile_image: result.profile_image,
              },
            });
          }
        );
      })
      .catch((error) => {
        return res.status(400).send({
          Message: "Success request to server!",
          data: error,
        });
      });
  },

  register: (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      } else {
        return authJobseekerModel
          .register(req.body, hash)
          .then((result) => {
            return res.status(201).send({
              Messsage: "Success request to server!",
              Data: result,
            });
          })
          .catch((error) => {
            return res.status(400).send({
              Message: "Success request to server!",
              Data: error,
            });
          });
      }
    });
  },
};

module.exports = authJobSeekerController;
