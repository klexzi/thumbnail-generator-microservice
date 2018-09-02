const logger = require("../setup/logger");

module.exports = (err, req, res) => {
  logger.error(err.mesage);
  res.status(500).send("something failesd");
};
