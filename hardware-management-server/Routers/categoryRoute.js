const categoryController = require("../Controllers/categoryController");
const express = require("express");
const router = express.Router();

router.get('/',categoryController.getCategories);

router.post("/addCategory",categoryController.addCategory);

router.delete ('/:categoryId', categoryController.deleteSpecificCategory);

module.exports = router;