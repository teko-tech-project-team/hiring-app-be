
//import internal
const recruiterModel = require('../models/recruiter.model')


const recruiterController = {
    getById: (req, res)=> {
        return recruiterModel.getById(req.params.id)
        .then((result) => {
            return res.status(200).send({ message: "succes", data: result })
        })
    },

    update: (req, res)=> {
        const request = {
            ...req.body,
            id: req.params.id,
        }
        return recruiterModel.update(request)
            .then((result)=> {
                return res.status(201).send({ message: "succes", data: result })              
            }).catch((error)=> {
                return res.status(500).send({ message: error })
            })
    },

    
}

module.exports = recruiterController;