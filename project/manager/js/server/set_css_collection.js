const fs = require('fs-extra');
module.exports = {
  responce: (pDir, project, collection) => {
    let css = `${fs.writeFileSync(`${pDir}${project}/nuxt.css.collection.json`, collection)}`;
    return collection;
  },
};
