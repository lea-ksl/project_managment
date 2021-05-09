const tasksRouter = require('express').Router();
const Project = require('../models/project');
const Task = require('../models/task');

tasksRouter.get('/', async (req, res) => {
    const auth = req.currentUser;
    if(auth) {
        try {
            const tasks = await Task.find({}).populate('project');
            if (!tasks) return res.status(404).json({ "msg": 'Pole not found' });
            req.io.emit('UPDATE', tasks);
            return res.json(tasks.map((task => task.toJSON())));
        } catch (error) {
            return res.status(403).send('Not authorized');
        }
    }
});

tasksRouter.get('/:projectid', async (req, res) => {
    const auth = req.currentUser;
    if (auth) {
        try {
            const project = await Project.findById(req.params.projectid);
            const tasks = await Task.find({projectId: project});
            if(!tasks) {
                return res.status(400).send('Tasks not found');
            }
            req.io.emit('UPDATE', tasks);
            return res.json(tasks.map((task => task.toJSON())));
        } catch (error) {
            return res.status(403).send('Not authorized');
        }
    }
})

tasksRouter.post('/', async (req, res) => {
    const auth = req.currentUser;
    if (auth) {
        try {
            const task = new Task(req.body)
            const savedTask = task.save()
            const tasks = await Task.find({});
            req.io.emit('UPDATE', tasks);
            return res.status(201).json(savedTask);
        }
        catch {
            return res.status(403).send('Not authorized');
        }
    }
})

tasksRouter.get('/edit/:id', async (req, res) => {
    const auth = req.currentUser;
    if (auth) {
        try {
            const task = await Task.findById(req.params.id);
            if(!task) {
                return res.status(400).send('Task not found');
            }
            req.io.emit('UPDATE', task);
            return res.json(task.toJSON());
        }catch (error) {
            return res.status(403).send('Not authorized'); 
        } 
    }
})

tasksRouter.patch('/edit/:id', async (req, res) => {
    const auth = req.currentUser;
    if (auth) {
        try {
            const id = req.params.id;
            const taskData = req.body;
            const task = await Task.findByIdAndUpdate(id, taskData);
            console.log('task', task )
            if (task) {
                res.send(task);
            } else {
                return res.status(400).send('Project not found');
            }
        }catch (error) {
            return res.status(403).send('Not authorized'); 
        }
    }
})


module.exports = tasksRouter;