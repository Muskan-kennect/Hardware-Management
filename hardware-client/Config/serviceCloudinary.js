// services/cloudinary.js

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dcrq3m6dx',
  api_key: '121866971488326',
  api_secret: 'FFNmV8H7NH3euKmH0wf1bFqfZjI',
});

module.exports = cloudinary;