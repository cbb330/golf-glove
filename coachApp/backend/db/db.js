// sqlite3 database init, export db connection
var path = require('path');
const sqlite3 = require('sqlite3').verbose();

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
    this.makeTables();

  }

  makeTables() {
    this.db.serialize(() => {
      /* * MODE TRANSITION: only send real time enable signal when microcontroller buffer is full.
           This is so front end can accurately display real time vs full swing data, without the database knowing state
      * */
      this.db.run("CREATE TABLE IF NOT EXISTS swings (timestamp INTEGER, swingID INTEGER PRIMARY KEY)");
      this.db.run("CREATE TABLE IF NOT EXISTS frames (frame TEXT, timestamp INTEGER , swingID INTEGER, PRIMARY KEY (timestamp, swingID), FOREIGN KEY (swingID) REFERENCES swings(swingID))");
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
	    // console.log(frame.timestamp, this.currSwingID);
      this.db.run('INSERT INTO frames (frame, timestamp, swingID) VALUES (?, ?, ?)',
          [JSON.stringify(frame), frame.timestamp, this.currSwingID], (err) => {
            if (err) console.error("Frame Table ", err);
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
}

module.exports = GolfGloveDb;
