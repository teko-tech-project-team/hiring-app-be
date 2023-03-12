const db = require("../../helper/db.connect");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_PRIVATE_KEY } = process.env;

const authModel = {
  login: ({ email, password }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM tb_auth_recruiter WHERE email=$1`,
        [email],
        (err, result) => {
          //username = unique || email = unique
          if (err) return reject(err.message);
          // if(result.rowCount == 0) return reject('Kamu belum register')
          if (result.rows.length == 0)
            return reject("email/password is not correct");
          bcrypt.compare(
            password,
            result.rows[0].password,
            (err, hashingResult) => {
              if (err) return reject("email/password is not correct");
              if (!hashingResult)
                return reject("email/password is not correct");
              return resolve(result.rows[0]);
            }
          );
        }
      );
    });
  },

  register: ({ name, email, company_name, sector, phone, password }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO tb_auth_recruiter (id, name, email, company_name, sector, phone, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
        [uuidv4(), name, email, company_name, sector, phone, password],
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            // console.log(result.rows[0].id);
            db.query(
              `INSERT INTO tb_recruiter (id, name, email, company_name, sector, phone) VALUES ($1, $2, $3, $4, $5, $6)`,
              [result.rows[0].id, name, email, company_name, sector, phone],
              (error) => {
                if (error) {
                  return reject(error.message);
                } else {
                  return resolve("REGISTER SUCCESS");
                }
              }
            );
          }
        }
      );
    });
  },
};

module.exports = authModel;
