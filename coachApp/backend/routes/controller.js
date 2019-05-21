/**
 * Author: Christian Bush
 * Date: 10-31-18
 * Description: Controller class needed for Websocket/Noble asynch integration
 */

const noble = require("noble");
const Frame = require("../db/models/Frame.js");
const GolfGloveDb = require("../db/db.js");

// golf glove constants
const GG_SERVICE_UUID = "7c838948fe34f1b52e427e1bd698c53a"; // make big endian / little endian converter function
const GG_FRAME_CHARACTERISTIC = "6c35868a4353abb86f4c13d55742415a";
//const GG_FRAME_CHARACTERISTIC = "4e38bed209594602a0af9b6bcb3b7b0e";
const ggRealTimeEnable = "72e48cb3fa2227ba78416d1b7e539259";
const ggDataEnable = "bdf7ae339873ab95d04bcec6aa349390";
const SAMPLE_RATE = 120; // in hertz

class Controller {
  constructor() {
    this.socket = {};
    this.nobleState = undefined;
    this.ggPeripheral = {};
    this._ggService = {};
    this.ggFrameCharacteristic = {};
    this.ggRealTimeEnable = {};
    this.ggDataEnable = {};
    this.db = new GolfGloveDb();

    noble.on("stateChange", newState => {
      console.log(`NobleStateChange: ${newState}`);
      this.nobleState = newState;
    });

    // noble.on("discover", peripheral => {
    //   this.ggPeripheral = peripheral;
    //   noble.stopScanning();
    //   console.log("Trying to connect.");
    //   peripheral.connect(error => {
    //     if (error) {
    //       this.sendClient("error", error);
    //     }
    //     else {
    //       var peripheralInfo = this.getPeripheralInfo(peripheral);
    //       this.sendClient("status", peripheralInfo);
    //       this.ggPeripheral.once("disconnect", () => {
    //         console.log("disconnect once happened");
    //         this.ggPeripheral = {};
    //         this.ggService = {};
    //         this.ggFrameCharacteristic = {};
    //         this.disconnectPeripheral();
    //       });
    //     }
    //   });
    // });

    noble.on("discover", peripheral => {
      noble.stopScanning();
      this.ggPeripheral = peripheral;
      console.log(`Connecting to '${peripheral.advertisement.localName}' ${peripheral.id}`);
      this.connectAndSetUp(peripheral);
    });
  }

  setSocket(socket) {
    this.socket = socket;
  }

  getDiscovers() {
    this.disconnectPeripheral();
    this.scan();
  }

  scan() {
    if (this.nobleState === "poweredOn") {
      console.log("Bluetooth is on. Starting scan.");
      noble.startScanning([GG_SERVICE_UUID], false);
    } else {
      console.log("Bluetooth is off. Stopping scan.");
      noble.stopScanning();
    }
  }

  connectAndSetUp(peripheral) {
    peripheral.connect((error) => {
      if (error) {
        console.log("Error connecting to peripheral:", error);
      }
      this.getPeripheralInfo(peripheral); // logs a lot of info
      console.log("Discovering services & characteristics");
      const serviceUUIDs = [GG_SERVICE_UUID];
      const characteristicUUIDs = [GG_FRAME_CHARACTERISTIC];
      peripheral.discoverSomeServicesAndCharacteristics(
        serviceUUIDs,
        characteristicUUIDs,
        this.onServicesAndCharacteristicsDiscovered.bind(this)
      );
    });
  
    peripheral.on("disconnect", this.logDisconnect);
  }

  logDisconnect() {
    console.log("disconnected");
  }

  onServicesAndCharacteristicsDiscovered(error, services, characteristics) {
    if (error) {
      console.log("Error discovering services and characteristics:", error);
      return;
    }
  
    this.ggFrameCharacteristic = characteristics[0];
    console.log("Discovered services and characteristics.");
  }

  getService(servUuid) {
    console.log("Trying to get services.");
    if (!this.isEmpty(this.ggPeripheral)) {
      this.ggPeripheral.discoverServices([servUuid], (error, services) => {
        if (error) {
          this.sendClient("error", error);
        }
        else {
          console.log("found service: " + services[0].uuid);
          this.ggService = services[0];
          this.getCharacteristic(GG_FRAME_CHARACTERISTIC);
        }
      });
    }
    else {
      this.sendClient("error", "Cannot get service, no device connected.");
    }
  }

