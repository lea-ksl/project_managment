const polesRouter = require('express').Router();
const Pole = require('../models/pole');
const Project = require('../models/project');

polesRouter.get('/:projectid', async (req, res) => {
    const {projectId} = req.params.id
    const auth = req.currentUser;
    if(auth) {
        try {
            const projectExists = await Project.findById(projectId)
        
            if (!projectExists) return res.status(404).json({ msg: 'Project not found' })
            if (projectExists.author.toString() !== req.user.id) {
              return res.status(401).json({ msg: 'Invalid access' })
            }
        const poles = await Pole.find({projectId});
        req.io.emit('UPDATE', poles);
        return res.json(poles.map((pole => pole.toJSON())));
    }catch (error) {
    return res.status(403).send('Not authorized');
    }
}
});

polesRouter.post('/:projectid', async (req, res) => {
    const {projectId} = req.params
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