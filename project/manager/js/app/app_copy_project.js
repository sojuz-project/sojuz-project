window.copy_project = function() {
  setAppState('copy_project');
  fetch(`/sojuz-project/${'list_projects'}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(function(res) {
      res.json().then((data) => {
        data = data.map((el) => {
          terminial_msg('<p> Read: /app/projects_archive/' + el + '</p>');
          return {
            name: el,
            ico: 'archive',
          };
        });
        data.push({ name: 'back', ico: 'chevron-left', action: 'work_menu' });
        appendDot(data, copy_project_tpl, 'work-wrapper-body');
      });
    })
    .catch(function(res) {
      console.log(res);
    });
};
window.copy_project_send = function(event, t) {
  if (event.keyCode === 13) {
    copy_project_send_action(event, t.value);
  }
  if (t.nodeName == 'BUTTON') {
    copy_project_send_action(t.previousElementSibling.value);
  }
  if (t.nodeName == 'TD') {
    copy_project_send_action(t.dataset.name);
  }
};

function copy_project_send_action(new_project) {
  const project = localStorage.getItem('project');
  event.preventDefault();
  event.stopPropagation();
  fetch(`/sojuz-project/${'copy_project'}?project=${project}&new_project=${new_project}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(
    onStreamRes(
      () => {
        msg(`Project: ${project} copy to ${new_project}`, 'success');
        // projects_list('');
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
