const express = require("express");
const app = express();
const mongoose = require("mongoose");
require('dotenv/config');


// middleware
app.use(express.json());

// import routes
const devicesRoute = require("./routes/devices");
app.use("/devices",devicesRoute);



// routing
app.get("/", (req,res) => {
    res.send("HOME SWEET HOME");
})

// connect to db
mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log("CONNECTED TO DB!");
})

// How do we start listening to the server?
app.listen(8080);