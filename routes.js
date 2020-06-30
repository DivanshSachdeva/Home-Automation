const DeviceController = require('./controllers/smartDevice.controller');
const AddDevice = DeviceController.addDevice;
const  GetDeviceList = DeviceController.getDeviceDetails;
const OperateDevice = DeviceController.operateDevice;
const RemoveDevice = DeviceController.removeDevice;

module.exports = {
    AddDevice,
    GetDeviceList,
    OperateDevice,
    RemoveDevice
}