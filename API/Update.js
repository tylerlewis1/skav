const { json } = require('express');
const express = require('express');
const fs = require('fs');
const router = express.Router();


router.post("/", (req, res, next) =>{
    let currentdata = fs.readFileSync("D:/scavnger/v2/Back/API/teams.json");
    let parseddata = JSON.parse(currentdata);
    let data = {
        data: []
    };
    for(var i = 0; i < parseddata.data.length; i++){
        if(req.body.Team == parseddata.data[i].Teamname){       
            data.data.push({
                    "Found": parseddata.data[i].found,
                    "TMS": parseddata.data[i].tms,
                    "Done":  parseddata.data[i].done
                });
            }
        }
        
        let stringjson = JSON.stringify(data.data[0], null, 2);
        res.send(stringjson);
        data = {
            data: []
        };
       
});



module.exports = router;