const deviceController = require("../Controllers/deviceController");
const express = require("express");
const router = express.Router();

router.get('/',deviceController.getDevices);

router.post("/addDevice",deviceController.addDevice);

router.get ('/:deviceId', deviceController.getSpecificDevice);

router.put('/:deviceId',deviceController.updateDevice);

router.delete('/:deviceId',deviceController.deleteDevice);

module.exports = router;