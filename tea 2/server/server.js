const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 8088;

app.use(cors());
app.use(express.json());

// ✅ SQLite DB 연결
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('DB connection error:', err);
  } else {
    console.log('✅ Connected to SQLite3 DB');
  }
});

// ✅ 테이블 생성
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      completed INTEGER DEFAULT 0
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS menus (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      options TEXT,
      count INTEGER DEFAULT 1
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT,
      type TEXT,
      user TEXT,
      reason TEXT
    )
  `);
});

//
// ✅ TODOS API
//
app.get('/api/todos', (req, res) => {
  db.all('SELECT * FROM todos', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    // completed를 boolean으로 변환
    const todos = rows.map(row => ({
      id: row.id,
      text: row.text,
      completed: !!row.completed // 0 → false, 1 → true
    }));
    res.json(todos);
  });
});

app.post('/api/todos', (req, res) => {
  const { text, completed = false } = req.body;
  db.run(
    'INSERT INTO todos (text, completed) VALUES (?, ?)',
    [text, completed ? 1 : 0],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, text, completed });
    }
  );
});

app.put('/api/todos/:id', (req, res) => {
  const { completed, text } = req.body;

  // 기존 값 불러오기
  db.get('SELECT * FROM todos WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Todo not found' });

    const newText = text !== undefined ? text : row.text;
    const newCompleted = completed !== undefined ? (completed ? 1 : 0) : row.completed;

    db.run(
      'UPDATE todos SET text = ?, completed = ? WHERE id = ?',
      [newText, newCompleted, req.params.id],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: req.params.id, text: newText, completed: !!newCompleted });
      }
    );
  });
});

app.delete('/api/todos/:id', (req, res) => {
  db.run('DELETE FROM todos WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: this.changes > 0 });
  });
});

//
// ✅ MENUS API
//
app.get('/api/menus', (req, res) => {
  db.all('SELECT * FROM menus', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(
      rows.map(row => ({
        ...row,
        options: JSON.parse(row.options)
      }))
    );
  });
});

app.post('/api/menus', (req, res) => {
  const { name, options, count } = req.body;
  db.run(
    'INSERT INTO menus (name, options, count) VALUES (?, ?, ?)',
    [name, JSON.stringify(options), count || 1],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, name, options, count: count || 1 });
    }
  );
});

app.put('/api/menus/:id', (req, res) => {
  const { count } = req.body;
  db.run(
    'UPDATE menus SET count = ? WHERE id = ?',
    [count, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: this.changes > 0 });
    }
  );
});

app.delete('/api/menus/:id', (req, res) => {
  db.run('DELETE FROM menus WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: this.changes > 0 });
  });
});

//
// ✅ REQUESTS (근무 신청) API
//
app.get('/api/requests', (req, res) => {
  db.all('SELECT * FROM requests', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/requests', (req, res) => {
  const { date, type, user, reason } = req.body;
  db.run(
    'INSERT INTO requests (date, type, user, reason) VALUES (?, ?, ?, ?)',
    [date, type, user, reason],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, date, type, user, reason });
    }
  );
});

app.delete('/api/requests/:id', (req, res) => {
  db.run('DELETE FROM requests WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: this.changes > 0 });
  });
});

//
// ✅ 서버 실행
//
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