  getCharacteristic(charUuid) {
    if (!this.isEmpty(this.ggService)) {
      this.ggService.discoverCharacteristics([charUuid], (error, characteristics) => {
        if (error) {
          this.sendClient("error", "Error discovering characteristics.");
        }
        else {
          console.log("found characteristic: " + characteristics[0].uuid);
          this.ggFrameCharacteristic = characteristics[0];
          this.read();
        }
      });
    }
    else {
      this.sendClient("error", "Cannot get characteristic, no service discovered.");
    }
  }

  getData() {
    this.read(GG_SERVICE_UUID);
  }

  stopData() {
    if (!this.isEmpty(this.ggFrameCharacteristic)) {
      this.ggFrameCharacteristic.removeEventListener("data", this.enqueue.bind(this));
      this.ggFrameCharacteristic.unsubscribe(error => {
        if (error) {
          console.log("Error unsubscribing from Frame Characteristic:", error);
        }
        else {
          console.log("Unsubscribed from Frame Characteristic.");
        }
      });
    }
    else {
      console.log("no device connected");
    }
  }

  read() {
    this.ggFrameCharacteristic.on("data", this.enqueue.bind(this));

    this.ggFrameCharacteristic.subscribe(error => {
      if (error) {
        console.log("Error subscribing to Frame Characteristic:", error);
      }
      else {
        console.log("Subscribed to Frame Characteristic");
      }
    });
  }

  enqueue(data, isNotification) {
    var frame = new Frame(data);
    this.db.enqueue(frame);
  }

  disconnectPeripheral() {
    if (!this.isEmpty(this.ggPeripheral)) {
      this.ggPeripheral.removeEventListener("disconnect", this.logDisconnect);
      this.ggPeripheral.disconnect(error => {
        if (error) {
          this.sendClient("error", error);
        }
        else {
          console.log("Disconnecting peripheral");
          this.sendClient("status", "Disconnecting peripheral.");
        }
      });
    }
  }

  get ggService() {
    return this._ggService;
  }


  /*
   ** Helper functions below, none actually change any logic
   */

  getPeripheralInfo(peripheral) {
    //console.log(peripheral);
    var periphObj = {};

    console.log("\n Discovered new peripheral with UUID " + peripheral.uuid + ":");
    console.log("\t Peripheral Bluetooth address:" + peripheral.address);

    if (peripheral.advertisement.localName) {
      periphObj["name"] = peripheral.advertisement.localName;
      console.log("\t Peripheral local name:" + peripheral.advertisement.localName);
    }
    if (peripheral.rssi) {
      periphObj["rssi"] = peripheral.advertisement.rssi;
      console.log("\t RSSI: " + peripheral.rssi);
    }
    if (peripheral.state) {
      periphObj["state"] = peripheral.state;
      console.log("\t state: " + peripheral.state);
    }
    if (peripheral.advertisement.serviceUuids.length) {
      periphObj["service"] = peripheral.advertisement.serviceUuids[0];
      console.log("\t Advertised services:" + JSON.stringify(peripheral.advertisement.serviceUuids[0]));
    }

    var serviceData = peripheral.advertisement.serviceData;
    if (serviceData && serviceData.length) {
      console.log("\t Service Data:");
      for (var i in serviceData) {
        console.log("\t\t" + JSON.stringify(serviceData[i].uuid) + ": " + JSON.stringify(serviceData[i].data.toString("hex")));
      }
    }
    if (peripheral.advertisement.manufacturerData) {
      console.log("\t Manufacturer data: " + JSON.stringify(peripheral.advertisement.manufacturerData.toString("hex")));
    }
    if (peripheral.advertisement.txPowerLevel !== undefined) {
      console.log("\t TX power level: " + peripheral.advertisement.txPowerLevel);
    }

    console.log("");
    return periphObj;
  }

  isEmpty(obj) {
    return !obj || Object.keys(obj).length === 0;
  }

  sendClient(type, data) {
    // not sure if below is the correct way to check if socket is alive, especially if ./routes closes it.
    // TODO: make this a listener???
    if (this.socket.isAlive === false) {
      this.socket.terminate();
      console.log("Socket terminated, not sending.");
      return;
    }
    const message = { type, data };
    try {
      this.socket.send(JSON.stringify(message));
    }
    catch (error) {
      console.log("Message '" + JSON.stringify(message) + "' not sent! " + error);
    }
  }
}

module.exports = Controller;
