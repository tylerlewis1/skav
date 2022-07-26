const { Console } = require('console');
const { json } = require('express');
const express = require('express');
const fs = require('fs');
const router = express.Router();


router.get("/", (req, res, next) =>{
    let currentdata = fs.readFileSync("D:/scavnger/v2/Back/API/teams.json");
    let parseddata = JSON.parse(currentdata);
    var highest = -5;
    var winninteam = [];
    let data = {
        data: []
    };
    for(var i = 0; i < parseddata.data.length; i++){   
        if(parseddata.data[i].found >= highest){
            highest = parseddata.data[i].found;
           
        }
    }
    for(var i = 0; i < parseddata.data.length; i++){   
        if(parseddata.data[i].found == highest){
            winninteam.push(parseddata.data[i].Teamname);
        }
    }
    data.data.push({
        "Teamname": ("1st plcae: " +  winninteam),
        "found":  highest

    });
    for(var i = 0; i < parseddata.data.length; i++){   
            data.data.push({
                    "Teamname": parseddata.data[i].Teamname,
                    "found":  parseddata.data[i].found,
                    "tms":  parseddata.data[i].tms

                });
        }
        let stringjson = JSON.stringify(data.data, null, 2);
        res.send(stringjson);
        winninteam = [];
        data = {
            data: []
        };
        return;
       
});



module.exports = router;