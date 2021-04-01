const tasksRouter = require('express').Router();
const Task = require('../models/task');

tasksRouter.get('/', async (req, res) => {
    const auth = req.currentUser;
    if(auth) {
        const tasks = await Task.find({});
        req.io.emit('UPDATE', tasks);
        return res.json(tasks.map((task => task.toJSON())));
    }
    return res.status(403).send('Not authorized');
});

tasksRouter.post('/', async (req, res) => {
    const auth = req.currentUser;
    if (auth) {
        const task = new Task(req.body)
        const savedTask = task.save()
        const tasks = await Task.find({});
        req.io.emit('UPDATE', tasks);
        return res.status(201).json(savedTask);
    }
    return res.status(403).send('Not authorized');
})

module.exports = tasksRouter;