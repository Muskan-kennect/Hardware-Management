const mongoose = require('mongoose');
const dotenv = require("dotenv").config();

const connectToDatabase = async () => {
  try {
    const databaseUrl = process.env.MONGODB_URL;
    
    await mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true });

    console.log('Connected to MongoDB');
    return mongoose;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    throw error; 
  }
};

module.exports = connectToDatabase;
