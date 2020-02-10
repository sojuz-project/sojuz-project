/**
 *
 * @param get_project [this]
 *
 */
window.set_css_collection = function(project) {
  css = JSON.stringify(css_collection);
  console.log(`/sojuz-project/${'set_css_collection'}?project=${project}&collection=${css}`);
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
        css_collection = JSON.parse(el);
      },
      (err) => {
        console.log('Error', err);
      }
    )
  );
};
