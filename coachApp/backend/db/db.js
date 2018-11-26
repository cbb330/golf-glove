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
      // offet is microcontroller timestamp - swingParent timestamp
      this.db.run("CREATE TABLE IF NOT EXISTS frames (offset INTEGER, frame TEXT, timestamp INTEGER, FOREIGN KEY (timestamp) REFERENCES swings(timestamp))");
      this.db.run("CREATE TABLE IF NOT EXISTS swings (timestamp INTEGER PRIMARY KEY, swingNum INTEGER, isRealTime BOOLEAN)");
    });
  }


}





module.exports = GolfGloveDb;