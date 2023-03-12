const db = require("../../helper/db.connect");
const { v4: uuidv4 } = require("uuid");

const orderModel = {
  getRecruiter: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM tb_order WHERE id_recruiter='${id}'`,
        (err, result) => {
          if (result.rows.length === 0) return reject("Id not found!");
          if (err) {
            return reject(err.message);
          } else {
            return resolve(result.rows);
          }
        }
      );
    });
  },
  getJobseeker: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM tb_order WHERE id_jobseeker='${id}'`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            if (result.rows.length === 0) return reject("Id not found!");
            return resolve(result.rows);
          }
        }
      );
    });
  },
  addOrder: ({
    id_recruiter,
    id_jobseeker,
    purpose,
    message,
    status,
    recruiter_name,
    jobseeker_name,
  }) => {
    return new Promise((success, failed) => {
      db.query(
        `INSERT INTO tb_order VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
        [
          uuidv4(),
          id_recruiter,
          id_jobseeker,
          purpose,
          message,
          status,
          recruiter_name,
          jobseeker_name,
        ],
        (error, result) => {
          if (error) return failed(error.message);
          return success("Berhasil mengirim pesan");
        }
      );
    });
  },
  editStatus: ({ id, status }) => {
    return new Promise((success, failed) => {
      db.query(`SELECT * FROM tb_order WHERE id=$1`, [id], (error, result) => {
        if (error) return failed(error.message);
        if (result.rows.length === 0) return failed("Id not found!");
        db.query(
          `UPDATE tb_order SET status=$1 WHERE id=$2`,
          [status, id],
          (err, res) => {
            if (err) return failed(err.message);
            return success("Berhasil mengubah status");
          }
        );
      });
    });
  },
};

module.exports = orderModel;
