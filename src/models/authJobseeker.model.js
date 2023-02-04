const db = require("../../helper/db.connect");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const authJobseekerModel = {
  login: ({ email, password }) => {
    console.log(email, password);
    return new Promise((success, failed) => {
      db.query(
        `SELECT * FROM jobseeker WHERE email=$1`,
        [email],
        (err, result) => {
          if (err) return failed(err.message);
          if (result.rows.length == 0) return failed("email/password salah");

          bcrypt.compare(password, result.rows[0].password, (err, res) => {
            if (err) return failed("email/password salah");
            if (!res) return failed("email/password salah");
            return success(result.rows[0]);
          });
        }
      );
    });
  },

  register: ({ fullname, email, phone_number }, password) => {
    return new Promise((success, failed) => {
      db.query(
        `INSERT INTO jobseeker (id, fullname, email, phone_number, password) VALUES ($1, $2, $3, $4, $5)`,
        [uuidv4(), fullname, email, phone_number, password],
        (err) => {
          if (err) return failed(err.message);
          return success("Successfully register account, please login!");
        }
      );
    });
  },
};

module.exports = authJobseekerModel;
