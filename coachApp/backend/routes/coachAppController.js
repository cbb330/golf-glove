const noble = require('noble');
const ggServiceUuid = '7c838948fe34f1b52e427e1bd698c53a';
const ggNextFrameChar = '6c35868a4353abb86f4c13d55742415a';
const ggRealTimeEnable = '72e48cb3fa2227ba78416d1b7e539259';
const ggDataEnable = 'bdf7ae339873ab95d04bcec6aa349390';

class Controller {
  constructor() {
    this.socket = {};
    this.nobleState = undefined;
    this.noblePeripheral = {};
    this.ggNextFrame = {};
    this.ggRealTimeEnable = {};
    this.ggDataEnable = {};

    noble.on('stateChange', newState => {
      //console.log("this is the new state: " + newState);
      this.setState(newState);
    });

    noble.on('discover', peripheral => {
      this.sendDiscovers(peripheral);
      this.noblePeripheral = peripheral;
      if (!this.isEmpty(this.noblePeripheral)) {
        noble.stopScanning();
        console.log("Trying to connect.");
        peripheral.connect(err => {
          if (!this.isEmpty(err)) this.socket.send(JSON.stringify({ err: err }));
          else {
            this.getServices();
          }
        });
      }
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

  // TODO: make less forEach's and just lock to ggServiceUuid
  getServices() {
    console.log("Trying to get services.");
    //console.log(this.noblePeripheral);
    this.noblePeripheral.discoverServices([ggServiceUuid], (err, services) => {
      if (!this.isEmpty(err)) this.clientSend({ err: err });
      else {
        console.log(services);
        services.forEach(service => {
          console.log("found service: " + service.uuid);
          service.discoverCharacteristics([], (err, characteristics) => {
            if (err) this.socket.send(JSON.stringify({err: "Error Discovering Characteristics!"}));
            else {
              characteristics.forEach(characteristic => {
                console.log("found characteristic: " + characteristic.uuid);
                //TODO: continue filling out the characteristic read here
                this.ggNextFrame = characteristic;
                if (this.ggNextFrame.uuid == ggNextFrameChar) {
                  console.log("this happens");
                  this.ggNextFrame.read(function (error, data) {
                    console.log('DATA READ: ' + data.toString('hex'));
                  });
                }
              });
            }
          });
        });
      }
    });
  }

  sendDiscovers(peripheral) {
    //noble.stopScanning();
    var peripheralInfo = this.getPeripheral(peripheral);
    //console.log(this.noblePeripheral);
    this.clientSend(peripheralInfo);
  }

  scan() {
    if (this.nobleState === 'poweredOn') {
      //noble.startScanning();
      noble.startScanning([ggServiceUuid], false);
      console.log("Started scanning");
    } else {
      //noble.stopScanning();
      console.log("Is Bluetooth on?");
    }
  }

  disconnectPeripheral() {
    noble.stopScanning();
    if (!this.isEmpty(this.noblePeripheral)) {
      this.noblePeripheral.disconnect(err => {
        if (!this.isEmpty(err)) {
          this.clientSend({ err: err });
        }
        else this.clientSend({ success: "Peripheral Disconnected." });
      });
    }
    else {
      this.clientSend({ err: "No device connected." });
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
      console.log("Message not sent! " + err);
    }
  }

  setSocket(socket) {
    this.socket = socket;
  }
};

module.exports = Controller;
