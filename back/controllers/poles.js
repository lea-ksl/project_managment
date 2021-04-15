const polesRouter = require('express').Router();
const Pole = require('../models/pole');
const Project = require('../models/project');

polesRouter.get('/', async (req, res) => {
    const auth = req.currentUser;
    if(auth) {
        try {
            
            const poles = await Pole.find({}).populate('project');
            
            if (!poles) return res.status(404).json({ "msg": 'Project not found' })
            
            console.log("poles", poles)
            
        req.io.emit('UPDATE', poles);
        return res.json(poles.map((pole => pole.toJSON())));
    }catch (error) {
    return res.status(403).send('Not authorized');
    }
}
});

polesRouter.get('/:projectid', async (req, res) => {
    const auth = req.currentUser;
    if (auth) {
        try {
            const project = await Project.findById(req.params.projectid);
        const poles = await Pole.find({projectId : project}).populate('task');
        if(!poles) {
            return res.status(400).send('Project not found');
        }
        req.io.emit('UPDATE', poles);
        console.log("wehs2", poles)
        return res.json(poles.map((pole => pole.toJSON())));
    }catch (error) {
        return res.status(403).send('Not authorized');
        }
    }
})

polesRouter.post('/', async (req, res) => {
    //const {projectId} = req.params
    const auth = req.currentUser;
    if (auth) {
        const pole = new Pole(req.body)
        const savedPole = pole.save()
        const poles = await Pole.find({});
        req.io.emit('UPDATE', poles);
        return res.status(201).json(savedPole);
    }
    return res.status(403).send('Not authorized');
})

module.exports = polesRouter;