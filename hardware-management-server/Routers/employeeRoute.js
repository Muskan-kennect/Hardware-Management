const employeeController = require("../Controllers/employeeController");
const express = require("express");
const router = express.Router();

router.get('/',employeeController.getEmployees);

router.post("/login",employeeController.login);

router.post("/addEmployee",employeeController.addEmployee);

router.delete ('/:employeeId', employeeController.deleteEmployee);

module.exports = router;