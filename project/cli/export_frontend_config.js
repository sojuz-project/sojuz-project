console.log('Export frontend config to: ' + process.argv[2] + ' project');

const fs = require('fs');

const dir = './frontend/css';
const output_dir = './project/projects_archive/' + process.argv[2] + '/';
const res = [];

if (!fs.existsSync(output_dir + '/doc')) {
  fs.mkdirSync(output_dir + '/doc');
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
  // console.log(results);
  return results;
};

/** Parse to object */
walk(dir).map((path) => {
  const _f = 3;
  const _s = 4;
  const _t = 5;
  const p = path.split('/');
  if (p[_f] == 'global') {
    res.push({
      file: p[_s] + '/' + p[_t],
      group: p[_s],
      name: p[_t].split('.')[0],
      selected: false,
    });
  }
});

let readGuardian = false;
fs.readFileSync(output_dir + 'nuxt.css.js', 'utf8')
  .split(/\r?\n/)
  
  .forEach(function(line) {
    // ========================================
    search = line.search('files list start tag');
    search >= 0 ? (readGuardian = true) : null;
    if (readGuardian) {
      if (line.search('!files list stop tag') >= 0) {
        readGuardian = false;
        return false;
      }
      if (line.search('files list start tag') == -1) {
        res.filter((obj) => {
          if ('css/global/' + obj.file === line.match(/'([^']+)'/)[1].substring(5)) {
            obj.selected = true;
          }
        });
        // element.selected = true;
      }
    }
  });

var outRes = JSON.stringify(res);
fs.writeFile(
  output_dir + 'doc/config_css_collection.js',
  'var localStorageToken = "' +
    Math.random()
      .toString(36)
      .substring(4) +
    '";  var css_collection = ' +
    outRes,
  'utf8',
  function(err) {
    if (err) {
      console.log('An error occured while writing JSON Object to File.');
      return console.log(err);
    }
  }
);

fs.writeFile(output_dir + 'doc/config_css_collection.json', outRes, 'utf8', function(err) {
  if (err) {
    console.log('An error occured while writing JSON Object to File.');
    return console.log(err);
  }
  console.log('CSS settings file has been saved.');
});

// change index.html
var indexContent = fs.readFileSync('./project/index.template.html', 'utf8');
indexContent = indexContent.replace('%%export_collection%%', process.argv[2]);
fs.writeFileSync('./project/index.html', indexContent);
