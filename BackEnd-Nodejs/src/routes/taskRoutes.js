const express = require('express');
const router = express.Router();
const taskController = require('../controllers/projectController'); // Assuming the controller filename hasn't changed

// CRUD routes
router.post('/tasks', taskController.createTask);
router.get('/tasks', taskController.getAllTasks);
router.get('/tasks/:id', taskController.getTaskById);
router.put('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;
