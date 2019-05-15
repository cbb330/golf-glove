// sqlite3 database init, export db connection
var path = require('path');
const sqlite3 = require('sqlite3').verbose();

const BATCH_SIZE = 50;

class GolfGloveDb {
  constructor() {
    this.db = new sqlite3.Database(path.join(__dirname, '..', 'db', 'GolfGlove.db'), (err) => {
      if (err) console.error(err);
      else console.log("GolfGlove db created");
    });

    process.on('SIGINT', () => {
      this.db.close();
    });

    this.currSwingID = undefined;
    this.queue = [];
    this.makeTables();
  }

  makeTables() {
    this.db.serialize(() => {
      /* * MODE TRANSITION: only send real time enable signal when microcontroller buffer is full.
           This is so front end can accurately display real time vs full swing data, without the database knowing state
      * */
      this.db.run("CREATE TABLE IF NOT EXISTS swings (timestamp INTEGER, swingID INTEGER PRIMARY KEY)");
      this.db.run("CREATE TABLE IF NOT EXISTS frames (\
        timestamp INTEGER,\
        pressure1 INTEGER,\
        pressure2 INTEGER,\
        deflection INTEGER,\
        extension INTEGER,\
        radialDeviation INTEGER,\
        ulnarDeviation INTEGER,\
        accel1X REAL,\
        accel1Y REAL,\
        accel1Z REAL,\
        gyro1X REAL,\
        gyro1Y REAL,\
        gyro1Z REAL,\
        accel2X REAL,\
        accel2Y REAL,\
        accel2Z REAL,\
        gyro2X REAL,\
        gyro2Y REAL,\
        gyro2Z REAL,\
        swingSync INTEGER,\
        dataAvailable INTEGER,\
        swingID INTEGER,\
        PRIMARY KEY (timestamp, swingID),\
        FOREIGN KEY (swingID) REFERENCES swings(swingID)\
      )");
      this.db.get('SELECT swingID FROM swings ORDER BY swingID DESC LIMIT 1', (err, row) => {
        if (err) console.error(err);
        else if (row) this.currSwingID = row;
      });
    });
  }

  storeFrame(frame) {
    // for debugging only, in case microcontroller doesn't send first real time swing
    if (!this.currSwingID) {
      this.storeSwing(frame);
    }
    else {
      const data = [
        frame.timestamp,
        frame.pressure1,
        frame.pressure2,
        frame.deflection,
        frame.extension,
        frame.radialDeviation,
        frame.ulnarDeviation,
        frame.imu1.accelX,
        frame.imu1.accelY,
        frame.imu1.accelZ,
        frame.imu1.gyroX,
        frame.imu1.gyroY,
        frame.imu1.gyroZ,
        frame.imu2.accelX,
        frame.imu2.accelY,
        frame.imu2.accelZ,
        frame.imu2.gyroX,
        frame.imu2.gyroY,
        frame.imu2.gyroZ,
        frame.swingSync,
        frame.dataAvailable,
        this.currSwingID,
      ];
      this.db.run('INSERT INTO frames (\
          timestamp,\
          pressure1,\
          pressure2,\
          deflection,\
          extension,\
          radialDeviation,\
          ulnarDeviation,\
          accel1X,\
          accel1Y,\
          accel1Z,\
          gyro1X,\
          gyro1Y,\
          gyro1Z,\
          accel2X,\
          accel2Y,\
          accel2Z,\
          gyro2X,\
          gyro2Y,\
          gyro2Z,\
          swingSync,\
          dataAvailable,\
          swingID\
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        data, (err) => {
          if (err) console.error("Error inserting into 'Frame' Table: ", err);
          // else console.log("Frame stored");
        });
    }
  }

  storeSwing(frame) {
    var self = this;
    this.db.run('INSERT INTO swings (timestamp, swingID) VALUES (?, ?)',
        [frame.timestamp], function (err) {
          if (err) console.error(err);
          else {
            // console.log("swing stored");
            self.currSwingID = this.lastID;
            self.storeFrame(frame);
          }
        });
  }

  enqueue(frame) {
    this.queue.push(frame);
    if (this.queue.length >= BATCH_SIZE) {
      this.insertBatch(this.queue);
      this.queue = [];
    }
  }

  insertCallback() {
    console.log("Batch insert complete.");
  }

  insertBatch(frames) {
    // insert BATCH_SIZE data points at a time inside a transaction
    //   https://stackoverflow.com/q/1711631
    this.db.serialize(() => {
      this.db.run("BEGIN;");
      frames.forEach((frame) => {
        this.storeFrame(frame);
      });
      this.db.run("COMMIT;", (err) => {
        if (err) console.log("Error committing SQL transaction:", err);
        else console.log("Batch insert complete.");
      });
    });
  }
}

module.exports = GolfGloveDb;
