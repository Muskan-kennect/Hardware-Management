const allotmentController = require("../Controllers/allotmentController");
const express = require("express");
const router = express.Router();

router.get('/',allotmentController.getAllAllotment);

router.post("/addDevice",allotmentController.addAllotment);

router.get ('/:allotmentId', allotmentController.getSpecificAllotment);

router.put('/:allotmentId',allotmentController.updateAllotment);

router.put("/deAllocate/:allotmentId",allotmentController.deleteAllotment)

module.exports = router;