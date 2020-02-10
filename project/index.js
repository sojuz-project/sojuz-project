/** SERVER */

const express = require('express');
const path = require('path');
const pDir = '/app/projects_archive/';
const app = express();
const fs = require('fs-extra');
const shell = require('shelljs');

app.use(express.static(path.join(__dirname)));
// app.use(express.json());
app.use('/css', express.static('/frontend_app/css'));

/** /list_projects */
app.get('/list_projects', (req, res) => {
  const list_projects = require('./manager/js/server/list_projects.js');
  res.send(list_projects.responce(pDir));
});

/** /get_project */
app.get('/get_project', (req, res) => {
  const get_project = require('./manager/js/server/get_project.js');
  res.send(get_project.responce(pDir, req.query.project));
});

/** /set_project */
app.get('/set_project', (req, res) => {
  const set_project = require('./manager/js/server/set_project.js');
  res.send(set_project.responce(pDir, req.query.project));
});

/** /copy_project */
app.get('/copy_project', (req, res) => {
  const c = `cp -Rv /app/projects_archive/${req.query.project} /app/projects_archive/${req.query.new_project}`;
  runShell(c, res);
});

/** /delete_project */
app.get('/delete_project', (req, res) => {
  const c = `rm -Rv /app/projects_archive/${req.query.project}`;
  runShell(c, res);
});

/** /clone_project */
app.get('/clone_project', (req, res) => {
  const c = `git clone --progress ${req.query.repoUrl}`;
  runShell(c, res);
});

/** /get_css_collection */
app.get('/get_css_collection', (req, res) => {
  const get_css_collection = require('./manager/js/server/get_css_collection.js');
  res.send(get_css_collection.responce(pDir, req.query.project));
});

/** /set_css_collection */
app.get('/set_css_collection', (req, res) => {
  const set_css_collection = require('./manager/js/server/set_css_collection.js');
  res.send(set_css_collection.responce(pDir, req.query.project, req.query.collection));
});

/** /build_preview */
app.get('/build_preview', (req, res) => {
  const build_preview = require('./manager/js/server/build_preview.js');
  res.send(build_preview.responce(pDir, req.query.project, req.query.collection));
});

/** /get_layout */
app.get('/get_layout', (req, res) => {
  const get_layout = require('./manager/js/server/get_layout.js');
  res.send(get_layout.responce(pDir, req.query.project));
});

/** /get_layout */
app.get('/set_layout', (req, res) => {
  const set_layout = require('./manager/js/server/set_layout.js');
  res.send(set_layout.responce(pDir, req.query.project, req.query.layout));
});

// app.get('/export_db', (req, res) => {
//   const project = req.query.project;
//   res.setHeader('Content-Type', 'text/html; charset=utf-8');
//   res.setHeader('Transfer-Encoding', 'chunked');
//   const db = `projects_archive/${project}/wordpress/backup_${project}.sql`;
//   // const command = `bash -c "mysqldump -hdb -uwordpress -pwordpress wordpress > ${db}"`;
//   const command = `ls`;
//   console.log(command);
//   try {
//     var child = shell.exec(command, { async: true }, () => {
//       res.end();
//       res.send('finished');
//     });
//     child.stdout.on('data', function(data) {
//       res.write(data);
//       console.log(data);
//     });
//     child.stderr.on('data', function(data) {
//       res.write(data);
//       console.log(data);
//     });
//   } catch (error) {
//     console.log(error);
//     res.end();
//   }
// });

// app.post('/loaddb', (req, res) => {
//   const db = `projects_archive/${req.body.project}/wordpress/backup_${req.body.project}.sql`;
//   if (fs.existsSync(db)) {
//     res.send(sh.import_database(db));
//   } else {
//     res.send(`Path: ${db} not found!`);
//   }
// });

// app.post('/set_customize_layout', (req, res) => {
//   const content = `export const layout = 'customize';\n`;
//   fs.writeFileSync(`projects_archive/${req.body.project}/nuxt.layout.js`, content);
//   res.send(`${req.body.project}`);
// });
// app.get('/', (req, res) => {
//   // res.sendFile(path.join(, 'doc/css-doc/globals'));
// });

const runShell = (c, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Transfer-Encoding', 'chunked');
  var child = shell.exec(c, { async: true }, () => {
    res.end();
  });
  child.stdout.on('data', (data) => res.write(data));
  child.stderr.on('data', (data) => res.write(data));
};

app.listen('8010');
