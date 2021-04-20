const projectsRouter = require('express').Router();
const Pole = require('../models/pole');
const Project = require('../models/project');
const User = require('../models/user');

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

        const project = await Project.findById(req.params.id).populate('poles', 'tasks');
        if(!project) {
            return res.status(400).send('Project not found');
        }
        req.io.emit('UPDATE', project);
        console.log("wehs", project)
        return res.json(project.toJSON());
    }
    return res.status(403).send('Not authorized'); 
})

/*projectsRouter.put('/:id', async (req, res) => {
    const auth = req.currentUser;
    if(auth) {
        let project = await Project.findById(req.params.id).populate('poles.pole').exec();
        if(!project) {
            return res.status(400).send('Project not found');
        }
        const pole = await project.poles.find(pole => pole._id == project);
        if (!pole) {
            return res.status(400).send('Pole not found');
        }
        try {
            const update = {
                poles: [...project.poles, {
                    pole: project,
                }]
            };
            const projectUpdate = await Project.findByIdAndUpdate(project.id, update);
            project = await (await Project.findById(req.params.id)).populate('poles.pole').exec();
            res.status(200).json({project, "msg": "Project updated"});
        } catch (err) {
            console.log(err);
            res.status(500).json({ "error": "Server error", error });
        }
    }
});*/

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