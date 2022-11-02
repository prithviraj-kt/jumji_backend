const mongoose = require("mongoose");

const registrationSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const registration = mongoose.model("REGISTRATION", registrationSchema);

module.exports = registration;
