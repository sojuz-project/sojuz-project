const fs = require('fs-extra');
module.exports = {
  responce: (project, collection, callback) => {
    let sync_css = true;
    collection.map((el) => {
      if (fs.existsSync(`/css/${el.file}`)) {
      } else {
        sync_css = false;
      }
    });
    callback(sync_css);
  },
};
