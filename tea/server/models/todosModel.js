const db = require('../db');

const TodosModel = {
  getAll: (callback) => {
    db.all('SELECT * FROM todos', callback);
  },

  getById: (id, callback) => {
    db.get('SELECT * FROM todos WHERE id = ?', [id], callback);
  },

  add: (text, callback) => {
    db.run('INSERT INTO todos (text, completed) VALUES (?, 0)', [text], callback);
  },

  update: (id, text, completed, callback) => {
    db.run('UPDATE todos SET text = ?, completed = ? WHERE id = ?', [text, completed, id], callback);
  },

  delete: (id, callback) => {
    db.run('DELETE FROM todos WHERE id = ?', [id], callback);
  }
};

module.exports = TodosModel;
