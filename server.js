const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let tasks = []; // In-memory storage for tasks

// Get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Add a new task
app.post('/tasks', (req, res) => {
    const task = req.body;
    tasks.push(task);
    res.status(201).json(task);
});

// Update a task
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const updatedTask = req.body;
    tasks = tasks.map(task => task.id === parseInt(id) ? updatedTask : task);
    res.json(updatedTask);
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter(task => task.id !== parseInt(id));
    res.status(204).end();
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
