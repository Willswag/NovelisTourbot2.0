#!/usr/bin/node

const express = require('express');
const rosEmitter = require('./ros-subscriber');

//initalize transmitted data 
var moveCmd ={};
//var lidarData = {};
var posData = {};
var logdata = {};

//when the emitter emits get the data
rosEmitter.cmd_velMsg.on('update',(moveCmdUpdate) =>{moveCmd=moveCmdUpdate;})
//rosEmitter.lidarMsg.on('update', (lidarDataUpdate) => {lidarData=lidarDataUpdate;})
rosEmitter.posMsg.on('update', (posDataUpdate) => {posData=posDataUpdate;})
//rosEmitter.roslogMsg.on('update',(logDataUpdate)=>{logdata=logDataUpdate;})

//start nodejs app
var app = express();


//http get page name and function
app.get('/cmd',function(req,res){ 
  res.send(JSON.stringify(moveCmd));
})

app.get('/pos', function (req, res) {
  res.end(JSON.stringify(posData))
})
//app.get('/log',function(req,res){
//  res.end(json.stringify(logData))
//})

var server = app.listen(8080, function () {
   var host = server.address().address 
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})


