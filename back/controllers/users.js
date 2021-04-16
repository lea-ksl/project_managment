const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (req,res) => {
  const auth = req.currentUser;
  if(auth) {
    const users = await User.find({});
    req.io.emit('UPDATE', users);
    return res.json(users.map((user => user.toJSON())));
  }
});

usersRouter.get('/:user', async (req, res) => {
  const auth = req.currentUser;
  if (auth) {
      try {
          const pole = await Pole.findById(req.params.user);
      const user = await Pole.findById(pole);
      if(!user) {
          return res.status(400).send('Project not found');
      }
      req.io.emit('UPDATE', user);
      console.log("wehs2", user)
      return res.json(user.toJSON());
  }catch (error) {
      return res.status(403).send('Not authorized');
      }
  }
})

usersRouter.post('/', async (req, res)=> {
  const auth = req.currentUser;
  if (auth){
    const errors = [];
    let { name, email, password} = req.body;
    let user;
    user = await User.findOne({ email });
    if(user) {
        errors.push({ "msg": "user already exists" });
        return res.status(400).json({ data: errors })
    }
    if(!name){
        errors.push({"msg": "please enter your name"});
    }
    if(!email){
        errors.push({"msg": "please enter your email"});
    }
    if(!password){
        errors.push({"msg": "please enter your password"});
    }
    if(errors.length > 0) {
        return res.status(400).send({
            data: errors
        });
    }
      user = new User(req.body)
      try {
        const savedUser = user.save()
        const users = await User.find({});
        req.io.emit('UPDATE', users);
        return res.status(201).send(savedUser);
      } catch (err) {
        res.status(500).send({"msg": "Server error"});
      }
      
  }
  return res.status(403).send('Not authorized')
  
});

  module.exports = usersRouter;