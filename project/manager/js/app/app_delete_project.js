function delete_project() {
  setAppState('delete_project');
  const project = localStorage.getItem('project');
  event.preventDefault();
  event.stopPropagation();
  fetch(`/sojuz-project/${'delete_project'}?project=${project}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(
    onStreamRes(
      () => {
        msg(`delete: ${project}`, 'success');
        if (localStorage.getItem('project') == project) {
          localStorage.removeItem('project');
        }
        list_projects('');
      },
      (el) => {
        terminial_msg('<p>' + el + '</p>');
        console.log('chunk', el);
      },
      (err) => {
        console.log('Error', err);
      }
    )
  );
  return false;
}
