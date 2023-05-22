const router = require("express").Router();
const movieController = require("../controllers/movie.controller");

router.post("/", movieController.createMovie);

router.get("/:id", movieController.getMovie);

router.get("/", movieController.getAllMovies);

router.put("/:id", movieController.updateMovie);

router.delete("/:id", movieController.deleteMovie);

module.exports = router;
