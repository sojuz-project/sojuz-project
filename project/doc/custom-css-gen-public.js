/** Based on
https://holidaypirates.github.io/nucleus/demo/index.html

Usage: 
cd ~[project_folder]/project
rm -R css-doc
node custom-css-gen.js

Then documentation DONE!!!

*/

/**
	TODO
	validate child combinators
	validate pseudo clases
*/

const fs = require('fs');
const dir = './frontend/css';
const project = process.argv[2];

const css_doc_dir = './project/doc/css-doc';
const css_globals_doc_dir = './project/doc/css-doc/globals';
const css_src_doc_dir = './project/doc/css-doc/src';
let html_document = `<!DOCTYPE html>
<html>
<head>
<title>Sojuz global CSS documentation</title>
<link rel="stylesheet" type="text/css" href="../../../doc.css">
<link rel="stylesheet" type="text/css" href="%%dynamic_css%%">
</head>
<body>
<div id="main-wrapper">
  <div id="page-wrapper">
    <div id="header">
      <div class="logo">
        <div>
          <img id="logo" src="../../../assets/sojuz-project-horizontal.png" />
        </div>
        <div>
          <p>Frontend manual</p>
        </div>
      </div>
      <div class="hamburger" onclick="work_menu()"><div></div></div>
    </div>
    <div id="main-menu">
      <nav>
        <a href="../../../modules-doc/!frontend-modules-manual/frontend-modulesl.html">Frontend modules</a>
        <a class="active" href="../!global-css-manual/global-css-manual.html">Global CSS guideline</a>
        <a href="../../../templates/graphql-query.html">Blocks</a>
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
  </div>
  <div id="work-wrapper"></div>
</div>
<div id="class-collection"></div>
</body>
<script>
  var group = "%%file_group%%";
  var name = "%%file_name%%";
</script>
<script src="../../../dot.js"></script>
<script src="../../../dot-tpl.js"></script>
<script src="../../../../projects_archive/weblanding/config_css_collection.js"></script>
<script src="../../../css-scripts.js"></script>
</html>
`;

const body_wrap = `
	<h1 class="doc-body-title">%%title%%</h1>
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
	Create doc ditectiries from css files
*/
walk(dir).forEach(function(file) {
  let path = file.split('/');
  if (path[3] == 'global') {
    // create global css subdirs
    let _path_name = css_globals_doc_dir + '/' + path[4];
    if (!fs.existsSync(_path_name)) {
      fs.mkdirSync(_path_name);
    }
    // create main menu
    if (!mainMenu[path[4]]) {
      mainMenu[path[4]] = [];
    }
    mainMenu[path[4]].push(path[5].split('.')[0]);
  }
});

/**
	Preprocess
	Create doc filed from css files
*/
walk(dir).forEach(function(file) {
  let path = file.split('/');
  if (path[3] == 'global') {
    // create global css subdirs
    let _path_name = css_globals_doc_dir + '/' + path[4];
    // create doc files
    let _file_name = path[5].split('.')[0];
    let _file_out = _path_name + '/' + _file_name + '.html';
    if (!fs.existsSync(_file_out)) {
      var out = html_document;

      out = out.replace('%%file_group%%', path[4]);
      out = out.replace('%%file_name%%', _file_name);
      out = out.replace('%%main-menu%%', render_main_menu(mainMenu));
      out = out.replace('%%body%%', render_body(path[4], _file_name, mainMenu));

      fs.writeFileSync(_file_out, out);
    }
    // create src files
    if (!fs.existsSync(css_src_doc_dir + '/' + path[4])) {
      fs.mkdirSync(css_src_doc_dir + '/' + path[4]);
    }
    fs.writeFileSync(css_src_doc_dir + '/' + path[4] + '/' + path[5], fs.readFileSync(file, 'utf8'));
  }
});

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
  if (path[3] == 'global') {
    let _path_name = css_globals_doc_dir + '/' + path[4];
    let _file_name = path[5].split('.')[0];
    let _file_out = _path_name + '/' + _file_name + '.html';
    let content = fs.readFileSync(_file_out, 'utf8');
    content = content.replace('%%body_section%%', out);
    content = content.replace('%%dynamic_css%%',  '../../../css-doc/src/' + path[4] + '/' + path[5]);
    fs.writeFileSync(_file_out, content);
  }
});

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

  let modMenu = '<nav id="css-submenu"><ul>';
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

function slugify(string) {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
  const p = new RegExp(a.split('').join('|'), 'g');

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}
