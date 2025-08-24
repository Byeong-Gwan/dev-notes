const TodosModel = require('../models/todosModel');

const TodosController = {
  getTodos: (req, res) => {
    TodosModel.getAll((err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  },

  addTodo: (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Text is required' });

    TodosModel.add(text, function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, text, completed: 0 });
    });
  },

  updateTodo: (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;

    TodosModel.update(id, completed, function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: true });
    });
  },

  deleteTodo: (req, res) => {
    const { id } = req.params;

    TodosModel.delete(id, function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ deleted: true });
    });
  }
};

module.exports = TodosController;
