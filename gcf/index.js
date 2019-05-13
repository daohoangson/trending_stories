"use strict";

function proxy(req, res) {
  const https = require("https");

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
        console.log(
          "url=%s, status=%d, length=%d",
          url,
          got.statusCode,
          length
        );
        res.end();
      });
    })
    .on("error", e => {
      console.error(url, e);
      res.status(500);

      if (e.message) {
        res.send(e.message);
      } else {
        res.end();
      }
    });
}

exports.proxy128 = proxy;
exports.proxy256 = proxy;
exports.proxy512 = proxy;

function parse(req, res) {
  const Entities = require("html-entities").AllHtmlEntities;
  const Mercury = require("@postlight/mercury-parser");

  const { url } = req.body;
  if (!url) return res.status(400).end();

  const entities = new Entities();

  Mercury.parse(url).then(
    parsed => res.send({ ...parsed, content: entities.decode(parsed.content) }),
    e => {
      console.error(url, e);
      res.status(500);

      if (e.message) {
        res.send(e.message);
      } else {
        res.end();
      }
    }
  );
}

exports.parse256 = parse;
exports.parse512 = parse;
exports.parse1024 = parse;
