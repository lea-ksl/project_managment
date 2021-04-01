const polesRouter = require('express').Router();
const Pole = require('../models/pole');

polesRouter.get('/', async (req, res) => {
    const auth = req.currentUser;
    if(auth) {
        const poles = await Pole.find({});
        req.io.emit('UPDATE', poles);
        return res.json(poles.map((pole => pole.toJSON())));
    }
    return res.status(403).send('Not authorized');
});

polesRouter.post('/', async (req, res) => {
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