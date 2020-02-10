const fs = require('fs-extra');
const target = '/app/projects_archive/';
const { exec } = require('child_process');
const { spawn } = require('child_process');

module.exports = {
  copy_project_files: function(attrs, callback) {
    if (fs.existsSync(`${target}${attrs.new_project}/`)) {
      callback('folder exist, exit');
    } else {
      const o = `copy from:${target}${attrs.project}/ to:${target}${attrs.new_project}/`;
      fs.copy(`${target}${attrs.project}`, `${target}${attrs.new_project}`)
        .then(() => callback({ out: o }))
        .catch((err) => callback({ err }));
    }
  },
  // save_project: function(attrs, callback) {
  //   // msg = [];
  //   if (fs.existsSync(`${target}${attrs.new_project}/`)) {
  //     callback({ err: 'project exist' });
  //   } else {
  //     const o = { out: `copy from:${target}${attrs.project}/ to:${target}${attrs.new_project}/` };
  //     fs.copy(`${target}${attrs.project}`, `${target}${attrs.new_project}`)
  //       .then(() => {
  //         // callback(o);
  //         const command = `mysqldump -hdb -uwordpress -pwordpress wordpress > ${attrs.path}`;
  //         exec(command, (err, stdout, stderr) => {
  //           if (err) {
  //             callback({ err: err });
  //           }
  //           callback({ out: stdout, err: stderr });
  //         });
  //       })
  //       .catch((err) => callback({ err: err }));
  //   }
  // },
  get_current_project: function() {
    if (!fs.existsSync(`${target}nuxt.project.js`)) {
      return { project: undefined, layout: undefined };
    } else {
      let project = `${fs.readFileSync('/app/projects_archive/nuxt.project.js')}`;
      project = `${project.split(/'/)[1]}`;
      let layout = fs.readFileSync(`${target}${project}/nuxt.layout.js`);
      layout = `${layout}`;
      let out = {
        project: project,
        layout: `${layout.split(/'/)[1]}`,
      };
      return out;
    }
  },

  import_database: function(path) {
    const command = `mysql -hdb -uwordpress -pwordpress wordpress < ${path}`;
    const { exec } = require('child_process');
    exec(command, {}, (err, stdout, stderr) => {
      if (err) {
        return;
      }
      return { stdout, stderr };
    });
  },
  export_database: function(attrs, callback) {
    // const command = `/usr/bin/mysqldump -hdb -uwordpress -pwordpress --databases wordpress > ${target}${attrs.new_project}/wordpress/backup_db.sql`;
    const child = spawn('/usr/bin/mysqldump', ['-hdb', '-uwordpress', '-pwordpress', '--databases wordpress']);
    callback({ c: child });
    // if (fs.existsSync(`${target}${attrs.new_project}`)) {
    //   fs.chmodSync(`${target}${attrs.new_project}/wordpress`, '777');
    //   console.log('1', command);
    //   try {
    //     exec(command, {}, (err, stdout, stderr) => {
    //       console.log(command);

    //       if (err) {
    //         callback({ err });
    //       }
    //       callback({ stderr, stdout });
    //     });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // } else {
    //   callback({ err: command });
    // }
  },
  create_css_config: function(attrs, callback) {
    let list = '';
    attrs.css_collection.map((el) => {
      if (el.selected) {
        list = `'/app/css/global/` + el.file + `'\n`;
      }
    });
    let css = fs.readFileSync('/app/manager/tpl/nuxt.css.tpl', 'utf8');
    css = css.replace('%%generated_css%%', list);
    fs.writeFileSync(target + attrs.new_project + '/nuxt.css.js', css);
    callback({ out: target + attrs.new_project + '/nuxt.css.js' });
  },
};
