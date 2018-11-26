/**
 * Author: Christian Bush
 * Date: 11-18-18
 * Description: Parser class for Golf Glove next frame data
 */

/* constants from LSM initialization */
const SENSORS_GRAVITY_EARTH          = 9.80665;
const LSM9DS1_ACCEL_MG_LSB_2G        = 0.061;
const LSM9DS1_MAG_MGAUSS_4GAUSS      = 0.14;
const LSM9DS1_GYRO_DPS_DIGIT_2000DPS = 0.07000;


class Frame {
  constructor(buf, db) {
    if (buf.length != 56) {
      throw "Bad Frame! Length is: " + buf.length;
    }
    this.buf = buf; // buffer object
    this.db = db; //golf glove db api

    this.parseBuf(this.storeData);

  }

  parseBuf(cb) {
    /* Parse the bytearray buffer into variables */
    this.timestamp = this.buf.readUInt32LE(0);
    this.pressure1 = this.buf.readUInt16LE(4);
    this.pressure2 = this.buf.readUInt16LE(6);
    this.deflection = this.buf.readUInt16LE(8);
    this.extension = this.buf.readUInt16LE(10);
    this.radialDeviation = this.buf.readUInt16LE(12);
    this.ulnarDeviation = this.buf.readUInt16LE(14);
    this.imu1 = {
      accelX: this.parseIMU(16, "accel"),// no native 16 bit read
      accelY: this.parseIMU(18, "accel"),
      accelZ: this.parseIMU(20, "accel"),
      magX: this.parseIMU(22, "mag"),
      magY: this.parseIMU(24, "mag"),
      magZ: this.parseIMU(26, "mag"),
      gyroX: this.parseIMU(28, "gyro"),
      gyroY: this.parseIMU(30, "gyro"),
      gyroZ: this.parseIMU(32, "gyro")
    };
    this.imu2 = {
      accelX: this.parseIMU(34, "accel"),// no native 16 bit read
      accelY: this.parseIMU(36, "accel"),
      accelZ: this.parseIMU(38, "accel"),
      magX: this.parseIMU(40, "mag"),
      magY: this.parseIMU(42, "mag"),
      magZ: this.parseIMU(44, "mag"),
      gyroX: this.parseIMU(46, "gyro"),
      gyroY: this.parseIMU(48, "gyro"),
      gyroZ: this.parseIMU(50, "gyro")
    };
    this.swingSync = this.buf.readUInt16LE(52);
    this.dataAvailable = this.buf.readUInt16LE(54);

    //cb();
  }

  parseIMU(offset, constant) {
    var float = this.buf.readInt16LE(offset);
    switch (constant) {
      case "accel":
        float *= LSM9DS1_ACCEL_MG_LSB_2G;
        float /= 1000;
        float *= SENSORS_GRAVITY_EARTH;
        break;
      case "mag":
        float *= LSM9DS1_MAG_MGAUSS_4GAUSS;
        float /= 1000;
        break;
      case "gyro":
        float *= LSM9DS1_GYRO_DPS_DIGIT_2000DPS;
        break;
    }
    return float;
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