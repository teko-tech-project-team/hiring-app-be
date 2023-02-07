//import eksternal
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_PRIVATE_KEY } = process.env;

//import internal
const authRecruiterModel = require("../models/authRecruiter.model");

const authController = {
  login: (req, res) => {
    return authRecruiterModel
      .login(req.body)
      .then((result) => {
        jwt.sign(
          { id: result.id, role: result.role },
          JWT_PRIVATE_KEY,
          { expiresIn: "1d" },
          (err, token) => {
            return res.status(201).send({
              message: "succes",
              data: {
                token,
                user: {
                  id: result.id,
                  name: result.name,
                  company_name: result.company_name,
                  email: result.email,
                  profile_image: result.image,
                },
              },
            });
          }
        );
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
  register: (req, res) => {
    //validasi: username dan password tidak boleh kosong dan jumlah kakarekter minimum
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      //store hash in your password DB
      if (err) {
        return res.status(500).send({ message: err.message });
      } else {
        const request = {
          name: req.body.name,
          email: req.body.email,
          company_name: req.body.company_name,
          sector: req.body.sector,
          password: hash,
          phone: req.body.phone,
        };
        return authRecruiterModel
          .register(request)
          .then((result) => {
            return res.status(201).send({ message: "succes", data: result });
          })
          .catch((error) => {
            return res.status(500).send({ message: error });
          });
      }
    });
  },
};

module.exports = authController;

//import internal
// const authModel = require('../models/auth.models')

// const authController = {
//     login: (req, res)=> {
//         return authModel.login(req.body)
//             .then((result)=> {
//                 return res.status(201).send({ message: "succes", data: {
//                     user: result,
//                     token: 'abc'
//                 }})
//             }).catch((error)=> {
//                 return res.status(500).send({ message: error })
//             })
//     },
//     register: (req, res)=> {
//         return authModel.register(req.body)
//             .then((result)=> {
//                 return res.status(201).send({ message: "succes", data: result })
//             }).catch((error)=> {
//                 return res.status(500).send({ message: error })
//             })
//     }

// }

// module.exports = authController;
