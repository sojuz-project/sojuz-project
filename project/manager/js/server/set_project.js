const fs = require('fs-extra');
module.exports = {
  responce: (pDir, project) => {
    /* 
      Update /app/projects_archive/nuxt.project.js 
    */
    let content = `${fs.readFileSync(`${pDir}nuxt.project.js`)}`;
    const old_project = `${content}`.split(/'/)[1];
    content = content.replace(old_project, project);
    fs.writeFileSync(`${pDir}nuxt.project.js`, content);
    /*
       Read /app/projects_archive/[new_project]/nuxt.layout.js
    */
    let layout = `${fs.readFileSync(`${pDir}${project}/nuxt.layout.js`)}`;
    layout = `${layout}`.split(/'/)[1];

    return { project, layout };
  },
};
