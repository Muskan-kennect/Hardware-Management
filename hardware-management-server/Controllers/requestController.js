const RequestList = require("../Modals/RequestList");


const getALLRequests = async (req, res) => {
    try {
      const requests = await RequestList.find();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // POST route to add a new request
 const addRequest =  async (req, res) => {
    try {
      const newRequest = new RequestList(req.body);
      
      const savedRequest = await newRequest.save();
      res.status(201).json(savedRequest);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // GET route to retrieve a request by requestId
  const getSpecificRequest = async (req, res) => {
    try {
      const { requestId } = req.params;
      const request = await RequestList.findOne({ requestId });
  
      if (!request) {
        return res.status(404).json({ error: 'Request not found' });
      }
  
      res.json(request);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // UPDATE route to modify a request by requestId
 const updateRequest = async (req, res) => {
    try {
      const { requestId } = req.params;
      const updatedRequest = await RequestList.findOneAndUpdate({ requestId }, req.body, { new: true });
  
      if (!updatedRequest) {
        return res.status(404).json({ error: 'Request not found' });
      }
  
      res.json(updatedRequest);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // DELETE route to remove a request by requestId
  const deleteRequest =  async (req, res) => {
    try {
      const { requestId } = req.params;
      const deletedRequest = await RequestList.findOneAndRemove({ requestId });
  
      if (!deletedRequest) {
        return res.status(404).json({ error: 'Request not found' });
      }
  
      res.json(deletedRequest);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  module.exports={deleteRequest,updateRequest,getSpecificRequest,addRequest,getALLRequests}