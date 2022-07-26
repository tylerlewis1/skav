const express = require('express');
var cors = require('cors');
const players = require('./API/getplayer');
const location = require('./API/getlocations');
const update = require('./API/Update.js');
const check = require('./API/checklocation.js');
const sb = require('./API/Scoreboard.js');
var bodyParser = require('body-parser')
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/player', players);
app.use('/locations', location);
app.use('/update', update);
app.use('/check', check);
app.use('/sb', sb);
module.exports = app;