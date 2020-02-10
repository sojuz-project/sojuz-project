/** Based on
https://holidaypirates.github.io/nucleus/demo/index.html

Usage: 
cd ~[project_folder]/project
rm -R css-doc
node custom-css-gen-private.js

Then documentation DONE!!!

*/

/**
	TODO
	validate child combinators
	validate pseudo clases
*/

const fs = require('fs');
const dir = './frontend/css';
const assets = './frontend/assets';
const project = process.argv[2];

const css_doc_dir = './project/doc/css-doc';
const css_globals_doc_dir = './project/doc/css-doc/globals';
const css_src_doc_dir = './project/projects_archive/' + project + '/doc/src';
// const css_src_assets = './project/projects_archive/' + project + '/assets';
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

/**
	Preprocess
*/
if (!fs.existsSync(css_doc_dir)) {
  fs.mkdirSync(css_doc_dir);
}
if (!fs.existsSync(css_globals_doc_dir)) {
  fs.mkdirSync(css_globals_doc_dir);
}
if (!fs.existsSync(css_src_doc_dir)) {
  fs.mkdirSync(css_src_doc_dir);
}

/**
	Preprocess
	Render Atoms with DOC body
*/
walk(dir).forEach(function(file) {
  // parse css comment shordcodes and create doc content
  let readGuardian = false;
  let read = '';
  var out = '';
  fs.readFileSync(file, 'utf8')
    .split(/\r?\n/)
    .forEach(function(line) {
      let search = line.search('@atom');
      // start partial reading
      search > 0 ? (readGuardian = true) : null;
      if (readGuardian) {
        read += line + '\n';
        // finish partial reading
        if (line.search('}') >= 0) {
          // if (line == '}') {
          out += parseAtom(read, file);
          readGuardian = false;
          read = '';
        }
      }
    });

  let path = file.split('/');
  const _f = 3;
  const _s = 4;
  const _t = 5;
  if (path[_f] == 'global') {
    let _path_name = css_globals_doc_dir + '/' + path[_s];
    let _file_name = path[_t].split('.')[0];
    let _file_out = _path_name + '/' + _file_name + '.html';

    if (!fs.existsSync(_path_name)) {
      fs.mkdirSync(_path_name);
    }
    fs.writeFileSync(_file_out, out);

    // create src files
    // if (!fs.existsSync(css_src_doc_dir + '/' + path[_s])) {
    //   fs.mkdirSync(css_src_doc_dir + '/' + path[_s]);
    // }
    // const css_origin = fs.readFileSync(dir + '/global/' + path[_s] + '/' + path[_t], 'utf8');
    // fs.writeFileSync(css_src_doc_dir + '/' + path[_s] + '/' + path[_t], css_origin);
  }
});
// create fonts
// if (!fs.existsSync(css_src_assets)) {
//   fs.mkdirSync(css_src_assets);
// }
// if (!fs.existsSync(css_src_assets + '/fonts')) {
//   fs.mkdirSync(css_src_assets + '/fonts');
// }
// var fonts = fs.readdirSync(assets + '/fonts');
// fonts.forEach(function(font) {
//   console.log(font);
//   fs.copyFileSync(assets + '/fonts/' + font, css_src_assets + '/fonts/' + font);
// });
/** 
 Read and parse single atom
*/
function parseAtom(content, file) {
  var out = '';
  var cssGuard = false;
  var markupGuard = false;
  var exampleGuard = false;

  var name = '';
  var pseudo = '';
  var modifiers = '';
  var markup = '';
  var example = '';
  var cssBody = '';

  content.split(/\r?\n/).forEach(function(line) {
    // --------------------------------------
    if (line.search('@atom') >= 0) {
      name = line.split('@atom ')[1];
    }
    // --------------------------------------
    if (line.search('@pseudo') >= 0) {
      pseudo = line.split('@pseudo ')[1];
    }
    // --------------------------------------
    if (line.search('@modifiers') >= 0) {
      modifiers = line.split('@modifiers ')[1];
    }
    // --------------------------------------
    if (line.search('```') >= 0) {
      markupGuard = false;
    }
    if (markupGuard) {
      markup += line + '\n';
    }
    if (line.search('@markup') >= 0) {
      markupGuard = true;
    }
    // --------------------------------------
    if (line.search('```') >= 0) {
      exampleGuard = false;
    }
    if (exampleGuard) {
      example += line + '\n';
    }
    if (line.search('@example') >= 0) {
      exampleGuard = true;
    }

    // --------------------------------------
    if (cssGuard) {
      cssBody += line + '\n';
    }
    if (line.search('{') >= 0) {
      cssBody += '<span class="col--black">' + line + '</span>\n';
      cssGuard = true;
    }
    if (line.search('}') >= 0) {
      cssGuard = false;
    }
    // --------------------------------------
  });

  out += '<h3 class="atom-name">' + name + (pseudo ? '<span class="pseudo">::' + pseudo + '</span>' : '') + '</h3>';
  out += modifiers ? ' <span>+</span> <span class="modifiers">' + modifiers + '</span>' : '';
  out += '<div class="atom-body">';
  out += markup || example ? '<div style="padding-right:40px;">' : '';
  out += markup ? ' <div class="markup">' + markup + '</div>' : '';
  out += example ? ' <div class="example">' + example + '</div>' : '';
  out += markup || example ? '</div>' : '';
  out += '<pre>' + cssBody + '</pre>';
  out += '</div>';

  return out;
}
