const CategoryList = require("../Modals/CategoryList");

 const getCategories=async (req, res) => {
    try {
      const categories = await CategoryList.find();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
 const addCategory = async (req, res) => {
    try {           
      const { categoryName } = req.body;
  
      
      // Create a new CategoryList instance
      const newCategory = new CategoryList({ categoryName });
  
      // Save the new category to the database
      const savedCategory = await newCategory.save();
  
      // Respond with the saved category
      res.status(201).json(savedCategory);
    } catch (error) {
      // Handle errors
      res.status(500).json({ error: error.message });
    }
  };

 const deleteSpecificCategory = async (req, res) => {
    try {
      const { categoryId } = req.params;
  
      // Validate if categoryId is a valid UUID (optional, but recommended)
      const validUUID = /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-4[a-fA-F0-9]{3}-[89aAbB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}$/;
      if (!validUUID.test(categoryId)) {
        return res.status(400).json({ error: 'Invalid categoryId format' });
      }
  
      // Find and remove the category by categoryId
      const deletedCategory = await CategoryList.findOneAndRemove({ categoryId });
  
      if (!deletedCategory) {
        return res.status(404).json({ error: 'Category not found' });
      }
  
      res.json(deletedCategory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  module.exports={addCategory,deleteSpecificCategory,getCategories};
  