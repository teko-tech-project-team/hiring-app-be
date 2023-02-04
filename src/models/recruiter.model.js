
const db = require("../../helper/connection")
const { v4: uuidv4 } = require('uuid')

const recruiterModel = {

    getById: (id)=> {
        return new Promise((resolve, reject)=> {
            db.query(
                `SELECT * FROM tb_recruiter WHERE id='${id}'`,
                (err, result) => {
                    if (err) {
                    return reject(err.message)
                    } else {
                    return resolve(result.rows)
                    }
            });
        })
    },

    update: ({id, profile_image, name, company_name, sector, domicile, description, email, instagram, phone, linkedin})=> {
        return new Promise((resolve, reject)=> {
            db.query(`SELECT * FROM tb_recruiter WHERE id='${id}'`,(err, result)=>{
                if(err) {
                    return reject(err.message)
                }else {
                    db.query(
                        `UPDATE tb_recruiter SET profile_image='${profile_image || result.rows[0].profile_image}', name='${name || result.rows[0].name}', company_name='${company_name || result.rows[0].company_name}', sector='${sector || result.rows[0].sector}', domicile='${domicile || result.rows[0].domicile}', description='${description || result.rows[0].description}', email='${email || result.rows[0].email}', instagram='${instagram || result.rows[0].instagram}', phone='${phone || result.rows[0].phone}', linkedin='${linkedin || result.rows[0].linkedin}'  WHERE id='${id}'`,
                        (err, result) => {
                            if (err) {
                            return reject(err.message)
                            } else {
                            return resolve({id, profile_image, name, company_name, sector, domicile, description, email, instagram, phone, linkedin})
                            }
                        }
                    );
                }
            })
        })
    },
}

module.exports = recruiterModel;