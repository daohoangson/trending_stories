const FeedParser = require("feedparser");
const request = require("request");

const req = request("https://tuoitre.vn/rss/tin-moi-nhat.rss");
// const req = request("https://vnexpress.net/rss/tin-moi-nhat.rss");
const fp = new FeedParser();

req.on("error", e => console.error(e));

req.on("response", function(res) {
  const resp = this;

  if (res.statusCode !== 200) {
    this.emit("error", new Error("Bad status code"));
    return;
  }

  resp.pipe(fp);
});

fp.on("error", e => console.error(e));

fp.on("readable", function() {
  const feed = this;

  var item;
  while ((item = feed.read())) {
    console.log(Math.floor(item.date.getTime() / 1000), item.link);
  }
});
