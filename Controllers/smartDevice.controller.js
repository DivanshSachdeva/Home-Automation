const mongoose = require('mongoose');


function addDevice(req,res){
    console.log('Post route')
}

function getDeviceDetails(req,res){
    console.log('get route')
}

function operateDevice(req,res){
    console.log('put route')
}

function removeDevice(req,res){
    console.log('delete route')
}

module.exports = {addDevice,getDeviceDetails,operateDevice,removeDevice}