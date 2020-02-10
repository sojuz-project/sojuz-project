/** Based on
https://holidaypirates.github.io/nucleus/demo/index.html

Usage: 
cd ~[project_folder]/project
npm install yaml
rm -R modules-doc
node modules-gen.js

Then documentation DONE!!!

*/

/**
	TODO
	validate child combinators
	validate pseudo clases
*/
const YAML = require('yaml');
const fs = require('fs');
const dir = './../frontend/modules';

const modules_doc_dir = './modules-doc';
let html_document = `<!DOCTYPE html>
<html>
<head>
<title>Sojuz global CSS documentation</title>
<link rel="stylesheet" type="text/css" href="../../doc.css">
</head>
<body>
	<div id="header">
		<div>
			<img id="logo" src="../../assets/sojuz-project-horizontal.png" />
		</div>
		<div>
			<p>Frontend manual</p>
		</div>
	</div>
	<div id="main-menu">
			<a class="active" href="../!frontend-modules-manual/frontend-modulesl.html">Frontend modules</a>
			<a href="../../css-doc/globals/!global-css-manual/global-css-manual.html">Global CSS guideline</a>
		</nav>
	</div>
	<div id="body-wrapper">
		<div id="sidebar">
			%%main-menu%%
		</div>
		<div id="body">
			%%body%%
		</div>
	</div>
</body>
</html>
`;

const body_wrap = `
	<h2>%%title%%</h2>
	<div>%%mod-menu%%</div>
	<hr>	
	<section>%%body_section%%<section>
`;

let mainMenu = {};

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
/**
	Preprocess
*/
if (!fs.existsSync(modules_doc_dir)) {
  fs.mkdirSync(modules_doc_dir);
}

/**
	Preprocess
	Create doc ditectiries from modules files
*/
walk(dir).forEach(function(file) {
  let path = file.split('/');

  // create global css subdirs
  let _path_name = modules_doc_dir + '/' + path[4];
  if (!fs.existsSync(_path_name)) {
    fs.mkdirSync(_path_name);
  }
  // create main menu
  if (!mainMenu[path[4]]) {
    mainMenu[path[4]] = [];
  }
  if (path[5].split('.')[1] == 'vue') {
    mainMenu[path[4]].push(path[5].split('.')[0]);
  }
});

/**
	Preprocess
	Create doc filed from css files
*/
walk(dir).forEach(function(file) {
  let path = file.split('/');
  if (path[5].split('.')[1] == 'vue') {
    // create global css subdirs
    let _path_name = modules_doc_dir + '/' + path[4];
    // create doc files
    let _file_name = path[5].split('.')[0];
    let _file_out = _path_name + '/' + _file_name + '.html';
    if (!fs.existsSync(_file_out)) {
      var out = html_document;
      out = out.replace('%%main-menu%%', render_main_menu(mainMenu));
      out = out.replace('%%body%%', render_body(path[4], _file_name, mainMenu));

      fs.writeFileSync(_file_out, out);
    }
    // // create src files
    // if (!fs.existsSync(css_src_doc_dir + '/' + path[4])) {
    //   fs.mkdirSync(css_src_doc_dir + '/' + path[4]);
    // }
    // fs.writeFileSync(css_src_doc_dir + '/' + path[4] + '/' + path[5], fs.readFileSync(file, 'utf8'));
  }
});

/**
	Preprocess
	Render body
*/
walk(dir).forEach(function(file) {
  // parse css comment shordcodes and create doc content
  let readGuardian = false;
  var out = '';
  var search = '';
  fs.readFileSync(file, 'utf8')
    .split(/\r?\n/)
    // eslint-disable-next-line complexity
    .forEach(function(line) {
      // ========================================
      search = line.search('SOJUZ DOC');
      search >= 0 ? (readGuardian = true) : null;
      if (readGuardian) {
        if (line.search('!SOJUZ DOC') >= 0) {
          out = renderContent(YAML.parse(out));
          readGuardian = false;
          return false;
        }
        if (line.search('SOJUZ DOC') == -1) {
          out += line + '\n';
        }
      }
    });

  let path = file.split('/');
  if (path[5].split('.')[1] == 'vue') {
    let _path_name = modules_doc_dir + '/' + path[4];
    let _file_name = path[5].split('.')[0];
    let _file_out = _path_name + '/' + _file_name + '.html';
    let content = fs.readFileSync(_file_out, 'utf8');
    content = content.replace('%%body_section%%', out);
    fs.writeFileSync(_file_out, content);
  }
});

/** 
 HELPERS
*/

/** 
 Render main menu
*/
function render_main_menu(menu) {
  var out = '<nav><ul>';
  for (const [key, value] of Object.entries(menu)) {
    out += '<li><a href="../' + key + '/' + value[0] + '.html">' + key + '</a></li>';
  }
  out += '</ul></nav>';
  return out;
}

function render_body(section, template, menu) {
  let out = body_wrap;
  out = out.replace('%%title%%', section);

  let modMenu = '<nav><ul style="display:flex">';
  menu[section].forEach(function(item) {
    if (template == item) {
      modMenu += '<li class="active"><a href="../' + section + '/' + item + '.html">' + item + '</a></li>';
    } else {
      modMenu += '<li><a href="../' + section + '/' + item + '.html">' + item + '</a></li>';
    }
  });
  modMenu += '<nav><ul>';
  out = out.replace('%%mod-menu%%', modMenu);

  return out;
}
function renderContent(data) {
  out = '<h3>' + data['@submodule'] + '</h3>';
  out += data['@description'] ? data['@description'] : '';

  out += '<table class="doc-table">';
  out += '<tr><th>Attribute name</th><th>type</th><th>default</th><th>description</th></tr>';
  out += data['@attrs'].map((el) => {
    console.log(el);
    return (
      '<tr><td>' +
      el.name +
      '</td><td>' +
      el.type +
      '</td><td>' +
      el.default +
      '</td><td>' +
      el.description +
      '</td></tr>'
    );
  });
  out += '</table>';
  return out;
}
