/**
 *
 * @param get_project [this]
 *
 */
window.set_project = function(t) {
  if (t.dataset.name != localStorage.getItem('project')) {
    fetch(`/sojuz-project/${'set_project'}?project=${t.dataset.name}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(
      onStreamRes(
        (data) => {},
        (el) => {
          const r = JSON.parse(el);
          localStorage.setItem('project', r.project);
          localStorage.setItem('layout', r.layout);
          terminial_msg('<p> Update: /app/projects_archive/nuxt.project.js</p>');
          msg(`Change project to: ${r.project}`, 'success');
          project_menu(t);
        },
        (err) => {
          console.log('Error', err);
        }
      )
    );
  } else {
    project_menu(t);
  }
};
