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

/** /copy_project_uploads_to_wordpress */
app.get('/copy_project_uploads_to_wordpress', (req, res) => {
  const c = `rm -Rv /wordpress/wp-content/uploads && cp -Rv /app/projects_archive/${req.query.project}/wordpress/uploads /wordpress/wp-content/uploads && chown -Rv 33:33 /wordpress/wp-content/uploads`;
  runShell(c, res);
});

/** /copy_wordpress_to_project_uploads */
app.get('/copy_wordpress_to_project_uploads', (req, res) => {
  const c = `rm -Rv /app/projects_archive/${req.query.project}/wordpress/uploads && cp -Rv /wordpress/wp-content/uploads /app/projects_archive/${req.query.project}/wordpress/uploads`;
  runShell(c, res);
});

/** /delete_project */
app.get('/delete_project', (req, res) => {
  const c = `rm -Rv /app/projects_archive/${req.query.project}`;
  runShell(c, res);
});

/** /clone_project */
app.get('/clone_project', (req, res) => {
  console.log('clone', req.query.repoUrl);
  // return false;
  const c = `cd projects_archive && echo $PWD && git clone --progress ${req.query.repoUrl}`;
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

/** /sync_css */
app.get('/sync_css', (req, res) => {
  const sync_css = require('./manager/js/server/sync_css.js');
  res.send(sync_css.responce(req.query.project, req.query.collection));
});

/** /build_css_doc */
app.get('/build_css_doc', (req, res) => {
  const build_css_doc = require('./manager/js/server/build_css_doc.js');
  build_css_doc.responce(req.query.project, (data) => {
    res.send(data);
  });
});

/** /build_css_doc */
app.get('/clear_css_collection', (req, res) => {
  const clear_css_collection = require('./manager/js/server/clear_css_collection.js');
  res.send(clear_css_collection.responce(pDir, req.query.project));
});

app.get('/rebuild_css_collection', (req, res) => {
  const rebuild_css_collection = require('./manager/js/server/rebuild_css_collection.js');
  res.send(rebuild_css_collection.responce(pDir, req.query.project));
});

/** /db_local_to_project */
app.get('/db_local_to_project', (req, res) => {
  const db = `projects_archive/${req.query.project}/wordpress/backup_${req.query.project}.sql`;
  const c = `bash -c "mysqldump -hdb -uwordpress -pwordpress wordpress > ${db}"`;
  runShell(c, res);
});

/** /db_project_to_local and reindex elastic */
app.get('/db_project_to_local', (req, res) => {
  const db = `projects_archive/${req.query.project}/wordpress/backup_${req.query.project}.sql`;
  const c = `mysql -hdb -uwordpress -pwordpress wordpress < ${db} &&  wp --allow-root --path=\"/wordpress\" plugin deactivate elastic-integration && wp --allow-root --path=\"/wordpress\" plugin activate elastic-integration`;
  runShell(c, res);
});

/** /db_clear revisions */
/** TODO https://www.liquidweb.com/kb/delete-post-revisions-using-wp-cli/ */
app.get('/db_delete_revisions', (req, res) => {
  const c = `wp revisions clean -1`;
  runShell(c, res);
});

/** depreciated/reindex elastic */
app.get('/reindex-elastic', (req, res) => {
  const c = `wp plugin deactivate elastic-integration && wp plugin activate elastic-integration`;
  runShell(c, res);
});

/** /reindex elastic */
// app.get('/read_page', (req, res) => {
//   const read_page = require('./manager/js/server/clear_css_collection.js');
//   res.send(read_page.responce(page));
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
