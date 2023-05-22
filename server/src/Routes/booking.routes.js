const router = require("express").Router();
const bookingController = require("../controllers/booking.controller");

router.post("/", bookingController.createTicket);

router.get("/:userId", bookingController.getUserTickets);

router.delete("/:id", bookingController.deleteTicket);

module.exports = router;
