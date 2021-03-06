const fs = require('fs-extra');
/* collection read frontend/css/global files */
module.exports = {
  responce: (pDir, project) => {
    const tpl = fs.readFileSync('/app/manager/tpl/nuxt.css.tpl.js', 'utf8');
    fs.writeFileSync(`${pDir}${project}/nuxt.css.js`, tpl);
    if (!fs.existsSync(`${pDir}${project}`)) {
      return JSON.stringify({ project_not_exist: true });
    } else {
      const collection = [];
      walk(`/frontend_app/css/global`).forEach(function(file) {
        // parse css comment shordcodes and create doc content
        console.log(file);
        const a = file.split('/');
        const o = { file: `${a[4]}/${a[5]}`, group: a[4], name: a[5].slice(0, -4) };
        collection.push(o);
      });
      let css = `${fs.writeFileSync(`${pDir}${project}/nuxt.css.collection.json`, JSON.stringify(collection))}`;
      return collection;
    }
  },
};

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
