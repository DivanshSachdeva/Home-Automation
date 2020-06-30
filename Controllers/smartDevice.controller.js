
function addDevice(req,res){
    console.log('Post route')
    res.end();
}

function getDeviceDetails(req,res){
    console.log('get route')
    res.end();
}

function operateDevice(req,res){
    console.log('put route')
    res.end();
}

function removeDevice(req,res){
    console.log('delete route')
    console.log(req.query.deviceName);
    res.end();
}

module.exports = {addDevice,getDeviceDetails,operateDevice,removeDevice}