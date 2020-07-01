var model = require('../Models/device_Model.js');

async function addDevice(req, res) {
    try { 
        let dbObject={...req.body,deviceLogs:{message:`${req.body.deviceName} added to home-automation smart devices`}};
        let data = new model(dbObject);
        let response = await data.save();
        return res.status(200).send(`${req.body.deviceName} added successfully`);
    } catch (err) {
        if (err.code == 11000) {
            return res.status(409).send(`${req.body.deviceName} already available`);
        }
        res.status(500).send('Internal Server Error')
    }
}

async function getDeviceDetails(req, res) {
    try {
        let data = await model.find({}, { "deviceName": 1, "currentStatus": 1,"deviceLogs":1, _id: 0 });
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send('Internal server Error');
    }
}

async function operateDevice(req, res) {
    let { deviceName, modifyStatus } = req.body;
    try {
        let message={message:`${deviceName} status changed to ${modifyStatus}`};
        let response = await model.findOneAndUpdate({ deviceName: deviceName }, {$set:{currentStatus: modifyStatus}, $push:{deviceLogs:message}}, { new: true });
        if (response == null) {
            throw { message: 'Device not found' }
        }
        res.status(200).send(`${response.deviceName} status changed to ${response.currentStatus}`)
    }
    catch (err) {
        if(err.message=='Device not found'){
            return res.status(404).send(err.message);
        }
        res.status(500).send('Internal Server Error');
    }

}

async function removeDevice(req, res) {
    let removeDevice = req.query.deviceName;
    try {
        await model.findOneAndDelete({ "deviceName": removeDevice });
        res.status(200).send(`${removeDevice} removed successfully`);
    }
    catch (err) {
        res.status(500).send('Internal Server Error');
    }


}

module.exports = { addDevice, getDeviceDetails, operateDevice, removeDevice }