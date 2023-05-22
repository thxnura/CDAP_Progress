const Ticket = require("../models/ticket");

exports.createTicket = async (req, res) => {
  try {
    const ticket = new Ticket(req.body);
    const savedTicket = await ticket.save();
    if (savedTicket) {
      res.status(201).send({ message: "success!", data: savedTicket });
    } else {
      res.status(400).send({ message: "failed!", data: savedTicket });
    }
  } catch (e) {
    console.log("error", e);
    res.status(500).send({ message: "error", data: e });
  }
};

exports.getUserTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find(req.params);
    res.json(tickets);
  } catch (e) {
    console.log("error", e);
    res.status(500).send({ message: "error", data: e });
  }
};

exports.deleteTicket = async (req, res) => {
  try {
    const deleteTicket = await Ticket.findByIdAndRemove(req.params.id);
    res.json(deleteTicket);
  } catch (e) {
    console.log("error", e);
    res.status(500).send({ message: "error", data: e });
  }
};
