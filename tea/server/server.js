const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const cheerio = require('cheerio');
const fs = require('fs');
const app = express();
const PORT = 8088;
// Optional env loader (won't crash if dotenv not installed yet)
try { require('dotenv').config(); } catch {}

app.use(cors());
app.use(express.json());

// ✅ 정적 파일 서빙 (프런트와 API를 동일 포트에서 제공)
app.use(express.static(path.join(__dirname, '..', 'src')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'src', 'pages', 'index.html'));
});

// Friendly mapping: allow top-level "/something.html" to resolve to "src/pages/something.html"
// e.g., GET /login.html -> src/pages/login.html
app.get('/:page.html', (req, res, next) => {
  const filename = req.params.page + '.html';
  const filePath = path.join(__dirname, '..', 'src', 'pages', filename);
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) return next();
    res.sendFile(filePath);
  });
});

// ✅ SQLite DB 연결
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('DB connection error:', err);
  } else {
    console.log('✅ Connected to SQLite3 DB');
  }
});

// =========================
// Auth (signup/login/approval)
// =========================
// Lazy session setup (won't crash if express-session missing)
let sessionMiddleware = (req, _res, next) => next();
try {
  const session = require('express-session');
  const secret = process.env.SESSION_SECRET || 'dev-secret-change-me';
  sessionMiddleware = session({
    secret,
    resave: false,
    saveUninitialized: false,
  });
} catch {
  console.warn('express-session not installed; auth will be stateless and limited. Install express-session for login persistence.');
}
app.use(sessionMiddleware);

function hashPassword(pw) {
  try {
    const bcrypt = require('bcryptjs');
    return bcrypt.hashSync(pw, 8);
  } catch {
    return pw; // fallback (dev only)
  }
}

function verifyPassword(pw, hash) {
  try {
    const bcrypt = require('bcryptjs');
    return bcrypt.compareSync(pw, hash);
  } catch {
    return pw === hash; // fallback
  }
}

app.post('/api/auth/signup', (req, res) => {
  let { username, password, name, tiworld } = req.body;
  if (typeof username === 'string') username = username.trim();
  if (typeof password === 'string') password = password.trim();
  if (typeof name === 'string') name = name.trim();
  const isTiworld = tiworld === true || tiworld === 'true' || tiworld === 'on' || tiworld === 1 || tiworld === '1';
  if (!username || !password || !name) return res.status(400).json({ error: 'username, password and name are required' });
  // Prefix name when tiworld is selected (avoid double prefix)
  const PREFIX = '티월드 ';
  const displayName = isTiworld
    ? (name.startsWith(PREFIX) ? name : PREFIX + name)
    : name;
  const nowIso = new Date().toISOString();
  const hashed = hashPassword(password);
  db.run(
    'INSERT INTO users (username, password, name, role, approved, createdAt) VALUES (?, ?, ?, ?, ?, ?)',
    [username, hashed, displayName, 'user', 0, nowIso],
    function (err) {
      if (err) {
        if (/(UNIQUE|unique)/i.test(err.message)) return res.status(409).json({ error: 'username already exists' });
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID, username, name: displayName, approved: false, message: 'Signup received. Awaiting admin approval.' });
    }
  );
});

app.post('/api/auth/login', (req, res) => {
  let { username, password, remember } = req.body;
  if (typeof username === 'string') username = username.trim();
  if (typeof password === 'string') password = password.trim();
  if (!username || !password) return res.status(400).json({ error: 'username and password are required' });
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    if (!user.approved) return res.status(403).json({ error: 'Account not approved yet' });
    const ok = verifyPassword(password, user.password);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    if (req.session) req.session.user = { id: user.id, username: user.username, name: user.name, role: user.role };
    // Remember me: persist session cookie across browser restarts
    try {
      const wantRemember = remember === true || remember === 'true' || remember === 'on' || remember === 1 || remember === '1';
      if (wantRemember && req.session && req.session.cookie) {
        // 30 days
        req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
      }
    } catch {}
    res.json({ id: user.id, username: user.username, name: user.name, role: user.role });
  });
});

