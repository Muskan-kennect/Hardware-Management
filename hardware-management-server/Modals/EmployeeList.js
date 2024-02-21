
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const employeeSchema = new mongoose.Schema({
    employeeId: 
    { type: String, 
        default: uuidv4, 
        required: true, 
        unique: true 
    },
    employeeName: 
    { type: String,
     required: true,  
    },
    employeeDept: 
    { type: String,
     required: true,  
    },
    employeeEmail :{
        type:String,
        unique:true,
        required:true,
    },
    employeePassword :{
        type:String,
        required:true,
    },
    isAdmin:{
        type : Boolean,
        default : 0
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

employeeSchema.pre('save', function (next) {
    this.modified_at = new Date();
    next();
});

const EmployeeList = mongoose.model('EmployeeList', employeeSchema);

module.exports = EmployeeList;
