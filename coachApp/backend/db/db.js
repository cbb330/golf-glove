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

    this.currSwingId = 0;
    this.makeTables();

  }

  makeTables() {
    this.db.serialize(() => {
      /* * MODE TRANSITION: only send real time enable signal when microcontroller buffer is full.
           This is so front end can accurately display real time vs full swing data, without the database knowing state
      * */
      this.db.run("CREATE TABLE IF NOT EXISTS swings (timestamp INTEGER, swingId INTEGER PRIMARY KEY)");
      this.db.run("CREATE TABLE IF NOT EXISTS frames (frame TEXT, timestamp INTEGER , swingId INTEGER, PRIMARY KEY (timestamp, swingId), FOREIGN KEY (swingId) REFERENCES swings(swingId))");
      this.db.get('SELECT swingId FROM swings ORDER BY swingId DESC LIMIT 1', (err, row) => {
        if (err) console.error(err);
        else if (row) this.currSwingId = row;
      });
    });
  }

  storeFrame(frame) {
    // for debugging only, in case microcontroller doesn't send first real time swing
    if (!this.currSwingId) {
      this.storeSwing(frame);
    }
    else {
      this.db.run('INSERT INTO frames (frame, timestamp, swingId) VALUES (?, ?, ?)',
          frame, frame.timestamp, this.currSwingId, (err) => {
            if (err) console.error("Frame Table ", err);
            else console.log("Frame stored");
          });
    }
  }

  storeSwing(frame) {
    this.currSwingId++;
    this.db.run('INSERT INTO swings (timestamp, swingId) VALUES (?, ?)',
        frame.timestamp, this.currSwingId, (err) => {
          if (err) console.error(err);
          else {
            console.log("swing stored");
            this.storeFrame(frame);
          }
        });
  }
}

module.exports = GolfGloveDb;