app.post('/api/auth/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(() => res.json({ ok: true }));
  } else {
    res.json({ ok: true });
  }
});

app.get('/api/auth/me', (req, res) => {
  if (req.session && req.session.user) return res.json(req.session.user);
  res.status(401).json({ error: 'Not authenticated' });
});

// Admin: pending signup count
app.get('/api/admin/pending-count', (req, res) => {
  if (!req.session || !req.session.user || req.session.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  db.get('SELECT COUNT(*) as count FROM users WHERE approved = 0', (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ count: row?.count || 0 });
  });
});

// Dev helper: reset or seed admin credentials
if (process.env.NODE_ENV !== 'production') {
  const resetAdminHandler = (req, res) => {
    const username = 'admin';
    const password = '1234';
    const name = '관리자';
    let bcrypt;
    try { bcrypt = require('bcryptjs'); } catch {}
    const hash = bcrypt ? bcrypt.hashSync(password, 8) : password;
    const nowIso = new Date().toISOString();
    // Try update first
    db.run(
      'UPDATE users SET password = ?, name = ?, role = ?, approved = 1 WHERE username = ?'
      , [hash, name, 'admin', username]
      , function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes && this.changes > 0) {
          return res.json({ ok: true, updated: true, username });
        }
        // If not exists, insert
        db.run(
          'INSERT INTO users (username, password, name, role, approved, createdAt) VALUES (?, ?, ?, ?, ?, ?)'
          , [username, hash, name, 'admin', 1, nowIso]
          , function (e) {
            if (e) return res.status(500).json({ error: e.message });
            res.json({ ok: true, created: true, id: this.lastID, username });
          }
        );
      }
    );
  };
  app.post('/api/dev/reset-admin', resetAdminHandler);
  app.get('/api/dev/reset-admin', resetAdminHandler); // 편의를 위한 GET 지원 (개발용)
}

function requireAdmin(req, res, next) {
  if (req.session && req.session.user && req.session.user.role === 'admin') return next();
  res.status(403).json({ error: 'Admin only' });
}

// Allow both admin and manager
function requireAdminOrManager(req, res, next) {
  const role = req.session && req.session.user && req.session.user.role;
  if (role === 'admin' || role === 'manager') return next();
  res.status(403).json({ error: 'Admin or Manager only' });
}

app.get('/api/admin/users', requireAdmin, (req, res) => {
  const status = String(req.query.status || '').toLowerCase();
  let sql = 'SELECT id, username, name, role, approved, createdAt FROM users';
  if (status === 'pending') sql += ' WHERE approved = 0';
  if (status === 'approved') sql += ' WHERE approved = 1';
  db.all(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/admin/users/:id/approve', requireAdmin, (req, res) => {
  db.run('UPDATE users SET approved = 1 WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: this.changes > 0 });
  });
});

// Admin: set user role (user | manager | admin)
app.post('/api/admin/users/:id/role', requireAdmin, (req, res) => {
  const role = String(req.body?.role || '').toLowerCase();
  const allowed = ['user', 'manager', 'admin'];
  if (!allowed.includes(role)) return res.status(400).json({ error: 'Invalid role' });
  db.run('UPDATE users SET role = ? WHERE id = ?', [role, req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: this.changes > 0, role });
  });
});

// Reject a pending user: delete the row so the user must sign up again
app.post('/api/admin/users/:id/reject', requireAdmin, (req, res) => {
  db.run('DELETE FROM users WHERE id = ? AND approved = 0', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: this.changes > 0 });
  });
});

