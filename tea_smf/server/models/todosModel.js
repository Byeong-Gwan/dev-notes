const db = require('../db');

const TodosModel = {
  getAll: (callback) => {
    db.all('SELECT * FROM todos', callback);
  },

  add: (text, callback) => {
    db.run('INSERT INTO todos (text, completed) VALUES (?, 0)', [text], callback);
  },

  update: (id, completed, callback) => {
    db.run('UPDATE todos SET completed = ? WHERE id = ?', [completed, id], callback);
  },

  delete: (id, callback) => {
    db.run('DELETE FROM todos WHERE id = ?', [id], callback);
  }
};

module.exports = TodosModel;
