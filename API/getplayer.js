const { json } = require('express');
const express = require('express');
const fs = require('fs');
const router = express.Router();


router.post("/", (req, res, next) =>{
    let currentdata = fs.readFileSync("D:/scavnger/v2/Back/API/users.json");
    let parseddata = JSON.parse(currentdata);
    let data = {
        data: []
    };
    for(var i = 0; i < parseddata.data.length; i++){
        if(req.body.ID == parseddata.data[i].ID){       
            data.data.push({
                    "Name": parseddata.data[i].Name,
                    "Team":  parseddata.data[i].Team,
                    "ID":  parseddata.data[i].ID

                });
            }
        }
        if(!data.data[1]){
            data.data.push({
                "Name": "NOTFOUND"
            });
        }
        let stringjson = JSON.stringify(data.data[0], null, 2);
        res.send(stringjson);
        data = {
            data: []
        };
       
});



module.exports = router;