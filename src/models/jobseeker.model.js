// Imports
const db = require("../../helper/db.connect");
const { v4: uuidv4 } = require("uuid");

const jobseekerModel = {
  // Profile
  getById: (id) => {
    return new Promise((success, failed) => {
      db.query(
        `SELECT fullname,email,phone_number,profile_image, profession,job_time, description,domicile,instagram,github,gitlab,skills,json_agg(row_to_json(e)) experience FROM jobseeker INNER JOIN job_experience AS e ON e.id_jobseeker=$1 AND id=$1 GROUP BY id`,
        [id],
        (error, result) => {
          if (error) return failed("Id not found! Please check your id again!");
          if (result.rows.length === 0)
            return failed("Id not found! Please check your id again!");
          // return success(result.rows);
          db.query(
            `SELECT p.id_app,p.id_jobseeker,p.app_name,p.repository,json_agg(row_to_json(pi)) portfolio_image FROM portfolio AS p INNER JOIN portfolio_images AS pi ON id_jobseeker=$1 AND p.id_app=pi.id_app GROUP BY p.id_app`,
            [id],
            (err, res) => {
              if (err) return failed(err.message);
              return success({ ...result.rows[0], portfolio: res.rows });
            }
          );
        }
      );
    });
  },
  edit: ({
    id,
    fullname,
    profession,
    domicile,
    instagram,
    github,
    gitlab,
    description,
    profile_image,
    skills,
  }) => {
    console.log(profile_image);
    return new Promise((success, failed) => {
      db.query(`SELECT * FROM jobseeker WHERE id=$1`, [id], (error, result) => {
        if (error) return failed(error.message);
        if (result.rows.length === 0)
          return failed("Id not found! Please check your id again!");
        db.query(
          `UPDATE jobseeker SET fullname=$1,profession=$2,domicile=$3,instagram=$4,github=$5,gitlab=$6,description=$7,profile_image=$8,skills=$9 WHERE id=$10`,
          [
            fullname || result.rows[0].fullname,
            profession || result.rows[0].profession,
            domicile || result.rows[0].domicile,
            instagram || result.rows[0].instagram,
            github || result.rows[0].github,
            gitlab || result.rows[0].gitlab,
            description || result.rows[0].description,
            profile_image
              ? profile_image.filename
              : result.rows[0].profile_image,
            `{${
              skills
                ? [...result.rows[0].skills, skills]
                : result.rows[0].skills
            }}`,
            id,
          ],
          (err) => {
            if (err) return failed(err.message);
            return success("Succes update your profile");
          }
        );
      });
    });
  },
  // End Profile

  // Experience
  addExperience: ({
    id_jobseeker,
    company_name,
    position,
    date_in,
    date_out,
    job_description,
  }) => {
    return new Promise((success, failed) => {
      db.query(
        `INSERT INTO job_experience VALUES ($1,$2,$3,$4,$5,$6,$7)`,
        [
          uuidv4(),
          id_jobseeker,
          company_name,
          position,
          date_in,
          date_out,
          job_description,
        ],
        (error) => {
          if (error) return failed(error.message);
          return success("Successfully added to database!");
        }
      );
    });
  },
  getAllExperience: (id) => {
    return new Promise((success, failed) => {
      db.query(
        `SELECT * FROM job_experience WHERE id_jobseeker=$1`,
        [id],
        (error, result) => {
          if (error) return failed(error.message);
          if (result.rows.length === 0)
            return failed("Id not found! Please check your id again!");
          return success(result.rows);
        }
      );
    });
  },
  getExperience: (id) => {
    return new Promise((success, failed) => {
      db.query(
        `SELECT * FROM job_experience WHERE id_job=$1`,
        [id],
        (error, result) => {
          if (error) return failed(error.message);
          if (result.rows.length === 0)
            return failed("Id not found! Please check your id again!");
          return success(result.rows);
        }
      );
    });
  },
  editExperience: ({
    id,
    company_name,
    position,
    date_in,
    date_out,
    job_description,
  }) => {
    return new Promise((success, failed) => {
      db.query(
        `SELECT * FROM job_experience WHERE id_job=$1`,
        [id],
        (error, result) => {
          if (error) return failed(error.message);
          if (result.rows.length === 0)
            return failed("Id not found! Please check your id again!");
          db.query(
            `UPDATE job_experience SET company_name=$1,position=$2,date_in=$3,date_out=$4,job_description=$5 WHERE id_job=$6`,
            [
              company_name || result.rows[0].company_name,
              position || result.rows[0].position,
              date_in || result.rows[0].date_in,
              date_out || result.rows[0].date_out,
              job_description || result.rows[0].job_description,
              id,
            ],
            (err) => {
              if (err) return failed(err.message);
              return success("Success update your profile");
            }
          );
        }
      );
    });
  },
  removeExperience: (id) => {
    return new Promise((success, failed) => {
      db.query(`DELETE FROM job_experience WHERE id_job=$1`, [id], (error) => {
        if (error) return failed(error.message);
        return success("Success delete experience!");
      });
    });
  },
  // End Experience

  // Portfolio
  addPortfolio: ({ id_jobseeker, app_name, repository, portfolio_image }) => {
    return new Promise((success, failed) => {
      db.query(
        `INSERT INTO portfolio VALUES ($1,$2,$3,$4) RETURNING id_app`,
        [uuidv4(), id_jobseeker, app_name, repository],
        (error, result) => {
          if (error) return failed(error.message);
          for (let i = 0; i < portfolio_image.length; i++) {
            db.query(
              `INSERT INTO portfolio_images VALUES ($1,$2,$3,$4)`,
              [
                uuidv4(),
                result.rows[0].id_app,
                app_name,
                portfolio_image[i].filename,
              ],
              (err) => {
                if (err) return failed(err.message);
                return success("Successfully add portfolio!");
              }
            );
          }
        }
      );
    });
  },
  getAllPortfolio: (id) => {
    return new Promise((success, failed) => {
      db.query(
        `SELECT p.app_name,p.repository,json_agg(json_build_object('alt', pi.name, 'filename', pi.filename)) portfolio_image FROM portfolio AS p INNER JOIN portfolio_images AS pi ON p.id_jobseeker=$1 AND p.id_app=pi.id_app GROUP BY p.id_app`,
        [id],
        (error, result) => {
          if (error) return failed(error.message);
          if (result.rows.length === 0) return failed("Portfolio not found");
          return success(result.rows);
        }
      );
    });
  },
  getPortfolio: (id) => {
    return new Promise((success, failed) => {
      db.query(
        `SELECT p.app_name,p.repository,json_agg(json_build_object('alt', pi.name, 'filename', pi.filename)) portfolio_image FROM portfolio AS p INNER JOIN portfolio_images AS pi ON p.id_app=$1 AND p.id_app=pi.id_app GROUP BY p.id_app`,
        [id],
        (error, result) => {
          if (error) return failed(error.message);
          if (result.rows.length === 0) return failed("Id not found!");
          return success(result.rows);
        }
      );
    });
  },
  editPortfolio: ({ id, app_name, repository, portfolio_image }) => {
    return new Promise((success, failed) => {
      db.query(
        `SELECT * FROM portfolio WHERE id_app=$1`,
        [id],
        (error, result) => {
          if (error) return failed(error.message);
          if (result.rows.length === 0)
            return failed("Id not found! Please check your id again!");
          db.query(
            `UPDATE portfolio SET app_name=$1,repository=$2 WHERE id_app=$3`,
            [
              app_name || result.rows[0].app_name,
              repository || result.rows[0].repository,
              id,
            ],
            (err) => {
              if (err) return failed(err.message);
              if (portfolio_image.length === 0)
                return success(`Success update ${result.rows[0].app_name}`);
              db.query(
                `SELECT * FROM portfolio_images WHERE id_app=$1`,
                [id],
                (errorImage, resultImage) => {
                  if (errorImage) return failed(errorImage.message);
                  for (let i = 0; i < portfolio_image.length; i++) {
                    if (i >= resultImage.rows.length) {
                      db.query(
                        `INSERT INTO portfolio_images VALUES ($1,$2,$3,$4)`,
                        [
                          uuidv4(),
                          id,
                          app_name || result.rows[0].app_name,
                          portfolio_image[i].filename,
                        ],
                        (errorAdd) => {
                          if (errorAdd) return failed("INI ITU");
                          // return success({
                          //   app_name: result.rows[0].app_name,
                          //   oldImages: resultImage.rows,
                          // });
                        }
                      );
                    } else {
                      db.query(
                        `UPDATE portfolio_images SET name=$1,filename=$2 WHERE id_image=$3`,
                        [
                          app_name || result.rows[0].app_name,
                          portfolio_image[i].filename,
                          resultImage.rows[i].id_image,
                        ],
                        (errUpdate) => {
                          if (err) return failed("ITU INI");
                        }
                      );
                    }
                  }
                  return success({
                    app_name: result.rows[0].app_name,
                    oldImages: resultImage.rows,
                  });
                }
              );
            }
          );
        }
      );
    });
  },
  removePortfolio: (id) => {
    return new Promise((success, failed) => {
      db.query(
        `DELETE FROM portfolio WHERE id_app=$1 RETURNING app_name`,
        [id],
        (error, result) => {
          if (error) return failed(error.message);
          db.query(
            `DELETE FROM portfolio_images WHERE id_app=$1 RETURNING filename`,
            [id],
            (err, res) => {
              if (err) return failed("Failed to delete image!");
              if (res.rows.length === 0) return failed("Id not found!");
              return success({
                portfolio_image: res.rows,
                app_name: result.rows[0].app_name,
              });
            }
          );
        }
      );
    });
  },
  // toArrayQuery: (array) => {
  //   if (array != undefined && array.length > 1) {
  //     let newArray = [];
  //     for (let i = 0; i < array.length; i++) {
  //       newArray.push(`${array[i]}`);
  //     }
  //     const result = `{ ${
  //       newArray.length == 1 ? newArray : newArray.join(",")
  //     } }`;
  //     return result;
  //   } else if (array != undefined && array.length == 1) {
  //     const result = `{ ${newArray} }`;
  //     return result;
  //   } else {
  //     return;
  //   }
  // },
  // End Portfolio
};

module.exports = jobseekerModel;
