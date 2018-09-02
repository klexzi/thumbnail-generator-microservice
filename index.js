const express = require("express");
const config = require("config");
const logger = require("./setup/logger");

const app = express();

app.use(express.json());
//import all routes
require("./setup/routes")(app);
// if the json web token is not set in the environment, exit app
if (!config.get("jwtSecret")) {
  logger.error("Json Web token not set");
  process.exit(1);
}
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.write(config.get("name"));
  res.end();
});

app.listen(port, () => logger.info(`listening on port ${5000}`));