// Delete an approved member (withdraw). They will need to sign up again.
app.delete('/api/admin/users/:id', requireAdmin, (req, res) => {
  db.run('DELETE FROM users WHERE id = ? AND approved = 1 AND role != "admin"', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: this.changes > 0 });
  });
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
      count INTEGER DEFAULT 1,
      pickedBy TEXT
    )
  `);

  // 마이그레이션: 기존 DB에 pickedBy 컬럼이 없으면 추가
  db.all("PRAGMA table_info(menus)", (e, cols) => {
    if (e) return console.error('menus schema check failed:', e.message);
    const hasPickedBy = Array.isArray(cols) && cols.some(c => c.name === 'pickedBy');
    if (!hasPickedBy) {
      db.run('ALTER TABLE menus ADD COLUMN pickedBy TEXT', err => {
        if (err) console.error('failed to add pickedBy column:', err.message);
        else console.log('✅ migrated: menus.pickedBy column added');
      });
    }
  });

  db.run(`
    CREATE TABLE IF NOT EXISTS requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT,
      type TEXT,
      user TEXT,
      reason TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      options TEXT,
      count INTEGER,
      createdAt TEXT
    )
  `);

  // Users table for auth
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      name TEXT,
      role TEXT DEFAULT 'user',
      approved INTEGER DEFAULT 0,
      createdAt TEXT
    )
  `);

  // 마이그레이션: 기존 DB에 users.name 컬럼이 없으면 추가
  db.all("PRAGMA table_info(users)", (e, cols) => {
    if (e) return console.error('users schema check failed:', e.message);
    const hasName = Array.isArray(cols) && cols.some(c => c.name === 'name');
    if (!hasName) {
      db.run('ALTER TABLE users ADD COLUMN name TEXT', err => {
        if (err) console.error('failed to add users.name column:', err.message);
        else console.log('✅ migrated: users.name column added');
      });
    }
  });
});

// Seed default admin if not exists
function seedAdmin() {
  db.get('SELECT id FROM users WHERE username = ? LIMIT 1', ['admin'], (err, row) => {
    if (err) return console.error('Admin seed check failed:', err.message);
    if (row) return; // already exists

    const nowIso = new Date().toISOString();
    // Lazy-require bcryptjs to avoid crash if not installed
    let bcrypt;
    try { bcrypt = require('bcryptjs'); } catch {
      // store plaintext temporarily; warn in logs
      console.warn('bcryptjs not installed; seeding admin with plaintext password (dev only). Install bcryptjs to hash.');
    }
    const password = '1234';
    const hash = bcrypt ? bcrypt.hashSync(password, 8) : password;
    db.run(
      'INSERT INTO users (username, password, role, approved, createdAt) VALUES (?, ?, ?, ?, ?)',
      ['admin', hash, 'admin', 1, nowIso],
      function (e) {
        if (e) console.error('Admin seed failed:', e.message);
        else console.log('👑 Default admin user seeded (username: admin / password: 1234)');
      }
    );
  });
}

// Archive current menus into orders without clearing menus
function archiveMenusOnly(cb) {
  db.all('SELECT * FROM menus', (err, rows) => {
    if (err) {
      console.error('아카이브 조회 실패:', err.message);
      if (cb) cb(err);
      return;
    }
    if (!rows || !rows.length) {
      if (cb) cb(null, 0);
      return;
    }
    const nowIso = new Date().toISOString();
    const stmt = db.prepare('INSERT INTO orders(name, options, count, createdAt) VALUES (?, ?, ?, ?)');
    rows.forEach(r => stmt.run(r.name, r.options, r.count, nowIso));
    stmt.finalize((e) => {
      if (e) {
        if (cb) cb(e);
      } else {
        console.log(`🗃️ (copy) ${rows.length}건 주문 내역으로 이동`);
        if (cb) cb(null, rows.length);
      }
    });
  });
}
seedAdmin();

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
    const data = rows.map(row => {
      let parsed = [];
      try {
        parsed = row.options ? JSON.parse(row.options) : [];
      } catch (e) {
        parsed = [];
      }
      let pickedBy = [];
      try {
        pickedBy = row.pickedBy ? JSON.parse(row.pickedBy) : [];
      } catch {
        pickedBy = [];
      }
      return { ...row, options: parsed, pickedBy };
    });
    res.json(data);
  });
});

