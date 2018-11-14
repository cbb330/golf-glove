const noble = require('noble');
const ggServiceUuid = '3ac598d61b7e422eb5f134fe4889837c';

class Controller {
  constructor(socket) {
    this.socket = socket;
    this.nobleState = undefined;
    this.noblePeripheral = {};

    noble.on('stateChange', newState => {
      //console.log("this is the new state: " + newState);
      this.setState(newState);
    });

    noble.on('discover', peripheral => {
      this.sendDiscovers(peripheral);
    });
  }

  setState(newState) {
    //console.log("setState: " + newState);
    this.nobleState = newState;
  };

  getDiscovers() {
    //console.log("get discovers: " + this.nobleState);
    this.scan();
  }

  sendDiscovers(peripheral) {

    noble.stopScanning();
    this.noblePeripheral = this.getPeripheral(peripheral);
    //console.log(this.noblePeripheral);
    this.socket.send(JSON.stringify(this.noblePeripheral));

  }

  scan() {
    if (this.nobleState === 'poweredOn') {
      noble.startScanning([ggServiceUuid], false); // false - no duplicates
      console.log("Started scanning");
    } else {
      //noble.stopScanning();
      console.log("Is Bluetooth on?");
    }
  }


  getPeripheral(peripheral) {
    //console.log(peripheral);
    var periphObj = {};

    //here we output the some data to the console.
    periphObj['uuid'] = peripheral.uuid;
    console.log('\n Discovered new peripheral with UUID ' + peripheral.uuid + ':');
    periphObj['address'] = peripheral.address;
    console.log('\t Peripheral Bluetooth address:' + peripheral.address);

    if (peripheral.advertisement.localName) {
      periphObj['name'] = peripheral.advertisement.localName;
      console.log('\t Peripheral local name:' + peripheral.advertisement.localName);
    }
    if (peripheral.rssi) {
      console.log('\t RSSI: ' + peripheral.rssi); //RSSI is the signal strength
    }
    if (peripheral.state) {
      console.log('\t state: ' + peripheral.state);
    }
    if (peripheral.advertisement.serviceUuids.length) {
      console.log('\t Advertised services:' + JSON.stringify(peripheral.advertisement.serviceUuids));
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
};

module.exports = Controller;
