const express = require("express");
const router = express.Router();
const REGISTRATION = require("../../Model/Registration");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

router.post(
  "/signup",
  [
    body("email", "Enter a valid email").isEmail(),
    body("name", "Name cannot be blank").exists(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const existUser = await REGISTRATION.findOne({ email: req.body.email });
    if (existUser) {
      return res.json({
        msg: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const securedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = REGISTRATION.create({
      name: req.body.name,
      email: req.body.email,
      password: securedPassword,
    });
    return res.status(200).json({
      msg: "User created successfully",
    });
  }
);
module.exports = router;