app.post('/api/menus', (req, res) => {
  const { name, options, count } = req.body;
  // Normalize incoming options to a stable structure for comparison
  const normalize = (opt) => {
    if (!opt) return {};
    try {
      const obj = typeof opt === 'string' ? JSON.parse(opt) : opt;
      const temp = obj.temp ?? obj.temperature ?? null;
      const size = obj.size ?? null;
      const extras = Array.isArray(obj.extras) ? [...obj.extras].sort() : [];
      // Keep any extra fields but ensure deterministic key order for primary keys we care about
      return { temp, size, extras };
    } catch {
      return {};
    }
  };

  const normalizedOptions = (Array.isArray(options) || (options && typeof options === 'object') || typeof options === 'string')
    ? normalize(options)
    : {};

  const displayName = (req.session && req.session.user && (req.session.user.name || req.session.user.username)) || null;

  // Try to find an existing row with same name and normalized options
  db.all('SELECT * FROM menus WHERE name = ?', [name], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    let match = null;
    for (const r of rows || []) {
      let ropt = {};
      try { ropt = r.options ? JSON.parse(r.options) : {}; } catch { ropt = {}; }
      const rnorm = normalize(ropt);
      if (JSON.stringify(rnorm) === JSON.stringify(normalizedOptions)) {
        match = r;
        break;
      }
    }

    if (match) {
      // Merge: increment count and append displayName to pickedBy (if available)
      let picked = [];
      try { picked = match.pickedBy ? JSON.parse(match.pickedBy) : []; } catch { picked = []; }
      if (displayName) picked.push(displayName);
      const nextCount = (Array.isArray(picked) ? picked.length : (match.count || 0) + 1);

      return db.run(
        'UPDATE menus SET count = ?, pickedBy = ? WHERE id = ?',
        [nextCount, JSON.stringify(picked), match.id],
        function (e2) {
          if (e2) return res.status(500).json({ error: e2.message });
          return res.json({ id: match.id, name, options: normalizedOptions, count: nextCount, pickedBy: picked });
        }
      );
    }

    // No match: insert new row
    const pickedBy = displayName ? [displayName] : [];
    db.run(
      'INSERT INTO menus (name, options, count, pickedBy) VALUES (?, ?, ?, ?)',
      [name, JSON.stringify(normalizedOptions), count || 1, JSON.stringify(pickedBy)],
      function (e3) {
        if (e3) return res.status(500).json({ error: e3.message });
        res.json({ id: this.lastID, name, options: normalizedOptions, count: count || 1, pickedBy });
      }
    );
  });
});

