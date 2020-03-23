const fs = require('fs-extra');
module.exports = {
  responce: (pDir, project, collection) => {
    let css = `${fs.writeFileSync(`${pDir}${project}/nuxt.css.collection.json`, lzw_decode(collection))}`;
    return collection;
  },
};

// Decompress an LZW-encoded string
function lzw_decode(s) {
  var dict = {};
  var data = (s + '').split('');
  var currChar = data[0];
  var oldPhrase = currChar;
  var out = [currChar];
  var code = 256;
  var phrase;
  for (var i = 1; i < data.length; i++) {
    var currCode = data[i].charCodeAt(0);
    if (currCode < 256) {
      phrase = data[i];
    } else {
      phrase = dict[currCode] ? dict[currCode] : oldPhrase + currChar;
    }
    out.push(phrase);
    currChar = phrase.charAt(0);
    dict[code] = oldPhrase + currChar;
    code++;
    oldPhrase = phrase;
  }
  return out.join('');
}
