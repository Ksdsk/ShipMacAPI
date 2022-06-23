/**
 * Oui.js
 * Definition of the Oui model.
 */


// Imports
const mongoose = require("mongoose");

// Oui schema for the database.
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