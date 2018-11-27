/**
 * Author: Christian Bush
 * Date: 10-31-18
 * Description: Controller class needed for Websocket/Noble asynch integration
 */

const noble = require('noble');
const Frame = require('../db/models/Frame.js');
const GolfGloveDb = require('../db/db.js');

// golf glove constants
const ggServiceUuid = '7c838948fe34f1b52e427e1bd698c53a'; // make big endian / little endian converter function
const ggFrameChar = '6c35868a4353abb86f4c13d55742415a';
//const ggFrameChar = '4e38bed209594602a0af9b6bcb3b7b0e';
const ggRealTimeEnable = '72e48cb3fa2227ba78416d1b7e539259';
const ggDataEnable = 'bdf7ae339873ab95d04bcec6aa349390';
const SAMPLE_RATE = 120; // in hertz

class Controller {
  constructor() {
    this.socket = {};
    this.nobleState = undefined;
    this.ggPeripheral = {};
    this._ggService = {};
    this._ggFrame = {};
    this.ggRealTimeEnable = {};
    this.ggDataEnable = {};
    this.db = new GolfGloveDb();

    noble.on('stateChange', newState => {
      //console.log("this is the new state: " + newState);
      this.setNobleState(newState);
    });

    noble.on('discover', peripheral => {
      this.ggPeripheral = peripheral;
      if (!this.isEmpty(this.ggPeripheral)) {
        noble.stopScanning();
        console.log("Trying to connect.");
        peripheral.connect(error => {
          if (error) {
            const message = {type: 'error', data: error};
            this.sendClient(message);
          }
          else {
            var peripheralInfo = this.getPeripheral(peripheral);
            this.sendClient(peripheralInfo);
            this.ggPeripheral.once('disconnect', () => {
              console.log("disconnect once happened");
              this.ggPeripheral = {};
              this.ggService = {};
              this.ggFrame = {};
              this.disconnectPeripheral();
            });
          }
        });
      }
    });
  }

  setSocket(socket) {
    this.socket = socket;
  }

  setNobleState(newState) {
    this.nobleState = newState;
  }

  getDiscovers() {
    if (!this.isEmpty(this.ggPeripheral)) this.disconnectPeripheral();
    this.scan();
  }
  
  scan() {
    if (this.nobleState === 'poweredOn') {
      //noble.startScanning();
      noble.startScanning([ggServiceUuid], false);
      console.log("Started scanning");
    } else {
      console.log("Is Bluetooth on?");
    }
  }

  getService(servUuid) {
    console.log("Trying to get services.");
    if (!this.isEmpty(this.ggPeripheral)) {
      this.ggPeripheral.discoverServices([servUuid], (error, services) => {
        if (error) {
          const message = {type: 'error', data: error};
          this.sendClient(message);
        }
        else {
          console.log("found service: " + services[0].uuid);
          this.ggService = services[0];
          //this.getCharacteristic(charUuid); replaced by ggService setter
        }
      });
    }
    else {
      const message = {type: 'error', data: 'Cannot get service, no device connected.'};
      this.sendClient(message);
    }
  }
  
  getCharacteristic(charUuid){
    if (!this.isEmpty(this.ggService)) {
      this.ggService.discoverCharacteristics([charUuid], (error, characteristics) => {
        if (error) {
          const message = {type: 'error', data: "Error discovering characteristics."};
          this.sendClient(message);
        }
        else {
          console.log("found characteristic: " + characteristics[0].uuid);
          this.ggFrame = characteristics[0];
        }
      });
    }
    else {
      const message = {type: 'error', data: "Cannot get characteristic, no service discovered."};
      this.sendClient(message);
    }
  }
  
  getData() {
    /*
    var testbuf = Buffer.from('010000000000ffffffffffffffffffffffffffffffffffffffffffff' +
        'ffffffffffffffffffffffffffffffffffffffffffffffffffffffff', 'hex');
    var frame = new Frame(testbuf, this.db);
    this.sendClient(frame);
    */

    this.getService(ggServiceUuid);
  }

  stopData() {
    // TODO
  }

  read() {
    this.ggFrame.on('data', (data, isNotification) => {
      var frame = new Frame(data, this.db);
      console.log(frame);
      const message = {type: 'data', frame};
      this.sendClient(message);
    });

    this.ggFrame.subscribe(error => {
      if (error) {
        console.error('Error subscribing to Frame Characteristic');
      }
      else {
        console.log('Subscribed to Frame Characteristic');
      }
    });
  }

  disconnectPeripheral() {
    if (!this.isEmpty(this.ggPeripheral)) {
      this.ggPeripheral.disconnect(error => {
        if (error) {
          const message = {type: 'error', data: error};
          this.sendClient(message);
        }
        else {
          const message = {type: 'status', data: 'Peripheral Disconnected'};
          this.sendClient(message);
        }
      });
    }
  }

  get ggService() {
    return this._ggService;
  }

  set ggService(obj) {
    this._ggService = obj;
    if (!this.isEmpty(this._ggService)) {
      this.getCharacteristic(ggFrameChar);
    }
  }

  get ggFrame() {
    return this._ggFrame;
  }

  set ggFrame(obj) {
    this._ggFrame = obj;
    if (!this.isEmpty(this._ggFrame)) {
      this.read();
    }
  }


  /*
   ** Helper functions below, none actually change any logic
   */

  getPeripheral(peripheral) {
    //console.log(peripheral);
    var periphObj = {};

    console.log('\n Discovered new peripheral with UUID ' + peripheral.uuid + ':');
    console.log('\t Peripheral Bluetooth address:' + peripheral.address);

    if (peripheral.advertisement.localName) {
      periphObj['name'] = peripheral.advertisement.localName;
      console.log('\t Peripheral local name:' + peripheral.advertisement.localName);
    }
    if (peripheral.rssi) {
      periphObj['rssi'] = peripheral.advertisement.rssi;
      console.log('\t RSSI: ' + peripheral.rssi);
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

    console.log('');
    return periphObj;
  }

  isEmpty(obj) {
    return !obj || Object.keys(obj).length === 0;
  }

  sendClient(message) {
    // not sure if below is the correct way to check if socket is alive, especially if ./routes closes it.
    // TODO: make this a listener???
    if (this.socket.isAlive === false) {
      this.socket.terminate();
      console.log("Socket terminated, not sending.");
      return;
    }
    try {
      this.socket.send(JSON.stringify(message));
    }
    catch (error) {
      console.log("Message '" + JSON.stringify(message) + "' not sent! " + error);
    }
  }
}

module.exports = Controller;
