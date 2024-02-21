const requestController = require("../Controllers/requestController");
const express = require("express");
const router = express.Router();

router.get('/',requestController.getALLRequests);

router.post("/addDevice",requestController.addRequest);

router.get ('/:requestId', requestController.getSpecificRequest);

router.put('/:requestId',requestController.updateRequest);

router.delete('/:requestId',requestController.deleteRequest);

module.exports = router;