app.put('/api/menus/:id', (req, res) => {
  const { count, action } = req.body;
  const displayName = (req.session && req.session.user && (req.session.user.name || req.session.user.username)) || null;
  // 현재 pickedBy 불러와 업데이트
  db.get('SELECT pickedBy, count FROM menus WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Menu not found' });
    let picked = [];
    try { picked = row.pickedBy ? JSON.parse(row.pickedBy) : []; } catch { picked = []; }

    // Action 기반 업데이트: 사용자 개인 증감
    if (action === 'increment') {
      if (!displayName) return res.status(401).json({ error: 'Not authenticated' });
      picked.push(displayName);
      const nextCount = picked.length;
      return db.run(
        'UPDATE menus SET count = ?, pickedBy = ? WHERE id = ?',
        [nextCount, JSON.stringify(picked), req.params.id],
        function (e3) {
          if (e3) return res.status(500).json({ error: e3.message });
          return res.json({ success: this.changes > 0, count: nextCount, pickedBy: picked });
        }
      );
    }

    if (action === 'decrement') {
      if (!displayName) return res.status(401).json({ error: 'Not authenticated' });
      // 뒤에서부터 해당 사용자 1개 제거
      for (let i = picked.length - 1; i >= 0; i--) {
        if (picked[i] === displayName) { picked.splice(i, 1); break; }
      }
      const nextCount = picked.length;
      if (nextCount <= 0) {
        // 아무도 남지 않았으면 삭제
        return db.run('DELETE FROM menus WHERE id = ?', [req.params.id], function (eDel) {
          if (eDel) return res.status(500).json({ error: eDel.message });
          return res.json({ success: true, deleted: true });
        });
      }
      return db.run(
        'UPDATE menus SET count = ?, pickedBy = ? WHERE id = ?',
        [nextCount, JSON.stringify(picked), req.params.id],
        function (e3) {
          if (e3) return res.status(500).json({ error: e3.message });
          return res.json({ success: this.changes > 0, count: nextCount, pickedBy: picked });
        }
      );
    }

    // Fallback: count 기반 유지 (기존 호환)
    let nextPicked = picked;
    if (typeof count === 'number') {
      const prev = row.count || 0;
      if (count > prev && displayName) {
        nextPicked = [...picked, displayName];
      } else if (count < prev && picked.length > 0) {
        // 기존 로직: 마지막 제거 (호환)
        nextPicked = picked.slice(0, picked.length - 1);
      }
      if (count <= 0) {
        // 0이하로 내려가면 삭제 처리
        return db.run('DELETE FROM menus WHERE id = ?', [req.params.id], function (eDel) {
          if (eDel) return res.status(500).json({ error: eDel.message });
          return res.json({ success: true, deleted: true });
        });
      }
      return db.run(
        'UPDATE menus SET count = ?, pickedBy = ? WHERE id = ?',
        [count, JSON.stringify(nextPicked), req.params.id],
        function (e3) {
          if (e3) return res.status(500).json({ error: e3.message });
          res.json({ success: this.changes > 0 });
        }
      );
    }

    res.status(400).json({ error: 'No valid update specified' });
  });
});

app.delete('/api/menus/:id', (req, res) => {
  db.run('DELETE FROM menus WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: this.changes > 0 });
  });
});

// ✅ Orders API (history)
app.get('/api/orders', (req, res) => {
  db.all('SELECT * FROM orders ORDER BY datetime(createdAt) DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// 개별 주문 삭제
app.delete('/api/orders/:id', (req, res) => {
  db.run('DELETE FROM orders WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: this.changes > 0 });
  });
});

// Delete all orders by date key (YYYY-MM-DD) — manager/admin only
app.delete('/api/orders/by-date/:dateKey', requireAdminOrManager, (req, res) => {
  const dateKey = req.params.dateKey;
  // Basic format validation YYYY-MM-DD
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) {
    return res.status(400).json({ error: 'Invalid dateKey format' });
  }
  // createdAt is ISO8601; match both local date and raw UTC prefix for safety
  const sql = `
    DELETE FROM orders
    WHERE substr(datetime(createdAt,'localtime'),1,10) = ?
       OR substr(createdAt,1,10) = ?
  `;
  db.run(sql, [dateKey, dateKey], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, deletedCount: this.changes });
  });
});

// Update order count/options (manager/admin only)
app.put('/api/orders/:id', requireAdminOrManager, (req, res) => {
  const id = req.params.id;
  const { countDelta, newCount, options, name } = req.body || {};
  // Determine target count update SQL
  if (typeof newCount === 'number') {
    const target = Math.max(0, Math.floor(newCount));
    if (target <= 0) {
      db.run('DELETE FROM orders WHERE id = ?', [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        return res.json({ success: this.changes > 0, deleted: true });
      });
      return;
    }
    if (typeof options === 'string' && typeof name === 'string') {
      db.run('UPDATE orders SET count = ?, options = ?, name = ? WHERE id = ?', [target, options, name, id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: this.changes > 0 });
      });
    } else if (typeof options === 'string') {
      db.run('UPDATE orders SET count = ?, options = ? WHERE id = ?', [target, options, id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: this.changes > 0 });
      });
    } else {
      db.run('UPDATE orders SET count = ? WHERE id = ?', [target, id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: this.changes > 0 });
      });
    }
    return;
  }
  if (typeof countDelta === 'number') {
    // increment/decrement
    db.get('SELECT count FROM orders WHERE id = ?', [id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Not found' });
      const next = Math.max(0, Math.floor(row.count + countDelta));
      if (next <= 0) {
        db.run('DELETE FROM orders WHERE id = ?', [id], function (e) {
          if (e) return res.status(500).json({ error: e.message });
          return res.json({ success: this.changes > 0, deleted: true });
        });
        return;
      }
      const params = [next, id];
      db.run('UPDATE orders SET count = ? WHERE id = ?', params, function (e) {
        if (e) return res.status(500).json({ error: e.message });
        res.json({ success: this.changes > 0, count: next });
      });
    });
    return;
  }
  if (typeof options === 'string' && typeof name === 'string') {
    db.run('UPDATE orders SET options = ?, name = ? WHERE id = ?', [options, name, id], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: this.changes > 0 });
    });
    return;
  }
  if (typeof options === 'string') {
    db.run('UPDATE orders SET options = ? WHERE id = ?', [options, id], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: this.changes > 0 });
    });
    return;
  }
  res.status(400).json({ error: 'No valid fields to update' });
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

