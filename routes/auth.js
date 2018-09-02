const express = require("express");
const Joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");
const router = express.Router();

const validateUser = user => {
  const schema = {
    username: Joi.string()
      .min(5)
      .max(100)
      .required(),
    password: Joi.string()
      .min(8)
      .max(100)
      .required()
  };
  return Joi.validate(user, schema);
};

const generateAuthToken = user => {
  return jwt.sign(user, config.get("jwtSecret"));
};

router.post("/", (req, res) => {
  // validate input
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //if no error generate token and send back to client
  const token = generateAuthToken(req.body);
  if (token)
    return res
      .status(200)
      .header("x-auth-token", token)
      .send("logged in...");
});
module.exports = router;
