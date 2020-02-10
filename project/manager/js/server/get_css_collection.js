const fs = require('fs-extra');
module.exports = {
  responce: (pDir, project) => {
    let content = `${fs.readFileSync(`${pDir}${project}/nuxt.css.collection.json`)}`;
    return content;
  },
};
