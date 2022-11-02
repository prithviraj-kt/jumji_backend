const express = require("express");
const router = express.Router();
const REGISTRATION = require("../../Model/Registration");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const existUser = await REGISTRATION.findOne({ email: req.body.email });
    if (!existUser) {
      return res.json({
        msg: "User does not exists",
      });
    }
    const passwordCompare = await bcrypt.compare(
      req.body.password,
      existUser.password
    );

    if (!passwordCompare) {
      return res.status(400).json({ msg: "Incorrect password" });
    }
    return res.status(200).json({
      msg: "Authenticated",
      id: existUser._id,
    });
  }
);
module.exports = router;
