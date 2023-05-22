const Customer = require("../models/customer");
const jwt_decode = require("jwt-decode");

exports.createCustomer = async (req, res) => {
  try {
    const customer = new Customer(req.body);
    const savedCustomer = await customer.save();
    if (savedCustomer) {
      res
        .status(201)
        .send({ message: "success customer!", data: savedCustomer });
    } else {
      res.status(400).send({ message: "failed!", data: savedCustomer });
    }
  } catch (e) {
    console.log("error", e);
    res.status(500).send({ message: "error", data: e });
  }
};

exports.getCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    res.json(customer);
  } catch (e) {
    console.log("error", e);
    res.status(500).send({ message: "error", data: e });
  }
};

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.json(customers);
  } catch (e) {
    console.log("error", e);
    res.status(500).send({ message: "error", data: e });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const deleteCustomer = await Customer.deleteOne(req.params);
    res.json(deleteCustomer);
  } catch (e) {
    console.log("error", e);
    res.status(500).send({ message: "error", data: e });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const data = req.body;
    if (data) {
      const updateCustomer = await Customer.updateOne(
        { _id: req.params.id },
        { ...data }
      );
      console.log("updated ", updateCustomer);
      res.status(200).send({ message: "success", data: updateCustomer });
    } else {
      res.status(204).send({ message: "update data can not be empty!" });
    }
  } catch (e) {
    console.log("error", e);
    res.status(500).send({ message: "error", data: e });
  }
};
