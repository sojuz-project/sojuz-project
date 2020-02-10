const fs = require('fs-extra');
module.exports = {
  responce: (pDir, project, collection) => {
    let readGuardian = false;
    let out = '';
    fs.readFileSync('/app/manager/tpl/nuxt.css.tpl.js', 'utf8')
      .split(/\r?\n/)
      // eslint-disable-next-line complexity
      .forEach(function(line) {
        search = line.search('files list start tag');
        search >= 0 ? (readGuardian = true) : null;
        if (readGuardian) {
          if (line.search('files list start tag') == -1) {
            JSON.parse(collection).map((el) => {
              el.selected ? (out += `'~/css/global/${el.file}',\n`) : null;
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
    fs.writeFileSync(`${pDir}${project}/nuxt.css.js`, out, 'utf8');
    fs.writeFileSync(`${pDir}${project}/nuxt.layout.js`, `export const layout = 'default';`, 'utf8');
    return 'Pobably everything is OK';
  },
};
