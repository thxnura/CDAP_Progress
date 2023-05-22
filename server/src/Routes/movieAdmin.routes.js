const router = require("express").Router();
const adminController = require("../controllers/movieAdmin.controller");

router.post("/", adminController.createMovieAdmin);

router.get("/", adminController.getAllMovieAdmins);

router.delete("/:id", adminController.deleteMovieAdmin);

module.exports = router;
