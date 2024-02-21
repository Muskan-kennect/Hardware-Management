
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const requestSchema = new mongoose.Schema({
    requestId: 
    { type: String, 
        default: uuidv4, 
        required: true, 
        unique: true 
    },
    deviceName: 
    { type: String,
     required: true,  
    },
    deviceCategory:{
        type:String,
        required:true,
    },

    raisedById: 
    { type: String,
     required: true,  
    },
    raisedByName: 
    { type: String,
     required: true,  
    },
    raisedByDept: 
    { type: String,
     required: true,  
    },
    requestStatus:
    //scrap available allocated temporary 
    { type: String,
     required: true,  
    },
    requestType: 
    //repari new temporary
    { type: String,
     required: true,  
    },
    requestInfo: 
    { type: String,
     required: true,  
    },
    requestedOn:{
        type:String,
        default:Date.now
    },
    requestUpdatedBy:{
        type:String,
        default:Date.now
    },
    requestSpecs: 
    { type: [String],
      default: [] 
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

requestSchema.pre('save', function (next) {
    this.requestUpdatedBy = new Date();
    next();
});
const RequestList = mongoose.model('RequestList', requestSchema);

module.exports = RequestList;