// ✅ Notion: 읽기 전용 이벤트 페치 API
app.get('/api/notion/events', async (req, res) => {
  try {
    const token = process.env.NOTION_TOKEN;
    const databaseId = process.env.NOTION_DATABASE_ID;
    if (!token || !databaseId) {
      return res.status(400).json({ error: 'Missing NOTION_TOKEN or NOTION_DATABASE_ID in environment' });
    }

    const { fetchNotionEvents } = require('./integrations/notion');
    const propNames = {
      title: req.query.title,
      date: req.query.date,
      type: req.query.type,
      user: req.query.user,
      reason: req.query.reason,
      status: req.query.status,
    };
    const items = await fetchNotionEvents({ token, databaseId, propNames });
    res.json({ items });
  } catch (e) {
    if (e && e.code === 'NOTION_SDK_MISSING') {
      return res.status(501).json({ error: 'Notion SDK not installed. Run: npm i @notionhq/client' });
    }
    console.error('Notion fetch failed:', e?.message || e);
    res.status(500).json({ error: 'Failed to fetch Notion events' });
  }
});

//
// ✅ 매주 목요일 12:00에 메뉴 초기화 스케줄러
//
function getMsUntilNextThursdayNoon() {
  const now = new Date();
  const target = new Date(now);
  const THURSDAY = 4; // Sun=0, Mon=1 ... Thu=4
  let diffDays = (THURSDAY - now.getDay() + 7) % 7;
  target.setDate(now.getDate() + diffDays);
  target.setHours(12, 0, 0, 0);
  // 오늘이 목요일이고 이미 12시가 지났다면 다음 주로
  if (diffDays === 0 && target.getTime() <= now.getTime()) {
    target.setDate(target.getDate() + 7);
  }
  return target.getTime() - now.getTime();
}

function archiveAndResetMenus() {
  // 1) 현재 메뉴를 orders로 아카이브
  db.all('SELECT * FROM menus', (err, rows) => {
    if (err) {
      console.error('아카이브 조회 실패:', err.message);
    } else if (rows && rows.length) {
      const nowIso = new Date().toISOString();
      const stmt = db.prepare('INSERT INTO orders(name, options, count, createdAt) VALUES (?, ?, ?, ?)');
      rows.forEach(r => stmt.run(r.name, r.options, r.count, nowIso));
      stmt.finalize();
      console.log(`🗃️ ${rows.length}건 주문 내역으로 이동`);
      // 최신 4개 주(아카이브 날짜)만 유지
      pruneOrdersKeepLatestWeeks(4);
    }
    // 2) 메뉴 비우기
    db.run('DELETE FROM menus', function (delErr) {
      if (delErr) {
        console.error('메뉴 초기화 실패:', delErr.message);
      } else {
        console.log('🧹 메뉴가 초기화되었습니다.');
      }
    });
  });
}

