const MovieAdmin = require("../models/movieAdmin");

exports.createMovieAdmin = async (req, res) => {
  try {
    const movieAdmin = new MovieAdmin(req.body);
    const newMovieAdmin = await movieAdmin.save();
    if (newMovieAdmin) {
      res.status(201).send({ message: "success!", data: newMovieAdmin });
    } else {
      res.status(400).send({ message: "failed!", data: newMovieAdmin });
    }
  } catch (e) {
    console.log("error", e);
    res.status(500).send({ message: "error", data: e });
  }
};

exports.getAllMovieAdmins = async (req, res) => {
  try {
    const movieAdmins = await MovieAdmin.find({});
    res.json(movieAdmins);
  } catch (e) {
    console.log("error", e);
    res.status(500).send({ message: "error", data: e });
  }
};

exports.deleteMovieAdmin = async (req, res) => {
  try {
    const deleteMovieAdmin = await MovieAdmin.findByIdAndRemove(req.params.id);
    res.json(deleteMovieAdmin);
  } catch (e) {
    console.log("error", e);
    res.status(500).send({ message: "error", data: e });
  }
};
