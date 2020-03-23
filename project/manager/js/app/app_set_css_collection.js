/**
 *
 * @param get_project [this]
 *
 */
window.set_css_collection = function(project, callback) {
  // css = JSON.stringify(app_atrs.css_collection);
  css = app_atrs.css_collection.filter((el) => {
    return el.selected;
  });
  css = lzw_encode(JSON.stringify(css));
  fetch(`/sojuz-project/${'set_css_collection'}?project=${project}&collection=${css}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(
    onStreamRes(
      (data) => {},
      (el) => {
        if (el) {
          return callback(JSON.parse(lzw_decode(el)));
        } else {
          return callback([]);
        }
      },
      (err) => {
        console.log('Error', err);
      }
    )
  );
};
