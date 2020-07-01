const mongoose = require('mongoose');

let DeviceSchema = mongoose.Schema({
    deviceName: {
        type: String,
        require: true,
        trim: true,
        unique:true
    },
    brand: {
        type: String,
        require: true,
        trim: true
    },
    currentStatus: {
        type: String,
        require: true,
        trim: true
    },
    deviceLogs:[{
        message:{
            type: String,
            require: true,
            trim: true 
        },
        time:{
            type: Date, 
            default: Date.now
        },
        _id:false
    }]
}, { strict: false, timestamps: true });


module.exports = mongoose.model('smart_device', DeviceSchema);