function scheduleWeeklyReset() {
  const delay = getMsUntilNextThursdayNoon();
  console.log('⏰ 다음 메뉴 초기화까지(ms):', delay);
  setTimeout(function run() {
    archiveAndResetMenus();
    // 다음 주 동일 시간으로 재스케줄
    setTimeout(run, 7 * 24 * 60 * 60 * 1000);
  }, delay);
}

// 매주 목요일 오전 9시에 아카이브만 하고 메뉴는 유지하고 싶다면 별도 스케줄 사용
function getMsUntilNextThursdayNine() {
  const now = new Date();
  const target = new Date(now);
  const THURSDAY = 4;
  let diffDays = (THURSDAY - now.getDay() + 7) % 7;
  target.setDate(now.getDate() + diffDays);
  target.setHours(9, 0, 0, 0);
  if (diffDays === 0 && target.getTime() <= now.getTime()) {
    target.setDate(target.getDate() + 7);
  }
  return target.getTime() - now.getTime();
}

function scheduleWeeklyArchiveAtNine() {
  const delay = getMsUntilNextThursdayNine();
  setTimeout(function run() {
    // 메뉴를 orders로만 복사(현재는 reset도 함께 하므로 필요시 분리)
    archiveAndResetMenus();
    setTimeout(run, 7 * 24 * 60 * 60 * 1000);
  }, delay);
}

// ✅ 주문내역 보관: 최대 28일(4주)
function pruneOldOrders() {
  db.run("DELETE FROM orders WHERE julianday(createdAt) < julianday('now') - 28", function (err) {
    if (err) {
      console.error('주문내역 정리 실패:', err.message);
    } else if (this.changes) {
      console.log(`🧽 ${this.changes}건 오래된 주문내역 삭제(28일 경과)`);
    }
  });
}

function msUntilNextHour(hour) {
  const now = new Date();
  const target = new Date(now);
  target.setHours(hour, 0, 0, 0);
  if (target.getTime() <= now.getTime()) target.setDate(target.getDate() + 1);
  return target.getTime() - now.getTime();
}

function scheduleDailyPruneAt(hour) {
  const delay = msUntilNextHour(hour);
  setTimeout(function run() {
    // 일 1회, 최신 4개 주만 남기도록 정리
    pruneOrdersKeepLatestWeeks(4);
    setTimeout(run, 24 * 60 * 60 * 1000);
  }, delay);
}

// ✅ 주문내역 보관: 최신 4개 "아카이브 날짜" 그룹만 유지
// createdAt이 같은 날(주간 아카이브 실행일)끼리 한 그룹으로 보고,
// 가장 최신 날짜 4개만 남기고 나머지는 삭제한다.
function pruneOrdersKeepLatestWeeks(keepCount = 4) {
  // olderDates 서브쿼리: 최신 날짜 N개를 제외한 나머지 날짜 목록
  const sql = `
    DELETE FROM orders
    WHERE date(createdAt) IN (
      SELECT d FROM (
        SELECT date(createdAt) AS d
        FROM orders
        GROUP BY d
        ORDER BY d DESC
        LIMIT -1 OFFSET ${keepCount}
      )
    )
  `;
  db.run(sql, function (err) {
    if (err) {
      console.error('주문내역 4주 유지 정리 실패:', err.message);
    } else if (this.changes) {
      console.log(`🧽 오래된 주간 아카이브 삭제: ${this.changes}건`);
    }
  });
}

//
// ✅ 서버 실행
//
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  scheduleWeeklyReset();
  scheduleWeeklyArchiveAtNine();
  // 부팅 시에도 보관 정책 적용: 최신 4개 주만 유지
  pruneOrdersKeepLatestWeeks(4);
  scheduleDailyPruneAt(3); // 매일 새벽 3시에 오래된 주문내역 정리
});

