const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (req, res)=> {
  const auth = req.currentUser;
  if (auth){
      const user = new User(req.body)
      const savedUser = user.save()
      const users = await User.find({});
      req.io.emit('UPDATE', users);
      return res.status(201).json(savedUser);
  }
  return res.status(403).send('Not authorized')
  
});


  /*usersRouter.post(
    "/login",
    [
      check("name", "Name is required").not().isEmpty(),
      check("email", "Please Enter a valid email"),
      check(
        "password",
        "Please enter a password with 6 or more character"
      ).isLength({ min: 6 }),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { name, email, password } = req.body;
      try {
        let user = await User.findOne({ email });
        if(!user) {
          errors.push({ "msg": "Invalid credidentials" });
          return res.status(400).json({ data: errors });
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
            return res.status(400).json({
                data: errors
            });
        }

        if(user.password !== password) {
            errors.push({ "msg": "Invalid credidentials" });
            return res.status(400).json({ data: errors });
        }

        const payload = {
            user: {
                id: user.id
            }
        }
      } catch (error) {
          console.log(error.message)
          res.status(500).send("Server Error")
      }
    }
  )*/
  
  module.exports = usersRouter;