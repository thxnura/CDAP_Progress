const Movie = require("../models/movie");

exports.createMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    const savedMovie = await movie.save();
    if (savedMovie) {
      res.status(201).send({ message: "success!", data: savedMovie });
    } else {
      res.status(400).send({ message: "failed!", data: savedMovie });
    }
  } catch (e) {
    console.log("error", e);
    res.status(500).send({ message: "error", data: e });
  }
};

exports.getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.json(movie);
  } catch (e) {
    console.log("error", e);
    res.status(500).send({ message: "error", data: e });
  }
};

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.json(movies);
  } catch (e) {
    console.log("error", e);
    res.status(500).send({ message: "error", data: e });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const deleteMovie = await Movie.findByIdAndRemove(req.params.id);
    console.log("sada", req.params);
    res.json(deleteMovie);
  } catch (e) {
    console.log("error", e);
    res.status(500).send({ message: "error", data: e });
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const data = req.body;
    if (data) {
      const updateMovie = await Movie.updateOne(
        { _id: req.params.id },
        { ...data }
      );
      console.log("updated ", updateMovie);
      res.status(200).send({ message: "success", data: updateMovie });
    } else {
      res.status(204).send({ message: "update data can not be empty!" });
    }
  } catch (e) {
    console.log("error", e);
    res.status(500).send({ message: "error", data: e });
  }
};
