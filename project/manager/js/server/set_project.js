const fs = require('fs-extra');
module.exports = {
  responce: (pDir, project) => {
    if (!fs.existsSync(`${pDir}${project}`)) {
      return { project_not_exist: true };
    } else {
      /* 
          Update /app/projects_archive/nuxt.project.js 
        */
      content = `export const SOJUZ_PROJECT = '${project}';\n`;
      fs.writeFileSync(`${pDir}nuxt.project.js`, content);

      /*
        Read /app/projects_archive/[new_project]/nuxt.layout.js
      */
      let layout = `${fs.readFileSync(`${pDir}${project}/nuxt.layout.js`)}`;
      layout = `${layout}`.split(/'/)[1];

      /*
        Read /app/projects_archive/[new_project]/nuxt.css.collection.json
      */
      let css_collection = `${fs.readFileSync(`${pDir}${project}/nuxt.css.collection.json`)}`;
      css_collection = JSON.parse(css_collection);

      return { project, layout, css_collection };
    }
  },
};
