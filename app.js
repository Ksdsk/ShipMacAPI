const express = require("express");
const app = express();
const mongoose = require("mongoose");
require('dotenv/config');

// CORS
const cors = require("cors");
app.use(cors())

// middleware
app.use(express.json());

// import routes
const devicesRoute = require("./routes/devices");
app.use("/devices",devicesRoute);

const ouiLookupRoute = require("./routes/ouilookup");
app.use("/oui",ouiLookupRoute);

// routing
app.get("/", (req,res) => {
    res.send("HOME SWEET HOME");
})

// connect to db
mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log("CONNECTED TO DB!");
})

// How do we start listening to the server?
app.listen(process.env.PORT || 8080);