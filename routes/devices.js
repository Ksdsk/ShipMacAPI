const express = require("express");
const router = express.Router();
const Device = require("../models/Device");

// get back all the devices 
router.get("/", async (req,res) => {
    try {
        const devices = await Device.find();
        res.json(devices);
    } catch(err) {
        res.json({
            message: err
        });
    }

});

// get a certain device
router.get("/:deviceAddress", async (req,res) => {
    try {
        const device = await Device.find({
            address: req.params.deviceAddress
        })
        res.json(device);
    } catch(err) {
        res.json(err);
    }
})

// delete a certain device
router.delete("/:deviceAddress", async (req,res) => {
    try {
        const device = await Device.remove({
            address: req.params.deviceAddress
        })
        res.json({
            message: "The device has been removed successfully!"
        });
    } catch(err) {
        res.json({
            message: err
        });
    }
})


// posts a device
router.post("/", async (req,res) => {
    const device = new Device({
        address: req.body.address,
        description: req.body.description
    });

    try {
        const savedDevice = await device.save();
        res.json(savedDevice);
    } catch(err) {
        res.json({
            message: err
        });
    }

});

// update a device
router.patch("/:deviceAddress", async (req,res) => {
    try {
        const device = await Device.updateOne(
            { address: req.params.deviceAddress },
            { $set: {address: req.body.address, description: req.body.description}}
        );
        res.json("Updated device!");
    } catch(err) {
        res.json({
            message: err
        });
    }
})

module.exports = router;