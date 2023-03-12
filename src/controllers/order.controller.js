//import internal
const e = require("express");
const orderModel = require("../models/order.model");

const orderController = {
  getRecruiter: (req, res) => {
    return orderModel
      .getRecruiter(req.params.id)
      .then((result) => {
        return res.status(200).send({ message: "succes", data: result });
      })
      .catch((error) => {
        return res.status(400).send({
          message: "failed",
          data: error,
        });
      });
  },
  getJobseeker: (req, res) => {
    return orderModel
      .getJobseeker(req.params.id)
      .then((result) => {
        return res.status(200).send({ message: "succes", data: result });
      })
      .catch((error) => {
        return res.status(400).send({
          message: "failed",
          data: error,
        });
      });
  },
  addOrder: (req, res) => {
    return orderModel
      .addOrder(req.body)
      .then((result) => {
        return res.status(201).send({
          message: "success",
          data: result,
        });
      })
      .catch((error) => {
        return res.status(400).send({
          message: "failed",
          data: error,
        });
      });
  },
  editStatus: (req, res) => {
    const request = {
      ...req.body,
      id: req.params.id,
    };
    return orderModel
      .editStatus(request)
      .then((result) => {
        return res.status(201).send({
          message: "success",
          data: result,
        });
      })
      .catch((err) => {
        return res.status(400).send({
          message: "failed",
          data: err,
        });
      });
  },
};

module.exports = orderController;
