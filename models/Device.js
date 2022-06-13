const mongoose = require("mongoose");

const DeviceSchema = mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date_added: {
        type: Date,
        default: Date.now
    },
    last_active: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Device", DeviceSchema)