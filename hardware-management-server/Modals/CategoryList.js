
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const categorySchema = new mongoose.Schema({
    categoryId: 
    { type: String, 
        default: uuidv4, 
        required: true, 
        unique: true 
    },
  categoryName: 
    { type: String,
     required: true,  
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    modified_at: {
        type: Date,
        default: Date.now,
    },
 
});

categorySchema.pre('save', function (next) {
    this.modified_at = new Date();
    next();
});

const CategoryList = mongoose.model('CategoryList', categorySchema);

module.exports = CategoryList;
