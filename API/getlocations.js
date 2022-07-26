const { Console } = require('console');
const { json } = require('express');
const express = require('express');
const fs = require('fs');
const router = express.Router();


router.get("/", (req, res, next) =>{
    let currentdata = fs.readFileSync("D:/scavnger/v2/Back/API/locations.json");
    let parseddata = JSON.parse(currentdata);
    let data = {
        data: []
    };
    for(var i = 0; i < parseddata.Locations.length; i++){ 
            data.data.push({
                    "Name": parseddata.Locations[i].Name,
                    "Photo":  parseddata.Locations[i].photo,
                    "ID":  parseddata.Locations[i].ID

                });
        }
        let stringjson = JSON.stringify(data.data, null, 2);
        res.send(stringjson);
        data = {
            data: []
        };
        return;
       
});



module.exports = router;