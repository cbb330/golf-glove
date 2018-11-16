/*
    Author: Christian Bush
    Date: 10-08-18
    Description: Controller class needed for Websocket/Noble asynch integration
 */

const noble = require('noble');
const ggServiceUuid = '7c838948fe34f1b52e427e1bd698c53a';
//const ggNextFrameChar = '6c35868a4353abb86f4c13d55742415a';
const ggNextFrameChar = '4e38bed209594602a0af9b6bcb3b7b0e';
const ggRealTimeEnable = '72e48cb3fa2227ba78416d1b7e539259';
const ggDataEnable = 'bdf7ae339873ab95d04bcec6aa349390';

class Controller {
  constructor() {
    this.socket = {};
    this.nobleState = undefined;
    this.ggPeripheral = {};
    this.ggService = {};
    this.ggNextFrame = {};
    this.ggRealTimeEnable = {};
    this.ggDataEnable = {};

    noble.on('stateChange', newState => {
      //console.log("this is the new state: " + newState);
      this.setState(newState);
    });

    noble.on('discover', peripheral => {
      this.ggPeripheral = peripheral;
      if (!this.isEmpty(this.ggPeripheral)) {
        noble.stopScanning();
        console.log("Trying to connect.");
        peripheral.connect(err => {
          if (!this.isEmpty(err)) this.socket.send(JSON.stringify({ err: err }));
          else {
            var peripheralInfo = this.getPeripheral(peripheral);
            this.ggPeripheral.once('disconnect', () => {
              console.log("disconnect once happened");
              this.disconnectPeripheral();
              this.clientSend({success: "Peripheral Disconnected."});
            });
            this.clientSend(peripheralInfo);
          }
        });
      }
    });
  }

  setSocket(socket) {
    this.socket = socket;
  }

  setState(newState) {
    this.nobleState = newState;
  };

  getDiscovers() {
    if (!this.isEmpty(this.ggPeripheral)) this.disconnectPeripheral();
    this.scan();
  }
  
  scan() {
    if (this.nobleState === 'poweredOn') {
      noble.startScanning();
      //noble.startScanning([ggServiceUuid], false);
      console.log("Started scanning");
    } else {
      console.log("Is Bluetooth on?");
    }
  }

  getService(servUuid) {
    console.log("Trying to get services.");
    if (!this.isEmpty(this.ggPeripheral)) {
      this.ggPeripheral.discoverServices([servUuid], (err, services) => {
        if (!this.isEmpty(err)) this.clientSend({err: err});
        else {
          console.log("found service: " + services[0].uuid);
          this.ggService = services[0];
          this.getCharacteristic(charUuid);
        }
      });
    }
    else this.clientSend({ err: "Cannot get service, no device connected." });
  }
  
  getCharacteristic(charUuid){
    if (!this.isEmpty(this.ggService)) {
      this.ggService.discoverCharacteristics([charUuid], (err, characteristics) => {
        if (err) this.socket.send(JSON.stringify({err: "Error Discovering Characteristics!"}));
        else {
            console.log("found characteristic: " + characteristics[0].uuid);
            this.ggNextFrame = characteristics[0];
        }
      });
    }
    else this.clientSend({ err: "Cannot get characteristic, no service discovered." });
  }
  
  getData() {
    this.getService(ggServiceUuid);
    this.getCharacteristic(ggNextFrameChar);
    this.ggNextFrame.read(function (error, data) {
      console.log('DATA READ: ' + data.toString('hex'));
    });
  }

  stopData() {
    
  }

  disconnectPeripheral() {
    noble.stopScanning();
    if (!this.isEmpty(this.ggPeripheral)) {
      this.ggPeripheral.disconnect(err => {
        if (!this.isEmpty(err)) this.clientSend({ err: err });
      });
    }
    else {
      this.clientSend({ err: "No device connected." });
    }
    this.ggPeripheral = {};
    this.ggService = {};
    this.ggNextFrame = {};
  }


  /*
   ** Helper functions below, none actually change any logic
   */

  getPeripheral(peripheral) {
    //console.log(peripheral);
    var periphObj = {};

    //here we output the some data to the console.
    console.log('\n Discovered new peripheral with UUID ' + peripheral.uuid + ':');
    console.log('\t Peripheral Bluetooth address:' + peripheral.address);

    if (peripheral.advertisement.localName) {
      periphObj['name'] = peripheral.advertisement.localName;
      console.log('\t Peripheral local name:' + peripheral.advertisement.localName);
    }
    if (peripheral.rssi) {
      periphObj['rssi'] = peripheral.advertisement.rssi;
      console.log('\t RSSI: ' + peripheral.rssi); //RSSI is the signal strength
    }
    if (peripheral.state) {
      periphObj['state'] = peripheral.state;
      console.log('\t state: ' + peripheral.state);
    }
    if (peripheral.advertisement.serviceUuids.length) {
      periphObj['service'] = peripheral.advertisement.serviceUuids[0];
      console.log('\t Advertised services:' + JSON.stringify(peripheral.advertisement.serviceUuids[0]));
    }

    var serviceData = peripheral.advertisement.serviceData;
    if (serviceData && serviceData.length) {
      console.log('\t Service Data:');
      for (var i in serviceData) {
        console.log('\t\t' + JSON.stringify(serviceData[i].uuid) + ': ' + JSON.stringify(serviceData[i].data.toString('hex')));
      }
    }
    if (peripheral.advertisement.manufacturerData) {
      console.log('\t Manufacturer data: ' + JSON.stringify(peripheral.advertisement.manufacturerData.toString('hex')));
    }
    if (peripheral.advertisement.txPowerLevel !== undefined) {
      console.log('\t TX power level: ' + peripheral.advertisement.txPowerLevel);
    }

    return periphObj;
  }

  isEmpty(obj) {
    return !obj || Object.keys(obj).length === 0;
  }

  clientSend(obj) {
    // not sure if below is the correct way to check if socket is alive, especially if ./routes closes it.
    // TODO: make this a listener???
    if (this.socket.isAlive === false) {
      this.socket.terminate();
      console.log("Socket terminated, not sending.");
      return;
    }
    try {
      this.socket.send(JSON.stringify(obj));
    }
    catch(err) {
      console.log("Message '" + JSON.stringify(obj) + "' not sent! " + err);
    }
  }
};

module.exports = Controller;
