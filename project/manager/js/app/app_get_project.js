/**
 *
 * @param get_project [this]
 *
 */
window.get_project = function(t) {
  setAppState('get_project');
  console.log(`/sojuz-project/${'get_project'}?project=${t.dataset.name}`);
  fetch(`/sojuz-project/${'get_project'}?project=${t.dataset.name}`, {
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
