window.db_local_to_project = function() {
  fetch(`/sojuz-project/${'db_local_to_project'}?project=${app_atrs.project}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(
    onStreamRes(
      (data) => {
        msg(`Database was storage on backup file`, 'success');
        terminial_msg(
          '<p> Write: /app/projects_archive/' + app_atrs.project + '/wordpress/backup_' + app_atrs.project + '.sql</p>'
        );
      },
      (el) => {
        console.log('OK', el);
      },
      (err) => {
        console.log('Error', err);
      }
    )
  );
};
