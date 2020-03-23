window.clone_project = function() {
  document.getElementById('work-progress').classList.add('active');
  const repoUrl = `https://github.com/Sojuz-themes/${app_atrs.name}.git`;
  terminial_msg('<p>Clone:' + repoUrl + '</p>');
  fetch(`/sojuz-project/${'clone_project'}?repoUrl=${repoUrl}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(
    onStreamRes(
      (data) => {
        terminial_msg('<p>done: ' + data + '</p>');
        msg(`Project clone`, 'success');
        document.getElementById('work-progress').classList.remove('active');
        list_projects('');
      },
      (el) => {
        // console.log('OK', el);
        terminial_msg('<p> ' + el + '</p>');
      },
      (err) => {
        document.getElementById('work-progress').classList.remove('active');
        console.log('Error', err);
      }
    )
  );
};
