const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('DB connection error:', err);
  } else {
    console.log('Connected to SQLite3 DB');
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      completed INTEGER DEFAULT 0
    )
  `);
  // 테이블 생성 (최초 1회)
  db.run(`CREATE TABLE IF NOT EXISTS requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT,
    type TEXT,
    user TEXT,
    reason TEXT
  )`);
});


module.exports = db;
