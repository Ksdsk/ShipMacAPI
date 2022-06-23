/**
 * Routes for /ouilookup requests
 */

// Imports
const express = require("express");
const router = express.Router();
const ouiS = require("../models/Oui");
const oui = require("oui");

/**
 * GET /ouilookup/:address
 * Used for looking up an OUI by address.
 */
router.get("/:address", async (req,res) => {
    res.set('Access-Control-Allow-Origin', '*');

    try {
        
        // split the addresses into an array
        const arr = req.params.address.split(",");

        // create an array to store the results
        const ouiArr = [];

        // loop through the array
        for (var i = 0; i < arr.length; i++) {
            
            // remove the separators
            sp = arr[i].replace(/\.|\:|\-/g,"|")
            temp = sp.split("|").join("").replace(" ", "");

            // get the OUI or replace with error messages
            if (temp.length != 6 && temp.length != 12) {
                
                const ouis = new ouiS({
                    address: arr[i],
                    oui: "Invalid input"
                });

                ouiArr.push(ouis);

            } else {

                const ouiT = await oui(arr[i]);

                if (ouiT != null) {

                    const ouis = new ouiS({
                        address: arr[i],
                        oui: ouiT
                    });
    
                    ouiArr.push(ouis);

                } else {

                    const ouis = new ouiS({
                        address: arr[i],
                        oui: "OUI does not exist"
                    });
    
                    ouiArr.push(ouis);

                }
            }
        }

        // send the results
        res.status(200).json(ouiArr);
    } catch(err) {
        res.status(400).json(err);
    }
})

module.exports = router;