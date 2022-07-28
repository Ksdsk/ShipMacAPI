/**
 * Routes for /device requests
 */

// Imports
const express = require("express");
const router = express.Router();
const Device = require("../models/Device");
const oui = require("oui");

/**
 * GET /devices
 * Used for getting all devices in the database.
 */
router.get("/", async (req,res) => {
    res.set('Access-Control-Allow-Origin', '*');
    try {

        const { exec } = require("child_process");
        
        exec("ls -la", (err, stdout, stderr) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(stdout);
        });




        const devices = await Device.find();
        res.json(devices);
    } catch(err) {
        res.json({
            message: err
        });
    }

});

/**
 * GET /devices/:deviceAddress
 * Used for getting a device by deviceAddress (MAC Address).
 */
router.get("/:deviceAddress", async (req,res) => {
    res.set('Access-Control-Allow-Origin', '*');
    try {
        const device = await Device.find({
            address: req.params.deviceAddress
        })
        res.json(device);
    } catch(err) {
        res.json(err);
    }
})

/**
 * DELETE /devices/:deviceAddress
 * Used for deleting a device by deviceAddress (MAC Address).
 */
router.delete("/:deviceAddress", async (req,res) => {
    res.set('Access-Control-Allow-Origin', '*');
    try {
        const device = await Device.deleteMany({
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


/**
 * POST /devices
 * Used for adding a device to the database.
 */
router.post("/", async (req,res) => {
    res.set('Access-Control-Allow-Origin', '*');

    // define the device
    const device = new Device({
        address: req.body.address,
        description: req.body.description,
        oui: oui(req.body.address) != null ? oui(req.body.address).split("\n")[0] : "Unregistered",
        oui_long: oui(req.body.address) != null ? oui(req.body.address) : "Unregistered OUI\n This MAC address does not have a registered OUI.\n Try checking your spelling!"
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

/**
 * PATCH /devices/:deviceAddress
 * Used for updating a device by deviceAddress (MAC Address).
 */
router.patch("/:deviceAddress", async (req,res) => {
    res.set('Access-Control-Allow-Origin', '*');
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