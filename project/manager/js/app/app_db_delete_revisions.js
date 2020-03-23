window.db_delete_revisions = function() {
  fetch(`/sojuz-project/${'db_delete_revisions'}?project=${app_atrs.project}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(
    onStreamRes(
      (data) => {
        msg(`Clear revisions posts`, 'success');
        terminial_msg('<p> SQL: clear revisions in_' + app_atrs.project + '</p>');
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
