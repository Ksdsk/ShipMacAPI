const mongoose = require("mongoose");

const OUISchema = mongoose.Schema({
    oui: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Oui", OUISchema)