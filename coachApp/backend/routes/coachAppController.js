var noble = require('noble');

exports.hello = function(req, res) {
  res.send({ express: 'Hello from express' });
};

exports.getDiscovers = function(socket) {
  noble.on('stateChange', scan);
  // TODO: figure out how to res.send the return from FOUNDPERIPHERAL
  noble.on('discover', function(peripheral) {
    socket.send(JSON.stringify(foundPeripheral(peripheral)));
  });
 };


function scan(state) {
  if (state === 'poweredOn') {
    noble.startScanning();
    console.log("Started scanning");
  } else {
    noble.stopScanning();
    console.log("Is Bluetooth on?");
  }
}


function foundPeripheral(peripheral) {

  var periphObj = {};

  //uncomment the line below if you want to see all data provided.
  //console.log(peripheral);


  //here we output the some data to the console.
  periphObj['uuid'] = peripheral.uuid;
  console.log('\n Discovered new peripheral with UUID ' + peripheral.uuid+ ':');
  periphObj['address'] = peripheral.address;
  console.log('\t Peripheral Bluetooth address:' + peripheral.address);
  
  if(peripheral.advertisement.localName){
    periphObj['name'] = peripheral.advertisement.localName;
    console.log('\t Peripheral local name:' + peripheral.advertisement.localName);
  }
  if(peripheral.rssi) {
    console.log('\t RSSI: ' + peripheral.rssi); //RSSI is the signal strength
  }
  if(peripheral.state){
   console.log('\t state: ' + peripheral.state);
  }
  if(peripheral.advertisement.serviceUuids.length){
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

  // not sure how this will serialize
  return periphObj;
}
