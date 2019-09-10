const mongoose = require("mongoose");
const validUrl = require("valid-url");
const UrlShorten = mongoose.model("UrlShorten");
const shortid = require("shortid");
const errorUrl = 'http://localhost/error';
module.exports = app => {
  app.get("/:code", async (req, res) => {
    const urlCode = req.params.code;
    const item = await UrlShorten.findOne({ urlCode: urlCode });
    if (item) {
      return res.redirect(item.originalUrl);
    } else {
      return res.redirect(errorUrl);
    }
  });
  app.get("/api/getAll", async (req, res) => {
    const urlCode = req.params.code;
    const items = await UrlShorten.find({});
    console.dir(items);
    if (items) {

      return res.json(items);
    } else {
      return res.redirect(errorUrl);
    }
  });
  app.post("/api/item", async (req, res) => {
    const { originalUrl, shortBaseUrl, lat, lng } = req.body;
    console.log(shortBaseUrl);
    if (validUrl.isUri(shortBaseUrl)) {
    } else {
      return res
        .status(401)
        .json(
          "Invalid Base Url"
        );
    }

    const urlCode = shortid.generate();
    const updatedAt = new Date();
    if (validUrl.isUri(originalUrl)) {
      console.log(originalUrl);
      try {
        const item = await UrlShorten.findOne({ originalUrl: originalUrl });
        if (item) {
          console.log(item.count);
          item.count = item.count + 1;
          item.lat = item.lat;
          item.lng = item.lng;
          await item.save();
          res.status(200).json(item);
        } else {
          shortUrl = shortBaseUrl + "/" + urlCode;
          count = 0;

          const item = new UrlShorten({
            originalUrl,
            shortUrl,
            urlCode,
            updatedAt,
            lat,
            lng,
            count
          });

          console.log('Print new item');
          console.log(item);
          await item.save();
          res.status(200).json(item);
        }
      } catch (err) {
        console.error(err);
        res.status(401).json("Invalid User Id");
      }
    } else {
      return res
        .status(401)
        .json(
          "Invalid Original Url"
        );
    }
  });
};