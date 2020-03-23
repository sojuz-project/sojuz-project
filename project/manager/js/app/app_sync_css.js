/**
 *
 * @param get_project [this]
 *
 */
window.sync_css = function(project, collection) {
  fetch(`/sojuz-project/${'sync_css'}?project=${project}&collection=${JSON.stringify(collection)}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(
    onStreamRes(
      (data) => {},
      (el) => {
        if (el == false) {
          msg(`Sync project css false`, 'success');
          console.log('sync', el);
        } else {
          terminial_msg('<p> CSS now is sync with project</p>');
        }
      },
      (err) => {
        console.log('Error', err);
      }
    )
  );
};
