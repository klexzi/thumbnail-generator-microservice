const express = require("express");
const config = require("config");
const logger = require("./setup/logger");

const app = express();

// if the json web token is not set in the environment, exit app
if (!config.get("jwtSecret")) {
  logger.error("Json Web token not set");
  process.exit(1);
}

app.use(express.json());
//import all routes
require("./setup/routes")(app);

const port = process.env.PORT || 5000;
app.listen(port, () => logger.info(`listening on port ${5000}`));
