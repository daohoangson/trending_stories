"use strict";

const https = require("https");

function proxy (req, res) {
  const { url } = req.body;
  if (!url) return res.status(400).end();

  https
    .get(url, got => {
      res.status(got.statusCode);
      res.set(got.headers);

      let length = 0;
      got.on("data", chunk => {
        length += chunk.length;
        res.write(chunk);
      });

      got.on("end", () => {
        console.log('url=%s, status=%d, length=%d', url, got.statusCode, length);
        res.end();
      });
    })
    .on("error", e => {
      console.error(url, e);

      if (e.message) {
        res.send(e.message);
      } else {
        res.end();
      }
    });
};

exports.proxy128 = proxy;
exports.proxy256 = proxy;
exports.proxy512 = proxy;
