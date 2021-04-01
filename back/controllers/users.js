const usersRouter = require('express').Router();
const User = require('../models/user');
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

usersRouter.post(
    "/",
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
        if (user) {
          res.status(400).json({ errors: [{ msg: "User already exists" }] });
        }
          user = new User({
          name,
          email,
          password,
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
      } catch (error) {
          console.log(error.message)
          res.status(500).send("Server Error")
      }
    }
  );
  
  module.exports = usersRouter;