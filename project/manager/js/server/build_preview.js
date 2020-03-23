const fs = require('fs-extra');
module.exports = {
  responce: (pDir, project, collection) => {
    let readGuardian = false;
    let out = '';

    fs.readFileSync('/app/manager/tpl/nuxt.css.tpl.js', 'utf8')
      .split(/\r?\n/)

      .forEach(function(line) {
        search = line.search('files list start tag');
        search >= 0 ? (readGuardian = true) : null;
        if (readGuardian) {
          if (line.search('files list start tag') == -1) {
            JSON.parse(lzw_decode(collection)).map((el) => {
              el.selected ? (out += `'~/css/global/${el.file}',\n`) : null;
              console.log(el);
            });
          }
          if (line.search('!files list stop tag') >= 0) {
            out += `    /** !files list stop tag */\n`;
            readGuardian = false;
            return false;
          }
        }
        out += `${line}\n`;
      });
    console.log(out);
    fs.writeFileSync(`${pDir}${project}/nuxt.css.js`, out, 'utf8');
    fs.writeFileSync(`${pDir}${project}/nuxt.layout.js`, `export const layout = 'default';`, 'utf8');

    if (!fs.existsSync(`${pDir}${project}`)) {
      return JSON.stringify({ project_not_exist: true });
    } else {
      const out_collection = [];
      walk(`/frontend_app/css/global`).forEach(function(file) {
        // parse css comment shordcodes and create doc content
        const a = file.split('/');
        const o = { file: `${a[4]}/${a[5]}`, group: a[4], name: a[5].slice(0, -4) };
        out_collection.push(o);
      });

      let content = `${fs.readFileSync(`${pDir}${project}/nuxt.css.collection.json`)}`;

      const collectionMap = out_collection.reduce((acc, curr) => {
        acc[curr.file] = curr;
        return acc;
      }, {});
      const contentMap = JSON.parse(lzw_decode(collection)).reduce((acc, curr) => {
        acc[curr.file] = curr;
        return acc;
      }, {});

      const out = Object.values({ ...collectionMap, ...contentMap });
      let css = `${fs.writeFileSync(`${pDir}${project}/nuxt.css.collection.json`, JSON.stringify(out))}`;
    }

    return 'Pobably everything is OK';
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

var walk = function(dir) {
  var results = [];
  var list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    var stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      /* Recurse into a subdirectory */
      results = results.concat(walk(file));
    } else {
      /* Is a file */
      results.push(file);
    }
  });
  return results;
};
