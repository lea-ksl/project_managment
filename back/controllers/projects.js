const projectsRouter = require('express').Router();
const Project = require('../models/project');

projectsRouter.get('/', async (req, res) => {
    const auth = req.currentUser;
    if (auth){
        const projects = await Project.find({}).populate('user');
        req.io.emit('UPDATE', projects);
        return res.json(projects.map((project => project.toJSON())));
    }
    return res.status(403).send('Not authorized');  
});

projectsRouter.get('/:id', async (req, res) => {
    const auth = req.currentUser;
    if (auth) {
        const project = await Project.findById(req.params.id).populate('tasks');
        if(!project) {
            return res.status(400).send('Project not found');
        }
        req.io.emit('UPDATE', project);
        return res.json(project.toJSON());
    }
    return res.status(403).send('Not authorized'); 
})

projectsRouter.get('/edit/:id', async (req, res) => {
    const auth = req.currentUser;
    if (auth) {
        try {
            const project = await Project.findById(req.params.id).populate('tasks');
            if(!project) {
                return res.status(400).send('Project not found');
            }
            req.io.emit('UPDATE', project);
            return res.json(project.toJSON());
        }catch (error) {
            return res.status(403).send('Not authorized'); 
        } 
    }
})

projectsRouter.patch('/edit/:id', async (req, res) => {
    const auth = req.currentUser;
    if (auth) {
        try {
            const id = req.params.id;
            const projectData = req.body;
            const project = await Project.findByIdAndUpdate(id, projectData);
            if (project) {
                res.send(project);
            } else {
                return res.status(400).send('Project not found');
            }
        }catch (error) {
            return res.status(403).send('Not authorized'); 
        } 
    }
})

projectsRouter.post('/', async (req, res)=> {
    const auth = req.currentUser;
    if (auth){
        const project = new Project(req.body)
        const savedProject = project.save()
        const projects = await Project.find({});
        req.io.emit('UPDATE', projects);
        return res.status(201).json(savedProject);
    }
    return res.status(403).send('Not authorized')
});


module.exports = projectsRouter;