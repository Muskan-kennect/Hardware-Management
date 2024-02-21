
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const deviceSchema = new mongoose.Schema({
    deviceId: 
    { type: String, 
        default: uuidv4, 
        required: true, 
        unique: true 
    },
    deviceName: 
    { type: String,
     required: true,  
    },
    displayName: 
    { type: String,
     required: true,  
    },
    deviceCategory: 
    { type: String,
     required: true,  
    },
    deviceCategoryId: 
    { type: String,
     required: true,  
    },
    deviceStatus: 
    { type: String,
     required: true,  
    },
    dateOfPurchase: 
    { type: String,
     required: true,  
    },
    vendorName: 
    { type: String,
     required: true,  
    },
    vendorInfo: 
    { type: String,
     required: true,  
    },
    DeviceSpecs: 
    { type: [],
      default: [] 
    },

    warrantyInfo: 
    { type: [String],
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

deviceSchema.pre('save', function (next) {
    this.modified_at = new Date();
    next();
});
 

const DeviceList = mongoose.model('DeviceList', deviceSchema);

module.exports = DeviceList;
