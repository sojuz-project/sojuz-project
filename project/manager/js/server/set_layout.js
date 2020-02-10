const fs = require('fs-extra');
module.exports = {
  responce: (pDir, project, layout) => {
    const content = `export const layout = '${layout}';`;
    fs.writeFileSync(`${pDir}${project}/nuxt.layout.js`, content);
    return project;
  },
};
