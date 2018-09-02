const auth = require("../routes/auth");
const generateThumbnail = require("../routes/generate-thumbnail");
const jsonPatch = require("../routes/jsonPatch");
const error = require("../middlewares/error");

module.exports = app => {
  app.use("/api/auth", auth);
  app.use("/api/thumbnail", generateThumbnail);
  app.use("/api/patch", jsonPatch);
  app.use(error);
};
