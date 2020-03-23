/**
 *
 * @param get_project [this]
 *
 */
window.read_page = function(page, callback) {
  fetch(page, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(
    onStreamRes(
      (data) => {},
      (el) => {
        callback(el);
      },
      (err) => {
        callback(err);
      }
    )
  );
};