//
// ✅ Compose 메뉴 스크래핑 API (샘플)
//
app.get('/api/external/compose/menus', async (req, res) => {
  try {
    const targetUrl = (req.query.url && typeof req.query.url === 'string') ? req.query.url : 'https://composecoffee.com/menu';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    const resp = await fetch(targetUrl, { signal: controller.signal });
    clearTimeout(timeout);
    if (!resp.ok) return res.status(502).json({ error: 'Upstream fetch failed' });
    const html = await resp.text();
    const $ = cheerio.load(html);

    const absolutize = (src) => {
      try { return new URL(src, targetUrl).toString(); } catch { return src; }
    };

    const menus = [];
    const isLikelyMenuImage = (src, alt) => {
      const s = (src || '').toLowerCase();
      const a = (alt || '').toLowerCase();
      if (!src) return false;
      const banned = ['logo', 'icon', 'banner', 'sns', 'facebook', 'twitter', 'kakao', 'naver', 'youtube', 'instagram', 'arrow', 'ico', 'btn'];
      if (banned.some(b => s.includes(b) || a.includes(b))) return false;
      const okExt = /(\.png|\.jpg|\.jpeg|\.webp)(\?.*)?$/i.test(s);
      return okExt;
    };

    const pickName = (container, imgAlt) => {
      const name = $(container).find('.name, .menu-name, .title, h3, strong, figcaption').first().text().trim();
      return name || (imgAlt || '').trim();
    };

    // 1) 우선적으로 예상 컨테이너에서 추출
    $('.menu-list .menu-item, .menu-list-item, .menu__item, li.product, .product, .menuItem, .menu-item-wrap').each((_, el) => {
      const $img = $(el).find('img').first();
      const rawSrc = $img.attr('src') || $img.attr('data-src') || '';
      const alt = $img.attr('alt') || '';
      if (!isLikelyMenuImage(rawSrc, alt)) return;
      const imgSrc = absolutize(rawSrc);
      const price = $(el).find('.price, .menu-price').first().text().trim();
      const name = pickName(el, alt);
      if (name) menus.push({ name, price, image: imgSrc });
    });

    // 2) 컨테이너 탐색이 실패하면 페이지 내 이미지 대체 추출
    if (menus.length === 0) {
      $('img').each((_, img) => {
        const $img = $(img);
        const alt = ($img.attr('alt') || '').trim();
        const src = $img.attr('src') || $img.attr('data-src');
        if (!src) return;
        if (!isLikelyMenuImage(src, alt)) return;
        const name = pickName($img.parent(), alt);
        if (name) menus.push({ name, price: '', image: absolutize(src) });
      });
    }

    // 정제: 이름 공백/중복 제거
    const seen = new Set();
    const cleaned = menus
      .map(m => ({
        name: (m.name || '').replace(/\s+/g, ' ').trim(),
        price: (m.price || '').replace(/\s+/g, ' ').trim(),
        image: m.image || null
      }))
      .filter(m => m.name && !seen.has(m.name) && (seen.add(m.name) || true));

    // 과도한 데이터 방지 + 폴백 데이터
    let limited = cleaned.slice(0, 120);
    if (limited.length === 0) {
      try {
        const fallback = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'compose_fallback.json'), 'utf-8'));
        limited = fallback;
      } catch {}
    }
    res.json({ source: targetUrl, items: limited });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch compose menus' });
  }
});

//
// ✅ Admin: 메뉴 즉시 아카이브 + 초기화 트리거 (테스트/즉시 실행용)
//
app.post('/api/admin/archive-now', requireAdminOrManager, (req, res) => {
  // archiveAndResetMenus 내부에서 비동기로 처리하므로, 처리 개수를 응답으로 주도록 개선
  db.all('SELECT COUNT(*) as cnt FROM menus', (err, rows) => {
    const beforeCount = (!err && rows && rows[0]) ? rows[0].cnt : 0;
    archiveAndResetMenus();
    res.json({ ok: true, archived: beforeCount });
  });
});

// Manager/Admin: copy current menus into orders (do not clear menus)
app.post('/api/manager/archive-current', requireAdminOrManager, (req, res) => {
  archiveMenusOnly((err, count = 0) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ ok: true, archived: count });
  });
});
