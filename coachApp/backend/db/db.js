// sqlite3 database
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../db/Frames.db', (err) => {
  console.error(err);
});

// new table each run
db.serialize(function() {
  db.run("CREATE TABLE frames (timestamp INTEGER, swingNum INTEGER, offset INTEGER, frame BLOB)");
});

process.on('SIGINT', () => {
  db.close();
});

module.exports = db;