const Entities = require('html-entities').AllHtmlEntities;
const Mercury = require("@postlight/mercury-parser");
const fs = require('fs');

const entities = new Entities();

async function parse(url) {
  const result = await Mercury.parse(url);
  const decoded = entities.decode(result.content);
  
  await fs.writeFileAsync('test.log', decoded); 
}

parse(process.argv[2]);
