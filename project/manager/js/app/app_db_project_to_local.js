window.db_project_to_local = function(project) {
  fetch(`/sojuz-project/${'db_local_to_project'}?project=${project}`, {
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
