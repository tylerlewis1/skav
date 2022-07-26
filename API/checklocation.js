const { json } = require('express');
const express = require('express');
const fs = require('fs');
const router = express.Router();


router.post("/", (req, res, next) =>{
    let currentdata = fs.readFileSync("D:/scavnger/v2/Back/API/teams.json");
    let locations = fs.readFileSync("D:/scavnger/v2/Back/API/locations.json");
    let parseddata = JSON.parse(currentdata);
    let locationdata = JSON.parse(locations);
    let data = {
        data: []
    };
    let newdata = {
        data: []
    };
    var wrote = -1;
    for(var i1 = 0; i1 < parseddata.data.length; i1++){
        if(req.body.Team == parseddata.data[i1].Teamname){   
            for(var i = 0; i < locationdata.Locations.length; i++){
                if((req.body.Lon <= (locationdata.Locations[i].Lon + 0.0002) && req.body.Lon >= (locationdata.Locations[i].Lon - 0.0002)) && (req.body.Lat <= (locationdata.Locations[i].Lat + 0.0002) && req.body.Lat >= (locationdata.Locations[i].Lat - 0.0002))){
                    var newloc = [];
                    newloc = (parseddata.data[i1].done);
                    if(!(parseddata.data[i1].done).includes(locationdata.Locations[i].ID)){
                        newloc.push(locationdata.Locations[i].ID);
                        
                    }else{
                        res.send("Done");
                        return;
                    }
                                        
                    //Fix muliti writing
                    newdata.data.push({
                        "Teamname" : parseddata.data[i1].Teamname,
                        "TeamID": parseddata.data[i1].TeamID,
                        "found": ((parseddata.data[i1].found) + 1),
                        "done": newloc,
                        "tms": parseddata.data[i1].tms
                    });
                    wrote = 2;
                }
                
            }
        }else{
            newdata.data.push(parseddata.data[i1]);
        }
        console.log(wrote);
         
       
    
    }
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
        let newdatastring = JSON.stringify(newdata, null, 2);
        if(wrote != -1){ 
            fs.writeFileSync("D:/scavnger/v2/Back/API/teams.json", newdatastring);
        }
        res.send(stringjson);
        data = {
            data: []
        };
        newdata = {
            data: []
        }
        newloc = [];
        wrote = -1;
});



module.exports = router;