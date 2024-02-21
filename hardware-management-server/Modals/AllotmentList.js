
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const allotmentSchema = new mongoose.Schema({
    allotmentId: 
    { type: String, 
        default: uuidv4, 
        required: true, 
        unique: true 
    },
    employeeId: 
    { type: String,
     required: true,  
    },
    allocated:{
        type:Boolean,
        default:false
    },
    deAllocated:{
        type:Boolean,
        default:false
    },
    deviceId: 
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

allotmentSchema.pre('save', function (next) {
    this.modified_at = new Date();
    next();
});

const AllotmentList = mongoose.model('AllotmentList', allotmentSchema);

module.exports = AllotmentList;
 