// sqlite3 database init, export db connection
var path = require('path');
const sqlite3 = require('sqlite3').verbose();

class GolfGloveDb {
  constructor() {
    this.db = new sqlite3.Database(path.join(__dirname, '..', 'db', 'GolfGlove.db'), (err) => {
      if (err) console.error(err);
      else console.log("GolfGlove db created");
    });

    this.makeTables();

    process.on('SIGINT', () => {
      db.close();
    });

  }

  makeTables() {
    this.db.serialize(() => {
      /* * MODE TRANSITION: only send real time enable signal when microcontroller buffer is full.
           This is so front end can accurately display real time vs full swing data, without the database knowing state
      * */
      this.db.run("CREATE TABLE IF NOT EXISTS swings (timestamp INTEGER, swingId INTEGER PRIMARY KEY)");
      this.db.run("CREATE TABLE IF NOT EXISTS frames (frame TEXT, timestamp INTEGER , swingId INTEGER, PRIMARY KEY (timestamp, swingId), FOREIGN KEY (swingId) REFERENCES swings(swingId))");
    });
  }


}





module.exports = GolfGloveDb;