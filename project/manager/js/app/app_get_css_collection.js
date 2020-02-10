/**
 *
 * @param get_project [this]
 *
 */
window.get_css_collection = function(project) {
  if (!project) {
    msg(`Project not found`, 'success');
  }
  console.log(`/sojuz-project/${'get_css_collection'}?project=${project}`);
  fetch(`/sojuz-project/${'get_css_collection'}?project=${project}`, {
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
