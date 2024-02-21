const DeviceList = require("../Modals/DeviceList");

const getDevices = async (req, res) => {
  try {
    const devices = await DeviceList.find();
    res.json(devices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST route to add a new device
 const addDevice = async (req, res) => {
  try {
    const {deviceName,
    displayName,
    deviceCategory,
    deviceCategoryId,
    deviceStatus,
    dateOfPurchase,
    vendorName,
    vendorInfo,
    DeviceSpecs,
    warrantyInfo}=req.body;


    let currentSpecs = [];
    (JSON.parse(DeviceSpecs)).map((specs,index)=>{
      currentSpecs.push(specs.url);
    })

    let currentWarranty = [];
    (JSON.parse(warrantyInfo)).map((specs,index)=>{
      currentWarranty.push(specs.url);
    })

    const newDevice = new DeviceList({
      deviceName:deviceName,
      displayName:displayName,
      deviceCategory:deviceCategory,
      deviceCategoryId:deviceCategoryId,
      deviceStatus:deviceStatus,
      dateOfPurchase:dateOfPurchase,
      vendorName:vendorName,
      vendorInfo:vendorInfo,
      DeviceSpecs:currentSpecs,
      warrantyInfo:currentWarranty
    });

    
    const savedDevice = await newDevice.save();
    res.status(201).json(savedDevice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET route to retrieve a device by deviceId
const getSpecificDevice = async (req, res) => {
  try {
    const { deviceId } = req.params;
    const device = await DeviceList.findOne({ deviceId });

    if (!device) {
      return res.status(404).json({ error: 'Device not found' });
    }

    res.json(device);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE route to modify a device by deviceId
 const updateDevice = async (req, res) => {
  try {
    const { deviceId } = req.params;
    const updatedDevice = await DeviceList.findOneAndUpdate({ deviceId }, req.body, { new: true });

    if (!updatedDevice) {
      return res.status(404).json({ error: 'Device not found' });
    }

    res.json(updatedDevice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE route to remove a device by deviceId
 const deleteDevice = async (req, res) => {
  try {
    const { deviceId } = req.params;
    const deletedDevice = await DeviceList.findOneAndRemove({ deviceId });

    if (!deletedDevice) {
      return res.status(404).json({ error: 'Device not found' });
    }

    res.json(deletedDevice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports={getDevices,addDevice,getSpecificDevice,updateDevice,deleteDevice}