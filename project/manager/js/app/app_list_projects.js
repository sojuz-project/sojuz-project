window.list_projects = function(project) {
  document.getElementById('work-description').innerHTML = 'Select project:';
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
            action: 'set_project',
            current: el == app_atrs.project ? true : false,
          };
        });
        data.push({ name: 'Clone project from SOJUZ repo', ico: 'github', action: 'github_projects_menu' });
        appendDot(data, work_menu_tpl, 'work-wrapper-body');
      });
    })
    .catch(function(res) {
      console.log(res);
    });
};
