function delete_project() {
  event.preventDefault();
  event.stopPropagation();
  fetch(`/sojuz-project/${'delete_project'}?project=${app_atrs.project}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(
    onStreamRes(
      () => {
        msg(`project: ${app_atrs.project} was deleted`, 'success');
        app_atrs.project = undefined;
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
