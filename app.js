/**
 * app.js
 * Root of the API application.
 */

// Imports
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require('dotenv/config');

// CORS
const cors = require("cors");
app.use(cors())

// middleware
app.use(express.json());

// import device routes
const devicesRoute = require("./routes/devices");
app.use("/devices",devicesRoute);

// import oui routes
const ouiLookupRoute = require("./routes/ouilookup");
app.use("/oui",ouiLookupRoute);

// routing
app.get("/", (req,res) => {
    res.send("HOME SWEET HOME");
})

// connect to db
mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log("CONNECTED TO DB!");
}).catch(error => {
    console.log(error);
})

// Listen with Heroku's port or 8080
app.listen(process.env.PORT || 8080);