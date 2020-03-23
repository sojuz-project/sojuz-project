/**
 *
 * @param get_project [this]
 *
 */
window.get_project = function(project) {
  fetch(`/sojuz-project/${'get_project'}?project=${project}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(
    onStreamRes(
      (data) => {},
      (el) => {
        console.log(el);
      },
      (err) => {
        console.log('Error', err);
      }
    )
  );
};
