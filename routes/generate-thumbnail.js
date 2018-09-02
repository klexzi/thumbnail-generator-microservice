const Jimp = require("jimp");
const fs = require("fs");
const request = require("request");
const express = require("express");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();
const logger = require("../setup/logger");

router.post("/", authenticate, (req, res) => {
  const imageUrl = req.body.url;
  // test the url
  request.get(imageUrl, (err, response, body) => {
    if (!response) {
      res
        .status(400)
        .json({ message: "This link is broken or does not exist" })
        .end();
    } else {
      // check if the url points to an image
      const isImage = /.(png|jpeg|jpg|tif|gif|bmp)$/.test(imageUrl);
      if (!isImage) {
        res
          .status(400)
          .json({ message: "URL must point to an image" })
          .end();
      } else {
        // download the image and resize the image
        Jimp.read(imageUrl, (err, image) => {
          if (err) logger.log({ level: "error", message: err });
          image
            .resize(50, 50)
            .quality(60)
            .write("tmp.jpg");
          // send the resized image back to the client
          fs.readFile("tmp.jpg", (err, data) => {
            res
              .set("content-type", "image/jpeg")
              .status(200)
              .send(data)
              .end();
          });
          // clean up after sending the image
          fs.unlink("tmp.jpg", err => logger.log("error", err));
        });
      }
    }
  });
});

module.exports = router;
