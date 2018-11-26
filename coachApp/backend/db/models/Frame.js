/**
 * Author: Christian Bush
 * Date: 11-18-18
 * Description: Parser class for Golf Glove next frame data
 */

class Frame {
  constructor(buf, db) {
    if (buf.length != 56) {
      throw "Bad Frame! Length is: " + buf.length;
    }
    this.raw = buf; // buffer object
    this.db = db; //golf glove db api

    this.parseBuf(buf, this.storeData);

  }

  parseBuf(buf, cb) {
    /* Parse the bytearray buffer into variables */
    this.timestamp = buf.readUInt32LE(0);
    this.pressure1 = buf.readUInt16LE(4);
    this.pressure2 = buf.readUInt16LE(6);
    this.deflection = buf.readUInt16LE(8);
    this.extension = buf.readUInt16LE(10);
    this.radialDeviation = buf.readUInt16LE(12);
    this.ulnarDeviation = buf.readUInt16LE(14);
    this.imu1 = {
      accelX: buf.readInt16LE(16),
      accelY: buf.readInt16LE(18),
      accelZ: buf.readInt16LE(20),
      magX: buf.readInt16LE(22),
      magY: buf.readInt16LE(24),
      magZ: buf.readInt16LE(26),
      gyroX: buf.readInt16LE(28),
      gyroY: buf.readInt16LE(30),
      gyroZ: buf.readInt16LE(32)
    };
    this.imu2 = {
      accelX: buf.readInt16LE(34),
      accelY: buf.readInt16LE(36),
      accelZ: buf.readInt16LE(38),
      magX: buf.readInt16LE(40),
      magY: buf.readInt16LE(42),
      magZ: buf.readInt16LE(44),
      gyroX: buf.readInt16LE(46),
      gyroY: buf.readInt16LE(48),
      gyroZ: buf.readInt16LE(50)
    };
    this.swingSync = buf.readInt16LE(52);
    this.dataAvailable = buf.readInt16LE(54);

    cb();
  }

  storeData() {
    switch (this.swingSync) {
      case 0:
        //* use a combination of the db.js's class to create a buffer with this class to lower amount of sqlite queries
        // select last_insert_rowid();
        // (new time, currSwingId) <- frame table
        break;
      case 1:
        // (new time, currSwingId + 1) <- swing table
        // (new time, currSwingId + 1) <- frame table
        break;
      case 2:
        // end of swing, not used
        break;
    }
  }
}

module.exports = Frame;