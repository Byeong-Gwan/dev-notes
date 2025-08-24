const express = require('express');
const router = express.Router();
const TodosController = require('../controllers/todosController');

router.get('/', TodosController.getTodos);
router.post('/', TodosController.addTodo);
router.put('/:id', TodosController.updateTodo);
router.delete('/:id', TodosController.deleteTodo);

module.exports = router;
