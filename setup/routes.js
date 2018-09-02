const auth = require("../routes/auth");
const generateThumbnail = require("../routes/generate-thumbnail");
const jsonPatch = require("../routes/jsonPatch");
const error = require("../middlewares/error");

module.exports = app => {
  app.use("/api/auth", auth);
  app.use("/api/thumbnail", generateThumbnail);
  app.use("/api/patch", jsonPatch);
  // Catch 404 and forward to error handler
  app.use((req, res) => {
    res.status(404).send("Endpoint not found");
  });
  app.use(error);
};
