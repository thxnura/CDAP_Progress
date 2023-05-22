const router = require("express").Router();
const userController = require("../controllers/customer.controller");

router.post("/", userController.createCustomer);

router.get("/:id", userController.getCustomer);

router.get("/", userController.getAllCustomers);

router.delete("/:id", userController.deleteCustomer);

router.put("/:id", userController.updateCustomer);

module.exports = router;
