const jsonPatch = require("json-patch");
const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");

router.post("/", authenticate, (req, res) => {
  const { data, patch } = req.body;
  if (!data || !patch) {
    res.status(400).send("Invalid Parameters");
  } else {
    try {
      const result = jsonPatch.apply(data, patch);
      res.status(200).json({ message: "Patched Succesfully", result });
    } catch (err) {
      res.status(400).send(`Something failed due to ${err.message}`);
    }
  }
});

module.exports = router;
