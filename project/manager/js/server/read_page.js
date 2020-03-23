const fs = require('fs-extra');
module.exports = {
  responce: (file) => {
    return fs.readFileSync(file);
  },
};
