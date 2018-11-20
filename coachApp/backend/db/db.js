// sqlite3 database
var path = require('path');
const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(path.join(__dirname, '..', 'db', 'Frames.db'), (err) => {
  if (err) console.error(err);
  console.log('^fuck you')
});

// new table each run
db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS frames (id INTEGER PRIMARY KEY, timestamp INTEGER, " +
      "swingNum INTEGER, offset INTEGER, frame TEXT)");
});

process.on('SIGINT', () => {
  db.close();
});

module.exports = db;