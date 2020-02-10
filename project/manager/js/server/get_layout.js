const fs = require('fs-extra');
module.exports = {
  responce: (pDir, project) => {
    let layout = fs.readFileSync(`${pDir}${project}/nuxt.layout.js`);
    layout = `${layout}`.split(/'/)[1];
    return layout;
  },
};
