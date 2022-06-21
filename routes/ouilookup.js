const express = require("express");
const router = express.Router();
const ouiS = require("../models/Oui");
const oui = require("oui");

// get OUI back from certain address
router.get("/:address", async (req,res) => {
    res.set('Access-Control-Allow-Origin', '*');

    try {
        const arr = req.params.address.split(",");
        const ouiArr = [];
        for (var i = 0; i < arr.length; i++) {
            
            sp = arr[i].replace(/\.|\:|\-/g,"|")
            temp = sp.split("|").join("").replace(" ", "");

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
        res.status(200).json(ouiArr);
    } catch(err) {
        res.status(400).json(err);
    }
})

module.exports = router;