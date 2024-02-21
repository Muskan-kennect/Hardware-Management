const express = require('express');
const router = express.Router();
const AllotmentList = require('../Modals/AllotmentList');
const DeviceList = require('../Modals/DeviceList');
const mongoose = require("mongoose");
const RequestList = require('../Modals/RequestList');

const getAllAllotment = async(req, res) => {
    try {
      const allAllotments = await AllotmentList.find();
      res.status(200).json(allAllotments);
    } catch (error) {
      console.error('Error fetching all allotments:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  
  // GET handler to get a specific allotment by allotmentId
const getSpecificAllotment = async(req, res) => {
    try {
      const { allotmentId } = req.params;
  
      const allotment = await AllotmentList.findOne({ allotmentId });
  
      if (!allotment) {
        return res.status(404).json({ message: 'Allotment not found' });
      }
  
      res.status(200).json(allotment);
    } catch (error) {
      console.error('Error fetching allotment by allotmentId:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  
// POST handler to create a new allotment
const addAllotment = async (req, res) => {
  try {
    const { employeeId, deviceId,allocated ,requestId} = req.body;

    // You can add more validation here if needed

    const newAllotment = new AllotmentList({
      employeeId,
      deviceId,
      allocated
      
    });

    if (!mongoose.Types.ObjectId.isValid(deviceId)) {
      return res.status(400).json({ message: 'Invalid deviceId' });
    }

    const updatedDevice = await DeviceList.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(deviceId) },
      { $set: { deviceStatus: 'allotted' } },
      { new: true }
    );
      

    // Check if the device was found and updated
    if (!updatedDevice) {
      return res.status(404).json({ message: 'Device not found' });
    }

    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      return res.status(400).json({ message: 'Invalid deviceId' });
    }

    const updatedRequest = await RequestList.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(requestId) },
      { $set: { requestStatus: 'allotted' } },
      { new: true }
    );
      

    // Check if the device was found and updated
    if (!updatedRequest) {
      return res.status(404).json({ message: 'Device not found' });
    }

    await newAllotment.save();

    res.status(201).json(newAllotment);
  } catch (error) {
    console.error('Error creating allotment:', error);
    res.status(500).send('Internal Server Error');
  }
};

// PUT handler to update an existing allotment by allotmentId
const updateAllotment = async (req, res) => {
  try {
    const { employeeId, deviceId } = req.body;
    const { allotmentId } = req.params;

    // You can add more validation here if needed

    const allotment = await AllotmentList.findOneAndUpdate(
      { allotmentId },
      { employeeId, deviceId, modified_at: new Date() },
      { new: true }
    );

    if (!allotment) {
      return res.status(404).json({ message: 'Allotment not found' });
    }

    res.status(200).json(allotment);
  } catch (error) {
    console.error('Error updating allotment:', error);
    res.status(500).send('Internal Server Error');
  }
};


const deleteAllotment = async (req, res) => {
  const { allotmentId, requestId } = req.params;

  try {
    // Find and update the allotment by allotmentId
    const updatedAllotment = await AllotmentList.findOneAndUpdate(
      { allotmentId },
      { allocated: false, deAllocated: true, modified_at: new Date() },
      { new: true } // Return the updated document
    );

    if (!updatedAllotment) {
      return res.status(404).json({ error: 'Allotment not found' });
    }

    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      return res.status(400).json({ message: 'Invalid requestId' });
    }

    // Update the request status in RequestList
    const updatedRequest = await RequestList.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(requestId) },
      { $set: { requestStatus: 'deAllocated' } },
      { new: true }
    );

    // Check if the request was found and updated
    if (!updatedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.json({ message: 'Allotment status updated successfully', updatedAllotment });
  } catch (error) {
    console.error('Error updating allotment status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {getAllAllotment,
  deleteAllotment,getSpecificAllotment,updateAllotment,addAllotment};
