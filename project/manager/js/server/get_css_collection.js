const fs = require('fs-extra');
module.exports = {
  responce: (pDir, project) => {
    if (!fs.existsSync(`${pDir}${project}`)) {
      return JSON.stringify({ project_not_exist: true });
    } else {
      let content = `${fs.readFileSync(`${pDir}${project}/nuxt.css.collection.json`)}`;
      return content;
    }
  },
};
