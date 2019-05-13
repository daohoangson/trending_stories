const Entities = require("html-entities").AllHtmlEntities;
const { json } = require("micro");
const Mercury = require("@postlight/mercury-parser");

module.exports = async (req, res) => {
  const { url } = await json(req);
  if (!url) return res.status(400).end();

  const entities = new Entities();

  Mercury.parse(url).then(
    parsed =>
      res.end(
        JSON.stringify({
          ...parsed,
          content: entities.decode(parsed.content)
        })
      ),
    e => {
      console.error(url, e);
      res.writeHead(500);

      if (e.message) {
        res.end(e.message);
      } else {
        res.end();
      }
    }
  );
};
