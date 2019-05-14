/**
 * Author: Christian Bush
 * Date: 11-18-18
 * Description: Parser class for Golf Glove next frame data
 */

/* constants from LSM initialization */
const SENSORS_GRAVITY_EARTH          = 9.80665;
const LSM9DS1_ACCEL_MG_LSB_2G        = 0.061;
const LSM9DS1_ACCEL_MG_LSB_4G        = 0.122;
const LSM9DS1_ACCEL_MG_LSB_8G        = 0.244;
const LSM9DS1_ACCEL_MG_LSB_16G       = 0.732;
const LSM9DS1_GYRO_DPS_DIGIT_2000DPS = 0.07000;

const start_time = Date.now();


class Frame {
  constructor(buf, db) {
    if (buf.length != 44) {
      throw "Bad Frame! Length is: " + buf.length;
    }
    this.buf = buf; // buffer object
    this.db = db; //golf glove db api
    if (!this.db) {
      console.error("Undefined db");
    }

    this.parseBuf(this.storeData);
  }

  parseBuf(cb) {
    /* Parse the bytearray buffer into variables */
    this.timestamp = start_time + this.buf.readUInt32LE(0);
    this.pressure1 = this.buf.readUInt16LE(4);
    this.pressure2 = this.buf.readUInt16LE(6);
    this.deflection = this.buf.readUInt16LE(8);
    this.extension = this.buf.readUInt16LE(10);
    this.radialDeviation = this.buf.readUInt16LE(12);
    this.ulnarDeviation = this.buf.readUInt16LE(14);
    // this.deflection = this.buf.readUInt16LE(8) - 8000;
    // this.extension = this.buf.readUInt16LE(10);
    // this.radialDeviation = this.buf.readUInt16LE(12) - 8000;
    // this.ulnarDeviation = this.buf.readUInt16LE(14) - 15000;
    this.imu1 = {
      accelX: this.parseIMU(16, "accel"),
      accelY: this.parseIMU(18, "accel"),
      accelZ: this.parseIMU(20, "accel"),
      gyroX: this.parseIMU(22, "gyro"),
      gyroY: this.parseIMU(24, "gyro"),
      gyroZ: this.parseIMU(26, "gyro")
    };
    this.imu2 = {
      accelX: this.parseIMU(28, "accel"),
      accelY: this.parseIMU(30, "accel"),
      accelZ: this.parseIMU(32, "accel"),
      gyroX: this.parseIMU(34, "gyro"),
      gyroY: this.parseIMU(36, "gyro"),
      gyroZ: this.parseIMU(38, "gyro")
    };
    this.swingSync = this.buf.readUInt16LE(40);
    this.dataAvailable = this.buf.readUInt16LE(42);
    
    this.swingSync ? this.db.storeFrame(this) : this.db.storeSwing(this);
    this.db = undefined;
    this.buf = undefined;
    console.log(this);
  }

  parseIMU(offset, constant) {
    var float = this.buf.readInt16LE(offset);
    switch (constant) {
      case "accel":
        float *= LSM9DS1_ACCEL_MG_LSB_8G;
        float /= 1000;
        float *= SENSORS_GRAVITY_EARTH;
        float = +float.toFixed(3);
        break;
      case "gyro":
        float *= LSM9DS1_GYRO_DPS_DIGIT_2000DPS;
        float = +float.toFixed(3);
        break;
    }
    return float;
  }
}

module.exports = Frame;
